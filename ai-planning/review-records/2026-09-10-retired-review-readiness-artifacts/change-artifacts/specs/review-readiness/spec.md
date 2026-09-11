## Purpose

Defines one durable, manual review-readiness and convergence contract for a
bounded change. It states the evidence a review pass must be bound to, the
analytical coverage a pass must declare, the lifecycle of a finding, the
closure a correction must produce, and the cause-aware stop that replaces an
ordinary fourth review pass. It applies to the planning and implementation
phases through two profiles of the same contract and introduces no controller,
automated loop, or new format for the content of the artifacts it binds.

## ADDED Requirements

### Requirement: Bind a review-ready packet before a review pass

A review pass SHALL be bound to a review-ready packet whose members are named
with their identities before the pass begins. The packet has exactly ten
members:

1. the packet index at its deterministic entrypoint;
2. the base identity and the evidence that each required fact authority was
   reachable;
3. the complete artifact and changed-path manifest;
4. the mutation boundary and shared-record identities;
5. the bidirectional consumer-to-coverage map;
6. the durable assertion fan-out and decisive equality sets;
7. the applicable defect taxonomy and material correction trigger;
8. the internal task graph and separately recorded cross-change prerequisites;
9. the verification owners, producible evidence, recovery, and external-state
   observations; and
10. the prior finding dispositions, or their recorded absence, which are
    withheld from a fresh isolated reviewer.

This list is the single authority for the member set. Every other surface that
names the members SHALL quote it rather than restate it in its own order or
wording.

The packet MUST be assembled from artifacts the project already maintains, and
the workflow MUST NOT introduce a new format or schema for the content of those
artifacts. A fixed-name index that names the members and their identities is
permitted and does not constitute a new packet format. When a required member is
absent or cannot be produced, the workflow SHALL emit a readiness result naming
the missing member and MUST NOT record the attempt as a review pass. When a
required fact authority is unreachable or the base is stale, the workflow SHALL
withhold every claim that depends on that authority and MUST NOT substitute a
local working copy for delivered-state evidence.

A review pass is one evaluation of the complete bounded change against a fixed
bound identity that declares its defect-taxonomy coverage and concludes in
findings or a clean result. A retried objective check, a reconciliation of a
prior claim against an authority, an explanatory exchange, and a reading that
declares no class coverage are none of them review passes.

Every review pass SHALL record which kind of reviewer produced it. A
same-session local review is run by a worker holding the live workspace,
ordinary tools, and access to prior findings. An independent review is run by a
fresh, read-only reviewer isolated from whoever produced the change and supplied
only a sealed package. A new session, a fresh conversation, or an instruction to
be independent does not make a review independent. A same-session local review
MUST NOT satisfy a requirement for independent review, and a result that failed
isolation SHALL be rejected rather than recorded as the weaker kind.

Pass counting SHALL be per binding. When an owner decision changes the change's
intended behavior rather than correcting the change toward the behavior already
agreed, the workflow SHALL record a new binding with its own identity, restart
the pass count against it, and carry the prior findings and dispositions forward
as history. A new binding SHALL require recorded owner evidence, and a
correction MUST NOT be recorded as a new binding in order to reset the count.

#### Scenario: A complete packet binds a pass

- **WHEN** every packet member is present with its identity and the base and
  fact authorities were verified
- **THEN** the review pass proceeds against that bound content identity

#### Scenario: A missing member stops before findings

- **WHEN** the assertion fan-out or the consumer-to-coverage map is absent from
  the packet
- **THEN** the workflow reports a readiness result naming the missing member
  and records no review pass

#### Scenario: An unreachable authority withholds a claim

- **WHEN** a required fact authority cannot be read during packet assembly
- **THEN** the workflow records the authority as unavailable, withholds the
  claims that depend on it, and does not infer them from the local working copy

#### Scenario: A changed identity requires a new pass

- **WHEN** a correction changes the bound content identity after a pass
  concluded
- **THEN** the prior conclusion no longer applies and another pass is required
  against the new identity

#### Scenario: A new owner decision starts a new binding

- **WHEN** an owner introduces a decision mid-loop that changes the intended
  behavior rather than correcting the change toward the agreed behavior
