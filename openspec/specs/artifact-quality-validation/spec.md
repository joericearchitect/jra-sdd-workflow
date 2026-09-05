# Artifact Quality Validation Specification

## Purpose

Defines one portable, documented validation contract for OpenSpec planning
artifacts so contributors can correct bounded failures without inventing work.

## Requirements

### Requirement: Honor declared documentation-only changes

The artifact validator SHALL read the selected change's OpenSpec metadata. It
MUST permit an absent delta-spec tree only when that metadata declares
`skip_specs: true`. It MUST continue to validate every delta spec that is
present, including when `skip_specs` is true. When the declaration is absent or
false, an absent delta-spec tree MUST remain a validation failure. Malformed or
unsupported metadata MUST produce a bounded diagnostic rather than an
unhandled error.

#### Scenario: Declared documentation-only change has no delta spec

- **WHEN** a selected change declares `skip_specs: true` and contains no delta
  spec files
- **THEN** artifact validation accepts the absence of a delta-spec tree

#### Scenario: Change omits the documentation-only declaration

- **WHEN** a selected change has no delta spec files and omits `skip_specs` or
  declares it false
- **THEN** artifact validation rejects the change with the delta-spec recovery
  path

#### Scenario: Declared change contains an invalid delta spec

- **WHEN** a change declares `skip_specs: true` but includes a delta spec that
  lacks a required requirement scenario
- **THEN** artifact validation rejects the included spec and identifies the
  missing scenario

#### Scenario: Change metadata is malformed

- **WHEN** the selected change metadata cannot be read or declares an
  unsupported `skip_specs` value
- **THEN** artifact validation rejects the metadata with a bounded diagnostic
  that identifies the field or file to correct

### Requirement: Expose the validated artifact contract

The repository SHALL state the exact required proposal and design headings and
the literal `Depends on:` and `Evidence:` task metadata in its assistant-facing
OpenSpec rules and contributor workflow documentation. Those sources MUST give
a correction path for each artifact gate and MUST provide equivalent guidance
to every supported assistant.

#### Scenario: Contributor prepares a standard planning artifact

- **WHEN** a contributor follows the assistant-facing rules and workflow guide
- **THEN** the contributor can locate every heading and task metadata literal
  that artifact validation requires

#### Scenario: Artifact gate fails

- **WHEN** validation reports a missing required section, metadata literal, or
  documentation-only declaration
- **THEN** the workflow documentation identifies the bounded correction and
  revalidation step without authorizing implementation

#### Scenario: Supported assistant reads the contract

- **WHEN** a contributor invokes the repository workflow through any supported
  assistant
- **THEN** that assistant receives guidance for the same artifact contract and
  correction paths

### Requirement: Distinguish behavioral requirements from task checklists

The artifact validator SHALL reject a delta-spec requirement that is written as
an implementation checklist. It MUST NOT reject an otherwise normative
behavioral requirement solely because the behavior names creating, editing,
renaming, or deleting a named artifact.

#### Scenario: Requirement contains an implementation checklist

- **WHEN** a delta-spec requirement contains a task checkbox item
- **THEN** artifact validation rejects the requirement as task-shaped

#### Scenario: Requirement names an artifact behavior

- **WHEN** a normative delta-spec requirement describes creating a named
  artifact as observable behavior and contains no task checkbox
- **THEN** artifact validation evaluates the requirement normally and does not
  reject it solely for naming that artifact
