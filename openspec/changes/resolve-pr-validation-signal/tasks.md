## Apply preconditions (external to task dependencies)

The Planning-to-Apply gate must approve this named change, and current
resource-registration evidence must be available before task 1.1 begins. These
are external entry conditions, not task dependencies.

## 1. Establish a safe implementation base

- [x] 1.1 Create and register the candidate-7 implementation resources from a freshly inspected `origin/main` base; exclude unrelated tracked, untracked, archived-copy, and primary-worktree changes while preserving them in place.
  - Depends on: None.
  Evidence: The registered branch and secondary worktree exactly match the selected change and freshly inspected base; unrelated local work remains preserved.

## 2. Retire the dead changed-path pathway

- [x] 2.1 Remove the PR-contract `requiresOpenSpecValidation` calculation, `changedPaths` parameter, and `--changed-paths-file` CLI flag; update focused expected-result coverage for unchanged PR parsing behavior.
  - Depends on: 1.1.
  Evidence: `scripts/validation/test/pr-contract.test.mjs` passes with the exact remaining result shape and established valid and invalid PR outcomes; its focused CLI check proves the retired flag exits 2 through the existing generic unexpected-argument branch without a bespoke branch.
- [x] 2.2 Remove the linkage workflow's changed-file API call and `--changed-paths-file` caller argument while retaining its Node-based PR-body write; remove `pull-requests: read`.
  - Depends on: 2.1.
  Evidence: The workflow-diff section of `ai-planning/review-records/2026-09-08-candidate-7-planning-recovery.md` confirms the existing Node-based PR-body write remains, no file-list API call or caller flag remains, `contents: read` remains for checkout, and `pull-requests: read` is absent.
- [x] 2.3 Remove linkage forwarding, its `changedPaths` parameter, and its `--changed-paths-file` CLI flag; add focused linkage-validator coverage for unchanged valid and invalid outcomes.
  - Depends on: 2.2.
  Evidence: `scripts/validation/test/openspec-linkage.test.mjs` passes with unchanged valid and invalid linkage outcomes and the retained embedded PR result contract; its focused CLI check proves the retired flag exits 2 through the existing generic unexpected-argument branch. The candidate review record names candidate 8 as the downstream consumer of this newly created test harness.

## 3. Verify retained policy and safety boundaries

- [x] 3.1 Inspect the PR linkage and validation workflows to confirm no changed-path policy remains and strict validation remains unconditional.
  - Depends on: 2.3.
  Evidence: The strict-policy and focused-search sections of `ai-planning/review-records/2026-09-08-candidate-7-planning-recovery.md` record the unchanged unconditional strict-validation step, no newly introduced changed-path policy, and no live repository consumer of the retired pathway.
- [x] 3.2 Review the change for untrusted input, least privilege, secret handling, destructive actions, and compatibility scope.
  - Depends on: 3.1.
  Evidence: The security and recovery section of `ai-planning/review-records/2026-09-08-candidate-7-planning-recovery.md` confirms the removed GitHub API permission is absent, PR text is never evaluated as shell code, no secret or destructive path is added, and any discovered supported consumer returns the work to design review.

## 4. Document, validate, and prepare delivery of the scoped change

- [x] 4.1 Confirm the proposal, design, tracking metadata, and pull-request description document the removed internal CLI and workflow pathway; add no end-user documentation because no supported behavior changes.
  - Depends on: 3.2.
  Evidence: The fan-out and artifact-parity sections of `ai-planning/review-records/2026-09-08-candidate-7-planning-recovery.md` confirm the planning artifacts, planned mutation paths, and PR description explain the removal without claiming a new capability or modifying unrelated documentation.
- [x] 4.2 Run focused and complete validation for the selected change.
  - Depends on: 4.1.
  Evidence: Focused validator tests, the complete Node test suite, no-hardcoded-environment validation, selected-change tracking and artifact validation, strict OpenSpec validation, and `git diff --check` all exit successfully.
- [x] 4.3 Self-review the implementation against the proposal and design before requesting the Verification-to-closure gate.
  - Depends on: 4.2.
  Evidence: The whole-contract section of `ai-planning/review-records/2026-09-08-candidate-7-planning-recovery.md` records task evidence, review-taxonomy coverage, no unapproved CI or Project mutation, no remaining live source consumer, and any unresolved concern or second repair returned to design review.
