# Review Loop Termination — design brief

Date: 2026-09-08

**Readiness: Explore-ready, not Propose-ready.** Section 4 records seven open
decisions, three of which change what would be built. Section 7 states what
Explore must settle. This brief does not authorize a change, a GitHub mutation,
or an edit to any product file.

**Unified view across:** six assistant sessions, five delivery runs, two
repositories' worth of proposed guidance. Contributing records are listed in
section 2.

## 1. Problem and desired outcome

Review loops in this workflow do not have a defined end. A change enters review,
receives findings, is corrected, and is reviewed again — and nothing in the
current or proposed guidance says when that cycle stops, what stops it, or what
happens next when it does. Five observed runs took three passes each; one took
four and, counted from the reviewing side, five.

The proposed research manifest in
[`streamlined-independent-reviews-findings.md`](../research/streamlined-independent-reviews/streamlined-independent-reviews-findings.md)
is a strong answer to a different question. It makes reviews *find more, earlier*
through consumer-to-coverage mapping, contradiction sweeps, fact authorities, and
correction discipline. Every contributing session agreed it would have reduced
their run. **None of it terminates a loop**, and two sessions demonstrated that
parts of it actively multiply passes: a rule mandating a fresh whole-change
review after every scope-widening correction costs one full pass per accepted
scope finding, with no ceiling.

**Desired outcome.** A review loop that (a) reaches its findings in fewer passes,
(b) has a defined stopping condition, and (c) responds to that stop differently
depending on why the loop failed to converge. All three are guidance-level and
manual. None requires a controller, a runner, or an automated fix loop, and every
contributing session independently declined to propose one.

A secondary outcome, explicitly not the first increment: the same rules are the
stopping condition any future autonomous fix-and-review loop would need. They are
worth getting right in manual runs first because an autonomous loop without a
terminal disposition does not terminate at all.

## 2. Evidence and key findings

### Contributing records

| Record | Run | Role | Passes | Findings |
| --- | --- | --- | --- | --- |
| [Candidate 5 reviewer delta](../research/streamlined-independent-reviews/streamlined-independent-reviews-findings-delta-reviewer-candidate-5.md) | `add-docs-issue-template` | reviewer | 3 | 7, 5, 6 |
| [Candidate 7 reviewer delta](../research/streamlined-independent-reviews/candidate-7-reviewer-delta-to-streamlined-independent-reviews-findings.md) and [loop-prevention delta](../research/streamlined-independent-reviews/candidate-7-reviewer-excessive-loop-prevention-delta.md) | `resolve-pr-validation-signal` | reviewer | 3 | 5, 5, 3 |
| [Candidate 8 reviewer delta](../research/streamlined-independent-reviews/candidate-8-reviewer-delta-to-findings.md) | `add-tracking-schema-examples` | reviewer | 3 | 6, 6, 5 |
| [Candidate 8 implementer delta](../research/streamlined-independent-reviews/candidate-8-planning-artifact-implementer-review-loop-prevention-delta.md) | same change | implementer | 3 | — |
| Feedback section entries 1 and 2 | `home-roots` / `m1-2-phase-a-delivery` | reviewer; planner and implementer | 5; 4 | 36; 27 |
| [`OBS-009`](../plans/dogfood-observations.md), `OBS-010`, `OBS-011` | candidates 5, 8, 7 | — | — | — |

### Finding 1 — There are two distinct failure modes, and they need opposite responses

This is the load-bearing finding of the whole evidence set, and it emerged only
because two sessions measured the same thing and got opposite answers.

- **Candidate 8** measured that **11 of 11** findings raised after pass 1 were
  created or left behind by a correction. Not one came from deeper reading.
  *Correction discipline* was the failure.
- **`home-roots`** measured that **9 of 10** findings labelled new at their third
  pass were latent in version one and had survived two prior whole-contract
  reviews. Their passes swept a *different defect class* each time — coverage,
  then staleness, then sequencing and external state. *Review coverage* was the
  failure.

The remedies are not interchangeable, and applying the wrong one is harmful.
Returning a `home-roots`-style artifact to design review to be rewritten would
have discarded a sound artifact because the review had been narrow. Completing a
sweep on a candidate-8-style artifact would have left the fan-out inconsistencies
in place.

