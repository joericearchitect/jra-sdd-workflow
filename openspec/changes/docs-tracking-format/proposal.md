## Why

Contributors currently have to read the tracking schema and validator source to
author valid `tracking.yaml` metadata. A concise reference grounded in those
sources will make the required metadata, validation boundary, and safe recovery
path clear without changing the contract.

The primary intake record is [GitHub issue #1](https://github.com/joericearchitect/jra-sdd-workflow/issues/1).

## What Changes

- Add a human-readable `tracking.yaml` reference under `docs/` and link to it
  from `docs/sdd-workflow.md`.
- Describe the required v1 fields, their shape constraints, the expected-change
  check, and the focused validation command.
- Include a portable placeholder example and explain that repository, branch,
  issue, and Project values are derived from the active environment or supplied
  configuration.
- Describe the validator's unsafe-field policy and its correction path without
  recording sensitive values or mutable delivery state.
- Record the validator boundaries that are not checked, so documentation does
  not promise external repository, path, or issue-identity verification.

## Non-Goals

- Change the tracking schema, parser, validator, normalization behavior, or
  linkage policy.
- Add a documentation parser, test harness, controller, or other automation.
- Change GitHub issues, Project state, or existing tracking metadata.
- Define a new durable product capability or living OpenSpec requirement.

## Capabilities

### New Capabilities

None. This documentation-only change adds no durable observable capability.

### Modified Capabilities

None. Existing tracking-contract behavior remains unchanged.

## Impact

- Affected files: a new documentation reference and `docs/sdd-workflow.md`.
- Affected users: contributors and reviewers who create or inspect
  `tracking.yaml` files.
- Compatibility and migration: no schema, API, or stored-data change. Existing
  valid tracking files remain valid; the new reference uses placeholders rather
  than environment-specific values.
- Security: the reference will direct users away from credentials and mutable
  delivery metadata, and will not embed secrets or local identifiers.
- Verification: a fresh placeholder-based example will be authored from the
  reference and passed through `validate-tracking.mjs`; the existing full
  validation suite and portability check will also run.
- Recovery: if the reference conflicts with the authoritative schema or
  validator, correct or revert only the scoped documentation change and rerun
  the focused validation.
- Planning boundary: this proposal authorizes planning only; Apply requires a
  later explicit approval.

## Reuse Plan

Reuse the published v1 schema, focused parser and validator, existing Node test
runner, and workflow guide. No new dependency, reusable skill, external
service, or automation is introduced.
