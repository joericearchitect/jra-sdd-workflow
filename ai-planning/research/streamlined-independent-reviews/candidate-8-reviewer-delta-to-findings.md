# Proposed delta to `streamlined-independent-reviews-findings.md`

**Author role: reviewer.** Not the planner and not the implementer for the change
discussed below. This document proposes changes to another document; it does not
propose or authorize any product change.

- **Source run:** candidate 8 / `add-tracking-schema-examples`, three planning
  review passes on 2026-09-07.
- **Target document:**
  [`streamlined-independent-reviews-findings.md`](streamlined-independent-reviews-findings.md),
  specifically its `## Proposed file-by-file implementation manifest`.
- **Run evidence:** `ai-planning/scratch/2026-09-07-candidate-8-code-review.md`
  (17 findings across three passes) and `OBS-010` in
  `ai-planning/plans/dogfood-observations.md` (loop analysis).
- **Question answered:** assuming "excessive" means more than three
  correction-and-review cycles, what would I add to or change in the manifest so
  a run like this one cannot reach four?

This is a research note. It authorizes nothing, and its proposed text is input to
a separately authorized Explore and Propose, not a pre-authored artifact.

## Bottom line

The existing manifest would have prevented most of my findings and would very
likely have collapsed this run from three passes to one or two. Thirteen of my
seventeen findings map to a provision already in it. I am not proposing to
replace any of that.

But the manifest cannot stop a run from reaching four passes or more, because
**it never says when the loop ends.** It gives excellent detection rules and a
correct statement that raw finding count is not a correctness gate, then leaves
the stopping decision unstated. A diligent reviewer keeps reporting low findings,
a diligent implementer keeps fixing them, each fix perturbs a document that
restates scope, and the cycle has no defined floor.

Six additions follow. One of them — the termination rule — is the one I would
insist on. The other five reduce how often the loop starts.

## First, a correction about my own run

By the stated threshold, **candidate 8 was not an excessive-loop run.** Three
passes is the boundary, not past it. Every pass closed 100% of the prior pass's
findings and maximum severity fell cleanly: medium-high, then medium, then
medium-low.

What makes it useful evidence is the shape rather than the count. All eleven
findings raised after pass 1 were created or left behind by a correction, none
by deeper reading. Extrapolating that pattern, a pass 4 would very likely have
produced two to four fresh nit-level findings from the pass-3 corrections, and a
pass 5 after that. Nothing in the current manifest stops that progression. My run
stopped at three because the reviewer chose to stop, not because a rule said to.

That distinction is the whole basis for addition 1.

## What the manifest already prevents

Recorded briefly so the additions are not mistaken for a rewrite. Mapping detail
is in the review note; the summary is:

- **Prevented at Propose:** understated consumer scope; vacuous task evidence;
  an unnamed failure path on a consumer; a test with no owner or location; a
  source file listed as affected with no stated edit; an external delivery gate
  mixed into an internal task dependency chain; roadmap-versus-filesystem
  contradiction.
- **Prevented between passes:** the three scope-restatement survivors, plus two
  contradictions between a delta requirement and the implementation it describes.
- **Convergent with my independent loop analysis, written before I read the
  manifest:** convergence measured by severity and prior-finding closure rather
  than count; probes explicitly authorized with unverified concerns demoted to
  gaps; passing checks proving only what they check; recommendations advisory
  rather than patches. Four of my six loop patterns already appear there in
  substantially the same words.

The gap is not detection. It is termination, and the executability of two rules
that are currently stated as general intentions.

## Proposed additions

### ADD-1 — State when the review loop terminates *(the one that matters)*

**Problem.** The manifest says "Use closure of prior material findings, highest
remaining severity, and unresolved human decisions as convergence evidence; raw
finding count is not a correctness gate." That is a good metric and not a
stopping rule. It never names a severity floor, never bounds the number of
whole-change review cycles, and never says what happens when the bound is
reached. In my run, eight of the eleven post-pass-1 findings were Low or Nit.
Every one triggered a correction, and every correction was capable of generating
the next pass's findings.

**Proposed text.** Append to `### Reviewer method` in `docs/sdd-workflow.md`, to
`## Review method` in `skills/base/_shared/review-readiness.md`, and to the
`## Finding lifecycle` bullet block in `AGENTS.md` and `CLAUDE.md`:

```markdown
Declare a correction floor before the first review pass. Findings below the
floor are recorded with a disposition and do not by themselves trigger another
correction-and-review cycle in the current binding; they are batched for a
single closing pass or carried to Apply. Only findings at or above the floor,
unresolved human decisions, and corrections that change contract or scope
justify a further cycle.

A third whole-change review cycle on one change is a signal, not a step. Reaching
it returns the change to planning review rather than starting a fourth, in the
same way a second repair to one component returns to design review. Record the
reason the loop did not converge; it is campaign evidence.
```

