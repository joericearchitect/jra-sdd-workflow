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

- Work is serial: only one campaign change is active at a time.
- Proposal and Apply remain separate authorization boundaries.
- Every candidate uses the `prototype-rapid` delivery profile because it
  changes repository documentation, configuration, tests, or GitHub metadata;
  it handles no production data and can be recovered by a scoped revert or
  metadata reversal. The profile does not authorize GitHub mutations, Apply,
  merge, Sync, or Archive.
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
- Values such as repository, owner, Project, branch, labels, issue number, and
  paths are discovered from the current environment or supplied configuration.
  They are not copied from examples.

## Current state

- GitHub issue [#1](https://github.com/joericearchitect/jra-sdd-workflow/issues/1)
  exists for candidate 1 and is on the configured Project in its initial state.
- No OpenSpec change has been created yet.
- Candidate 1 is blocked by the preflight repairs in
  [review disposition `DRR-2026-09-03-01`](../review-records/2026-09-03-dogfood-preflight-review-disposition.md).
  Raw model review output remains temporary scratch; this disposition is the
  durable source for the accepted findings and repair scope.
- The baseline has 9 passing Node tests; the hardcoded-environment validator
  passes; `openspec validate --all --strict` reports no items to validate.
- These planning files are included in the planning-only preflight commit before
  candidate 1 proceeds.

Status values are alternatives, not a mandatory sequence:
`Not started` | `In progress` | `Blocked` | `Done`.

## Campaign checklist

Uncreated issue and OpenSpec identifiers are proposals until their records
exist.

| # | Proposed OpenSpec change | Issue | Outcome | Hard dependencies | Status |
|---|---|---|---|---|---|
| 1 | `docs-tracking-format` | [#1](https://github.com/joericearchitect/jra-sdd-workflow/issues/1) | A contributor can author valid `tracking.yaml` without reading validator source | PF1–PF3 in `DRR-2026-09-03-01` | Blocked |
| 2 | `docs-definition-of-done` | TBD | Contributors can identify entry, exit, evidence, and recovery expectations for every lifecycle phase | None | Not started |
| 3 | `docs-pr-linkage-contract` | TBD | README users can author implementation and lifecycle-record PR bodies that pass linkage validation | None | Not started |
| 4 | `align-issue-template-labels` | TBD | Issue-form labels and live repository labels agree, with a documented recovery path | None | Not started |
| 5 | `add-docs-issue-template` | TBD | Documentation work has an intake form using verified labels and the existing SDD fields | 4 | Not started |
| 6 | `remove-unused-sample-fixture-config` | TBD | Artifact rules contain no dangling fixture setting that no validator consumes | None | Not started |
| 7 | `add-artifact-validator-negative-tests` | TBD | Tests prove task validation rejects missing dependency metadata, missing evidence metadata, and completed tasks with empty evidence | None | Not started |
| 8 | `add-tracking-schema-examples` | TBD | A checked positive example passes tracking validation and a checked negative example fails for the documented reason | 1 | Not started |
| 9 | `add-contributing` | TBD | Contributors have a concise artifact-anatomy and lifecycle entry guide linked to authoritative sources | 1–3 | Not started |
| 10 | `docs-dogfood-findings` | TBD | The campaign's observed friction, recoveries, non-events, and automation conclusions are recorded without fabricating a recovery | 1–9 | Not started |

The numbered order is the campaign sequence. It is not a dependency claim;
only the prerequisites in the hard-dependencies column block candidate
readiness.

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

- Scope: reconcile every label named by `.github/ISSUE_TEMPLATE/*.yml` with the
  live repository labels and document the chosen configuration-owned mapping.
- Non-goals: introduce organization-wide label policy or reusable label
  automation.
- Acceptance: every template label appears in a fresh live-label inventory,
  template configuration names no absent label, and reversal steps are recorded
  before mutation.
- Hazard/recovery: this changes external GitHub metadata; inspect current labels
  immediately before mutation and restore the prior set on rollback.

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

### 7. `add-artifact-validator-negative-tests`

- Scope: add focused tests for `validateTasks` behavior in
  `scripts/validation/validate-openspec-artifacts.mjs`.
- Non-goals: change validator behavior, test tracking parsing, or build a broad
  fixture framework.
- Acceptance: deterministic tests reject a task without `Depends on:`, a task
  without `Evidence:`, and a completed task whose evidence is empty; a minimal
  valid task plan still passes.
- Hazard/recovery: tests may encode implementation details; assert stable rule
  IDs and externally visible validation results, then revert the tests if the
  contract is shown to be wrong.

### 8. `add-tracking-schema-examples`

- Scope: add one positive and one negative tracking example in a clearly named
  example/fixture location and test them through the repository validator.
- Non-goals: replace the JSON schema, introduce a second YAML parser, or treat an
  example as configuration.
- Acceptance: the positive example validates; the negative example fails with
  the intended stable issue path/rule; examples contain placeholders rather
  than environment-specific values.
- Hazard/recovery: examples can become stale or leak local identifiers; run the
  portability validator and remove/revise only the examples and their tests.

### 9. `add-contributing`

- Scope: add `CONTRIBUTING.md` describing issue intake, per-change artifact
  anatomy, authorization boundaries, validation, and links to authoritative
  workflow documentation.
- Non-goals: duplicate the full workflow guide or define new governance.
- Acceptance: a contributor can locate every required artifact and command from
  the guide, and link/duplication review finds no conflicting lifecycle rules.
- Hazard/recovery: duplicated prose can drift; prefer links and recover with a
  scoped documentation correction or revert.

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
3. Confirm every item in the disposition's campaign entry gate. Only then
   change candidate 1 from `Blocked` to `Not started`; mark it `In progress`
   when its Explore actually begins.
4. Record tool versions, workflow selection, active changes, current tests,
   validators, and strict OpenSpec output in the observation log.
5. Verify GitHub authentication and discover the current repository, default
   branch, Project, fields, labels, and protection/review expectations. Do not
   mutate them during discovery.
6. Confirm issue #1 is the intake record for candidate 1 and do not create a
   duplicate.
7. Record the current product/support proportions. For this campaign, workflow
   docs/config, validators, schemas/rules, templates/workflows, living specs,
   and generated assistant entry points are product surfaces. New helpers,
   harnesses, fixtures, or orchestration used only to support those surfaces
   are supporting machinery. Report generated entry-point size separately so
   the classification remains visible. Stop for review if cumulative supporting
   machinery approaches three times the product it supports.

## Per-change loop

Repeat for each candidate, without overlapping active changes:

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
6. **Apply** — implement ordered tasks and mark a task complete only when its
   current `Evidence:` exists. On a second repair to the same component, pause
   for design review instead of attempting a third fix.
7. **Verify and rerun gates** — invoke Verify, resolve objective findings within
   the agreed scope, rerun affected focused checks, then rerun the complete
   validation set from step 4.
8. **Implementation PR** — open a PR containing `Closes #N` and
   `OpenSpec change: <change>`. Merge only after review and CI are green. Confirm
   the issue is closed and delivery evidence names the merged commit and PR.
   Record any resulting Project completion while leaving the campaign row
   `In progress`.
9. **Sync and Archive** — from the merged head, invoke the selected Sync action,
   verify living specs, then invoke Archive. Archive only after its delivery and
   closed-issue gates pass.
10. **Lifecycle-record PR** — commit only the synced living specs, archived
    change, and campaign-ledger updates. Open a PR containing `Related to #N`
    and `OpenSpec change: <change>`. Merge after linkage CI and validation pass.
11. **Close the loop** — confirm the lifecycle-record commit is on the default
    branch, confirm the Project reflects implementation delivery, mark the
    campaign candidate `Done`, and record friction, recovery, checks, URLs, and
    skipped or blocked evidence in `dogfood-observations.md`.

## Exit criteria

The workflow is proven for this campaign only when:

- All ten candidates are `Done` on the default branch.
- Every candidate has one issue, one merged implementation PR, one merged
  lifecycle-record PR, a valid archived change, and synchronized living specs.
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
