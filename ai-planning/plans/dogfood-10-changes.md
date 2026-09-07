# Dogfood roadmap — 10 changes through the SDD workflow

Date: 2026-09-03

## Goal

Prove the repository's OpenSpec workflow by running ten real, small changes
through its human-driven lifecycle. The campaign exercises every selected
action and records evidence from issue intake through durable archive delivery.
The work remains manual throughout the run; observed friction becomes input to
later design decisions, not permission to automate mid-campaign.

The campaign is successful only when the workflow produces useful repository
changes and reviewable evidence. A change created only to increase the count
does not qualify.

## Delivery assumptions

- Work proceeds in the dependency-valid manual batches defined below. Each
  parallel session owns one selected change, its own issue, worktree, resource
  registration, evidence, and human-gate decisions; a batch does not share an
  authorization across its changes.
- Proposal and Apply remain separate authorization boundaries.
- Each candidate states its own scope, non-goals, acceptance evidence, local
  risk, recovery, and external-state assumptions. Those statements do not
  authorize GitHub mutations, Apply, merge, Sync, or Archive.
- GitHub issue, Project, pull-request, merge, label, and archive actions remain
  interactive and require their normal just-in-time authorization.
- The implementation PR must merge and close its issue before Archive, as
  required by `openspec/config.yaml`. Sync and Archive then produce a second,
  narrowly scoped lifecycle-record PR so living specs and archived intent are
  reviewed and durable.
- Issue closure and the Project's configured completion state represent
  implementation delivery. The campaign row remains `In progress` until the
  lifecycle-record PR makes Sync and Archive durable; that temporary difference
  is expected and recorded rather than silently reconciled.
- Every dogfood resource created after the Workspace cleanup contract reaches
  the default branch is planned before Git creation and registered only after
  exact inspection. Implementation and lifecycle-record branches and secondary
  worktrees have separate machine-local records keyed by change, role, kind,
  and attempt. Existing unregistered resources remain legacy and preserved.
- After lifecycle-record delivery, each candidate enters manual Workspace
  cleanup. Audit, authorization, live reinspection, action, and restartable
  receipt are separate steps; Archive never implies resource removal.
- Values such as repository, owner, Project, branch, labels, issue number, and
  paths are discovered from the current environment or supplied configuration.
  They are not copied from examples.

## Current state

