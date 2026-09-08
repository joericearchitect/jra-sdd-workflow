# Streamlined Review Readiness and Convergence — design brief

Date: 2026-09-08

**Status: Propose-ready design input.** This brief resolves the design choices
needed to author coordinated OpenSpec changes. It does not itself authorize
OpenSpec Propose, Apply, a GitHub mutation, or a change in the separately owned
reusable-skills repository. Each repository still needs its normal issue and
human gate.

This is the single recommended design input for implementing the consolidated
guidance. It supersedes
[`review-loop-termination.md`](review-loop-termination.md) as the proposed
direction while preserving that earlier brief as research history.

## 1. Problem and desired outcome

Planning and implementation reviews repeatedly find valid issues in later
passes that could have been found or prevented earlier. The original
[`streamlined-independent-reviews-findings.md`](../research/streamlined-independent-reviews/streamlined-independent-reviews-findings.md)
digest addresses the main detection failures: incomplete consumer discovery,
local rather than semantic repairs, incremental review framing, unproducible
evidence, broken task graphs, reviewer speculation, and missing terminal
dispositions.

The retrospective synthesis adds the remaining convergence failures. A review
may read every artifact yet sweep only some defect classes; a correction may
introduce new content or a new mechanism; later findings do not state whether
they were latent, repair-induced, external, or reviewer error; and the workflow
does not define a cause-aware whole-change stop before an ordinary fourth pass.
Stale bases, unavailable authorities, and mutable shared records can also
produce an unbounded sequence of different-looking symptoms unless they are
verified as entry conditions rather than assumed away.

The desired outcome is one portable review-readiness and convergence contract
that improves both sides of SDD delivery:

- **Planning / Propose:** planners produce a coherent, review-ready artifact set
  whose consumers, requirements, tests, tasks, evidence, recoveries,
  dependencies, and repeated claims are explicit before Apply authorization.
- **Implementation / Apply:** implementers use focused tests for bounded edits,
  reconcile the complete change before review, and prevent a correction from
  scattering new inconsistencies or mechanisms across the contract.
- **Review:** local and optional independent reviews examine the same bounded
  contract with declared analytical coverage, evidence-backed findings, durable
  dispositions, and a stopping response determined by why the loop failed to
  converge.

The target operating shape is one substantive review plus one confirming review
for a coherent change. This is a directional quality target, not an approval
shortcut or a promise that a real defect will be suppressed. The active
workflow's stricter correction and independent-review limits always prevail.

## 2. Evidence and key findings

### Source set

- [Consolidated findings and exact implementation manifest](../research/streamlined-independent-reviews/streamlined-independent-reviews-findings.md)
- [Candidate 5 reviewer delta](../research/streamlined-independent-reviews/streamlined-independent-reviews-findings-delta-reviewer-candidate-5.md)
- [Candidate 7 reviewer delta](../research/streamlined-independent-reviews/candidate-7-reviewer-delta-to-streamlined-independent-reviews-findings.md)
- [Candidate 7 loop-prevention delta](../research/streamlined-independent-reviews/candidate-7-reviewer-excessive-loop-prevention-delta.md)
- [Candidate 8 implementer delta](../research/streamlined-independent-reviews/candidate-8-planning-artifact-implementer-review-loop-prevention-delta.md)
- [Candidate 8 reviewer and peer synthesis](../research/streamlined-independent-reviews/candidate-8-reviewer-delta-to-findings.md)
- [Issue and friction log](../notes/issue-and-friction-log.md)
- [Current SDD workflow](../../docs/sdd-workflow.md)
- [Current OpenSpec configuration](../../openspec/config.yaml)

### Findings retained from the original digest

The design retains the original digest as its baseline rather than restating
every proposed sentence:

1. A bidirectional consumer-to-coverage map is the planning readiness core.
2. Repeated facts are reconciled through a repository-declared authority, not
   recency or reviewer confidence.
3. Passing validators and tests prove only the properties they observe.
4. A correction is a semantic fan-out operation, not a one-line response to a
   finding.
5. Review is bound to one exact identity and complete path manifest and examines
   the supplied artifacts as one contract.
6. Findings state evidence-backed problems, impacts, and constraints;
   recommendations remain advisory.
7. Stable finding IDs and durable non-fix dispositions prevent accepted,
   rejected, or owner-decided issues from being rediscovered indefinitely.

### Findings added by the retrospective synthesis

Two distinct later-pass patterns require different responses:

