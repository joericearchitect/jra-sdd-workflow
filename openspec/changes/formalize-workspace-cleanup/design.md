## Context

See `proposal.md` for motivation and
`specs/workspace-cleanup/spec.md` for the observable contract. The current
workflow ends its selected OpenSpec actions at Archive and then uses a separate
lifecycle-record pull request to make the living specs and archive durable. It
does not record local resource ownership before branch or worktree creation.

The existing `tracking.yaml` contract owns portable issue, Project, repository,
default-branch, and implementation-path linkage. It intentionally rejects
credentials and mutable delivery state, so it is not the right home for local
resource registrations or cleanup receipts. Exact operational records also
cannot live inside a worktree that may be removed.

This repository owns the manual workflow, schema, validation, documentation,
and dogfood evidence. Reusable execution skills remain owned by the separate
agent-skills repository. Git and GitHub remain external state: this increment
may inspect them, but destructive Git actions stay manual and separately
authorized.

## Goals / Non-Goals

**Goals:**

- Establish one portable, versioned record contract for planned, registered,
  delivered, and cleaned-up local resources.
- Make ownership exact enough that a human can safely audit and clean the next
  nine dogfood deliveries without inferring from branch names or ancestry.
- Preserve primary and unrelated work, provide an exit for every gate, and
  retain structured evidence for evaluating later narrow automation.
- Keep the implementation limited to schemas, validation, documentation, and
  fixtures; no Git mutation engine is introduced.

**Non-Goals:**

- Automating Git creation, checkout, worktree removal, branch deletion, or
  GitHub mutation.
- Retiring current unregistered resources, remote branches, or resources owned
  by another change.
- Extending `tracking.yaml` with mutable local delivery state.
- Creating or modifying a reusable cleanup skill in this repository.

## Decisions

### 1. Add a repository-defined stage after lifecycle-record delivery

Workspace cleanup is documented after the lifecycle-record pull request rather
than added to OpenSpec's selected action list. Archive continues to preserve
historical intent; it does not claim to retire working resources.

Alternative: add a generated `cleanup` OpenSpec action. Rejected because the
selected OpenSpec profile does not define one and this manual repository stage
does not need generator integration.

### 2. Store exact local records under the shared Git metadata directory

Every worktree resolves the operational root by running
`git rev-parse --git-common-dir`; portable instructions append the versioned
relative location `sdd/workspace-cleanup/v1/`. Each selected change has a
`register.json` and a `receipts/` directory. No portable file stores the
resolved absolute directory.

JSON is selected for the first version because Node can parse it without a
runtime dependency and exact schema fixtures remain compact. One checked-in
`schemas/workspace-cleanup-v1.schema.json` describes both register and receipt
documents. Ajv is a development-only test dependency that compiles that schema
against the shared fixture corpus; the focused runtime validator applies
security and live-invariant checks that JSON Schema cannot express alone.

This preserves portability across supported assistants and linked worktrees:
only the relative record layout is versioned, while every machine-local root is
derived at invocation time.

Alternative: use `tracking.yaml` or an archived change. Rejected because those
are version-controlled portable history, reject mutable delivery fields, and
may be inside a worktree being removed. Alternative: commit every exact
receipt. Rejected because machine-local details would dirty the default
worktree and require a new delivery solely to record cleanup.

Sanitized material outcomes and friction are summarized in
`ai-planning/notes/issue-and-friction-log.md` or the campaign observation
ledger. Those summaries are durable learning, not cleanup authorization.

### 3. Use a human-readable compound resource key

Each entry requires:

- `change`: the selected OpenSpec change name;
- `role`: `implementation` or `lifecycle-record`;
- `kind`: `branch` or `worktree`; and
- `attempt`: an integer starting at `1`.

The stored record always includes `attempt: 1`; "implicit first attempt" is
only conversational shorthand. A branch and a worktree supporting the same
role are separate entries. A cancelled or blocked entry remains immutable as
history, and its replacement increments the attempt for that change, role, and
kind. A worktree entry refers to its associated branch by that branch's full
natural key, with `kind: branch`, rather than an opaque identifier. The branch
must have the same change and role, but attempts advance independently by kind:
a replacement worktree can therefore remain associated with an earlier valid
branch attempt.

Alternative: opaque resource IDs plus ownership tokens. Rejected because the
workflow normally has at most one active branch and worktree for each role and
kind; the compound key is unique, reviewable, and sufficient for manual
operation.

### 4. Separate planned intent from verified ownership

