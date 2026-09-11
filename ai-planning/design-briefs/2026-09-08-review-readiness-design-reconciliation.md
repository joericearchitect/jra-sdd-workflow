# Review readiness: design reconciliation after pass 3

Date: 2026-09-08

Status: design recommendation requested by the owner after the pass-3 handoff.
This is a separate design record, not a correction to the bound OpenSpec
artifacts, a fourth review of those artifacts, or Apply authorization. Its
self-review evidence is in the
[companion record](../review-records/2026-09-08-review-readiness-design-reconciliation-self-review.md).

## Recommendation

Keep the useful core: discover affected consumers, review their behavior,
bind the inputs, verify evidence, close findings explicitly, and return repeated
repair to design review. Rebuild the proposed contract around those operations
with fewer duplicated facts and phase-specific evidence. Stop trying to make a
growing network of repeated policy statements consistent by adding more rules
about keeping them consistent.

The operating sequence is small:

1. Establish the intended behavior, scope, authorities, and evidence owners.
2. Freeze the review inputs and establish what changed.
3. Review behavior and all applicable defect classes before choosing repairs.
4. Correct the underlying decision and all its affected consumers in one batch.
5. Verify each finding's closure and inspect the correction's new consequences.
6. Present current evidence at the existing human gate, or diagnose why it is
   still blocked.

These are manual operations within the existing lifecycle, not a new lifecycle,
controller, schema, or permission system. One substantive review and one
confirmation remain a useful target. The success condition is supported
behavior with no unresolved material defect or blocking evidence gap; a low
pass count is not a substitute.

No finite review process proves that future code has no defects. This design
instead makes a concrete promise: known material defects cannot disappear into
a closure summary, missing coverage cannot be reported as clean, and a failed
repair cannot buy another ordinary iteration merely by changing its wording.

## What the history establishes

The review used the repository's workflow, configuration, validation code and
tests, CI workflows, glossary, archived preflight work, candidate 5/7/8 original
reviews and recovery records, both preceding design briefs, research synthesis,
witness testimony, and this change's proposal, design, delta, tasks, tracking,
packet, pass 1, pass 2, correction, pass 3, and handoff. See the source register
at the end for durable entrypoints and the limits of the evidence.

| Evidence | Observed failure | Design consequence |
| --- | --- | --- |
| Preflight F1/F2/F6 and issue #8 | Assistant guidance, custom validation, and authoritative contracts disagreed. Valid documentation work could fail a gate; invalid tracking values could pass. | A control needs one authority and demonstrations of both acceptance and rejection. |
| IFL-009 | A new implementation worktree lacked uncommitted planning context. | Transfer selected inputs explicitly and verify their content before using them. |
| IFL-010 | Blank completed-task evidence passed because a whitespace match consumed a later heading. A focused reproducer caught it. | Test the observer against the failure it claims to detect. |
| Candidate 5 | A stale base generated different symptoms; a corrected rationale left its old contradiction; a new baseline task was not connected; warnings recurred without decisions. | Separate delivered facts from workspace facts; use task edges and durable finding dispositions. |
| Candidate 7 | Removing a field exposed a complete unused input pathway. Its correction introduced a shell-input hazard; later task order broke the caller before the callee was changed. | Discover consumers before choosing scope; review new mechanisms and intermediate states. |
| Candidate 8 | A shared parser had three consumers. Scope expansion introduced a second delta, missing test ownership, and a cross-change prerequisite. Later corrections left other assertions behind. | A consumer map must include error behavior and evidence production, and be audited from actual source and paths. |
| Candidate 8 recovery, C8-L | Even the post-escalation correction left a Context sentence contradicting the newly recorded external prerequisite. | Calling work reconciliation does not demonstrate reconciliation. The final artifact must be checked as a whole. |
| Paired infrastructure testimony | Reading every file still left entire defect classes unswept; several later findings were latent. Accounts used different pass-count bases. | Declare analytical coverage and count review attempts consistently; do not infer cause from totals. |
| This change, pass 1 and self-review | Local fixes became generic requirements, while the artifacts carrying those requirements remained inconsistent. | A new rule needs an operational consumer and evidence, not another copy of its wording. |
| This change, pass 2 and correction | A pre-edit surface list was treated as complete. The correction recorded closure by surface, not finding ID. | Discover affected surfaces independently of the correction list; verify closure by finding identity. |
| This change, pass 3 | The planning-only observer could not see implementation edits; evidence pointed forward; bindings ended in mutable records; live issue state disagreed. | Separate permission, observation, review input, and review output; make evidence valid at its actual phase. |

The evidence supports two distinct causes of later findings: incomplete review
coverage and repair-induced inconsistency. Stale or unavailable authorities and
concurrent shared records add a separate source of churn. Each needs its own
response. None is solved by raw finding counts, severity trends alone, or an
instruction to keep fixing until a reviewer says nothing.

## Design decisions

### D1. Give each fact one owner; make other surfaces consume it

Keep the repository's ownership split and remove unnecessary policy copies.

