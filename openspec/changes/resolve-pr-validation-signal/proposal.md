## Why

The PR-contract validator computes `requiresOpenSpecValidation` and the OpenSpec-linkage validator forwards it, but no repository workflow or source consumes the value. Strict OpenSpec validation already runs unconditionally for every pull request, so the field is dead state that obscures the actual validation contract.

## What Changes

Scope: retire the dead changed-path validation pathway end to end, including the internal field, validator arguments and CLI flags, and the linkage workflow's file-discovery call and unneeded permission.

- Remove the undocumented `requiresOpenSpecValidation` result field, its calculation, and the now-unused `changedPaths` parameters and `--changed-paths-file` CLI flags from both validators.
- **BREAKING (undocumented internal CLI):** remove the retired changed-path flag branch; the existing generic unexpected-argument handling rejects the flag without bespoke code. This is an intentionally removed internal invocation, not a change to a durable observable capability.
- Keep the existing Node-based PR-body write, remove only its pull-request file discovery, then remove the unneeded `pull-requests: read` permission.
- Preserve their existing validity, issue, change, issue-reporting, and linkage behavior.
- Add focused regression coverage for the remaining validator result contracts and confirm strict OpenSpec validation remains unconditional in CI.

## Capabilities

### New Capabilities

None. This is an internal validator-result cleanup, not a new durable observable capability.

### Modified Capabilities

None. No living requirement changes: the field has no supported consumer and CI validation behavior remains unchanged.

## Non-Goals

- Add conditional OpenSpec validation, a hidden gate, a second CI policy, or a new GitHub API call.
- Change PR-body parsing, issue-to-tracking linkage behavior, GitHub Project state, or reusable-agent skills.
- Provide compatibility migration for an undocumented internal JSON result field.

## Impact

- Primary issue: https://github.com/joericearchitect/jra-sdd-workflow/issues/30
- Affected code: `scripts/validation/validate-pr-contract.mjs`, `scripts/validation/validate-openspec-linkage.mjs`, focused validator tests, and `.github/workflows/openspec-linkage.yml`.
- Affected users: repository maintainers and contributors receive unchanged PR/linkage validation outcomes; consumers of the undocumented JSON field must not rely on it.
- Compatibility and migration: the removal is intentional for an internal, unconsumed result field and CLI flag. No repository consumer or migration target was found; callers of the undocumented CLI flag must stop supplying it.
- Security: the change removes an external GitHub API read and its associated permission. The existing Node-based PR-body write remains, so untrusted PR text never enters a shell.
- Environment and configuration: repository and CI workflow paths are discovered from the checked-out repository. The issue and configured Project were discovered from the current repository GitHub context; no environment-specific value is introduced into reusable assets.

## Reuse Plan

- Reuse the existing PR-contract and linkage validator test patterns and the existing unconditional strict-validation workflow.
- Keep this planning-only change focused on the repository-local validators; it does not authorize implementation.