Before manual Git creation, the contributor writes a `planned` entry with the
starting commit, intended full branch ref or portable worktree name, role,
kind, attempt, and recovery reference. The local filesystem destination is
chosen for the manual Git command but is not persisted. Immediately after Git
creation, live inspection binds the actual Git worktree administrative identity
and either promotes the entry to `registered` with matching evidence or
transitions it to `cancelled`/`blocked`.

Registered worktree records use the inspected Git administrative identity and
the full key of an existing registered branch for the same change and role;
the branch and worktree attempt numbers need not match. The current filesystem
path is resolved from live Git output and is never persisted. If Git chooses
an administrative identity that does not match the planned portable name,
registration is blocked until the entry is cancelled or corrected through a
new worktree attempt. The primary worktree is identified live and cannot be
registered as a cleanup target. Implementation and lifecycle-record resources
are registered separately; lifecycle resources start from the
post-implementation default branch.

Alternative: register at planning time. Rejected because intent is not proof
of creation. Alternative: discover ownership during cleanup. Rejected because
names, locations, commits, and pull requests are clues rather than ownership
evidence.

### 5. Bind delivery evidence without overloading tracking metadata

Registered entries gain role-specific references to the expected pull request
and delivered commit after each merge. Cleanup entry gates separately confirm:

- the implementation and lifecycle-record pull requests are merged;
- the closed issue matches the valid `tracking.yaml`;
- the archive and living spec are visible on the default branch; and
- when Project configuration applies, the item is in the configured completion
  state.

When no Project is configured, the receipt uses an explicit `not-applicable`
result. In this repository the v1 tracking contract includes Project data, so
the gate applies to dogfood changes. Credentials, provider item IDs, field IDs,
timestamps, and raw command output are excluded from records.

### 6. Separate audit from destructive authorization

The audit validates the register, re-inspects only its selected-change
resources, evaluates delivery gates, and classifies each entry as `eligible`,
`already-absent`, or `ineligible`. It displays the exact local actions but
cannot perform them. Legacy or unregistered resources are excluded even when
their name or ancestry appears related.

After separate explicit authorization, the human re-runs the relevant live
inspection immediately before each exact action. A secondary worktree is
removed before its associated local branch. Any state drift cancels the
remaining authorization and returns to audit. Remote deletion, force flags,
broad globs, resets, and commands sourced from untrusted text remain outside
the contract.

Alternative: authorize from the earlier audit snapshot. Rejected because local
state can change between review and action.

### 7. Make receipts incremental and restartable

A `cleanup-run-v1` receipt is written before the first authorized action. It
contains the selected change and run number, delivery-gate results, resource
keys, classifications, authorized actions, outcomes, preservation reasons,
recovery references, manual-effort data, and bounded friction codes. The file
is updated after each manual action.

A resumed run never replays a completed action. It treats already-absent
resources as complete and re-audits interrupted, blocked, or state-drifted
entries. A zero-resource audit produces a successful receipt. Cleanup exits
when every registered resource is completed, already absent, or intentionally
ineligible with a recovery reference.

Receipt files use `cleanup-run-<run>.json`, where `run` is a positive number
that is never reused for that change. Resource order records action order. A
newly started receipt may list both associated actions as pending; once a
branch action is attempted, every registered worktree for that role must
already be completed or already absent. A `started` or `blocked` receipt must
retain at least one pending or failed entry; when every entry is terminal, the
receipt status is `completed`.

### 8. Add one focused validator, not an execution framework

Implementation adds:

- `schemas/workspace-cleanup-v1.schema.json` for the portable document shape;
- `scripts/validation/lib/workspace-cleanup.mjs` for parsing, normalization,
  unsafe-field checks, compound-key uniqueness, state transitions, and receipt
  consistency;
- `scripts/validation/validate-workspace-cleanup.mjs` for bounded CLI
  diagnostics over an explicit register or receipt path; and
- `scripts/validation/test/workspace-cleanup.test.mjs` for direct positive,
  negative, round-trip, transition, and security cases.

The validator reads evidence and returns decisions; it does not create or
delete Git resources. Existing Node tooling and test conventions are reused,
and no third-party runtime package is added.

### 9. Update the operating surfaces before the next resource is created

`README.md`, `docs/sdd-workflow.md`, and
`docs/design/glossary/02-lifecycle.md` distinguish Archive,
lifecycle-record delivery, and Workspace cleanup. Both
`ai-planning/plans/change-runbook.md` and `change-runbook-ai.md` add the
planned → created → inspected → registered handoff before branch creation and
the audit/authorization/receipt stage after lifecycle delivery.

