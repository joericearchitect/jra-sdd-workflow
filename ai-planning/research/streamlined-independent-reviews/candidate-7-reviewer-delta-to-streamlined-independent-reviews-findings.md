# Proposed delta to `streamlined-independent-reviews-findings.md` — candidate 7, reviewer role

- **Author role:** reviewer (local `base-code-review`, read-only, advisory, no
  edits to the change under review).
- **Session label:** candidate 7 / `resolve-pr-validation-signal`.
- **Target document:** `streamlined-independent-reviews-findings.md` in this
  directory, principally its `## Proposed file-by-file implementation manifest`.
- **Source evidence:** OBS-011 in `ai-planning/plans/dogfood-observations.md`,
  and `ai-planning/scratch/2026-09-07-candidate-7-code-review.md` rounds 1–3.
- **Date:** 2026-09-08.

This document proposes text to add to or change in the target document. It
authorizes nothing. It does not create an OpenSpec change, approve the target
manifest, or approve any validator, controller, or automation. It records one
reviewer session's evidence and the deltas that evidence supports.

It speaks only for the candidate 7 reviewer session. Two concurrent sessions
(candidates 5 and 8) recorded their own observations as OBS-009 and OBS-010;
where a pattern reproduces across those entries this document says so, and where
it does not, it does not generalize.

## First, the direct answer

**This run did not loop excessively.** Taking "excessive" as more than three
passes, candidate 7 ran exactly three: 5 findings, then 5, then 3, with
change-owned findings converging 4, then 4, then 1, and every accepted
correction closing what it was meant to close. Nothing in the target document
needs to change in order to prevent what actually happened here.

The honest counterfactual is smaller and already recorded in OBS-011: the
manifest as written would likely have made this a two-pass run rather than a
three-pass one, mostly through the consumer-to-coverage map and the fact
authority table. That is a worthwhile improvement and it is not the question
asked here.

So the useful contribution from this run is not "here is what would have stopped
my excessive loop." It is the following, which the run is direct evidence for:

> **The target manifest contains three mechanisms that multiply passes, and no
> mechanism that stops them. Applied literally to this run, it mandates the three
> passes that occurred, and it supplies no rule that would have prevented a
> fourth or fifth.**

Every delta below is aimed at that: not at catching more defects, but at
bounding how many passes a given set of defects can cost. Deltas 5 through 8 are
prevention items that also remove passes; they are secondary and are marked as
such.

## Why the manifest is loop-amplifying as written

Three specific mechanisms, each traced to this run.

**1. The mandatory fresh-review rule multiplies passes and has no ceiling.** The
manifest states, in both the `AGENTS.md`/`CLAUDE.md` block and the
`docs/sdd-workflow.md` reviewer method, that "a contract-changing or
scope-widening correction requires a fresh whole-change review." In this run the
round 1 correction was scope-widening — it widened the change from two validators
to the entire changed-path pathway including a CI workflow — so a fresh whole
review is mandated, producing round 2. The round 2 correction rewrote a design
decision and the workflow approach, which is contract-changing, so another fresh
whole review is mandated, producing round 3. If either round 3 correction is
classified the same way, round 4 is mandated, and so on.

The rule is correct in intent and OBS-010 pattern 3 independently establishes
that diff-scoped review after a scope-widening fix is unsafe. But as written it
is unbounded: each accepted scope or contract finding costs one full pass, and
nothing caps the total. A run that accepts four such findings serially spends
four passes by rule, not by failure.

**2. The convergence metric is not ownership-aware and would not have terminated
this run.** The manifest's reviewer method says to "measure convergence by
closure of prior material findings, highest remaining severity, and unresolved
human decisions—not by raw finding count." This run's maximum severity was
`high` at all three passes. Under that metric the loop does not converge.

Yet the change itself converged cleanly. Change-owned findings went 4, 4, 1. The
severity was pinned high by a different finding each pass, and after pass 1 the
high finding was never something this change could fix on its own: pass 2's was
created by pass 1's own correction, and pass 3's was a regression in a shared
campaign record edited by three concurrent sessions. A metric that cannot
distinguish "this change is not ready" from "the environment around this change
is not ready" will spin indefinitely on work the loop is not permitted to do.
This is the single strongest loop-amplifier in the manifest, and this run is
direct evidence.