- **THEN** the workflow records a new binding with its own identity, restarts
  the pass count against it, and carries the prior findings forward as history

#### Scenario: A correction does not reset the pass count

- **WHEN** an edit moves the change toward the behavior already agreed
- **THEN** it is recorded as a correction against the existing binding and the
  pass count continues rather than restarting

#### Scenario: An attempt that declares no coverage is not a pass

- **WHEN** a reader reads every bound artifact but declares no defect-taxonomy
  coverage
- **THEN** the reading is not recorded as a review pass, though any findings it
  produced are still recorded

#### Scenario: A fresh session is not an independent review

- **WHEN** a review runs in a new conversation that can still reach the live
  workspace and the prior findings
- **THEN** it is recorded as a same-session local review and does not satisfy
  any requirement for independent review, however fresh the session is

### Requirement: Publish the packet at a deterministic entrypoint

The workflow SHALL publish one review-packet index for each change at a location
deterministically derivable from the change name, so a reviewer can be directed
to the change by name alone without being told where its material lives. The
index MUST locate every other member of the packet defined above and MUST itself
name the bound identity, the reviewed contract paths, the read-only authorities
that govern the change, the mutation boundary, the evidence already produced,
and either the prior-findings location or its explicit absence.

A committed base identity alone does not bind an uncommitted member, because
that member can change while the base does not. The index SHALL therefore carry
a content digest for every reviewed member that is not committed, together with
the command that reproduces the digest set, and a pass SHALL begin only once the
recorded digests match the current content. An index MAY exclude itself from the
digest set it carries. When it does, another bound record SHALL carry the index
digest; the review record for the bound pass is that record.

The index MUST reference the standing review method by link and MUST NOT restate
it. The standing method SHALL exist in exactly one repository-owned location, so
the defect taxonomy, finding format, materiality rule, and isolation rules have
exactly one authoritative expression. A change-owned copy of the method is a
restatement defect.

An input the change contradicts MUST NOT remain listed as a conflict authority.
When a change supersedes a document its index lists as an authority, the index
SHALL record that document as superseded input and the change SHALL enumerate
every known divergence with the reason it moved, so a divergence not on that
list is itself a finding. Leaving a contradicted document listed as an authority
SHALL be a readiness failure, because a reviewer resolving a conflict against it
reaches the wrong answer with no way to detect that it did.

A readiness stop condition SHALL be satisfiable by a conforming packet. A
condition that fires against a packet meeting this specification is a defect in
the condition, not a readiness failure of the packet, and SHALL be corrected
rather than waived for the pass that discovered it.

When no index exists at the derived location, the workflow SHALL report a
readiness failure naming that location and MUST NOT begin a review pass. When
the index's recorded identity does not match the current repository state, the
workflow SHALL stop and report a stale binding rather than review the differing
content. When the review is a fresh isolated review, the prior-findings section
SHALL be withheld from the reviewer rather than relied on as a voluntary
non-reading instruction.

#### Scenario: A reviewer is directed by change name alone

- **WHEN** a reviewer is asked to review a named change and nothing else
- **THEN** the reviewer derives the index location from that name, reads it, and
  proceeds with the bindings and method it names

#### Scenario: A missing index is a readiness failure

- **WHEN** no index exists at the derived location for the named change
- **THEN** the workflow reports a readiness failure naming that location and
  begins no review pass

#### Scenario: A stale binding stops the pass

- **WHEN** the identity recorded in the index does not match the current
  repository state
- **THEN** the workflow reports the stale binding and does not review the
  differing content

#### Scenario: An uncommitted member is bound by digest

- **WHEN** a reviewed member is not committed at the bound base
- **THEN** the index records that member's content digest with the command that
  reproduces it, and the pass begins only once the recorded digest matches the
  current content

#### Scenario: An index that excludes itself is bound elsewhere

- **WHEN** the index excludes itself from the digest set it carries
- **THEN** the review record for the bound pass carries the index digest, and a
  later pass that finds the index changed against that digest reports a stale
  binding

#### Scenario: A moving working tree is not a bound identity

- **WHEN** an index names only a base commit while its reviewed members are
  uncommitted and unhashed
