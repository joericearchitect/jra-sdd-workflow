# Adversarial review — review-readiness planning change, pass 3

- **Target:** `establish-streamlined-review-readiness`
- **Binding:** current local planning artifacts on
  `preserve-review-readiness-evidence` at `4931a10`; the change directory is
  untracked and no Apply task has run.
- **Reviewer:** same-session local advisory review. This is not independent
  review, OpenSpec Verify, CI evidence, planning approval, or Apply authority.

The planning validators pass, but they verify artifact shape rather than the
execution and evidence model below.

## Cause: the scope observer sees only an uncommitted worktree snapshot

### ARR-001 — blocker — design review required

`tasks.md` has task 0.1 commit the planning directory before task 5.1 uses
`git status --porcelain=v1 --untracked-files=all` as evidence that every change
is in the approved categories. `git status` excludes those committed planning
files and any other earlier committed implementation slice, so it cannot prove
the claimed whole-change boundary. An unrelated committed path can evade 5.1.

This is not a routine objective fix: the design and disposition record say this
exact clean-worktree observer replaced an earlier failure after its repair
budget was exhausted. The change's own rule therefore returns it to design
review.

**Safe direction:** bind the registered starting commit and compare the complete
branch range *and* current worktree state with the two declared categories.
Align task 0.1, task 5.1, and delivery evidence with that one model.

**Evidence:** `design.md:92-103`; `tasks.md:20-39,120-136`; disposition record
`rr-status-vacuous` and `p3-boundary-observer`.

## Cause: required evidence has no immutable, end-to-end lifecycle

### ARR-002 — high — preservation input is named, not bound

The entry gate requires unspecified “preservation commits” on a mutable branch
and gives a command with an unresolved `<preservation-head>` placeholder. Yet
the proposal relies on several records that are absent from `main`. An operator
can choose a partial or moving source boundary, satisfy an improvised ancestry
check, and still create a delivery worktree lacking a cited authority.

**Safe direction:** make one exact commit range or delivered preservation PR the
authoritative prerequisite. Verify that boundary and every cited preserved path
from the registered delivery base before task 0.1 starts.

**Evidence:** `proposal.md:10-23`; `design.md:13-17`; `tasks.md:6-11`.

### ARR-003 — medium — the required exercise record can miss delivery

Task 5.2 creates mandatory review evidence only after task 5.1's final scope
check. The record is deliberately outside `tracking.yaml`, and task 6.1 proves
delivery only for the inventory paths. A pull request can therefore deliver the
guidance without the required exercise record, or leave that evidence in a
disposable worktree.

**Safe direction:** decide whether the exercise record is delivered evidence or
local-only evidence. For delivery evidence, give it an exact committed path and
include it in a final branch-range check. For local-only evidence, define its
durable owner, retention location, and pre-delivery existence check.

**Evidence:** `design.md:80-96,121`; `tasks.md:120-159`.

## Evidence gap

Live issue #33 and Project state were not re-read: `gh issue view` returned
HTTP 401. The selected tracking, artifact-quality, and strict OpenSpec checks
did pass. Those structural checks do not cover the three findings.

## Scope and next action

This was a read-only review of the five planning artifacts and their local
governing sources. No implementation or delivery state was reviewed.

Hold the design review required by ARR-001, and resolve ARR-002 and ARR-003 in
the same pass before requesting Planning-to-Apply approval. The companion
machine-readable review result is
`2026-09-10-establish-streamlined-review-readiness-adversarial-review-pass-3.result.json`.
