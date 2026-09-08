# Candidate 7 reviewer delta — preventing review loops beyond three passes

Date: 2026-09-08

Role: reviewer

Change examined: `resolve-pr-validation-signal` (candidate 7)
Status: raw findings for a possible future revision of
`streamlined-independent-reviews-findings.md`; this document does not authorize
workflow or skill changes.

## Bottom line

The existing implementation manifest would likely have prevented most of the
candidate 7 findings: the consumer-to-coverage map would have exposed the full
dead validation-input path, whole-contract correction would have found the
unsafe shell alternative and stale task ordering, and declared fact authorities
would have challenged the incorrect candidate-4 status recommendation.

Two additions are still needed to prevent an *excessive* loop—defined here as a
fourth review pass—from becoming ordinary work:

1. a change-level convergence circuit breaker before a fourth pass; and
2. explicit isolation and ownership for a shared campaign record during
   concurrent work.

Two smaller changes would make existing guidance reliably auditable rather than
merely aspirational: mandatory provenance classification for later findings and
an authority citation for operational-state claims. These do not call for a
new controller, schema, or automated workflow engine.

## Evidence from candidate 7

Candidate 7 received three planning-review passes. The first uncovered the
full removal path rather than the initially named field. Subsequent corrections
introduced or left behind an unsafe implementation alternative, an incomplete
alternative analysis, and an unsafe task sequence. The third pass also included
an incorrect recommendation to mark candidate 4 done. That recommendation
confused merged delivery evidence with remaining delivery and machine-local
cleanup work.

The current findings document already identifies these patterns and proposes
the right primary defenses: coverage mapping, fan-out reconciliation,
whole-contract review, durable dispositions, and fact authorities. Candidate 7
therefore does not justify a longer checklist or another generic validator.
Its remaining gap is operational: the guidance does not say exactly when a
sequence of fresh reviews must stop being treated as normal correction, nor who
owns a mutable campaign record while multiple candidates are being planned.

## Additions to the implementation manifest

### 1. Add a change-level convergence circuit breaker

Add this rule to the portable review-readiness contract and mirror it in the
workflow-level correction discipline:

> A change must not enter a fourth review pass as ordinary correction work.
> After three fresh review identities, or when two material contract or scope
> repairs have accumulated across different components, pause for one bounded
> design-reconciliation decision. The decision names the remaining consumer
> map, unresolved authorities, intended scope, safe task order, and whether to
> resume review, split the change, or stop. This is a change-level convergence
> threshold, not permission to make extra repairs to any one component.

The existing rule—return to design review after a second repair to the same
component—remains correct. It did not alone stop this pattern because each pass
could be described as finding a different artifact-level component. The added
threshold catches the whole-change failure mode without allowing a fourth
ad-hoc review to substitute for re-planning.

For candidate 7, this would have required an explicit reconciliation after the
third pass and before any fourth pass. It would not suppress a material defect;
it changes the response from another narrow repair to a bounded decision about
the complete change.

### 2. Add shared-record isolation to the review handoff

Add a required field to the *manual handoff content*, without creating a new
package schema:

> For every mutable record shared by concurrent candidates, name the record,
> its fixed review identity, and one integration owner. A candidate review
> treats that record as read-only unless the review explicitly includes the
> owner's bound integration update. Changes to shared campaign state are made
> in a separately reviewable integration step after the authoritative candidate
> facts are reconciled.

Add a companion planner/reviewer rule:

> A dependency or status conclusion drawn from a shared campaign record is a
> fact-authority claim. The review must cite the authority and fixed identity;
> otherwise record an evidence gap, not a candidate defect or status change.

Candidate 7's third-pass candidate-4 recommendation was partly a source
authority error, but concurrent sessions changing the shared campaign plan made
the error easier to introduce and harder to recognize. Exact identities for the
candidate artifacts do not by themselves freeze a separate, shared roadmap.

### 3. Require provenance on each finding that survives or appears after repair

Extend the existing stable-ID/disposition guidance with these labels:

| Label | Meaning |
| --- | --- |
| `carried` | The same verified problem remains unresolved. |
| `repair-induced` | A prior correction created the problem. |
| `late-discovered-existing` | The problem was in the reviewed identity but the earlier whole-contract review missed it. |
| `concurrent-state` | The observation depends on a mutable shared record outside the candidate's fixed scope. |
| `reviewer-error` | A prior conclusion conflicts with the applicable authority. |

This is not a raw-finding-count target. It makes the cause of continued passes
visible. A high share of `repair-induced` or `late-discovered-existing` findings
means the next action is design reconciliation, not another line-by-line patch.
For candidate 7, the candidate-4 recommendation would be recorded as a
`reviewer-error` after authority checking rather than treated as a correction
to implement.

### 4. Make authority evidence mandatory for work-state conclusions

The current document correctly requires declared fact authorities, but the
reviewer instructions should explicitly say:

> A finding or recommendation that asserts delivery, work, Project, archive,
> or machine-local-cleanup state must identify the applicable authority and the
> revision, receipt, or record supporting it. A reviewer may report missing
> evidence, but may not infer a terminal status from a related source such as a
> merged pull request or archive alone.

This is a narrow clarification of the existing authority rule. It would have
prevented the candidate-4 `Done` recommendation because the evidence showed
some delivery history, not completion of every fact that the work-state claim
required.

## Add regression scenarios to the manifest

Add three manual/evaluation scenarios alongside the proposed planner and
reviewer scenarios:

1. **Convergence threshold:** three fresh reviews identify material
   contract-level defects across different files; the next action is a bounded
   design reconciliation, not a fourth ordinary review pass.
2. **Shared campaign record:** two candidates have individually frozen review
   packages while a roadmap is mutable; a reviewer treats the roadmap as a
   named read-only snapshot unless an integration owner has explicitly bound
   the update.
3. **Work-state authority:** a merged pull request and archived change exist,
   but cleanup evidence is absent or still active; the reviewer records an
   evidence gap and does not assert that the candidate is done.

The first scenario makes the desired "no excessive loop" behavior testable.
The second and third make the source-authority rule work under the actual
campaign conditions rather than only for isolated files.

## What I would not add

- I would not add a universal autonomous controller or a new review-result
  schema. The campaign needs to exercise the manual rules first, and these
  additions can be recorded in the existing handoff and finding records.
- I would not raise a correction or review budget to make a fourth pass normal.
  More passes without a whole-change decision disguise the same failure mode.
- I would not require every reviewer to rewrite a shared campaign roadmap.
  That expands review scope and creates the concurrent-state problem it is
  intended to solve.

## Expected effect for this run

The existing manifest would probably have reduced candidate 7 below three
passes by exposing the complete pathway and safer task sequence before review.
The added rules address what it does not explicitly control: they prevent a
fourth pass from becoming routine, keep concurrent roadmap state out of a
candidate review unless deliberately integrated, and stop unsupported work-state
claims from becoming implementation churn. They cannot guarantee that no new
defect will ever be found; they ensure that repeated discovery triggers a
different, bounded response rather than an open-ended loop.

## Local sources consulted

- `ai-planning/research/streamlined-independent-reviews/streamlined-independent-reviews-findings.md`
- `ai-planning/scratch/2026-09-07-candidate-7-code-review.md`
- `ai-planning/notes/issue-and-friction-log.md`
- `ai-planning/plans/dogfood-10-changes.md`
- `openspec/changes/resolve-pr-validation-signal/{proposal.md,design.md,tasks.md,tracking.yaml}`
