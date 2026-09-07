## 1. Definition-of-done reference

- [x] 1.1 Add a concise matrix to `docs/sdd-workflow.md` for Explore, Propose,
  Apply, Verify, Sync, and Archive, with entry condition, durable exit evidence,
  and recovery for each action.
  Depends on: Planning review approval.
  Evidence: The matrix contains all six selected actions and every row has all
  three fields.

- [x] 1.2 Link each matrix row to the existing authoritative detailed guidance
  without duplicating workflow, artifact, delivery, or cleanup contracts.
  Depends on: 1.1.
  Evidence: Review confirms every row has a relevant source link and no new
  lifecycle phase or automatic transition is described.

## 2. Security, validation, and review

- [x] 2.1 Review the new documentation for security and portability boundaries:
  no credentials, executable content, absolute paths, or environment-specific
  values.
  Depends on: 1.1 and 1.2.
  Evidence: The no-hardcoded-environment validator passes and the reviewed
  matrix remains assistant-portable.

- [x] 2.2 Run focused documentation checks and the complete repository
  validation set.
  Depends on: 2.1.
  Evidence: Tracking, artifact-quality, strict OpenSpec, Node tests, and
  whitespace checks pass with recorded output.

- [x] 2.3 Review the completed change against the proposal and design before
  requesting delivery.
  Depends on: 2.2.
  Evidence: Review confirms scope, recovery paths, links, and non-goals remain
  coherent.

- [x] 2.4 Prepare change-scoped delivery evidence after verification without
  widening the documentation-only scope.
  Depends on: 2.3.
  Evidence: The proposed deliverable paths, issue linkage, and required PR-body
  markers are identified for the delivery review.
