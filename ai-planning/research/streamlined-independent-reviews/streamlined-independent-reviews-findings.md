# Streamlined independent reviews — research findings

Depth: standard  
Date: 2026-09-07

## Summary

Yes—there is useful guidance to add to `AGENTS.md`, but the highest-value
guidance is not another test command or a larger review checklist. It is a
small set of role-specific review-readiness rules:

1. planners map every affected consumer through requirement, source, test,
   task, evidence, and recovery before Apply;
2. implementers treat every correction as a fan-out change, search for all
   surviving assertions of the old fact, and rerun a whole-change consistency
   sweep before review; and
3. reviewers inspect the entire bound contract, verify findings rather than
   speculate, preserve dispositions, and stop reopening accepted or rejected
   items without new evidence.

Those rules address the review-loop causes that remain even under the user's
assumption that changes run from current files and have no shared paths or
dependencies. The evidence does **not** justify a controller, autonomous review
loop, or new general workflow engine.

One important qualification: candidates 5, 7, and 8 were planning-artifact
reviews labelled `local-review` or reviewer observations. Their scratch records
explicitly say they were not strict independent review or OpenSpec Verify.
Applying their lessons to the later independent-review gate is therefore a
strong process inference, not direct evidence that the isolated production
review protocol itself failed.

## Verified facts

- Candidate 5 took three passes with finding totals of 7, 5, and 6. Beyond its
  stale base and shared-roadmap churn, later findings included a contradiction
  left beside a corrected rationale, a new baseline task not connected to its
  dependent task, and two findings repeatedly carried because no durable
  accept-or-waive disposition existed.
- Candidate 7 took three passes with totals of 5, 5, and 3. A narrow dead-field
  removal exposed the entire dead input pathway; the first expanded design
  introduced an avoidable untrusted-input risk; later review found missing
  alternatives rationale and unsafe intermediate task order. The reviewer also
  made an incorrect campaign-status recommendation, proving that reviewer
  output must be checked against authoritative sources.
- Candidate 8 took three passes with totals of 6, 6, and 5. Every finding from
  the preceding pass was closed, but all eleven findings after pass 1 were
  created or left behind by earlier corrections. Scope widened from one parser
  consumer to three, but the change was not rebuilt from one complete
  consumer-to-coverage map.
- All planning validators passed throughout these inconsistent states. They
  checked artifact shape and existing local behavior; they did not prove
  cross-document parity, task-graph reachability, test ownership, evidence
  producibility, complete consumer coverage, or absence of contradictory prose.
- The existing workflow already requires an exact reviewed head, a fresh
  read-only independent reviewer, affected and complete validation after one
  bounded objective correction, and design review before a second repair to the
  same component.
- Current `AGENTS.md` states the second-repair rule and delivery commands, but it
  does not define role-specific semantic readiness for planning, implementation,
  or review.

## Source-reported claims

| Candidate | Immediate pattern | Non-concurrency lesson |
| --- | --- | --- |
| 5 | Corrections addressed named lines but not every assertion of the changed fact. Warnings and rejected suggestions remained live across passes. | A repair is incomplete until the old claim is absent or explicitly retained everywhere, the task graph is still reachable, and every prior finding has a terminal disposition. |
| 7 | A narrow deletion had unexamined downstream implications; the first wider solution missed the safer alternative and created an input-safety concern. | Planning must follow data and control flow beyond the named symbol, evaluate safe intermediate states, and record the real competing alternative before implementation. |
| 8 | Correct scope expansion propagated unevenly across consumers, two delta specs, tests, tasks, tracking, recovery, and reuse statements. | Scope change is an enumerable N-place edit. It invalidates a diff-only review and requires a new whole-contract pass. |

## Assistant inferences

### Root causes after removing stale and parallel-state effects

Assuming the base is current and parallel changes share neither files nor
dependencies, seven causes remain:

1. **Incomplete blast-radius discovery.** Planning started from the requested
   component instead of finding all callers, consumers, interfaces, workflows,
   tests, and documentation that assert its behavior.
2. **Local rather than semantic repair.** The implementer fixed the reported
   location but did not enumerate every other expression of the same scope,
   contract, rationale, or dependency.
3. **Incremental reviewer framing.** Later passes checked the latest patch
   instead of rebuilding the complete behavior-to-evidence model. Untouched
   lines became wrong when scope changed elsewhere.
4. **Unproducible or vacuous evidence.** Tasks named checks that skipped the
   relevant fixtures, required a test file with no owner, or described a result
   shape the implementation did not expose.
5. **Task graph and intermediate-state defects.** New prerequisite tasks were
   not referenced by dependents, and edit ordering could temporarily break the
   change's own CI path.
6. **Reviewer speculation and over-prescription.** An untested concern consumed
   a pass, while implementers twice found a better correction than the proposed
   patch. Findings should state verified problems and constraints, not mandate a
   particular edit unless the contract leaves only one safe resolution.
7. **No durable terminal disposition for non-fixes.** A warning, accepted risk,
   rejected claim, or owner decision can be rediscovered indefinitely when its
   reason lives only in chat.

### Why contradictions appear late

The OpenSpec artifacts intentionally restate scope at several altitudes. That is
useful for human comprehension, but a change can assert the same fact in the
proposal, design, delta specs, tasks, `tracking.yaml`, tests, source comments,
and a campaign record. Correcting only one assertion creates a delayed
contradiction even when no file is stale.

The recurring failure was not merely “the model missed a line.” The workflow
did not require the planner or implementer to enumerate the assertion set before
editing, and did not require the reviewer to compare those sets as a first-pass
matrix.

## Source contradictions and inconsistencies found

The sources themselves demonstrate why an authority check belongs in the
guidance:

- The candidate scratch records classify the work as same-session or direct
  local review and explicitly disclaim independent-review assurance. The
  friction log appropriately uses them as observations transferable to future
  independent reviews. Future summaries should preserve that distinction.
- Candidate 7's third review recommended marking candidate 4 `Done`; the later
  friction-log synthesis rejects that conclusion because default-branch
  delivery and machine-local cleanup were different facts. “Delivered” and
  “cleanup complete” must not be collapsed into one status claim.
- Candidate 5's review initially treated cleanup evidence as unavailable from
  its workspace; the later implementer observation records that a machine-local
  receipt existed. A checkout cannot be the source of truth for machine-local
  evidence.
- Candidate 8's successive records changed whether candidate 4 was active,
  archived, or blocked as the scope and coordination model evolved. Historical
  pass conclusions are evidence of what was reviewed then, not current state.
- Candidate 8 mixed an internal task dependency with an external delivery gate
  in one free-text `Depends on:` field. Validation accepted it, but no mechanism
  could prove that the external condition held.

These are reconcilable provenance differences, not unresolved material source
conflicts. They lead to a general rule: determine the authority for each fact
type before resolving a contradiction. In this repository, living specs own
observable requirements, `design.md` owns technical decisions, `tasks.md` owns
the implementation checklist, Git and pull requests own delivered code, CI and
Verify own check evidence, Issues and Projects own work state, archived changes
own historical intent, and cleanup receipts own machine-local cleanup results.

## Recommendations

### Planner guidance

- Build a **consumer-to-coverage matrix** before declaring planning ready. For
  every affected entry point or consumer, name the behavior and failure mode,
  source edit or explicit no-edit assertion, owning requirement/scenario, test
  file and owner, task, evidence, recovery, and any external prerequisite.
- Run the matrix in both directions: every discovered consumer must have
  coverage, and every planned file/spec/test must trace back to a real consumer
  or requirement. This catches both omissions and speculative scope.
- Search source, tests, workflows, docs, and planning artifacts for every term
  or claim whose meaning changes. If authoritative sources disagree, record the
  conflicting claims and their owners; resolve them or pause rather than
  silently choosing one.
- Prove that task evidence can actually be produced. Confirm the named test file
  exists or is created by an owned predecessor, the cited validator scans the
  relevant location, and the expected result shape matches actual code.
- Make task dependencies a graph, not an implication from file order. Plan a
  sequence whose intermediate commits keep callers and callees compatible or
  state which edits must land atomically.
- Include real alternatives and their tradeoffs, especially when a repair
  changes security, compatibility, error behavior, or workflow inputs.

### Implementer guidance

- Before requesting review, reconcile the implemented diff against the complete
  planning set and the consumer-to-coverage matrix. Do not treat passing tests
  and validators as proof of semantic consistency.
- For each correction, first classify it as local, contract-changing, or
  scope-widening. For the latter two, enumerate every assertion surface before
  editing and repeat the whole-change sweep afterward.
- Search for the old term, count, path, capability name, rationale, result
  shape, and dependency after a repair. Every surviving occurrence must be
  updated or explicitly justified as still correct.
- Check task-graph reachability and evidence ownership after adding or moving a
  task, test, path, consumer, capability, or prerequisite.
- Preserve reviewer recommendations as advisory problem statements. Implement
  the smallest solution that satisfies the underlying contract and document why
  it differs when the proposed patch is inferior.
- Hand off an exact head or content digest, changed and untracked path manifest,
  complete artifact list, current check evidence, and durable finding
  dispositions. Any content change invalidates the prior review conclusion.

### Reviewer guidance

- Start with the bound change and its authoritative sources, not the previous
  review narrative. Review proposal, specs, design, tasks, tracking, affected
  source/tests, and named operational records as one contract.
- Reconstruct or audit the consumer-to-coverage matrix on the first pass. Check
  set equality where appropriate: affected capabilities, delta-spec directories,
  tracking paths, planned edits, tests, tasks, and evidence owners.
- Proactively compare repeated claims for contradictory counts, scopes,
  statuses, paths, rationales, result shapes, dependencies, and recovery
  behavior. Resolve each against the authority for that fact type; report an
  unresolved conflict as a decision or evidence gap.
- Verify a suspected defect with repository evidence or a cheap reversible
  probe. Label anything not verified as a gap or assumption, not an actionable
  defect.
- Report the problem, impact, evidence, and constraints. Keep a suggested fix
  advisory unless the governing contract makes it mandatory.
- Give every finding a stable ID, severity, disposition, subject, and evidence.
  Read prior dispositions as evidence: do not reopen accepted, waived, rejected,
  or owner-decided findings without new evidence.
- A scope-widening or contract-changing repair requires a fresh whole-change
  review. A truly local repair may receive focused confirmation, but the current
  exact-head independent-review policy still requires a fresh reviewer result
  for the new head.
- Do not use raw finding count as the convergence signal. Track whether prior
  material findings closed, the highest remaining severity, and whether any
  unresolved item needs human judgment. Zero stylistic observations is not a
  useful gate.

### Proposed concise `AGENTS.md` text

This is the recommended portable wording for a repository that consumes the SDD
framework. It is intentionally compact. The canonical matrix, finding rules,
and source-authority behavior belong in the shared workflow contract; each
repository supplies only its own artifact paths, evidence commands, and fact
authorities through project guidance or configuration.