**Four of the six sessions proposed the same undifferentiated stop rule** —
"third pass returns to design review" — and only the `home-roots` reviewer
identified that it is wrong for its own run's cause.

### Finding 2 — The manifest's convergence metric cannot terminate

Candidate 7 provides the cleanest evidence. Their maximum severity read `high` at
all three passes, so under the manifest's stated metric the loop never converges.
Yet the change itself converged cleanly: change-owned findings ran 4, 4, 1. The
severity was pinned by a different finding each pass, and after pass 1 the high
finding was never something that change could fix — pass 2's was created by pass
1's own correction, pass 3's was a regression in a campaign record edited by three
concurrent sessions.

A metric that cannot distinguish *this change is not ready* from *the environment
around this change is not ready* will spin on work the loop is not permitted to
do. Candidate 5 and `OBS-009` reproduce this independently.

### Finding 3 — The one circuit breaker present is undefined for the work where loops occur

"A second repair to the same component returns to design review" is the only
stopping rule in the current guidance, and `component` is never defined. All five
campaign sessions looped **pre-Apply, with no source file modified at all**. Under
a source-module reading the breaker cannot fire in exactly the work where the
looping is being observed.

### Finding 4 — The decision input is computed after the decision is needed

Every proposed stop rule depends on knowing why a later pass produced findings.
Candidate 8 computed its 11-of-11 figure by hand after the run ended;
`home-roots` computed its 9-of-10 figure after the fourth pass, and only because
the implementing session went looking. Neither number existed when it was needed.

### Finding 5 — Two divergence mechanisms have no natural bound

Candidate 5's analysis, reproduced by candidate 7 and partly by candidate 8:

| Mechanism | Bounded? |
| --- | --- |
| Incomplete corrections leaving stale assertions | Yes — by the number of assertion sites |
| A stale working base | No — one stale base produced three different-looking findings across three passes |
| A record edited by concurrently active sessions | No — new findings appear for as long as other sessions edit it |

The research document brackets both unbounded mechanisms out by assumption. That
assumption is the difference between a run that ends at three passes and one that
does not.

### Finding 6 — A reviewer enforcing consistency can destroy delivery evidence

Two independent instances. Candidate 7 observed a shared record's merged
pull-request links and archive reference deleted and replaced with a status
derived from a stale local checkout, with every check green throughout. Candidate
8's reviewer records the same shape **caused by its own finding**: it reported a
broken archive link on the evidence of the local filesystem, could not query
GitHub at any pass because of a TLS failure, and the accepted correction
downgraded another candidate's recorded delivery status. Whether that downgrade
was correct is still unknown.

### Finding 7 — Deterministic cross-document comparisons keep appearing as model findings

Four independent occurrences are now recorded of findings that are string
equality, not judgement: a proposal naming one specification while two delta specs
exist; a tracking record omitting a path its own design names; a proposal
describing tests that do not exist; a duplicated task section number. The research
document's own adoption sequence says to consider a small validator "only after
the same deterministic omission is repeatedly observed." That precondition now
appears to be met.

## 3. Options considered and tradeoffs

**Option A — Adopt the research manifest as drafted; add nothing.**
Cheapest. Every session estimates it reduces their run by roughly one pass. It
leaves all three loop-multiplying mechanisms in place and supplies no stopping
condition, so a run that accepts four scope findings serially still spends four
passes by rule. Rejected as insufficient for the stated problem, though it
remains the correct base.

**Option B — Adopt the manifest plus a hard pass budget only.**
One rule: three passes, then stop. Simple and testable. Fails finding 1 — an
undifferentiated stop applies the wrong remedy to half the observed runs — and
fails finding 4, because without provenance the budget cannot be applied to
material findings only. Rejected as a standalone.

**Option C — Adopt the manifest plus the full synthesis: twelve additions and four
modifications across two repositories.**
Complete. Disproportionate to land at once, and it violates this repository's
"supporting machinery stays small relative to what it supports" rule. It also
front-loads items resting on single-run evidence alongside items with four-source
convergence. Rejected as a single increment; retained as the destination.

