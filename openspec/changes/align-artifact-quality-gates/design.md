## Context

See `proposal.md` for motivation and
`specs/artifact-quality-validation/spec.md` for the observable contract. The
focused artifact validator currently always requires a delta spec, reads no
change metadata, and uses one heuristic that treats named-artifact behavior as
an implementation task. Its required headings and task metadata are not fully
expressed in the assistant-facing rules or workflow guide. No direct test file
currently exercises this validator.

## Goals / Non-Goals

**Goals:**

- Make custom and standard OpenSpec validation satisfiable for the same
  documentation-only and spec-bearing change forms.
- Give contributors exact, bounded correction guidance without adding an
  execution mechanism.
- Establish direct regression coverage for metadata, artifact structure, and
  requirement classification.

**Non-Goals:**

- Parsing arbitrary YAML, adding a dependency, or creating a general fixture
  framework.
- Changing the OpenSpec schema, selected actions, tracking contract, PR
  linkage, GitHub state, or external services.
- Broadening the validator beyond the artifact contract described by this
  change.

## Decisions

### 1. Reuse the repository's narrow YAML reader for change metadata

The validator will reuse the existing repository-local scalar YAML reader to
read `.openspec.yaml`, wrapping malformed input in an artifact-validator
diagnostic. `skip_specs` is optional; when present it must be a boolean. A
missing metadata file, malformed YAML, or another value is a bounded metadata
failure.

This avoids a dependency and keeps supported assistants on the same Node-only
path. A new YAML package or a second parser is rejected as disproportionate;
silently coercing strings such as `"true"` is rejected because it hides a
planning error.

### 2. Treat `skip_specs` as an absence exception, not a validation bypass

The spec-file discovery step will receive validated change metadata. It will
skip the missing-spec failure only for `skip_specs: true`; if any spec files are
present, their requirement and scenario checks still run. An omitted or false
declaration retains the existing missing-spec failure.

This matches standard OpenSpec behavior while preserving the custom validator's
checks for every supplied artifact. Treating all declared documentation-only
changes as exempt from all spec validation is rejected because stale or
accidentally included specs would escape review.

### 3. Identify task-shaped requirements by checklist syntax

The requirement classifier will use explicit checkbox syntax as the stable
signal for an implementation checklist. It will not infer a task merely from a
verb paired with a backticked artifact name; normative requirements remain
subject to their existing SHALL/MUST and scenario checks.

This makes the rule testable and permits normal behavioral language. Retaining
the current verb-and-file heuristic is rejected because it contradicts the
documented behavior boundary.

### 4. Publish one literal artifact shape and correction path

`openspec/config.yaml` and `docs/sdd-workflow.md` will name the exact headings
and `Depends on:`/`Evidence:` fields enforced by the rule file. The workflow
guide will also state how to correct missing specs, an invalid
documentation-only declaration, a malformed metadata file, and a task-shaped
requirement before rerunning validation.

The rule JSON remains the validator's machine-readable source. Duplicating the
full rules file or generating documentation from it is rejected: both would add
supporting machinery before manual use demonstrates the need.

### 5. Add focused temporary-change tests

A direct Node test module will build minimal temporary change directories and
assert stable rule IDs for the accepted and rejected forms. It will cover every
required proposal and design section, task metadata, documentation-only
metadata branches, malformed and unsupported metadata, completed-task
evidence, checklist requirements, and named-artifact behavioral requirements.

This is smaller than a committed fixture tree and gives every failure a local,
deterministic correction target. Existing full-suite validation remains the
integration check.

## Risks / Trade-offs

- [The narrow metadata reader accepts less YAML than a full parser] → document
  the bounded syntax failure, correct the selected metadata file, and re-run
  validation; do not add a parser as an unreviewed repair.
- [Rule text and documentation can drift later] → direct tests assert the
  machine contract, and the documented correction path points contributors to
  the same validator command.
- [A checklist-only classifier can miss prose that resembles a task] → retain
  normative-language and scenario checks, and require a separate design review
  before any second repair to the classifier.
- [A metadata diagnostic could expose unsafe content] → apply the existing
  security boundary by reporting only a bounded file or field path; never echo
  metadata, issue, or prompt content.

## Migration Plan

1. Update the local validator, its direct tests, and the two documented rule
   surfaces in one scoped implementation.
2. Run focused and complete validation before review.
3. Contributors repair any rejected active change by adding the documented
   metadata, section, or task field and rerunning the same command; no stored
   data or external-state migration is needed.
4. Roll back through a scoped revert of the change if its contract proves
   incompatible. A second validator-classification repair requires design
   review before further modification.

## Verification Strategy

- A direct Node test module proves each positive and negative metadata branch,
  artifact section and task metadata requirement, completed-task evidence,
  task checklist rejection, and named-artifact behavioral acceptance.
- `node --test scripts/validation/test/*.test.mjs`, the portability validator,
  change-level artifact validation, and strict OpenSpec validation pass.
- A documentation review confirms that every enforced literal and recovery path
  is present in both assistant-facing rules and the contributor guide.

## Recovery

If metadata cannot be read, preserve the selected change, correct only the
named metadata file or field, and rerun the validator. If a supplied delta spec
is invalid, correct that spec rather than deleting it to bypass review. If the
implementation needs a second repair to the metadata or requirement classifier,
stop and request design review. A scoped revert restores the preceding contract
and is followed by the same validation set.

## Reuse Plan

Reuse the current OpenSpec metadata convention, repository-local YAML reader,
rule JSON, focused Node validator, and Node test runner. No external service,
credential, destructive action, or new automation is introduced.

## Attribution and Licensing

This change uses existing repository code and Node.js platform APIs only. It
adds no third-party code, generated content, or new licensing obligation; its
attribution is the repository's existing license and source history.
