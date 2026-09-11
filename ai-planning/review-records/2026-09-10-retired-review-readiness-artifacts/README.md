# Retired artifacts — establish-streamlined-review-readiness

Date: 2026-09-10

## What this is

A verbatim copy of the planning artifacts for
`establish-streamlined-review-readiness`, taken immediately before that change
directory was removed from `openspec/changes/`, together with a patch holding
the glossary additions that existed only in the primary worktree.

This folder is historical evidence. It is not an active change, is not
validated, and must not be copied back into `openspec/changes/`. The change
directory it came from was untracked, so without this copy these bytes would
have no record in version control at all.

## Why the artifacts were retired

Three review passes recorded roughly thirty open findings without reaching
Apply. The diagnosis and the decision to rebuild rather than patch are in
[the simplified-contract design brief](../../design-briefs/2026-09-10-review-readiness-simplified-contract.md),
which supersedes
[the design reconciliation brief](../../design-briefs/2026-09-08-review-readiness-design-reconciliation.md),
[the convergence brief](../../design-briefs/streamlined-review-readiness-and-convergence.md),
and [the loop-termination brief](../../design-briefs/review-loop-termination.md).

The short version: the artifacts were roughly six times the size of any peer
change in this repository and governed a guidance surface smaller than
themselves. They required several facts to be restated word-for-word across
four to eight files and used a hand-maintained register to police those
restatements, which turned every edit into an N-file obligation and every
missed file into a finding.

The replacement is a documentation-only change: one review guide, a short
pointer in the assistant files, one workflow section, and vocabulary. No
capability specification. The enforceable half of the contract is deferred to
the agent-skills repository, after this repository's next runs supply evidence
for what it should enforce.

## Why the review records still apply to these bytes

Every file below was verified byte-identical to its source at copy time.
`review-packet.md` hashes to
`6442a766b314935c218e7d2749415f88d4ef049def8f92f060cec01f72c2f84a`, which is
the exact index digest recorded in
[the pass-3 handoff](../../handoff-docs/2026-09-08-review-readiness-pass-3-handoff.md).
The artifacts were therefore unchanged between pass 3 and retirement, and the
three review records below describe these exact bytes.

| File | SHA-256 |
| --- | --- |
| `change-artifacts/.openspec.yaml` | `8119cfe5ad04f1801d3027066b1b671140c63203d1b9ea7592d49018a901fa91` |
| `change-artifacts/design.md` | `27e491068f9a06db433346112e891804d46a085b185824f656d54101f7f31b1c` |
| `change-artifacts/proposal.md` | `604ed0de896910396a53371f29736dc417a0cb99057de42192a116e224978c61` |
| `change-artifacts/review-packet.md` | `6442a766b314935c218e7d2749415f88d4ef049def8f92f060cec01f72c2f84a` |
| `change-artifacts/specs/review-readiness/spec.md` | `a6362f476eb4c836dfe87997f7591ee3da1f57ce319b448de38c78a4556e014f` |
| `change-artifacts/tasks.md` | `9f731b3ceee8faf5cb5261a359776ff9c8449d12d70d3fdd6996def0d765731a` |
| `change-artifacts/tracking.yaml` | `4b1af7e8d04a526ae9cc58257046ab2c230f64ec0d32be8742bfe8e064ee4dd6` |

Recorded base commit at pass 3:
`1963c872178d3e563aa5cb8b3f4607066732a3b0`.

## The review history these artifacts produced

Read in this order:

1. [Pass-3 handoff](../../handoff-docs/2026-09-08-review-readiness-pass-3-handoff.md)
2. [Pass 3](../2026-09-08-establish-streamlined-review-readiness-pass-3.md) —
   sixteen findings, the current review result
3. [Pass 2](../2026-09-08-establish-streamlined-review-readiness-pass-2.md) —
   fourteen findings, none dispositioned by identity
4. [Pass-2 correction](../2026-09-08-establish-streamlined-review-readiness-pass-2-correction.md)
5. [Pass 1](../2026-09-08-establish-streamlined-review-readiness-pass-1.md)

Supporting input:
[witness testimony](../../notes/2026-09-08-review-readiness-witness-testimony.md)
and the reconciliation brief's
[self-review](../2026-09-08-review-readiness-design-reconciliation-self-review.md).

No finding in those records is dispositioned by this folder. Every open
identity from passes 1, 2, and 3 still needs an explicit outcome; that record
is written separately before the replacement artifacts are authored.

## `glossary-additions.patch`

The five glossary terms this change intended to deliver existed only as
uncommitted edits in the primary worktree, where a clean delivery worktree
created from the default branch could not see them. That was recorded as
findings `IF-4` and `p3-glossary-stranded`.

The patch preserves them against
`1963c872178d3e563aa5cb8b3f4607066732a3b0`. It covers
`docs/design/glossary/02-lifecycle.md`,
`docs/design/glossary/03-change-and-artifacts.md`, and
`docs/design/glossary/05-validation-and-recovery.md`, adding the
`independent reviewer` and `same-session local review` entries plus
cross-reference extensions.

The working tree was deliberately left untouched when this patch was taken, so
the edits still exist in both places and neither route loses them. The
replacement change delivers the glossary from this committed source rather than
from a working copy.

Apply with `git apply` from the repository root. Reconcile against the
then-current base before use; do not apply it blind if the glossary has moved.