**Option D — Sequence the synthesis into increments, first increment being the
three interlocking rules that make termination decidable.** *Recommended.*
Provenance labels, a cause-split stop rule, and convergence scoped to the change's
mutation boundary are mutually dependent: the stop consumes the labels, and the
boundary defines which findings count. Together they are small, entirely guidance
text, and they directly answer the stated problem. Later increments address
coverage, correction discipline completion, preconditions, and handoff.

## 4. Open decisions and assumptions

**These are why this brief is Explore-ready rather than Propose-ready.** The first
three change what would be built.

**D-1 — What a stop rule does when it fires.** Four sessions say return to design
review. The `home-roots` reviewer says that is wrong when the pass is dominated by
latent findings, and its evidence is the strongest single-run evidence in the set.
The recommended text adopts the minority position. *A human must decide whether
one session's counter-evidence outweighs four sessions' agreement.*

**D-2 — Hard budget or reporting trigger.** Candidate 7 proposes three passes as a
budget with a defined exit. Candidate 8 proposes a declared severity floor as the
primary control with cycle count secondary. Compatible but not identical; the
choice changes behaviour on every run.

**D-3 — Has the validator precondition fired, and does acting on it violate
manual-first?** Finding 7 records four occurrences against a stated threshold of
repeated observation. Recording that the threshold fired is not the same as
authorizing a validator. *This is explicitly a human call and the brief takes no
position beyond recommending the threshold state be recorded.*

**D-4 — Can these facts reach a sealed independent reviewer?** Base freshness,
shared-record ownership, and cross-change prerequisites are facts *about* a
package rather than facts *in* it. A sealed reviewer sees only the package.
Candidate 5 raised this and explicitly did not resolve it. If the answer is no,
the handoff-packet increment is a prerequisite for the rest reaching that
reviewer, which reorders the sequence.

**D-5 — Who owns a shared coordination record.** The proposed rule requires naming
an owner outside the change for every record concurrent sessions edit. No such
owner exists today for this repository's campaign roadmap and observation ledger.
The rule cannot be adopted without naming one.

**D-6 — Repository split.** Roughly half the proposed text belongs to
`jra-sdd-workflow` (`AGENTS.md`, `CLAUDE.md`, `docs/sdd-workflow.md`,
`openspec/config.yaml`) and half to `joericearchitect-ai-skills` (the shared
contract, four skills, two adapters, and their evaluation suites). Different
ownership means separate OpenSpec changes, and the sequencing between them is
undetermined.

**D-7 — Is a measured run required before adoption?** Every session, including
every reviewer, estimates its run would have taken two passes. No session has
measured one. *Assumption made by this brief:* the guidance-only increments are
cheap and reversible enough to adopt on estimates, and the next candidate becomes
the measurement. This assumption should be stated explicitly rather than
inherited.

**Assumptions recorded.** That the eventual goal includes an autonomous
fix-and-review loop, which is why terminal disposition appears as a prerequisite
rather than a nicety. That manual-first continues to govern, so nothing here
builds executable machinery. That the observation ledger's three-independent-run
threshold governs automation review, not guidance changes.

## 5. Scope, non-goals, constraints, dependencies, and risks

### First increment — loop termination core

Three interlocking guidance additions, all in `jra-sdd-workflow` plus the shared
skill contract:

1. **Per-finding provenance.** Label every finding raised after pass 1 as
   `carried`, `repair-induced`, `latent`, `external-state`, or `reviewer-error`.
   Cost: one question per finding.
2. **A cause-split stop rule with a defined component.** A third cycle stops. The
   response branches on which label dominates. `Component` is defined to include a
   named design decision, a task section, a specification requirement, and a
   tracking record — not only a source module.
3. **Convergence measured over the change's mutation boundary.** Classify each
   finding change-owned or external; measure convergence over change-owned only;
   report external findings once with an owner and never re-report them unchanged.

### Later increments, in dependency order

- **Coverage:** a declared sweep taxonomy with mandatory non-coverage statements;
  move "passing validators prove only what they check" beside the command;
  promote the reverse direction of the bidirectional trace to its own rule.
