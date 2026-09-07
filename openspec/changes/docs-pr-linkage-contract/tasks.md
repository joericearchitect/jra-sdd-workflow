## 1. Validator-backed examples

- [x] 1.1 Add focused PR-contract tests proving that `Fixes #<issue>` and
  `Resolves #<issue>` are accepted with a valid `OpenSpec change:` marker.
  Depends on: Planning review approval.
  Evidence: The focused PR-contract test file passes and asserts both accepted
  closing alternatives without modifying validator behavior.

## 2. README linkage contract

- [x] 2.1 Add a concise README PR-linkage reference with the canonical
  implementation form `Closes #<issue>` and canonical lifecycle-record form
  `Related to #<issue>`.
  Depends on: 1.1.
  Evidence: README review confirms both canonical, placeholder-based examples
  and the exact `OpenSpec change: <change-name>` marker are present.

- [x] 2.2 Document `Fixes` and `Resolves` as accepted closing alternatives and
  clarify that complete linkage also checks the named change, tracking metadata,
  and matching issue number.
  Depends on: 1.1 and 2.1.
  Evidence: README language matches the validator contract without claiming
  syntax-only validation proves complete OpenSpec linkage.

## 3. Security, validation, and review

- [x] 3.1 Review the documentation and tests for portability and security:
  retain placeholders, exclude credentials and environment-specific values,
  and leave validators, workflows, and external GitHub state unchanged.
  Depends on: 2.1 and 2.2.
  Evidence: Reviewed implementation changes are limited to the planned README
  and focused test paths alongside this change's planning artifacts, and the
  hardcoded-environment validator passes.

- [x] 3.2 Run focused and complete validation for the selected change.
  Depends on: 3.1.
  Evidence: Focused PR-contract tests, full Node tests, tracking validation,
  artifact validation, strict OpenSpec validation, and whitespace checks pass.

- [x] 3.3 Self-review the completed change against the proposal and design
  before requesting the Verification-to-closure gate.
  Depends on: 3.2.
  Evidence: Review confirms documentation accuracy, scope, non-goals,
  recovery paths, and delivery-linkage requirements remain coherent.
