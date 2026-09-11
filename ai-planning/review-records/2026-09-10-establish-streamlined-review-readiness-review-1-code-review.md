# Adversarial code review — establish-streamlined-review-readiness

**Review type:** same-session local, read-only review. This is not an isolated
independent review, OpenSpec Verify result, or delivery approval.

**Reviewed scope:**

- `openspec/changes/establish-streamlined-review-readiness/proposal.md`
- `openspec/changes/establish-streamlined-review-readiness/design.md`
- `openspec/changes/establish-streamlined-review-readiness/tasks.md`
- `openspec/changes/establish-streamlined-review-readiness/tracking.yaml`
- `ai-planning/design-briefs/2026-09-10-review-readiness-simplified-contract.md`

## Findings

### Blocker — binding size budget is already exceeded

The accepted simplified-contract brief makes its line budgets binding and says
an overrun returns the scope to that brief. The planning directory is already
474 lines before the required guide exists:

| Artifact | Actual | Budget |
| --- | ---: | ---: |
| `proposal.md` | 109 | 100 |
| `design.md` | 209 | 200 |
| `tasks.md` | 132 | 100 |
| Change directory total | 474 | 420 |

The guide itself is budgeted at up to 180 lines, so implementation can only
increase the overrun. Return to the accepted brief and make an owner-level
scope decision that brings every artifact and the directory total within the
binding limits before adding the guide.

**Evidence:** simplified-contract brief, Decision 7; line-count inspection of
the current change directory.

### Blocker — no path makes the planning artifacts available in the delivery worktree

Task 0.1 requires a secondary worktree created from the current default branch.
The default branch currently contains neither this change directory nor the
preserved `glossary-additions.patch`. The entry gate requires the preservation
commit to become reachable, but no task transfers or otherwise binds the
unmerged planning artifacts into the delivery worktree. Later tasks therefore
lack the selected artifacts they must read and validate.

Choose and document one exact strategy: either make an immutable planning
snapshot reachable before the worktree is created, or add a registered transfer
step with a precise source, integrity evidence, and a matching scope check.

**Evidence:** `tasks.md` task 0.1; default-branch tree inspection; current
untracked change directory.

### Medium — guide requirements do not fully implement the accepted contract

The accepted brief assigns the guide ownership of defect classes, finding
format and statuses, materiality, closure procedure, both stops, reviewer
isolation, and the review-record start-header template. Task 1.1 instead
requires six broad topics plus four statements. Its stated evidence can pass
while omitting several of those operating details.

Expand task 1.1 and its evidence so they explicitly cover the start-header
fields, finding identity and statuses, materiality rule, closure procedure,
reviewer-kind boundary, and concrete diagnosis exits.

**Evidence:** simplified-contract brief, Decisions 1, 2, and 6; `design.md`
consumer ownership table; `tasks.md` task 1.1.

### Medium — required review-record output escapes the declared scope boundary

`design.md` calls `tracking.yaml` the authoritative path inventory, and task
5.1 requires the delivery-worktree status to list only paths in that inventory.
Task 5.2 subsequently creates a review record under `ai-planning/review-records/`,
which is not in `tracking.yaml`; no final boundary check covers it. The change
can therefore create a required, change-owned file outside its claimed scope.

Choose the review record's exact path before Apply and add it to the inventory,
or explicitly classify it as separately bound evidence and add a final scope
check that covers both inventories.

**Evidence:** `design.md` tracking-inventory decision; `tasks.md` tasks 5.1 and
5.2; `tracking.yaml` implementation paths.

## Validation and limits

The selected artifact, tracking, strict OpenSpec, portability, and diff checks
passed. Those checks establish structural validity; they do not test the
planning and delivery coherence findings above. Live GitHub issue and Project
state were not re-read during this review.
