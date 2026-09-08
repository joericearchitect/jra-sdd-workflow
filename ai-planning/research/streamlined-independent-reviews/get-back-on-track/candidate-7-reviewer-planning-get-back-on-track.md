# Candidate 7 reviewer plan to get back on track

Date: 2026-09-08

Role: reviewer

Change: `resolve-pr-validation-signal` (candidate 7)

Purpose: identify the bounded planning changes needed before an Apply decision.
This is a planning-recovery note, not implementation authorization and not a
fourth ordinary review pass.

## Decision

Candidate 7 should not receive another line-by-line repair followed by another
ordinary review. It has already had three planning-review passes. The remaining
work is one bounded design reconciliation, followed by one final readiness
handoff. That follows the repository rule that a component needing a second
repair returns to design review, and the research recommendation to stop before
a fourth normal review pass.

The candidate does **not** need a new capability, delta spec, automation,
controller, migration layer, or GitHub/Project update to finish planning.

## Required planning changes

### 1. Reconcile design decision 3 before editing it again

Decision 3 was materially repaired when the unsafe shell replacement was
replaced with the safer retained Node write. The third-pass finding asks for a
second repair to the same decision: its stated rejected alternative is not the
alternative that was actually considered. Hold one bounded design discussion
for that decision, then make one coherent edit.

The resulting decision must state all of the following:

- selected approach: keep `actions/github-script` for the PR-body write, remove
  only `github.paginate`/`pulls.listFiles`, the caller argument, and
  `pull-requests: read`;
- real rejected alternative: replace the Node write with a shell step that
  writes the PR body;
- tradeoff: a shell replacement is unnecessary and gives attacker-controlled
  pull-request text a shell-adjacent handling path, whereas retaining the Node
  write avoids that extra risk and is the smaller edit; and
- explicitly rejected non-solution: keeping the API call and permission merely
  to preserve existing structure would retain dead work and unnecessary
  privilege.

This replaces the current misleading sentence that calls retaining both the
GitHub Script action and API call the rejected alternative. No shell command or
shell-safety implementation design is needed because the selected approach does
not use a shell for PR text.

### 2. Add a bidirectional consumer-to-coverage map to `design.md`

Add a short table before `## Verification Strategy`. It must cover the full
dead pathway and the deliberately unchanged enforcement policy, rather than
only listing affected files.

| Consumer / assertion | Planned source outcome | Verification owner | Task | Evidence / recovery |
| --- | --- | --- | --- | --- |
| PR-contract result and CLI | Remove the computed field, `changedPaths`, and retired flag; retain PR parsing results. | `pr-contract.test.mjs`, including CLI argument behavior. | 2.1 | Remaining result contract stays valid; retired flag reaches the existing generic unexpected-argument failure. Revert if a supported consumer appears. |
| Linkage result and CLI | Remove forwarding, parameter, and retired flag; preserve valid and invalid linkage behavior. | New `openspec-linkage.test.mjs`, including CLI argument behavior. | 2.3 | Linkage behavior is unchanged apart from removal of dead input. Revert and return to design review if behavior changes. |
| Linkage workflow | Remove the changed-file API call, caller flag, and `pull-requests: read`; retain the Node PR-body write. | Workflow-diff inspection. | 2.2 | No file-list call, no caller flag, no removed permission, and no shell handling of PR text. |
| Strict validation policy | No edit: strict OpenSpec validation remains unconditional. | `.github/workflows/validate.yml` inspection. | 3.1 | Existing unconditional step remains. Stop if the removal exposes a dependency on changed paths. |
| Repository consumers | No edit: confirm the field and retired flag have no live repository consumer after removal. | Focused search during review. | 2.3, 4.3 | A found supported consumer returns the change to design review. External consumers remain an explicitly unobservable compatibility risk. |

Check the map in both directions: every planned file and task must have a row,
and every row must have a source change or justified no-edit decision, a test or
inspection owner, executable evidence, and recovery. This table should replace
ambiguous phrases such as “focused coverage” with reviewable ownership; it does
not require a new artifact type.

### 3. Make the focused-test contract executable in `design.md` and `tasks.md`

The current plan names test files but does not clearly assign evidence for both
removed CLI flags. Strengthen it before Apply:

- In the verification strategy, say that `pr-contract.test.mjs` verifies the
  exact remaining PR-contract result shape and representative valid and invalid
  behavior, and that the new linkage test verifies representative valid and
  invalid linkage behavior plus the embedded PR result shape.
- State where each CLI rejection is tested. The natural approach is a focused
  subprocess test of each validator with `--changed-paths-file`, asserting exit
  code 2 and the existing generic `unexpected argument` behavior. Do not add a
  bespoke parser branch.
- Split the evidence in tasks 2.1 and 2.3 so each owns its validator's result
  contract and its own retired flag. A test that checks only a missing key is
  insufficient; it must show that retained outcomes remain stable.
- Keep task 2.2's workflow inspection separate. Workflow YAML is the owner of
  least-privilege and untrusted-input evidence; a validator unit test cannot
  prove either property.

The planned paths already appear in `tracking.yaml`, so no tracking-path change
is required unless the design review selects a different test location.

### 4. Replace candidate-4-specific workspace prose with a stable base rule

Candidate 7 has no hard dependency on candidate 4. Its planning artifacts
should not depend on a concurrently changing campaign-status interpretation.

In `design.md` Recovery and task 1.1, replace the candidate-4-specific wording
with this outcome:

> Create the implementation branch and registered secondary worktree from a
> freshly inspected `origin/main` identity. Exclude every unrelated tracked,
> untracked, archived-copy, or primary-worktree change. Preserve such local work
> in place; do not change it as part of this candidate.

The candidate-4 archive/cleanup status belongs to the shared campaign record's
owner and its declared authorities. It is not evidence that candidate 7 planning
is incomplete. This removes a stale shared-state claim while preserving the
important safe-base requirement.

### 5. Produce one final manual planning-readiness handoff

After the design reconciliation and the artifact edits above, create a
reviewer-visible handoff for the final readiness decision. Use the existing
review record or review request; do not introduce a new package schema. It
must bind:

1. the exact `origin/main` identity used for planning;
2. the candidate's complete artifact manifest: proposal, design, tasks,
   tracking, issue scope, and the four affected source/test/workflow surfaces;
3. any changed or untracked files included in the review;
4. the consumer-to-coverage map and focused/complete check plan;
5. the declared authorities: design owns technical decisions, tasks own task
   evidence, Git/PR evidence owns delivered source, the configured work system
   owns campaign state, and a machine-local receipt owns cleanup; and
6. dispositions for R-01 through R-05, NR-01 through NR-05, and TR-03. Mark
   TR-01 and TR-02 as shared-record decisions outside this candidate, not
   unresolved implementation defects.

The final reviewer performs one whole-contract readiness assessment against
that frozen handoff. A scope or contract change after that assessment invalidates
the handoff and returns to design reconciliation; it does not start a fourth
incremental review loop.

## Changes that are not needed

- Do not alter the unconditional strict-validation workflow.
- Do not add `requiresOpenSpecValidation` compatibility code, conditional CI,
  or a new GitHub API call.
- Do not change `tracking.yaml` solely because a reviewed no-edit surface such
  as `.github/workflows/validate.yml` appears in the map.
- Do not edit the shared campaign roadmap from this candidate's planning work.
  Its owner should reconcile candidate 4 and candidate 8 from their appropriate
  authorities in a separately bound update.
- Do not authorize Apply, create resources, or delete the stale candidate-4
  directory as part of planning completion.

## Planning-complete exit criteria

Planning is complete when all five required changes above are true and the
final handoff finds no unresolved material contradiction. At that point the
candidate may be presented for a separate Apply authorization. The next work is
not source implementation until that authorization is given.

## Sources consulted

- `openspec/changes/resolve-pr-validation-signal/{proposal.md,design.md,tasks.md,tracking.yaml}`
- `ai-planning/scratch/2026-09-07-candidate-7-code-review.md`
- `ai-planning/research/streamlined-independent-reviews/streamlined-independent-reviews-findings.md`
- `ai-planning/research/streamlined-independent-reviews/candidate-7-reviewer-excessive-loop-prevention-delta.md`
- `ai-planning/notes/issue-and-friction-log.md` (IFL-014 through IFL-016)
- `ai-planning/plans/dogfood-10-changes.md`