`ai-planning/plans/dogfood-10-changes.md` and `dogfood-observations.md` record
the campaign entry point and subsequent manual-run evidence without copying
authoritative issue or OpenSpec content.

### 10. Defer automation until the approved evidence threshold

Receipts support later review, but they do not authorize an adapter. A later
agent-skills design review requires at least ten completed end-to-end manual
runs, the same friction in at least three independent runs, no unresolved
relevant safety issue, and a narrowly scoped proportionate proposal that keeps
all authorization and recovery gates. A no-resource dry run does not count.

## Risks / Trade-offs

- **Two record locations can confuse ownership** → Documentation states that
  Git-shared records authorize local cleanup while checked-in notes preserve
  only sanitized learning.
- **Manual JSON editing can introduce invalid or stale data** → Validate before
  registration, delivery binding, audit, and resume; reject ambiguous records
  with a correction path.
- **Local evidence disappears with its clone** → Cleanup evidence is needed
  only for resources in that clone; durable material learning is summarized in
  version control.
- **A record could provide false confidence** → Never trust it alone; exact
  live reinspection and delivery evidence are mandatory before action.
- **Additional steps increase delivery effort** → Keep the schema and validator
  focused, measure manual effort, and use the resulting evidence to decide
  whether a later narrow adapter is justified.
- **Project or GitHub evidence may be temporarily unavailable** → Classify the
  gate as blocked, preserve resources, and retry from an authenticated allowed
  environment.

## Verification Strategy

Objective completion evidence consists of:

1. Direct Node tests covering valid register and receipt round trips; duplicate
   compound keys; invalid attempts and transitions; branch/worktree separation;
   cancellation; delivery mismatch; primary, dirty, locked, legacy,
   already-absent, and zero-resource classifications; ordered action receipts;
   resume; conditional Project evidence; and unsafe-field redaction.
2. CLI fixtures proving bounded success and failure output without emitting
   credentials, absolute paths, or untrusted external content.
3. The repository's full validator test suite, hardcoded-environment check,
   artifact-quality validation, strict OpenSpec validation, and
   `git diff --check`.
4. A reviewed manual walkthrough that plans, creates, inspects, and registers
   disposable example resources, audits without mutation, records a
   zero-action receipt, and cleans any disposable fixture only under separate
   explicit authorization. The walkthrough must not target current legacy
   resources.

## Attribution and Licensing

The change adds original repository documentation, schemas, fixtures, and
Node.js validation code under the repository's existing license. It copies no
third-party implementation and introduces only the Ajv development dependency
used to test schema conformance; the validator runtime and CLI add no runtime
dependency or service. Git and GitHub interfaces are used through their
documented command outputs; any later reuse of agent-skills code requires a
separate attribution and license review in that repository.

## Recovery

- If the shared Git directory cannot be resolved, stop and rerun from a valid
  repository worktree; do not fall back to a guessed path.
- If a planned creation fails or inspection mismatches, keep the entry
  cancelled or blocked, correct the cause, and use the next attempt.
- If a register or receipt is invalid, preserve all resources, correct it from
  live evidence, and revalidate before continuing.
- If delivery or Project evidence is unavailable, preserve resources and retry
  from an authenticated environment; do not downgrade the gate.
- If a resource is primary, dirty, locked, unknown, externally referenced, or
  delivery-mismatched, mark it ineligible with a bounded reason and recovery
  reference.
- If an authorized action fails or the session stops, leave the started receipt
  in place, inspect current state, and resume only the incomplete resources.
- If implementation must be rolled back, revert the versioned schema,
  validator, and documentation through normal Git review. Local records remain
  inert evidence and MUST NOT be used to infer deletion authority under the
  reverted workflow.

## Reuse Plan

Reuse the current Node test runner, validation layout, tracking contract,
artifact-quality gate, Git discovery commands, GitHub delivery evidence, and
the conservative classifications already established by the installed cleanup
skill. Keep repository-specific values in change tracking or configuration and
derive live Git identities at runtime. No controller, new package, or reusable
execution adapter is added.

## Migration Plan

1. Land the schema, read-only validator, tests, and operating documentation.
2. Start the first new register before creating the next dogfood change's
   implementation branch or secondary worktree.
3. Do not backfill or act on existing unregistered branches and worktrees.
4. Record each subsequent manual run and review the evidence only after the
   approved threshold is reached.