| Owning surface | Content it owns | Other surfaces do |
| --- | --- | --- |
| Accepted delta, then living `review-readiness` spec | Observable requirements, default review classes, materiality, finding and stop semantics | Link to stable requirement titles; do not quote the complete lists. |
| `docs/review/adversarial-review.md` | How to assemble, review, correct, and confirm; compact packet and result examples | Link to the procedure. The method links the normative policy supplied by the packet. |
| `docs/sdd-workflow.md` | Where the procedure enters the existing human gates and lifecycle; repository authorities | Link from gate rows to the procedure; do not reproduce its taxonomy or finding format. |
| `AGENTS.md` and `CLAUDE.md` | A short, identical routing block and qualification beside validation commands | Direct the role to the packet and method. Do not enumerate the policy sets again. |
| `openspec/config.yaml` | Short authoring and Apply obligations in existing lists | Require the outputs and point to their owner; no new keys or semantic validator. |
| `design.md` | Change-specific decisions, consumer map, phase ownership, prerequisites, and recovery | Refer to task evidence and tracking paths rather than duplicating them. |
| `tasks.md` | Ordered work and each task's expected/produced evidence | Refer to the governing decision and requirement. |
| `tracking.yaml` | Implementation-repository path inventory and GitHub linkage | Use the path set by reference and give its paths phase meaning in the design. |
| Review packet and review records | Input identity/index; observed review results and finding history, respectively | Keep an index of results, not an evolving prose retelling of all prior passes. |
| Glossary | Short explanations of terms | Link to policy for operational rules; do not repeat counters and complete decision trees. |

Exact equality remains appropriate for the two assistant routing blocks and
for genuinely identical sets. It is not appropriate between a prose summary
and a file inventory, or between a planned Sync path and files already edited
during Apply. A harmless summary need not reproduce every detail. A summary
that changes permission, behavior, or evidence remains a material defect.

Keep a small assertion fan-out only for facts that must be repeated, with the
owner and dependent locations. Do not maintain a registry of every repeated
sentence. Correctors audit that registry against the complete bounded change;
its existence never establishes its completeness.

Historical briefs remain historical design input. Record consequential changes
in intended behavior and their rationale, rather than requiring a catalog of
every word that differs from every earlier draft. No new design may demote
governing policy or claim owner approval merely by calling an input superseded.

### D2. Separate reviewed content, permitted edits, observed changes, and outputs

These are different sets with different consumers.

| Set | Meaning | Check |
| --- | --- | --- |
| Review inputs | Artifacts, source, tests, governing policy, and material external observations needed to assess the selected behavior | Every needed input is located and identified; contextual read-only input is not edit permission. |
| Authorized mutations | Files and operations the current phase may change under existing authority | Task effects and resource operations fit that authority. |
| Observed changes | Independently enumerated differences from the recorded starting state | Every changed entry is within the authorized set, or is a recorded external change that invalidates the affected comparison. |
| Review outputs | The current review record and its evidence | They are written outside the frozen input set and become inputs only to a later review. |

For this change, Propose permits its planning artifacts and named review/design
records. It does not permit glossary implementation. Apply permits its guidance
and glossary paths plus routine task-evidence, packet, and review-record
updates. Sync owns the living-spec creation after implementation delivery.
Resource registration is a separate authorized operation with its existing
register and inspection evidence; file-diff evidence does not prove it occurred.

`tracking.yaml` can continue to contain the union of implementation and Sync
paths. The design maps each path to its owning task or lifecycle stage. At
completion every planned path has a delivered edit or an explicit reconciled
no-edit decision; an allowed path is never a requirement to make a pointless
edit. Planning files and review records are accounted for separately from
that inventory. A proposed expansion is reviewed before it becomes permission.

The boundary assertion is:

> Within the declared observation domain, entries outside this phase's
> authorized mutation set have the same content, type, and relevant mode as
> the captured starting state.

It is not a claim about every filesystem event, every external system, or all
activity since the repository began. Without a starting observation, historical
preservation is unknown. Capture a baseline for subsequent work instead of
inventing retrospective proof.

### D3. Observe the full relevant workspace before filtering by ownership

For a Git repository, use complementary observations from the repository root:

- The diff between the recorded base and current head exposes committed work.
- Staged and unstaged diffs expose work not represented by that head.
- An expanded untracked-file inventory exposes individual new files, including
  files below untracked directories.
- Content fingerprints distinguish a new edit to a file that was already
  modified or untracked at entry. Preserve type and relevant mode as well.
- Explicitly classified ignored paths, symlinks, submodules, and operational
  records receive the observation appropriate to what they contain.