**Closes.** The excessive-loop failure mode directly. Applied to my run it would
have batched C, D, E, F, H, I, J, and K — eight of eleven post-pass-1 findings —
into one closing pass, making the run two passes with a deferred list.

**Why this shape.** It reuses the repository's existing and well-understood
"second repair returns to design review" ground rule rather than introducing a
new control. It adds no schema field, no validator, and no automation.

### ADD-2 — Route low findings to a default non-fix disposition

**Problem.** The manifest already requires persisting non-fix decisions with
reasons and forbids reopening a disposition without new evidence. That is most of
the answer, and `OBS-009` reached the same conclusion independently. What is
missing is the **default**: with no default, every finding is presumed
fix-worthy, and a reviewer who records a nit has implicitly requested an edit.

**Proposed text.** Append to `## Review method` in
`skills/base/_shared/review-readiness.md`:

```markdown
A finding below the declared correction floor defaults to an accepted or
deferred disposition with a recorded reason, not to a fix. Raising it above that
default requires stating the impact that justifies a cycle. A reviewer who
cannot state the impact records the observation and moves on.
```

**Closes.** The `OBS-009` pattern that two low findings were carried unchanged
through three passes because no disposition meant "seen, accepted, stop
reporting." Complements rather than replaces the existing disposition rule.

### ADD-3 — Name the specific cross-document equalities to check

**Problem.** `rules.design` and the contradiction-handling section instruct a
reader to "compare repeated claims" across scope, behavior, paths, dependencies,
state, evidence, result shape, rationale, and recovery. That is correct and
almost impossible to execute reliably, because it describes a category rather
than a list. My finding that the proposal named one specification while two delta
specs existed on disk survived two full correction rounds under exactly this
instruction.

Five of my seventeen findings were decidable by string comparison, not judgment.

**Proposed text.** Append to `rules.design` in `openspec/config.yaml`:

```yaml
    - "Before requesting review, confirm these exact equalities and record any mismatch: delta-spec directories present equal the capabilities named in the proposal's modified-capability list equal the specifications named in its impact statement equal the specification paths in the tracking record; source files named as affected code equal those in the tracking record equal those a task actually edits; every test or fixture path named in task evidence either exists or is created by a task in this change; every task dependency referent is a task identifier in this file; every named modified capability has a delta-spec file."
```

**Closes.** Five findings from one enumerated list: the proposal-versus-delta-spec
mismatch, the affected-code file needing no edit, the test file that existed in
no change, the external gate in a task dependency chain, and the delta
requirement contradicting the implementation shape it described.

**Explicit non-proposal.** I am **not** proposing a validator for these. The
manifest's refusal to expand schemas before the manual guidance is exercised is
correct under the manual-first and proportion rules, and I agree with it. This
addition only converts a general instruction into an enumerable one a person can
actually walk. Whether any of it later deserves mechanical enforcement is
post-trial evidence, recorded in `OBS-010` pattern 2, and not a question for this
document.

### ADD-4 — Make the scope-surface inventory durable and located

**Problem.** `rules.design` requires enumerating "every artifact surface that
restates scope or contract behavior so a later correction can update the complete
fan-out." The requirement is right and its timing is wrong. If the enumeration
happens only as design-time reasoning, it does not exist at correction time — and
correction time is the only moment it is useful. My three scope-restatement
survivors all appeared two rounds after design.

An OpenSpec change in this repository restates its own scope in roughly fifteen
places: the proposal's scope paragraph, change bullets, modified-capability list,
two impact lines, and reuse plan; the design's context, decisions, verification
strategy, recovery, and reuse plan; the task list and its dependency lines; the
tracking record's paths; the delta-spec directories on disk; and the shared
campaign row.

**Proposed text.** Amend the existing `rules.design` string to require a located
artifact:

```yaml
    - "Record the enumerated scope-restatement surfaces as a durable list in design.md so a later correction can walk it directly rather than re-deriving it. Include every artifact section, tracking field, delta-spec path, and shared record that restates scope or contract behavior."
```

And amend `operations.apply.guidance` so corrections consume it:

```yaml
      - "For a contract-changing or scope-widening correction, walk the recorded scope-restatement surface list and update or explicitly justify every entry before requesting review; do not re-derive the list from memory."
```

**Closes.** The three pass-3 survivors, and the general fan-out pattern that
produced most of this run's repetition.

### ADD-5 — Hand the correction classification to the reviewer

