# establish-streamlined-review-readiness — pass 1 finding record

Record ID: `RR-P1-2026-09-08-01`
Date: 2026-09-08
Change: `establish-streamlined-review-readiness` (issue #33)
Mode: same-session local planning review. Not an independent review, not
OpenSpec Verify, not approval, and not Apply authorization.

## Bound identity

Base commit `1963c872178d3e563aa5cb8b3f4607066732a3b0`, with the six member
digests recorded in the change's `review-packet.md` matching at the time of the
pass. The reviewer entered through that packet index.

The reviewer noted two evidence gaps that bound the pass: the standing method at
`docs/review/adversarial-review.md` does not exist yet, so the eight-class method
in `design.md` was substituted as the packet permits; and no implementation
exists, so Apply-profile behavior was reviewed only as specified text.

## Pass and provenance

This is pass 1 of the current binding. Under requirement 6, provenance values
attach only to findings raised after the first pass, so no finding below carries
one. The prior implementer findings IF-1, IF-2, and IF-3 recorded in the packet
predate this pass.

The reviewer confirmed IF-1 and IF-3 closed in the bound identity and IF-2 **not
closed**: its root fact, that the mutation path set must not be restated as a
count, survived in consumer C11. That is one root fact reaching a second
generation, the same pattern the witness testimony described, and it is the
reason the correction below sweeps every numeric restatement of the set rather
than the instance named.

## Declared coverage

| Class | Result |
| --- | --- |
| 1. Consumer and reverse-direction coverage | findings |
| 2. Evidence ownership and producibility | swept-clean |
| 3. Task sequencing and safe intermediate states | findings |
| 4. Lifecycle, recovery, abort | swept-clean |
| 5. External-state validity | findings |
| 6. Repeated-claim and restatement consistency | findings |
| 7. First-run, empty, absent, partial, already-complete | findings |
| 8. Authority and citation correctness | findings |

No class was left undeclared.

## Findings and dispositions

| ID | Severity | Subject | Problem | Disposition |
| --- | --- | --- | --- | --- |
| rr-authority-brief | blocker | `review-packet.md` | The packet lists the design brief as an authority to resolve conflicts against, while the spec contradicts it. Requirement 11 withholds Apply-ready until unresolved contradictions are resolved. | Accepted, scope widened. Verification found five divergences, not two. Owner decided the change supersedes the brief; the brief is demoted in the packet to superseded design input and the five divergences are recorded in `design.md`. The brief itself is not edited, so the mutation boundary is unchanged. |
| rr-component-stop | high | `specs/review-readiness/spec.md` | Requirement 8's surface-keyed component contradicts brief Decision 4, and keeping a surface trigger preserves the over-fire the cited testimony rejected while the artifacts claim that testimony was adopted. | Accepted. The design text was self-defeating: it argued a surface-only trigger stops progressing work and then kept one. Resolved by adopting Decision 4's claim-keyed unit and retaining the dual trigger. |
| rr-issue-scope | high | `tracking.yaml` | Issue #33 lists five in-scope paths; the inventory has eight. Work-state authority disagrees with the plan. | Accepted. Owner authorized updating issue #33's scope and acceptance criteria to the eight-path set. |
| rr-c11-path-count | medium | `design.md` | C11 says "the six affected paths"; the set has eight. IF-2's root fact was not swept here. | Accepted. Replaced with a reference to the `tracking.yaml` path set, and every numeric restatement of that set swept. |
| rr-fanout-table-split | medium | `design.md` | A prose paragraph interrupts the assertion fan-out table, orphaning its last three rows so the register cannot be read as a complete set. | Accepted. The prose moves below the complete table. |
| rr-gates-map | medium | `design.md` | The Human Review Gates and Definition of Done tables, and the review-record location, have no consumer-map row in either direction. | Accepted. Map rows added. |
| rr-ten-members | medium | `design.md` | The recorded ten-member equality cannot be checked without reinterpreting intent: the design says ten, spec requirement 1 lists eight, brief Decision 3 lists nine. Requirement 4 makes that a blocking finding. | Accepted. One numbered member list is published and quoted by the design, requirement 1, and requirement 2. |
| rr-index-stop-condition | medium | `review-packet.md` | The extra-file stop condition fires on the packet itself and on the `specs` directory, so the bound identity was already a literal readiness failure. | Accepted. The index and directories are carved out of the stop. |
| rr-glossary-rewrite | medium | `tasks.md` | Task 2.3 permits extending `Related:` lines and the taxonomy example list, while C10, proposal Impact, and the design boundary require additions with no existing entry rewritten. The task cannot pass its own evidence. | Accepted. The additions-only rule is stated once and the permitted extensions are named consistently on all three surfaces. |
| rr-c10-requirement-ids | low | `design.md` | C10 cites requirements 1, 5, 8, 9; the fan-out cites 1, 8, 9; task 2.3 cites 1 and 8. Requirement 5 defines none of the terms. | Accepted. All three surfaces cite requirements 1 and 8. |

No finding was disputed. No finding was deferred.

## Evidence gap closed by this correction

The reviewer observed that the witness testimony justifying class 8, the dual
trigger, and the digest rule is untracked, outside the mutation boundary, and
absent from the digest set, so a later clone cannot re-verify those citations.
The packet now binds it by digest as cited evidence.

## Correction classification

One contract-changing correction covering all ten findings, applied as a batch
against pass 1 rather than as ten local edits. It introduces no new step,
dependency, privilege, credential, network call, data path, or execution
context. The single operational mutation is the authorized issue #33 scope
update. The packet is rebound afterward, and any second pass runs against the
new identity.

## Owner-directed self-review after the pass-1 correction

Not a review pass: this was an owner-directed sweep against one question, not an
evaluation of the complete bounded change with declared class coverage. The
findings are recorded because requirement 6 records a finding whoever found it.
Earlier entries above are left as written, since they were true of the identity
they were raised against.

The question was whether pass 1's findings produced durable rules or only local
repairs. Tracing each of the ten: two already generalized (`rr-component-stop`,
`rr-ten-members`), two were correctly local because an existing requirement
already covered them and this change had simply failed to apply it
(`rr-gates-map`, `rr-c10-requirement-ids`), and six had been repaired only on
the surface that reported them.

| ID | Severity | Subject | Problem | Disposition |
| --- | --- | --- | --- | --- |
| sr-generic-authority | medium | delta spec requirement 2 | `rr-authority-brief` was closed by demoting one brief in one packet. Nothing stopped the next change from listing an authority it contradicts. | Accepted. Requirement 2 now makes a contradicted authority a readiness failure and requires enumerating every divergence. |
| sr-generic-stop-condition | medium | delta spec requirement 2 | `rr-index-stop-condition` was closed by editing this packet's stop text. The class of bug — a readiness condition that fires against a conforming packet — was left unnamed. | Accepted. Requirement 2 now names it a defect in the condition rather than a failure of the packet. |
| sr-generic-task-map | medium | delta spec requirement 3 | `rr-glossary-rewrite` was closed by aligning task 2.3 with C10. No rule required a task's permitted edit to equal the map's recorded edit. | Accepted. Requirement 3 now requires it and withholds readiness on a mismatch. |
| sr-generic-set-not-count | medium | delta spec requirement 4 | `rr-c11-path-count` was the second appearance of IF-2's root fact and was still closed as a wording fix. The underlying rule — a count stays readable after it stops being true — was never recorded. | Accepted. Requirement 4 now forbids restating a decisive set as a cardinality. Applying the new rule to this change's own artifacts found seven further stale counts, all corrected. |
| sr-generic-register-legible | low | delta spec requirement 4 | `rr-fanout-table-split` was closed as a formatting repair. | Accepted. Requirement 4 now treats a register that cannot be read as one complete set as absent, which widens the review. |
| sr-generic-work-state | medium | delta spec requirement 10 | `rr-issue-scope` was closed by editing issue #33. No rule put a work-state record's declared scope on the mutation-path fan-out. | Accepted. Requirement 10 now requires the declaration to equal the planned inventory and to be reconciled under its owner's authorization. |
| sr-reviewer-kind | high | delta spec requirements 1 and 12 | Pass 1 declared itself a same-session local review and refused to be counted as independent. The contract required isolation but never required a pass to record which kind of reviewer produced it, so the distinction survived only as prose in one change's packet. | Accepted, folded into scope with the two glossary entries that prompted it. Requirement 1 now requires the declaration and states that a fresh session is not isolation. |
| sr-component-not-narrowing | low | delta spec requirement 11 | The no-weakening argument covered the added class trigger but never the newly adopted component definition, which a reader could take as narrowing an existing limit. | Accepted. Requirement 11 now states that defining the unit resolves an ambiguity and that a coarser active unit remains the stricter limit. |

The reviewer-kind rule is an isolation rule, so requirement 2 gives it exactly
one guidance expression. It goes in the standing method only; `AGENTS.md` and
`docs/sdd-workflow.md` link it. Restating it there would have been the
restatement defect this change exists to catch.

## Completeness check

Requirement count is unchanged at twelve. Scenario count moved from sixty to
sixty-seven, all additions. No requirement was removed, renamed, or narrowed,
and no non-goal was crossed: every rule added here is manual, adds no schema,
controller, or automated loop, and widens no authorization. The path set grew by
one glossary page, carried through `tracking.yaml`, the mutation boundary, the
packet, task 2.3, and issue #33. All validators pass and the packet is rebound.