- **THEN** the identity is incomplete, the workflow reports a readiness failure,
  and no pass is recorded against the moving content

#### Scenario: A superseded input is demoted, not left as authority

- **WHEN** the change's own decisions contradict a document the index lists as a
  conflict authority
- **THEN** the index records that document as superseded input, the change
  enumerates every divergence and its reason, and readiness is withheld while
  both are presented as authoritative

#### Scenario: A stop condition that fires on a conforming packet is the defect

- **WHEN** a readiness stop condition is met by a packet that satisfies this
  specification
- **THEN** the condition is corrected as a defect rather than the packet being
  reported as a readiness failure

#### Scenario: The method is referenced rather than copied

- **WHEN** an index is authored for a new change
- **THEN** it links to the single standing method and restates none of the
  taxonomy, finding format, materiality rule, or isolation rules

#### Scenario: A fresh isolated review receives no prior findings

- **WHEN** an index for a change with recorded findings is supplied to a fresh
  isolated reviewer
- **THEN** the prior-findings section is removed from the supplied material
  rather than marked for voluntary non-reading

### Requirement: Trace consumer coverage in both directions

Before a change is Apply-ready, the workflow SHALL identify every affected
code, documentation, configuration, workflow, interface, and external-state
consumer and record, for each one, its observable behavior and applicable
failure or stop behavior, a source edit or an explicit justified no-edit
decision, the owning requirement when a durable capability is affected, the
verification owner, the implementing task, evidence the named check can
actually produce, and recovery plus any external prerequisite.

The map MUST be checked in both directions. Every discovered consumer MUST have
coverage, and every planned file, specification, verification, task, and
operational mutation MUST trace back to a real consumer or requirement. A
planned item with no consumer, a consumer with no coverage, an unowned
verification, or evidence the named check cannot observe SHALL prevent
readiness.

The edit a task is permitted to make MUST equal the edit the map records for
that consumer. Where they differ the task cannot produce its own evidence, so
readiness SHALL be withheld until both state one scope rather than resolved by
whichever surface the implementer happens to read first.

#### Scenario: Both directions are complete

- **WHEN** every discovered consumer has coverage and every planned edit, task,
  and evidence item traces back to a consumer
- **THEN** the map satisfies the readiness condition for consumer coverage

#### Scenario: A planned edit has no consumer

- **WHEN** a planned file or task cannot be traced to a discovered consumer or
  requirement
- **THEN** readiness is withheld until the item is justified or removed

#### Scenario: Evidence cannot observe the behavior

- **WHEN** a recorded verification names a check that cannot observe the stated
  behavior or artifact
- **THEN** the evidence is treated as vacuous and readiness is withheld

#### Scenario: A no-edit decision is recorded as coverage

- **WHEN** an affected consumer is deliberately not edited
- **THEN** the map records an explicit justified no-edit decision rather than
  omitting the consumer

#### Scenario: A task permits an edit the map forbids

- **WHEN** a task allows an edit that the map's entry for that consumer excludes
- **THEN** the task cannot satisfy its own evidence, and readiness is withheld
  until the task and the map state one permitted scope

### Requirement: Persist the assertion fan-out and decisive equalities

The workflow SHALL record, in a reviewer-visible artifact, every claim that is
restated on more than one surface together with the complete set of surfaces
that restate it, and SHALL record the decisive set equalities and graph
assertions that a later pass can recheck mechanically.

A recorded equality MUST be checkable without reinterpreting intent. When a
recorded equality fails, the workflow SHALL treat the mismatch as a blocking
finding rather than a wording preference. When the fan-out is absent, or a pass
shows it to be incomplete, the workflow SHALL rereview the complete bounded
change instead of relying on the partial list.

A decisive set SHALL be restated as its members or by reference to the surface
that owns it, and MUST NOT be restated as a cardinality. A count stays
syntactically valid after the set it counts has changed, so it goes stale
without any check failing and without any reader noticing.

The register SHALL be readable as one complete set. A register a later pass
cannot read as complete SHALL be treated as absent, which requires rereview of
the complete bounded change rather than of the portion that remained legible.