- **Correction discipline completion:** read a correction's added lines as new
  content; scope the mandatory re-review to the enumerated fan-out rather than the
  whole change; add a mechanism-introducing correction class.
- **Preconditions and evidence integrity:** base binding and authority
  reachability as preconditions; delivery evidence append-only in shared records;
  external-state facts carry their observation; refusal premises carry evidence.
- **Handoff:** a review-ready packet as an entry condition; cross-change
  prerequisites as structured facts separate from task dependency lines.
- **Recorded, not built:** machine-readable terminal disposition as a blocking
  prerequisite for any autonomous loop; the validator threshold state.

### Non-goals

- No controller, runner, workflow engine, or automated fix loop. All six sessions
  declined this independently.
- No new JSON schema, review-result property, correction budget, or authorization
  profile during the manual trial.
- No validator built under this brief. D-3 concerns whether a *design review* of
  one is in scope.
- No change to the sealed independent-review package shape until D-4 is answered.
- No attempt to make a review produce zero findings. One substantive pass plus one
  confirming pass is the target.

### Constraints

Manual-first. No hardcoded environment values. Every gate ships with its exit —
which is itself an argument for this brief, since a stop rule with no defined next
step would violate it. Second repair means design review. Supporting machinery
stays small relative to what it supports; option C fails this and option D is
shaped by it.

### Dependencies

The first increment depends on nothing but the research manifest's base. The
handoff increment depends on D-4. The shared-record rules depend on D-5. Anything
in the skills repository depends on D-6.

### Risks

- **A stop rule set too aggressively hides real defects.** Mitigated by making the
  floor declared per change and recorded, not fixed globally, and by making the
  stop a reportable outcome rather than an approval.
- **Provenance labelling becomes ceremony.** Mitigated because exactly one
  question decides a label, and because the label has a consumer — if the stop
  rule is not adopted, the labels should not be either.
- **Guidance that is present and not executed.** `home-roots` recorded that
  several of their findings violated rules their repository already carried. The
  distinguishing property of the recommended items is that they are mechanical —
  a boolean per finding, a classification, a declared coverage list — rather than
  exhortations to be thorough.
- **Adopting on estimates.** See D-7. Every counterfactual in the evidence set is
  a judgement about a run nobody performed.

## 6. Recorded design decisions

Positions this brief takes, subject to the open decisions above.

1. **Termination is a separate concern from detection, and it is the gap.** The
   research manifest is retained in full as the detection layer; nothing here
   replaces any of it.
2. **A stop rule without provenance is not decidable**, so the two land together
   or not at all.
3. **The response to a stop branches on cause.** Adopting the minority position
   from the strongest single-run evidence, flagged as D-1.
4. **Convergence is scoped to what the change can actually change.** A review loop
   never attempts to resolve a finding outside its own mutation boundary.
5. **The two unbounded divergence mechanisms are preconditions to verify, not
   assumptions to make.** This is a direct correction to the research document's
   own framing.
6. **Nothing is built.** Every recommended item is guidance text in an existing
   file.

## 7. Recommended next step

**Explore**, scoped to the first increment and the open decisions, not Propose.

Explore should settle, in order:

1. **D-1**, because it determines the stop rule's text. Cheapest resolution: ask
   whether returning a sound artifact to design review because the review was
   narrow is acceptable. If not, the split is required.
2. **D-2**, then D-5, both of which are short judgements a human can make from
   this brief.
3. **D-6**, which determines whether the first increment is one change or two.
4. **D-3 and D-4** may be deferred past the first increment; neither blocks it.
   D-7 should be recorded as an accepted assumption or converted into a
   requirement for a measured run.

Explore should not create OpenSpec artifacts, mutate GitHub, or edit the research
document. The first increment is small enough that a single change is appropriate
once D-1, D-2, D-5, and D-6 are answered.

**One caveat this brief records against itself.** It is assembled by one of the
six contributing sessions, which reviewed one of the five runs and proposes
controls that would have caught its own misses. The load-bearing evidence for
every recommended item is convergence across independent sessions, and section 2
names the sources for each. The one item adopted against the majority — D-1 — is
flagged as such rather than presented as consensus.