**Problem.** `operations.apply.guidance` requires classifying each correction as
local, contract-changing, or scope-widening. Nothing says the classification is
recorded or transmitted. In my run I had to infer that the pass-1 correction had
widened scope, and I only inferred it by noticing its downstream effects during
pass 2 — which is one pass too late to be useful.

**Proposed text.** Append to `### Implementer handoff` in `docs/sdd-workflow.md`
and to `## Implementation corrections` in
`skills/base/_shared/review-readiness.md`:

```markdown
State the classification of every correction in the handoff, together with the
surface list walked for a contract or scope change and the search performed for
surviving old claims. The reviewer uses this to select a bounded or whole-change
method and to verify the walk, rather than rediscovering the classification from
its downstream effects.
```

**Closes.** Converts a pass spent rediscovering a scope widening into a pass
verifying a declared one. This is the single change most likely to have made my
run two passes rather than three.

### ADD-6 — Constrain reviewer output on later passes

**Problem.** Nothing tells a reviewer that pass two should look different from
pass one. Absent that, a conscientious reviewer re-reads everything at full depth
every time and reports every new observation at any severity — which is exactly
what I did, and it is why my finding count stayed flat at 6, 6, 5 while severity
fell cleanly.

**Proposed text.** Append to `### Reviewer method` in `docs/sdd-workflow.md`:

```markdown
On a second or later pass, report closure status for every prior finding, new
findings at or above the correction floor, and any finding caused by the
corrections under review. Record incidental observations below the floor in a
deferred list rather than the findings list. Report convergence as prior-finding
closure and highest remaining severity; a flat or rising count with falling
severity is convergence, not stagnation.
```

**Closes.** The presentation half of the loop. In my run this would have made
pass 3 a two-line closure confirmation plus one medium-low finding, instead of a
five-finding report that invited another correction round.

## What I would not add

- **Nothing for the security finding.** One finding — that an escape character
  survives the parser's diagnostic sanitizer — came from reading code and running
  a probe. No process rule would have prompted it. That depth belongs to ordinary
  code and security review, which the workflow already owns. A review that finds
  this and little else is a successful review.
- **No new schema fields, JSON properties, correction-budget changes, or
  validator work.** The manifest's stated reasoning is sound and I am not arguing
  against it.
- **Nothing about stale working bases.** That was `OBS-009`'s cause, not this
  run's, and the manifest's exact-head binding plus "a changed review identity
  invalidates prior evidence" already addresses it.
- **No pass-count cap below three.** Two productive passes are normal and
  healthy. The proposal is a floor on what justifies a cycle, not a ceiling on
  diligence.

## Residual after all six additions

Applied to candidate 8, I estimate one substantive pass plus one short closing
pass. Findings still expected at pass 1: the diagnostic-encoding defect, and
probably the parser test-granularity gap. Both are genuine review output. The
eleven correction-induced findings would largely not exist, and those that did
would be batched below the floor.

I do not think any process change drives this to zero passes, and it should not.

## Caveats on this assessment

- **I am grading a proposal against a run whose answers I already knew.** The
  manifest's provisions are worded generally; whether a planner actually
  enumerates the importers of a shared module depends on diligence, not on the
  rule existing. What the rule reliably changes is that an omission becomes a
  citable violation at review instead of a judgment call. That is a real
  improvement and a weaker one than prevention.
- **Single run, single role.** These are one reviewer's observations from one
  candidate. `OBS-009` reports a three-pass loop on candidate 5 with a different
  root cause, which suggests the loop problem is real and that its causes vary.
  Two of my six loop patterns reproduce that session's patterns independently;
  none of these proposals should be treated as three-occurrence evidence.
- **Additions 1 and 2 change reviewer behavior, and reviewers are the ones who
  would have to accept fewer findings.** That is a genuine trade. A floor set too
  high hides real defects. The floor should be declared per change and recorded,
  not fixed globally, which is why the proposed text says "declare" rather than
  naming a level.
- **Unverified.** No proposal here has been tried. The estimate that this run
  becomes one or two passes is an inference from the finding-causation record,
  not a measurement.

---

# Synthesis of peer-session feedback — further manifest changes

Added 2026-09-08, after reading five peer contributions. **Everything above this
line is unchanged**; where my earlier position was wrong or incomplete, the
correction is recorded below as an explicit modification rather than by editing
the original.

## Sources read