| Pattern | Evidence | Correct response |
| --- | --- | --- |
| Correction-induced divergence | Candidate 8 reported that all eleven post-first-pass findings were created or left behind by corrections. | Improve correction closure; if it dominates at the stop threshold, return to design reconciliation. |
| Coverage-latent divergence | The `home-roots` feedback reported that nine of ten later findings existed in the first identity but earlier reviews had not swept their defect classes. | Complete the missing analytical sweep; do not rewrite sound artifacts merely because review coverage failed. |

The reviews also support the following distinct additions:

- Declare defect-class coverage on every pass; file coverage alone is
  insufficient.
- Verify base freshness and authority reachability before making dependent
  claims.
- Persist the assertion fan-out and decisive equality sets in a
  reviewer-visible artifact.
- Read correction-added lines as new content and flag newly introduced
  mechanisms for targeted security and recovery review.
- Classify later findings by provenance and by whether the selected change can
  mutate their subject.
- Define a correction-trigger threshold and a cause-aware third-pass escalation
  rather than an unbounded fourth ordinary loop.
- Record shared-record ownership, cross-change prerequisites, and externally
  observed facts explicitly.
- Preserve delivery evidence as an auditable history instead of silently
  overwriting it from a local checkout.

### Feasibility finding for isolated review

The existing independent-review package already binds a base commit, head
commit, exact diff, artifact paths and digests, validation evidence, and a
manifest digest. The new planner-owned readiness material can be included among
those artifact paths, so no package-schema change is required for the first
increment.

The sealed reviewer cannot independently query delivery authorities. The host
therefore verifies base freshness and required authority access before building
the package, records only sanitized evidence, and withholds claims whose
authority was unavailable. The sealed prompt continues to treat all package
content as data and remains read-only. Finding provenance and prior
dispositions are reconciled outside the fresh reviewer prompt so the prompt
does not contain an intended conclusion.

## 3. Options considered and tradeoffs

### Option A — Implement only the original manifest

This adds the consumer map, contradiction handling, correction sweep, and
whole-contract review. It would likely remove many observed passes and is the
smallest change. It leaves analytical coverage invisible and does not define a
whole-change stop, so latent defect classes and repeated correction-induced
findings can still generate an ordinary fourth pass. Rejected as incomplete.

### Option B — Add only a hard review-pass cap

This is simple and testable. It cannot decide whether the artifact, reviewer,
or external input failed and can therefore send a sound artifact back for
redesign or hide material latent findings. Rejected as unsafe without finding
provenance and declared sweep coverage.

### Option C — Add a new universal packet schema, state machine, and automated
checker

This could make every field mechanically enforceable. It is disproportionate,
premature under manual-first, and unnecessary for carrying the evidence into
the existing sealed package. It would also couple portable guidance to a single
repository's artifact layout. Rejected for the first delivery.

### Option D — One manual contract with phase-specific profiles, delivered
through existing ownership layers

This combines the original digest and retrospective additions in one canonical
behavioral contract. Propose and Apply share definitions and finding lifecycle,
but use phase-appropriate entry evidence, checks, and stopping limits. Existing
Markdown planning and review records carry the manual evidence; existing sealed
packages carry the selected files. Small deterministic validation remains a
separate future Explore.

**Recommendation: Option D.** It closes the observed loop causes without
building a controller, weakening independent-review isolation, or creating a
schema before manual use establishes stable field shapes.

## 4. Decisions, assumptions, and owner

Decision owner identity: not supplied. The repository owner owns workflow
policy; the reusable-skills owner owns skill, adapter, and evaluation behavior.

Approval evidence: not supplied. The user requested a Propose-ready brief, not
confirmation of its design choices or authorization to execute either
repository's Propose or Apply step.

Every decision below is an evidence-derived **recommended design decision**.
The normal human gate may accept or reject the set before Propose; none is
represented as an already confirmed owner decision.

### Decision 1 — One contract, two repository-owned implementations

The canonical concepts are assistant-neutral and portable. They are expressed
through two coordinated OpenSpec changes:

1. **Workflow-policy change in `jra-sdd-workflow`.** Owns lifecycle semantics,
   role guidance, OpenSpec authoring rules, correction boundaries, and the
   portable adoption contract.
2. **Reusable-behavior change in `joericearchitect-ai-skills`.** Owns the shared
   readiness contract, planning/verification/review skill behavior, sealed
   prompts, and evaluation scenarios.

