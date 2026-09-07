## Why

The workflow guide has detailed procedures and gate rules, but contributors
must assemble each selected OpenSpec action's entry condition, completion
evidence, and recovery path from separate sections. A concise definition of
done will make the manual lifecycle easier to operate consistently.

## What Changes

- Add a linked definition-of-done matrix for Explore, Propose, Apply, Verify,
  Sync, and Archive to `docs/sdd-workflow.md`.
- State each action's entry condition, durable exit evidence, and recovery path
  without restating the authoritative detailed procedures.

## Capabilities

### New Capabilities

None. This documentation-only change does not introduce a durable observable
capability.

### Modified Capabilities

None. No OpenSpec requirement changes.

## Non-Goals

- Add a controller, new lifecycle phase, automatic transition, validator, or
  workflow-policy change.
- Change GitHub issue, Project, branch, pull-request, delivery, or cleanup
  behavior.
- Duplicate tracking, artifact-quality, workspace-cleanup, or PR-linkage
  contracts that already own their detailed rules.

## Impact

- Scope: `docs/sdd-workflow.md` gains a concise operational reference.
- Primary issue: https://github.com/joericearchitect/jra-sdd-workflow/issues/20
- Compatibility: no user-facing runtime or API behavior changes; existing
  lifecycle procedures remain authoritative.
- Security: no credentials, executable content, or environment-specific values
  belong in the new documentation.
- Environment values for tracking metadata are discovered from the active
  repository and configured Project rather than copied into portable guidance.

## Reuse Plan

- Link to existing lifecycle, artifact-quality, tracking, delivery, and cleanup
  sections instead of reproducing their details.
- Revert only the added documentation section if it conflicts with an
  authoritative contract, then correct it from that source.