| Source | Run | Role | Passes |
| --- | --- | --- | --- |
| `candidate-8-planning-artifact-implementer-review-loop-prevention-delta.md` | candidate 8 | implementer | 3 |
| `candidate-7-reviewer-delta-to-streamlined-independent-reviews-findings.md` | candidate 7 | reviewer | 3 |
| `candidate-7-reviewer-excessive-loop-prevention-delta.md` | candidate 7 | reviewer | 3 |
| `streamlined-independent-reviews-findings-delta-reviewer-candidate-5.md` | candidate 5 | reviewer | 3 |
| `## Feedback from other LLM sessions`, entry 1 | `home-roots` / `m1-2-phase-a-delivery` | reviewer | 5 |
| `## Feedback from other LLM sessions`, entry 2 | same delta | planner and implementer | 4 |

Selection rule applied: an item is included only if it is **material** (it
changes pass count or prevents a defect class, not merely wording) and
**general** (it describes a failure mode reachable in more than one kind of
change). Items specific to one domain — infrastructure inventories, GitHub label
reconciliation, this campaign's roadmap mechanics — are generalized or dropped,
and I say which.

## The single most important thing the peer set establishes

The `home-roots` pair ran four and five passes — the only genuinely excessive
runs in the set — and their diagnosis does not match mine.

I found that **11 of 11 findings after pass 1 were correction-induced**. They
found the opposite: **nine of ten "new" findings at their third pass were latent
in version one** and had survived two prior whole-contract reviews. Their passes
swept *different defect classes* each time — coverage, then staleness, then
sequencing and external state — rather than the same classes more thoroughly.

Both are real, and they need different remedies. Correction discipline, which is
what most of my ADD-1 through ADD-6 target, fixes my failure mode and addresses
only the smaller half of theirs. A declared sweep taxonomy fixes theirs and would
have done little for mine. **A manifest that only carries correction discipline
will keep producing four-pass runs of the `home-roots` kind**, and nothing in my
original delta would have caught that. S-1 and S-2 below exist because of their
evidence, not mine.

## Additions

### S-1 — A declared sweep taxonomy, with mandatory non-coverage statements *(ADD)*

**Convergence:** three sessions — `home-roots` implementer Addition A and F,
`home-roots` reviewer R1 endorsing both without modification. Highest-value item
in the whole peer set by their own estimate: 21 of 27 findings move to round one.

**Problem.** The manifest says review the whole contract. It never says *what to
sweep for*. A reviewer following it in good faith can sweep three classes of
seven on pass one and have no rule requiring it to notice or say so. The only
available convergence signal — findings trending down — is then actively
misleading, because their count *rose* from five to ten at the pass where
coverage finally improved.

**Proposed text.** Add to `### Reviewer method` in `docs/sdd-workflow.md`, the
reviewer bullet in `AGENTS.md` and `CLAUDE.md`, and `## Review method` in
`skills/base/_shared/review-readiness.md`:

```markdown
Sweep a declared taxonomy of defect classes on every pass and report each class
as swept clean, findings, or not applicable with a reason. A pass that does not
declare class coverage is not a pass. The repository declares its own class set;
absent one, use: coverage; evidence producibility; sequencing and intermediate
state; lifecycle completeness including the abort path; external-state validity;
restatement consistency; and boundary cases including first-run, empty, absent,
and already-done states.

State what was not examined. An undeclared gap is indistinguishable from a clean
sweep, and a reviewer who records "external-state validity: not swept" has
scheduled the next round rather than leaving the implementer to discover it two
rounds later.
```

**Generality.** The class list is stated as repo-declared with a default, because
the `home-roots` set is infrastructure-flavored. The mechanism — declare, sweep,
report coverage including non-coverage — is domain-independent.

**Effect on my run.** Small directly; my pass-1 sweep was already broad. It is
included because the peer evidence shows my run is the *easy* case and this is
the control for the hard one.

### S-2 — Per-finding provenance, as the input the stop rule needs *(ADD)*

**Convergence:** two sessions — candidate 7 loop-prevention item 3 (five labels),
`home-roots` reviewer's proposed latency flag (one boolean). Independently
derived, same purpose.

**Problem.** Every stop rule proposed across six sessions depends on knowing *why*
a later pass produced findings, and no session had that information at the time.
I computed my "11 of 11 correction-induced" figure by hand after the run.
`home-roots` computed their "nine of ten latent" figure after their fourth pass,
and only because the implementing session went looking. In both cases the number
that should have driven the decision arrived after the decision was needed.

**Proposed text.** Extend the existing stable-ID and disposition guidance:

```markdown
Label every finding raised after the first pass with its provenance:

| Label | Meaning |
| --- | --- |
| `carried` | The same verified problem remains unresolved. |
| `repair-induced` | A prior correction created this problem. |
| `latent` | Present in the first reviewed identity; earlier passes missed it. |
| `external-state` | Depends on a record or system outside the change's mutation boundary. |
| `reviewer-error` | A prior conclusion conflicts with the applicable authority. |

The labels are not a count target. They identify which discipline failed, and
they are the input the loop-stop rule consumes. Deciding a label costs one
question per finding: was this present in the first reviewed identity?
```

