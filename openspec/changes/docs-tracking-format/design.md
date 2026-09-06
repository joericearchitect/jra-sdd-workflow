## Context

See [proposal.md](proposal.md) for the motivation. The existing v1 schema is
the portable shape-and-value authority, while the focused validator adds a
security policy for unsafe fields. The only contributor-facing guidance now is
scattered across source, archived tracking files, and a delivery command in the
workflow guide.

This change affects a new documentation reference and the workflow-guide link.
It does not own the schema, parser, validator, GitHub issue state, Project
state, or any credentials. The issue and Project values shown in a real
tracking file are derived from the active environment or supplied
configuration; they are not portable documentation constants.

## Goals / Non-Goals

**Goals:**

- Give a contributor enough accurate information to author and validate a v1
  tracking file without reading implementation source.
- Keep the reference aligned with the existing schema and validator security
  extension, including their validation boundaries.
- Provide a simple, portable example that can be copied, populated from
  discovered context, and validated.

**Non-Goals:**

- Change tracking behavior, introduce a second parser, or validate external
  GitHub or repository state.
- Add generated-document tests or automation that parse prose.
- Store local identity, credentials, or mutable delivery state in the example
  or planning artifacts.

## Decisions

1. **Create one focused reference and link it from the workflow guide.**
   The reference will own field-by-field guidance, a complete placeholder
   example, the focused command, unsafe-field restrictions, boundaries, and
   recovery. The workflow guide will link rather than duplicate that material.
   This keeps the operational guide short and provides one durable location for
   tracking authoring guidance.

   Alternative: expand `docs/sdd-workflow.md` in place. Rejected because a
   detailed field reference would make lifecycle guidance harder to scan and
   would duplicate future documentation responsibilities.

2. **Teach the current contract, not an idealized YAML dialect.**
   The reference will describe only the required v1 fields and observable
   validator behavior: positive integers stay numeric, repository identifiers
   have `owner/repository` shape, required strings are non-empty, and a file's
   `openspec.change` must match its expected change. It will distinguish
   validator facts from conventions and state that external existence and
   identity are not checked.

   Alternative: document broader YAML features or imply external verification.
   Rejected because those claims could mislead contributors and drift from the
   focused implementation.

3. **Use placeholder values and explain replacement sources.**
   The example will use non-environment-specific owner/repository, issue URL,
   Project, branch, and path placeholders. Adjacent prose will tell
   contributors to discover or configure real values before validation.

   Alternative: use a current repository tracking file as the example.
   Rejected because it would embed local identifiers in portable documentation
   and encourage copying stale delivery data.

4. **Describe unsafe-field rejection as a security boundary.**
   The reference will give representative prohibited name suffixes and explain
   that the policy scans nested fields, without showing secret-shaped values.
   It will direct contributors to keep credentials, provider-specific Project
   identifiers, and mutable delivery state out of tracking metadata.

   Alternative: omit the extension because it is not in the schema. Rejected
   because a schema-valid document can still fail focused validation and the
   recovery would be unclear.

## Verification Strategy

- Author a fresh tracking file from the published placeholder example, replace
  only its placeholder values consistently, and run
  `node scripts/validation/validate-tracking.mjs` against that file.
- Run the full Node validation suite, portability validator, the selected
  change's tracking and artifact validators, and strict OpenSpec validation.
- Review the reference against `schemas/openspec-tracking-v1.schema.json` and
  `scripts/validation/lib/tracking.mjs` for required fields, constraints,
  unsafe-field policy, and documented non-checks.
- Review the final diff to confirm no schema, parser, validator, or GitHub
  state behavior changed.

## Attribution and Licensing

The documentation is original repository material derived from the repository's
existing schema and source. No third-party prose, code, package, or license is
introduced.

## Recovery

- If the example fails validation, compare the named field with the schema and
  focused validator, correct the documentation only, and rerun the focused
  command. If a second repair to the same documentation component is needed,
  pause for design review.
- If a portability or security check fails, replace the offending prose or
  placeholder with an environment-neutral value and rerun the failed check.
- If GitHub authentication remains unavailable, do not change issue or Project
  state; re-authenticate in an allowed environment and recheck the issue before
  a later GitHub-dependent action.
- Roll back by reverting the scoped documentation commit. The existing source
  contract and archived tracking records remain unchanged.

## Reuse Plan

Reuse the v1 schema, focused validator, existing validation commands, and
workflow-guide navigation. No reusable automation, external connector, or
additional dependency is needed.