```markdown
## Review readiness

- **Planners:** Before Apply, trace every affected code, documentation,
  configuration, workflow, interface, or external-state consumer from
  observable behavior through source edit or explicit no-edit decision,
  applicable specification, test or inspection owner, task, evidence, and
  recovery. Check the map in both directions and make task dependencies and
  safe intermediate ordering explicit.
- **Planners:** Proactively compare source documents for contradictory scope,
  behavior, paths, dependencies, status, evidence, and recovery claims. Resolve
  each conflict against the repository-declared authority for that fact type,
  or pause and report the conflicting claims rather than choosing silently.
- **Implementers:** Before review, reconcile the entire implemented change with
  every applicable planning artifact, repository-declared tracking record, and
  affected source and test. After any correction, enumerate every assertion of
  the changed fact, search for stale wording or paths, verify task-graph
  reachability and evidence ownership, and rerun the whole consistency sweep.
  Passing validators prove only what they check, not cross-document correctness.
- **Reviewers:** Review one exact revision or content digest and complete path
  manifest as a single contract, not only the latest diff. Audit consumer
  coverage and repeated claims across artifacts and source. Verify defects with
  evidence or a reversible probe; record unverified concerns as gaps. Report
  problems and constraints rather than mandatory patches, and do not reopen a
  disposition without new evidence.
- **Finding lifecycle:** Give every finding a stable ID, severity, evidence, and
  disposition. Persist accepted, waived, rejected, and owner-decided outcomes
  with reasons. Any changed head invalidates the prior conclusion; a
  scope-widening correction requires a fresh whole-change review. A second
  repair to the same component returns to design review.
```

`AGENTS.md` is a thin consumer adapter, not the portable source of truth. Its
behavioral substance must also reach other supported assistants through their
own thin adapters, while the full contract remains assistant-neutral.

## Portable adoption across SDD repositories

### What changes when the scope includes other repositories

The core review guidance does not change, but its ownership, vocabulary, and
distribution do. Adding the rules only to this repository's `AGENTS.md` would
improve this dogfood repository while leaving product repositories unchanged.
Portable adoption therefore needs one canonical assistant-neutral contract and
thin repository-local exposure.

The portable contract must not assume that every consuming repository:

- stores implementation in this repository;
- uses this repository's tracking path, validators, labels, Project fields, or
  branch conventions;
- implements only code rather than documentation, configuration, infrastructure,
  data, workflows, or external-state changes;
- uses Git commits as the only reviewable content identity; or
- supports only Codex and an `AGENTS.md` entry point.

The portable rule should speak in roles and relationships—consumer, behavior,
source or no-edit decision, requirement, verification owner, task, evidence,
recovery, exact review identity, and disposition. Each product supplies the
concrete paths and commands.

### Full set of framework and repository changes

| Layer | Change | Boundary |
| --- | --- | --- |
| Canonical SDD workflow | Add the planner, implementer, reviewer, contradiction, correction-fan-out, and finding-lifecycle rules to the shared workflow contract. Define a bidirectional consumer-to-coverage matrix and the requirement to resolve conflicting sources by fact authority. | Assistant-neutral and environment-neutral; no repository name, absolute path, label, board field, branch, instance URL, or credential. |
| OpenSpec planning rules | Require planning to identify all affected consumers, repeated assertion surfaces, source authorities, test or inspection owners, task dependencies, safe intermediate ordering, recoveries, and evidence that can actually be produced. | Express the contract in artifact semantics. Do not require this repository's optional tracking extension in products that do not use it. |
| Apply and Verify guidance | Require a pre-review whole-change reconciliation and a post-correction fan-out sweep. Classify corrections as local, contract-changing, or scope-widening; the latter two invalidate prior whole-change conclusions. | Repositories configure their own focused and complete checks. Green checks remain scoped evidence, not proof of semantic parity. |
| Local review guidance | Require a first-pass whole-contract review, proactive contradiction search, evidence-backed findings, reversible probes when proportionate, evidence gaps for unverified concerns, and problem statements rather than prescribed patches. | Review scope comes from the selected change and project configuration, never recency or an inferred repository convention. |
| Independent-review contract | Bind the exact immutable revision or content digest, complete reviewed manifest, allowed planning artifacts, current evidence, and prior finding dispositions. Any content change invalidates the result; scope widening requires a fresh whole-contract review. | Keep the reviewer fresh, read-only, and assistant-independent. Uncommitted-content manifests belong only to review modes that explicitly permit them. Prior dispositions are evidence, not instructions toward a desired conclusion. |
| Finding records | Persist stable ID, severity, subject, evidence, disposition, and rationale. Record non-fix outcomes durably so later reviewers do not repeatedly report an accepted warning, rejected claim, or owner decision without new evidence. | Use the framework's supported finding states. Do not invent project metadata or silently reinterpret severity as disposition. |
| Repository configuration | Declare which sources own requirements, design, tasks, delivery, external work state, and machine-local evidence; identify applicable planning/tracking artifacts; name focused and complete verification commands; and declare special recovery or external-state boundaries. | These values are product-owned configuration. The portable asset defines required concepts, not their environment-specific values. |
| `AGENTS.md` and other assistant adapters | Expose the concise portable block above and point to the repository's configured sources and commands. Provide equivalent behavior to every supported assistant. | Keep adapters thin. Do not make `AGENTS.md`, `CLAUDE.md`, or generated assistant text a competing authority. |
| Deterministic validation | After repeated manual use proves stable pain, consider small checks for set equality, missing test ownership, unreachable task dependencies, or contradictory enumerations. | Manual first. A validator must ship with its correction path and must not attempt semantic judgment that remains reviewer work. |

This repository owns the workflow definition but explicitly does not own the
reusable skills it consumes. Consequently, portable adoption would require
separate, coordinated changes in the appropriate owning repository rather than
copying or vendoring skill implementations here. The likely role mapping is:

- the planning contract belongs in the reusable requirements-to-plan or
  OpenSpec planning guidance;
- the implementation sweep belongs in the bounded verification loop and Apply
  guidance;
- the local-review behavior belongs in the base review contract; and
- the exact-input, fresh-result, and disposition behavior belongs in the
  independent-review contract.

Those are ownership recommendations, not authorization to change the other
repository.

### Fact-authority configuration

The framework should require each consuming repository to identify authorities
by fact type without prescribing their product-specific locations. A project
might declare authorities for:

- observable requirements;
- technical decisions;
- task completion and task evidence;
- delivered source state;
- automated and manual verification evidence;
- issue, Project, ticket, or work-state status;
- historical intent; and
- machine-local or environment-local operational evidence.

When two sources disagree, the planner or reviewer records both claims, their
fact types, and their declared authorities. If the authority is absent or the
sources have equal authority, the work pauses for a decision. Recency alone,
the current worktree, and a prior reviewer statement do not resolve the conflict.

### Portable review handoff

Every repository should be able to produce the conceptual equivalent of this
handoff even when its implementation differs:

1. exact review identity: commit IDs when Git-backed, otherwise a stable content
   digest or immutable revision;
2. complete in-scope path or artifact manifest, including uncommitted content
   when the selected review mode permits it;
3. applicable requirements, design decisions, tasks, tracking records, and
   source-authority configuration;
4. focused and complete check evidence bound to that identity;
5. the consumer-to-coverage matrix or an equivalent reviewable mapping; and
6. prior finding dispositions with evidence and reasons, clearly separated from
   the review request.

The reviewer still performs an independent whole-contract assessment. The
handoff makes scope and provenance deterministic; it does not tell the reviewer
what conclusion to reach.

### Adoption sequence

1. Manually add and review the assistant-neutral contract in the workflow's
   owning source.
2. Update thin platform adapters and reusable role skills in their owning
   repositories through separately authorized changes; do not vendor them into
   this repository.
3. Adopt the concise block plus product-specific fact authorities and check
   commands in one consuming repository.
4. Run several current, isolated changes manually and record review passes,
   repair-induced findings, maximum remaining severity, prior-finding closure,
   and contradiction discoveries.
5. Refine wording if agents interpret the matrix or authority rule
   inconsistently. A second repair to the same guidance component returns to
   design review.
6. Consider a small validator only after the same deterministic omission is
   repeatedly observed and its documented correction path is known.

## Proposed file-by-file implementation manifest

This section is the complete proposed product-file change set. It supplies the
exact text to add or replace, but does not authorize any of the changes. The
workflow repository and reusable-skill repository require separate OpenSpec
changes, reviews, and delivery because they have different ownership. No file in
the reusable-skill repository should be copied into this repository.

OpenSpec proposal, design, task, delta-spec, and tracking paths are intentionally
not pre-created by this research note. Their identifiers, issue links, default
branches, and tracking values must be selected or discovered during separately
authorized Explore and Propose work. Pre-authoring those records here would
cross the planning gate and would either invent or hardcode environment state.
The behavioral content those later artifacts must express is fully specified
below.

### File inventory

| Repository | File | Operation |
| --- | --- | --- |
| `jra-sdd-workflow` | `AGENTS.md` | Add the thin review-readiness block and pre-delivery qualification below. |
| `jra-sdd-workflow` | `CLAUDE.md` | Add the same assistant-neutral block and qualification. |
| `jra-sdd-workflow` | `docs/sdd-workflow.md` | Add the canonical workflow-level review-readiness section below. |
| `jra-sdd-workflow` | `openspec/config.yaml` | Add the exact proposal, design, task, and Apply rules below. |
| `joericearchitect-ai-skills` | `skills/base/_shared/review-readiness.md` | Create the shared portable role contract below. |
| `joericearchitect-ai-skills` | `skills/base/sdd-requirements-to-plan/SKILL.md` | Read the shared contract and require planning coverage before readiness. |
| `joericearchitect-ai-skills` | `skills/base/base-verification-loop/SKILL.md` | Read the shared contract and add whole-change reconciliation and correction classification. |
| `joericearchitect-ai-skills` | `skills/base/base-code-review/SKILL.md` | Read the shared contract and add the whole-contract review method. |
| `joericearchitect-ai-skills` | `skills/base/independent-review/SKILL.md` | Document that the sealed prompt enforces the whole-contract method. |
| `joericearchitect-ai-skills` | `scripts/sdd/codex-review-event-capture.mjs` | Add the exact whole-contract method to strict and degraded Codex prompts. |
| `joericearchitect-ai-skills` | `scripts/sdd/platform-review-adapters.mjs` | Add the same method to strict and degraded Claude prompts. |
| `joericearchitect-ai-skills` | `evals/skills/sdd-requirements-to-plan/run-fixtures.test.mjs` | Assert the planning skill exposes the portable readiness contract. |
| `joericearchitect-ai-skills` | `evals/skills/sdd-requirements-to-plan/scenarios.json` | Add three planning-readiness scenarios matching the proposed delta spec. |
| `joericearchitect-ai-skills` | `evals/skills/implementation-quality/run-fixtures.test.mjs` | Assert local review and verification expose the required method. |
| `joericearchitect-ai-skills` | `evals/skills/implementation-quality/scenarios.json` | Add seven local-review and verification scenarios matching the proposed delta specs. |
| `joericearchitect-ai-skills` | `evals/skills/independent-review/scenarios.json` | Add the whole-contract reviewer scenario below. |
| `joericearchitect-ai-skills` | `evals/skills/independent-review/scenarios.test.mjs` | Include and assert the new scenario kind. |
| `joericearchitect-ai-skills` | `scripts/sdd/test/codex-review-event-capture.test.mjs` | Assert the sealed Codex prompt contains the method. |
| `joericearchitect-ai-skills` | `scripts/sdd/test/platform-review-adapters.test.mjs` | Assert Codex and Claude prompt parity for the method. |
| `joericearchitect-ai-skills` | `openspec/changes/streamline-independent-review-readiness/specs/sdd-requirements-to-plan/spec.md` | Add the exact planning-readiness delta below during an authorized Propose. |
| `joericearchitect-ai-skills` | `openspec/changes/streamline-independent-review-readiness/specs/base-verification-loop/spec.md` | Add the exact implementation-reconciliation delta below during Propose. |
| `joericearchitect-ai-skills` | `openspec/changes/streamline-independent-review-readiness/specs/base-code-review/spec.md` | Add the exact whole-contract local-review delta below during Propose. |
| `joericearchitect-ai-skills` | `openspec/changes/streamline-independent-review-readiness/specs/isolated-independent-review/spec.md` | Add the exact sealed-review-method delta below during Propose. |
| Each consuming repository | `AGENTS.md` and every other supported assistant adapter | Add the same thin portable block, plus project-owned links and commands. Create an adapter only when that assistant is supported. |
| Each consuming repository | Existing project SDD configuration or guidance | Declare fact authorities, applicable artifacts, and focused and complete checks; do not add a universal config filename or schema merely for this guidance. |

