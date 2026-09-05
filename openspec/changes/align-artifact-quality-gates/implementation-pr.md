## Summary

- Publish the exact artifact-quality headings and task metadata while
  preserving standard OpenSpec proposal sections.
- Honor `skip_specs: true` only as an exception for an absent delta-spec tree,
  while continuing to validate every supplied spec.
- Detect task-shaped requirements by checkbox syntax and require completed-task
  evidence to be non-blank on the same line.
- Add focused regression coverage for metadata branches, artifact structure,
  task evidence, and requirement classification.
- Preserve campaign evidence for the workspace handoff and the independently
  discovered evidence-validation correction.

## Validation

- `node --test scripts/validation/test/*.test.mjs`
- `node scripts/validation/validate-no-hardcoded-environment.mjs`
- `node scripts/validation/validate-tracking.mjs openspec/changes/align-artifact-quality-gates/tracking.yaml`
- `node scripts/validation/validate-openspec-artifacts.mjs openspec/changes/align-artifact-quality-gates`
- `openspec validate --all --strict`
- `git diff --check`

Closes #8

OpenSpec change: align-artifact-quality-gates