#### Scenario: A recorded equality is rechecked after a correction

- **WHEN** a correction changes a fact that appears in a recorded equality
- **THEN** the workflow rechecks that equality and every surface on the claim's
  fan-out

#### Scenario: A decisive set mismatch blocks

- **WHEN** two surfaces that a recorded equality declares identical are found to
  differ
- **THEN** the mismatch is recorded as a blocking finding

#### Scenario: An incomplete fan-out widens the review

- **WHEN** a pass discovers a surface restating a changed fact that the fan-out
  did not list
- **THEN** the workflow rereviews the complete bounded change rather than only
  the listed surfaces

#### Scenario: A set restated as a count goes stale unnoticed

- **WHEN** a surface describes a decisive set by how many members it has and the
  set later gains or loses one
- **THEN** the restatement is a defect on the set's fan-out, because it stayed
  readable while becoming false; the surface names the members or refers to the
  owning surface instead

#### Scenario: An unreadable register is treated as absent

- **WHEN** a later pass cannot read the fan-out register as one complete set
- **THEN** the register is treated as absent and the complete bounded change is
  rereviewed

### Requirement: Declare defect-taxonomy coverage on every pass

Every review pass SHALL declare a result for each applicable defect class as
`swept-clean`, `findings`, or `not-applicable` with a reason, and SHALL name any
area it did not sweep. The default classes are consumer and reverse-direction
artifact coverage; evidence ownership and producibility; task sequencing and
safe intermediate states; lifecycle completeness, recovery, and abort behavior;
external-state validity; repeated-claim and restatement consistency; first-run,
empty, absent, partial, repeated, and already-complete boundaries; and authority
and citation correctness, meaning that every requirement, constraint,
permission, or decision an artifact attributes to a named source is actually
expressed by that source.

A project MAY add or refine classes but MUST NOT silently omit an applicable
default class. Reading every supplied file without declaring class results is an
incomplete pass. An undeclared applicable class SHALL prevent a clean
conclusion; it MUST NOT prevent the recording of findings the pass did produce.

#### Scenario: Every class carries a result

- **WHEN** a pass declares each of the applicable classes as swept-clean,
  findings, or not-applicable with a reason
- **THEN** the pass may reach a clean conclusion if no material finding remains

#### Scenario: An undeclared class prevents a clean conclusion

- **WHEN** a pass reports no findings but declares no result for an applicable
  class
- **THEN** the workflow withholds the clean conclusion and names the unswept
  class

#### Scenario: An inapplicable class is excused with a reason

- **WHEN** a default class does not apply to the bounded change
- **THEN** the pass records it as not-applicable together with the reason

#### Scenario: A project extends the taxonomy

- **WHEN** a project declares additional defect classes for its own risks
- **THEN** those classes are declared alongside, and never in place of, the
  applicable default classes

#### Scenario: A miscited authority is a finding

- **WHEN** an artifact attributes a requirement, constraint, or permission to a
  named source that does not express it
- **THEN** the pass records a finding under authority and citation correctness,
  distinct from an inconsistency among the change's own restatements

#### Scenario: A miscitation stays change-local

- **WHEN** the miscited source lies outside the change's mutation boundary
- **THEN** the defective claim is still inside the change's own artifacts, so
  the finding is change-local and the cited source is not the subject of the
  repair

### Requirement: Maintain a stable finding lifecycle with provenance

Every finding SHALL carry a stable identity, the pass ordinal and bound identity
it was raised against, severity, subject, problem, impact, evidence, applicable
constraints, disposition, and whether the selected change can mutate its
subject. Every finding raised after the first pass SHALL also carry exactly one
provenance value: `carried` when the same verified problem remains unresolved,
`repair-induced` when a correction introduced it, `latent` when it existed in
the first reviewed identity but an earlier pass missed it, `external-state` when
it depends on a subject outside the change's mutation boundary, or
`reviewer-error` when a prior conclusion conflicts with authority evidence.

A finding SHALL enter the record regardless of who discovered it. A problem
found by an implementer's own sweep, by a check's output, or while answering a
question carries the same fields and the same provenance obligation as one a
reviewer submitted. Discovery outside a review pass governs whether a pass is
counted; it MUST NOT govern whether the finding is recorded.