No change is proposed to an independent-review JSON schema, correction budget,
authorization profile, review package shape, or review-result state machine.
The current package already binds exact committed artifacts and evidence, and
the current finding flow already separates reviewer findings from implementer
dispositions. Expanding those schemas before the manual guidance is exercised
would violate the manual-first and proportion rules.

### Exact changes in `jra-sdd-workflow`

#### `AGENTS.md` and `CLAUDE.md`

Insert this section after `## Ground rules` and before `## Before delivery` in
both files:

```markdown
## Review readiness

- **Planners:** Before Apply, trace every affected code, documentation,
  configuration, workflow, interface, or external-state consumer from
  observable behavior through source edit or explicit no-edit decision,
  applicable specification, test or inspection owner, task, evidence, and
  recovery. Check the map in both directions and make task dependencies and
  safe intermediate ordering explicit.
- **Planners:** Proactively compare source documents for contradictory scope,
  behavior, paths, dependencies, status, evidence, and recovery claims. Resolve
  each conflict against the repository-declared authority for that fact type,
  or pause and report the conflicting claims rather than choosing silently.
- **Implementers:** Before review, reconcile the entire implemented change with
  every applicable planning artifact, repository-declared tracking record, and
  affected source and test. After any correction, enumerate every assertion of
  the changed fact, search for stale wording or paths, verify task-graph
  reachability and evidence ownership, and rerun the whole consistency sweep.
  Passing validators prove only what they check, not cross-document correctness.
- **Reviewers:** Review one exact revision or content digest and complete path
  manifest as a single contract, not only the latest diff. Audit consumer
  coverage and repeated claims across artifacts and source. Verify defects with
  evidence or a reversible probe; record unverified concerns as gaps. Report
  problems and constraints rather than mandatory patches, and do not reopen a
  disposition without new evidence.
- **Finding lifecycle:** Give every finding a stable ID, severity, evidence, and
  disposition. Persist non-fix decisions with their reasons in a reviewer-visible
  record. Any changed review identity invalidates the prior conclusion; a
  contract-changing or scope-widening correction requires a fresh whole-change
  review. A second repair to the same component returns to design review.
```

Insert this paragraph immediately below `## Before delivery` and before its
command block:

```markdown
Passing tests and validators prove only the behavior and artifact properties
they check. Before delivery, also confirm cross-document consistency, complete
consumer coverage, task-graph reachability, evidence producibility, and the
absence of unresolved source contradictions.
```

#### `docs/sdd-workflow.md`

Insert this exact section after `## Planning Artifact Quality Contract` and
before `## Register Local Delivery Resources Before Creation`:

```markdown
## Review Readiness and Correction Discipline

Tests and validators are scoped evidence, not proof that planning artifacts,
implementation, and operational records describe one coherent change. Planning,
Apply, Verify, local review, and an optional independent review use the same
review-readiness contract.

### Consumer-to-coverage map

Before Apply, identify every affected code, documentation, configuration,
workflow, interface, and external-state consumer. For each consumer, record:

- observable behavior and applicable failure or stop behavior;
- source edit or an explicit, justified no-edit decision;
- owning requirement and scenario when a durable capability is affected;
- test, inspection, or other verification owner;
- implementation task and reachable dependencies;
- evidence that can actually be produced; and
- recovery plus any external prerequisite.

Check the map in both directions. Every discovered consumer needs coverage, and
every planned file, specification, test, task, or operational mutation must
trace to a real requirement or consumer. Keep external delivery gates separate
from internal task dependencies. Order tasks so intermediate states remain
compatible, or state which edits must land atomically.

### Source contradictions

Search repeated claims across source, tests, workflows, proposal, specs, design,
tasks, tracking, and applicable operational records. Compare scope, behavior,
paths, dependencies, status, evidence, result shapes, rationales, and recovery.
When claims conflict, name both sources and resolve the fact through its owner:

| Fact | Authority |
| --- | --- |
| Observable requirement | Living specification and accepted delta |
| Technical decision | Selected change's `design.md` |
| Implementation checklist and task evidence | Selected change's `tasks.md` |
| Delivered source state | Git and merged pull-request evidence |
| Automated or manual verification | Current CI and Verify evidence bound to the reviewed identity |
| Work state | Configured issue or project system |
| Historical intent | Archived change |
| Machine-local operation | Validated machine-local record or receipt |

If the applicable authority is missing, equally authoritative sources disagree,
or a material decision is required, pause and present the conflict. Recency, a
current worktree, or a reviewer statement does not override the declared owner.

### Implementer handoff

Before review, reconcile the whole implementation against every applicable
planning artifact and the consumer-to-coverage map. Bind the handoff to one
exact commit, workspace identity, or content digest and a complete in-scope path
manifest. Include current focused and complete check evidence and durable prior
finding dispositions.

After a correction, classify it as local, contract-changing, or scope-widening.
Before editing a contract or scope, enumerate every assertion of the changed
fact. After editing, search for the prior term, count, path, capability,
rationale, result shape, and dependency; update or justify every survivor.
Recheck task-graph reachability, verification ownership, and the complete
consumer-to-coverage map. A changed review identity invalidates prior evidence.

### Reviewer method

Review the bound artifacts and implementation as one contract, not only the
latest diff. Audit the consumer-to-coverage map and proactively compare repeated
claims for contradictions. Verify a suspected defect from repository evidence
or a proportionate reversible probe. Record an unverified concern as an evidence
gap or assumption rather than an actionable defect.

State each finding as a problem, impact, evidence, and constraint. A suggested
fix is advisory unless the governing contract leaves only one safe resolution.
Give every finding a stable ID, severity, subject, evidence, and disposition.
Do not reopen a disposition without new evidence. Measure convergence by closure
of prior material findings, highest remaining severity, and unresolved human
decisions—not by raw finding count or absence of stylistic observations.

A contract-changing or scope-widening correction requires a fresh whole-change
review. The optional exact-head independent-review gate still requires a fresh
reviewer result after every changed head. A second repair to the same component
returns to design review.
```

#### `openspec/config.yaml`

Append these strings to the indicated existing lists. Do not create new rule or
operation keys.

Append to `rules.proposal`:

```yaml
    - "Name every affected code, documentation, configuration, workflow, interface, and external-state consumer, including justified no-edit effects; do not scope the change only to the initially requested symbol or file."
    - "Identify contradictory source claims that affect scope, behavior, dependency, status, evidence, or recovery, and either resolve them against the owning source or preserve them as an explicit blocker."
```

Append to `rules.design`:

```yaml
    - "Define a bidirectional consumer-to-coverage map from each affected consumer to behavior, source edit or justified no-edit decision, requirement, verification owner, task, producible evidence, recovery, and external prerequisite."
    - "Enumerate every artifact surface that restates scope or contract behavior so a later correction can update the complete fan-out rather than only the reported line."
    - "Define task ordering that preserves compatible intermediate states, or identify edits that must land atomically."
```

Append to `rules.tasks`:

```yaml
    - "Make every prerequisite reachable through explicit task dependencies; do not rely on file order or mix an external delivery gate into an internal task ID chain."
    - "Name the owner and location of every test or inspection result, and require evidence the named check can actually observe the behavior or artifact in scope."
```

Append to `operations.apply.guidance`:

```yaml
      - "Before requesting review, reconcile the implementation with every applicable planning artifact and the complete consumer-to-coverage map; passing validators alone do not establish cross-document correctness."
      - "Before applying a correction, classify it as local, contract-changing, or scope-widening and enumerate every assertion of the changed fact. Afterward, search for surviving old claims and rerun the whole consistency sweep for any contract or scope change."
      - "Preserve finding IDs and evidence-backed dispositions in a reviewer-visible record; do not reopen a non-fix disposition without new evidence."
```

No direct edit is proposed for generated `.agents/skills/openspec-*`,
`.claude/skills/openspec-*`, or `.claude/commands/opsx/*` content. Inspect any
generated diff after OpenSpec regeneration, but change generated behavior only
through its owning configuration or generator.

### Exact changes in `joericearchitect-ai-skills`

#### New `skills/base/_shared/review-readiness.md`

Create the file with this complete content:

```markdown
# Review Readiness Contract

Use this assistant-neutral contract for planning, implementation, local review,
and independent review. Product repositories provide their own paths, commands,
fact authorities, and external-state boundaries through validated configuration
or explicit bounded inputs.

## Consumer-to-coverage mapping

Before implementation, trace every affected code, documentation, configuration,
workflow, interface, and external-state consumer through:

1. observable behavior and failure or stop behavior;
2. source edit or explicit justified no-edit decision;
3. applicable requirement and scenario;
4. test, inspection, or verification owner;
5. task and reachable dependencies;
6. evidence that the named check can actually produce; and
7. recovery plus external prerequisites.

Check the mapping in both directions. Missing consumer coverage, a planned item
with no requirement or consumer, an unreachable dependency, an unowned test, or
vacuous evidence prevents readiness.

## Contradiction handling

Compare repeated claims across every supplied requirement, design, task,
tracking record, source, test, workflow, and operational record. Check scope,
behavior, paths, dependencies, state, evidence, result shape, rationale, and
recovery. Resolve a conflict only through the repository-declared authority for
that fact type. If authority is absent, sources have equal authority, or the
resolution needs material judgment, preserve both claims and pause.

## Implementation corrections

Classify a correction as local, contract-changing, or scope-widening. Before a
contract or scope correction, enumerate every assertion of the changed fact.
Afterward, search for the old term, count, path, capability, rationale, result
shape, and dependency; update or explicitly justify every survivor. Recheck the
whole mapping, task-graph reachability, and evidence ownership. A changed review
identity invalidates prior evidence.

## Review method

Review the bound change as one complete contract, not only its latest diff.
Audit the consumer-to-coverage mapping and proactively identify contradictions.
Verify a defect with supplied evidence or a proportionate reversible probe.
Treat an unverified concern as a gap or assumption, not an actionable defect.

Report the problem, impact, evidence, and constraints. Keep a recommendation
advisory unless the governing contract permits only one safe resolution. Give
every finding a stable ID, severity, subject, evidence, and disposition. Do not
reopen a disposition without new evidence. Use closure of prior material
findings, highest remaining severity, and unresolved human decisions as
convergence evidence; raw finding count is not a correctness gate.

A contract-changing or scope-widening correction requires a fresh whole-change
review. Follow the active workflow's correction budget; never use this contract
to broaden authorization or bypass a required independent-review result.
```

