# Design review — how this change observes its own scope

Record ID: `RR-DR-2026-09-10-01`
Date: 2026-09-10
Change: `establish-streamlined-review-readiness` (issue #33)
Mode: owner-directed design review, required by the second-repair stop before
any further repair of this claim. **Not** a review pass, not approval, not Apply
authorization.

## Why this review exists

One claim has now failed three times: *everything this change edited is inside
its declared scope, and here is the check that observes it.*

| Failure | Binding | Observer at the time | How it failed |
| --- | --- | --- | --- |
| `rr-status-vacuous` | retired attempt, pass 2 | `git status --short` | Reported the untracked change directory as one entry; could not see edits inside it |
| `p3-boundary-observer` | retired attempt, pass 3 | named listing of planning-boundary files | Could not observe any path outside the boundary, which is what it claimed to confirm |
| `ARR-001` | rebuild, review 3 | `git status --porcelain=v1 --untracked-files=all` in a clean worktree | Cannot see committed work. Demonstrated live: 23 files changed on the working branch, 4 visible to the command |

The repair budget for this claim was exhausted at the second failure. The third
failure therefore returns it here rather than to a fix, under the rule this
change exists to establish.

## Root cause

The first two failures were treated as bad command choices and repaired by
choosing a different command. That diagnosis was wrong, which is why the third
repair failed the same way.

Every version placed a **local, point-in-time observer** at a moment chosen by
the implementer, and asked it to prove a statement about the **whole change**.
That cannot work, because what a local observer can see depends on how the
implementer happened to sequence their work. `git status` sees uncommitted work
only, so it goes blind exactly when an implementer commits as they go — which is
normal practice and which task 0.1 now explicitly requires for the planning
directory.

The third failure is also repair-induced in a specific and instructive way. Two
fixes from a single round are mutually incompatible: review 1's finding 2
required committing the planning directory into the delivery worktree, and
review 1's finding 4 adopted `git status` as the scope observer. Committing is
what makes the observer blind. Both were written in the same pass without
noticing they contradicted.

## Options considered

1. **Two local observers.** `git diff --name-only <base>...HEAD` for committed
   work plus `git status` for uncommitted, compared as a union. Correct, cheap,
   and the reviewer's suggested direction. Rejected as the authoritative check:
   it is the third variant of "run a command locally at a chosen moment," and it
   still depends on the implementer holding the correct base. The failure mode
   that killed three versions is not addressed, only made less likely.
2. **Selected — observe at the pull request.** The change's scope is checked
   against the pull request's changed-file list. Accepted; see below.
3. **Drop the claim.** The Verification-to-closure gate already puts a human in
   front of the pull-request diff, so the check may earn nothing. Rejected, but
   not dismissed: `tracking.yaml` would become a declaration that nothing
   verifies. If option 2 fails in use, this is the next candidate rather than a
   fourth observer.

## Decision

**The pull request's changed-file list is the authoritative scope observer.**

At delivery, the set of files the pull request changes must equal the union of
two categories:

| Category | Contents |
| --- | --- |
| Delivered guidance | The paths in `tracking.yaml` |
| Change-owned working files | This change's planning directory and its review record |

A file in neither category is a finding. A file in the inventory that was not
edited is not a scope failure; delivery evidence covers that separately.

The property that makes this different from the three failed versions: a pull
request's file list is computed by the forge against the merge base, so it is
complete by construction **regardless of how the work was committed**. Commit
granularity and the implementer's sequencing — the exact variable that defeated
every previous observer — cannot affect it.

A local `git diff --name-only <base>...HEAD` remains available during
implementation as a convenience. It carries no evidentiary weight and no task
records it as evidence. Recording it as evidence would recreate the failure.

## Verification cases

The claim must be exercised against a known-bad case, not only a conforming one.

| Case | Expected |
| --- | --- |
| Pull request changes exactly the two categories | Scope check passes |
| Pull request contains a file in neither category | Scope check fails and names that file |
| The same work committed as one commit, or as ten | Identical file list; the check is unaffected |
| An inventory path is never edited | Not a scope failure; delivery evidence reports it separately |
| A file is added and then reverted within the branch | Absent from the pull request's list, and correctly so — the delivered state is what scope governs |

The third row is the one that matters. It is the property all three previous
observers lacked, and it is what should be confirmed first if this decision is
ever revisited.

## Consequences for the artifacts

- `design.md` replaces the clean-worktree observer with this one and records why
  a local observer is not the authority.
- `tasks.md` 5.1 keeps its structural, accuracy, and regression checks and no
  longer claims to observe whole-change scope.
- `tasks.md` 6.1 carries the scope check as delivery evidence.
- `tasks.md` 5.2 gives the review record an exact committed path so it falls in
  a category and reaches the default branch, resolving `ARR-003`.
- The entry gate names an exact preservation commit rather than a mutable
  branch, resolving `ARR-002`.

## Standing

This decision does not reset the review count. The next review of this change is
its fourth evaluation, carrying the history above. Should this observer fail, the
response is option 3 — remove the claim — and not a fifth observer.
