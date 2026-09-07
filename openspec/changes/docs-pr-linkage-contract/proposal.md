## Why

README users can see that pull-request linkage validation exists, but cannot
author the accepted issue reference and `OpenSpec change:` marker without
reading validator source. Document the contract where contributors start so
ordinary implementation and lifecycle-record pull requests are authorable and
reviewable without source-code discovery.

## What Changes

Scope: document the existing PR-linkage contract in `README.md` and add only
the focused tests needed to protect the documented accepted alternatives.

- Add a concise PR-linkage section to `README.md` with validator-backed,
  copyable implementation and lifecycle-record examples.
- Identify `Closes #<issue>` as the canonical implementation form and
  `Related to #<issue>` as the canonical lifecycle-record form.
- State that `Fixes` and `Resolves` are accepted closing alternatives, and that
  each pull request also needs `OpenSpec change: <change-name>`.
- Add focused validator tests for the documented closing alternatives without
  changing validator behavior or GitHub workflow configuration.

## Capabilities

### New Capabilities

None. This documentation and test change adds no durable observable capability.

### Modified Capabilities

None. The existing linkage contract is documented and tested, not changed.

## Non-Goals

- Change accepted linkage syntax, linkage validation, or GitHub workflow
  behavior.
- Change issue or Project policy, add automation, or add a lifecycle phase.
- Treat the examples as sufficient proof of complete OpenSpec linkage: the
  existing linkage validator continues to check the named change, tracking
  metadata, and matching issue number.

## Impact

- Primary issue: https://github.com/joericearchitect/jra-sdd-workflow/issues/23
- Affected users: contributors preparing implementation or lifecycle-record PR
  descriptions.
- Affected files: `README.md` and the focused PR-contract validator tests.
- Compatibility and migration: none; the accepted validator contract remains
  unchanged.
- Security: documentation uses placeholders only and does not expose
  credentials or environment-specific configuration.

## Reuse Plan

- Reuse the existing PR contract and OpenSpec linkage validators as the
  authoritative source for examples and acceptance evidence.
- Derive real issue numbers and change names from each pull request's selected
  change and tracking metadata; examples remain placeholders.
- This proposal authorizes planning only; Apply requires a separate approval.
