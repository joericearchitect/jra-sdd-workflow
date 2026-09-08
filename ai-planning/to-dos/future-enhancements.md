# Future Enhancements

This is an intentional backlog, not an authorization to build automation. Each
item requires its own Explore, issue, proposal, design review, and explicit
Apply approval. The current workflow remains human-driven.

## 1. Formal GitHub lifecycle synchronization

### Desired outcome

Keep each issue's configured lifecycle-phase field aligned with the OpenSpec
phase that has actually completed. Keep the issue's general status aligned too,
for example moving work into an active state when delivery begins and to a
completed state only when the lifecycle's delivery and closure evidence permit
it. This should make the existing Kanban board accurately show work flowing
through Explore, Propose, Apply, Verify, Sync, Archive, delivery, and cleanup.

### Current gap

The phase fields and a Kanban board already exist, but issues are not reliably
updated after each OpenSpec phase. The resulting board state can lag the
evidence held in OpenSpec, pull requests, and GitHub issues.

### Discovery and design questions

- Establish the authoritative mapping from each completed lifecycle checkpoint
  to the configured phase and status values; derive field identifiers and valid
  values from the active GitHub environment rather than hardcoding them.
- Define which evidence permits each transition, including review-gate pauses,
  failed checks, no-code closure, Sync applicability, lifecycle-record delivery,
  and workspace cleanup.
- Decide whether early delivery is a documented manual procedure or a narrow
  assisted action. Manual runs and their observed friction must come first.
- Require an exact preview, explicit authorization for external updates,
  idempotent retry behavior, a human-readable audit record, and a recovery
  path for every update.
- Never overwrite human-authored issue discussion or assume one Project,
  repository, board column, label, account, or field identifier.

### Acceptance evidence

A representative change can progress through the lifecycle with its issue's
phase and general status matching the demonstrated evidence at every checkpoint;
an interrupted or failed transition remains truthful and recoverable.

## 2. Bounded SDD delivery orchestrator

### Desired outcome

Provide an explicitly authorized, bounded way to coordinate one SDD delivery
through its lifecycle using specialized roles: high-reasoning frontier work for
Explore and planning; an independent planning reviewer; implementation work;
and independent implementation review. The coordinator should stop at the
same human gates and rely on evidence rather than silently advancing work.

### Scope boundary

This is not a general autonomous workflow engine and must not bypass OpenSpec,
the three human gates, independent review, GitHub authorization, or the
second-repair design-review rule. It should coordinate only a selected change,
only within approved boundaries, and only until the next evidenced lifecycle
checkpoint.

### Discovery and design questions

- Review the prior AI-planning repository that records the intended operating
  model before making a proposal; preserve its useful requirements without
  copying environment-specific values or credentials into reusable assets.
- Specify the role boundaries, artifact handoffs, model-selection policy,
  independent-review isolation, and how a human can inspect and stop the run.
- Define deterministic selection, durable selected-change state, correction
  budget, time and cost limits, idempotent recovery, and behavior when a tool,
  permission, check, or reviewer is unavailable.
- Ensure each external action has an exact preview and fresh authorization;
  ensure a blocked or uncertain state pauses rather than guessing or retrying
  without bound.
- Run manual deliveries first and record recurring friction. Automate only the
  portions demonstrated to be painful and safe to coordinate.

### Acceptance evidence

One explicitly authorized test delivery reaches its first incomplete evidenced
checkpoint with durable records of selection, role outputs, validations,
authorizations, pauses, and recovery. It does not perform unapproved external
mutations or advance past a human gate.

## 3. Mechanical enforcement for approved parallel runs

### Desired outcome

When workflow automation is separately justified and approved, it can
coordinate an explicitly approved parallel batch without weakening the
three-gate model. Every session remains bound to one selected change and its
own Gate 1, Gate 2, and Gate 3 decisions, evidence, resources, and
external-state authorization.

### Current gap

Parallel campaign sessions rely on the human-run roadmap to keep dependencies,
shared resources, rebases, merges, and campaign records coherent. The current
manual workflow intentionally provides no mechanical scheduler or enforcement.

### Discovery and design questions

- Require an explicit batch definition and verify that every selected change is
  dependency-ready before starting it; never infer a batch from recency.
- Keep authorization, evidence, worktree and branch registration, external
  mutations, and all three gates isolated by change; an approval for one change
  MUST NOT authorize another.
- Detect overlapping shared paths and external resources, serialize their
  updates and merges, and provide a clear exit when a collision is found.
- When a rebase changes a candidate's reviewed head, invalidate stale evidence,
  rerun affected checks, and return to that candidate's existing Gate 3 rather
  than creating a new lifecycle gate.
- Preserve human pause, stop, recovery, and second-repair design-review rules;
  do not turn a blocked session into an unbounded retry or allow it to advance
  dependent work.
- Base any proposal on repeated manual parallel-run evidence showing that the
  coordination pain is real, bounded, and safe to automate.

### Acceptance evidence

An explicitly approved test batch demonstrates that the automation rejects an
unready dependency or shared-resource collision, preserves independent
three-gate evidence for each selected change, serializes required shared
updates, and stops safely when a reviewed head or external state drifts.
