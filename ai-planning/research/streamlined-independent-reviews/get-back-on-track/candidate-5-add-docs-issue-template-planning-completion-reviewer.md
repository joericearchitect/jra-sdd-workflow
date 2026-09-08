# Candidate 5 — what remains to complete planning

**Change:** candidate 5 / `add-docs-issue-template`
([issue #29](https://github.com/joericearchitect/jra-sdd-workflow/issues/29))

**Author role:** **reviewer** — local `base-code-review`, read-only and
advisory. I do not author this change's artifacts. Everything below is a
recommendation to the implementer and to whoever owns the campaign record.

**Derived from:**

- three bounded review passes in
  [`2026-09-07-candidate-5-code-review.md`](../../../scratch/2026-09-07-candidate-5-code-review.md);
- OBS-009 in [`dogfood-observations.md`](../../../plans/dogfood-observations.md);
- the guidance proposed in
  [`streamlined-independent-reviews-findings.md`](../streamlined-independent-reviews-findings.md);
- my proposed delta to that guidance in
  [`streamlined-independent-reviews-findings-delta-reviewer-candidate-5.md`](../streamlined-independent-reviews-findings-delta-reviewer-candidate-5.md).

**Date:** 2026-09-08

This authorizes nothing. The guidance it applies is itself an unauthorized
research note, so treat this as a preview of what that guidance would require
if it were adopted, plus the findings that are already open under current
rules.

---

## Status summary

The change is in good shape. Its scope, decisions, recovery paths, and
evidence lines are settled and correct after three passes, and all six planning
checks pass. What is missing is not judgment — it is the **planning artifacts
the proposed guidance requires that do not exist yet**, plus four open findings.

| Category | Count | Blocking Planning-to-Apply? |
| --- | --- | --- |
| Missing artifact required by the proposed guidance | 3 | Yes, if the guidance is adopted |
| Open change-owned findings | 3 | One yes, two are decisions |
| Open shared-record findings | 3 | Not owned by this change |
| Base precondition | 1 | Yes |

---

## Part 1 — Artifacts the proposed guidance requires that do not exist

These are not corrections. The change never had them, because the guidance that
requires them is not adopted. They are the substance of "complete the planning."

### 1.1 Bidirectional consumer-to-coverage map

Required by `rules.design`: *"Define a bidirectional consumer-to-coverage map
from each affected consumer to behavior, source edit or justified no-edit
decision, requirement, verification owner, task, producible evidence, recovery,
and external prerequisite."*

`design.md` has no such map. Below is the map as I would reconstruct it from
the current artifacts. **Three rows are not covered by any current artifact and
are marked accordingly** — those are the real finding in this section.

| # | Consumer | Behavior | Edit / no-edit | Requirement | Verification owner | Task | Evidence | Recovery |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C1 | GitHub issue chooser | Documentation form appears and opens | Add `documentation.yml` | None durable (`skip_specs: true`) | Manual chooser inspection | 3.2 | Form opens with expected field labels and required/optional indicators | Scoped revert of the one file |
| C2 | Live label inventory | Form declares `sdd`; every maintained form's labels exist live | Add (declares one label); no label mutation | `issue-template-label-alignment`, "Resolve maintained issue-form labels" — scenarios *Form labels exist live* and *A form label is absent* | Fresh live-inventory comparison | 1.1 (pre), 3.3 (post) | Declared label present in fresh discovery | Pause, return to label-alignment review |
| C3 | `bug.yml`, `feature.yml` | Unchanged intake behavior | **Justified no-edit** — compatibility references | Same as C2 (their labels are in scope of the sweep) | Structural review | 1.2 | Diff shows no change to either form | n/a |
| C4 | `config.yml` chooser config | `blank_issues_enabled: false` still holds; a third form needs no config change | **Justified no-edit** | None | Structural review | 1.2 | Diff shows no change | n/a |
| C5 | Triage and label filtering | Documentation intake has no `type:*` filter | **Justified no-edit** on labels; consequence accepted | None | None — accepted consequence | **none** | **none** | Revisit only through a new label-alignment change |
| C6 | `validate-no-hardcoded-environment` | `.github` is a scanned root, so the new file is in its scope | Add (must stay portable) | None | Portability validator | 2.1 | Validator passes with the new file present | Correct the file |
| C7 | `tracking.yaml` paths | Records the one affected path | Already correct | Tracking contract | Tracking validator | 2.1 | Tracking validation passes | Correct the record |
| C8 | Campaign roadmap row | Reflects candidate 5's issue and status | **Owned outside this change** | None | Campaign record owner | **none — correctly** | Owner's record | Owner's |
| C9 | Issue #29 and its Project item | Work state; no mutation planned | **Justified no-edit** | None | Read-only confirmation | 3.1 links it | Merged PR links the issue | n/a |
| C10 | `README.md`, `docs/` | No document enumerates the intake forms, so no drift | **Justified no-edit** | None | Verified by search | **none** | **none** | n/a |

**What this map surfaces that the artifacts do not currently say:**

- **C5 has no verification owner, no task, and no evidence.** That is the
  correct outcome for an accepted consequence, but the guidance requires the
  bidirectional check to show it deliberately rather than by omission. Add one
  line to `design.md` stating that the triage consequence is accepted with no
  verification owner, and why.
- **C6 is not mentioned anywhere.** The tasks run the portability validator as
  part of a batch, but nothing records that `.github` is a scanned root and
  that the new file is therefore inside a portability boundary. A contributor
  writing the form will not know that constraint applies. Add it to
  `design.md` Context and to task 1.1's evidence.
- **C10 is a real no-edit decision that was verified but never recorded.** I
  confirmed in pass 1 that nothing in `README.md`, `docs/`, or
  `openspec/config.yaml` enumerates the intake forms. That justification should
  live in `design.md`, not only in a review note.

### 1.2 Assertion-surface enumeration

Required by `rules.design`: *"Enumerate every artifact surface that restates
scope or contract behavior so a later correction can update the complete
fan-out rather than only the reported line."*

This is the artifact that would have prevented the pass-2 partial fix. The
enumeration for this change:

| Repeated claim | Asserted in |
| --- | --- |
| Only the `sdd` label is applied | proposal *What Changes*; proposal *Non-Goals*; design decision 3; design *Recovery*; tasks 1.1, 2.2, 3.3; issue #29 body — **8 places** |
| Six required fields plus optional Additional context | proposal *What Changes*; design decision 2; tasks 1.1, 3.2; issue #29 body — **5 places** |
| Additive; Bug and Feature preserved | proposal *What Changes*; proposal *Impact*; design *Context*; design *Non-Goals*; tasks 2.2 — **5 places** |
| Affected path is `documentation.yml` | design *Context*; `tracking.yaml` paths; tasks 1.1 — **3 places** |
| Candidate 5's issue and status | `tracking.yaml`; campaign roadmap row; Project item — **3 places, one stale** |

Add this table to `design.md`. Any later correction to one of these claims must
visit every row.

### 1.3 Declared fact authorities for this change

Required by the contradiction-handling guidance and the fact-authority table.
The change currently resolves facts correctly by instinct; it does not say
which source owns which fact. State them once in `design.md`:

| Fact | Authority for this change |
| --- | --- |
| Whether a declared label exists | Live label inventory, discovered fresh |
| The label-alignment requirement | Living `issue-template-label-alignment` specification on the delivered branch |
| Rendered form behavior | GitHub, observed after delivery |
| Candidate 5 work state | Issue #29 and its Project item |
| Delivered state of any dependency | Git and merged pull-request evidence, **not the working copy** |
| Campaign sequencing | The campaign roadmap's owner |

The fifth row is the one that matters. It is the rule that R-20 broke.

---

## Part 2 — Open change-owned findings

### 2.1 R-23 — task graph does not reach the baseline task *(blocking)*

Task 1.1 does not depend on task 0.1, so the delivery-baseline gate holds only
by file order. Under `rules.tasks` — *"Make every prerequisite reachable
through explicit task dependencies; do not rely on file order or mix an
external delivery gate into an internal task ID chain"* — this is two defects,
not one.

**Second defect:** tasks 0.1, 1.1, and 3.1 all place external gates
("Planning-to-Apply approval", "the resolved campaign batch decision",
"Verification-to-closure approval") inside their `Depends on` lines, which the
same rule forbids. I did not report this in pass 3; it only becomes a defect
under the proposed guidance.

**Recommended shape** — separate external gates from the internal chain:

```markdown
## Entry gates

These are external authorizations, not task dependencies. Each must be granted
before the task that names it may start.

- Planning-to-Apply approval — required before task 0.1.
- Resolved campaign batch decision — required before task 0.1.
- Verification-to-closure approval — required before task 3.1.

## 0. Fresh delivery baseline

- [ ] 0.1 …
  Depends on: None.
  Entry gates: Planning-to-Apply approval; resolved campaign batch decision.

## 1. Documentation intake form

- [ ] 1.1 …
  Depends on: 0.1.
  …
```

Also state that 3.2 and 3.3 are intentional parallel siblings of 3.1 rather
than an ordering oversight.

### 2.2 R-24 and R-25 — two carried decisions *(not blocking; decide and record)*

The `goal:` key in `.openspec.yaml` and the change-directory `README.md` have
been carried unchanged through three passes. Under the finding-lifecycle
guidance — *"Persist non-fix decisions with their reasons in a reviewer-visible
record"* — either outcome closes them:

- remove both, or
- record an accept decision with its reason.

What should not happen is a fourth pass reporting them again. Either action
completes planning; silence does not.

---

## Part 3 — The base precondition *(blocking)*

Planning cannot honestly be called complete while the workspace cannot read the
requirement the artifacts cite. The local checkout is behind the delivered
branch, so `openspec/specs/issue-template-label-alignment` is not present; the
only local copy sits inside a resurrected directory for an already-archived
change.

Task 0.1 handles this correctly **for delivery**. It does not handle it for
**planning completion**, which is happening now, on the stale base.

Either:

1. refresh the working base and re-run the six planning checks, so the passing
   evidence is produced against the specification set the change will be
   verified against; or
2. state the base identity explicitly in `design.md` and record that the
   requirement text was read from the delivered branch rather than the working
   copy.

Option 1 is cleaner and also removes the resurrected directory from the
branch's reach. Option 2 is acceptable if refreshing is disruptive to the other
concurrent sessions.

---

## Part 4 — Shared-record findings, not owned by this change

R-20, R-21, and R-22 are all on the campaign roadmap. Under the ownership
boundary I proposed, this change reports them once and does not carry them:

- **R-20** — candidate 4's record was written from the stale checkout and
  asserts that delivered evidence "is not present." Both of its pull requests
  are merged and its archive is on the delivered branch. This is the fact
  authority rule being broken, and it makes candidate 5 read as blocked on a
  dependency that has landed.
- **R-21** — candidate 5 and candidate 8 sit in the same batch under the same
  unmet condition; only candidate 8 is marked blocked.
- **R-22** — candidate 5's row still reads issue `TBD` and status `Not started`
  while issue #29, a Project item, and a full artifact set exist.

**Candidate 5's only dependency on these:** R-21's outcome is an entry gate for
task 0.1. The change needs the batch decision resolved; it does not need to fix
the roadmap, and should not edit it.

---

## Definition of done for candidate 5 planning

Planning is complete when all of the following hold:

- [ ] Base identity stated and verified, or the base refreshed (Part 3)
- [ ] Consumer-to-coverage map in `design.md`, including the C5, C6, and C10
      rows the current artifacts omit (1.1)
- [ ] Assertion-surface table in `design.md` (1.2)
- [ ] Fact authorities declared in `design.md` (1.3)
- [ ] Entry gates separated from `Depends on`; task 1.1 depends on 0.1 (2.1)
- [ ] `goal:` key and change `README.md` either removed or accepted on the
      record (2.2)
- [ ] Campaign batch decision resolved by its owner, so task 0.1's entry gate
      can be granted (Part 4)
- [ ] Six planning checks re-run and passing on the final base

Items 2 through 6 are edits to `design.md` and `tasks.md` only. No proposal,
tracking, specification, or capability change is needed — those are settled and
correct.

---

## What needs no change

Recording this so a later pass does not revisit it:

- `proposal.md` scope, non-goals, capabilities, and the `skip_specs: true`
  classification.
- `tracking.yaml` — valid, and its one path is correct.
- Design decisions 1 through 4, including the `[Docs]` prefix rationale and the
  label-taxonomy trade-off, all settled in passes 2 and 3.
- The tasks 3.2 / 3.3 evidence split, which correctly separates rendered-form
  observation from label verification with no intake mutation.
- The recovery paths, which are bounded and each ship with an exit.

---

## Confidence and limits

- **Verified:** every quoted rule was read from the research note; every
  finding reference traces to the three-pass review record; the C10 no-edit
  justification and the C6 portability-root claim were both confirmed by
  search against the current workspace.
- **Reconstructed, not authored:** the consumer-to-coverage map is my reading
  of the change, produced to show what the artifact would contain and where it
  is thin. The implementer owns the real one and may find consumers I missed.
- **Conditional:** Part 1 applies only if the proposed guidance is adopted.
  Under current repository rules, only Part 2.1, Part 3, and the batch decision
  in Part 4 are open.
- **Single reviewer, single candidate.** Candidates 7 and 8 are running
  concurrently and their sessions may reach different conclusions about the
  shared roadmap.
