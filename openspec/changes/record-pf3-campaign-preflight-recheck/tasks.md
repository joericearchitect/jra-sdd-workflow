## 1. Recheck and reconcile campaign records

- [x] 1.1 Recheck every campaign-entry gate from the preflight disposition
  against durable PF1–PF3 issue, PR, archive, observation, validation, and
  current-default-branch evidence; preserve `Blocked` if any input fails.
  Depends on: Proposal and design decisions 1, 2, and 4.
  Evidence: a sanitized observation identifies each gate input, its source,
  pass/fail result, the reviewed default-branch commit, and any recovery path.
- [x] 1.2 Update the campaign roadmap only after task 1.1 passes: record PF3
  implementation/lifecycle/archive evidence and change candidate 1 from
  `Blocked` to `Not started`; retain `In progress` exclusively for its actual
  Explore and leave candidate 1's GitHub issue and Project state unchanged.
  Depends on: 1.1.
  Evidence: roadmap review shows completed PF3 evidence, no stale active-PF3
  claim, the exact permitted candidate-state transition, and no GitHub-state
  instruction or mutation.
- [x] 1.3 Add the recheck and omitted-ledger-update recovery lesson to the
  sanitized observation ledger without copying credentials, transient output,
  or unreviewed model text.
  Depends on: 1.1 and 1.2.
  Evidence: observation review finds durable source links, reproducible command
  outcomes, no secret or environment-specific workflow default, and a clear
  recovery if later evidence drifts.

## 2. Verify the documentation-only correction

- [x] 2.1 Run focused and complete validation: Node tests, portability,
  selected-change tracking and artifact validators, strict OpenSpec validation,
  and `git diff --check`; confirm `skip_specs: true` has no delta specs.
  Depends on: 1.2 and 1.3.
  Evidence: each command exits successfully and validation output names no
  changed living specification or failed gate.
- [x] 2.2 Self-review the recheck evidence, campaign-state semantics, external
  state boundary, and recovery wording before Gate 3; apply at most one
  evidence-backed objective correction to this campaign-record component.
  Depends on: 2.1.
  Evidence: review finds no unsupported gate claim, premature `In progress`,
  candidate GitHub-state mutation, sensitive value, or second repair need.
- [ ] 2.3 At Gate 3, pause with the current reviewed head and verification
  evidence for a human decision. If the human selects independent review,
  obtain a fresh read-only review and handle its bounded objective-fix/test
  loop; otherwise record direct closure authorization for the exact head.
  Depends on: 2.2.
  Evidence: human Gate 3 decision identifies the reviewed head and verification
  evidence; a selected independent-review conclusion binds that same head.

## 3. Deliver the approved record correction

- [ ] 3.1 Deliver the approved correction through the normal issue-linked
  implementation and lifecycle-record pull-request sequence; preserve the
  archived PF3 resources and create no candidate 1 GitHub-state mutation.
  Depends on: 2.3.
  Evidence: both pull requests contain the required linkage, pass validation,
  and record the merged commits; the original PF3 cleanup register remains
  unchanged except for its later authorized cleanup receipt.
