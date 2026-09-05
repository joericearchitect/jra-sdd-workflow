## 1. Align the published artifact contract

- [x] 1.1 Add the exact validator-required proposal and design headings and the
  literal `Depends on:` and `Evidence:` task metadata to the applicable
  OpenSpec rules.
  Depends on: Proposal and artifact-quality-validation specification.
  Evidence: `openspec/config.yaml` names every enforced literal and the focused
  artifact-validator tests remain runnable.
- [x] 1.2 Document the same artifact shape and the bounded correction and
  revalidation paths for missing specs, invalid `skip_specs` metadata, missing
  sections or task metadata, and task-shaped requirements.
  Depends on: 1.1.
  Evidence: `docs/sdd-workflow.md` contains the literal contract and recovery
  paths without authorizing implementation or external mutation.

## 2. Implement focused validator behavior

- [x] 2.1 Read and validate the selected change's `.openspec.yaml` metadata,
  returning bounded diagnostics for a missing, malformed, or unsupported
  `skip_specs` declaration.
  Depends on: Artifact-quality-validation specification and design decision 1.
  Evidence: direct validator tests cover valid, missing, malformed, and
  unsupported metadata without unhandled errors.
- [x] 2.2 Permit absent delta specs only for `skip_specs: true`, while retaining
  validation for every supplied spec and the existing failure when the
  declaration is omitted or false.
  Depends on: 2.1.
  Evidence: direct tests prove the accepted documentation-only form, rejected
  omitted/false forms, and rejection of an invalid supplied spec.
- [x] 2.3 Replace the named-artifact verb heuristic with checklist-based
  task-shape detection while retaining normative-language and scenario checks.
  Depends on: Artifact-quality-validation specification and design decision 3.
  Evidence: direct tests reject a checkbox task and accept a normative
  named-artifact behavior requirement.

## 3. Add direct regression coverage

- [x] 3.1 Add a focused Node test module for every required proposal and design
  section, task metadata, completed-task evidence, metadata branch, and
  requirement-classification outcome.
  Depends on: 2.1, 2.2, and 2.3.
  Evidence: the new test module passes independently and asserts stable rule
  IDs for each intended rejection.

## 4. Validate, review, and prepare delivery

- [x] 4.1 Run the focused and complete validation set, including the Node test
  suite, portability check, tracking validation, change-level artifact
  validation, strict OpenSpec validation, and `git diff --check`.
  Depends on: 1.1, 1.2, and 3.1.
  Evidence: recorded zero-exit output for every required validation command;
  any unavailable GitHub evidence remains explicitly blocked rather than
  treated as passing.
- [x] 4.2 Review the implementation against the proposal, specification, and
  design; prepare the change-scoped implementation delivery with the required
  issue linkage and OpenSpec marker after approval.
  Depends on: 4.1.
  Evidence: a reviewed diff, verification report, and proposed PR body naming
  issue #8 and `OpenSpec change: align-artifact-quality-gates`; delivery is not
  performed without separate authorization.