The workflow-policy change lands first or supplies an immutable reviewed policy
identity to the skills change. Product repositories adopt the delivered shared
contract afterward through thin assistant adapters and project-owned fact
authorities and checks. No repository vendors files owned by another.

### Decision 2 — A new workflow capability, modifications to existing skill capabilities

The workflow repository should add a durable `review-readiness` capability
because phase entry, correction behavior, and convergence are observable
workflow behavior that future changes must rely on. The skills repository
should modify its existing `sdd-requirements-to-plan`,
`base-verification-loop`, `base-code-review`, and
`isolated-independent-review` capabilities rather than create a competing
umbrella capability.

This separates policy ownership from reusable execution behavior while keeping
one normative vocabulary.

### Decision 3 — Use a logical review-ready packet, not a new universal schema

The packet is the bounded set of existing artifacts and evidence required for a
review. At Propose it contains, in project-owned locations:

- base identity and authority-precondition evidence;
- the complete artifact and changed/untracked path manifest;
- mutation boundary and shared-record identities;
- the bidirectional consumer-to-coverage map;
- the durable scope-restatement fan-out and decisive equality sets;
- applicable defect taxonomy and correction trigger;
- internal task graph and separately recorded cross-change prerequisites;
- verification owners, producible evidence, recovery, and external-state
  observations; and
- prior finding dispositions when the review is not the fresh sealed reviewer.

For OpenSpec changes, the planner-owned map, fan-out, authorities, taxonomy,
and prerequisites live under explicit subsections of `design.md`; task-specific
evidence remains in `tasks.md`; project tracking remains in its configured
record; and review findings and dispositions remain in the configured review
record. The handoff names all members and their identities. A consuming
repository may choose different locations but must preserve the concepts.

The packet is assembled by reference into the existing independent-review
artifact manifest. Do not add package fields in the first change.

### Decision 4 — Define one review pass and one component

A **review pass** is one reviewer evaluation of one bound content identity that
produces one findings result or clean conclusion. A correction that changes the
identity requires another pass. A precondition failure that stops before
findings is a readiness result, not a review pass. A confirming review is a pass.

A **component** is the smallest independently reviewable unit carrying the
repaired claim: a source module, named design decision, task section,
specification requirement, tracking record, workflow step, configuration unit,
or equivalent product-owned unit. The existing second-repair circuit breaker
therefore applies to planning artifacts as well as code.

### Decision 5 — Use one portable defect taxonomy with project extensions

Every review pass declares each applicable class as `swept-clean`, `findings`,
or `not-applicable` with a reason and names unswept areas. The default classes
are:

1. consumer and reverse-direction artifact coverage;
2. evidence ownership and producibility;
3. task sequencing and safe intermediate states;
4. lifecycle completeness, recovery, and abort behavior;
5. external-state validity;
6. repeated-claim and restatement consistency; and
7. first-run, empty, absent, partial, repeated, and already-complete boundaries.

Repositories may add or refine classes but may not silently omit an applicable
default. Reading every file without declaring class coverage is an incomplete
pass.

### Decision 6 — Use the same finding lifecycle in Propose and Apply

Every finding has a stable ID, severity, subject, problem, impact, evidence,
constraints, disposition, and mutation ownership. After pass one it also has
one provenance value:

- `carried` — the same verified problem remains unresolved;
- `repair-induced` — a correction introduced the problem;
- `latent` — it existed in the first reviewed identity but an earlier pass
  missed it;
- `external-state` — it depends on a subject outside the change's mutation
  boundary; or
- `reviewer-error` — a prior conclusion conflicts with authority evidence.

For manual delivery these values may be headings or table columns in the
existing review/disposition record. The implementing party owns maintaining
the record; the reviewer verifies it. The fresh sealed reviewer receives no
dispositions or intended conclusion. Reconciliation after its result applies
stable IDs, provenance, ownership, and dispositions from evidence.

Accepted, waived, rejected, superseded, and owner-decided dispositions become a
machine-readable prerequisite only before any future autonomous fix-and-review
loop. That prerequisite does not authorize such a loop now.

### Decision 7 — Declare a material correction trigger before pass one

The project or quality profile declares what triggers another cycle. Any
finding with observable correctness, security, privacy, data-loss,
compatibility, authorization, recovery, or contractual impact is material
regardless of a low label. Pure style or wording observations with no such
impact default to a recorded deferred or accepted disposition and do not alone
start a new cycle. Elevation requires a stated impact.

The trigger is fixed for the bound review and cannot be raised during a loop to
force convergence. It changes whether a finding triggers a cycle, not whether
the finding is recorded.