**3. The one circuit breaker present is undefined for the work where these loops
happen.** The manifest carries "a second repair to the same component returns to
design review" in three places. That is the right shape, and it is the only
stopping rule in the document. But "component" is never defined. In this run,
`design.md` decision 3 was repaired twice — round 2 introduced a shell step,
round 3 replaced it with the retained Node write. Under a reading where component
means a source module, the breaker never fires, because all three concurrent
sessions were pre-Apply with no source modified at all. Under a reading where it
includes a named decision or section of a planning artifact, it fires at round 3
and ends the loop by escalation rather than iteration — which is the correct
outcome.

The ambiguity matters precisely because planning-artifact work is where these
loops are being observed. All three concurrent sessions this campaign ran three
passes, all pre-Apply, none with a line of source changed.

## Proposed deltas

Ordered by expected effect on pass count. Each names where it goes in the target
document, the evidence it rests on, and what it is expected to do to the loop.

### D1 — Scope convergence and the stopping rule to the change's mutation boundary

**Where:** `docs/sdd-workflow.md` reviewer method, replacing the convergence
sentence; and the `AGENTS.md`/`CLAUDE.md` finding-lifecycle bullet.

**Evidence:** this run, max severity `high`/`high`/`high` while change-owned
findings ran 4/1 and 4/1. OBS-009 pattern 3 (shared-record findings do not
converge under a per-change loop) — second independent occurrence with this run.

**Proposed text, replacing the existing convergence sentence:**

```markdown
Classify every finding as change-owned or external before measuring convergence.
A finding is change-owned when the change's own mutation boundary contains its
subject; otherwise it is external and belongs to another owner.

Measure convergence over change-owned findings only: closure of prior
change-owned findings, highest remaining change-owned severity, and unresolved
human decisions inside the change. Report external findings once, name their
owner, and do not re-report an unchanged external finding in a later pass. An
external finding never blocks the change's own convergence, and a review loop
never attempts to resolve one.
```

**Expected effect:** this run terminates after pass 2 on the change-owned
measure instead of running indefinitely on the global one. It also stops the
shared campaign roadmap being re-reviewed by three sessions at once, which
produced four findings across two of them.

### D2 — A pass budget, and a defined circuit breaker

**Where:** `docs/sdd-workflow.md` reviewer method, appended after the
second-repair sentence; and the adoption sequence, which currently records pass
counts but sets no limit on them.

**Evidence:** three concurrent sessions each ran exactly three passes with no
rule that would have stopped a fourth. This run repaired `design.md` decision 3
twice without the existing breaker firing, because "component" is undefined for
planning artifacts.

**Proposed text:**

```markdown
For this purpose a component is the smallest independently reviewable unit that
carries the repaired claim: a source module, a named design decision, a task
section, a specification requirement, or a tracking record. A second repair to
the same component returns to design review whether or not any source file
changed.

Bound the loop explicitly. Three review passes over one change is the budget.
On reaching it, stop and return the change to design review with the current
findings and their dispositions, rather than opening a fourth pass. Exhausting
the budget is a reportable outcome, not a failure, and the recorded reason is
part of the handoff.
```

**Expected effect:** converts an unbounded loop into a bounded one with a
defined exit. Pairs with D1, since a budget over a metric that cannot converge
would merely relabel the problem.

### D3 — Make the mandatory fresh review proportional to the enumerated fan-out

**Where:** `docs/sdd-workflow.md` implementer handoff and reviewer method, and
the `openspec/config.yaml` `operations.apply.guidance` addition, all of which
currently say a scope-widening correction requires a fresh whole-change review.

**Evidence:** this run's rounds 2 and 3 were both mandated by that rule. OBS-010
pattern 3 establishes the rule must not be weakened to diff-scoped review. The
manifest already requires, in its `rules.design` addition, that the author
"enumerate every artifact surface that restates scope or contract behavior so a
later correction can update the complete fan-out" — that enumeration is exactly
the correct review scope, and the manifest does not connect the two.

