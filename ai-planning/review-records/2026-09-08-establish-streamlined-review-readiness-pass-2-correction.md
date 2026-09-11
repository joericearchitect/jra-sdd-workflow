# establish-streamlined-review-readiness — pass-2 correction record

Record ID: `RR-P2C-2026-09-08-01`
Date: 2026-09-08
Change: `establish-streamlined-review-readiness` (issue #33)
Mode: owner-authorized correction after a short design pause. **Not** a review
pass, not an independent review, not OpenSpec Verify, not approval, and not
Apply authorization.

This record opens with the pause decision and the pre-edit surface lists.
Those lists were written before any other file in this correction was edited.
The closure table at the end is filled only after those surfaces are visited.

## Bound identity being corrected

Pass 2 reviewed base commit `1963c872178d3e563aa5cb8b3f4607066732a3b0` with the
member digests recorded in `review-packet.md` at that pass. This correction
changes that identity. Pass 2's conclusion does not apply to the identity this
record produces.

Source of findings:
`ai-planning/review-records/2026-09-08-establish-streamlined-review-readiness-pass-2.md`.

## Design-pause decision

This is not a rewrite of the contract. Packet members, isolation, the defect
classes, and the claim-keyed component stay as they are.

What failed twice is close-out: a correction was called done when the spec
contained a rule, and the proof was a phrase search plus green validators.
Those checks cannot see leftover sentences in `design.md`.

A restatement correction is closed only when a surface list written before the
edit is filled after the edit (each surface updated or left on purpose). A
phrase search and a validator pass are not that proof. Requirement 8 already
requires this; the last closure record skipped it and wrote "all corrected."

No new generic spec paragraph is added for this close-out rule. Writing more
rules without walking surfaces is the failure being repaired.

## Owner calls locked for this correction

- Transition for older in-flight changes: they stay exempt from authoring an
  index until their owner starts a review after this contract is delivered;
  that first review requires an index, authored by that change's owner. No
  retrofit task here.
- Issue #33: this correction authorizes aligning the issue to the current
  `tracking.yaml` path set (read the live issue; mutate only if it still
  disagrees).
- Testimony: quote what it says (three defect classes, mostly different rows;
  estimate covered never-touched plus incomplete classes; nine repair-induced
  findings from two facts). Drop the unsupported "three unrelated claims, so
  the stop does not fire" safety claim.
- Planning vs implementation: review records, `review-packet.md`, and task
  checkboxes stay planning-boundary edits. The implementation path set stays
  the delivered guidance/spec paths.

## Classification

One contract-changing correction covering all eight pass-2 root facts, applied
as a batch. It introduces no new mechanism except one requirement-2 sentence
(when the index excludes itself, another bound record SHALL carry the index
digest) and one Recovery transition bullet. No controller, checker, validator
behavior change, or skills-repo work.

## Pre-edit surface lists

Written before any other file in this correction was edited. Walk every row.
Do not start those file edits until these lists exist.

### RF-A — leftover numbers for lists that already have an owner

Fix form: name the members or point at the owning surface. Do not replace one
number with a newer number.

| Surface | Pre-edit leftover |
| --- | --- |
| `design.md` Context | "three further terms"; "moved five of its decisions" |
| `design.md` shared-record glossary row | "Two pages receive additions only"; "`03-change-and-artifacts.md` … untouched" |
| `design.md` Verification Strategy | confirms only `review pass`, `component`, and `root fact` |
| `design.md` equalities | describe sets as "ten / eight / five members" |
| `review-packet.md` authorities | "moved five" |
| `proposal.md` | any remaining headcount of those same sets |
| `tasks.md` | any remaining headcount of those same sets |

### RF-B — rules published and not used here

| Surface | Required visit |
| --- | --- |
| `design.md` mutation-path fan-out row | add issue #33 |
| `design.md` equality bullets | planned paths = `tracking.yaml` paths = issue #33 in-scope list |
| `tasks.md` 4.1 | that equality, and the packet-member quote equality, on the recheck list (also RF-H) |
| `design.md` packet-member table | first column quotes requirement 1's ten lines verbatim |

### RF-C — packet locates files, not members; packet itself is unlocked

| Surface | Required visit |
| --- | --- |
| `review-packet.md` | member-location section that quotes requirement 1 and points each member at its owning location |
| delta spec requirement 2 | one sentence: when the index excludes itself from its digest set, another bound record (the review record) SHALL carry the index digest |
| this correction record | holds `review-packet.md`'s digest after rebind |

### RF-D — empty proof check; edit permission vs tasks

| Surface | Required visit |
| --- | --- |
| `tasks.md` 4.2 | replace `git status --short` as the observer of edits inside this untracked change directory with an explicit named-file listing |
| `design.md` Verification Strategy | same replacement |
| `design.md` boundary | state that 4.3's review-record and packet refresh are planning-boundary edits, not implementation-path edits |
| `tasks.md` 1.1 / 2.1 / 2.2 | create `docs/review/adversarial-review.md` (2.2) before 1.1 and 2.1 add links to it |

### RF-E — witness testimony

| Surface | Required visit |
| --- | --- |
| `design.md` taxonomy/trigger subsection | quote three defect classes on mostly different rows; drop the unsupported safety claim |
| `design.md` third-pass subsection | estimate covered never-touched plus incomplete classes; nine repair-induced findings from two facts |

### RF-F — delivered-state and authorization

| Surface | Required visit |
| --- | --- |
| `design.md` Context | glossary pages and this change's review records are uncommitted working-tree text, not contents of `1963c872…` |
| `design.md` C15 | cite this correction's authorization for the current `tracking.yaml` path set |
| live issue #33 | confirm equality; edit only if it disagrees |

### RF-G — no on-ramp

| Surface | Required visit |
| --- | --- |
| `design.md` C21 | exempt until first post-delivery review; that review requires an index |
| `design.md` Recovery | the same transition as an exit |

RF-H is the 4.1 recheck-list row under RF-B.

## Closure table

Filled after the listed surfaces were visited.

| Root fact | Surface | Result | Why |
| --- | --- | --- | --- |
| RF-A | `design.md` Context leftover numbers | updated | Named the glossary terms task 2.3 adds; pointed "moved decisions" at the supersession table. |
| RF-A | `design.md` shared-record glossary row | updated | Points at the pages and additions task 2.3 names. Remaining pages stay untouched. |
| RF-A | `design.md` Verification Strategy term list | updated | Confirms each term task 2.3 adds, not a shorter leftover list. |
| RF-A | `design.md` equalities | updated | Member, class, and provenance sets are pointed at their owning lists, not restated as counts. |
| RF-A | `review-packet.md` authorities | updated | Points at the supersession table instead of "moved five." |
| RF-A | `proposal.md` | updated | Impact points at the entries task 2.3 names. Why already said "several" decisions. |
| RF-A | `tasks.md` leftover headcounts | updated | 1.1, 2.2, 4.1, and 4.3 point at the delta specification's class and provenance lists. |
| RF-A | `design.md` C10 and fan-out headers | updated | Surviving "five entries" and "eight / five" row headers found after the listed edits; pointed at task 2.3 and the spec lists. |
| RF-B | `design.md` mutation-path fan-out row | updated | Issue #33 is on the row. |
| RF-B | `design.md` equality bullets | updated | planned paths = `tracking.yaml` paths = issue #33 in-scope list. |
| RF-B / RF-H | `tasks.md` 4.1 | updated | Rechecks path-set equality with the issue, and the packet-member quote equality. |
| RF-B | `design.md` packet-member table | updated | First column quotes requirement 1 in order and wording. |
| RF-C | `review-packet.md` member-location section | updated | Quotes requirement 1 and locates every other member. |
| RF-C | delta spec requirement 2 | updated | When the index excludes itself, the review record SHALL carry the index digest. Scenario added. |
| RF-C | this correction record | updated | Index digest recorded below. |
| RF-C | `design.md` packet subsection | updated | Same binding rule applied on the digest-obligation fan-out. |
| RF-D | `tasks.md` 4.2 | updated | Named-file listing of the planning-boundary files. `git status --short` is named as not that observer. |
| RF-D | `design.md` Verification Strategy | updated | Same replacement. |
| RF-D | `design.md` equality that used `git status --short` on this change | updated | Surviving expression; now uses the task 4.2 listing. |
| RF-D | `design.md` C6 and C9 | left | Those rows observe tracked trees outside this untracked change directory, where `git status --short` can see the path. |
| RF-D | `design.md` boundary | updated | 4.3 review-record and packet refresh are planning-boundary edits. |
| RF-D | `tasks.md` 1.1 / 2.1 / 2.2 | updated | 2.2 depends on 0.1; 1.1 depends on 2.2; 2.3 depends on 2.1 so 2.1 stays on the path to 3.1. |
| RF-E | `design.md` taxonomy/trigger subsection | updated | Quotes three defect classes on mostly different rows; drops the unsupported safety claim. |
| RF-E | `design.md` third-pass subsection | updated | Estimate covers never-touched plus incomplete classes; repair-induced findings trace to two facts. |
| RF-F | `design.md` Context delivered-state | updated | Glossary additions and this change's review records are uncommitted working-tree text. |
| RF-F | `design.md` C15 | updated | Cites this correction record's authorization. |
| RF-F | live issue #33 | left | In-scope path list already equals the `tracking.yaml` path set. No mutation. Narrative leftover counts on the issue were outside the locked path-set check. |
| RF-G | `design.md` C21 | updated | Exempt until first post-delivery review; that review requires an index. |
| RF-G | `design.md` Recovery | updated | Same transition as an exit. |

## Index digest

Requirement 2, after this correction: when the index excludes itself from its
digest set, this record carries the index digest.

| File | SHA-256 |
| --- | --- |
| `openspec/changes/establish-streamlined-review-readiness/review-packet.md` | `6442a766b314935c218e7d2749415f88d4ef049def8f92f060cec01f72c2f84a` |

Reproduce:

```bash
cd openspec/changes/establish-streamlined-review-readiness && shasum -a 256 review-packet.md
```

## Correction complete

Validators run after this table was filled. Apply was not started. Pass 3 was
not run. The next review is against this new binding and must be able to read
issue #33 or class 5 stays partial.