The ordinary Git pieces are `git diff <base> HEAD`, `git diff --cached`,
`git diff`, `git status --porcelain=v1 --untracked-files=all`, and
`git ls-files --others --exclude-standard`. Use `-z` forms when consuming path
output programmatically. These commands answer different questions; status
alone is not a content identity. See the official
[status](https://git-scm.com/docs/git-status),
[diff](https://git-scm.com/docs/git-diff), and
[file inventory](https://git-scm.com/docs/git-ls-files) references.

Use the union of before/after inventories so deletion, rename endpoints, and
type changes cannot disappear. Compare staged content too: a staged change
reverted only in the working file is still a pending mutation. Do not restrict
discovery to the allowlist, and do not assume an unchanged test count proves
unchanged validator code. Read the diff or compare the relevant content.

In a dirty primary worktree, capture the existing tracked/untracked state and
compare preserved entries by content. A clean secondary delivery worktree
reduces this burden but does not make transfer automatic. If another writer
changes a protected file, preserve both parties' work, identify the drift, and
rebind or isolate. Do not attribute the edit to this change without evidence.

Inside a selected change directory, recursively inventory hidden entries and
compare them with the packet. An empty directory is not executable content;
an unlisted file, symlink, or other content-bearing entry requires classification.
There is no blanket directory exemption. Generated caches may be excluded by
an exact, justified policy only when they are not inputs, deliverables, or
protected user work. Ignored status alone does not justify exclusion. Do not
follow a symlink out of scope or include secrets in a packet to satisfy a hash
rule. An unsupported or unreadable material input produces a named gap.

The assurance is the state at the observation checkpoints, under the stated
domain and no-concurrent-writer assumption. It cannot detect a transient edit
that was completely undone. That limitation does not require a filesystem
monitor: the workflow needs preservation and review identity, not an audit of
every system call.

### D4. Freeze inputs before review; write results afterward

A review snapshot identifies the base, selected current file contents, actual
manifest, policy version, materiality rule, and needed authority observations.
A new content snapshot does not reset the review count or authorize anything.

Keep the base commit distinct from the implementation head: legitimate commits
make them different. Refresh relevant delivered-state and external observations
at a phase handoff and immediately before an action that depends on them. A
moving default branch prompts a relevance/reconciliation check, not automatic
destruction of a valid snapshot or an inference that the implementation head
must equal the default branch. A deliberately pinned older base must be explicit
and supported by the applicable compatibility decision. If that decision is
missing, preserve work and withhold the dependent readiness claim.

For committed content, use immutable commit/blob identities. For uncommitted
content, retain an exact copy for the review and bind it with content digests.
The original remains untouched. The packet is itself an input and is included
in that binding. A digest identifies bytes; it does not preserve them.

The review record is created with a start header before analysis. That header
records the frozen packet's digest and input location/identities. Results and
dispositions are then added to that output record. The packet does not hash the
current result, and the current result does not need to hash itself. After
completion, a later packet may reference that completed record by digest or
commit. This is a forward-moving history, not mutual hashing of live files.

Retain uncommitted snapshot material for the current review and corrections that
need it. For later handoff, retain required bytes in the configured evidence
location or prove they match a committed object and reference it. If old bytes
were never retained, record unavailable historical evidence; do not reconstruct
them from a present file or a digest. Unknown historical provenance does not
prevent verifying current behavior, but it cannot support a claimed historical
closure or a counter reset.

Outputs such as result text and raw check logs are kept outside frozen inputs.
If a task-evidence update changes a reviewed file, prepare a successor snapshot
and confirm the exact delta. A bookkeeping-only update can receive a focused
local confirmation if it changes no assertion, permission, or evidence meaning;
it still cannot inherit an exact-head independent result for a different head.
Avoid another result-written-inside-its-own-input cycle.

At review completion, verify that the input identities still match. A review
interrupted by drift retains its findings against the old snapshot, but provides
no clean conclusion for the new content. Resume on the same frozen snapshot
when possible. A missing packet stops readiness assembly; useful diagnostic
observations may still be recorded without being presented as a completed review.

The uncommitted-snapshot procedure is for local review. The installed independent
review protocol resolves artifacts from regular Git blobs at the exact committed
head. It does not accept a scrubbed working-copy substitute for those blobs.
Complete and commit the authorized implementation inputs before requesting that
review; keep its host-owned result outside the reviewed head. If a later edit
changes the head, the selected protocol requires a fresh result.

Preserve the configured independent-review runtime, fixed request, and result
validation unchanged. Do not inject conversation history, prior verdicts, or an
intended conclusion into the review request. Put current finding dispositions
in the host's separate reconciliation record. Historical repository documents
can still exist in an exact-head repository view; do not claim that the runtime
makes those bytes inaccessible. The present proposal's stronger blanket claim
about withholding all historical material needs explicit correction at design
acceptance. A requirement for a history-blind view would need an adapter that
actually enforces it in its owning repository, not a local instruction to ignore
visible files. If a selected profile requires an unavailable boundary, record
unavailability and pause that gate; do not substitute self-review or relabel a
weaker result. The normal human-only closure option remains governed by the
existing workflow and is never selected on the owner's behalf.

### D5. Make coverage demonstrate behavior and evidence producibility

Retain the existing default defect classes in the normative contract. For each
class the result states the inspected subjects and evidence, plus one of:
`swept-clean`, `findings`, `not-applicable` with reason, or `incomplete` with the
missing subject and recovery. Naming all classes without evidence is insufficient.
An incomplete class cannot support a clean overall conclusion.

The consumer map is a compact set of links: affected behavior and failure mode,
requirement/decision, implementing task or justified no-edit decision, and
verification/recovery owner. Keep detailed task evidence in `tasks.md` rather
than writing it again in every map row. Reviewers independently discover
consumers from imports, callers, workflow inputs, documented interfaces,
configuration, and actual changed paths, then compare that set with the map.
The author's own list is a hypothesis to test.

For each material evidence claim, establish:

1. what observable result would distinguish correct from incorrect behavior;
2. which command, test, inspection, or external observation can distinguish it;
3. who produces it, where its input comes from, and when that input exists;
4. where the result is recorded and what happens if it fails or is unavailable.

At Propose, implementation results do not yet exist. Check that their producer
and prerequisites are feasible, and use a small reversible probe where the
observer itself is uncertain. At Apply, require actual results from the reviewed
implementation. An inspection of planned text is not execution evidence.

When introducing or repairing an evidence method, exercise a conforming case
and the relevant known-bad case in a disposable fixture. For this boundary
observer, an outside edit must be detected while a permitted planning edit is
accepted. For a gate, also demonstrate its recovery. This is a targeted manual
exercise, not a requirement to write a new test framework for documentation.

For code changes, retain behavioral regression tests and normal code/security
review. The process taxonomy supplements them. Review each changed data/control
path, error behavior, compatibility consequence, and relevant security,
concurrency, or performance risk; a map of files cannot establish code correctness.
If a correction changes mechanism, scrutinize its new trust boundaries and
failure modes before declaring the original finding repaired.

### D6. Record closure by finding ID, with separate ownership and cause

Each verified problem receives one stable ID. A repeated observation of the
same problem refers to that ID, even when its wording or location differs.
Aliases preserve historical IDs. Findings state the problem, impact, evidence,
constraint, subject, and repair owner. Suggestions remain advisory.

Use explicit statuses in ordinary Markdown:

| Status | Meaning for readiness |
| --- | --- |
| Open / correction planned | The problem remains. |
| Corrected, unverified | An edit exists; closure has not been demonstrated. |
| Verified closed | Evidence against the successor snapshot demonstrates the problem is gone and the correction's consequences were checked. |
| Rejected with evidence | The claimed defect is disproved; retain the reasoning. |
| Superseded | A recorded accepted decision or duplicate replaces this item; name the successor and account for the old impact. |
| Accepted risk | A specifically authorized residual risk remains; name owner, scope, reason, and revisit condition. This is not defect-free evidence. |

An owner saying "accept the finding" means acceptance of its validity, not
acceptance of its risk. A material deferral or generic "owner disposition" does
not by itself satisfy a gate. The active profile must permit the particular
risk acceptance, and the owner must actually make it. Otherwise the gate stays
blocked. Non-material observations can be recorded and deferred without another
correction cycle. The materiality rule cannot be raised to make findings vanish.

Retain historical provenance labels when reading old records. In a new record,
distinguish three questions even if they share one compact table: does the
problem still exist, who may repair it, and what evidence explains its origin?
`external-state` describes ownership; `carried` describes persistence; neither
erases a repair-induced cause. An unknown origin remains unknown. Do not split
one actionable problem into artificial defects merely to fill mutually
exclusive labels. A reviewer error is corrected with evidence, not implemented.

Before a correction, group findings by the underlying decision/claim and list
its known consumers. Afterward, record each finding ID, inspected surfaces,
changes/no-edit reasons, verification result, and new consequences. Independently
inspect all added lines and revisit the complete bounded change for omitted
consumers. A full scope/design repair gets full applicable review coverage;
focused local confirmation is appropriate only when the impact is demonstrably
bounded and existing workflow limits allow it.

Historical finding records remain unchanged. A later reconciliation record owns
the current per-ID status and links the historical evidence. The packet points
to that record, avoiding a second narrative that can stop at pass 1.

### D7. Use the existing stops as diagnosis points with concrete exits

Count review evaluations by selected change, phase, and approved intended
behavior. Number the review when analysis begins on a bound input; completion
does not erase an incomplete or interrupted evaluation. A continuation of the
same review on the same frozen input retains its number. Checks, explanation,
and correction preparation are not review passes, but their findings and
repair attempts remain recorded.

A second repair to the same claim requires design review before that repair.
A recurrence of its defect class after the first correction also triggers that
review. The component is the behavior/decision carrying the claim, not a line
number; a shared table is not automatically one component. Do not let an
"incomplete first correction" label permit indefinite additional repairs.
The whole-change threshold catches repeated failure across different claims.

The third evaluation triggers diagnosis before further ordinary correction or
a fourth review. An unavailable authority must not make diagnosis itself
impossible: finish the available sweep, identify the remaining gap, and act on
causes already established. Do not delay an already-proved second-repair stop
until every unrelated external check succeeds.

| Condition | Response and exit |
| --- | --- |
| Repeated or repair-induced failure | Revisit the failed decision, observer, or correction method; record a concrete design and its verification cases before another authorized repair. |
| Previously unswept behavior | Complete the missing review; batch the resulting material problems without rewriting sound content. |
| External drift or unavailable prerequisite | Preserve local evidence, name the external owner and dependent gate, and resume that check when the required fact is available. |
| Incorrect reviewer premise | Correct the finding from authority evidence; no compensating product edit. |
| Missing owner decision | Present the concrete choice, consequence, and existing evidence to that owner. |
| No material defect or blocking gap remains | Present the current result at the existing human gate; the threshold is not a demand to manufacture more work. |

Apply all relevant responses, with design reconciliation before dependent edits.
Use causes, not the majority of provenance labels. External ownership never
authorizes a local workaround or hides a blocking prerequisite, but an unrelated
external record does not prevent useful local analysis.

Record the intended behavior and evidence for an owner-approved redesign. A
changed digest, a renamed claim, a new session, or an accepted fix is not a
counter reset. A genuinely changed owner decision can establish a new review
series, explicitly carrying prior findings and unchanged component repair
history. It cannot silently relax stricter active limits. The current change's
pass-3 stop remains in force until the owner accepts a reconciliation; this
recommendation and its draft self-checks do not reset it.

### D8. Make the transfer, phase sequence, and rollout executable

Preserve the existing implementation task IDs when the accepted design is
applied to planning. Replace their dependencies and evidence as one checked
graph. Move the existing delivery task 5.1 into the subsequent lifecycle handoff,
retaining its old ID as a historical reference rather than an unchecked Apply
task:

`0.1 → 2.3 → 2.2 → 1.1 → 1.2 → 2.1 → 3.1 → 4.1 → 4.2 → 4.3`

| Task/stage | Completion evidence available at that point |
| --- | --- |
| 0.1 | Existing human/campaign gates permit Apply; branch/worktree registration passes; the inspected base is current; selected uncommitted planning inputs and IF-4 glossary contributions have an explicit source, transfer selection, and verified destination. Other primary-worktree content is preserved. |
| 2.3 | Reconcile the transferred glossary contributions, add remaining accepted terms, and verify unique definitions and permitted cross-references. |
| 2.2 | The standing method and examples exist and can be read using the packet's policy reference. Its own checks do not require links added by later tasks. |
| 1.1 / 1.2 | Thin assistant entry blocks point to the existing method and compare equal. |
| 2.1 | Workflow gate references and lifecycle guidance resolve; this task owns the new workflow-to-method link check. |
| 3.1 | Existing configuration lists gain only the accepted short rules; parsed keys and existing rule content are preserved. |
| 4.1 | Reverse consumer coverage, necessary equalities, phase ownership, task reachability, evidence timing, and citation accuracy are checked against the complete change. |
| 4.2 | Required repository checks and the Apply boundary comparison have current results. No Sync result is claimed here. |
| 4.3 | The frozen implementation packet has a complete local review/confirmation result, and every material finding or gate is accounted for. Negative packet exercises use disposable copies. |
| Delivery, formerly 5.1 | After the existing closure gate, exact-head implementation delivery has the issue link and OpenSpec marker. This is subsequent lifecycle evidence, not a condition for completing Apply. It does not claim the future living spec already exists. |
| Sync / Archive / lifecycle delivery / cleanup | Existing owners and gates supply their own evidence. Sync creates the living spec; archive/link relocation is checked before lifecycle-record delivery; exact registered resources are cleaned only under the existing procedure. |

All implementation tasks can therefore finish before Verify and the closure
gate. The old C5 row's Sync evidence is owned by Sync, not by 4.2. Neither a
merged PR nor a living spec produced after delivery is required to authorize
that same delivery. Task 4.3 may record its completed local review, then receive
a focused confirmation of that bookkeeping delta outside the input set. A
selected independent review is run after the final implementation head exists;
its result does not require another edit to that head.

If the destination base differs from the transfer source, reconcile the selected
hunks with that base and review the resulting content; do not overwrite whole
glossary files or copy the whole primary worktree. If the supplied contribution
is missing, preserve the source and stop that dependent task. Existing IF-4
text remains source material, not evidence that Apply was previously authorized.
Preservation does not mean retaining a demonstrated error in the eventual
deliverable: after design acceptance, the selected, not-yet-delivered additions
may be reconciled with the actual independent-review contract. Preserve their
source and rationale, delivered definitions, and unrelated edits. An edit to
already-delivered definitions outside the accepted allowance needs a separate
scope decision. A failed resource registration or unavailable permission pauses
dependent work through the existing gate; it is not permission to use an
unregistered substitute.

The new method can initially read the accepted delta identified by the packet.
It must not require a living spec that only Sync will create. After delivery,
future packets use the delivered living policy. A missing method during this
change's own planning review is handled by an explicitly bound bootstrap
procedure from the accepted design; it is not an unexplained missing link.

Older in-flight changes remain exempt until their owner begins a review under
the delivered contract. That review binds their current inputs, records actual
prior history and unknown coverage, and applies the new method prospectively.
Do not retrofit or invalidate unrelated records. Downstream skills and adopting
repositories consume this policy through their own changes; their delivery does
not block this repository's policy work.

Keep the existing capability classification: a valid documentation-only change
with `skip_specs: true` has no invented delta or Sync result. Its packet records
that applicability decision and still supplies its actual proposal, design,
tasks, tracking, and review evidence. A durable capability is classified from
its observable contract, not from whether its implementation happens to be
Markdown. Unclear classification returns to Explore under existing guidance.

### D9. Keep the implementation small and test it manually

No validator, validator-test, schema, generated integration, reusable skill,
campaign ledger, or unrelated change is added to this implementation scope.
The delivered additions are policy, one method, thin links/rules, and glossary
terms. The packet and review records use Markdown and existing locations.

Do not add a universal semantic checker to this repair. Repeated deterministic
failures justify a separately scoped checker design later, but removing
unnecessary equalities first makes its possible job smaller and better defined.
Use existing tools for manual comparisons and retain their bounded results.

Before implementation delivery, replay representative historical cases and a
small first-use packet exercise. Record which mechanism catches each defect,
including the negative controls for the observer. After delivery, use the next
owner-selected real change to measure whether material findings appear earlier,
whether corrections introduce new problems, and whether the procedure is small
enough to follow. These are measured outcomes, not promises based on retrospective
estimates. A failed trial returns the responsible decision to review.

Rollback also follows dependencies. Before delivery, revert only authorized
change-owned edits while preserving baseline user work and the evidence of the
attempt; remove or restore inbound links before removing the method they use.
After delivery, restore or revise the contract through an explicitly scoped
follow-up with its own gate evidence, including a justified delta when the
living capability changes. Do not delete a policy still used by another change,
silently switch a selected review profile, or discard findings to make rollback
look clean. If existing consumers cannot be preserved under the available
authority, stop the dependent action and request the required scope decision.

## Migration of this change

The current artifacts are not changed by this recommendation. Acceptance should
authorize a deliberate design revision, not claim that the old identity passed.

1. Accept or revise D1–D9, especially the phase boundary and observer design.
   Record that decision before editing the proposal, delta, design, tasks, or
   packet. Keep the existing materiality standard and human gates.
2. Reconcile issue #33 under its owner's authorization. Its update must cover
   the changed acceptance language as well as scope; see the concrete draft
   below. A local recommendation is not a GitHub update.
3. Create one per-ID reconciliation record for the current historical findings.
   Use the coverage table below as the obligation list. Verify current evidence
   before changing a status; record supersession only for an actually accepted
   change in behavior. Preserve the historical review records.
4. Revise the bounded artifacts as one batch: remove redundant normative lists,
   add the phase map and independent observer, correct evidence timing and
   transfer, simplify the packet, and link the authoritative finding record.
   Keep sound requirement scenarios and unaffected rationale.
5. Check the complete resulting artifacts against the historical cases and the
   scenario matrix in the self-review record. Rebind all review inputs, run the
   required validations, and obtain the authorized confirmation. A new material
   problem is diagnosed under the existing stop, not hidden as bookkeeping.
6. Present the actual revised packet at Planning-to-Apply. Design acceptance,
   artifact validation, implementation authorization, and implementation
   correctness remain distinct evidence.

Consequential changes to the current proposal are intentional: replacing
verbatim member-list replication with references; limiting fan-out to necessary
restatements; distinguishing snapshots from review series; removing circular
result binding; admitting explicit incomplete coverage; separating ownership,
persistence, and causal provenance; and making owner dispositions specific.
The independent-review statement is also aligned with the actual committed-blob
protocol and its enforced visibility, and delivery evidence is moved beyond
the gate that authorizes delivery. These replace demonstrated sources of
ambiguity. They do not excuse a missing
consumer, an unobservable check, an unexplained scope change, or an open material
defect under the existing contract.

### Proposed issue #33 replacement sections

Retain the issue's problem statement and non-goals. Replace its Desired outcome,
Scope, Acceptance criteria, and Verification plan with the following substance
when the owner authorizes that external edit. Preserve unrelated human text.

**Desired outcome:** One manual review-readiness contract for Propose and Apply
that binds review inputs, discovers consumers in both directions, checks
evidence at its producing phase, records findings and demonstrated closure,
and diagnoses repeated repair without permitting an ordinary fourth loop.

**Scope:** The implementation inventory is
`openspec/changes/establish-streamlined-review-readiness/tracking.yaml`, field
`implementation_repositories.paths`. Its design assigns each listed path to
implementation or post-delivery Sync. The selected change's planning artifacts
and named review records are separately scoped planning/evidence work. Existing
uncommitted glossary contributions are preserved and transferred explicitly
when Apply is authorized. This is no authorization to change other work.

**Acceptance criteria:**

- The accepted delta defines phase-specific inputs, scope observation,
  coverage, finding closure, and diagnosis, with positive, negative, failure,
  and recovery scenarios; Sync later delivers the living capability.
- The standing method provides the manual procedure and examples. Assistant
  blocks, workflow gate references, and existing configuration lists point to
  their owners without copying complete policy sets.
- Each newly reviewed change has a discoverable packet. Older changes adopt
  it when their owner begins a post-delivery review; this change retrofits none.
- Review inputs include uncommitted content identities and actual manifests;
  review output does not participate in its own input binding.
- Evidence is possible at the named task/phase. The boundary comparison detects
  committed, staged, unstaged, untracked, and relevant hidden/ignored changes
  within its declared domain, including changes to already-dirty files.
- Every historical material finding has a verified or specifically authorized
  per-ID outcome. A risk acceptance is disclosed and cannot be called a fix.
- Glossary contributions are preserved; definitions remain unique; reviewer
  isolation is verified under the selected review profile, and its actual
  history visibility is described accurately. Local uncommitted review is not
  represented as compatible with a committed-head independent package.
- Existing human gates, correction limits, independent-review isolation, and
  portability requirements remain effective.

**Verification plan:** Run the existing repository checks; replay the recorded
historical failures and boundary-observer controls; exercise packet assembly,
review, correction, and confirmation manually. Verify links and the few actual
equalities that remain. Record gaps separately from passing evidence.

## Historical finding coverage and required closure evidence

This is a resolution map, not a disposition of the old findings. The pass-2 and
pass-3 findings remain open in their original records. A design recommendation
alone closes none of them.

| Pass-3 ID | Decision | Evidence required after artifact revision |
| --- | --- | --- |
| `p3-glossary-stranded` | D8 | 0.1 names selected planning and IF-4 source material, verified transfer, preservation, and conflict recovery before 2.3. |
| `p3-boundary-observer` | D2–D3 | Propose and Apply have different allowed sets; known outside and already-dirty edits are detected by the stated observer. |
| `p3-prior-findings-stale` | D6 | Current reconciliation covers each historical ID and is the packet's sole current-status reference. |
| `p3-correction-record-unbound` | D4 | Every relied-on uncommitted input, including a correction/decision record, has an identity and retained bytes where needed. |
| `p3-manifest-unproducible` | D2–D4 | A current actual manifest exists at Propose; it does not point to future task 4.2. |
| `p3-task-0-1-unmapped` | D5, D8 | Branch/worktree registration and selected-input transfer have map rows, owners, inspection evidence, and recovery. |
| `p3-2-2-forward-evidence` | D5, D8 | 2.2 owns method creation; 2.1 owns its later workflow link; no task evidences a successor's result. |
| `p3-boundary-not-on-fanout` | D1–D3 | Packet links the authoritative boundary; any necessary repeated set is included in the audited fan-out. |
| `p3-issue-authorization-survives` | D1, D6 | No current status claims broader historical issue authorization; old/new scope decisions are separately evidenced. |
| `p3-index-digest-window` | D4 | A start header binds the packet before review; completed output becomes input only afterward. |
| `p3-brief-divergences-unlisted` | D1, migration | Owner accepts the consequential design changes; accurate citations replace the impossible exhaustive prose-difference obligation. |
| `p3-config-paraphrase` | D1 | Classification states the config's durable-capability criterion and its “by themselves” qualification accurately. |
| `p3-c17-requirement-ids` | D1, D5 | The method's requirement links cover actual served behavior, including reviewer-kind/isolation. |
| `p3-dir-carveout` | D3 | Recursive inventory accepts empty organizational directories and detects unlisted hidden content. |
| `p3-issue-path-prose` | D1–D2, issue draft | Owner-approved issue scope references the authoritative inventory and its lifecycle partition; no invented prose/path equality. |
| `p3-issue-index-criterion` | D8, issue draft | Issue and accepted contract carry the same prospective-adoption rule. |

| Pass-2 ID | Decision | Evidence required after artifact revision |
| --- | --- | --- |
| `rr-divergence-count` | D1 | No policy decision relies on a manually repeated count. |
| `rr-glossary-set-stale` | D1, D8 | Glossary scope, transferred contributions, task, and actual diff agree. |
| `rr-workstate-fanout` | D1–D2 | Actual issue scope is checked against its referenced inventory and accepted behavior. |
| `rr-member-quote` | D1 | Verbatim replication obligation is deliberately replaced, and indexes locate all actual required inputs. |
| `rr-index-locates-members` | D4–D5 | A reviewer reaches every needed input and detects a missing one from the index. |
| `rr-index-unbound` | D4 | The packet itself is bound before review begins. |
| `rr-context-delivery-claim` | D2, D8 | Committed inputs and uncommitted contributions are identified separately. |
| `rr-status-vacuous` | D2–D3 | Observation covers actual content and both phase boundaries; administrative writes are accounted for. |
| `rr-testimony-claims` | D1 | Source wording and uncertainty remain accurate; no inferred claim is presented as testimony. |
| `rr-no-transition` | D8 | First adoption of a new or older change has a producible packet and explicit coverage history. |
| `rr-testimony-latent-estimate` | D1 | Estimates stay estimates and preserve their stated basis. |
| `rr-dangling-method-link` | D8 | Method exists before new inbound links; policy input works before living-spec Sync. |
| `rr-quote-equality-unchecked` | D1, D5 | Every retained equality has an actual check; obsolete replication is explicitly retired. |
| `rr-issue-authorization-scope` | D6, issue draft | Current authorization is cited only for its actual scope. |

| Earlier identities | Retained lesson and disposition treatment |
| --- | --- |
| `IF-1`, `rr-authority-brief`, `sr-generic-authority` | Source ownership and truthful attribution; consequential supersession needs an actual decision. |
| `IF-2`, `rr-c11-path-count`, `sr-generic-set-not-count` | Prefer the authoritative inventory to repeated counts; check substantive claims against it. |
| `IF-3`, `IF-4`, `rr-glossary-rewrite` | Preserve contribution history and phase authorization; transfer exact selected work before reconciliation. IF-3's old “unmodified” statement is historical, not present state. |
| `rr-component-stop`, `sr-component-not-narrowing` | Keep the repeated-repair stop, define its claim, and preserve stricter active limits. The pass-2 ambiguity is overtaken by pass 3's concrete observer recurrence. |
| `rr-issue-scope`, `sr-generic-work-state` | Owner-controlled scope must agree with accepted behavior; a finding is not permission to edit the issue. |
| `rr-fanout-table-split`, `sr-generic-register-legible` | Necessary maps are readable as complete sets and audited independently. |
| `rr-gates-map`, `sr-generic-task-map` | Every operational mutation and task has a consumer; permissions agree across task and map. |
| `rr-ten-members` | Locate required inputs once; retire the additional rule demanding multiple verbatim enumerations. |
| `rr-index-stop-condition`, `sr-generic-stop-condition` | Both a conforming packet and an invalid one exercise the readiness check. |
| `rr-c10-requirement-ids`, `sr-reviewer-kind` | Accurate requirement links and explicit assurance kind; no claim of independent review from an ordinary session. |

The two review gates remain different from finding closure: external issue
alignment and Apply authorization cannot be manufactured by this table. The
four unrelated active changes, their resources, the campaign records, and the
pre-existing to-do edit remain outside this repair.

## Alternatives and limits

Another surface-list patch is inexpensive but repeats the mechanism that failed
in pass 3. A complete rewrite of every artifact would discard sound behavior
and multiply new assertions. A general validator or controller would expand
scope before this manual contract is stable. A hard cap alone stops effort but
cannot establish quality. The selected design changes the failing structure,
keeps sound requirements, and verifies concrete counterexamples.

This repository's validators remain useful structural/regression checks. They
do not prove task reachability, evidence truth, semantic equality, or consumer
completeness. The current artifact validator reads the artifact-rule JSON and
checks literal headings/metadata and broad requirement shape; new config prose
does not add automated enforcement. Manual review evidence remains necessary.

Review history is incomplete at some old uncommitted identities, and external
retrospectives are self-reports. Predictions that earlier runs would become two
passes are hypotheses. This recommendation does not certify those counterfactuals
or claim that an isolated review of this design has occurred.

## Source register

- [Pass-3 handoff](../handoff-docs/2026-09-08-review-readiness-pass-3-handoff.md),
  [pass 3](../review-records/2026-09-08-establish-streamlined-review-readiness-pass-3.md),
  [pass 2](../review-records/2026-09-08-establish-streamlined-review-readiness-pass-2.md),
  [pass-2 correction](../review-records/2026-09-08-establish-streamlined-review-readiness-pass-2-correction.md),
  and [pass 1](../review-records/2026-09-08-establish-streamlined-review-readiness-pass-1.md).
- [Current change artifacts](../../openspec/changes/establish-streamlined-review-readiness/),
  [workflow](../../docs/sdd-workflow.md),
  [configuration](../../openspec/config.yaml), and
  [artifact validator](../../scripts/validation/validate-openspec-artifacts.mjs).
- [Preflight disposition](../review-records/2026-09-03-dogfood-preflight-review-disposition.md),
  [friction log](../notes/issue-and-friction-log.md), and
  [PF2 archive](../../openspec/changes/archive/2026-09-05-align-artifact-quality-gates/).
- [Candidate 5 retrospective](../research/streamlined-independent-reviews/streamlined-independent-reviews-findings-delta-reviewer-candidate-5.md)
  and [reconciliation](../review-records/2026-09-08-candidate-5-planning-reconciliation.md).
- [Candidate 7 retrospective](../research/streamlined-independent-reviews/candidate-7-reviewer-delta-to-streamlined-independent-reviews-findings.md),
  [stop analysis](../research/streamlined-independent-reviews/candidate-7-reviewer-excessive-loop-prevention-delta.md),
  and [recovery](../review-records/2026-09-08-candidate-7-planning-recovery.md).
- [Candidate 8 reviewer retrospective](../research/streamlined-independent-reviews/candidate-8-reviewer-delta-to-findings.md),
  [implementer retrospective](../research/streamlined-independent-reviews/candidate-8-planning-artifact-implementer-review-loop-prevention-delta.md),
  and [reconciliation including C8-L](../review-records/2026-09-08-candidate-8-planning-reconciliation.md).
- Original candidate 5/7/8 scratch reviews were also inspected. Their durable
  conclusions are linked above; ignored scratch is not a delivery dependency.
- [Original research and later synthesis](../research/streamlined-independent-reviews/streamlined-independent-reviews-findings.md),
  [earlier termination brief](review-loop-termination.md),
  [preceding combined brief](streamlined-review-readiness-and-convergence.md), and
  [witness testimony](../notes/2026-09-08-review-readiness-witness-testimony.md).
- The installed independent-review skill's `references/protocol.md` and
  `references/result-contract.md` were inspected read-only as compatibility
  evidence, not invoked. They require regular committed artifact blobs,
  exact-head results, a fixed request, and enforced runtime isolation. This
  inspection does not certify an adapter execution or authorize a skills edit.
- Live read-only GitHub observations: [issue #33](https://github.com/joericearchitect/jra-sdd-workflow/issues/33)
  remained open in Project `Todo`, with the pass-3 scope/adoption discrepancies;
  [#8](https://github.com/joericearchitect/jra-sdd-workflow/issues/8) was closed;
  [#29](https://github.com/joericearchitect/jra-sdd-workflow/issues/29),
  [#30](https://github.com/joericearchitect/jra-sdd-workflow/issues/30), and
  [#31](https://github.com/joericearchitect/jra-sdd-workflow/issues/31) were open.
  The API returned default-branch head
  `1963c872178d3e563aa5cb8b3f4607066732a3b0`, matching local HEAD and the recorded
  base. Direct Git remote lookup failed DNS; the successful API observation,
  not that failed command, supports the remote-head claim. No external write
  was performed.
