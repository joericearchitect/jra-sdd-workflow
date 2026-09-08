# Candidate 8 planning-artifact implementer — review-loop prevention delta

Date: 2026-09-08

## Purpose and role

This is a raw implementer finding from Candidate 8
`add-tracking-schema-examples`. It identifies additions to, not replacements
for, [the streamlined independent-reviews findings](streamlined-independent-reviews-findings.md).
It does not authorize a workflow change, an autonomous loop, or an edit to the
research findings.

Candidate 8 had three planning-review passes. The first found omitted parser
consumers and recovery paths. The second found a missing test owner and
cross-change dependency created by the first repair. The third found statements
left inconsistent across the proposal, design, specs, tasks, tracking record,
and roadmap. The detailed evidence is in the [Candidate 8 review record](../../scratch/2026-09-07-candidate-8-code-review.md) and the [Candidate 8 friction observation](../../notes/issue-and-friction-log.md).

## Conclusion

The implementation manifest would probably have prevented most of this run's
repeat loops if the role guidance had been followed. Its consumer-to-coverage
matrix, whole-contract review, repeated-claim comparison, fact authorities,
finding dispositions, and fresh review after scope widening directly address
the main causes.

The following additions would make that guidance more effective in this exact
kind of planning run. They do not call for a controller, a new universal schema,
or immediate automation.

## Additions I would make

### 1. Require a review-ready packet, or stop before review

The manifest says planners and reviewers must use a consumer-to-coverage map,
but it does not require a named, review-visible packet that contains the map.
For a planning review, require the implementer to hand over one bounded packet
with:

- the exact reviewed content identity and complete changed/untracked manifest;
- every proposal, spec, design, task, and tracking artifact in scope;
- a consumer-to-coverage matrix;
- a list of every shared record included in the review and the source authority
  for each external-state claim; and
- a list of cross-change prerequisites.

If the packet is missing a consumer, test owner, evidence owner, or source of
truth, the reviewer records a review-readiness gap and stops before starting a
finding-by-finding review. This is a manual entry condition, not a new file
format or validator.

**Why Candidate 8 needed it:** the initial review package did not make the two
additional parser consumers, their recovery behavior, or the roadmap state
visible as one set. Pass 1 therefore discovered them only after ordinary review
had started.

### 2. Make every non-local repair carry a short closure record

The manifest correctly says to classify repairs and sweep for every old claim.
Make the handoff concrete: after a contract-changing or scope-widening repair,
the implementer supplies a short closure record for each prior finding:

- finding ID and underlying problem;
- repair class: local, contract-changing, or scope-widening;
- assertions and artifacts rechecked;
- additions, removals, or explicit no-edit decisions; and
- new dependency, evidence, or recovery consequences.

The next reviewer uses this record as a checklist but still verifies it from
the bound package. It does not tell the reviewer what conclusion to reach.

**Why Candidate 8 needed it:** widening the parser scope created a second delta
spec, linkage recovery, fixture-portability work, and a Candidate 7 test
dependency. Those consequences were repaired in separate passes because they
were not listed as one fan-out of the same decision.

### 3. Make cross-change prerequisites a separate, structured planning fact

The manifest says to keep external delivery gates separate from internal task
dependencies. Add a minimum manual record for each such prerequisite:

- producer change and owned path or artifact;
- availability condition, such as delivery on the default branch rather than
  merely an active local worktree;
- consumer change and the exact follow-on edit or evidence it owns; and
- recovery when the producer is delayed, superseded, or changes its interface.

Do not place that external condition in the same free-text task dependency as
an internal task ID. Reference the prerequisite record from the task instead.

**Why Candidate 8 needed it:** Candidate 8 needed Candidate 7's linkage-test
harness, but the relationship first appeared as an unowned test gap, then as a
roadmap correction, and finally as mixed prose in `Depends on:`. A separate
record would have exposed the Batch 2 block and ownership at planning time.

### 4. Define a convergence stop before a fourth review loop

The existing second-repair rule is component-based. Candidate 8's repair-induced
findings crossed proposal, design, specs, tests, tracking, and roadmap, so no
single component clearly reached that threshold. Add a whole-change stop:

> After three review passes, or after a second material repair-induced finding
> in one change, do not begin a fourth ordinary fix/review pass. Pause for a
> human planning-reconciliation decision that reviews the packet, closure
> records, unresolved facts, and whether the scope must be redesigned or split.

Count only material scope, contract, recovery, dependency, evidence, or
security findings—not style-only observations. A human may decide that the
remaining work is objectively mechanical and authorize one final bounded
correction, but the decision is explicit.

**Why Candidate 8 needed it:** three passes were useful evidence, not yet an
excessive loop under the requested threshold. This stop prevents a fourth
blind loop if the same pattern continues, while preserving the existing rule
that a second repair to one component returns to design review.

## What I would not add

- A controller that automatically creates review packets, applies fixes, or
  starts another review. The manual runs have identified the information needed,
  but have not yet established the safe, repeatable operation details.
- A large new repository-wide schema for planning artifacts. The proposed
  packet and closure record can be manual, change-scoped evidence first.
- A requirement that every review produce zero nits. Convergence should mean
  prior material findings are closed, remaining risk is understood, and human
  decisions are explicit.

## Expected effect on this run

With these additions and the existing implementation manifest:

| Candidate 8 pass | Likely earlier outcome |
| --- | --- |
| Pass 1 | The packet matrix would expose all three parser consumers, their tests, recovery paths, affected specifications, and the Batch 2 state before detailed review. |
| Pass 2 | The closure record would force explicit test ownership and Candidate 7 availability before the scope-widening repair was handed back. |
| Pass 3 | The whole-contract sweep would compare the two delta specs and repeated claims across proposal, design, tasks, tracking, and roadmap before review. |
| Any fourth pass | The convergence stop would require a human planning-reconciliation decision instead of another ordinary repair loop. |

This would reduce repeated loops; it would not guarantee that a reviewer finds
no issue. The remaining reviewer judgment is intentional and should stay
evidence-based and independent.
