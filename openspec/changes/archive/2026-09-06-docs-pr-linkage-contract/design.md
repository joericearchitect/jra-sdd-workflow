## Context

See [proposal.md](proposal.md) for the motivation. `README.md` currently says
that linkage validation exists, while `validate-pr-contract.mjs` accepts four
case-insensitive issue-reference terms and requires an exact `OpenSpec change:`
marker. `validate-openspec-linkage.mjs` then resolves the named change and
checks its tracking metadata and issue-number match. The existing focused tests
cover the two canonical forms and missing-marker rejection, but not the two
documented closing alternatives.

Affected files are `README.md` and
`scripts/validation/test/pr-contract.test.mjs`. The validator files, pull
request template, GitHub workflow, GitHub issue, Project, credentials, and
environment configuration remain external or unchanged ownership boundaries.
Security and portability require placeholders in contributor-facing examples,
no credentials or environment-specific values in changed documentation, and no
new external mutation beyond the existing planning tracking record.

## Goals / Non-Goals

**Goals:**

- Put a concise, authoritative-implementation-backed PR-linkage reference in
  the README.
- Make the canonical form differ by delivery role: closing implementation PRs
  use `Closes`; lifecycle-record PRs use `Related to`.
- Test the accepted `Fixes` and `Resolves` alternatives before documenting
  them.

**Non-Goals:**

- Change accepted syntax, validation behavior, GitHub workflow, external
  issue/Project state, or credentials.
- Duplicate the linkage validator or imply that syntax validation alone proves
  a complete linkage record.

## Decisions

1. Add a small README subsection next to the existing linkage-validation
   overview, rather than changing the pull-request template.
   - Rationale: the template already exposes the canonical forms; README is
     the missing contributor reference.
   - Alternative: duplicate all guidance in the template. Rejected because it
     would not address README discovery and would create a second document to
     keep synchronized.

2. Document `Closes #<issue>` and `Related to #<issue>` as canonical examples;
   list `Fixes` and `Resolves` as accepted closing alternatives.
   - Rationale: this preserves the existing delivery semantics while accurately
     exposing the validator's accepted syntax.
   - Alternative: document every accepted form as equally canonical. Rejected
     because the repository's template already distinguishes implementation
     closure from lifecycle-record linkage.

3. State that every body also needs `OpenSpec change: <change-name>` and point
   readers to linkage validation for change/tracking/issue matching.
   - Rationale: the marker is mandatory and syntax alone does not prove that
     the issue belongs to the selected change.
   - Alternative: make README repeat the complete resolver algorithm. Rejected
     as disproportionate; the validator remains the source of detailed
     behavior.

4. Add focused tests for `Fixes` and `Resolves` without changing the validator.
   - Rationale: documentation examples become regression-protected at small
     cost.
   - Alternative: test README prose directly. Rejected because a prose parser
     would be brittle and would not test the validator contract.

## Verification Strategy

- Run the focused PR-contract tests to prove both canonical forms, the new
  accepted alternatives, and missing-marker rejection.
- Run the full Node validator suite, hardcoded-environment check, tracking
  validation for this change, artifact validation, strict OpenSpec validation,
  and `git diff --check`.
- Manually compare the README examples with both validators and confirm no
  validator or workflow file changed.

## Attribution and Licensing

The change authors original documentation and test cases only. It introduces
no third-party code, generated asset, dependency, license obligation, or
automation. Rollback is a scoped revert of the README and focused tests if the
examples are found to drift.

## Recovery

- If an example is rejected, compare it with the validators, correct the
  README or focused test without changing validator behavior, and rerun the
  affected plus complete checks.
- If planning metadata or artifacts fail validation, correct the named planning
  field or document and rerun its bounded validator before Apply review.
- If a second repair to the same documentation or test component becomes
  necessary during Apply, stop for design review as required by the workflow.
- No gate depends on GitHub mutation; if remote GitHub state is unavailable,
  preserve local artifacts and defer only external delivery reconciliation.

## Reuse Plan

Reuse `validate-pr-contract.mjs`, `validate-openspec-linkage.mjs`, and the
existing pull-request template as the source of truth. Real repository, issue,
and change values are derived from the selected change and tracking metadata;
the README retains portable placeholders.