#### `skills/base/sdd-requirements-to-plan/SKILL.md`

Add this sentence after the opening paragraph:

```markdown
Read [review readiness](../_shared/review-readiness.md) before deciding that a
candidate is ready for OpenSpec Explore or Propose.
```

Append this paragraph to `### Plan Readiness Contract`:

```markdown
Before recommending readiness, produce a bidirectional consumer-to-coverage
mapping under the shared review-readiness contract. Name the repository-declared
authority for each relevant fact type and preserve unresolved contradictory
claims as blocking questions. Confirm that every verification result has an
owner, a location, and a non-vacuous way to observe the stated acceptance
behavior; do not leave that discovery to implementation or review.
```

#### `skills/base/base-verification-loop/SKILL.md`

Add this sentence after the opening paragraph:

```markdown
Read [review readiness](../_shared/review-readiness.md) and require its complete
implementer handoff before invoking local or independent review.
```

Replace steps 6 through 8 of `## Required Loop` with:

```markdown
6. Reconcile every changed path and planned no-edit effect against the applicable
   requirements, design, tasks, repository tracking, and bidirectional
   consumer-to-coverage mapping. Treat passing checks as scoped evidence only.
7. Invoke `base-code-review` for a fresh whole-contract local code and security
   review, cover every changed path exactly once in the reviewed-path set, and
   preserve all findings and evidence-backed dispositions.
8. Apply only separately authorized behavior-preserving `objective-fix`
   corrections within the per-signature budget of at most three attempts.
9. Classify each correction as local, contract-changing, or scope-widening.
   Enumerate and recheck every assertion surface for a contract or scope change;
   verify task-graph reachability and evidence ownership after every correction.
10. Invalidate stale evidence, rerun affected checks and a fresh review, then
    emit readiness or recovery state. A contract-changing or scope-widening
    correction requires a fresh whole-contract review.
```

Append this sentence to the first paragraph of `## Result`:

```markdown
The result also identifies the reviewed consumer-to-coverage mapping, unresolved
source contradictions, correction classification, and whether the latest review
was focused or whole-contract; a whole-contract review is mandatory after a
contract-changing or scope-widening correction.
```

This result-shape sentence is descriptive in the first manual change. Do not add
new JSON properties until the existing validator contract is deliberately
versioned; record the information in existing scope, gap, correction, and
evidence fields during the manual trial.

#### `skills/base/base-code-review/SKILL.md`

Add this sentence after the opening paragraph:

```markdown
Read [review readiness](../_shared/review-readiness.md) and apply its
whole-contract reviewer method to the bounded supplied scope.
```

Insert this section before `## Findings`:

```markdown
## Whole-Contract Review

Review the changed paths, relevant requirements, design, tasks, tracking,
tests, workflows, and declared fact authorities as one contract. Reconstruct or
audit the bidirectional consumer-to-coverage mapping. Compare repeated claims
for contradictory scope, behavior, paths, dependencies, state, evidence, result
shape, rationale, and recovery.

Do not treat a passing test or validator as evidence outside what it directly
checks. Verify each suspected defect with supplied evidence or a proportionate
reversible probe. If verification is unavailable, record an evidence gap or
assumption rather than a finding. State findings as problems, impacts, evidence,
and constraints; recommendations remain advisory.

After a contract-changing or scope-widening correction, discard the complete
prior conclusion and perform a fresh whole-contract review. For a truly local
correction, still discard affected conclusions and perform the fresh bounded
review required by the current binding.
```

Append this sentence to `## Findings`:

```markdown
Use stable IDs across passes when the same subject and problem signature recur,
and do not reopen a supplied evidence-backed disposition without new evidence;
if the disposition itself is material or unsupported, report that as the new
finding.
```

#### `skills/base/independent-review/SKILL.md`

Add this sentence after the opening paragraph:

```markdown
Read [review readiness](../_shared/review-readiness.md). The sealed reviewer
does not discover this skill or repository guidance, so its portable review
method is also embedded in each configured review adapter's fixed prompt.
```

Insert this section before `## Result`:

```markdown
## Whole-Contract Review Method

The fixed sealed prompt requires the reviewer to inspect the exact package as a
complete contract, trace affected consumers through behavior, requirements,
implementation, verification, and recovery, and proactively compare repeated
claims for contradictions. It forbids unsupported suspected defects and keeps
recommendations advisory. This changes review method only; it does not add
conversation history, implementer dispositions, an intended conclusion, a new
package field, or mutation authority.

After a correction changes the head, the fresh reviewer repeats the whole
method against the rebuilt exact-head package. Durable dispositions remain
outside the reviewer prompt and are validated separately by the canonical
finding state machine.
```

#### Sealed Codex and Claude prompt content

Append this exact sentence block to `strictPrompt` and `degradedPrompt` in
`scripts/sdd/codex-review-event-capture.mjs`, and to the final prompt argument in
both `buildClaudeReviewInvocation` and `buildClaudeDegradedReviewInvocation` in
`scripts/sdd/platform-review-adapters.mjs`:

```text
Review the exact package as one complete contract, not only the latest diff.
For every affected code, documentation, configuration, workflow, interface, or
external-state consumer visible in the package, trace the relevant behavior to
its requirement, implementation or justified no-edit effect, verification
evidence, task dependency, and recovery. Compare repeated claims for
contradictory scope, behavior, paths, dependencies, state, evidence, result
shape, rationale, and recovery. Do not emit a suspected defect unless package
evidence supports it. State each finding as the problem, impact, evidence, and
constraints; keep the recommendation advisory unless the governing contract
permits only one safe resolution. Use a stable finding ID derived from the
repository-relative subject and problem signature.
```

Keep all existing prompt text about the sealed capsule, untrusted content,
read-only operation, tool restrictions, progress output, and final JSON output.
The new method is appended; it does not replace any security or transport
instruction.

### Exact regression changes in `joericearchitect-ai-skills`

#### `evals/skills/sdd-requirements-to-plan/run-fixtures.test.mjs`

Append these three strings to `expectedScenarioNames`:

```javascript
"review readiness: candidate has complete bidirectional coverage",
"review readiness: planned evidence cannot observe the behavior",
"review readiness: authoritative sources conflict"
```

Append:

```javascript
test("canonical planning guidance requires portable review readiness", () => {
  const skill = fs.readFileSync(
    new URL("../../../skills/base/sdd-requirements-to-plan/SKILL.md", import.meta.url),
    "utf8"
  );
  assert.match(skill, /bidirectional consumer-to-coverage mapping/);
  assert.match(skill, /authority for each relevant fact type/);
  assert.match(skill, /non-vacuous way to observe/);
});
```

#### `evals/skills/sdd-requirements-to-plan/scenarios.json`

Append these objects to `scenarios`:

```json
{
  "name": "review readiness: candidate has complete bidirectional coverage",
  "kind": "positive"
},
{
  "name": "review readiness: planned evidence cannot observe the behavior",
  "kind": "negative"
},
{
  "name": "review readiness: authoritative sources conflict",
  "kind": "negative"
}
```

#### `evals/skills/implementation-quality/run-fixtures.test.mjs`

Add these assertions inside the existing
`canonical skills expose read-only, correction, strict-review, recovery, and
profile boundaries` test:

```javascript
assert.match(review, /Review the changed paths.*as one contract/s);
assert.match(review, /bidirectional consumer-to-coverage mapping/);
assert.match(review, /evidence gap or\s+assumption rather than a finding/s);
assert.match(review, /contract-changing or scope-widening correction/);

assert.match(verification, /Reconcile every changed path and planned no-edit effect/);
assert.match(verification, /passing checks as scoped evidence only/);
assert.match(verification, /Classify each correction as local, contract-changing, or scope-widening/);
assert.match(verification, /fresh whole-contract review/);
```

Replace the existing `scenario inventory maps every delta-spec acceptance
scenario` test with this version so the inventory remains one-to-one with both
the original implementation-quality change and the new review-readiness
change, whether each change is active or archived:

```javascript
test("scenario inventory maps every delta-spec acceptance scenario", () => {
  const scenarioInventory = readJson("../scenarios.json").scenarios;
  const mapped = new Map();
  for (const item of scenarioInventory) {
    mapped.set(item.scenario, (mapped.get(item.scenario) ?? 0) + 1);
  }

  const resolveChangeSpecRoot = (changeName) => {
    const activeRoot = path.join(root, "openspec/changes", changeName, "specs");
    if (fs.existsSync(activeRoot)) return activeRoot;
    const archiveRoot = path.join(root, "openspec/changes/archive");
    const archivedChanges = fs.existsSync(archiveRoot)
      ? fs.readdirSync(archiveRoot).filter((name) => name.endsWith(`-${changeName}`))
      : [];
    assert.equal(
      archivedChanges.length,
      1,
      `expected one active or archived ${changeName} change, found ${archivedChanges.length}`
    );
    return path.join(archiveRoot, archivedChanges[0], "specs");
  };

  const specSets = [
    {
      change: "add-base-implementation-quality-skills",
      files: ["base-code-review/spec.md", "base-verification-loop/spec.md"]
    },
    {
      change: "streamline-independent-review-readiness",
      files: ["base-code-review/spec.md", "base-verification-loop/spec.md"]
    }
  ];
  const scenarios = specSets.flatMap(({ change, files }) => {
    const specRoot = resolveChangeSpecRoot(change);
    return files.flatMap((file) => [
      ...fs.readFileSync(path.join(specRoot, file), "utf8")
        .matchAll(/^#### Scenario: (.+)$/gm)
    ].map((match) => match[1]));
  });

  const required = new Map();
  for (const scenario of scenarios) {
    required.set(scenario, (required.get(scenario) ?? 0) + 1);
  }
  for (const [scenario, count] of required) {
    assert.equal(mapped.get(scenario), count, `missing scenario mapping: ${scenario}`);
  }
  assert.equal(scenarioInventory.length, scenarios.length);
});
```

#### `evals/skills/implementation-quality/scenarios.json`

Append these objects to `scenarios`; their `scenario` values exactly match the
new living-spec scenarios so the existing one-to-one inventory test remains
valid after Sync:

```json
{
  "id": "review-whole-contract-consistent",
  "scenario": "Complete contract is internally consistent",
  "fixture": "skill-text",
  "outcome": "complete-contract-reviewed"
},
{
  "id": "review-contradictory-claims",
  "scenario": "Repeated claims conflict",
  "fixture": "skill-text",
  "outcome": "conflict-or-gap"
},
{
  "id": "review-unsupported-suspicion",
  "scenario": "Suspected defect lacks evidence",
  "fixture": "skill-text",
  "outcome": "gap-not-finding"
},
{
  "id": "review-advisory-recommendation",
  "scenario": "Reviewer recommends a correction",
  "fixture": "skill-text",
  "outcome": "problem-not-prescribed-patch"
},
{
  "id": "verify-review-ready-reconciliation",
  "scenario": "Implemented change is ready for review",
  "fixture": "skill-text",
  "outcome": "whole-change-reconciled"
},
{
  "id": "verify-scope-changing-correction",
  "scenario": "Correction changes contract or scope",
  "fixture": "skill-text",
  "outcome": "fresh-whole-contract-review"
},
{
  "id": "verify-local-correction",
  "scenario": "Correction is locally bounded",
  "fixture": "skill-text",
  "outcome": "focused-checks-and-fresh-review"
}
```

#### `evals/skills/independent-review/scenarios.json`

Append this object to `scenarios`:

```json
{
  "id": "whole-contract-review-method",
  "kind": "whole-contract-review",
  "expected": "the fresh read-only reviewer evaluates the sealed package as one complete contract, traces affected consumers, checks repeated claims for contradictions, and emits no unsupported suspected defect"
}
```

#### `evals/skills/independent-review/scenarios.test.mjs`

Replace the existing `assert.deepEqual` over scenario kinds with:

```javascript
assert.deepEqual(matrix.scenarios.map((scenario) => scenario.kind).sort(), [
  "automatic-rereview",
  "autonomous-allowed-action",
  "autonomous-pause",
  "missing-input",
  "non-trigger",
  "output-path-safety",
  "portable-second-workspace",
  "trigger",
  "untrusted-content",
  "whole-contract-review"
]);
```

Then append this assertion inside the existing test:

```javascript
const wholeContract = matrix.scenarios.find(
  (item) => item.id === "whole-contract-review-method"
);
assert.ok(wholeContract, "missing whole-contract-review-method");
assert.match(wholeContract.expected, /complete contract/);
assert.match(wholeContract.expected, /contradictions/);
assert.match(wholeContract.expected, /no unsupported suspected defect/);
```

#### `scripts/sdd/test/codex-review-event-capture.test.mjs`

In `capture launches only sealed JSONL argv, separates stderr, and publishes the
host artifact`, add after the existing child-argument assertions:

```javascript
assert.match(launch.args.at(-1), /one complete contract, not only the latest diff/);
assert.match(launch.args.at(-1), /trace the relevant behavior/);
assert.match(launch.args.at(-1), /Do not emit a suspected defect unless package evidence supports it/);
assert.match(launch.args.at(-1), /stable finding ID/);
```

#### `scripts/sdd/test/platform-review-adapters.test.mjs`

Inside the existing `strict and degraded reviewer subprocesses receive only
allowlisted operational environment` test, add these assertions inside the
`for (const [label, invocation, expectedHome] of invocations)` loop, immediately
after the two existing package-capsule prompt assertions:

```javascript
const prompt = invocation.args.at(-1);
assert.match(prompt, /Review the exact package as one complete contract/);
assert.match(prompt, /one complete contract, not only the latest diff/);
assert.match(prompt, /contradictory scope, behavior, paths, dependencies/);
assert.match(prompt, /Do not emit a suspected defect unless package evidence supports it/);
assert.match(prompt, /stable finding ID derived from the repository-relative subject and problem signature/);
assert.match(prompt, /keep the recommendation advisory/);
```

### Exact consuming-repository content

For a repository adopting the SDD framework, append the exact `## Review
readiness` block from the `AGENTS.md` and `CLAUDE.md` subsection above to every
supported assistant adapter. Add this paragraph immediately after it, replacing
the angle-bracket placeholders with project-owned relative links:

```markdown
The repository's fact authorities, applicable planning and tracking artifacts,
focused checks, complete checks, and recovery paths are defined in
`<project-sdd-guidance>` and `<project-sdd-configuration>`. Read both before
planning, implementation, or review. Repository-local values in those sources
override examples but cannot weaken the portable review-readiness contract.
```

If the repository has no existing assistant adapter for a supported assistant,
create only that assistant's normal thin adapter and include the same block. Do
not create unused platform files. If it has no existing SDD guidance or
configuration location, resolve that project-level design decision before
adoption rather than imposing a universal filename.

The project-owned guidance must contain the following table populated with its
own relative sources and commands:

```markdown
## Review configuration

| Concern | Project authority or evidence |
| --- | --- |
| Observable requirements | <relative source> |
| Technical decisions | <relative source> |
| Tasks and task evidence | <relative source> |
| Delivered source state | <relative or configured system> |
| Work-item state | <relative or configured system> |
| Historical intent | <relative source> |
| Machine-local operations | <relative record contract or not applicable> |
| Applicable planning/tracking artifacts | <relative paths or configured discovery rule> |
| Focused checks | <repository-declared structured commands> |
| Complete checks | <repository-declared structured commands> |
| Recovery and external-state boundaries | <relative source> |
```

The angle-bracket values are authoring placeholders, not portable defaults and
must not survive delivery.

### Living-spec and evaluation implications

In `joericearchitect-ai-skills`, the separately proposed OpenSpec change should
carry deltas for these existing capabilities:

- `sdd-requirements-to-plan`: Propose readiness requires a bidirectional
  consumer-to-coverage map, fact-authority conflict handling, and producible
  evidence ownership.
- `base-verification-loop`: implementation readiness requires whole-change
  reconciliation and correction classification; contract or scope changes
  require whole-contract rereview.
- `base-code-review`: local review checks complete contract consistency,
  proactively detects contradictions, and withholds unsupported defects.
- `isolated-independent-review`: every configured sealed prompt applies the same
  assistant-neutral whole-contract method without receiving dispositions or an
  intended conclusion.

Each delta must include positive, contradiction, unsupported-suspicion, and
post-scope-correction scenarios where applicable. After delivery, Sync updates
the four corresponding living specs. The exact delta-spec files and generated
change artifacts belong to Propose and are not files to create directly from
this research note. If Explore accepts the proposed change name
`streamline-independent-review-readiness`, use the following exact delta-spec
content.

#### `openspec/changes/streamline-independent-review-readiness/specs/sdd-requirements-to-plan/spec.md`

```markdown
## ADDED Requirements

### Requirement: Planning establishes review-ready consumer coverage

Before recommending a candidate for OpenSpec Explore or Propose, the planning
capability MUST map every affected code, documentation, configuration, workflow,
interface, and external-state consumer to its behavior, source edit or justified
no-edit decision, applicable requirement, verification owner, task dependency,
producible evidence, recovery, and external prerequisite. It MUST check that map
in both directions and MUST preserve an unresolved conflict as a blocking
question when repository-declared fact authorities do not resolve it.

#### Scenario: Candidate has complete bidirectional coverage

- **WHEN** a candidate's consumers all trace to owned requirements, tasks,
  verification, evidence, and recovery, and every planned item traces back to a
  real consumer or requirement
- **THEN** the capability may include that evidence in a Propose-ready result

#### Scenario: Planned evidence cannot observe the behavior

- **WHEN** a candidate names a check that skips the relevant artifact, has no
  owner, or cannot produce the promised result
- **THEN** the capability MUST pause planning and identify the missing or
  vacuous evidence rather than defer discovery to implementation or review

#### Scenario: Authoritative sources conflict

- **WHEN** two supplied sources make conflicting material claims and the
  repository does not declare an authority that resolves the fact type
- **THEN** the capability MUST preserve both claims and pause for a decision
  rather than choosing by recency or file location
```

#### `openspec/changes/streamline-independent-review-readiness/specs/base-verification-loop/spec.md`

```markdown
## ADDED Requirements

### Requirement: Implementation reconciles the complete change before review

The verification loop MUST reconcile changed paths and planned no-edit effects
against the applicable requirements, design, tasks, repository tracking, and
bidirectional consumer-to-coverage mapping before requesting review. Passing
tests or validators MUST be treated only as evidence for the properties they
actually check.

#### Scenario: Implemented change is ready for review

- **WHEN** every affected consumer, changed path, planned no-edit effect, task,
  verification owner, and evidence record agrees with the applicable planning
  contract
- **THEN** the loop MAY request a fresh bounded review for the current binding

#### Scenario: Correction changes contract or scope

- **WHEN** an authorized correction changes the contract or widens scope
- **THEN** the loop MUST enumerate every assertion of the changed fact, search
  for surviving old claims, recheck task-graph reachability and evidence
  ownership, invalidate the prior conclusion, and request a fresh whole-contract
  review

#### Scenario: Correction is locally bounded

- **WHEN** an authorized correction changes no requirement, consumer, result
  shape, task dependency, verification owner, or recovery behavior
- **THEN** the loop MAY use focused affected checks but MUST still obtain the
  fresh review required for the current changed binding
```

#### `openspec/changes/streamline-independent-review-readiness/specs/base-code-review/spec.md`

```markdown
## ADDED Requirements

### Requirement: Local review evaluates one complete contract

The local review capability MUST evaluate the bounded changed paths and supplied
requirements, design, tasks, tracking, tests, workflows, and fact authorities as
one contract rather than reviewing only the latest diff. It MUST audit affected
consumer coverage and MUST proactively compare repeated claims for contradictory
scope, behavior, paths, dependencies, state, evidence, result shape, rationale,
and recovery.

#### Scenario: Complete contract is internally consistent

- **WHEN** the supplied contract has complete consumer coverage and repeated
  claims agree with their declared fact authorities
- **THEN** the review MUST report that coverage without manufacturing a finding

#### Scenario: Repeated claims conflict

- **WHEN** two supplied artifacts make contradictory material claims
- **THEN** the review MUST report the conflict with both evidence references and
  its impact, or record a gap when the applicable authority is unavailable

#### Scenario: Suspected defect lacks evidence

- **WHEN** a reviewer cannot support a suspected defect from supplied evidence
  or a proportionate reversible probe
- **THEN** the review MUST record an evidence gap or assumption rather than an
  actionable finding

#### Scenario: Reviewer recommends a correction

- **WHEN** an evidence-backed finding has more than one safe resolution
- **THEN** the review MUST state the problem, impact, evidence, and constraints
  while keeping its recommended implementation advisory
```

#### `openspec/changes/streamline-independent-review-readiness/specs/isolated-independent-review/spec.md`