**Proposed text, replacing the unconditional phrasing:**

```markdown
A contract-changing or scope-widening correction invalidates the prior review of
every artifact surface on the change's enumerated scope fan-out, and of any
surface the correction touched. Re-review that set as one contract. This is not
a diff-scoped review, and it is not an unconditional re-read of unrelated
artifacts; the fan-out list produced during design is the review scope.
```

**Expected effect:** preserves the safety property OBS-010 established while
removing the per-correction full-pass cost. A change with a well-enumerated
fan-out pays a small re-review; a change without one pays a full pass, which is
the correct incentive.

### D4 — A correction class for "introduces a new mechanism"

**Where:** `docs/sdd-workflow.md` implementer handoff, extending the
local / contract-changing / scope-widening classification; and the matching
`operations.apply.guidance` addition.

**Evidence:** this run's round 2 high finding. Round 1 asked for *more removal*
and the accepted fix supplied a *new mechanism* — pull-request body text routed
through a shell instead of Node, on a workflow that triggers on `pull_request`,
so the text is attacker-controlled for fork pull requests. The existing three
classes all describe how much of the contract moved; none describes a fix that
adds a step, dependency, privilege, or data path that did not previously exist,
so none of them would have flagged it.

**Proposed text:**

```markdown
Independently of that classification, mark a correction that introduces a
mechanism the change did not previously contain: a new step, dependency,
privilege, credential, network call, data path, or execution context. A
mechanism-introducing correction receives the same untrusted-input, least-
privilege, secret-handling, and destructive-action scrutiny a new design
decision receives, scoped to the introduced mechanism. It does not by itself
require a whole-change review.
```

**Expected effect:** targets the review at the risky part rather than buying a
full pass, so it reduces cost relative to D3's rule while catching the class of
defect that cost this run its second pass. Note this is deliberately framed to
be loop-reducing: a full fresh review here would add passes, not remove them.

### D5 — Base freshness as a precondition, not a finding *(prevention)*

**Where:** `docs/sdd-workflow.md`, a new short subsection before the reviewer
method; and the reviewer bullet in `AGENTS.md`/`CLAUDE.md`.

**Evidence:** OBS-009 pattern 1, where one stale base produced three
different-looking findings across three passes. This run's pass 3 high finding
has the same root cause. The manifest's fact authority table resolves conflicts
once they surface but nothing asserts freshness before review begins.

**Proposed text:**

```markdown
### Review preconditions

Before producing findings, assert that the reviewed base matches the current
default branch of the authority of record, and that the reviewer can query that
authority read-only. If the base is behind, the review's only output is the
refresh instruction and the observed divergence; do not produce a findings list
from a stale base. If the authority cannot be queried, say so as an evidence
gap and do not report any status, delivery, or existence claim as a defect.
```

**Expected effect:** short-circuits an entire pass whenever it fires. In this
run it converts pass 3's high finding into a precondition failure raised at pass
1. The second sentence is not theoretical: the concurrent candidate 8 session
recorded in OBS-010 that `gh` failed TLS verification at every pass, so that
reviewer could not consult the authority the table names, while this session
could and produced its most valuable finding by doing so.

### D6 — Append-only protection for delivery evidence *(prevention)*

**Where:** `docs/sdd-workflow.md` source-contradictions subsection, after the
authority table.

**Evidence:** this run's pass 3 high finding. A shared campaign record's merged
pull-request links and archive reference — present at pass 1 — were deleted and
replaced with a status derived from a stale local checkout, and every check
passed in that state. Half the stated justification was the absence of a
machine-local cleanup receipt, which is absent from every checkout for every
candidate by design and can never distinguish complete from incomplete.

**Proposed text:**

```markdown
Delivery evidence — merged pull-request references, archive paths, and closed
issue links — is append-only in shared records. Correct it by adding a dated
correction that cites the authority, never by deleting the prior reference.
Downgrading a recorded delivery status requires evidence from that fact's
authority; the absence of a fact from the current working copy is not evidence,
and neither is the absence of a machine-local record, which is absent from every
checkout by construction.
```

