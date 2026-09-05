## 1. Versioned record contract

- [x] 1.1 Add `schemas/workspace-cleanup-v1.schema.json` for register and
  `cleanup-run-v1` receipt documents, including compound resource keys,
  lifecycle states, delivery gates, outcomes, recovery references, manual
  effort, and bounded friction codes.
  - Depends on: None.
  - Evidence: The schema accepts reviewed valid register and receipt fixtures
    and rejects missing or ill-typed required fields.

- [x] 1.2 Implement `scripts/validation/lib/workspace-cleanup.mjs` parsing,
  normalization, unsafe-field redaction, resource-key uniqueness, and
  planned/registered/cancelled/blocked transition checks.
  - Depends on: 1.1.
  - Evidence: Direct unit tests demonstrate deterministic valid round trips
    and bounded failures for duplicate keys, invalid attempts, and invalid
    transitions.

- [x] 1.3 Extend the focused library with delivery-gate, resource
  classification, authorization-state, receipt-consistency, and resume checks
  without executing Git or GitHub mutations.
  - Depends on: 1.2.
  - Evidence: Direct unit tests cover eligible, already-absent, ineligible,
    zero-resource, interrupted, and resumed outcomes.

- [x] 1.4 Add `scripts/validation/validate-workspace-cleanup.mjs` to validate
  an explicit local register or receipt path and return bounded actionable
  diagnostics.
  - Depends on: 1.2, 1.3.
  - Evidence: CLI tests show stable success and non-zero failure behavior
    without printing unsafe values or absolute worktree paths.

## 2. Contract verification and security cases

- [x] 2.1 Add direct tests for branch/worktree separation, implementation and
  lifecycle-record roles, per-kind attempt increments, creation mismatch, and
  preservation of cancelled or blocked attempts.
  - Depends on: 1.2.
  - Evidence: `scripts/validation/test/workspace-cleanup.test.mjs` passes every
    resource-registration case named in the delta spec.

- [x] 2.2 Add tests for primary, dirty, locked, unknown,
  delivery-mismatched, externally-referenced, legacy, already-absent, and
  zero-resource classifications plus worktree-before-branch receipt ordering.
  - Depends on: 1.3.
  - Evidence: The focused test file proves ineligible resources are preserved,
    completed actions are not replayed, and state drift requires re-audit.

- [x] 2.3 Add security and portability cases for credential-like fields, raw
  authentication output, absolute paths, untrusted external text, remote
  deletion, conditional Project evidence, and equivalent normalized results.
  - Depends on: 1.3, 1.4.
  - Evidence: Focused tests reject unsafe input without echoing values and pass
    environment-neutral fixtures for every supported assistant.

## 3. Manual operating guidance

- [x] 3.1 Update `README.md`, `docs/sdd-workflow.md`, and
  `docs/design/glossary/02-lifecycle.md` so Archive, lifecycle-record delivery,
  and Workspace cleanup have distinct meanings and every gate names its exit.
  - Depends on: 1.1, 1.4.
  - Evidence: Documentation review finds the complete lifecycle sequence,
    Git-shared record location, audit/authorization boundary, safe exits, and
    no claim that Archive retires resources.

- [x] 3.2 Update `ai-planning/plans/change-runbook.md` and
  `ai-planning/plans/change-runbook-ai.md` with the planned → manually created
  → inspected → registered sequence before resource creation and the
  audit/authorization/receipt sequence after lifecycle delivery.
  - Depends on: 3.1.
  - Evidence: Both runbooks use change + role + kind + attempt keys, separate
    implementation and lifecycle resources, and preserve the primary worktree.

- [x] 3.3 Update `ai-planning/plans/dogfood-10-changes.md` and
  `ai-planning/plans/dogfood-observations.md` with the manual cleanup entry
  point, qualifying-run evidence, and the ten-run/three-recurrence automation
  review threshold.
  - Depends on: 3.2.
  - Evidence: Campaign documents identify which future runs qualify without
    copying authoritative GitHub or OpenSpec content.

- [x] 3.4 Update the existing post-Archive cleanup entry in
  `ai-planning/notes/issue-and-friction-log.md` to point to the implemented
  manual contract and its next evidence-based exit without claiming that
  legacy resources were cleaned.
  - Depends on: 3.3.
  - Evidence: The friction log distinguishes the resolved contract gap from
    preserved legacy resources and identifies the first qualifying manual run.

## 4. End-to-end evidence and review

- [x] 4.1 Perform a reviewed non-destructive walkthrough using disposable
  example records to plan, inspect, register, gate, audit, and produce a
  zero-action receipt; do not target current legacy resources.
  - Depends on: 2.1, 2.2, 2.3, 3.4.
  - Evidence: Reviewed command output and fixtures show the full manual record
    flow and no Git or GitHub mutation by the validator.

- [x] 4.2 Conduct a security, portability, recovery, and proportionality review
  of the schema, validator, instructions, and test fixtures.
  - Depends on: 4.1.
  - Evidence: Review confirms no credentials, absolute paths, product-specific
    constants in portable assets, remote deletion, force behavior, controller,
    or unclosed gate.

- [x] 4.3 Run the repository validator tests, no-hardcoded-environment check,
  focused artifact-quality validation, strict OpenSpec validation, and
  `git diff --check`; repair only findings within the approved design.
  - Depends on: 4.2.
  - Evidence: Every required command exits successfully and the reviewed diff
    remains scoped to `formalize-workspace-cleanup`.

- [x] 4.4 Perform a final correctness, completeness, and coherence review
  against Issue #5, the approved design brief, proposal, delta spec, and design.
  - Depends on: 4.3.
  - Evidence: All confirmed findings are fixed, or any unresolved finding is
    documented as an actionable blocker before Verify.