**Generality.** Applies to any iterative review. It is also the cheapest item in
this synthesis, and the one that makes S-3 decidable rather than judgemental.

### S-3 — A stop rule whose response depends on the cause *(MODIFIES my ADD-1)*

**Convergence:** all six sessions propose a stop. Every one of them, including
mine, initially proposed the *same* response to it.

**What I got wrong.** My ADD-1 said a third whole-change cycle "returns the change
to planning review." Candidate 7 D2 and `home-roots` Addition D say the same. The
`home-roots` reviewer, in R4, is the only session that disagreed, and it is
right: applied to their run, the pass dominated by latent findings would have
returned a *sound* artifact to design review to be rewritten. The artifact was
not the problem; the review had been too narrow. That is the wrong remedy applied
to the wrong party, and my formulation would have produced it.

**Proposed text**, replacing the second paragraph of my ADD-1:

```markdown
A third review cycle on one change is a stop, and the response depends on what
the pass's findings are made of.

- Dominated by `repair-induced` findings: correction discipline has failed.
  Return the change to design review rather than opening a fourth cycle.
- Dominated by `latent` findings: review coverage has failed. Do not rewrite the
  artifact. Complete the declared sweep, record that earlier passes were
  incomplete, and treat the sweep as the closing pass.
- Dominated by `external-state` findings: an input outside the change moved.
  Identify and stabilise the input before authorizing another cycle; do not
  correct the symptom inside the change.

For this purpose a component is the smallest independently reviewable unit
carrying the repaired claim: a source module, a named design decision, a task
section, a specification requirement, or a tracking record. A second repair to
the same component returns to design review whether or not any source file
changed. Exhausting the budget is a reportable outcome, not a failure.
```

**The component definition** is candidate 7 D2's, and it closes a real hole: all
five campaign sessions looped pre-Apply with no source file modified, so under a
source-module reading the existing breaker can never fire in exactly the work
where the looping is being observed.

**Effect on my run.** My pass 3 was dominated by `repair-induced` findings, so the
design-review branch fires correctly. Under my original undifferentiated
formulation `home-roots` would have been mishandled.

### S-4 — Measure convergence over the change's mutation boundary *(ADD)*

**Convergence:** four sources — candidate 7 D1, candidate 7 loop-prevention item
2, candidate 5 ADD-2, and OBS-009 pattern 3. Candidate 7 calls it the single
strongest loop-amplifier in the manifest and has direct evidence: their maximum
severity read `high` at all three passes while change-owned findings ran 4, 4, 1.
Under the manifest's stated metric that loop never converges, while the change
itself converged cleanly.

**Proposed text**, replacing the existing convergence sentence:

```markdown
Classify every finding as change-owned or external before measuring convergence.
A finding is change-owned when the change's own mutation boundary contains its
subject; otherwise it is external and belongs to another owner.

Measure convergence over change-owned findings only. Report an external finding
once, name its owner, and do not re-report it unchanged in a later pass. An
external finding never blocks the change's convergence, and a review loop never
attempts to resolve one.
```

Plus a fact-authority row and a matching handoff obligation:

```markdown
| Cross-change coordination record | The program or campaign record's owner, not the selected change |
```

```markdown
Name every mutable record shared with concurrently active changes, its fixed
review identity, and one owner outside the change. A review treats a shared
record as read-only at that identity unless the owner's bound update is
explicitly in scope.
```

**Effect on my run.** Three of my seventeen findings were on the shared campaign
roadmap. Under this rule they are reported once with an owner and leave my
change's finding set, which is the correct handling and removes them from every
later pass.

**Generality.** Any repository where more than one workstream is active against a
shared plan, ledger, or index. That is the normal condition, not the exception.

### S-5 — Review preconditions: base binding and authority reachability *(ADD — corrects a decline in my original delta)*

**Convergence:** three sources — candidate 5 ADD-1 (their highest-value item),
candidate 7 D5, OBS-009 pattern 1.

**What I got wrong.** My "What I would not add" section declined this on the
grounds that stale bases were candidate 5's problem and not mine. That was too
narrow. Candidate 7's D5 has two halves, and it cites my own OBS-010 for the
second: *`gh` failed TLS verification at every one of my three passes*, so I could
not query the authority for any GitHub fact, at any pass. I recorded that as a
caveat and kept reviewing. Under the proposed rule I would have raised it as a
precondition failure and declined to report any status, delivery, or existence
claim as a defect — which, per S-10 below, is exactly the class of claim I did
report.

**Proposed text**, as a new short subsection before the reviewer method:

