# jra-sdd-workflow

A spec-driven development workflow built on [OpenSpec](https://github.com/Fission-AI/OpenSpec),
for delivering change with AI coding assistants.

**Manual first.** Every step here is designed to be driven by a human. A step is
automated only after it has been performed by hand enough times to know what it
actually needs to do.

## Why this exists

Working with AI assistants on real repositories creates a specific problem:
work drifts. Requirements live in chat, decisions go unrecorded, scope expands
quietly, and "done" is asserted rather than evidenced.

Spec-driven development fixes the ordering. A change is described and agreed
before it is built, the specification is versioned alongside the code, and
delivery produces evidence rather than claims.

## The lifecycle

```
explore -> propose -> apply -> verify -> sync -> archive
```

| Phase | What happens |
|---|---|
| **explore** | Think through the problem. No artifacts, no commitment. |
| **propose** | Create the change: proposal, design, delta specs, tasks. |
| **apply** | Implement the tasks. |
| **verify** | Confirm the implementation matches the artifacts, with evidence. |
| **sync** | Fold delta specs into the living specifications. |
| **archive** | Close the change and retire its working resources. |

Each phase has an entry condition and produces something durable. A phase is not
complete because it was attempted — it is complete when its evidence exists.

## What is here

- **Workflow documentation** — the lifecycle, phase by phase, in prose you can follow by hand.
- **Assistant commands** — thin Claude Code and Codex adapters for each phase.
- **Artifact quality rules** — declarative required sections and terms for
  proposals, specs, designs, and task lists, plus the validator that enforces them.
- **Linkage validation** — CI that requires every pull request to name its issue
  and its OpenSpec change.
- **Intake templates** — issue and pull request templates that capture the right
  information at the start.

## Two standing constraints

These are load-bearing. They exist because a previous attempt at this violated
both and produced roughly 115,000 lines of apparatus supporting 1,700 lines of
product.

**1. No automation of a step until it has been run manually ten times.**

Nearly every hard problem in agent-driven delivery turns out to be an
integration detail — a CLI flag, an identifier mismatch, a sandbox rule, a
schema dialect, an authentication path. None of these are visible from a
specification. All of them surface immediately in manual use. Automating first
means designing against imagined problems and discovering the real ones later,
at maximum cost.

**2. If supporting code exceeds roughly three times the product it supports,
stop and justify it.**

Ratio drift is invisible while it happens. Each individual addition is
defensible; the accumulation is not. Making the ratio an explicit checkpoint is
the only reliable way to catch it early.

## Design principles

- **Evidence over assertion.** "Tests pass" means a recorded result bound to the
  current commit, not a claim.
- **Every gate ships with its exit.** A check that can block work must arrive
  together with the documented path past it. A gate whose only escape is
  "write a repair" is a trap, not a guardrail.
- **Complexity is watched, not just managed.** Two consecutive repairs to the
  same component trigger a design review, not a third repair.
- **The repository under work is data, never a source of programs.** Tooling
  runs from a known, verified location — never from a script found inside the
  target repository.

## Roadmap

Deliberately staged. Later capability is added only when the manual workflow has
made the need concrete:

- **Now** — the manual lifecycle, artifact quality rules, and linkage CI.
- **Later** — automated independent review, planning and research skills,
  verification-result validation, and shared helper distribution.
- **Eventually** — autonomous delivery, with a state model derived from the
  manual workflow that actually ran, rather than one designed in advance.

## Related

[`jra-agent-skills`](https://github.com/joericearchitect/jra-agent-skills) — the
reusable skills this workflow uses and delivers. The dependency runs one way:
this workflow consumes skills; skills never depend on this workflow.
