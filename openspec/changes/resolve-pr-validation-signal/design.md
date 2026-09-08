## Context

See [proposal.md](proposal.md) for motivation. `validatePrContract` derives the retired Boolean from changed paths, and `validateOpenSpecLinkage` copies it from the PR result. The linkage GitHub workflow fetches every changed file only to supply that input, while the validation workflow runs `openspec validate --all --strict` independently for every pull request.

The affected repository-owned files are the two validators, focused PR-contract and linkage tests, and `.github/workflows/openspec-linkage.yml`. GitHub issue #30 is on the configured Project as intake evidence only; Apply must not change its Project state. No credential, Project item identifier, or mutable external state belongs in the change artifacts.

Security remains unchanged: validator input stays locally parsed, and this removal introduces no new permission, secret-handling, network, or destructive-action path.

### Review-readiness packet

The planning handoff binds a freshly inspected `origin/main` identity, this
change's five artifacts, the two validators and their focused test surfaces,
the linkage and validation workflows, the primary issue scope, and the named
review record. The change mutates only the paths in `tracking.yaml`.

Technical decisions are owned by this design; task completion evidence is owned
by `tasks.md`; delivered source state is owned by Git and merged pull-request
evidence; campaign status is owned by the configured work-tracking record; and
machine-local cleanup is owned by its receipt. The campaign roadmap is a
read-only external record for this candidate. Candidate 7 does not resolve its
mutable status claims or modify it as part of this change.

### Consumer-to-coverage map

| Consumer or assertion | Source edit or no-edit decision | Verification owner | Task | Producible evidence and recovery |
| --- | --- | --- | --- | --- |
| PR-contract result and `changedPaths` input | Remove the computed field and parameter; retain `valid`, `issues`, `issue`, and `change` behavior. | `scripts/validation/test/pr-contract.test.mjs` | 2.1 | Focused result-contract and valid/invalid behavior tests; return to design review if a supported consumer appears. |
| PR-contract CLI flag | Remove `--changed-paths-file`; retain the generic unknown-argument path. | `scripts/validation/test/pr-contract.test.mjs` | 2.1 | Focused subprocess evidence of exit 2 and the generic unexpected-argument diagnostic; add no bespoke branch. |
| Linkage result and `changedPaths` input | Remove forwarding, the parameter, and the propagated result field; retain valid and invalid linkage behavior. | `scripts/validation/test/openspec-linkage.test.mjs` | 2.3 | New focused linkage tests, including the embedded retained PR result contract; revert the scoped change and return to design review if behavior changes. |
| Linkage CLI flag | Remove `--changed-paths-file`; retain the generic unknown-argument path. | `scripts/validation/test/openspec-linkage.test.mjs` | 2.3 | Focused subprocess evidence of exit 2 and the generic unexpected-argument diagnostic. |
| Linkage workflow file discovery and permission | Remove `pulls.listFiles`, its output/caller argument, and `pull-requests: read`; retain `contents: read` for checkout and the Node PR-body write. | Workflow diff inspection in the candidate review record | 2.2 | The diff shows no file-list API call, caller flag, or removed permission, while the existing Node write remains. |
| Unconditional strict-validation policy | No edit: retain the existing unconditional strict-validation workflow. | `.github/workflows/validate.yml` inspection in the candidate review record | 3.1 | The strict validation step remains unconditional; stop if a real dependency on changed paths is discovered. |
| Repository documentation and living specifications | No edit: repository search finds no relevant reference, and `skip_specs: true` remains correct for an internal implementation detail. | Focused search and artifact validation in the candidate review record | 3.1, 4.1 | Search result, artifact validation, and the existing capability classification; return to design review if a supported behavior or consumer is found. |
| Candidate 8 linkage-test consumer | No candidate-7 source edit beyond creating the planned linkage test harness; candidate 8 extends that harness only after candidate 7 is delivered. | Candidate 8 design decision 5 and its later focused test | 2.3 | Candidate 7 creates the test file; candidate 8's dependency remains an external prerequisite, not an internal task dependency. |

The reverse check is explicit: the candidate's planned mutation-path set equals
the set in `tracking.yaml`; every tracking path has a row above. No-edit
surfaces are reviewed as assertions but are not added to tracking merely for
inspection.

### Scope fan-out, equality checks, and correction trigger

The retired fact appears in the PR-contract result, linkage result, two
parameters, two CLI branches, the linkage workflow API call/output/caller
argument/permission, focused tests, proposal, design, tasks, tracking, and PR
description. A correction to that fact searches each of those assertion
surfaces and records any justified survivor.

Before review, confirm: (1) the planned mutation paths equal `tracking.yaml`'s
paths; (2) each changed-path input occurrence is removed or is an explicitly
reviewed historical/planning reference; (3) the retained PR and linkage result
contracts agree with their focused tests; and (4) task dependencies are
reachable without treating an external delivery gate as a task ID.

