# Lifecycle — the phases a change moves through

Terms for the ordered steps that every piece of work passes through.

## Lifecycle

The fixed sequence of phases a change goes through, from idea to finished and
filed away. This project's lifecycle is:
explore → propose → apply → verify → sync → archive.

**Terminology Source:** Industry — software engineering (SDLC); the specific
six-phase sequence is this framework's.

**Related:** explore, propose, apply, verify, sync, archive

## Explore

The thinking phase. Investigate a problem and understand the codebase without
creating any plan files or changing anything.

**Terminology Source:** OpenSpec — a workflow action, selected by this
repository.

**Related:** lifecycle

## Propose

The planning phase. Create the change and its documents — proposal, specs,
design, and task list — and then stop. This is planning only; no code is
written yet.

**Terminology Source:** OpenSpec — a workflow action, selected by this
repository.

**Related:** change, planning boundary

## Planning review

A human checkpoint between proposing and applying: read the plan documents and
confirm the scope, non-goals, and acceptance criteria are right before any
implementation starts.

**Terminology Source:** This repository (jra-sdd-workflow) — a human checkpoint
added to the OpenSpec lifecycle.

**Related:** planning boundary, apply

## Planning boundary

The rule that "propose" and "apply" are separate. Proposing only creates
planning documents. Actual implementation begins only after a later, explicit
request to apply a named change.

**Terminology Source:** OpenSpec — the tool (propose/apply separation);
reinforced as a rule in this repository's config.

**Related:** propose, apply

## Apply

The implementation phase. Work through the task list, making the code changes,
and tick each task only when its evidence exists.

**Terminology Source:** OpenSpec — a workflow action, selected by this
repository.

**Related:** tasks, evidence

## Verify

The checking phase. Compare the implementation against the proposal, specs,
design, and task list, and produce a report of anything missing or mismatched.

**Terminology Source:** OpenSpec — a workflow action, selected by this
repository.

**Related:** apply, validator

## Sync

The merge phase. Fold the change's "delta specs" (the changes to requirements)
into the permanent "living specs", without claiming the change is delivered.

**Terminology Source:** OpenSpec — a workflow action, selected by this
repository.

**Related:** delta spec, living specs, archive

## Archive

The filing phase. Confirm the change is delivered and its specs are synced,
then move the whole change folder into a dated history folder so the intent is
preserved.

**Terminology Source:** OpenSpec — a workflow action, selected by this
repository.

**Related:** sync, living specs

## Preflight

A set of checks done once before the first change begins — for example,
confirming tools are installed, authentication works, and the repository is in
a known state.

**Terminology Source:** Industry — software engineering, borrowed from aviation
("preflight check").

**Related:** validator

## Lifecycle-record PR

A second, small pull request that contains only the bookkeeping that follows
delivery — the synced living specs, the archived change, and the updated
progress records. It is separate from the implementation pull request so each
is easy to review.

**Terminology Source:** This repository (jra-sdd-workflow) — a two-PR structure
invented for this campaign.

**Related:** pull request, sync, archive

## Entry/exit conditions

The gates around each phase: "entry conditions" are what must be true to start
a phase, and "exit conditions" are what must be true for it to be considered
finished. A phase is not done just because it was attempted.

**Terminology Source:** Industry — software engineering (process and
definition-of-done).

**Related:** lifecycle, evidence
