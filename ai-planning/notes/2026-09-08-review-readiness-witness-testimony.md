# Witness testimony on a four-pass manual review loop

**Date:** 2026-09-08
**Subject change:** `establish-streamlined-review-readiness`
**Status:** Design input received before pass 1. This is **not** a review pass of
this change, and it is **not** an independent review.

## What this record is

A separate planning session ran a manual review loop of four reviewer passes on
an unrelated infrastructure change. That session read this change's planning
artifacts at an earlier snapshot, reported observations, and was then asked a
set of witness questions about its own loop. This file preserves its answers,
because that session's only record was its transcript and the answers are now
the primary evidence behind several requirements here.

Three properties of the source bound how much weight it carries:

- It is **self-reported**. The session reconstructed most values from reported
  findings rather than from a finding record. It had no finding IDs, no
  severities, and no coverage declarations.
- It is **an interested party**. Where it judges its own work correct, that
  judgment is weaker than its factual counts.
- It is **not adversarial review**. The session was not asked to attack this
  change, and its observations arrived as feedback rather than as findings
  bound to a stated identity.

The testimony is nevertheless treated as strong evidence on the points below,
because the session retracted its own headline conclusion, corrected its own
arithmetic against itself, and identified a rule it had proposed that its own
run would have broken. Self-damaging testimony is the part to trust.

## Corrections the witness made to its own report

- Its first provenance figure, "11 latent, 9 repair-induced, 1 external-state,
  1 reviewer-error", summed to 22 against 21 findings. Corrected to 10 latent,
  9 repair-induced, 1 external-state, and 1 finding that does not take a single
  value.
- Its headline conclusion, "four passes was excessive", was withdrawn. Under its
  own evidence the run was arguably two passes against one design and two
  against a replacement design, so the third-pass threshold may never have
  triggered. It reclassified the run as a correction-discipline failure rather
  than a convergence failure.

## The findings

### Provenance distribution

21 findings after the first pass: 6 in pass 2, 15 in pass 3. Ten latent, nine
repair-induced, one external-state, and one split finding whose actionable core
was latent while its framing was reviewer-error. Zero carried: every finding was
resolved or explicitly disputed in the round that raised it.

The split finding is itself evidence against a one-value-per-finding rule.

### Coverage at the escalation threshold

At the start of pass 3, three default classes had never been touched — task
sequencing and safe intermediate states, external-state validity, and
first-run/empty/absent/already-complete boundaries. One was partially touched
and two were touched but incomplete: evidence producibility, and consumer
coverage, which had been swept forward but never in reverse.

Completing those classes at that point would have produced an estimated nine or
ten further findings, **all latent**.

The witness flagged the limit of this answer: it can see reported findings but
not what a pass actually swept, and a class with no findings is
indistinguishable from a class never examined. That indistinguishability is the
argument for requiring a declaration.

### Clustering of repair-induced findings

Nine repair-induced findings trace to **two** underlying facts. Seven of them
trace to a single design decision whose restatements were not swept — the fact
appeared in four files and six separate lines, was corrected in two tool calls
understood at the time as one repair, and produced findings across the next two
passes. The other two trace to a single attribution fix, the second being a
repair of a repair.

### Component boundary

Three amendments to one inventory table were three distinct defect classes
against mostly different rows, not one fact restated. The witness concluded that
no surface-based unit works: keyed to the table, a second-repair stop fires
after round two and blocks work it judged correct; keyed to the row, the stop
never fires at all, because no row was edited twice for the same reason. What
recurred was a defect class against a surface, not a location.

### Pass counting

Four reviewer submissions counted as four passes. Roughly eight strict
validation runs, four verification greps, and three explanation exchanges
correctly counted as none. Two **implementer-initiated sweeps** produced at
least seven real findings that entered no record and received no provenance,
which means the latent count above is understated by at least that many.

### Taxonomy completeness

External-state validity would not have been declared inapplicable in good faith.
The artifacts carried two budget figures, an hourly price, an instance type, an
account identifier, a zone identifier, and a naming rule that existed only
because a permission pattern constrained it. The class was applicable, obviously
applicable, and simply on nobody's list.

One finding fits none of the seven default classes: a requirement attributed to
a governing document that does not contain it. It is not a repeated claim, so
the restatement class does not reach it, and it is not a threshold, quota,
capacity, version constraint, name, or permission, so the external-state class
does not naturally reach it either.

### Packet state

At the natural adoption point, the change had four artifacts, repeated strict
validation results, a verification evidence file, and live query output. It had
**no bound identity at all** — the change was uncommitted for all four passes,
so every pass reviewed a moving working tree. Under this change's requirement 1,
none of the four would have qualified as a review pass.

### Disconfirming answers

Of the six additions the witness had proposed, it judged that two would not have
changed its run's outcome: stating what was not checked, and a loop budget with
escalation. It described the loop budget as "plausibly negative" and noted that
it would have deadlocked on a missing mixed-cause branch — a rule its own run
would have broken.

It also identified four things none of its six proposals addressed: the absence
of a bound identity; implementer-found findings never entering the record; no
independent artifact standing between a correction and the next review; and a
mid-loop owner decision that was never marked as creating a new binding.

## What this change adopted

| Evidence | Adopted as |
| --- | --- |
| A finding outside all seven classes | An eighth default class for authority and citation correctness, in requirement 5 |
| Nine repair-induced findings from two facts | Diagnosis by distinct root fact rather than by finding count, in requirements 8 and 9 |
| Completing the sweep would add nine or ten latent findings | Precedence-ordered responses replacing predominance by count, in requirement 9 |
| No surface-based repair unit works | The dual trigger on surface or recurring defect class, in requirements 8 and 11 |
| Seven implementer-found findings lost | Findings enter the record regardless of who found them, in requirement 6 |
| A genuinely two-valued finding | Splitting rather than forcing one provenance value, in requirement 6 |
| Four passes over an uncommitted tree | A required digest set for uncommitted packet members, in requirement 2 |
| A mid-loop owner decision unmarked | A new owner decision marks a new binding, in requirement 1 |

Two of the witness's own proposals were **not** adopted. Its loop budget was
declined on its own disconfirming evidence. A tightening that would have
required citing evidence for a `not-applicable` declaration was declined because
its motivating case did not survive question 9: the class was not wrongly
excused, it was never on the list, and the declaration requirement already
covers that.
