# Symphony (OpenAI)

- Source: https://github.com/openai/symphony
- License: Apache 2.0
- Status: "a low-key engineering preview for testing in trusted environments"
  (repository warning). The Elixir implementation is labelled "prototype
  software intended for evaluation only and is presented as-is."
- Spec: `SPEC.md`, "Symphony Service Specification", Status: Draft v1
  (language-agnostic), ~2,300 lines
- Retrieved: 2026-09-03 (~27k stars, ~2.8k forks at that time)

## What it is

> Symphony turns project work into isolated, autonomous implementation runs,
> allowing teams to manage work instead of supervising coding agents.

A long-running daemon that polls an issue tracker, creates one isolated
filesystem workspace per issue, and runs a Codex session in that workspace until
the issue leaves an active state. It is the sequel to harness engineering: the
post is about making a repository legible to agents; Symphony is about no longer
babysitting the agents. `README.md` states plainly that Symphony "works best in
codebases that have adopted harness engineering."

Two ways to adopt it: implement `SPEC.md` yourself in any language (the README
literally suggests handing the spec URL to a coding agent), or run the
experimental Elixir/OTP reference implementation.

## The boundary it draws

This is the most interesting part of the design, and the part most relevant to
an SDD workflow:

- **Symphony is a scheduler/runner and a tracker *reader*.** It decides what to
  dispatch, where, and when, and it stops runs that are no longer eligible.
- **Symphony does not contain workflow business logic.** It has no built-in
  notion of how to edit tickets, comment, or open PRs. Ticket *writes* — state
  transitions, comments, PR links — are performed by the coding agent, using
  provider-native tools that Symphony executes on the host with the configured
  tracker credential.
- **Workflow policy lives in the repository**, in a version-controlled
  `WORKFLOW.md`, so the prompt and runtime settings are reviewed like code.

Explicit non-goals from `SPEC.md`: rich web UI or multi-tenant control plane; a
prescribed dashboard; a general-purpose workflow engine or distributed job
scheduler; built-in business logic for editing tickets/PRs/comments; strong
sandbox controls beyond what the coding agent and host OS provide; and any
single mandated approval or sandbox posture.

A successful run may legitimately end at a workflow-defined handoff state — for
example `Human Review` — rather than at `Done`.

## Architecture

Nine components, layered so the thing is portable:

| Component | Responsibility |
|---|---|
| Workflow Loader | Reads `WORKFLOW.md`, splits YAML front matter from prompt body |
| Config Layer | Typed getters, defaults, `$VAR` env indirection, validation |
| Issue Tracker Adapter | Fetch candidates/states, normalize into one issue model, optionally expose provider-native agent tools |
| Orchestrator | Poll tick, authoritative in-memory state, dispatch/retry/stop/release decisions |
| Workspace Manager | Issue -> workspace path mapping, lifecycle hooks, cleanup |
| Agent Runner | Prepare workspace, render prompt, launch the coding agent, stream updates |
| Status Surface | Optional operator-facing view |
| Logging | Structured logs to configured sinks |

Layer stack: Policy (repo-owned `WORKFLOW.md`) -> Configuration -> Coordination
(orchestrator) -> Execution (workspace + agent subprocess) -> Integration
(tracker adapter) -> Observability.

External dependencies: one issue tracker API, the local filesystem, a coding
agent executable speaking the Codex app-server protocol, and host-environment
auth. No database is required — restart recovery is tracker-driven and
filesystem-driven, and in-memory scheduler state is deliberately not restored.

## `WORKFLOW.md`: the repository contract

One Markdown file, YAML front matter plus prompt body, discovered in the process
working directory by default. Front matter keys: `tracker`, `polling`,
`workspace`, `hooks`, `agent`, `codex`. Unknown keys are ignored for forward
compatibility, and extensions may add top-level keys.

Selected fields and defaults:

- `tracker.kind` (required) selects the adapter; `tracker.provider` is
  adapter-owned config with `$VAR_NAME` secret indirection
- `tracker.active_states` / `terminal_states` — provider-native state names,
  compared case-insensitively after trim+lowercase
- `tracker.required_labels` — every configured label must be present to dispatch
- `polling.interval_ms` — default 30000
- `workspace.root` — default `<system-temp>/symphony_workspaces`
- `hooks.after_create` / `before_run` / `after_run` / `before_remove` —
  arbitrary shell, `timeout_ms` default 60000. `after_create` and `before_run`
  failures abort; `after_run` and `before_remove` failures are logged and ignored
- `agent.max_concurrent_agents` default 10, `max_turns` default 20,
  `max_retry_backoff_ms` default 5m, plus optional per-state concurrency caps
- `codex.command` default `codex app-server`; `approval_policy`,
  `thread_sandbox`, `turn_sandbox_policy` are pass-through Codex values;
  `turn_timeout_ms` default 1h, `stall_timeout_ms` default 5m

The Markdown body is the per-issue prompt template, rendered with strict
Liquid-compatible semantics — **unknown variables and unknown filters must fail
rendering**, which is a real guardrail against silently empty prompts. Template
inputs are the normalized `issue` object and `attempt`.

Dynamic reload is *required*: the service must watch `WORKFLOW.md`, re-read and
re-apply config and prompt without restart, and on an invalid reload must keep
running on the last known good config while surfacing an operator-visible error
rather than crashing.