```markdown
## ADDED Requirements

### Requirement: Sealed reviewers apply the portable whole-contract method

Every configured strict or authorized-degraded reviewer prompt MUST require the
fresh read-only reviewer to evaluate the exact sealed package as one complete
contract, trace affected consumers through behavior, requirements,
implementation or justified no-edit effects, verification, task dependencies,
and recovery, and compare repeated claims for contradictions. The prompt MUST
reject unsupported suspected defects, keep implementation recommendations
advisory, and request stable finding IDs derived from subject and problem
signature. It MUST NOT supply implementer dispositions, conversation history,
or an intended conclusion.

#### Scenario: Strict reviewer evaluates the whole package

- **WHEN** a current exact-head package is dispatched to a configured strict
  reviewer
- **THEN** its fixed prompt MUST require whole-contract consumer tracing and
  contradiction review while preserving every existing isolation, inspection,
  and output restriction

#### Scenario: Degraded reviewer uses the same method

- **WHEN** an authorized-degraded reviewer is eligible after durable strict
  unavailability
- **THEN** its fixed prompt MUST use the same whole-contract method without
  increasing its assurance claim or weakening any degraded-review disclosure

#### Scenario: Package does not support a suspected defect

- **WHEN** the sealed package lacks evidence for a suspected defect
- **THEN** the reviewer MUST NOT emit that suspicion as a finding

#### Scenario: Correction changes the reviewed head

- **WHEN** an objective correction creates a new head
- **THEN** the next fresh reviewer MUST repeat the whole-contract method against
  the rebuilt package, while dispositions remain outside the reviewer prompt
```

After delivery and justified Sync, those added requirements become part of:

- `openspec/specs/sdd-requirements-to-plan/spec.md`;
- `openspec/specs/base-verification-loop/spec.md`;
- `openspec/specs/base-code-review/spec.md`; and
- `openspec/specs/isolated-independent-review/spec.md`.

In `jra-sdd-workflow`, Explore should decide whether the role guidance is a new
durable `review-readiness` capability or a documentation/configuration change to
the existing workflow contract. Do not manufacture a delta spec only to satisfy
the process. Either classification still uses the exact product-file content
above.

## Synthesized retrospective additions to the guidance digest

Added 2026-09-08 after reconciling the proposed implementation manifest with
the candidate 5, 7, and 8 reviewer and implementer retrospectives listed in the
source register. This section is additive: it does not revise or replace the
original manifest. It retains only material controls that address a distinct
gap in that manifest and that are supported by the recorded runs. Estimated
counterfactual pass counts remain hypotheses, not verified outcomes.

The retrospectives broadly agree that the manifest would have prevented most
of their repeated findings. They also expose two different residual loop modes:

1. **Correction-induced divergence:** a repair creates a new defect, mechanism,
   dependency, or inconsistency.
2. **Coverage-latent divergence:** later passes inspect defect classes that an
   earlier purported whole-contract pass did not sweep.

The original manifest addresses the first mode partially through assertion
fan-out and whole-contract rereview. It does not make first-pass class coverage
observable, distinguish why a later finding appeared, or define a whole-change
stopping rule. The additions below close those gaps without weakening material
review findings or authorizing an automated fix loop.

### Additional controls to carry into future guidance

#### 1. Verify review preconditions before producing applicable findings

Every planning, implementation, and review handoff should state its base
identity and verify it against the repository-declared authority for delivered
source. Exact binding to a commit or digest is necessary but does not prove that
the base is current. A stale base pauses the review with the observed divergence
and refresh path instead of producing a list of downstream symptoms.

Authority reachability is a separate precondition. If a reviewer cannot query
an external authority read-only, the reviewer may continue with unaffected
contract areas but must record the gap and must not assert delivery, existence,
work state, or other facts owned by that authority. Absence in a working copy is
evidence only about that working copy, not the delivered branch or a
machine-local record.

This converts the original analysis's assumptions about current inputs into
verified entry conditions. It also preserves proportionality: an unavailable
external authority blocks only conclusions that depend on it unless the active
workflow declares that authority essential to the entire review.

#### 2. Declare and report the defect-class sweep on every pass

"Review the whole contract" defines artifact scope but not analytical coverage.
Before the first pass, the repository or review profile should declare its
applicable defect classes. Every pass reports each class as `swept-clean`,
`findings`, or `not-applicable` with a reason, and explicitly names anything not
examined. A pass with undeclared analytical coverage is incomplete even if it
read every file.

Repositories may refine the taxonomy, but the portable default should include:

- consumer and reverse-direction artifact coverage;
- evidence ownership and producibility;
- task sequencing and safe intermediate states;
- lifecycle completeness, recovery, and abort behavior;
- external-state validity;
- repeated-claim and restatement consistency; and
- boundary behavior such as first-run, empty, absent, partial, repeated, and
  already-complete states.

This is distinct from the consumer-to-coverage map. The map says what must be
covered; the taxonomy makes visible which kinds of defect the reviewer actually
looked for. It prevents a narrow pass from being mistaken for a clean pass and
then rediscovered as several later rounds.

#### 3. Persist the scope fan-out and decisive equality checks

The manifest requires enumerating assertion surfaces, but future guidance
should require that enumeration to live in a named, reviewer-visible location
such as the design or bounded handoff. Corrections consume and update that list
rather than re-deriving it from memory. Where the repository uses the relevant
artifacts, the recorded sweep should explicitly compare these sets:

- proposal capabilities, delta-spec directories, impact references, and
  tracking specification paths;
- affected source paths, tracking paths, and task-owned edits or justified
  no-edit decisions;
- named tests and fixtures, their existing or task-created paths, their owner,
  and the behavior they can observe; and
- internal task dependency references versus separately recorded external
  prerequisites.

These are manual equalities first, not authorization for a semantic validator.
They make the original general contradiction rule executable and auditable.

#### 4. Make every non-local correction handoff prove closure

For each contract-changing or scope-widening correction, the implementer should
provide a short closure record containing the finding ID and underlying problem,
correction classification, assertion surfaces checked, additions and removals,
explicit no-edit decisions, survivor searches, and any new dependency, evidence,
security, or recovery consequence. The reviewer verifies this record against
the bound content; it does not inherit the implementer's conclusion.

Two checks supplement the original stale-assertion sweep:

- read every added line as new content, because a search for old claims cannot
  detect duplication, broken references, or other defects newly created by the
  correction; and
- independently flag a correction that introduces a new mechanism—a step,
  dependency, privilege, credential, network call, data path, or execution
  context—and apply targeted untrusted-input, least-privilege, secret-handling,
  recovery, and destructive-action scrutiny.

A new-mechanism flag does not automatically require an unrelated whole-change
reread. A contract or scope correction invalidates the prior conclusion for
every item on the durable fan-out plus every surface it touched; that complete
set is rereviewed as one contract. If the fan-out is absent or demonstrably
incomplete, the safe fallback remains the full bounded change.

#### 5. Record later-finding provenance and change ownership

Every finding after the first pass should retain its stable ID and add one
provenance classification:

| Provenance | Meaning |
| --- | --- |
| `carried` | The same verified problem remains unresolved. |
| `repair-induced` | A correction introduced the problem. |
| `latent` | The problem existed in the first reviewed identity but an earlier pass missed it. |
| `external-state` | The finding depends on a record or system outside the change's mutation boundary. |
| `reviewer-error` | A prior conclusion conflicts with the applicable authority or evidence. |

Also classify the finding as change-owned or external before measuring
convergence. Measure the change's readiness from change-owned findings and
human decisions only. Report an external finding once with its owner and bound
evidence; do not repeatedly ask the selected change to repair a subject outside
its mutation boundary. If an external fact is itself a prerequisite, it remains
an explicit entry gate rather than silently disappearing from readiness.

These labels are diagnostic, not quotas. They identify whether the next action
belongs to correction, review coverage, authority stabilization, or disposition.

#### 6. Define correction triggers and a cause-aware whole-change stop

Before pass one, declare the review profile's correction-trigger threshold.
Findings below that threshold are recorded and dispositioned but do not alone
start another correction-and-review cycle; batch them into an already-required
closing pass or defer them with a reason. A reviewer must state the material
impact to elevate such an observation. Security, data-loss, contract, recovery,
or compatibility impact cannot be hidden merely by assigning a low severity.

Use the active workflow's stricter budget when one exists. Otherwise, a third
review pass on one bounded change is an escalation threshold, not permission to
begin a fourth ordinary loop. The response depends on the provenance of the
remaining material findings:

- predominantly `repair-induced`: correction discipline failed; return to
  design reconciliation before more edits;
- predominantly `latent`: review coverage failed; finish every unswept class,
  consolidate the complete material finding set, and do not rewrite sound
  artifacts merely because review was incomplete;
- predominantly `external-state`: stabilize, refresh, or reassign the external
  input before another correction;
- predominantly `reviewer-error`: correct the disposition from authority
  evidence without creating implementation work; or
- predominantly `carried`: obtain the unresolved owner decision or enforce the
  existing component repair boundary.

Material latent findings still block readiness. After the complete sweep, any
batched correction and confirming review follow the current human gate and
correction authority; the stop rule prevents blind repetition rather than
suppressing defects.

For the existing second-repair rule, define a component as the smallest
independently reviewable unit carrying the repaired claim: a source module,
named design decision, task section, specification requirement, tracking
record, or equivalent product-owned unit. This makes the existing circuit
breaker applicable to planning artifacts as well as code.

#### 7. Make mutable shared records and cross-change prerequisites explicit

Even when parallel work is intended to share no files or dependencies, verify
that condition rather than assuming it. For each mutable coordination record,
name one owner and a fixed reviewed identity. A selected change treats the
record as read-only unless the owner's bound integration update is explicitly
in scope. A shared-record conflict is reported to that owner and does not become
repeated candidate-local repair work.

Record each cross-change prerequisite separately from internal task IDs. The
record names the producer change and owned artifact, the availability condition
on an authoritative integration point, the consumer change and exact follow-on
edit or evidence, and recovery if the producer is delayed, superseded, or
changes its interface. The consuming task references this record rather than
embedding an external delivery gate in its internal dependency chain.

The bounded review handoff defined in the manifest should include these shared
record identities and cross-change prerequisite records when applicable. This
is an extension of that packet, not a new universal package schema.

#### 8. Require observations for external-state claims and preserve their history

A threshold, quota, price, capacity, version constraint, resource name, or
permission that depends on an external system should carry the observed value,
observation date, sanitized query or command reference, and the comparison or
arithmetic that supports the claim. A copied value or unsupported assertion is
an evidence gap.

Delivery and lifecycle evidence in shared records should be history-preserving,
not silently overwritten. A correction records the superseded claim, date, new
authority evidence, and resulting state. Downgrading delivery or completion
requires evidence from the authority for that fact; neither absence from a
checkout nor absence of a machine-local record proves non-delivery. This
history-preserving form is preferable to a literal never-delete rule because it
also permits demonstrably false evidence to be corrected without erasing the
audit trail.

A refusal or blocking premise is also a factual claim. It carries the same
evidence obligation as a finding or is explicitly marked unverified, preventing
an unsupported safety rationale from consuming another pass.

#### 9. Treat terminal dispositions as a prerequisite to autonomous iteration

