## 1. Fresh discovery and mutation preview

- [x] 1.1 Inspect the maintained issue forms, current live label inventory,
  issue-label use, and applicable label-property configuration immediately
  before mutation; derive the persistent names and a collision-free rehearsal
  target with complete properties.
  Depends on: Planning review approval.
  Evidence: A non-sensitive issue comment records the discovered required form
  labels, property-source decision, current inventory summary, and confirmation
  that the rehearsal target is not an existing or referenced label.

- [x] 1.2 Present the exact create/delete rehearsal action and the complete
  name/color/description mapping for every temporary and persistent label for
  just-in-time human authorization.
  Depends on: 1.1.
  Evidence: The approved preview identifies the derived mapping, its sources,
  only the dedicated rehearsal label and labels currently declared by maintained
  issue forms, and a bounded rollback path.

## 2. Reversible rehearsal

- [x] 2.1 Create the dedicated temporary rehearsal label after the exact
  external-state authorization.
  Depends on: 1.2.
  Evidence: Fresh live inspection confirms the temporary label exists with the
  approved properties and no existing label was edited.

- [x] 2.2 Delete the same temporary label and confirm its absence using a fresh
  live inventory before persistent-label creation.
  Depends on: 2.1.
  Evidence: Fresh inspection confirms the temporary label is absent and the
  before/after inventory comparison identifies no unintended label change.

- [x] 2.3 Re-read the maintained forms, live inventory, issue-label use, and
  applicable property configuration after the rehearsal; derive and present a
  fresh persistent-only name/color/description mapping for explicit
  authorization.
  Depends on: 2.2.
  Evidence: A new approved preview records the refreshed persistent mapping,
  its sources, the current inventory, and the bounded rollback path immediately
  before persistent creation.

## 3. Persistent label reconciliation

- [x] 3.1 Create only the labels currently declared by the maintained issue
  forms after the rehearsal succeeds and the exact persistent mapping is
  approved.
  Depends on: 2.3.
  Evidence: Fresh live inspection confirms each currently declared form label
  exists with the approved properties.

- [x] 3.2 Verify every label in the maintained issue forms resolves in the
  live repository and record scoped non-sensitive discovery and mutation
  evidence in the GitHub issue comment.
  Depends on: 3.1.
  Evidence: The issue comment and reviewed live inventory show form-to-label
  alignment without raw CLI output, credentials, or provider-internal IDs.

## 4. Validation and review

- [x] 4.1 Run focused external-state verification and the complete repository
  validation set.
  Depends on: 3.2.
  Evidence: Live form-label comparison, Node tests, portability, tracking,
  artifact-quality, strict OpenSpec, and whitespace checks pass.

- [x] 4.2 Review the completed change against the proposal, specification, and
  design before requesting the Verification-to-closure gate.
  Depends on: 4.1.
  Evidence: Review confirms the rehearsal, recovery evidence, exact mutation
  boundaries, portability, and non-goals remain coherent.

- [ ] 4.3 Deliver the reviewed implementation through the repository's normal
  pull-request process with the issue link and OpenSpec change name.
  Depends on: 4.2 and approval of the Verification-to-closure gate.
  Evidence: The delivery pull request links the primary issue and identifies
  `OpenSpec change: align-issue-template-labels`.