The reference `WORKFLOW.md` in `elixir/` is instructive as an example of scale:
~330 lines, of which ~40 are config and the rest is a detailed per-status
operating procedure — reproduce first, keep a single persistent tracker comment
as the progress "workpad", treat ticket-authored Validation/Test Plan sections
as non-negotiable acceptance input, file a separate issue instead of expanding
scope, and never end a turn asking a human for follow-up actions.

## Lifecycle and state machine

Internal claim states, distinct from tracker states: `Unclaimed`, `Claimed`,
`Running`, `RetryQueued`, `Released`.

Run attempt phases: `PreparingWorkspace` -> `BuildingPrompt` ->
`LaunchingAgentProcess` -> `InitializingSession` -> `StreamingTurn` ->
`Finishing`, terminating in `Succeeded`, `Failed`, `TimedOut`, `Stalled`, or
`CanceledByReconciliation`. Distinct terminal reasons exist because retry logic
and logging differ per reason.

Poll tick order is fixed and matters: **reconcile running issues first**, then
run dispatch preflight validation, then fetch candidates, sort by priority,
dispatch while slots remain, then notify observers. If validation fails,
dispatch is skipped for the tick but reconciliation still happens — so a broken
config can never strand a run that should be cancelled.

Continuation semantics: a normal worker exit does not mean the issue is done. A
worker may run several back-to-back turns on the same live thread in the same
workspace up to `max_turns`, re-checking tracker state after each turn. The
first turn sends the full rendered prompt; continuation turns send only
continuation guidance rather than resending prompt history. After a normal exit
the orchestrator still schedules a ~1s continuation retry to re-check whether
the issue is still active.

Idempotency rules: one authority serializes all state mutation; `claimed` and
`running` are checked before any launch; reconciliation precedes dispatch every
tick; startup cleanup removes stale workspaces for issues already terminal.

## Safety posture

`SPEC.md` is candid that it does not mandate a hardening posture, and that the
implementer owns it. Mandatory controls are narrow:

- Workspace path must stay under the configured workspace root
- The agent's cwd must be the per-issue workspace path
- Workspace directory names must be sanitized (non-`[A-Za-z0-9._-]` replaced
  with `_`, plus a >=64-bit hash suffix when sanitization is lossy, so distinct
  identifiers cannot collide)
- Hook timeouts are required so a hook cannot hang the orchestrator

Secrets: `$VAR` indirection only; never log tokens; validate presence without
printing; execute provider-native tracker tools in the *host* process with the
adapter credential and strip declared tracker secrets from the agent child
environment, so the agent never needs a second tracker login. Do not put literal
credentials in a repo-owned `WORKFLOW.md` that the child can read.

Section 15.5 "Harness Hardening Guidance" is explicit about the risk:

> Running Codex agents against repositories, issue trackers, and other inputs
> that can contain sensitive data or externally-controlled content can be
> dangerous. A permissive deployment can lead to data leaks, destructive
> mutations, or full machine compromise if the agent is induced to execute
> harmful commands or use overly-powerful integrations.

Suggested mitigations: tighten Codex approval/sandbox settings rather than
running maximally permissive; add OS/container/VM isolation and network
restriction; filter which issues, projects, boards, or labels are eligible for
dispatch; narrow provider-native tools to the intended tracker scope; minimize
available tools, credentials, paths, and network destinations. Hooks are treated
as fully trusted configuration — which is exactly why `WORKFLOW.md` belongs
under code review.

Note the tension worth recording: the reference `WORKFLOW.md` ships
`approval_policy: never`, `thread_sandbox: workspace-write`, and
`networkAccess: true`, with `shell_environment_policy.inherit=all`. That is the
"trusted environment" configuration the warning refers to, not a default to
copy.

## Reference implementation notes

Elixir/OTP, run as `./bin/symphony ./WORKFLOW.md`, with self-contained Burrito
executables for macOS and Linux on arm64/x86_64. Included tracker adapters:
Linear, GitHub Issues, Jira Cloud, Asana, GitLab — each advertising a
provider-native tool to the agent (`github_api`, `linear_graphql`, etc.).
Optional Phoenix observability service behind `--port`.

Blocked runs — where Codex reports that operator input, approval, or MCP
elicitation is required — are kept claimed and surfaced as blocked in runtime
state, the JSON API, and the dashboard. That blocked map is in memory only, so a
restart clears it and any still-active issue becomes a dispatch candidate again.

`SPEC.md` also carries a test/validation matrix (section 17), a conformance
"definition of done" checklist (section 18), language-agnostic reference
algorithms (section 16), and an optional SSH-worker extension (Appendix A) for
running workspaces on remote hosts.

## Sources

- [openai/symphony](https://github.com/openai/symphony) — repository
- [SPEC.md](https://github.com/openai/symphony/blob/main/SPEC.md) — the protocol, primary
- [elixir/README.md](https://github.com/openai/symphony/blob/main/elixir/README.md) — reference implementation
- [elixir/WORKFLOW.md](https://github.com/openai/symphony/blob/main/elixir/WORKFLOW.md) — example workflow contract
- [Demo video](https://player.vimeo.com/video/1186371009?h=5626e4b899)
- [Codex app-server mode](https://developers.openai.com/codex/app-server/)
