## 1. Author the tracking reference

- [x] 1.1 Add `docs/tracking-format.md` with the required v1 structure,
  constraints, expected-change behavior, focused validation command, portable
  placeholder example, unsafe-field policy, validation boundaries, and scoped
  recovery guidance.
  Depends on: None.
  Evidence: Documentation review maps every required field and stated boundary
  to `schemas/openspec-tracking-v1.schema.json` or
  `scripts/validation/lib/tracking.mjs`; the example contains no local identity,
  credentials, or mutable delivery-state fields.

- [x] 1.2 Link the new tracking reference from `docs/sdd-workflow.md` at the
  point contributors need to create change metadata, without duplicating the
  field reference.
  Depends on: 1.1.
  Evidence: Rendered Markdown review shows a working relative link and keeps
  the workflow guide focused on lifecycle guidance.

## 2. Validate and review the documentation change

- [x] 2.1 Author a fresh `tracking.yaml` from the published example using only
  environment-derived or supplied configuration values, then validate it with
  `node scripts/validation/validate-tracking.mjs`.
  Depends on: 1.1.
  Evidence: The focused validator exits successfully for the fresh file, whose
  `openspec.change` matches its expected change name.

- [x] 2.2 Run the required validation commands and review the scoped diff for
  documentation drift, portability, unsafe metadata, and unintended behavior
  changes.
  Depends on: 1.2, 2.1.
  Evidence: The Node test suite, no-hardcoded-environment validator,
  selected-change tracking and artifact validators, and strict OpenSpec
  validation pass; review confirms no schema, parser, validator, or GitHub
  state change.
