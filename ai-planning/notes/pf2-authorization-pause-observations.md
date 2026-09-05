# PF2 authorization pause observations

## Scope

This note records the human pauses observed while delivering
`align-artifact-quality-gates` through the dogfood campaign. It is evidence
from one manual run, not authorization to remove gates or automate the
workflow.

## Observed pauses

| Boundary | Current purpose | Initial disposition |
| --- | --- | --- |
| Propose to Apply | Prevent planning artifacts from authorizing implementation. | Retain as an explicit human authorization. |
| Verified implementation to implementation delivery | Authorize commit, push, pull-request creation, and eventual merge into the default branch. | Retain the external-mutation boundary, but evaluate whether one bounded authorization can cover delivery through an exact-head green-CI merge. |
| Implementation delivery to Sync | Authorize writing requirements into living specifications. | Candidate to combine with Archive when delivery, exact delta parity, and validation gates pass. |
| Sync to Archive | Authorize moving the completed change into dated history. | Candidate to combine with Sync under one named post-delivery lifecycle authorization, while retaining stop-on-failure behavior. |
| Archive to lifecycle-record commit, push, and PR | Authorize publishing the synchronized spec and archive record. | Retain the external-mutation boundary; avoid splitting commit, push, and PR creation when the reviewed diff is unchanged. |
| Lifecycle-record PR creation to merge and register binding | Wait for exact-head CI before merging and recording delivery evidence. | Candidate for continuation under the same lifecycle-delivery authorization when CI is green and the head is unchanged. |
| Lifecycle delivery to cleanup audit | Recheck delivery, issue, Project, ownership, and resource safety. | A read-only audit should not need a mutation authorization; it should run before presenting exact cleanup actions. |
| Cleanup audit to exact cleanup actions | Authorize deletion of named secondary worktrees and local branches. | Retain as an explicit, exact-target authorization. Never include the primary worktree, remote branches, force options, or patterns. |

Status questions and explanatory handoffs were user-driven collaboration, not
workflow authorization gates. Host sandbox approvals are runtime permission
checks and must remain distinct from product-level authorization.

## Automation-relevant findings

- One bounded authorization may be able to cover each delivery sequence through
  an exact-head, green-CI merge, provided any drift or failed check expires it.
- Sync and Archive appear separable for recovery but may not require separate
  human approvals when invoked together after verified implementation delivery.
- Cleanup needs one read-only audit followed by one exact destructive-action
  approval; an additional approval merely to run the audit adds no safety.
- The reusable cleanup helper currently requires `ownershipToken` and
  `registeredAt`, while the repository cleanup register intentionally contains
  neither. Do not fabricate those values. Resolve the contract mismatch through
  a later design change before claiming automated cleanup support.
- The PF2 register directory existed without its required `receipts/`
  subdirectory, so the first receipt-persistence attempt failed safely before
  deletion. The manual recovery is to create only the exact change-owned
  receipts directory, revalidate the receipt, and retry persistence. A later
  adapter must create and verify both register and receipt locations together.
- Safe local branch deletion warned that the topic was not merged into the
  dirty primary checkout's stale `HEAD`, even though its exact head was proven
  merged into current `origin/main` and into its tracking ref. Cleanup logic
  must bind ancestry to the delivered default-branch commit rather than infer
  safety from whichever worktree happens to execute the deletion.

Revisit these dispositions only after additional independent campaign runs.
Preserve all existing evidence, recovery, exact-target, and drift-expiration
gates in any later design.