For manual trials, the manifest's reviewer-visible prose disposition remains
adequate. Before any future autonomous fix-and-review loop is designed or
authorized, however, accepted, waived, rejected, superseded, and owner-decided
findings need validated machine-readable terminal states. Without them, a loop
cannot distinguish closed work from an unaddressed finding and will re-report or
retry it indefinitely. This is a prerequisite record, not authorization to
build a controller or to automate the current manual workflow.

#### 10. Record that deterministic-checker exploration is now eligible

The manifest defers a small cross-document checker until the same deterministic
omission recurs and a correction path is known. The candidate retrospectives
report repeated, judgment-free mismatches across capability/spec sets, tracked
paths, test ownership, and task references. That evidence is sufficient to
permit a separate Explore or design review of a small checker for the stable
equalities in control 3. It does not authorize implementation, a general
semantic consistency engine, or automation of reviewer judgment. Any proposed
gate must still ship with its documented exit and remain proportionate.

### Condensed additions for the eventual role guidance

The future guidance produced from the original manifest and this synthesis
should add these role-specific obligations without repeating the manifest's
existing contract:

- **Planners:** verify the base and required authority access; record the
  durable fan-out, decisive equality sets, shared-record owners, applicable
  defect taxonomy, cross-change prerequisites, and externally observed facts
  before declaring review readiness.
- **Implementers:** attach a closure record to every non-local repair, read
  added lines as new content, identify newly introduced mechanisms, and hand
  the reviewer the correction classification and complete rereview fan-out.
- **Reviewers:** declare taxonomy coverage, classify later findings by
  provenance and mutation ownership, apply the predeclared correction trigger,
  and use the cause-aware third-pass stop instead of opening an ordinary fourth
  loop.
- **Workflow owners:** define component and pass-count semantics, keep shared
  coordination ownership explicit, require authority-backed external facts,
  preserve lifecycle evidence history, and withhold autonomous iteration until
  terminal dispositions are machine-readable.

These additions should be evaluated together with the original digest. They do
not repeat its whole-contract review, bidirectional consumer map, evidence
producibility, contradiction resolution, stable finding IDs, durable
dispositions, advisory recommendations, or validator-scope warnings.

## Unknowns

- The campaign has only two independent occurrences of some non-staleness
  patterns, and no completed comparison run yet holds base freshness, file
  isolation, and dependency independence constant. The guidance is low-risk,
  but the expected reduction in pass count is not yet measured.
- The evidence comes primarily from planning-artifact review. It does not show
  whether implementation-stage independent reviews have the same distribution
  of root causes.
- It is not yet established which cross-document consistency rules are stable
  enough to automate. Under the manual-first rule, run the proposed matrix
  manually and record recurrence before adding validators.
- The repository has a durable preflight disposition example, but it does not
  yet define a general accepted/waived finding state for every review record.
  That vocabulary needs a design decision before it becomes a required schema.

## Use cases

- Planning review before the Planning-to-Apply gate.
- Implementer self-review before OpenSpec Verify or optional independent review.
- Fresh reviewer prompts after an objective correction changes the head.
- Investigation of apparently new findings that may be repair-induced
  inconsistencies.
- Reconciliation of conflicting facts across living specs, change artifacts,
  Git/PR evidence, Issue/Project state, and machine-local receipts.

## SDLC fit

The recommendations do not add a phase. The planner matrix strengthens Explore
and Propose; the implementer sweep strengthens Apply and Verify readiness; the
reviewer rules strengthen planning review and the existing optional Gate 3
independent review. The current one-correction and second-repair boundaries stay
unchanged.

## Open-source and paid options

No product or tool purchase is indicated. The highest-value changes are manual
instructions and ordinary repository searches. A later deterministic validator
could check a few stable set-equality rules, but current evidence does not yet
authorize or define that automation.

## Tutorials and articles

External tutorials were not needed. This is repository-specific workflow
research, and the strongest evidence is the repository's own pass-by-pass
records, authoritative lifecycle documents, and validator behavior.

## Project fit

The proposed guidance matches the repository's manual-first, proportion,
assistant-portability, evidence, recovery, and second-repair rules. It should be
introduced as a concise role contract, then exercised manually. Record whether
future clean, isolated reviews close in one findings pass plus one confirming
pass before considering any new validation machinery.

## Feedback from other LLM sessions

This section collects field feedback from assistant sessions that ran real SDD
work under this repository's guidance, or under guidance this research proposes.
Each run adds one subsection. The intent is to test the proposed manifest against
observed behavior rather than against reasoning about behavior, so entries should
record what actually happened, including counts, and should state plainly where a
proposed control would not have helped.

Subsection naming convention: `<date> — <repository>/<change identifier> —
<role>`. The role is the role the contributing session held in that run, one or
more of planner, implementer, or reviewer. A session that both authored and
corrected artifacts is planner and implementer; the reviewing session is a
separate entry even when it reviewed the same delta. Order subsections newest
first.

### 2026-09-08 — `home-roots-reinvest-in-growth` / `m1-2-phase-a-delivery` — reviewer

Contributed by a Claude Opus 5 session that held only the reviewer role for this
delta. It authored no artifact and applied no correction. This is the second half
of the pair whose first half is the planner and implementer entry below; where
the two accounts differ, both are recorded rather than reconciled.

#### Counting basis, and where it differs from the paired entry

The paired entry records four passes and 27 findings. This session ran five
review passes and raised 36 findings. The difference is basis, not dispute:

- The reviewer counts a pass whenever it re-read the artifacts and issued
  findings. Two of those were verification passes triggered by the words
  "findings were addressed," and the paired entry appears to fold the first of
  them into its own pass 2 and to exclude the final one entirely.
- The reviewer's 36 includes roughly eight wording-class items reported as
  minors or nits. Excluding those gives 28, which is within one of the paired
  entry's 27.

Recorded because a future summary that adopts one number without its basis will
misstate the run. Neither count is wrong; they measure different things.

#### The correction this session offers to the paired diagnosis

The paired entry maps this run onto root cause 3, incremental reviewer framing,
and describes passes two and three as reading the patches. That is not what
happened on the reviewing side. Every pass re-read all four artifacts in full,
plus the design brief and the governing accepted specifications. Pass five also
re-read the reference project's Terraform and shell scripts to verify claims the
artifacts made about them.

The widening was in **defect classes swept**, not in **scope re-read**. This
distinction matters for how the manifest is prioritized, because the manifest's
stated remedy for root cause 3 — review the whole contract rather than the latest
diff — was already being followed, and nine latent findings survived it anyway.
Whole-contract framing is necessary and insufficient. The paired entry's
Addition A is the control that actually closes this, and it rests on a firmer
footing than the root cause it is currently attached to.

#### What the reviewer observed about its own passes

| Pass | Trigger | Classes swept | Missed |
| --- | --- | --- | --- |
| 1 | Initial review request | Coverage, spec-to-source traceability | Producibility, sequencing, lifecycle, external state, boundary cases |
| 2 | A mid-run owner decision removed a resource from the inventory | Post-edit staleness, the new decision's own risk analysis | Same five |
| 3 | "Findings were addressed" | Post-edit staleness | Same five |
| 4 | Owner asked explicitly for correctness, coherence, completeness, edge cases | All remaining classes | — |
| 5 | "Findings were addressed" | Post-edit staleness, added-text review | — |

The trigger column is the finding. Pass four exists because the owner supplied a
defect taxonomy verbally that the process did not supply in writing. The
taxonomy was available to be asked for; it was not available to be followed.

#### Proposed additions, reviewer side

Where these agree with the paired entry they are marked, and the reviewer's
reason for agreeing is recorded rather than the proposal restated.

**R1. A declared sweep taxonomy, with mandatory non-coverage statements.**
Agrees with the paired entry's Addition A and F, and the reviewer endorses both
without modification. The reviewer's independent reason: across five passes this
session never once stated what it had not examined, and no rule required it to.
The owner therefore could not tell a clean pass from a narrow one, and the only
available signal — findings trending down — was actively misleading, since the
count rose from five to ten at pass four precisely when coverage improved.

**R2. Verification of corrections needs its own rule, distinct from the
assertion sweep.** The reviewer's strongest independent addition, and not covered
by the paired entry's Addition B.

An assertion register catches a fact that survived where it should have changed.
It structurally cannot catch text a fix newly created. Three findings in this run
were created by corrections and were invisible to any search for prior terms:

- a duplicated clause produced by a botched edit, leaving a sentence reading
  "the external-resource approval requirement in the external-resource approval
  requirement in";
- a corrected ownership statement added as a list item directly above the item
  it duplicated;
- a cross-reference added to a section heading that does not exist, so the link
  resolves to nothing.

Add to the implementer handoff and the reviewer method: after a correction, diff
the artifacts and read the added lines as new content subject to the same review
as original text. This is a different operation from the assertion sweep, takes a
minute, and would have removed three findings across two passes.

**R3. External-state facts carry their observation.** Agrees with the paired
entry's Addition C, which the reviewer considers the highest-value single control
in either list. Reviewer-side note on why it works: the budget-ceiling defect was
undetectable by reading the change package alone. It required opening a separate
handoff document, extracting a recorded six-day spend figure, dividing, and
comparing to a threshold in a third document. No consistency rule reaches across
that gap. A rule requiring the arithmetic to be written down beside the threshold
puts the defect on the page where it is read.

**R4. The loop budget needs a trigger that distinguishes cause.** The reviewer
disagrees with the paired entry's Addition D as drafted, and proposes a
modification rather than rejection.

Addition D says a third pass producing material findings returns the artifact to
design review to be rewritten. Applied to this run, the third pass under the
reviewer's numbering — the fourth under the paired entry's — produced ten
findings, nine of which were latent in version one. The artifact's content was
sound; the review had been too narrow. Rewriting it would have been the wrong
remedy applied to the wrong party.

Split the trigger by the cause of the findings:

- A third pass dominated by **fix-induced** findings means correction discipline
  has failed. Return the artifact to design review, as drafted.
- A third pass dominated by **latent** findings means review coverage has failed.
  Do not rewrite the artifact. Complete the sweep, and record that the earlier
  passes were incomplete.

Both are stopping conditions. Only one of them is the artifact's fault, and the
distinction is cheap to make because it only requires asking, per finding,
whether it was present in version one.

**R5. The disposition register belongs to the implementer, not the reviewer.**
Agrees with root cause 7, with a placement change. Across five passes this
session carried the open finding list by hand and reproduced it in prose each
round, including one finding the implementer had correctly rejected. The reviewer
was serving as the memory for a record the implementer has to act on. Requiring
the register on the implementing side lets the reviewer verify against it rather
than reconstruct it, which is both cheaper and auditable.

**R6. Define contract-changing by enumeration.** Agrees with the paired entry's
Addition E. Reviewer-side confirmation that the misclassification was real: the
inventory change was presented to the reviewer as a completed correction with a
note to re-review "with that in mind," which framed a contract change as a patch.
The reviewer accepted that framing and swept for staleness rather than reopening
the whole contract, which is how two of the three subsequent staleness findings
survived into later passes. The framing came from the implementer, but the
reviewer had no rule requiring it to reject it.

#### Proposed modification