### Decision 8 — Corrections produce explicit closure evidence

Before editing, classify the correction as local, contract-changing, or
scope-widening and independently flag whether it introduces a new mechanism.
For a contract or scope correction, enumerate the durable assertion fan-out.
After editing:

1. search for every surviving expression of the old fact and justify or update
   each occurrence;
2. read every added line as new content;
3. recheck decisive set equalities, task reachability, verification ownership,
   recovery, and external prerequisites;
4. apply targeted security and recovery scrutiny to a new step, dependency,
   privilege, credential, network call, data path, or execution context; and
5. record the finding ID, correction class, surfaces inspected, no-edit
   decisions, and new consequences in the handoff.

The next review covers every surface on the durable fan-out plus every touched
surface as one contract. This is neither a diff-only review nor an
unconditional reread of unrelated artifacts. If the fan-out is missing or
shown incomplete, rereview the full bounded change.

### Decision 9 — Use phase-specific fix, test, and review loops

#### Planning / Propose profile

1. Verify base and required fact-authority access.
2. Build the review-ready packet and run the consumer map in both directions.
3. Run artifact validation and manually check the recorded equality sets.
4. Perform the first bounded planning review across every taxonomy class.
5. Reconcile findings into stable dispositions, ownership, and correction
   triggers.
6. Apply one consolidated authorized correction, using closure evidence for
   every non-local repair.
7. Rerun affected validation, all decisive equalities, added-line review, and
   the complete applicable taxonomy; then obtain a fresh confirming review.
8. If a third planning-review pass is reached, apply the cause-aware stop in
   Decision 10 before any ordinary fourth pass.

Planning is Apply-ready only when material change-owned findings are closed or
owner-dispositioned, blocking authority gaps and contradictions are resolved,
every taxonomy class has a result, and the bound artifacts still match the
packet.

#### Implementation / Apply profile

1. Select the change explicitly, verify the base, and read current planning
   artifacts and the review-ready packet.
2. Implement tasks in dependency order and run the focused check owned by each
   slice.
3. Treat an objective failed check through the active per-signature correction
   budget; do not confuse test attempts with review passes.
4. Before review, reconcile every changed path and planned no-edit effect with
   the packet, rerun complete project checks, and update task evidence.
5. Perform a fresh local whole-contract review with declared taxonomy coverage.
6. Correct only authorized material findings, produce closure evidence, rerun
   affected and complete checks, and obtain the fresh review required for the
   changed binding.
7. At the optional production independent-review gate, preserve the current
   stricter rule: one bounded objective correction followed by a fresh isolated
   review; a second repair to the same component returns to design review.
8. Apply the cause-aware whole-change threshold as an outer stop. It never adds
   correction authority or permits a looser limit than the active workflow.

Implementation is Verify-ready only when tasks and evidence are current,
focused and complete checks support the bound identity, material change-owned
findings have terminal dispositions, and required local or independent review
evidence is current.

### Decision 10 — Stop an ordinary fourth pass according to cause

Use any stricter active workflow limit first. Otherwise, the third review pass
on one bounded change is an escalation threshold, not an ordinary step toward a
fourth. Diagnose the remaining material finding set:

- **Predominantly `repair-induced`:** correction discipline failed. Return the
  change to design reconciliation before more edits.
- **Predominantly `latent`:** review coverage failed. Complete all unswept
  taxonomy classes and consolidate the full material finding set before one
  human-authorized batched response; do not rewrite sound artifacts merely
  because earlier reviews were incomplete.
- **Predominantly `external-state`:** stabilize, refresh, or reassign the
  external input before correcting the selected change.
- **Predominantly `reviewer-error`:** correct the disposition from authority
  evidence without manufacturing implementation work.
- **Predominantly `carried`:** obtain the missing owner decision or enforce the
  existing component-level repair stop.

Material findings remain blocking. Any exceptional batched correction and
confirmation after the threshold requires an explicit human decision and the
current workflow's authorization; it is not a continuation of an automatic or
ordinary loop. Exhaustion is recorded as evidence, not disguised as failure or
success.

### Decision 11 — External and shared state remain outside candidate-local repair

Verify that supposedly independent parallel changes share no mutable file,
record, generated output, or prerequisite. When a shared coordination record is
necessary, bind its identity, name one integration owner, and treat it as
read-only in candidate review unless the owner's integration update is in scope.