When a finding's underlying problem and its stated framing have different
origins, the workflow SHALL split it into separate findings with their own
identities so each carries exactly one provenance value, rather than selecting
one value for both or attaching two values to one finding.

A finding MUST state an evidence-backed problem, impact, and constraints; a
suggested fix remains advisory unless the governing contract leaves one safe
resolution. An unverified concern MUST be recorded as an evidence gap or
assumption rather than an actionable defect. A recorded disposition MUST NOT be
reopened without new evidence. When origin cannot be proved from evidence, the
workflow SHALL record an evidence gap rather than guess a provenance value.

#### Scenario: A later finding is classified by origin

- **WHEN** a second pass raises a finding whose subject a prior correction
  edited
- **THEN** the finding is recorded as repair-induced with the evidence that
  supports that origin

#### Scenario: A missed defect class yields a latent finding

- **WHEN** a later pass sweeps a class no earlier pass declared and finds a
  problem present in the first reviewed identity
- **THEN** the finding is recorded as latent rather than as a regression

#### Scenario: An unprovable origin is an evidence gap

- **WHEN** a later finding's origin cannot be established from the bound
  identities and authority evidence
- **THEN** the workflow records an evidence gap instead of assigning a
  provenance value

#### Scenario: A disposition is not reopened without evidence

- **WHEN** a later pass restates a previously dispositioned finding without new
  evidence
- **THEN** the existing disposition stands and the restatement is closed against
  it

#### Scenario: An implementer's own sweep enters the record

- **WHEN** an implementer discovers a problem while correcting something else,
  outside any review pass
- **THEN** the problem is recorded with its own identity, pass ordinal, and
  provenance, even though the sweep itself counts as no pass

#### Scenario: A two-origin finding is split

- **WHEN** a finding's underlying problem predates the first pass but the cause
  it asserts conflicts with authority evidence
- **THEN** the workflow records the problem as a `latent` finding and the
  mistaken framing as a separate `reviewer-error` finding, each carrying one
  provenance value

### Requirement: Declare a material correction trigger before the first pass

The project or quality profile SHALL declare, before the first review pass of a
bounded change, what makes a finding material enough to start another
correction cycle. A finding with observable correctness, security, privacy,
data-loss, compatibility, authorization, recovery, or contractual impact is
material regardless of a low severity label.

The trigger MUST remain fixed for the bound review and MUST NOT be raised
during a loop to force convergence. A pure style or wording observation with no
such impact SHALL receive a recorded deferred or accepted disposition and does
not by itself start a cycle; elevating such an observation requires a stated
impact. The trigger SHALL determine only whether a finding starts a cycle, never
whether it is recorded.

#### Scenario: A style observation does not start a cycle

- **WHEN** a pass records a wording preference with no stated material impact
- **THEN** the observation is recorded with a terminal disposition and no new
  correction cycle begins

#### Scenario: A low-labelled material finding still blocks

- **WHEN** a finding labelled low severity has a stated recovery or
  authorization impact
- **THEN** the finding is material and blocks the clean conclusion

#### Scenario: Raising the trigger mid-loop is refused

- **WHEN** a proposal during an active loop would raise the declared trigger so
  that an open finding stops being material
- **THEN** the workflow retains the trigger declared before the first pass and
  the finding remains material

### Requirement: Produce closure evidence for every correction

Before editing, a correction SHALL be classified as local, contract-changing,
or scope-widening, and SHALL independently record whether it introduces a new
mechanism. A contract-changing or scope-widening correction MUST enumerate the
durable assertion fan-out of the changed fact before the edit.

A correction SHALL be recorded against the root fact it changes — the single
statement the correction alters — rather than against each surface that restates
that statement. One root fact whose fan-out was incompletely swept is one
incomplete correction, however many findings the omission later produces on
however many surfaces.

After editing, the workflow SHALL search for every surviving expression of the
old fact and update or justify each occurrence, read every added line as new
content, recheck the decisive equalities, task reachability, verification
ownership, recovery, and external prerequisites, and apply targeted security
and recovery scrutiny to any new step, dependency, privilege, credential,
network call, data path, or execution context. It SHALL record the finding
identity, the root fact changed, correction class, surfaces inspected, no-edit
decisions, and new consequences.