**Reviewer findings should carry a latency flag.** One field per finding: present
in the reviewed version at first review, or introduced since. It costs the
reviewer nothing, it is the input R4's trigger needs, and on this run it would
have made the widening-lens pattern visible at pass three instead of pass four,
where it was only found because the implementing session went looking for it
after the fact.

#### Expected effect on this run

- R1 and R3, which are the paired entry's A, C, and F, move the nine latent
  findings into pass one.
- R2, with the paired entry's B and E, removes the five self-inflicted findings.
- One substantive pass, one confirming pass, and one unavoidable pass triggered by
  the mid-run design decision. Three, not five. The reviewer does not reach the
  paired entry's estimate of two, because a new design decision arriving during
  review legitimately requires a fresh design pass, and no control in either list
  removes it.

#### What would not have helped

- **The mid-run ingress decision.** An owner changed a design decision during
  review. The pass it caused was review working correctly.
- **A wrong reviewer claim.** In pass two this session asserted that a teardown
  step destroying a resource would trip the change's own halt condition. It would
  not have: the resource was inside the approved inventory and the halt rule fires
  only outside it. The implementer rejected the claim and was right. The manifest's
  existing rule to verify a defect against repository evidence before reporting it
  is the applicable control and was not followed here.
- **Judgment about failure modes.** The most consequential design findings in this
  run — that removing an allocated address changes what a stale DNS record points
  at, and that a budget ceiling can be arithmetically dead on arrival — came from
  reasoning about consequences, not from checking sets. Every control in both lists
  prompts that reasoning. None produces it.

#### One caveat the contributing session records against its own feedback

This session is proposing controls that would have caught its own misses, which is
the easiest kind of recommendation to make and the hardest to trust. The load-
bearing test applied to each was whether it is mechanical: R1 is a checklist with a
declared output, R2 is a diff read, R3 is arithmetic written beside a number, R4 is
a boolean per finding. R5 and R6 are placement and definition changes. None of them
asks a reviewer to be more thorough, because this run is evidence that a reviewer
following whole-contract guidance in good faith still swept three classes out of
seven on its first pass.

### 2026-09-08 — `home-roots-reinvest-in-growth` / `m1-2-phase-a-delivery` — planner and implementer

Contributed by a Claude Opus 5 session. The reviewing party was a separate
independent session, so this entry is one half of the pair and its claims about
reviewer behavior are observations from the receiving side.

#### Run context

The delta was a central OpenSpec envelope authorizing an infrastructure phase:
component repository creation, a bounded external-resource inventory, five
component-local slices, and a device-reachability acceptance checkpoint. It
carried `proposal.md`, one new-capability delta spec, `design.md`, and
`tasks.md`. `openspec validate --strict` passed after every round.

It took four review passes and produced 27 findings. Under a threshold of three,
this run was excessive.

#### The diagnostic finding

After the fourth pass, the implementing session checked which of the ten
findings labelled new in the third pass were actually present in the first draft
rather than created by intervening corrections.

**Nine of ten were latent in version one and survived two prior reviews.** Only
one was introduced by a later edit. Self-inflicted staleness accounted for five
findings across the run; incomplete review coverage accounted for nine.

The observed pattern is that each pass swept a different defect class rather than
the same classes more thoroughly:

- Pass 1 found coverage gaps.
- Pass 2 found post-edit staleness.
- Pass 3 found sequencing, lifecycle, and external-state defects.

That is a widening lens, not convergence. The manifest as drafted instructs the
reviewer to review the whole contract but does not say what to sweep for, so
class coverage emerged pass by pass instead of being uniform from the first.

This matters for how the manifest is prioritized. Its correction-discipline
controls are sound and would have prevented the five self-inflicted findings.
They address the smaller half of this run.

#### Mapping the run to the seven root causes

Six of the seven root causes recorded in this document were reproduced:

| Root cause | Observed form in this run |
| --- | --- |
| 1. Incomplete blast-radius discovery | A required runtime resource absent from the approved inventory; an IAM role created with no consumer in the phase; no identity named for the lifecycle scripts; no Sync, Archive, or cleanup tasks |
| 2. Local rather than semantic repair | Five findings, each a fact corrected in one location while the same fact stood elsewhere, including one duplicated clause produced by a prior fix |
| 3. Incremental reviewer framing | Passes two and three read the patches; untouched lines went stale when an ingress decision changed |
| 4. Unproducible or vacuous evidence | A slice checkpoint that could not be evaluated from its own text; budgets specified with no subscriber; an end-to-end executor never named |
| 5. Task-graph and intermediate-state defects | A manual secret-population step absent between an apply and the checkpoint that depended on it; a halt path leaving paid resources standing; no branch named for the envelope |
| 7. No durable terminal disposition | The reviewer maintained a "still open from previous pass" list by hand across rounds |

Root cause 6, reviewer over-prescription, did not occur. Findings were stated as
problems with evidence, and one implementer disagreement was recorded rather than
overridden.

#### Proposed additions

**A. A fixed sweep taxonomy with declared coverage.** The highest-value change
for this run. Add to the reviewer method in `docs/sdd-workflow.md` and to the
reviewer bullet in `AGENTS.md` and `CLAUDE.md`. Every pass sweeps all classes and
reports per class: swept clean, findings, or not applicable with a reason.

| Class | The question it asks |
| --- | --- |
| Coverage | Is every consumer covered, and does every planned artifact trace back to a consumer? |
| Producibility | Can every named check actually observe what it claims? |
| Sequencing | Are prerequisites reachable, intermediate states valid, and human steps placed before the gate that needs them? |
| Lifecycle completeness | Does the change carry its own close-out and its abort path? |
| External-state validity | Is every number, threshold, name, and permission checked against observed reality? |
| Restatement consistency | Does every fact asserted more than once agree? |
| Boundary cases | Are first-run, empty, absent, and already-done states specified? |

A pass that does not declare class coverage is not a pass. Applied to this run,
this pulls all nine latent findings into the first round. It also converts an
invisible gap into a scheduled one: a reviewer who records "external-state
validity: not swept" has said a further round is coming, rather than the
implementer discovering it two rounds later.

**B. The assertion sweep must produce an artifact.** The manifest requires
enumerating every assertion of a changed fact before editing. In this run that
enumeration was not performed, and nothing in the process could detect its
absence. Require the enumeration to be recorded — a register of facts asserted in
more than one location, with those locations, or at minimum a list of search
commands committed with the change. A correction then edits a register rather
than relying on recall, and a reviewer can check the register covers the fact.
Four of the five self-inflicted findings would not have survived this.

**C. External-state facts carry their observation.** Any threshold, limit, quota,
price, capacity, or name constrained by a permission must record the observed
value, the observation date, the command that produced it, and the arithmetic
against the constraint.

This is the control that catches the most consequential finding of the run. An
account-wide budget ceiling was specified as a figure carried forward from
another project. Written as a figure it passes every consistency check. Written
as "this ceiling against an observed daily burn rate, crossed on day fourteen by
a tenant this change does not control" it does not survive being written down —
the backstop would have been in permanent alarm from the day it was created,
which is the credit-blind defect the phase existed to correct, inverted. The same
control catches a resource name that had to match an IAM ARN pattern to be
creatable at all.

**D. A loop budget with forced escalation.** The manifest measures convergence
but never stops. Add an explicit rule:

> Three passes maximum on one contract. If a third pass produces material
> findings, stop patching. The artifact returns to design review and is
> rewritten rather than amended.

The reasoning matches the manifest's existing rule that a second repair to the
same component returns to design review. By a third round, defect density is
evidence that the structure is wrong rather than the lines. On this run the third
pass produced fifteen findings and would have triggered this correctly.

Count material findings, not raw findings. Genuine design disagreement and a
reviewer claim later shown to be wrong both consumed passes here, and neither
should count against a loop budget.

**E. Define what counts as contract-changing.** The re-review trigger exists in
the manifest; the definition does not, and the implementing session misclassified
against it. A mid-run decision to drop a resource from the approved inventory was
treated as a patch when it was a contract change, and its consequences leaked
into two subsequent rounds. Name the trigger concretely: any change to an
approved resource inventory, an owner assignment, an acceptance criterion, or an
authorization boundary is contract-changing and takes a fresh whole-change
review rather than a follow-up pass.

**F. Reviewers state what they did not check.** One line per pass. This is the
cheapest available counter to the widening-lens pattern described above.

#### Proposed modifications

- **Move "passing validators prove only what they check" from prose to
  placement.** Put it beside the validate command itself in `AGENTS.md` and
  `CLAUDE.md`. In this run the implementing session reported a passing strict
  validation after every round as though it carried consistency information. All
  27 findings survived it.
- **Promote the reverse direction of the bidirectional trace to its own rule.**
  In the drafted planner guidance it sits mid-bullet, after the forward
  direction. The reverse direction — every planned artifact must trace to a real
  consumer — is a mechanical check, and it is what catches an identity created
  for a purpose the same change forbids. It is doing more work than its placement
  suggests.

#### Expected effect on this run

- Additions A and C move roughly 21 of 27 findings into the first round.
- Additions B and E prevent the five self-inflicted findings.
- The result is one substantive round plus one confirming round: two passes, not
  four.

#### What these would not have prevented

- **Genuine design disagreement.** The ingress decision itself, and a partial
  implementer disagreement with the reviewer's framing of a failure mode, were
  review working as intended.
- **A reviewer claim that was wrong.** One sub-claim in the second pass was
  incorrect on the artifact's own text. A durable disposition record stops such a
  claim recurring; it does not stop it being made once.
- **Judgment about failure modes.** No process control produces a correct risk
  analysis, only the prompt to attempt one.

#### One caveat the contributing session recorded against its own feedback

Several findings in this run violated rules the consuming repository's
configuration already carried, including a rule requiring meaningful failure and
boundary scenarios. Guidance that is present and not executed does not help. The
distinguishing property of the additions above is that the load-bearing ones are
mechanical and checkable — enumerate the assertion set, trace the map in both
directions, declare class coverage, show the arithmetic — rather than
exhortations to be thorough.

## Model guidance provenance

- Role: `balanced-standard`
- Lookup date: 2026-09-07
- Codex model advisory: `gpt-5.6-terra`
- Official source: <https://developers.openai.com/api/docs/models/gpt-5.6-terra>
- The active session model was not changed. Model availability remains
  time-sensitive even though the official page was checked on the lookup date.

## Source material used as data

The complete source register is in [sources.md](sources.md). Principal evidence:

- [Issue and friction log](../../notes/issue-and-friction-log.md)
- [Dogfood observations](../../plans/dogfood-observations.md)
- [Candidate 5 review](../../scratch/2026-09-07-candidate-5-code-review.md)
- [Candidate 7 review](../../scratch/2026-09-07-candidate-7-code-review.md)
- [Candidate 8 review](../../scratch/2026-09-07-candidate-8-code-review.md)
- [SDD workflow](../../../docs/sdd-workflow.md)
- [OpenSpec configuration](../../../openspec/config.yaml)
- [Current agent guidance](../../../AGENTS.md)
- [Preflight review disposition](../../review-records/2026-09-03-dogfood-preflight-review-disposition.md)