Record a cross-change prerequisite separately from internal task IDs with its
producer, owned artifact, authoritative availability condition, consumer,
follow-on edit or evidence, and recovery. External findings are reported once
to their owner and do not count as candidate-local convergence; an unmet
external prerequisite remains an explicit entry gate.

External thresholds, quotas, prices, capacities, version constraints, names,
and permissions carry a sanitized observation reference, date, value, and
comparison. Delivery-state corrections preserve the old claim and add dated
authority evidence rather than silently replacing history from a checkout.
Refusal and blocking premises carry the same evidence obligation as findings.

### Decision 12 — Keep deterministic checker work separate

The repeated equality failures are sufficient to permit a later Explore of a
small cross-document checker. This delivery records the manual equalities and
evaluation scenarios but builds no checker. A later proposal must choose only
stable judgment-free comparisons, provide the correction path for every gate,
and demonstrate that the machinery remains proportionate.

### Assumptions

- One substantive pass plus one confirming pass is desirable but not always
  achievable; genuine new owner decisions correctly create a new binding.
- Existing repository-specific checks and fact authorities remain configured
  by each consuming product.
- The independent-review package's current artifact list can carry the selected
  readiness and review records without a version change.
- Guidance changes may proceed from repeated retrospective evidence; automation
  still requires its own manual-use threshold and design review.

## 5. Scope, non-goals, constraints, dependencies, and risks

### In scope

