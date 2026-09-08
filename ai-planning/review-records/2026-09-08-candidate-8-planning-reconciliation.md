# Candidate 8 planning reconciliation and confirmation record

Record ID: `C8-PRR-2026-09-08-01`  
Date: 2026-09-08  
Change: `add-tracking-schema-examples` (issue #31)  
Mode: manual planning reconciliation; not an independent review and not Apply
authorization.

## Purpose and bound packet

This record applies the review-readiness and convergence design brief to the
third-pass recovery for Candidate 8. It carries durable dispositions rather
than treating the scratch review as an approval record. The selected planning
contract is:

- `openspec/changes/add-tracking-schema-examples/{proposal.md,design.md,tasks.md,tracking.yaml}`;
- both delta specs below that change;
- Candidate 8 and Batch 2 records in `ai-planning/plans/dogfood-10-changes.md`;
- Candidate 7's current planning artifacts and its prospective
  `scripts/validation/test/openspec-linkage.test.mjs` test harness;
- the restricted parser, tracking CLI, linkage validator, artifact validator,
  portability policy/scanner, and their current test inventory; and
- the Candidate 8 recovery plan and code-review findings.

The local `origin/main` reference inspected for this reconciliation is
`b49a98b32e9cb2ab13a21e156ba3c8b0870b9978`. It does not contain Candidate 7's
`openspec-linkage.test.mjs` harness. This is an external prerequisite result,
not a Candidate 8 defect or authority to begin Apply.

## Third-pass finding dispositions

| ID | Provenance | Subject | Disposition and closure evidence | Mutation owner |
| --- | --- | --- | --- | --- |
| C8-G | repair-induced | Proposal names only one of two changed capabilities. | Corrected together in proposal **What Changes** and **Impact**; both delta specs, Modified Capabilities, design map, and tracking paths are the fan-out set. | Candidate 8 planning artifacts |
| C8-H | repair-induced | Design Reuse Plan omitted Candidate 7's inherited test harness. | Corrected in design Reuse Plan; proposal Reuse Plan, decision 5, task 2.1, Recovery, and Candidate 7 tracking are the fan-out set. | Candidate 8 planning artifacts; Candidate 7 owns delivery of the harness |
| C8-I | repair-induced | Design Context implied an artifact-validator source edit. | Corrected to distinguish parser/linkage source edits from artifact-validator regression coverage; proposal Impact, task evidence, map, and tracking paths were rechecked. | Candidate 8 planning artifacts |
| C8-J | repair-induced | `portable: false` lacked its policy provenance. | Corrected with the current empty-`portableRoots` policy fact and an explicit revisit condition; task 1.2, verification strategy, policy, and future fixture test are the fan-out set. | Candidate 8 planning artifacts |
| C8-K | repair-induced | Internal task dependency and external Candidate 7 delivery gate were mixed. | Corrected so task 2.1 has internal dependency `1.1` plus a labelled external prerequisite; design decision 5, Recovery, proposal Reuse Plan, and roadmap row 8 are the fan-out set. | Candidate 8 planning artifacts; roadmap owner for campaign state |

Each correction is contract-changing planning work but adds no runtime mechanism,
privilege, network call, credential, or external mutation. The assertion
fan-out is recorded above; no source/no-edit decision is left implicit.

## Declared confirmation coverage

| Review class | Result for the bounded confirmation |
| --- | --- |
| Consumer and reverse-direction coverage | Reviewed against the `design.md` consumer map; no additional consumer is missing. |
| Evidence ownership and producibility | Reviewed; named tests are producible once the Candidate 7 harness prerequisite is met. |
| Task sequencing and safe intermediate states | Finding C8-L: the Context contradicts the external Candidate 7 delivery prerequisite. |
| Lifecycle, recovery, and abort behavior | Reviewed; recovery keeps Candidate 8 blocked rather than creating a competing harness. |
| External-state validity | Blocked for Apply: Candidate 7 harness is absent from the inspected default-branch reference and Batch 2 remains closed. |
| Repeated-claim consistency | Finding C8-L: the Context's no-external-state claim conflicts with task 2.1, the consumer map, Recovery, and the roadmap. |
| Boundary states | Reviewed: duplicate mapping levels, no-normalized-output failure, absent harness, and policy-change behavior are represented. |

## Bounded confirmation outcome

The post-escalation confirmation is a valid local review of the bound packet,
not a new ordinary review loop. It found one medium, repair-induced finding:

| ID | Provenance | Subject | Disposition | Evidence and required next action |
| --- | --- | --- | --- | --- |
| C8-L | repair-induced | `design.md` Context says no implementation task needs external state, while task 2.1 requires Candidate 7's delivered harness on the current default branch. | Unresolved objective correction pending explicit human decision. | A fresh default-branch fetch confirmed the harness is absent; correct the Context to name Candidate 7 delivery as the external prerequisite, then bind a new packet and obtain a fresh bounded confirmation. |

This finding is material to task sequencing and recovery. Under the third-pass
stop, it is not silently repaired as a fourth ordinary loop. The user may
authorize this one bounded correction and confirmation, or return the
cross-change test-harness decision to design review.

## Stop condition and next action

This is the third planning-review pass. Its material remaining pattern was
repair-induced, so the authorized response was one bundled design
reconciliation followed by a bounded whole-contract confirmation—not an
ordinary fourth review pass. C8-L is a material inconsistency in that
confirmation and returns the selected design decision to human review.

Planning coherence is not Apply readiness. Candidate 8 remains blocked until
Candidate 7's harness is delivered to the current default branch and the
roadmap's Batch 2 entry condition is met. No implementation, GitHub mutation,
merge, Sync, Archive, or cleanup is authorized by this record.
