# establish-streamlined-review-readiness — finding dispositions

Record ID: `RR-DISP-2026-09-10-01`
Date: 2026-09-10
Change: `establish-streamlined-review-readiness` (issue #33)
Mode: owner-authorized reconciliation after an accepted redesign. **Not** a
review pass, not an independent review, not OpenSpec Verify, not approval, and
not Apply authorization.

## What this record is

Every finding identity raised against this change now has one recorded outcome.
This is the record `p3-prior-findings-stale` said was missing, and the
obligation the
[simplified-contract brief](../design-briefs/2026-09-10-review-readiness-simplified-contract.md)
§7 step 4 and issue #33's acceptance criteria both place ahead of authoring
replacement artifacts.

The historical records are not edited. They remain accurate about the identity
they were raised against. This record owns current status and links back to
them.

Fifty-two identities: four pre-pass implementer findings, ten from pass 1,
eight from the pass-1 owner-directed self-review, fourteen from pass 2, and
sixteen from pass 3. Thirty were open when the artifacts were retired.

## Preconditions this record depends on

| Precondition | Status |
| --- | --- |
| The second-repair stop on `p3-boundary-observer` required design review before a third repair | Satisfied, then satisfied again. The first design review was the simplified-contract brief's Decision 3. Its replacement observer failed as `ARR-001`, and [a second design review](2026-09-10-review-readiness-scope-observation-design-review.md) supersedes it. No repair of this claim was made outside either review. |
| The third-pass stop required a complete sweep before diagnosis | Satisfied at pass 3, which declared all eight classes with issue #33 read live. |
| Requirement 9 precedence 1 required design reconciliation before further edits | Satisfied. No artifact was edited between pass 3 and the retirement. |
| An owner decision is required to start a new review series | Recorded 2026-09-10 in the brief's status block. Prior findings carry forward through this record; the count does not reset by relabelling. |

## Outcome vocabulary

| Outcome | Meaning |
| --- | --- |
| `verified-closed` | The problem is gone and the evidence is named here. |
| `resolved-by-design` | The accepted redesign removes the cause. The decision is named. A re-entry guard below prevents the cause returning. |
| `obsolete-by-removal` | The surface carrying the problem no longer exists. Contingent: see the re-entry guards. |
| `carried-open` | Still live. The replacement artifacts must satisfy it. |
| `external` | Subject outside this change's mutation boundary. |

`obsolete-by-removal` is the largest group and the easiest to abuse, so it is
qualified: each one names the surface that must stay absent, and the guards
section collects them into a single check to run against the replacement
artifacts. A finding is not closed by deleting the file it was written on if
the replacement reintroduces the same structure.

## Tally

| Outcome | Count |
| --- | --- |
| `verified-closed` | 10 |
| `resolved-by-design` | 10 |
| `obsolete-by-removal` | 16 |
| `carried-open` | 16 |

Fifty-two total. Two of the ten `verified-closed` were raised as
`external-state` against issue #33 and closed by the 2026-09-10 rescope; they
are marked `external` → `verified-closed` in the pass-3 table.

Sixteen obligations survive into the replacement artifacts. They are collected
in "Carried obligations" below and are the working checklist for authoring.

## Pre-pass implementer findings

| ID | Outcome | Basis |
| --- | --- | --- |
| `IF-1` | `verified-closed` | Confirmed closed in the bound identity at pass 1. Its lesson — source ownership and truthful attribution — is Decision 1. |
| `IF-2` | `resolved-by-design` | Decision 1. The path set is restated on no surface: `tracking.yaml` owns it and others reference it. This identity reached three generations (`IF-2` → `rr-c11-path-count` → RF-A) because the design required the set on many surfaces. Removing the requirement removes the defect class. |
| `IF-3` | `verified-closed` | Confirmed closed at pass 1. Its "unmodified" statement is historical, not a claim about present state. |
| `IF-4` | `verified-closed` | The glossary text is committed as `glossary-additions.patch` in [the retired-artifacts record](2026-09-10-retired-review-readiness-artifacts/README.md), commit `e9eaf79`, with the working tree left intact. It can no longer be stranded in one worktree. |

## Pass 1

All ten were accepted and corrected at pass 1. Four later regressed, which is
recorded against their successor identities rather than reopened here.

| ID | Outcome | Basis |
| --- | --- | --- |
| `rr-authority-brief` | `resolved-by-design` | Decision 1. The new brief supersedes its predecessors outright, so there is no contradicted authority to demote and no divergence table to keep current. |
| `rr-component-stop` | `carried-open` | Decision 6 keeps both stop triggers, so "component" still needs its claim-keyed definition. It is one of the five glossary terms to deliver. |
| `rr-issue-scope` | `verified-closed` | Issue #33 was rescoped on 2026-09-10 with the previous body preserved. Carried forward as an obligation: the new `tracking.yaml` must equal the issue's in-scope list. |
| `rr-c11-path-count` | `resolved-by-design` | Decision 1, with `IF-2`. |
| `rr-fanout-table-split` | `obsolete-by-removal` | The assertion fan-out register is retired by Decision 1. A register that cannot be read as one set cannot exist if there is no register. |
| `rr-gates-map` | `carried-open` | The consumer map is retained by Decision 5. The gate tables and the review-record location must appear in it. |
| `rr-ten-members` | `obsolete-by-removal` | The ten-member packet list is retired by Decision 2. |
| `rr-index-stop-condition` | `obsolete-by-removal` | The packet index and its stop condition are retired by Decision 2. |
| `rr-glossary-rewrite` | `carried-open` | Glossary delivery is retained. The additions-only rule must read the same on the task, the map row, and the proposal. |
| `rr-c10-requirement-ids` | `obsolete-by-removal` | There are no numbered requirements to cite. The underlying class — citation drift between surfaces — recurred as `p3-c17-requirement-ids` and is carried there. |

## Pass-1 owner-directed self-review

These eight generalised pass 1's local repairs into specification requirements.
With no specification, each is re-examined on its merits rather than inherited.

| ID | Outcome | Basis |
| --- | --- | --- |
| `sr-generic-authority` | `carried-open` | The practice survives in the guide's input-binding topic: do not list an input the change contradicts as an authority. Stated once, in the guide. |
| `sr-generic-stop-condition` | `obsolete-by-removal` | It governed the packet index's readiness condition, retired by Decision 2. |
| `sr-generic-task-map` | `carried-open` | A task's permitted edit must equal the map's recorded edit. Cheap, and it caught a real defect. Belongs in the guide's coverage topic. |
| `sr-generic-set-not-count` | `resolved-by-design` | Decision 1. With one owner per fact there is no restated set to go stale as a count. |
| `sr-generic-register-legible` | `obsolete-by-removal` | The register is retired by Decision 1. |
| `sr-generic-work-state` | `carried-open` | The issue's declared scope must equal the planned inventory. Applies immediately to the rescoped issue #33. |
| `sr-reviewer-kind` | `carried-open` | Retained in the guide's input-binding topic. Note that `base-code-review` in the agent-skills repository already enforces the same distinction through its `assurance` label; the guide states the rule, and the future skill work should consume that enforcement rather than restate it. |
| `sr-component-not-narrowing` | `carried-open` | Defining the unit must not relax a stricter active limit. One sentence in the guide's stop topic. |

## Pass 2

All fourteen were `Open` in the pass-2 record. The pass-2 correction addressed
them by root fact and surface, never by identity, which is why pass 3 found the
dispositions missing. Each is now given one.

| ID | Outcome | Basis |
| --- | --- | --- |
| `rr-divergence-count` | `obsolete-by-removal` | The supersession table is retired; the new brief supersedes its predecessors wholesale rather than row by row. |
| `rr-glossary-set-stale` | `resolved-by-design` | Decision 1. Glossary scope is stated once, by the task that delivers it. |
| `rr-workstate-fanout` | `obsolete-by-removal` | The fan-out register is retired. The obligation it encoded survives as `sr-generic-work-state`. |
| `rr-member-quote` | `obsolete-by-removal` | The quoted member table is retired by Decision 2. |
| `rr-index-locates-members` | `obsolete-by-removal` | Decision 2. |
| `rr-index-unbound` | `resolved-by-design` | Decision 2. The review record's start header is written before analysis and binds the inputs; nothing binds itself. |
| `rr-context-delivery-claim` | `carried-open` | The replacement `design.md` Context must not describe uncommitted work as delivered. Partly relieved by committing the records and the glossary patch, but the discipline still applies to whatever remains uncommitted. |
| `rr-status-vacuous` | `resolved-by-design` | **Basis revised 2026-09-10.** Originally closed on Decision 3's clean-worktree observer; that observer then failed as `ARR-001`, because `git status` cannot see committed work. Now closed on the [scope-observation design review](2026-09-10-review-readiness-scope-observation-design-review.md): the pull request's changed-file list is the observer, and Propose makes no workspace-integrity claim. This is the identity whose second failure fired the stop and whose third failure forced that review. |
| `rr-testimony-claims` | `carried-open` | The witness testimony remains cited evidence. Any claim about what it says must match it. |
| `rr-no-transition` | `carried-open` | The guide must state that a change predating it adopts it at its owner's first review afterwards. Already reflected in the rescoped issue's out-of-scope list. |
| `rr-testimony-latent-estimate` | `carried-open` | With `rr-testimony-claims`. Estimates stay estimates and keep their stated basis. |
| `rr-dangling-method-link` | `carried-open` | Task order must create `docs/review/adversarial-review.md` before any task links it, and a task's evidence must be producible when that task runs. Still fully applicable. |
| `rr-quote-equality-unchecked` | `obsolete-by-removal` | The equality it went unchecked against is retired by Decision 2. |
| `rr-issue-authorization-scope` | `verified-closed` | The 2026-09-10 rescope is authorized for its actual scope, with the prior body preserved. Carried forward: the replacement `design.md` must cite that authorization, not pass 1's narrower one. |

## Pass 3

| ID | Outcome | Basis |
| --- | --- | --- |
| `p3-glossary-stranded` | `verified-closed` | With `IF-4`. The text is committed and no longer depends on one worktree surviving. |
| `p3-boundary-observer` | `resolved-by-design` | **Basis revised 2026-09-10**, with `rr-status-vacuous`. Decision 3's replacement observer failed as `ARR-001`; the [scope-observation design review](2026-09-10-review-readiness-scope-observation-design-review.md) is the current basis. The stop it fired demanded design review before a third repair, and both design reviews happened before any repair of this claim. |
| `p3-prior-findings-stale` | `verified-closed` | This record. Every identity from every pass now has an outcome, and this record is the single current-status reference. |
| `p3-correction-record-unbound` | `verified-closed` | All four review records, the handoff, the testimony, and both briefs are committed at `e9eaf79`. They are bound by Git object identity; the chain no longer ends in a moving object. |
| `p3-manifest-unproducible` | `resolved-by-design` | Decisions 2 and 4. There is no member-3 manifest. The start header lists the inputs that actually exist at the phase the review runs. |
| `p3-task-0-1-unmapped` | `carried-open` | The branch and worktree registration in task 0.1 makes real operational mutations and needs a map row, an owner, and a recovery path. |
| `p3-2-2-forward-evidence` | `carried-open` | With `rr-dangling-method-link`. No task may evidence a later task's output. |
| `p3-issue-path-prose` | `external` → `verified-closed` | The rescoped issue states literal paths and names `tracking.yaml` as authoritative, so the equality is checkable without reinterpreting prose. Carried forward: the new `tracking.yaml` must equal that list. |
| `p3-issue-index-criterion` | `external` → `verified-closed` | The packet-index acceptance criterion was removed in the rescope. The contract no longer requires of older changes something it exempts them from. |
| `p3-boundary-not-on-fanout` | `obsolete-by-removal` | The register is retired by Decision 1. |
| `p3-issue-authorization-survives` | `obsolete-by-removal` | The packet's prior-findings narrative is retired by Decision 2; the authorization claim it carried is superseded by the 2026-09-10 rescope. |
| `p3-index-digest-window` | `resolved-by-design` | Decision 2. The start header is written before analysis begins, so no unbound window exists. This defect had no fix inside the retired design. |
| `p3-brief-divergences-unlisted` | `obsolete-by-removal` | The supersession table is retired. The new brief supersedes its predecessors as documents, so no per-divergence enumeration is owed. |
| `p3-config-paraphrase` | `carried-open` | Any claim the replacement artifacts make about `openspec/config.yaml`, the glossary, or the workflow doc must match what that source says. The class-8 discipline survives the specification that named it. |
| `p3-c17-requirement-ids` | `obsolete-by-removal` | No numbered requirements to mis-cite. |
| `p3-dir-carveout` | `obsolete-by-removal` | The packet stop condition is retired by Decision 2. |

## Carried obligations

The sixteen `carried-open` items as fourteen checks, plus one carry-forward
from findings closed above. Each must be satisfied or explicitly
re-dispositioned before the replacement artifacts go to review.

1. Define `component` claim-keyed in the glossary — `rr-component-stop`.
2. Consumer map covers the gate tables and the review-record location —
   `rr-gates-map`.
3. Additions-only glossary rule reads identically on task, map row, and
   proposal — `rr-glossary-rewrite`.
4. Do not list an input the change contradicts as an authority —
   `sr-generic-authority`.
5. A task's permitted edit equals the map's recorded edit — `sr-generic-task-map`.
6. The issue's declared scope equals the planned inventory —
   `sr-generic-work-state`, `rr-issue-scope`, `p3-issue-path-prose`.
7. Every review records which kind of reviewer produced it — `sr-reviewer-kind`.
8. Defining the stop's unit does not relax a stricter active limit —
   `sr-component-not-narrowing`.
9. Context does not describe uncommitted work as delivered —
   `rr-context-delivery-claim`.
10. Claims about the witness testimony match it — `rr-testimony-claims`,
    `rr-testimony-latent-estimate`.
11. The guide states how a change predating it adopts it — `rr-no-transition`.
12. The guide exists before anything links it; no task evidences a later task's
    output — `rr-dangling-method-link`, `p3-2-2-forward-evidence`.
13. Task 0.1's operational mutations have a map row, owner, and recovery —
    `p3-task-0-1-unmapped`.
14. Claims about `config.yaml`, the glossary, and the workflow doc match those
    sources — `p3-config-paraphrase`.
15. Carry-forward from closed findings: `design.md` cites the 2026-09-10 issue
    authorization rather than pass 1's narrower one, and the new
    `tracking.yaml` equals the rescoped issue's in-scope list —
    `rr-issue-authorization-scope`, `rr-issue-scope`, `p3-issue-path-prose`.

## Re-entry guards

Sixteen findings are closed because a surface no longer exists, and six more
because a decision removes the structure that produced them. Those closures
hold only while the structure stays absent. If the replacement artifacts
reintroduce any of these, the findings listed beside it reopen at their
original severity.

State each guard as the **class** of structure, not as the instances already
seen. The last row was originally written as "a claim made from the dirty
primary worktree," which described the two failures known at the time;
`ARR-001` was the same defect in a clean worktree and the guard would not have
caught it. A guard narrowed to its examples is not a guard.

| Structure that must stay absent | Reopens |
| --- | --- |
| A per-change packet index file | `rr-ten-members`, `rr-index-stop-condition`, `rr-member-quote`, `rr-index-locates-members`, `rr-quote-equality-unchecked`, `p3-issue-authorization-survives`, `p3-dir-carveout`, `sr-generic-stop-condition` |
| A durable assertion fan-out register as a required artifact | `rr-fanout-table-split`, `rr-workstate-fanout`, `p3-boundary-not-on-fanout`, `sr-generic-register-legible` |
| A brief-versus-change supersession table | `rr-divergence-count`, `p3-brief-divergences-unlisted` |
| Numbered requirement identifiers cited across surfaces | `rr-c10-requirement-ids`, `p3-c17-requirement-ids` |
| Any decisive set restated on more than one surface | `IF-2`, `rr-c11-path-count`, `sr-generic-set-not-count`, `rr-glossary-set-stale` |
| Any whole-change scope claim evidenced by a local command run at a moment the implementer chooses — in any worktree, clean or dirty | `rr-status-vacuous`, `p3-boundary-observer`, `ARR-001` |

The last row is the one that fired the second-repair stop. A third statement of
that claim in any form returns the change to design review rather than to a fix.

## What this record does not do

It does not authorize Apply, approve the replacement artifacts, or assert that
the redesign is correct. `resolved-by-design` records that a decision removes a
cause, not that the decision has been implemented — ten of the fifty-two rest
on artifacts that do not exist yet, and the guards above are how they get
checked when they do.

It does not re-review the retired artifacts. Coverage was complete only at pass
3; passes 1 and 2 declared classes incompletely, and pass 2 left class 5
partial. A finding that never surfaced is not closed by this record — it is
unknown, and the replacement artifacts get their own review rather than
inheriting a clean result.