```markdown
### Review preconditions

Before producing findings, assert that the reviewed base matches the current
default branch of the authority of record, and that the reviewer can query that
authority read-only. If the base is behind, the review's only output is the
refresh instruction and the observed divergence. If the authority cannot be
queried, record an evidence gap and do not report any status, delivery, or
existence claim as a defect.
```

Candidate 5's accompanying point should be adopted with it: stale base and shared
parallel state are **preconditions to verify, not simplifying assumptions**. They
are the two divergence mechanisms with no natural bound — each additional pass
surfaces a new symptom rather than residue from the last — which is precisely
what distinguishes a run that ends at three from one that does not.

### S-6 — Read the correction's added lines as new content *(ADD)*

**Convergence:** one session, but it is the `home-roots` reviewer's strongest
independent item and it is structurally distinct from everything else proposed.

**Problem.** An assertion sweep searches for a fact that *survived* where it
should have changed. It cannot, even in principle, catch text a fix *newly
created*. Three of their findings were of that kind: a duplicated clause from a
botched edit, a corrected statement inserted directly above the item it
duplicated, and a cross-reference added to a heading that does not exist.

**Proposed text**, for both the implementer handoff and the reviewer method:

```markdown
After a correction, diff the artifacts and read the added lines as new content
subject to the same review as original text. This is a separate operation from
the assertion sweep: the sweep finds facts that should have changed and did not;
the diff read finds defects the correction itself introduced.
```

**Generality.** Any text-editing correction loop. It takes a minute and it is the
complement to every fan-out control in the document, including my own ADD-4.

### S-7 — Scope the mandatory re-review to the enumerated fan-out *(ADD — completes my ADD-4)*

**Convergence:** candidate 7 D3, which connects two manifest provisions the
document leaves unconnected.

**Problem.** The manifest requires a fresh *whole-change* review after every
contract-changing or scope-widening correction, unbounded. Candidate 7 traced
both of their later passes to that rule firing, and observed that a change
accepting four such findings serially spends four passes by rule rather than by
failure. My OBS-010 pattern 3 independently established that diff-scoped review
after a widening fix is unsafe, so the rule must not simply be weakened.

The resolution is that my ADD-4 already produces the correct scope. If the
scope-restatement surface list is durable, it *is* the re-review scope.

**Proposed text**, replacing the unconditional phrasing:

```markdown
A contract-changing or scope-widening correction invalidates the prior review of
every surface on the change's enumerated scope fan-out, plus any surface the
correction touched. Re-review that set as one contract. This is not a diff-scoped
review, and not an unconditional re-read of unrelated artifacts; the fan-out list
produced during design is the review scope.
```

**Why this is the right incentive.** A change with a well-enumerated fan-out pays
a small re-review; a change without one pays a full pass.

### S-8 — A correction class for "introduces a new mechanism" *(ADD)*

**Convergence:** candidate 7 D4, from a single high-severity finding, but the
failure mode generalizes cleanly.

**Problem.** The three existing correction classes all describe *how much of the
contract moved*. None describes a fix that *adds something that was never
designed*. Candidate 7's round-1 finding asked for more removal; the accepted fix
supplied a new mechanism — pull-request body text routed through a shell on a
`pull_request`-triggered workflow, making attacker-controlled text reach a shell
for fork pull requests. No existing class flags that.

**Proposed text:**

```markdown
Independently of that classification, mark a correction that introduces a
mechanism the change did not previously contain: a new step, dependency,
privilege, credential, network call, data path, or execution context. It receives
the untrusted-input, least-privilege, secret-handling, and destructive-action
scrutiny a new design decision receives, scoped to the introduced mechanism. It
does not by itself require a whole-change review.
```

**Note it is deliberately loop-reducing:** targeted scrutiny instead of buying a
full pass. My own run has a mild instance — the pass-1 correction introduced a
cross-change dependency on candidate 7 that no prior design decision had
considered.

### S-9 — External-state facts carry their observation *(ADD, generalized)*

**Convergence:** `home-roots` implementer Addition C, endorsed by the
`home-roots` reviewer in R3 as the highest-value single control in either list.

**Problem.** A constraint written as a bare figure passes every consistency check
that exists. Their account-wide budget ceiling, carried forward from another
project, was arithmetically dead on arrival — permanently in alarm from creation,
the exact defect the phase existed to correct, inverted. It survived because no
rule required the arithmetic to appear beside the number.

**Proposed text:**

```markdown
Any threshold, limit, quota, price, capacity, version constraint, or name
constrained by an external system must record the observed value, the date
observed, the command or query that produced it, and the arithmetic or comparison
against the constraint. A figure carried from another context, or asserted
without its observation, is an evidence gap.
```