The exact original file operations and baseline content are in the findings
document's
[`Proposed file-by-file implementation manifest`](../research/streamlined-independent-reviews/streamlined-independent-reviews-findings.md#proposed-file-by-file-implementation-manifest).
The implementing proposals use that manifest unchanged and incorporate the
additional controls through the decisions above.

| Owner | Planned surfaces |
| --- | --- |
| `jra-sdd-workflow` | `AGENTS.md`, `CLAUDE.md`, `docs/sdd-workflow.md`, `openspec/config.yaml`, a new `review-readiness` delta/living spec, and proportionate planning-artifact validation tests when existing behavior changes. |
| `joericearchitect-ai-skills` | `skills/base/_shared/review-readiness.md`; the planning, verification, local-review, and independent-review skills; strict and degraded Codex and Claude prompt builders; the four affected capability delta specs; and their existing fixture, scenario, prompt-parity, and adapter tests. |
| Consuming repositories | Thin assistant adapters plus project-owned authority, artifact, check, recovery, taxonomy, and correction-trigger configuration. Adoption is separate from the two owning changes. |

The skills change extends the manifest's regression plan with scenarios for:

- stale base and unavailable authority;
- declared taxonomy coverage and explicit non-coverage;
- decisive set mismatch;
- correction closure, added-line defect, and newly introduced mechanism;
- carried, repair-induced, latent, external-state, and reviewer-error findings;
- below-trigger observations that do not create a cycle;
- each branch of the third-pass stop;
- external findings and unmet external prerequisites;
- shared-record ownership and history-preserving delivery correction; and
- strict/degraded prompt parity without exposing dispositions or intended
  conclusions.

### Acceptance evidence

| Outcome | Required evidence |
| --- | --- |
| Propose readiness | A fixture change produces a complete bidirectional map, durable fan-out, equality results, taxonomy coverage, prerequisite records, and owned producible evidence; omission of any material element pauses before findings. |
| Apply readiness | A fixture implementation reconciles tasks and no-edit effects, runs focused and complete checks, and supplies current closure and review evidence bound to the same identity. |
| Correction safety | Contract/scope fixtures prove survivor search, added-line review, fan-out-scoped rereview, task/evidence recheck, and targeted new-mechanism scrutiny. |
| Review coverage | Every review result declares all applicable taxonomy classes and non-coverage; an undeclared class prevents a clean conclusion. |
| Convergence | Later findings carry provenance and ownership; external findings do not create candidate-local repairs; third-pass fixtures select the cause-appropriate stop. |
| Materiality | Style-only observations below the declared trigger are dispositioned without starting a cycle, while low-labelled findings with material impact still block. |
| Isolation | Sealed prompts apply whole-contract and taxonomy review, packages remain exact and read-only, and prior dispositions or intended conclusions are not injected. |
| Portability | A second workspace supplies different paths, authorities, checks, taxonomy extensions, and thresholds without changing the canonical contract. |
| Backward safety | Existing authorization, correction-budget, package validation, result validation, and degraded-assurance tests remain green. |

Each repository runs its complete declared test and strict OpenSpec validation
suite. The current workflow repository additionally runs the delivery commands
in `AGENTS.md`. The skills repository uses its existing scenario and adapter
test suites; the proposal must resolve their exact commands from that
repository rather than copying this repository's commands.

### Non-goals

- No controller, autonomous runner, general workflow engine, or automatic
  fix-and-review loop.
- No independent-review package or result schema version change in the first
  increment.
- No automatic semantic judgment, auto-fix, or claim that zero findings is the
  definition of correctness.
- No weakening of exact-head binding, reviewer freshness, read-only isolation,
  degraded-assurance disclosure, human gates, or the current one-correction
  production independent-review boundary.
- No product-specific path, repository, board, label, branch, account, URL, or
  credential in portable assets.
- No direct edits to generated OpenSpec integrations; their owners or generator
  configuration remain authoritative.
- No deterministic checker implementation; only manual equalities and evidence
  for a later design decision.

### Constraints and dependencies

- Manual first, every gate ships with its exit, second repair means design
  review, and supporting machinery stays proportional.
- The workflow-policy change requires a primary issue and Planning-to-Apply
  remains a later gate.
- The skills change requires its own issue, authorization, and immutable
  reference to the delivered workflow policy or an explicitly reconciled
  equivalent contract.
- The consuming-repository adoption step depends on the reusable-skills change
  and must configure its own facts and commands.
- Existing dirty and user-authored files are preserved throughout both changes.

### Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| A pass cap hides defects | The third pass is an escalation, not approval; material latent findings remain blocking and are consolidated before a human-authorized response. |
| A correction trigger becomes severity gaming | Material impact categories override labels, and the trigger is fixed before pass one. |
| Taxonomy reporting becomes ceremony | Each class has a required result consumed by readiness and the stop diagnosis; omit classes that are truly inapplicable only with a reason. |
| Provenance is guessed | Bind every pass, compare against the first identity, and use `external-state` or an evidence gap when origin cannot be proven. |
| Fan-out scope is used to hide affected files | Reverse-map every listed surface and fall back to the complete bounded change when the list is missing or incomplete. |
| Host preconditions bias the isolated reviewer | Send sanitized evidence and artifacts, not dispositions or an intended conclusion; keep result reconciliation outside the sealed prompt. |
| Two owning repositories drift | Land policy first, pin its reviewed identity in the skills change, test prompt/adapter parity, and keep consuming adapters thin. |
| Guidance exists but is not executed | Prefer mechanical outputs—maps, set results, class coverage, closure records, and provenance—over exhortations to be thorough. |

## 6. Open questions and blocking decisions

No unresolved design question blocks OpenSpec Propose. The following are
delivery-time selections or later research questions and must not be invented
in the proposal:

- The primary issue URL and tracking values for each owning repository must be
  created or discovered through that repository's authorized intake flow.
- The skills repository proposal must confirm its exact complete test commands
  and current change/spec locations from its then-current default branch.
- Each consuming repository chooses its project-specific fact authorities,
  taxonomy extensions, correction trigger, evidence commands, and review-record
  locations during adoption.
- A later measured trial should record substantive and confirming pass counts,
  taxonomy non-coverage, provenance mix, correction-induced findings, external
  findings, and stop outcomes. Those measurements may refine wording but do not
  block the guidance changes.
- Any machine-readable disposition schema or deterministic checker remains a
  separate Explore after manual behavior is measured.

If an owning repository rejects the capability classification, package
assumption, or policy-first sequence during Propose, stop and return that
specific conflict to design review rather than silently splitting the contract.

## 7. Recommended next step

Proceed to two coordinated OpenSpec Propose actions from this one brief, after
the normal issue-intake and human authorization in each repository:

1. In `jra-sdd-workflow`, propose a workflow-policy change such as
   `establish-streamlined-review-readiness`, adding the `review-readiness`
   capability and the repository-owned guidance/configuration surfaces.
2. After that policy is delivered or immutably accepted as the dependency, in
   `joericearchitect-ai-skills`, propose
   `streamline-independent-review-readiness`, modifying the four existing
   capabilities, shared contract, role skills, sealed prompts, and evaluations
   named in the implementation manifest.

Each proposal should link this brief and the consolidated research rather than
copying their evidence narrative. Proposal scope should express observable
outcomes; design should bind the exact file inventory and phase flows; tasks
should place regression scenarios beside each behavior and keep cross-repository
delivery as an external prerequisite rather than an internal task ID.

Stop after Propose for planning review. Apply remains a separate explicit human
gate in each repository.