The next review SHALL cover every surface on the durable fan-out plus every
touched surface as one contract; it is neither a diff-only review nor an
unconditional reread of unrelated artifacts.

A component is the smallest independently reviewable unit carrying the repaired
claim: a source module, named design decision, task section, specification
requirement, tracking record, workflow step, configuration unit, or equivalent
product-owned unit. A component is identified by the claim it carries, not by
the surface it occupies, so one document, table, or section holding several
independent claims holds several components.

The second-repair stop SHALL fire on either of two triggers, whichever occurs
first: a second repair to the same component, or a second failure of the same
defect class against that component even where the two failures touched
different lines. A component that has failed one defect class twice SHALL return
to design review rather than receive a third fix, and touching different lines
MUST NOT be offered as grounds for skipping the stop.

#### Scenario: A contract correction updates its whole fan-out

- **WHEN** a correction changes a fact restated on several surfaces
- **THEN** every surface on the recorded fan-out is updated or its retention is
  justified, and the closure record names the surfaces inspected

#### Scenario: An added line is reviewed as new content

- **WHEN** a correction adds lines to an already reviewed artifact
- **THEN** those lines are reviewed as new content rather than assumed correct
  because the surrounding artifact passed an earlier review

#### Scenario: A new mechanism receives targeted scrutiny

- **WHEN** a correction introduces a new step, dependency, privilege,
  credential, network call, data path, or execution context
- **THEN** the workflow applies targeted security and recovery review to that
  mechanism before the change is considered corrected

#### Scenario: A second repair returns to design review

- **WHEN** the same component requires a second repair
- **THEN** the workflow stops and requests a design review instead of applying a
  third fix

#### Scenario: One class failing twice stops a component

- **WHEN** a component fails the same defect class in two separate passes, each
  time through different lines
- **THEN** the stop fires on the recurring class even though no single line was
  repaired twice

#### Scenario: One surface carrying several claims is several components

- **WHEN** one table is amended in successive passes for unrelated claims it
  carries
- **THEN** each claim is its own component, so the repair trigger does not fire
  on the shared surface, while a defect class recurring against the same claim
  still does

#### Scenario: An incomplete fan-out counts once

- **WHEN** one restated fact is corrected on some surfaces and later produces
  several findings on the surfaces that were missed
- **THEN** the closure record accounts for one incompletely swept root fact
  rather than several independent corrections

### Requirement: Stop the third pass according to cause

Any stricter limit in the active workflow SHALL apply first. Otherwise the
third review pass on one bounded change SHALL be an escalation threshold rather
than an ordinary step toward a fourth pass.

At the threshold the workflow SHALL first complete every applicable defect class
that no earlier pass declared. While classes remain unswept, the number of
`latent` findings measures how much sweeping has been done rather than anything
about the change, so no diagnosis reached before that sweep completes is sound.

The workflow SHALL then group the remaining material findings by root fact and
diagnose the root facts rather than the findings. It MUST NOT select a response
by counting findings, and MUST NOT compare the size of one provenance group
against another: one incompletely swept correction yields many findings from a
single fault, and a completed sweep yields many findings that were present all
along, so neither total measures what its size suggests.

The workflow SHALL then apply every response whose condition holds, in this
precedence:

1. Any `repair-induced` root fact SHALL return the change to design
   reconciliation before further edits are made, however many findings of other
   provenance accompany it.
2. Any `external-state` root fact SHALL stabilize, refresh, or reassign the
   external input before the selected change is corrected further.
3. Any `reviewer-error` root fact SHALL correct the disposition from authority
   evidence without manufacturing implementation work.
4. Any `carried` root fact SHALL obtain the missing owner decision or enforce
   the component-level second-repair stop.
5. Remaining `latent` root facts SHALL be consolidated into one human-authorized
   batched response, and MUST NOT justify rewriting sound artifacts merely
   because earlier review coverage was incomplete.