**Generality.** Stated from an infrastructure run, but the shape — a claim whose
truth depends on an unobserved external value — covers label existence, branch
protection, API version floors, rate limits, and quota headroom. Candidate 4's
label reconciliation in this campaign is the same shape.

### S-10 — Delivery evidence is append-only *(ADD — and I appear to have caused an instance of it)*

**Convergence:** candidate 7 D6, which they call the highest-severity item they
found, plus a second instance in my own run that I did not recognise at the time.

**Their evidence.** A shared campaign record's merged pull-request links and
archive reference were deleted and replaced with a status derived from a stale
local checkout, and every check passed in that state.

**My evidence, recorded against myself.** My pass-1 finding 6 reported that the
roadmap claimed candidate 4 `Done` with an archive link to a directory that does
not exist locally. The accepted correction downgraded candidate 4 from `Done` to
`In progress` and replaced the archive link with a local working path. I raised
that finding, and the evidence I raised it on was **the local filesystem** — the
absence of a directory from this checkout. I could not query GitHub at any pass.
If those pull requests did merge, the correction I prompted destroyed accurate
delivery evidence and replaced it with a status inferred from the one source
candidate 7's rule names as insufficient.

I do not know which is true, and that is the point: neither did I when I reported
it. Two independent runs now show this defect, and in one of them the reviewer
reviewing for consistency produced it.

**Proposed text:**

```markdown
Delivery evidence — merged pull-request references, archive paths, and closed
issue links — is append-only in shared records. Correct it by adding a dated
correction citing the authority, never by deleting the prior reference.
Downgrading a recorded delivery status requires evidence from that fact's
authority. Absence from the current working copy is not evidence, and neither is
absence of a machine-local record, which is absent from every checkout by
construction.
```

This pairs with S-5: had the authority-reachability precondition been in force, I
would not have been permitted to report the finding that caused the edit.

### S-11 — A review-ready packet, and cross-change prerequisites as structured facts *(ADD)*

**Convergence:** candidate 8 implementer items 1 and 3; candidate 7
loop-prevention item 2; candidate 5's open question about sealed reviewers.

**Problem, part one.** The manifest requires a consumer-to-coverage map but never
requires it to be *handed over*. My pass-1 review began without the two additional
parser consumers, their recovery behaviour, or the shared-record state visible as
one set, so discovery happened during review rather than before it.

**Problem, part two.** The manifest forbids mixing an external delivery gate into
an internal task dependency chain — the rule that catches my finding K — but never
says where the external prerequisite goes instead. A gate with no stated exit is
precisely what this repository's own ground rules forbid.

**Proposed text:**

```markdown
Hand over one bounded packet before review: the exact reviewed identity and
complete path manifest; every artifact in scope; the consumer-to-coverage map;
every shared record with its owner and fixed identity; and every cross-change
prerequisite. A packet missing a consumer, a test owner, an evidence owner, or a
fact authority is a review-readiness gap: record it and stop before producing
findings.

Record each cross-change prerequisite separately from internal task dependencies,
naming the producer change and the artifact it owns, the availability condition,
the consumer change and the exact follow-on edit or evidence it owns, and the
recovery if the producer is delayed, superseded, or changes its interface.
Reference the record from the task; do not place the external condition in the
task's dependency line.
```

**Note for the sealed reviewer.** Candidate 5 flagged, and did not resolve,
whether facts like base freshness and shared-record ownership can reach a sealed
independent reviewer that sees only the package. The packet is the natural
carrier. I have not verified that the current package shape can hold it; this is
carried forward as an open question.

### S-12 — Terminal disposition is a blocking prerequisite for any autonomous loop *(ADD — extends my ADD-2)*

**Convergence:** candidate 5 ADD-4; my own ADD-2 is the manual half of the same
problem; OBS-009 pattern 4 is the original observation.

**Problem.** The manifest correctly defers schema work for the manual trial,
where a human reads a prose disposition. An autonomous fixer cannot. Without a
validated terminal state for accepted, waived, and rejected findings, it cannot
distinguish an accepted finding from an unaddressed one, so it re-reports and
re-attempts both every iteration and does not terminate. Two low findings were
carried unchanged through all three passes of candidate 5; eight of my eleven
post-pass-1 findings were below any sensible correction floor.

**Proposed text**, appended to the existing deferral paragraph:

```markdown
Record the machine-readable terminal disposition as a blocking prerequisite for
any autonomous fix-and-review loop, not merely a deferred improvement. A manual
reviewer can read an accepted or waived decision from prose; an autonomous loop
cannot, and without a validated terminal state it does not terminate.
```

This is the item that most directly serves the eventual autonomous loop, and it
costs nothing now — it changes a deferral into a recorded prerequisite.

