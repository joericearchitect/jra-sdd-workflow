# Harness engineering + Symphony — verdict for this repository

Date: 2026-09-03

Companion to the two detailed notes in this folder:

- [`harness-engineering.md`](harness-engineering.md) — how the OpenAI post works
- [`symphony.md`](symphony.md) — how `openai/symphony` works

This file answers only one question: **are these useful for this repo?**

**Short answer.** Harness engineering is *useful and largely already embodied* —
steal a handful of specific ideas, but do not import the machinery wholesale.
Symphony is *not useful now*: it is the exact category of tool this repo's own
ground rules forbid — an autonomous runner that inverts the manual-first,
propose-then-apply discipline this workflow is built around. Adopt the mindset;
reject the runner.

---

## 1. Harness engineering — adopt the mindset, keep it proportional

Verdict: **Useful, already ~80% aligned. Harvest ideas, not infrastructure.**

This repository already implements several of the post's core practices, under
its own names:

| Harness-engineering practice | Already present here |
|---|---|
| Repository as the system of record | `AGENTS.md` → `docs/sdd-workflow.md`; OpenSpec owns requirements, design, and tasks; "link sources rather than copy their contents" |
| A map, not a manual (progressive disclosure) | `AGENTS.md` is deliberately short; behavior and recovery live in `docs/sdd-workflow.md` and OpenSpec artifacts |
| Mechanical enforcement of invariants | `scripts/validation/*.mjs`, `openspec validate --strict`, `.github/workflows/validate.yml` |
| "A gate ships with its exit" | `config.yaml` design rule: "a gate whose only exit is a later repair is not acceptable" |
| Humans steer, agents execute | The entire propose → apply → verify → sync → archive lifecycle |

Ideas worth stealing *now*, because they map to gaps rather than new machinery:

1. **Error messages that teach the fix.** The post makes custom lints inject
   remediation instructions into agent context, so "the failure teaches the fix."
   The repo's validation scripts could report, alongside every failure, the exact
   OpenSpec artifact/section that owns the fix — a low-cost change to the
   *messages*, not the checks.
2. **Doc-gardening as a standing check, not a manual chore.** The post runs a
   cadenced "doc-gardening" agent that opens fix-up PRs for drift. The repo
   already has `validate-openspec-artifacts`; the idea to adopt is treating
   artifact drift as *entropy collected continuously* rather than a quarterly
   cleanup. Only once the manual loop has been run and found painful (per
   "manual first").
3. **"Garbage collection of entropy" framing.** Agents replicate existing
   patterns — including bad ones. The repo's quality rules
   (`quality/openspec-artifact-rules.json`) are the seed of the "golden
   principles" the post encodes mechanically; extend them, do not let drift
   accumulate.

Do **not** import: the standing cleanup fleet, custom architecture linters, or
per-worktree observability stacks. Those are justified by a greenfield product
with seven engineers and unlimited agent budget; this repo's "proportion" rule
and "manual first" rule explicitly forbid adding machinery before the pain is
demonstrated by hand.

## 2. Symphony — do not adopt as a runner

Verdict: **Not useful now. It is the category this repo already rejects.**

Symphony is a long-running daemon that polls an issue tracker, spawns a Codex
session per issue, and runs it to completion. That is, by definition, a
*controller / autonomous runner*. This repo's `openspec/config.yaml` states:

> Do not propose a controller, an autonomous runner, or a general workflow
> engine.

And `AGENTS.md`:

> Manual first. Do not add automation for a step that has not been run manually
> and found painful.

Symphony also inverts the repo's core authorization boundary. Here, propose and
apply are separate gates: a proposal creates planning artifacts only, and
implementation starts only after an explicit apply request for a named change.
Symphony collapses that to "the tracker says active, so run." That is the
opposite of the discipline this workflow exists to enforce.

Its own README is explicit that it "works best in codebases that have adopted
harness engineering" and the reference config ships `approval_policy: never` —
the "trusted environment" posture, not a default to copy.

### What to keep from Symphony (ideas, not the tool)

Three design ideas are worth recording for the day automation is *ever*
warranted — i.e. after the manual loop is proven by hand and a change is
proposed through the normal OpenSpec path:

1. **Policy lives in the repo, reviewed like code.** `WORKFLOW.md` is a
   version-controlled contract. This repo already does the equivalent with
   OpenSpec + `AGENTS.md` + `docs/sdd-workflow.md`; the lesson is to keep any
   future runtime policy in-repo, never in a dashboard or a chat thread.
2. **Scheduler reads the tracker; business logic stays in the repo.** Symphony
   is deliberately dumb about ticket writes — the agent performs them. That
   separation is the right one *if* a runner ever appears here.
3. **Fail closed on template rendering.** Symphony requires unknown prompt
   variables/filters to fail rather than render an empty prompt. A good
   guardrail for any future prompt templating, and consistent with this repo's
   "report unknown/blocked honestly" rule.

### When to revisit

Reconsider only if two things are both true:

1. The manual SDD loop has been run repeatedly and the *dispatch* step (reading
   an issue, creating the workspace, starting the assistant) is the specific
   pain, and
2. A contributor proposes a change through OpenSpec that documents the gate's
   exit path, least-privilege posture, and rollback — because "every gate ships
   with its exit."

Until then, Symphony stays in this research folder as a design reference, not a
dependency.

## Sources

- [openai/symphony](https://github.com/openai/symphony)
- [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)
- This repo: `AGENTS.md`, `openspec/config.yaml`, `docs/sdd-workflow.md`