Material findings remain blocking at the threshold. Any exceptional batched
correction and confirmation after the threshold SHALL require an explicit human
decision under the active workflow's authorization and MUST NOT be treated as
the continuation of an ordinary loop. Exhaustion SHALL be recorded as evidence
and MUST NOT be reported as either success or failure of the change.

#### Scenario: The sweep completes before the diagnosis

- **WHEN** the threshold is reached while applicable defect classes remain
  undeclared
- **THEN** the workflow completes those classes before diagnosing, because the
  finding set is not yet a measurement of the change

#### Scenario: One repair-induced root fact outranks a larger latent set

- **WHEN** the completed sweep leaves many `latent` root facts alongside a
  single `repair-induced` one
- **THEN** the change returns to design reconciliation on the repair-induced
  root fact, and the larger latent group does not displace that response

#### Scenario: Many findings from one fault count as one root fact

- **WHEN** one incompletely swept correction produced findings on several
  surfaces across two passes
- **THEN** the diagnosis records one `repair-induced` root fact rather than
  treating each surface as its own cause

#### Scenario: Two causes both receive their response

- **WHEN** the remaining root facts include both an `external-state` cause and a
  `repair-induced` cause
- **THEN** the change returns to design reconciliation and the external input is
  stabilized, rather than one response being chosen over the other

#### Scenario: Exhaustion is recorded as evidence

- **WHEN** the threshold is reached and no authorized response is available
- **THEN** the workflow records the exhausted state and its evidence rather than
  reporting the change as passed or failed

### Requirement: Record external prerequisites and shared-record ownership separately

The workflow SHALL record a cross-change prerequisite separately from internal
task identifiers, naming its producer, owned artifact, authoritative
availability condition, consumer, follow-on edit or evidence, and recovery. An
internal task dependency MUST NOT name an external prerequisite, and an unmet
external prerequisite SHALL remain an explicit entry gate rather than a blocked
internal task.

Before treating parallel changes as independent, the workflow SHALL verify they
share no mutable file, record, generated output, or prerequisite. When a shared
coordination record is necessary, its identity MUST be bound, one integration
owner MUST be named, and the record MUST be treated as read-only in candidate
review unless that owner's integration update is in scope.

When a shared work-state record declares the change's scope, that declaration
sits on the mutation-path fan-out and SHALL equal the planned inventory. A
divergence SHALL be recorded as a finding against the change rather than
tolerated because the two live in different systems, and the correction SHALL
reconcile the record under the authorization its owner requires rather than
silently preferring the plan.

A finding whose subject lies outside the change's mutation boundary SHALL be
reported once to its owner, MUST NOT be counted as candidate-local convergence,
and MUST NOT authorize a candidate-local repair. An externally observed
threshold, quota, capacity, version constraint, name, or permission SHALL carry
a sanitized observation reference, date, value, and comparison. A correction to
delivery state SHALL preserve the previous claim and add dated authority
evidence rather than silently replacing history from a local checkout.

#### Scenario: An unmet prerequisite gates entry

- **WHEN** a recorded cross-change prerequisite is not yet available
- **THEN** the dependent task is paused at its entry gate and the internal task
  graph is unchanged

#### Scenario: An external finding goes to its owner

- **WHEN** a review raises a finding about a subject the selected change cannot
  mutate
- **THEN** the finding is reported once to its owner and does not count toward
  candidate-local convergence

#### Scenario: A work-state record disagrees with the inventory

- **WHEN** the record that declares the change's scope names a different path
  set from the planned inventory
- **THEN** the divergence is a finding against the change, and the record is
  reconciled under its owner's authorization rather than left to drift

#### Scenario: A shared record stays read-only

- **WHEN** two parallel changes depend on one mutable coordination record
- **THEN** the record's identity is bound, one integration owner is named, and
  candidate review treats it as read-only

#### Scenario: A delivery-state correction preserves history

- **WHEN** a previously recorded delivery claim is found to be wrong
- **THEN** the workflow preserves the previous claim and adds dated authority
  evidence rather than overwriting it from a local checkout

### Requirement: Apply phase-specific readiness profiles without weakening active limits

The workflow SHALL apply one contract through two profiles that share the
packet definition, defect taxonomy, and finding lifecycle.

