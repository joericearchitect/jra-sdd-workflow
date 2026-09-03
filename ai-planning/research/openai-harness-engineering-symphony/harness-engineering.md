# Harness Engineering (OpenAI)

- Source: https://openai.com/index/harness-engineering/
- Title: "Harness engineering: leveraging Codex in an agent-first world"
- Publisher: OpenAI (Codex team)
- Retrieved: 2026-09-03
- Note: openai.com rejects direct programmatic fetches (HTTP 403). Text was read
  through a reader proxy. Quotations below were taken from that rendering.

## What it is

A field report, not a product. An OpenAI team built and shipped an internal beta
product over five months with **zero lines of manually written code** — every
line of application logic, tests, CI configuration, documentation, observability,
and internal tooling was written by Codex. The post describes what the engineers
did instead of writing code.

Reported numbers (author's own estimates, unaudited):

- First commit into an empty repository, late August 2025.
- ~1,000,000 lines of code after five months.
- ~1,500 pull requests opened and merged.
- Three engineers initially, growing to seven; ~3.5 merged PRs per engineer per
  day, and throughput reportedly *increased* as the team grew.
- Estimated ~1/10th the time hand-writing would have taken.
- Single Codex runs observed working a single task for 6+ hours unattended.

The thesis in one line: **"Humans steer. Agents execute."** The engineer's job
moves from writing code to designing the environment, specifying intent, and
building feedback loops. The scarce resource being optimized is human time and
attention, not code volume.

## The core diagnostic

> When something failed, the fix was almost never "try harder."

Instead of prompt-tuning, the team asked: *"what capability is missing, and how
do we make it both legible and enforceable for the agent?"* — then had Codex
build that capability into the repository. Agent failure is treated as a signal
about the environment, not about the model.

## The practices

### 1. Repository as the system of record

> From the agent's point of view, anything it can't access in-context while
> running effectively doesn't exist.

Knowledge in chat threads, external docs, or people's heads is invisible to the
agent, in the same way it is invisible to a new hire joining three months later.
So decisions get pushed into versioned, repository-local artifacts: markdown,
schemas, executable plans.

### 2. A map, not a manual (progressive disclosure)

`AGENTS.md` is treated as a **table of contents**, roughly 100 lines, pointing
at a structured `docs/` directory that holds the actual system of record. The
stated reasons for rejecting one large instruction file:

- Context is scarce; a giant file crowds out the task, the code, and the docs.
- Too much guidance becomes non-guidance — when everything is important, nothing is.
- It rots instantly, and agents cannot tell which rules are still true.
- A single blob does not lend itself to mechanical checks, so drift is inevitable.

Supporting artifacts named in the post: an architecture document as a top-level
map of domains and package layering; a design-doc catalogue with verification
status; a quality document grading each domain and layer and tracking gaps over
time; lightweight ephemeral plans for small changes and checked-in **execution
plans** with progress and decision logs for complex work. Active plans,
completed plans, and known technical debt are versioned and co-located.

The knowledge base is enforced mechanically: linters and CI jobs validate that
it is current, cross-linked, and correctly structured, and a recurring
"doc-gardening" agent opens fix-up PRs for documentation that no longer matches
code behavior.

### 3. Mechanical enforcement of invariants, not prescription of implementation

> By enforcing invariants, not micromanaging implementations, we let agents ship
> fast without undermining the foundation.

Each business domain is split into a fixed layer set with strictly validated
dependency direction: `Types -> Config -> Repo -> Service -> Runtime -> UI`.
Cross-cutting concerns (auth, connectors, telemetry, feature flags) may only
enter through a single explicit `Providers` interface. Anything else is
disallowed and enforced by custom linters and structural tests — themselves
Codex-generated.

A small set of "taste invariants" is also enforced statically: structured
logging, naming conventions for schemas and types, file size limits,
platform-specific reliability requirements. Because the lints are custom, **the
error messages are written to inject remediation instructions into agent
context** — the failure teaches the fix.

Constraints are deliberately scoped: enforce boundaries centrally, allow
autonomy locally. Requirements are stated as outcomes ("parse data shapes at the
boundary") without naming the library that satisfies them. Output that does not
match human stylistic preference is accepted as long as it is correct,
maintainable, and legible to future agent runs.

### 4. Give the agent eyes (application legibility)

Once throughput rose, the bottleneck became human QA capacity, so the
application itself was made legible to the agent:

- The app is bootable per git worktree, so one instance runs per change.
- Chrome DevTools Protocol is wired into the agent runtime, with skills for DOM
  snapshots, screenshots, and navigation — the agent reproduces bugs, validates
  fixes, and reasons about UI behavior directly.
- An ephemeral per-worktree observability stack exposes logs, metrics, and
  traces; the agent queries them with LogQL and PromQL, and the whole stack is
  torn down when the task completes.

The payoff is that goals become executable instructions: "ensure service startup
completes in under 800ms" or "no span in these four critical user journeys
exceeds two seconds" become tractable prompts.

### 5. Agent-to-agent review loops

Humans interact almost entirely through prompts. To drive a PR to completion,
Codex reviews its own changes locally, requests further specific agent reviews
locally and in the cloud, responds to human or agent feedback, and iterates
until all agent reviewers are satisfied — the post calls this a "Ralph Wiggum
Loop." Agents use standard tooling (`gh`, local scripts, repository-embedded
skills) directly rather than having humans paste context in. Human PR review is
permitted but not required.

### 6. Garbage collection of entropy

Codex replicates existing repository patterns, including bad ones, so drift is
structural rather than accidental. The team initially spent every Friday (20% of
the week) cleaning up "AI slop" and found it did not scale. The replacement:
encode "golden principles" as opinionated mechanical rules — two given examples
are *prefer shared utility packages over hand-rolled helpers, to keep invariants
centralized* and *do not probe data YOLO-style; validate boundaries or rely on
typed SDKs so the agent cannot build on guessed shapes* — then run background
Codex tasks on a cadence that scan for deviations, update quality grades, and
open targeted refactoring PRs. Most are reviewable in under a minute and
automerged. Technical debt is framed as a high-interest loan paid down
continuously rather than in quarterly bursts.

### 7. Boring technology, internalizable dependencies

Dependencies and abstractions were favored when they could be fully reasoned
about in-repo. "Boring" technology is easier for agents to model — composable,
API-stable, well represented in training data. In some cases reimplementing a
subset was cheaper than working around opaque upstream behavior: instead of a
generic `p-limit`-style package they wrote their own map-with-concurrency helper
integrated with their OpenTelemetry instrumentation, at 100% test coverage.

### 8. Merge philosophy scaled to throughput

Minimal blocking merge gates, short-lived pull requests, and test flakes handled
with follow-up runs rather than indefinite blocking. The post is explicit that
this is a throughput-dependent tradeoff: *"This would be irresponsible in a
low-throughput environment."* Where agent throughput far exceeds human
attention, corrections are cheap and waiting is expensive.

## Stated end state and stated limits

The repository recently crossed a threshold where, from a single prompt, Codex
can validate codebase state, reproduce a reported bug, record a video of the
failure, implement a fix, validate it by driving the application, record a second
video of the resolution, open a PR, respond to feedback, remediate build
failures, escalate to a human only when judgment is required, and merge.

The post immediately qualifies this:

> This behavior depends heavily on the specific structure and tooling of this
> repository and should not be assumed to generalize without similar
> investment—at least, not yet.

Open questions the authors name: how architectural coherence evolves over years
in a fully agent-generated system; where human judgment adds most leverage and
how to encode it so it compounds; how the system changes as models improve.

## Caveats for this repository's purposes

- Single case study, self-reported metrics, greenfield repository with no legacy
  code, one model vendor, one team, five months.
- The environment is unusually favorable: unlimited-ish agent budget, a team
  whose full-time job was building the harness, and a product with no external
  compliance or regulatory review path.
- "1M lines / 1,500 PRs" is a volume claim, not a quality claim. The post's own
  entropy section concedes drift is continuous and requires standing cleanup
  machinery.
- Line count in an agent-generated codebase is a weak proxy for delivered value;
  the same post notes agents replicate patterns and that shared utilities had to
  be *mandated* to stop duplication.

## Sources

- [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) — primary
- [Ralph Wiggum loop](https://ghuntley.com/loop/) — referenced by the post
- [Codex execution plans](https://cookbook.openai.com/articles/codex_exec_plans) — referenced by the post
- [ARCHITECTURE.md (matklad)](https://matklad.github.io/2021/02/06/ARCHITECTURE.md.html) — referenced by the post
- [Parse, don't validate](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/) — referenced by the post
- [OpenAI's Agent-First Codebase Learnings](https://alexlavaee.me/blog/openai-agent-first-codebase-learnings/) — secondary, used for cross-checking
- [Five harness engineering principles](https://tonylee.im/en/blog/openai-harness-engineering-five-principles-codex/) — secondary, used for cross-checking