**Expected effect:** removes this run's pass 3 high finding entirely. Beyond
loop count, this is the highest-severity item this session found: it is the
mechanism by which a loop that cannot mutate its environment mutates the record
instead, destroying evidence while every check stays green.

### D7 — Record that the manifest's own validator precondition has now fired *(prevention)*

**Where:** adoption sequence step 6, which currently reads "Consider a small
validator only after the same deterministic omission is repeatedly observed and
its documented correction path is known."

**Evidence:** three independent occurrences across three candidates in one
campaign — OBS-009 pattern 5, OBS-010 patterns 2 and 5, OBS-011 pattern 6. In
this run alone, four findings were deterministic two-document comparisons: a
duplicated task section number, a tracking file omitting a path its own design
names, a proposal describing tests that do not exist, and a shared record
contradicting the default branch. None needs judgment; none of the six checks
that pass at every gate compares two documents.

**Proposed change:** no new rule. Add a note to step 6 recording that the stated
precondition has been met by those observations, so that a design review of a
small cross-document checker is now in scope rather than deferred. The manifest
is otherwise entirely guidance, and every finding it catches, it catches by
asking a model to read more carefully.

**Expected effect:** loop-reducing rather than defect-catching. Deterministic
findings removed before a model is invoked cannot generate a pass.

### D8 — Refusal premises carry evidence *(prevention, small)*

**Where:** the `AGENTS.md`/`CLAUDE.md` finding-lifecycle bullet.

**Evidence:** this run's round 2. A recommendation to delete a stale directory
was declined on the stated grounds that it was unrecoverable user work. That is
a factual claim and it was checkable in about twenty seconds: three of its four
files were byte-identical to the archived copy on the default branch, and the
fourth differed only by having fewer boxes ticked. The mitigation discussion ran
an extra round on a false premise.

**Proposed text, appended to the finding-lifecycle bullet:**

```markdown
A refusal or blocking premise is a claim and carries the same evidence
obligation as a finding. State the evidence, or label the premise unverified.
```

**Expected effect:** small. Included because OBS-009 pattern 6 and OBS-010
pattern 6 already establish that unverified claims cost passes in the reviewer
direction; this is the third occurrence of that family and the first in the
safety direction.

## What the target document already gets right

Recorded so a later design review does not change these while acting on the
above.

- The **fact authority table** is the most on-target element in the manifest for
  this run. Applied at pass 1 it does not merely catch the pass 3 high finding,
  it prevents the edit being written. D5 and D6 extend it; they do not replace
  it.
- The **bidirectional consumer-to-coverage map**, with the proposal rule "do not
  scope the change only to the initially requested symbol or file", is close to a
  verbatim description of this run's pass 1 high finding.
- **Persisting non-fix dispositions with their reasons**, and forbidding reopening
  a disposition without new evidence, is a real answer to the OBS-009 pattern 4
  gap — it supplies the accept-and-stop-reporting outcome that entry found
  missing.
- **Binding a review to one exact commit or content digest with a complete path
  manifest** would have made this run's "tests were revised" ambiguity impossible
  to state; the summary read as though code had changed when the revision was
  planned text.
- **Findings as problems and constraints rather than mandatory patches** is now
  confirmed by three independent sessions as the thing that lets an implementer
  produce a better fix than the reviewer proposed. This run's round 3 correction
  chose the safer mechanism precisely because the finding left the choice open.

## Summary of what this run does and does not support

- It does **not** support a claim that the target manifest failed to prevent
  excessive looping here, because this run was not excessive.
- It **does** support D1, D2, and D3 directly: the manifest mandates the passes
  this run spent, measures convergence in a way this run would defeat, and
  offers one circuit breaker that is undefined for the artifact class where all
  three concurrent sessions are looping.
- It **does** support D4 and D6 from single high-severity findings in this run.
- D5, D7, and D8 rest on patterns reproduced across OBS-009, OBS-010, and this
  entry, and are correspondingly better evidenced than the single-run items.
- Nothing here is a proposal to build a controller, a runner, or an automated
  fix loop. Deltas D1 through D4 exist so that when such a loop is eventually
  designed, it has a defined stopping condition, which the target document does
  not currently supply.
