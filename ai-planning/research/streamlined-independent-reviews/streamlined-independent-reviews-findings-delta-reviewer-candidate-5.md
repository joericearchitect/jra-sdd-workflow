# Proposed delta to the streamlined-independent-reviews findings

**Target document:**
[`streamlined-independent-reviews-findings.md`](streamlined-independent-reviews-findings.md)

**Author role:** **reviewer** — local `base-code-review`, read-only and
advisory. Not the planner and not the implementer for the change discussed.

**Source run:** candidate 5 / `add-docs-issue-template`, three bounded review
passes recorded in
[`ai-planning/scratch/2026-09-07-candidate-5-code-review.md`](../../scratch/2026-09-07-candidate-5-code-review.md)
and summarized as OBS-009 in
[`ai-planning/plans/dogfood-observations.md`](../../plans/dogfood-observations.md).

**Date:** 2026-09-08

This document proposes text. It authorizes nothing. The target document is
itself an unauthorized research note, so this is a proposed delta to a
proposal. Anything here needs the normal Explore, Propose, and review path
before it becomes a product change.

---

## Verdict, stated first

**Using the stated threshold — excessive means more than three passes — the
manifest as written would already have prevented excessive loops on this run.**
This run took three passes, which is at the boundary and not over it, and the
manifest closes the two mechanisms that produced passes 2 and 3 most directly.
My honest estimate is that the manifest alone brings this run to two passes.

So the correct answer to "what must be added" is: **nothing is required.**

What follows is therefore not a list of gaps that caused the observed loops. It
is insurance against the two mechanisms this run demonstrated that the target
document explicitly assumes away, and that are the only mechanisms in the run
capable of producing a fourth pass. I would still add them, because they are
cheap and because they are the difference between "converges in two" and
"converges in an unbounded number."

---

## Why only two mechanisms can push a run past three passes

A review loop converges when each pass's finding set is the prior set minus
what was fixed. It diverges when a pass produces findings the prior pass could
not have produced. Three mechanisms produced new findings in this run:

| Mechanism | Bounded? | Covered by the manifest? |
| --- | --- | --- |
| **D1 — Stale working base.** The base stayed two merges behind the delivered branch for all three passes, so each pass surfaced a different downstream symptom of one cause: a missing living specification, then a resurrected archived change, then a shared record asserting that delivered evidence "is not present in this checkout." | **No.** There is no limit to how many distinct symptoms one stale base can produce. | **No** — excluded by assumption. |
| **D2 — Concurrently edited shared record.** The campaign roadmap changed between every pass because three sessions edit it. Pass 3's three roadmap findings did not exist at pass 2 because the file was different. | **No.** New findings appear for as long as other sessions edit the file. | **Findings yes, repetition no.** |
| **D3 — Incomplete corrections.** Each fix changed the named location and left another location asserting the old thing, creating one new finding per pass. | **Yes.** Bounded by the number of assertion sites. | **Yes, thoroughly.** |

The manifest eliminates D3, which is the bounded one. D1 and D2 are the
unbounded ones, and they are precisely what the target document brackets out at
line 73: *"Assuming the base is current and parallel changes share neither files
nor dependencies, seven causes remain."*

That assumption is the whole gap. Everything I propose below follows from
converting it into a verified precondition.

---

## Coverage assessment of the existing manifest

My six recorded loop causes from OBS-009, scored against the manifest:

| OBS-009 cause | Manifest coverage | Would I add anything? |
| --- | --- | --- |
| 1. Stale base produced three different-looking findings | Excluded by assumption. Partially rescued by the fact-authority table's *Delivered source state → Git and merged pull-request evidence* row and *"Recency, a current worktree, or a reviewer statement does not override the declared owner."* | **Yes — ADD-1** |
| 2. Corrections locally right, globally incomplete | Covered four times: the `AGENTS.md` implementer bullet, the `docs/sdd-workflow.md` implementer handoff, `rules.design` "enumerate every artifact surface that restates scope," and `operations.apply.guidance` enumerate-before / search-after. | **No** |
| 3. Shared-record findings never converge | Contradiction handling catches the findings; *Work state → configured issue or project system* catches the stale row. Nothing addresses a file edited by concurrent sessions. | **Yes — ADD-2** |
| 4. No way to close a finding by accepting it | Covered for manual runs: "persist non-fix decisions with their reasons in a reviewer-visible record" and "do not reopen a disposition without new evidence." | **Only for autonomous runs — ADD-4** |
| 5. Passing checks are not a correctness signal | Covered in four places, including the new `## Before delivery` paragraph and `base-code-review`'s "do not treat a passing test or validator as evidence outside what it directly checks." | **No** |
| 6. Reviewer speculation cost a pass | Covered: "record unverified concerns as gaps," recommendations stay advisory, and the sealed prompt's "do not emit a suspected defect unless package evidence supports it." | **No** |