## Modifications to existing manifest text

Four small changes, each supported and each cheap.

**M-1 — Move "passing validators prove only what they check" beside the command.**
`home-roots` implementer modification 1. Their implementing session reported
passing strict validation after every round as though it carried consistency
information; all 27 findings survived it. I did the same thing — I opened all
three of my passes with a green gate summary. Placement beside the command block
in `AGENTS.md` and `CLAUDE.md`, not only in prose elsewhere.

**M-2 — Promote the reverse direction of the bidirectional trace to its own
rule.** `home-roots` implementer modification 2. In the drafted planner guidance
the reverse direction sits mid-bullet behind the forward one. It is mechanical,
and it is what catches an artifact created for a purpose the same change forbids.
My finding D — a source file listed as affected that needs no edit — is a
reverse-direction catch, and it took two passes to surface.

**M-3 — Record that the adoption sequence's own validator precondition has
fired.** Candidate 7 D7. Step 6 currently says to consider a small validator
"only after the same deterministic omission is repeatedly observed." Four
independent occurrences are now recorded — OBS-009 pattern 5, OBS-010 patterns 2
and 5, OBS-011 pattern 6, and candidate 7's four two-document comparison findings.
**This modifies my own ADD-3 stance:** I declined to propose a validator on
proportion grounds, and I still do not propose building one. But the document's
own stated trigger has been met, so a design review of a small cross-document
checker is now in scope rather than deferred. Recording that the threshold fired
is not the same as authorizing work, and the distinction matters because leaving
it unrecorded silently raises the bar the document itself set.

**M-4 — A refusal or blocking premise carries the same evidence obligation as a
finding.** Candidate 7 D8. Their round 2 spent an extra cycle on a refusal whose
stated factual premise was checkable in about twenty seconds and was wrong. This
is the third occurrence of the unverified-claim family — OBS-009 pattern 6 and
OBS-010 pattern 6 are the reviewer-side instances — and the first on the
implementer side. Append to the finding-lifecycle bullet: *"A refusal or blocking
premise is a claim and carries the same evidence obligation as a finding. State
the evidence, or label the premise unverified."*

## What I did not carry forward

- **Candidate 5's rewrite of the target document's root-cause preamble.** The
  substance — preconditions to verify rather than assumptions — is adopted in
  S-5. The specific line-range replacement is an edit to that document's own
  analysis and belongs to whoever owns it.
- **Campaign-specific mechanics.** The integration-owner protocol for this
  repository's roadmap, and the specific batch-gating rules, are generalized in
  S-4 to "a named owner outside the change" and otherwise dropped.
- **The infrastructure-specific class list** in S-1, which is stated as a default
  the repository may replace.
- **Regression scenarios.** Candidate 7 and candidate 8's implementer both
  propose evaluation scenarios for these rules. They are the right idea and they
  belong with whichever repository owns the eval suite, not in this synthesis.
- **Anything proposing a controller, runner, or automated fix loop.** All six
  sessions declined this independently, and so do I.

## Where the sessions disagree, unreconciled

Recorded rather than resolved, because these are the open decisions.

1. **What a stop rule should do.** Four sessions say return to design review. The
   `home-roots` reviewer says that is wrong when the pass is dominated by latent
   findings. S-3 adopts the reviewer's split, which means four sessions'
   formulation is being overridden by one session's counter-evidence. That is a
   judgement and it should be reviewed by a human.
2. **Whether a pass budget should be a hard limit or a reporting trigger.**
   Candidate 7 D2 makes three passes a budget with a defined exit. My ADD-1 makes
   the floor the primary control and the cycle count secondary. These are
   compatible but not identical, and the choice changes behaviour.
3. **Whether the validator threshold has fired.** M-3 argues yes on four recorded
   occurrences. The manual-first ground rule argues for caution. This is
   explicitly a human decision.
4. **Whether the counterfactual estimates mean anything.** Every session,
   including mine, estimates its run would have taken two passes. No session has
   measured one. The next candidate can test it; none of us has.

## Revised expected effect on my run

| Configuration | Estimated passes |
| --- | --- |
| Actual | 3 |
| Manifest as written | 1 substantive plus 1 confirming |
| Manifest plus my ADD-1 through ADD-6 | Same, with a floor preventing a fourth |
| Plus S-1 through S-12 | Same count, but S-4 removes 3 shared-record findings from my set entirely, S-5 would have blocked the finding behind S-10's instance, and S-2 makes the stop decidable rather than judgement |

The additions in this synthesis do not reduce my run's pass count below what the
manifest already achieves. They matter for the runs that went to four and five,
and they remove the mechanisms that could have taken mine past three.
