## Purpose

Defines the portable, secure, and testable contract for OpenSpec change
tracking metadata used by contributors and repository delivery validation.

## ADDED Requirements

### Requirement: Enforce the portable v1 tracking contract

The tracking validator SHALL accept a document only when it meets every v1
schema constraint: required top-level and nested fields with their declared
object, array, scalar, and integer types; schema version 1; non-empty change,
owner, and branch strings; repository identifiers with exactly one non-empty
owner/repository separator; positive integer issue and Project numbers; a
syntactically valid issue URI; and at least one implementation repository
containing at least one non-empty path. The published v1 schema is the
authority for these portable shape and value constraints.

#### Scenario: Valid v1 metadata passes

- **WHEN** a tracking document satisfies all required v1 shape and value
  constraints
- **THEN** validation succeeds and returns its normalized metadata

#### Scenario: Constrained v1 value is invalid

- **WHEN** a required field is absent or has the wrong type, a required value is
  empty, a repository identifier has an invalid separator shape, an issue or
  Project number is non-positive or non-integral, an issue URI is invalid, or
  an implementation repository or path list is empty
- **THEN** validation fails and identifies the constrained field that requires
  correction

### Requirement: Preserve the unsafe-field security extension

In addition to the portable v1 schema, the tracking validator SHALL reject
fields that match the repository's documented unsafe-field policy. That policy
prevents credentials, secrets, mutable delivery state, and provider-specific
Project item or field identifiers from entering tracked metadata.

#### Scenario: Schema-valid document contains an unsafe field

- **WHEN** a tracking document otherwise satisfies the v1 schema but contains
  a field prohibited by the unsafe-field policy
- **THEN** validation fails and identifies the prohibited field without
  emitting its value

### Requirement: Report bounded parser and validation failures

The tracking validation command SHALL return a non-zero result with a bounded,
actionable diagnostic for malformed YAML or invalid tracking metadata. It MUST
NOT return a partial normalized document after a parse or validation failure.

#### Scenario: Tracking YAML is malformed

- **WHEN** the validation command receives malformed tracking YAML
- **THEN** it returns a non-zero result with a bounded parse diagnostic and no
  normalized metadata

#### Scenario: Expected change differs from metadata

- **WHEN** the validation command is given an expected change name that differs
  from the tracking document
- **THEN** it returns a non-zero result that identifies the change field and
  the mismatch

### Requirement: Provide deterministic portable validation results

The tracking validation command SHALL provide equivalent validation and
normalization results regardless of which supported assistant invokes it. A
valid document parsed, stringified, and parsed again MUST remain valid and
normalize to the same metadata.

#### Scenario: Valid document round trip

- **WHEN** a valid tracking document is parsed, stringified, and parsed again
- **THEN** both documents validate and have equivalent normalized metadata
