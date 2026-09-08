# Candidate 8 planning-artifact implementer — recovery plan

Date: 2026-09-08  
Change: `add-tracking-schema-examples` (candidate 8, issue #31)  
Role: planning-artifact implementer  
State: planning is **not ready for Apply**. This is a bounded recovery plan,
not authorization to edit the change, start Apply, or create another automated
review loop.

## Why this needs a different next step

Candidate 8 has already received three planning-review passes. The first
expanded one parser behavior to three consumers. The second added the
candidate-7 test-harness prerequisite. The third found the remaining places
where those two scope decisions had not propagated through the proposal,
design, tasks, and test-policy explanation.

The third-pass findings are mostly small individually, but their pattern is
not: they show that the plan was repaired one finding at a time instead of
rechecked as one contract. A fourth ordinary review would likely repeat that
pattern. Per the independent-review findings, use one human-governed planning
reconciliation, then a bounded confirmation against a declared coverage map.
Do not start another open-ended find/fix/review cycle.

## Required planning changes

### 1. Reconcile the five third-pass inconsistencies

Make these edits together, rather than as separate review responses.

| Finding | Required change | Authoritative place | Other places that must agree |
| --- | --- | --- | --- |
| G — two affected capabilities | In `proposal.md`, name both `tracking-contract` and `artifact-quality-validation` wherever the contract change is described, including **What Changes** and **Impact**. | The two accepted delta specs define their observable requirements. | Modified Capabilities, `tracking.yaml` implementation paths, design Context and Verification Strategy. |
| H — inherited test harness | Add the candidate-7 delivered linkage-test harness to `design.md` **Reuse Plan**. | `design.md` decision 5 owns this technical choice. | `proposal.md` Reuse Plan, task 2.1, Recovery, and candidate 7's tracked implementation path. |
| I — artifact-validator scope | State precisely that the parser and linkage validator receive source edits; artifact validation keeps its current source behavior and receives regression coverage only. | `design.md` and the actual validator source establish the source/no-edit distinction. | Proposal Impact, `tracking.yaml` paths, artifact-quality delta, and task 2.1 evidence. |
| J — fixture-portability policy | Keep `portable: false` only if the current configured policy still has no portable roots. Record in the design and test why it is false, the policy fact it reflects, and the condition that requires revisiting it if policy changes. | The loaded portability-policy configuration is the fact authority. | Task 1.2 evidence and fixture-portability test. |
| K — dependency meaning | Keep `Depends on:` for internal Candidate 8 task IDs only. Put Candidate 7's delivered-harness condition in a clearly labelled external prerequisite/precondition that points to the roadmap; do not make prose look machine-enforced. | The roadmap owns campaign dependency/work state; the design owns the technical prerequisite. | Task 2.1, design decision 5, Recovery, proposal Reuse Plan, and the roadmap's candidate-8 dependency/status fields. |

For K, the intended task shape is:

```markdown
Depends on: 1.1.
External prerequisite: Candidate 7's `openspec-linkage.test.mjs` harness is
delivered to the current default branch; see candidate 8 in the campaign
roadmap.
```

This retains the real block without falsely suggesting the task metadata
validator can enforce it.

### 2. Produce one complete consumer-to-coverage map before editing

The reconciler must create and use this map as the edit checklist. It may live
in the planning-review record or recovery record; it does not need a new
runtime schema or validator. An explicit no-edit decision is coverage.

| Consumer or assertion surface | Planned behavior / source decision | Requirement | Test or inspection owner | Task and evidence | Recovery / prerequisite |
| --- | --- | --- | --- | --- | --- |
| Restricted YAML parser | Source edit: reject duplicate keys at root, nested, leading-list-item, and subsequent-list-item mappings; safe key/location-only diagnostic. | `tracking-contract` delta. | `tracking.test.mjs`. | 1.1. | Revert the parser change with its tests if valid input is rejected. |
| Tracking CLI and committed fixtures | Source edit: positive fixture normalizes two distinct repositories; negative fixture fails before normalized output. | `tracking-contract` delta. | CLI/fixture coverage in tracking tests. | 1.2. | Remove or revise only fixtures and their tests if they become invalid examples. |
| Fixture portability | No source edit to the repository-wide scanner; direct fixture test invokes its exported scanner. | No durable capability beyond the tracking contract. | Fixture-portability test using loaded policy. | 1.2. | If policy changes, reassess the `portable` argument and fixture placeholders. |
| Artifact-quality validator of `.openspec.yaml` | No validator source edit; preserve its existing bounded metadata-parse result and add regression coverage. | `artifact-quality-validation` delta. | `openspec-artifacts.test.mjs`. | 2.1. | Existing validator correction remains the contributor exit. |
| OpenSpec-linkage validator of `tracking.yaml` | Source edit: turn parser failure into a structured issue with correction. | `tracking-contract` delta. | Candidate-7-created `openspec-linkage.test.mjs`. | 2.1. | Candidate 7 harness must be delivered first; otherwise remain blocked. |
| Contributor reference | Source edit: document unique mapping keys, safe correction, and placeholder-only examples. | Both delta specs must remain consistent with the described gate behavior. | Documentation inspection. | 3.1. | Correct the input and rerun the named validator. |
| Repeated planning claims | No product-code edit; reconcile capabilities, paths, source/no-edit statements, reuse, prerequisites, evidence, and recovery. | Proposal, design, tasks, deltas, and tracking are the selected planning contract. | Whole-contract planning confirmation. | 3.2 and 3.3 planning evidence. | Return material contradiction to design review. |

Check this map in both directions: each listed consumer needs a requirement,
source/no-edit decision, test/inspection, task, evidence, and recovery; each
planned file or artifact must trace to a row. If an entry cannot be filled in,
the plan is not complete.

### 3. Reconcile source-of-truth records and the external block

- Preserve the campaign roadmap as the authority for Candidate 8's `1, 7`
  hard dependencies and `Blocked — Batch 1 incomplete` state. Do not claim
  Candidate 8 is Apply-ready merely because its local planning prose is fixed.
- Before approving Apply, verify from the current default branch—not merely a
  local Candidate 7 worktree—that Candidate 7 delivered
  `scripts/validation/test/openspec-linkage.test.mjs` and that it provides the
  harness Candidate 8 plans to extend.
- Also verify the roadmap's Batch 2 entry condition is met. The Candidate 7
  prerequisite and Batch 1 condition are separate gates; both must pass.
- Keep `tracking.yaml` as the implementation-path record. It must list source
  edits and regression-test paths accurately, but it is not the authority for
  task sequencing or campaign work state.

## Bounded completion procedure

1. **Human planning reconciliation.** Approve one bundled amendment based on
   the map above. Treat any newly discovered material scope, behavior,
   ownership, recovery, or dependency change as a design-review decision, not
   as another ordinary repair.
2. **Fan-out check before saving.** For every changed fact, search every
   planning artifact and the roadmap for the old and new capability names,
   parser consumers, source/no-edit decision, test file, Candidate 7
   prerequisite, portability-policy rationale, recovery, and evidence.
   Record the locations checked and any explicit no-edit decisions.
3. **Planning validation.** Run the repository-required planning checks against
   the selected change: Node validation tests, no-hardcoded-environment,
   selected-change tracking and artifact validation, strict OpenSpec
   validation, and `git diff --check`. Passing results support structure; they
   do not replace the map.
4. **Bounded whole-contract confirmation.** Give the confirmer one exact
   content digest or revision and a complete reviewed-path manifest: proposal,
   design, tasks, tracking, both delta specs, roadmap row 8 and Batch 2,
   relevant Candidate 7 plan/tracking, parser and two validators, the
   portability policy/scanner, and relevant test inventory. The confirmation
   verifies the map and the five listed changes; it does not reopen the scope
   without evidence.
5. **Record the outcome.** Record each third-pass finding with a stable ID,
   evidence, resolution, and the fan-out locations checked. If the confirmation
   finds a material inconsistency, stop for design review. Do not start a
   fourth ordinary review pass.

## Planning is complete only when

- G through K are reconciled across all applicable artifacts;
- the map is complete in both directions and records source/no-edit decisions;
- the external Candidate 7 and Batch 1 blockers are clearly distinguished from
  internal task dependencies;
- required planning validation passes; and
- the bounded confirmation records no unresolved material contradiction.

That completes planning coherence, not delivery readiness. Candidate 8 remains
blocked from Apply until the current default branch proves the Candidate 7
harness is delivered and the roadmap's Batch 2 entry condition passes.

## What this deliberately does not add

This recovery does not add a controller, automatic retry mechanism, new
planning schema, or a requirement for zero cosmetic review comments. It makes
the existing manual review readiness guidance concrete for this change and
uses the third pass as the escalation boundary.