Individual findings the manifest would have caught outright, for calibration:

- **R-23** (a new prerequisite task unreachable from its dependent) is a direct
  hit on the proposed `rules.tasks` string *"Make every prerequisite reachable
  through explicit task dependencies; do not rely on file order or mix an
  external delivery gate into an internal task ID chain."* That rule also
  catches something I did not report: both task 0.1 and task 1.1 place external
  gates in their `Depends on` lines, which the same rule forbids.
- **R-20** (a shared record recording delivery status from the local checkout)
  is caught by the authority table plus the "recency does not override the
  declared owner" sentence.
- **R-04** (evidence that the named check could not actually observe) is caught
  by the proposed `rules.tasks` evidence-producibility string.
- **R-13** (a contradicting rationale left in place beside its replacement) is
  caught by the search-for-survivors step.
- **R-01** (the governing living specification never cited) is caught by the
  bidirectional consumer-to-coverage map, which forces naming the owning
  requirement for each affected consumer.

---

## What I would explicitly **not** add

Recording these so a later reader does not re-derive them:

- **No new schema, JSON property, correction budget, or review-result state**
  for the manual trial. The manifest's own restraint here is correct and the
  reason is already stated in it. My one exception is scoped to autonomous runs
  and appears as ADD-4.
- **No new validator, parser, or automated consistency checker.** Every
  addition below is guidance text. The repository's manual-first and proportion
  ground rules apply, and none of D1, D2, or D3 has yet been observed in the
  three independent runs the observation ledger requires before automation
  review opens.
- **No addition for causes 2, 5, and 6.** They are covered as well as prose can
  cover them. Adding more text would dilute what is already there.
- **No change to the finding-lifecycle guidance for manual runs.** The
  reviewer-visible durable disposition record is sufficient when a human reads
  it.

---

## ADD-1 — Bind and verify the base before producing findings

**Closes D1.** This is the highest-value addition. It converts the target
document's central assumption into a checked precondition.

The authority table already declares that delivered source state is owned by
Git and merged pull-request evidence. That makes it a **tiebreaker** used when
two claims conflict. It needs to also be a **gate** applied before any claim is
made, because a stale base does not present as a conflict — it presents as a
confident, wrong, unanimous answer.

### ADD-1a — new section in `skills/base/_shared/review-readiness.md`

Insert before `## Consumer-to-coverage mapping`:

```markdown
## Base binding

Bind every planning, implementation, and review action to one stated base
identity, and confirm that identity against the declared authority for
delivered source state before producing findings or readiness. If the working
base does not match that authority, the correct output is a paused result
naming the refresh action, not a findings list.

A stale base does not present as a contradiction. It presents as a consistent
and confident wrong answer, and it produces an unbounded series of
unrelated-looking symptoms rather than one finding.

Absence in the current working copy is evidence about the working copy, not
about the delivered branch. Never derive delivered state, completion, or the
existence of an artifact from the working copy alone.
```

### ADD-1b — new bullet in the `AGENTS.md` and `CLAUDE.md` block

Insert as the first bullet of `## Review readiness`, before the `**Planners:**`
bullet:

```markdown
- **All roles:** State the base identity you are working from and confirm it
  against the declared authority for delivered source state before producing
  findings or readiness. Absence in the current working copy is not evidence
  of absence on the delivered branch.
```

### ADD-1c — sentence in `docs/sdd-workflow.md`

Append immediately after the fact-authority table in `### Source
contradictions`:

```markdown
Confirm the base identity before applying this table. A working copy behind the
delivered branch appears to disagree with every authority in it, and resolving
those apparent conflicts one at a time is the most common cause of a review
loop that does not converge.
```

---

## ADD-2 — Give shared coordination records an owner outside the change

**Closes D2.** Three concurrent sessions edit one campaign roadmap. The
per-change review keeps re-finding drift the change does not own and cannot fix
alone, and the file differs at every pass.

### ADD-2a — new row in the fact-authority table

Add to the table in `docs/sdd-workflow.md` `### Source contradictions`:

```markdown
| Cross-change coordination record | The program or campaign record's owner, not the selected change |
```

### ADD-2b — paragraph in the shared contract's `## Contradiction handling`

Append:

```markdown
A record shared by concurrently active changes is not owned by the change under
review. Report a shared-record contradiction once, name its owner, and do not
re-open it in a later pass of the same change. A shared record that other
sessions edit between passes will otherwise generate new findings indefinitely,
and none of them will be actionable by this change.
```

### ADD-2c — reframe the target document's own scoping assumption

This is the single most important edit in this delta. Replace lines 73 to 76 of
the target document:

> ### Root causes after removing stale and parallel-state effects
>
> Assuming the base is current and parallel changes share neither files nor
> dependencies, seven causes remain:

with:

```markdown
### Root causes after verifying base and parallel-state preconditions

Stale base and shared parallel state are not simplifying assumptions. They are
the two unbounded divergence mechanisms, and they are the reason a review loop
runs past three passes: each additional pass surfaces a new symptom rather than
residue from the last one. Treat them as preconditions to verify, covered by
base binding and by cross-change record ownership, not as conditions to assume.

With both preconditions verified, seven further causes remain:
```

---

## ADD-3 — A stop rule for divergence, not just a convergence measure

The manifest says convergence is measured "by closure of prior material
findings, highest remaining severity, and unresolved human decisions — not by
raw finding count." That is a good **measure** and it has no **stop rule**. On
this run the measure would have read correctly at every pass and the loop would
still have continued, because nothing said what to do when the count is flat
for a structural reason.

This is the loop-level analogue of the repository's existing "second repair
means design review" rule, and it belongs in the same idiom.

### ADD-3a — paragraph in `docs/sdd-workflow.md` `### Reviewer method`

Append after the convergence sentence:

```markdown
Distinguish residue from divergence. Residue is a finding the previous pass
could have produced and did not close. Divergence is a material finding the
previous binding could not have produced at all, which means an input changed
underneath the loop — most often the base, or a record shared with a
concurrently active change. On divergence, stop and identify the changed input
before authorizing another correction and review cycle. Repeated divergence in
the same review returns to design review, as a second repair to the same
component does.
```

### ADD-3b — condensed form in the shared contract `## Review method`

Append:

```markdown
Separate residue from divergence across passes. A material finding the prior
binding could not have produced indicates a changed input, not an incomplete
repair; identify the changed input before another cycle rather than correcting
the new symptom.
```

---

## ADD-4 — Mark the terminal disposition as a blocking autonomous prerequisite

The manifest correctly defers all schema work: *"Do not add new JSON properties
until the existing validator contract is deliberately versioned; record the
information in existing scope, gap, correction, and evidence fields during the
manual trial."*

That is right for a manual run, where a human reads the durable record. It is
not sufficient for an autonomous fix and review loop, and the deferral should
say so, or the constraint will be rediscovered when the loop is built.

Two low findings on this run were carried unchanged through all three passes
with no action and no recorded decision. In a manual run that is noise. In an
autonomous loop it is non-termination: the fixer cannot distinguish an accepted
finding from an unaddressed one, so it re-reports and re-attempts both forever.

### ADD-4a — sentence appended to the deferral paragraph

Append to the paragraph beginning "This result-shape sentence is descriptive in
the first manual change":

```markdown
Record the machine-readable terminal disposition as a blocking prerequisite for
any autonomous fix and review loop, not merely a deferred improvement. A manual
reviewer can read an accepted or waived decision from a prose record; an
autonomous loop cannot, so without a validated terminal state for accepted,
waived, and rejected findings it re-reports and re-attempts closed findings
every iteration and does not terminate.
```

---

## Expected effect on this run

| Scenario | Passes | Why |
| --- | --- | --- |
| Actual | 3 | D1, D2, and D3 all active |
| Manifest as written | 2 (estimated) | D3 closed; D1 and D2 findings still appear but most are caught at planning |
| Manifest plus ADD-1 through ADD-3 | 2, with a floor | Pass 1 pauses on the stale base instead of reporting symptoms; the roadmap leaves the change's finding set; a fourth pass cannot start silently |

The additions do not reduce the pass count below what the manifest already
achieves. They remove the two mechanisms that could have taken it above three,
and they make a non-converging loop stop and say so instead of continuing.

---

## Confidence and limits

- **Verified:** every manifest quotation above was read from the target
  document at the line ranges cited. Every claim about candidate 5's findings
  traces to the three-pass review note and OBS-009.
- **Estimated, not verified:** the "2 passes" figure. It is a reviewer's
  judgment about a counterfactual run, not a measurement. Treat it as a
  hypothesis the next candidate can test.
- **Single-session scope:** this delta reflects one reviewer session on one
  candidate. Candidates 7 and 8 appear in the target document's source-reported
  claims table with different immediate patterns; their sessions should be
  asked whether D1 and D2 also dominated their loops before either addition is
  treated as generally justified. The stale-base condition has two independent
  occurrences so far, which is below the observation ledger's three-run
  threshold.
- **Not assessed:** whether any of this survives contact with the sealed
  independent reviewer, which sees only the package and not repository
  guidance. ADD-1 and ADD-2 concern facts outside a sealed package, so they may
  need to reach the reviewer through package contents rather than prompt text.
  That question is open and I did not resolve it.
