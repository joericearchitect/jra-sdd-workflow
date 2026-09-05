## Why

The published assistant guidance, the repository artifact validator, and strict
OpenSpec validation currently disagree about what makes a planning change
valid. That disagreement can reject documentation-only changes and ordinary
behavioral requirements even when contributors follow the intended workflow.

## What Changes

- Align the assistant-facing artifact rules and workflow documentation with the
  exact structure and task metadata enforced by the validator.
- Make artifact validation interpret a change's `skip_specs: true` declaration
  so a documentation-only change can complete without inventing a delta
  requirement, while still validating any delta specs it contains.
- Narrow the implementation-task heuristic to reject actual task-shaped
  requirements without rejecting observable requirements that name a file or
  artifact.
- Add focused regression coverage and bounded correction guidance for each
  clarified gate.

## Scope

This change covers the repository's artifact-quality contract: OpenSpec rules,
workflow documentation, the focused artifact validator, and its direct tests.

## Non-Goals

- Changing the selected OpenSpec workflow or relaxing required artifact
  structure, task evidence, or standard strict validation.
- Adding a controller, autonomous runner, fixture framework, or reusable
  execution adapter.
- Changing tracking, PR-linkage, GitHub state, or unrelated validation rules.

## Capabilities

### New Capabilities

- `artifact-quality-validation`: validates planning artifacts against one
  documented contract and gives contributors bounded correction guidance.

### Modified Capabilities

- None.

## Impact

- Primary issue: https://github.com/joericearchitect/jra-sdd-workflow/issues/8
- Affected code and documentation: `openspec/config.yaml`,
  `docs/sdd-workflow.md`, `scripts/validation/validate-openspec-artifacts.mjs`,
  and direct Node validation tests.
- Affected users: contributors and assistants proposing repository changes, and
  reviewers relying on planning-artifact validation.
- Compatibility: a change that declares `skip_specs: true` can omit delta specs;
  changes that do not declare it remain required to provide a valid delta spec.
  Existing valid task and artifact forms remain valid.
- Migration: no stored data or external API migration is required. A rejected
  planning artifact is corrected using the documented field or section named by
  the validator and then revalidated.
- Security: the validator reads only the selected change directory and returns
  bounded diagnostics; it neither executes artifact content nor accesses
  credentials or external state.
- Portability: all validation is repository-local. Repository, account, branch,
  and Project values continue to be discovered from the active environment or
  supplied configuration rather than embedded in portable rules.
- Planning boundary: this proposal authorizes planning only, not implementation.

## Reuse Plan

Reuse the existing OpenSpec schema metadata, declarative artifact-rule file,
focused Node validator, and Node test runner. No dependency, external service,
or new automation is introduced.
