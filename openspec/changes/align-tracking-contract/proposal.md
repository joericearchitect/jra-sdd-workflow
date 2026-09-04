## Why

The published tracking schema and focused validator currently accept different
sets of documents. Contributors can therefore pass local validation with
metadata that does not meet the portable v1 contract, making documentation and
delivery linkage unreliable.

## What Changes

- Make the v1 tracking schema the authority for portable shape and value
  constraints enforced by the focused validator.
- Preserve the unsafe-field restriction as a documented repository security
  policy layered on top of the schema.
- Add direct parser and validator tests for valid, invalid, malformed, and
  round-trip tracking documents.
- Document the contract boundary and recovery path for the focused validator.

## Scope

The change covers the v1 schema, its focused parser and validator, the
validation command, source-level contract documentation, and direct tests.

## Non-Goals

- Adding a general YAML or JSON Schema engine.
- Changing OpenSpec artifact-quality gates; PF2 owns that separate repair.
- Creating end-user tracking guidance; Candidate 1 owns that documentation
  after this contract is stable.

## Capabilities

### New Capabilities

- `tracking-contract`: validates portable OpenSpec tracking metadata against
  the v1 contract and reports bounded correction guidance.

### Modified Capabilities

- None.

## Impact

- Primary issue: https://github.com/joericearchitect/jra-sdd-workflow/issues/2
- Affected code: `schemas/openspec-tracking-v1.schema.json`,
  `scripts/validation/lib/tracking.mjs`, `scripts/validation/validate-tracking.mjs`,
  and direct validator tests.
- Affected users: contributors creating `tracking.yaml` and reviewers relying
  on linkage validation.
- Compatibility: malformed or schema-invalid documents previously accepted by
  the focused validator will be rejected; valid v1 documents remain accepted.
- Migration: repair rejected documents to the published v1 schema. No stored
  data migration or external API migration is required.
- Security: the existing unsafe-field policy remains a validator-specific
  extension to prevent secrets, credentials, and mutable delivery state from
  entering tracked metadata.
- Portability: repository, default branch, issue, and Project values remain
  change-specific tracking data derived from the active environment or supplied
  configuration; portable schema and validator assets do not embed them.
- Planning boundary: this proposal authorizes planning only, not implementation.

## Reuse Plan

Reuse the existing v1 schema, focused parser, validation command, and Node.js
test runner. No new reusable skill, automation controller, package, or external
service is introduced.
