## 1. Contract Alignment

- [x] 1.1 Add schema and validator comments that identify the v1 schema as the
  portable contract and the unsafe-field scan as its repository security
  extension. Depends on: None. Evidence: source review confirms both comments
  distinguish the authority boundary without embedding environment-specific
  values.
- [x] 1.2 Implement focused validation for every existing v1 value constraint:
  non-empty strings, repository shape, positive integers, URI syntax, and
  non-empty repositories and paths. Depends on: 1.1. Evidence: each constrained
  invalid fixture returns an issue at the expected stable field path.
- [x] 1.3 Preserve parse, validation, and normalization boundaries so malformed
  input exits non-zero with a bounded diagnostic and invalid data never
  normalizes. Depends on: 1.2. Evidence: direct CLI tests observe exit code 2
  for malformed YAML, exit code 1 for invalid metadata, and no normalized
  output on either failure.

## 2. Direct Coverage

- [x] 2.1 Add `scripts/validation/test/tracking.test.mjs` with a valid fixture
  and table-driven cases for every v1-constrained missing field, wrong type,
  and invalid value. Depends on: 1.2. Evidence: the suite proves acceptance of
  valid metadata and rejection of every constrained invalid input.
- [x] 2.2 Add direct cases for expected-change mismatch, unsafe fields,
  malformed YAML, stable issue paths, and parse/stringify/parse equivalence.
  Depends on: 1.3. Evidence: focused tests verify each required failure or
  round-trip behavior without depending on a pull request or GitHub state.

## 3. Verification and Review

- [x] 3.1 Run the focused test suite and all repository and change validation
  commands required by `AGENTS.md`. Depends on: 2.1, 2.2. Evidence: captured
  passing command results for Node tests, hardcoded-environment validation,
  change artifact validation, and strict OpenSpec validation.
- [x] 3.2 Review the schema-to-validator-to-test constraint matrix, security
  boundary, diagnostics, and rollback path before delivery. Depends on: 3.1.
  Evidence: review records no remaining drift or identifies an actionable
  blocker; a second repair request triggers design review rather than a third
  implementation attempt.
- [x] 3.3 Correct the Node 20 delivery command so shell expansion supplies the
  existing validator test files to Node, and keep required local guidance
  aligned. Depends on: 3.1. Evidence: a fresh pull-request validation workflow
  runs all validator tests and passes without changing the selected test set.