For this change, a finding with correctness, security, compatibility,
authorization, recovery, or contractual impact is material regardless of its
severity label and triggers the active correction process. A style-only
observation is dispositioned but does not by itself create another review
cycle. After the third planning pass, any remaining material finding is handled
through design reconciliation, not an ordinary fourth pass.

### Review taxonomy and shared-state boundary

The confirming planning review declares every applicable class as
`swept-clean`, `findings`, or `not-applicable` with a reason: consumer and
reverse-direction coverage; evidence ownership and producibility; task
sequencing and intermediate safety; recovery and abort behavior; external-state
validity; repeated-claim consistency; and boundary conditions for absent,
invalid, and retained behavior. It records stable finding IDs, evidence,
provenance, disposition, and mutation ownership in the review record.

Candidate 8's use of the linkage test harness is a recorded external
prerequisite: candidate 7 produces the harness, candidate 8 consumes it after
candidate 7 delivery, and candidate 8's design decision 5 is the authority for
that ordering. The shared campaign roadmap has a separate integration owner and
is read-only during this candidate review.

## Goals / Non-Goals

**Goals:**

- Retire the unconsumed changed-path pathway at its source, forwarding boundary, CLI, and workflow boundary.
- Preserve all accepted/rejected PR and linkage outcomes and the unconditional CI validation policy.
- Make the absence of the field and the retained validation behavior objectively testable.

**Non-Goals:**

- Make validation conditional, create policy from changed paths, or retain an API call or permission solely for dead input.
- Offer a migration layer for an undocumented result property or change any issue/Project record.

## Decisions

1. Remove the pathway rather than add a consumer. Repository search establishes that no consumer exists, while CI already performs the intended strict validation. Adding a consumer would create duplicate or hidden policy contrary to scope.

2. Remove changed-path arguments and CLI flags with the PR-contract calculation and linkage forwarding. Retaining accepted-but-ignored parameters would leave a misleading interface. This is an intentional removal of an undocumented internal CLI input, not a supported migration target.

3. Retain the existing `actions/github-script` PR-body write and remove only its file-list API call, then remove `pull-requests: read`. The PR event already provides the body, and retaining the Node write prevents untrusted PR text from entering a shell. The selected approach is smaller and safer than a replacement shell step. The rejected alternative is replacing the Node write with a shell step that writes the PR body: it is unnecessary and introduces a shell-adjacent handling path for attacker-controlled pull-request text. Retaining the API call and permission merely to preserve the existing shape is also rejected because it retains dead work and unnecessary privilege.

4. Treat the JSON result and CLI flag as internal repository interfaces. There is no documented supported external consumer, so no compatibility adapter or migration is warranted. The intentionally breaking removal of the undocumented flag does not create a living capability change. Removing each CLI flag branch naturally delegates rejection to the existing generic unexpected-argument branch; no bespoke error path is added. Regression tests will assert the remaining result shape and validation semantics rather than a key-absence-only negative.

5. Do not alter the unconditional strict-validation workflow. It is the existing, visible enforcement mechanism; changing it would expand scope and external CI behavior.

## Verification Strategy

- Update the PR-contract test's expected result shape and add a focused linkage-validator test file that exercises the unchanged valid and invalid linkage behavior after the result and CLI input removal.
- In each focused validator test file, invoke its CLI with the retired flag and assert the existing generic unknown-argument path exits 2; keep retained behavior assertions separate from the flag-removal assertion.
- Inspect the linkage workflow diff to confirm it no longer lists PR files, requests `pull-requests: read`, or supplies the retired CLI flag; confirm the existing Node-based PR-body write remains and no PR text enters a shell.
- Inspect `.github/workflows/validate.yml` to confirm strict validation remains unconditional.
- Record workflow, strict-policy, search, taxonomy, and finding-disposition evidence in `ai-planning/review-records/2026-09-08-candidate-7-planning-recovery.md`; focused test output remains in the test runner and delivery evidence.
- Run the complete Node validator suite, portability validation, selected-change tracking and artifact validation, strict OpenSpec validation, and `git diff --check`.
- Completion evidence is passing focused and complete checks plus a whole-contract review confirming no remaining live repository reference to the retired field.

## Attribution and Licensing

This change uses only repository-authored validator and test code. It adds no third-party code, dependency, asset, license, or automation attribution obligation.

## Recovery

- If a focused search or test identifies a concrete supported consumer, stop Apply and return to design review before creating a replacement policy or compatibility behavior.
- If the removal changes an existing validation outcome, revert the scoped validator/test edit, retain the failing evidence, and return to design review rather than adding a second repair.
- If CI evidence is unavailable, preserve the plan and implementation state; rerun the same checks in an authorized environment without changing CI configuration.
- Before creating an implementation branch or worktree, use a freshly inspected `origin/main` base and exclude unrelated tracked, untracked, archived-copy, and primary-worktree content from it. Preserve that local work in place; do not change it as part of this candidate.

## Reuse Plan

Reuse the existing validator modules, Node test harness, and visible CI workflows. No reusable skill, controller, environment-specific value, or external integration is added.