- GitHub issue [#1](https://github.com/joericearchitect/jra-sdd-workflow/issues/1)
  exists for candidate 1 and is on the configured Project in its initial state.
- PF1, PF2, and PF3 are delivered and archived. Their issue, pull-request,
  archive, observation, default-branch, and validation evidence was rechecked
  in OBS-007 before this roadmap transition.
- Candidate 1 is `Done`: [issue #1](https://github.com/joericearchitect/jra-sdd-workflow/issues/1),
  [implementation PR #18](https://github.com/joericearchitect/jra-sdd-workflow/pull/18),
  [lifecycle-record PR #19](https://github.com/joericearchitect/jra-sdd-workflow/pull/19),
  its archived change, and its completed cleanup receipt are current.
- Candidate 2 is `Done`: [issue #20](https://github.com/joericearchitect/jra-sdd-workflow/issues/20),
  [implementation PR #21](https://github.com/joericearchitect/jra-sdd-workflow/pull/21),
  [lifecycle-record PR #22](https://github.com/joericearchitect/jra-sdd-workflow/pull/22),
  its archived change, and its completed cleanup receipt are current. OBS-008
  records the campaign's first frictionless end-to-end run and a clean-run
  streak of one.
- Candidate 3 is `Done`: [issue #23](https://github.com/joericearchitect/jra-sdd-workflow/issues/23),
  [implementation PR #24](https://github.com/joericearchitect/jra-sdd-workflow/pull/24),
  [lifecycle-record PR #25](https://github.com/joericearchitect/jra-sdd-workflow/pull/25),
  its [archived change](../../openspec/changes/archive/2026-09-06-docs-pr-linkage-contract/),
  and its completed cleanup receipt are current. The clean-run streak is two.
- At planning baseline, the repository had 9 passing Node tests; the hardcoded-environment validator
  passes; `openspec validate --all --strict` reports no items to validate.
- Candidate 4 is `In progress` after [implementation PR #27](https://github.com/joericearchitect/jra-sdd-workflow/pull/27)
  delivered the approved label alignment and closed
  [issue #26](https://github.com/joericearchitect/jra-sdd-workflow/issues/26).
  Its synced living specification and dated archive are in
  [lifecycle-record PR #28](https://github.com/joericearchitect/jra-sdd-workflow/pull/28);
  delivery and workspace cleanup remain in progress.

Status values are alternatives, not a mandatory sequence:
`Not started` | `In progress` | `Blocked` | `Done`.

## Campaign checklist

Uncreated issue and OpenSpec identifiers are proposals until their records
exist.

| # | Proposed OpenSpec change | Issue | Outcome | Hard dependencies | Status |
|---|---|---|---|---|---|
| 1 | `docs-tracking-format` | [#1](https://github.com/joericearchitect/jra-sdd-workflow/issues/1) | A contributor can author valid `tracking.yaml` without reading validator source | PF1–PF3 in `DRR-2026-09-03-01` | Done |
| 2 | `docs-definition-of-done` | [#20](https://github.com/joericearchitect/jra-sdd-workflow/issues/20) | Contributors can identify entry, exit, evidence, and recovery expectations for every lifecycle phase | None | Done |
| 3 | `docs-pr-linkage-contract` | [#23](https://github.com/joericearchitect/jra-sdd-workflow/issues/23) | README users can author implementation and lifecycle-record PR bodies that pass linkage validation | None | Done |
| 4 | `align-issue-template-labels` | [#26](https://github.com/joericearchitect/jra-sdd-workflow/issues/26) | Issue-form labels and live repository labels agree, with a documented recovery path | None | In progress |
| 5 | `add-docs-issue-template` | TBD | Documentation work has an intake form using verified labels and the existing SDD fields | 4 | Not started |
| 6 | `remove-unused-sample-fixture-config` | TBD | Artifact rules contain no dangling fixture setting that no validator consumes | None | Not started |
| 7 | `resolve-pr-validation-signal` | TBD | The unused PR-validation signal is removed unless Explore identifies a concrete consumer with distinct necessary behavior | None | Not started |
| 8 | `add-tracking-schema-examples` | TBD | A checked positive example passes tracking validation and a checked negative example fails for the documented reason | 1 | Not started |
| 9 | `reject-ambiguous-archive-lookup` | TBD | Archive lookup accepts exactly one canonical change match and rejects zero or ambiguous suffix matches with correction guidance | None | Not started |
| 10 | `docs-dogfood-findings` | TBD | The campaign's observed friction, recoveries, non-events, and automation conclusions are recorded without fabricating a recovery | 1–9 | Not started |

The numbered order is the campaign sequence. It is not a dependency claim;
only the prerequisites in the hard-dependencies column block candidate
readiness.

## Remaining delivery batches

The remaining candidates are delivered in manual batches of at most three. A
candidate may start only after its listed hard dependencies are complete and its
own Explore, planning review, and Apply authorization have passed. Parallel
work does not authorize another candidate's external mutation, merge, Sync,
Archive, or cleanup.

| Batch | Candidates | Entry condition | Coordination boundary |
|---|---|---|---|
| 1 | 5 `add-docs-issue-template`; 6 `remove-unused-sample-fixture-config`; 8 `add-tracking-schema-examples` | Start after candidate 4 is fully complete; candidate 5 then has its verified-label dependency. | Each candidate owns distinct implementation surfaces and separate GitHub/worktree resources. |
| 2 | 7 `resolve-pr-validation-signal`; 9 `reject-ambiguous-archive-lookup` | Start after batch 1 is complete. | Explore and Propose may run in parallel, but Apply and merge are serialized because both can affect OpenSpec-linkage validation and its direct tests. |
| Final | 10 `docs-dogfood-findings` | Start only after candidates 4 through 9 are `Done` and their sanitized observations are durable. | Candidate 10 is a single synthesis change and does not invent missing recovery evidence. |

Sessions use separate registered worktrees and branches. Merge implementation
and lifecycle-record pull requests one at a time from freshly rebased heads,
then record each candidate's outcome in the shared campaign roadmap and
observation ledger before the next shared-record merge. This serializes shared
record updates without serializing the independent manual sessions.

## Candidate readiness

Each Explore and Propose step reads this plan, the candidate's GitHub issue,
`docs/sdd-workflow.md`, and `openspec/config.yaml`, plus the source paths named
below. Explore must confirm the stated outcome, scope, non-goals, acceptance
evidence, shared-resource hazards, and recovery before Propose.

If Explore cannot identify a real observable behavior for a candidate, that
candidate is paused and replaced or redesigned through human review. It does
not receive an invented delta requirement merely to satisfy artifact validation.

### 1. `docs-tracking-format`

- Scope: add a human-readable tracking reference and link it from the workflow
  guide. Source: `schemas/openspec-tracking-v1.schema.json`,
  `scripts/validation/lib/tracking.mjs`, and
  `scripts/validation/validate-tracking.mjs`.
- Non-goals: change the schema, parser, linkage policy, or GitHub state model.
- Acceptance: a fresh example authored from the documentation passes
  `validate-tracking.mjs`; required and forbidden fields are explained.
- Hazard/recovery: documentation can drift from code; cite authoritative paths
  and recover with a scoped documentation revert.

### 2. `docs-definition-of-done`

- Scope: add phase entry, exit, evidence, and recovery checklists to
  `docs/sdd-workflow.md`.
- Non-goals: add a controller, new lifecycle phase, or automatic transition.
- Acceptance: every selected action has an explicit entry and exit condition,
  and every blocking gate names its path forward.
- Hazard/recovery: avoid duplicating authoritative artifact content; link to it
  and revert the documentation section if it conflicts.

### 3. `docs-pr-linkage-contract`

- Scope: document accepted issue-reference forms, the exact
  `OpenSpec change:` marker, implementation PR behavior, and lifecycle-record
  PR behavior in `README.md`. Source:
  `scripts/validation/validate-pr-contract.mjs` and
  `scripts/validation/validate-openspec-linkage.mjs`.
- Non-goals: change the validators or GitHub workflow.
- Acceptance: each documented passing example is accepted by the PR contract
  validator and a missing-marker example is rejected.
- Hazard/recovery: examples can drift; bind them to validator behavior and
  correct or revert the documentation.

### 4. `align-issue-template-labels`

- Scope: Explore selects a new dedicated temporary label that is not referenced
  by an issue template, issue, workflow, or policy, then records its intended
  properties, fresh pre-mutation inventory, creation evidence, deletion
  evidence, and post-mutation inventory before later exact authorization.
- Non-goals: use an intended final template label as rehearsal target,
  introduce organization-wide label policy, or add reusable label automation.
- Acceptance: the dedicated label is safely created and removed with the
  recorded evidence, or its absence is recorded and a different safe externally
  reversible rehearsal is approved before candidate 1 begins.
- Hazard/recovery: this changes external GitHub metadata; inspect current labels
  immediately before mutation and restore the prior set on rollback. Never
  mutate a real label speculatively just to satisfy the exercise.

### 5. `add-docs-issue-template`

- Scope: add one documentation issue form consistent with the verified label
  mapping and existing problem/outcome/scope/acceptance fields.
- Non-goals: redesign bug or feature intake, add template automation, or change
  Project fields.
- Acceptance: GitHub accepts the form syntax, all referenced labels exist, and
  a rendered/manual review covers required and optional fields.
- Hazard/recovery: malformed forms can block intake; retain the existing forms
  and recover by reverting only the new form.

### 6. `remove-unused-sample-fixture-config`

- Scope: remove the unused `ruleSets.fixtures.sampleChangePath` setting from
  `quality/openspec-artifact-rules.json` after confirming no consumer exists.
- Non-goals: create an eval framework, new fixture tree, or validator behavior.
- Acceptance: repository search finds no dangling reference and all existing
  validators/tests remain green.
- Hazard/recovery: an unknown consumer would make removal incompatible; Explore
  must find consumers first, and any discovery pauses Propose for redesign.

### 7. `resolve-pr-validation-signal`

- Scope: inspect the calculated `requiresOpenSpecValidation` return field from
  the PR/linkage validators and remove it with its direct tests unless Explore
  identifies a concrete consumer with distinct necessary behavior.
- Non-goals: add a second CI policy, hidden validation gate, or unrelated PR
  workflow behavior.
- Acceptance: repository search finds no consumer and the dead field/tests are
  removed, or Explore records the concrete consumer and pauses for a scoped
  design decision.
- Hazard/recovery: removing a hidden consumer would be incompatible; search
  current sources before changing code and revert the focused removal if a
  consumer is discovered.

### 8. `add-tracking-schema-examples`

- Scope: add one positive tracking example with two valid, distinguishable
  implementation-repository entries and one negative example with a duplicate
  tracking key; test both through the repository validator.
- Non-goals: replace the JSON schema, introduce a second YAML parser, or treat an
  example as configuration.
- Acceptance: the positive example validates; the negative example fails with
  the stable bounded duplicate-key rejection; examples contain placeholders
  rather than environment-specific values.
- Hazard/recovery: examples can become stale or leak local identifiers; run the
  portability validator and remove/revise only the examples and their tests.

### 9. `reject-ambiguous-archive-lookup`

- Scope: make archived-change lookup select an archive only when one exact
  canonical match exists; reject zero and more than one suffix match with clear
  correction guidance.
- Non-goals: redesign active-change lookup, add broad archive indexing, or
  change unrelated linkage policy.
- Acceptance: direct tests cover exact-match success, zero-match failure, and
  ambiguous suffix-match failure.
- Hazard/recovery: archive naming can be ambiguous; preserve existing valid
  exact lookup behavior and revert the focused validator/test change if it
  rejects a proven canonical archive.

### 10. `docs-dogfood-findings`

- Scope: summarize the observation log after candidates 1–9, including actual
  recovery events, runs with no recovery, repeated pain, and conclusions about
  whether any automation is justified.
- Non-goals: invent a recovery, implement automation, or generalize from an
  unevidenced event.
- Acceptance: every conclusion points to a sanitized observation/evidence
  record; absence of a recovery is reported explicitly; proposed follow-up work
  remains proposed rather than created.
- Hazard/recovery: logs can contain secrets or transient identifiers; preserve
  only bounded, non-sensitive evidence and remove unsafe content before commit.

## Campaign preflight

Complete once before candidate 1:

1. Make this roadmap, both runbooks, the observation log, and review
   disposition `DRR-2026-09-03-01` durable in planning-only commits. Preserve
   unrelated worktree changes.
2. Run the disposition's PF1 `align-tracking-contract`, PF2
   `align-artifact-quality-gates`, and PF3 `make-dogfood-entry-coherent` as
   serial, independently reviewed changes. Record their final issue, OpenSpec,
   PR, archive, and observation evidence here; the proposed names are not
   records until intake creates them.
3. PF3 lifecycle-record delivery is durable. OBS-007 rechecked every item in
   the disposition's campaign entry gate; all inputs passed, so candidate 1
   changed from `Blocked` to `Not started`. Mark it `In progress` only when its
   Explore actually begins. A later failed or unavailable recheck returns it to
   `Blocked` with its recovery path.
4. Record tool versions, workflow selection, active changes, current tests,
   validators, and strict OpenSpec output in the observation log.
5. Verify GitHub authentication and discover the current repository, default
   branch, Project, fields, labels, and protection/review expectations. Do not
   mutate them during discovery.
6. Confirm issue #1 is the intake record for candidate 1 and do not create a
   duplicate.
7. Record the current product/support proportions manually and reproducibly.
   The authored-product denominator is the unique checked inventory of workflow
   docs/configuration, validator and parser sources, schemas/rules,
   templates/workflows, and living specs. The supporting numerator is any new
   helper, harness, fixture, or orchestration that exists only for those
   surfaces. Generated assistant entries are a separate generated-copy count;
   exclude their duplicated lines from the authored-product denominator. Record
   the exact path inventories, `git ls-files`/`sort -u`/`wc -l` command, result,
   and three-times review conclusion in the observation ledger. Do not add a
   counter or controller.

## Preflight delivery evidence

| Repair | Issue | Implementation delivery | Lifecycle record | Archive and observation state |
|---|---|---|---|---|
| PF1 `align-tracking-contract` | [#2](https://github.com/joericearchitect/jra-sdd-workflow/issues/2) | [PR #3](https://github.com/joericearchitect/jra-sdd-workflow/pull/3) | [PR #4](https://github.com/joericearchitect/jra-sdd-workflow/pull/4) | [Archived change](../../openspec/changes/archive/2026-09-04-align-tracking-contract/). Its resources predate the cleanup contract and remain legacy rather than qualifying cleanup evidence. |
| PF2 `align-artifact-quality-gates` | [#8](https://github.com/joericearchitect/jra-sdd-workflow/issues/8) | [PR #9](https://github.com/joericearchitect/jra-sdd-workflow/pull/9) | [PR #10](https://github.com/joericearchitect/jra-sdd-workflow/pull/10) | [Archived change](../../openspec/changes/archive/2026-09-05-align-artifact-quality-gates/); OBS-005 records the first qualifying manual cleanup run. |
| PF3 `make-dogfood-entry-coherent` | [#12](https://github.com/joericearchitect/jra-sdd-workflow/issues/12) | [PR #13](https://github.com/joericearchitect/jra-sdd-workflow/pull/13) | [PR #14](https://github.com/joericearchitect/jra-sdd-workflow/pull/14) | [Archived change](../../openspec/changes/archive/2026-09-05-make-dogfood-entry-coherent/); OBS-006 records proportion measurement and OBS-007 records the completed campaign-entry recheck. |

## Per-change loop

Repeat for each candidate. Candidates in an approved batch may be active in
separate manual sessions, subject to the batch entry conditions and shared
record coordination above:

1. **Issue and Project** — reuse the named issue or create one from the accepted
   candidate; add it to the configured Project; record its current configured
   status without assuming a field or option name.
2. **Explore** — invoke the selected Explore action using the issue, candidate
   definition, workflow guide, configuration, and named source paths. Record
   conclusions and blockers; do not create artifacts or mutate GitHub.
3. **Propose** — create the proposal, delta specs, design, and tasks. Create
   repository-specific `tracking.yaml` separately. Do not Apply.
4. **Validate planning artifacts** — run and record:

   ```bash
   node --test "scripts/validation/test/*.test.mjs"
   node scripts/validation/validate-no-hardcoded-environment.mjs
   node scripts/validation/validate-tracking.mjs "openspec/changes/<change>/tracking.yaml"
   node scripts/validation/validate-openspec-artifacts.mjs "openspec/changes/<change>"
   openspec validate --all --strict
   git diff --check
   git status --short
   ```

5. **Planning review and Apply authorization** — review scope, non-goals,
   requirements, design decisions, tasks, dependencies, recovery, and evidence.
   Apply starts only after explicit authorization for the named change.
6. **Register implementation workspace** — under the derived shared Git
   metadata root, plan separate implementation branch and worktree entries
   before manual creation; inspect and register exact matches. Preserve the
   primary worktree and retain failed attempts as cancelled or blocked history.
7. **Apply** — implement ordered tasks and mark a task complete only when its
   current `Evidence:` exists. On a second repair to the same component, pause
   for design review instead of attempting a third fix.
8. **Verify and rerun gates** — invoke Verify, resolve objective findings within
   the agreed scope, rerun affected focused checks, then rerun the complete
   validation set from step 4.
9. **Implementation PR** — open a PR containing `Closes #N` and
   `OpenSpec change: <change>`. Merge only after review and CI are green. Confirm
   the issue is closed and delivery evidence names the merged commit and PR.
   Bind only registered implementation resources to that PR and commit,
   revalidate the register, and record any resulting Project completion while
   leaving the campaign row `In progress`.
10. **Sync and Archive** — from the merged head, invoke the selected Sync action,
   verify living specs, then invoke Archive. Archive only after its delivery and
   closed-issue gates pass.
11. **Register and deliver lifecycle records** — from the current default
    branch, separately plan, create manually, inspect, and register the
    lifecycle-record branch and optional secondary worktree. Commit only the
    synced living specs, archived
    change, and campaign-ledger updates. Open a PR containing `Related to #N`
    and `OpenSpec change: <change>`. Merge after linkage CI and validation pass;
    bind only registered lifecycle-record resources to that PR and commit, then
    revalidate the register.
12. **Workspace cleanup** — confirm delivery gates, audit only registered
    selected-change resources, and display exact eligible local actions. After
    separate authorization, re-inspect and perform exact manual actions with a
    started receipt, worktree before branch. Preserve any primary, remote,
    unregistered, dirty, locked, unknown, mismatched, externally referenced, or
    state-drifted resource and follow its recorded exit.
13. **Close the loop** — confirm the lifecycle-record commit is on the default
    branch, confirm the Project reflects implementation delivery, mark the
    campaign candidate `Done`, and record cleanup qualification, friction,
    recovery, checks, URLs, and skipped or blocked evidence in
    `dogfood-observations.md`.

## Workspace cleanup evidence threshold

A qualifying manual cleanup run must have at least one registered resource,
complete every applicable delivery gate, carry a fresh audit through an exact
manual cleanup or preservation decision, finish a valid receipt, and record a
sanitized observation. A zero-resource exercise is a useful safety test but
does not count. Interrupted work counts only after resume produces a finished
receipt; separate attempts within one change remain one run.

Cleanup stays manual throughout the campaign. Evidence may trigger a later
design review only after at least ten qualifying end-to-end runs, the same
bounded friction in at least three independent runs, no unresolved relevant
safety issue, and a proposed adapter that is narrow and proportionate. Meeting
the threshold permits review; it does not authorize automation.

## Exit criteria

The workflow is proven for this campaign only when:

- All ten candidates are `Done` on the default branch.
- Every candidate has one issue, one merged implementation PR, one merged
  lifecycle-record PR, a valid archived change, and synchronized living specs.
- Every candidate whose resources were created after the cleanup contract was
  delivered has a finished valid cleanup receipt, or an explicit unresolved
  blocker that keeps the candidate from `Done`.
- Issue, Project, tracking, PR, spec, task, archive, and commit identifiers agree.
- All required tests and validators pass at each candidate's final lifecycle
  commit; skipped or unavailable evidence is recorded rather than treated as
  passing.
- The observation log identifies repeated pain by phase and run count.
- Candidate 10 reports actual recovery evidence or explicitly reports that no
  recovery occurred; it does not manufacture one.
- Any proposed automation is deferred until after the ten manual runs and is
  justified by the recorded observations.

## Ground rules

- Manual first: do not automate a campaign step mid-run.
- Derive environment values or take them from product-owned configuration.
- Every blocking gate includes a documented exit or recovery path.
- A second repair to the same component triggers design review.
- Preserve unrelated work and use change-scoped commits.
- Keep supporting machinery proportional and record the measurement basis.