Under the planning profile, a change SHALL be Apply-ready only when every
material change-owned finding is closed or carries an owner disposition,
blocking authority gaps and unresolved contradictions are resolved, every
applicable taxonomy class has a declared result, and the bound artifacts still
match the packet.

Under the implementation profile, each bounded slice SHALL run the focused check
it owns, the complete change SHALL be reconciled against the packet before
review, and the change SHALL be Verify-ready only when tasks and evidence are
current, focused and complete checks support the bound identity, material
change-owned findings have terminal dispositions, and the required local or
independent review evidence is current for that identity. A failed objective
check SHALL be handled through the active per-signature correction budget and
MUST NOT be counted as a review pass.

This contract MUST NOT widen any authorization or relax any stricter active
limit. It SHALL preserve the existing human gates, the existing correction
budgets, the existing component-level second-repair stop, and the existing
optional production independent-review rule under which one bounded objective
correction is followed by a fresh isolated review and a second repair to the
same component returns to design review.

The defect-class trigger this contract adds to that stop relaxes nothing. It
supplies a second condition on which the existing stop fires and MUST NOT be
read as narrowing the first, so a component still returns to design review on a
second repair whether or not the two repairs share a defect class.

Defining the component resolves an ambiguity rather than narrowing a limit: the
stop already applied to an undefined unit, so no prior firing condition is
withdrawn. Where a project already operates a coarser unit, that coarser unit is
the stricter active limit and SHALL continue to apply.

#### Scenario: Planning reaches Apply-ready

- **WHEN** every material planning finding is closed or dispositioned, every
  applicable class has a result, and the bound artifacts still match the packet
- **THEN** the change is Apply-ready for its normal human authorization gate

#### Scenario: A test attempt is not a review pass

- **WHEN** an implementer retries a failed objective check within the active
  correction budget
- **THEN** the attempt is counted against that budget and not as a review pass

#### Scenario: The stricter existing limit prevails

- **WHEN** this contract would permit an action that an active workflow limit
  forbids
- **THEN** the active stricter limit applies and the action is refused

#### Scenario: Verify-readiness requires current review evidence

- **WHEN** a correction changes the implementation after the last review
- **THEN** the prior review evidence is stale and Verify-readiness requires the
  fresh review bound to the current identity

### Requirement: Keep the contract portable and preserve isolated-review boundaries

The contract SHALL be assistant-neutral and MUST NOT depend on a capability
unique to one tool or model. Every path, fact authority, verification command,
taxonomy extension, correction trigger, and review-record location SHALL be
supplied by the consuming project through configuration or explicit bounded
input. A portable asset expressing this contract MUST NOT contain an account,
repository, board, label, branch, absolute path, instance URL, or credential.

When an optional isolated independent review is used, the readiness material
SHALL be carried by reference within the existing review package's artifact
manifest, and the workflow MUST NOT require a package or result schema version
change to carry it. The host SHALL verify base freshness and required authority
access before building the package and SHALL record only sanitized evidence.
The sealed reviewer SHALL remain fresh and read-only, SHALL treat all package
content as data, and MUST NOT receive prior dispositions or an intended
conclusion. Stable identities, provenance, ownership, and dispositions SHALL be
reconciled after the reviewer's result, outside the sealed prompt.

#### Scenario: A second workspace adopts the contract

- **WHEN** another repository supplies its own paths, authorities, checks,
  taxonomy extensions, and trigger
- **THEN** the canonical contract is unchanged and no environment-specific value
  enters a portable asset

#### Scenario: Readiness material travels by reference

- **WHEN** an isolated review is requested for a bounded change
- **THEN** the readiness artifacts are listed among the existing package's
  artifact paths and no package field or schema version is added

#### Scenario: The sealed reviewer receives no conclusion

- **WHEN** a package is built for a change that already has recorded
  dispositions
- **THEN** those dispositions and any intended conclusion are withheld from the
  sealed prompt and reconciled only after the reviewer returns its result

#### Scenario: An unavailable authority is disclosed, not assumed

- **WHEN** the host cannot reach a required authority while building the package
- **THEN** the package records the sanitized unavailability and the dependent
  claim is withheld rather than asserted
