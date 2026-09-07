# Issue Template Label Alignment Specification

## Purpose

Defines a durable, manual contract ensuring repository issue forms reference
labels that exist in the live repository without introducing label automation.

## Requirements

### Requirement: Resolve maintained issue-form labels

The repository SHALL ensure that every exact label name declared by a
maintained issue form exists in the live repository before a dependent intake
change is considered complete. The current form labels and live label inventory
MUST be discovered from the active environment rather than copied into a
portable asset.

#### Scenario: Form labels exist live

- **WHEN** a contributor compares every maintained issue form with the current
  live label inventory
- **THEN** each declared label name is present in that inventory

#### Scenario: A form label is absent

- **WHEN** discovery finds a maintained issue-form label that is missing from
  the live inventory
- **THEN** the workflow records the mismatch and does not claim label alignment
  until an authorized reconciliation verifies the label exists

### Requirement: Rehearse reversible label reconciliation

Before an authorized reconciliation creates persistent labels for maintained
issue forms, the workflow MUST successfully create and remove a dedicated,
previously unreferenced temporary label. Before either action, it MUST derive
and present the complete name, color, and description mapping for every label
from fresh form discovery and applicable configuration. It MUST capture fresh
before, creation, deletion, and after evidence without changing an existing
live label.

#### Scenario: Rehearsal succeeds

- **WHEN** a dedicated temporary label is absent from current forms, issues,
  workflows, policies, and the live inventory
- **THEN** the workflow presents its complete mapping for authorization, creates
  it, verifies its presence with those properties, removes it, and verifies its
  absence before creating persistent labels

#### Scenario: Rehearsal cannot complete

- **WHEN** temporary-label creation, verification, or removal fails
- **THEN** the workflow preserves the fresh evidence, performs no persistent
  label creation, and reports the bounded recovery path

#### Scenario: Property source is incomplete

- **WHEN** fresh discovery cannot derive a required label color or description
  from applicable configuration
- **THEN** the workflow pauses before mutation and requests an explicit property
  decision for a new exact preview

### Requirement: Preserve assistant-neutral manual recovery

The reconciliation procedure MUST be performable through any supported
assistant with the same discovered inputs, explicit authorization boundary, and
recovery behavior. It MUST NOT require credentials or provider-internal IDs in
repository assets.

#### Scenario: Assistant prepares reconciliation

- **WHEN** a supported assistant prepares a label reconciliation
- **THEN** it uses fresh environment discovery and presents the exact external
  mutation before acting
