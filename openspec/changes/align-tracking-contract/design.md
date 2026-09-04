## Context

See [proposal.md](proposal.md) for motivation and
[the tracking-contract delta spec](specs/tracking-contract/spec.md) for the
observable behavior. The existing v1 JSON Schema already declares the portable
constraints, but the focused parser and validator enforce only types and a few
presence checks. The result is contract drift: an object can pass the command
without satisfying the schema.

The delivery workflow runs Node 20. Its quoted validator-test glob is passed to
that runtime as a literal path, so CI fails before executing the test suite;
the same command guidance must use shell expansion.

The parser is intentionally a small, constrained YAML reader used only for
tracking metadata. `tracking.yaml` is repository-specific linkage data; the
schema, validator, tests, and change artifacts are repository-owned. The issue
and Project values in this change's tracking file are discovered from the
active GitHub environment, not copied into portable assets.

Portability is preserved because the schema and validator express generic
tracking rules while this change's issue and Project values remain local
metadata.

## Goals / Non-Goals

**Goals:**

- Enforce every existing portable v1 schema constraint in focused validation.
- Make the schema authority and unsafe-field extension explicit where
  contributors and maintainers encounter the contract.
- Add direct, deterministic coverage for parser, validator, and CLI behavior.
- Preserve a small dependency-free implementation that works for every
  supported assistant.

**Non-Goals:**

- Add a general YAML parser, JSON Schema engine, or a new external dependency.
- Change the v1 schema's public constraints or reject otherwise permitted
  non-unsafe extension fields.
- Store credentials, Project item identifiers, mutable delivery state, or
  environment-specific configuration in portable assets.
- Create end-user tracking guidance; candidate 1 owns that documentation after
  this contract is stable.

## Decisions

### Keep the current v1 schema authoritative and mirror it with focused checks

Add a top-level `$comment` to the schema stating that it defines portable shape
and value constraints. Refactor `validateTrackingObject` into small focused
checks for non-empty strings, repository shape, positive integers, URI syntax,
and non-empty arrays. The validator will use `Number.isInteger` rather than a
generic numeric check, and URI validation will use the platform URL parser
without resolving or fetching a URI.

This preserves the declared v1 contract without a general schema runtime. A
JSON Schema engine was considered, but it would add dependency and operational
surface to validate one small fixed document; focused checks are sufficient and
directly testable. The schema remains the source of truth, so any future schema
change must add a paired validator test.

### Preserve the unsafe-field policy as a separate recursive security layer

Retain recursive unsafe-field scanning before portable constraint validation and
document it in a validator code comment and the schema `$comment`. This policy
is deliberately not represented as a general schema restriction because it
applies to any nested extension field and blocks sensitive or mutable delivery
metadata beyond the portable v1 shape.

The alternative—silently treating the scan as schema behavior—would leave the
second contract undocumented. The scanner will report only a field path and
policy diagnostic, never the supplied value.

### Make failure and normalization behavior explicit at the command boundary

Keep parsing, validation, normalization, and CLI rendering separated. A parse
error returns one bounded diagnostic and exit code 2; a validation failure
returns field-level diagnostics, no normalized object, and exit code 1.
Normalization continues only after all checks pass, and sorting remains the
defined deterministic representation.

The alternative—normalizing partially valid data—would make invalid linkage
look usable and violate the failure contract. The command's existing plain-text
and JSON modes remain available; no assistant-specific interaction is added.

### Add a focused test matrix beside the existing validation tests

Add `scripts/validation/test/tracking.test.mjs`. Use small in-test fixtures and
  temporary files where command behavior requires files. Cover one valid fixture;
  each schema-constrained missing field, wrong type, and invalid value;
  expected-change mismatch; unsafe fields; malformed YAML;
  parse/stringify/parse equivalence; stable issue paths; and CLI exit/diagnostic
  behavior. Keep a table of invalid cases so new schema constraints cannot be
  added without a visible corresponding test.

The alternative of relying only on OpenSpec linkage tests would miss direct
parser behavior and make a future drift difficult to localize.

### Expand validator test files in the shell before Node 20 starts

Use the existing unquoted glob in the Validate workflow and required local
command guidance so the shell passes concrete test paths to Node 20. This keeps
the selected test set unchanged and avoids a runtime-version upgrade or a test
runner wrapper.

The alternative—relying on Node's quoted-glob behavior—does not work on the
repository's supported CI runtime and leaves every PR blocked before validation
begins.

## Risks / Trade-offs

- [Focused checks can drift after a future schema edit] → keep the schema
  authority comment, pair every constraint with a named test, and require
  direct validator tests in this change.
- [The limited YAML reader may reject syntax accepted by a full YAML parser] →
  retain its documented narrow subset, provide a bounded parse error, and stop
  for design review rather than adding a second parser repair.
- [URI syntax validation can differ from a human's expectation] → validate
  syntax only, report the affected field, and do not perform network access.
- [Stricter validation rejects previously accepted metadata] → report stable
  field paths and recover by correcting the document to v1; no migration is
  needed because active tracking files are repaired in place.

## Migration Plan

1. Implement the focused checks, authority comments, and test matrix in one
   scoped implementation change.
2. Run direct tests and the repository validation commands defined in
   `AGENTS.md`, including strict OpenSpec validation for this change.
3. Review the schema-to-validator constraint matrix before opening the
   implementation pull request.
4. If validation exposes existing invalid tracking metadata, correct only the
   affected metadata to the published v1 shape and rerun the same checks.
5. Roll back by reverting the scoped implementation commit(s). If tracking
   parsing or validation needs a second repair after this change, pause and
   request design review before attempting another repair.

## Verification Strategy

- `node --test scripts/validation/test/*.test.mjs` passes, including the new
  direct tracking suite.
- `node scripts/validation/validate-no-hardcoded-environment.mjs` passes.
- `node scripts/validation/validate-openspec-artifacts.mjs
  openspec/changes/align-tracking-contract` passes.
- `openspec validate align-tracking-contract --strict` and
  `openspec validate --all --strict` pass.
- Review evidence maps every schema constraint to focused validator behavior
  and a direct test; the valid round trip and malformed-input CLI result are
  included in that evidence.

## Recovery

Recovery is a scoped revert of the PF1 implementation commit(s), followed by
the same validation commands. If the parser or validator requires a second
repair after PF1, pause for design review before changing it again; the exit is
an approved revised design, not an unbounded repair loop.

## Reuse Plan

Reuse the existing small parser, validator command, v1 schema, Node.js platform
APIs, and repository test runner. This change adds no reusable skill,
automation controller, external service, or third-party parser.

## Attribution and Licensing

This change uses only repository code and Node.js platform APIs. It introduces
no third-party code, data, generated assets, or additional license obligations.
