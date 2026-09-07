## Why

The Bug and Feature issue forms require labels that do not exist in the live
repository. Contributors therefore cannot rely on form configuration matching
the external intake state, and the next documentation-form change cannot safely
depend on that mapping.

## What Changes

Scope: reconcile the live labels required by the existing issue forms through a
manual, reversible two-stage operation: a disposable rehearsal followed by the
persistent labels the forms require.

- Capture fresh pre-mutation inventories of live labels, issue-label use, and
  repository label references.
- Select, from fresh discovery, a dedicated collision-free rehearsal label;
  create and delete it while recording the complete approved mapping and
  post-mutation evidence.
- After a successful rehearsal, create only the persistent labels currently
  named by the maintained issue forms.
- Before either mutation, derive and present the complete name, color, and
  description mapping from the forms and the applicable configuration. Retain
  the forms and do not add label automation.

## Capabilities

### New Capabilities

- `issue-template-label-alignment`: existing issue forms and the live
  repository label inventory remain aligned through a safe manual reconciliation
  procedure.

### Modified Capabilities

None.

## Non-Goals

- Change issue-form fields, workflows, organization-wide label policy, or
  reusable label automation.
- Select a rehearsal target that is already present or referenced by a form,
  issue, workflow, policy, or live label inventory.
- Store mutable GitHub label state, credentials, or provider-internal IDs in
  portable repository assets.

## Impact

- Primary issue: https://github.com/joericearchitect/jra-sdd-workflow/issues/26
- Affected users: contributors opening Bug or Feature issues and the later
  documentation-form change.
- Affected systems: live GitHub repository labels and the existing issue-form
  configuration under `.github/ISSUE_TEMPLATE/`.
- Compatibility and migration: existing forms retain their current labels;
  the live repository becomes compatible with them.
- Security: the complete label mapping is derived and approved immediately
  before each external mutation; no credential or mutable provider identifier
  is recorded in planning artifacts.

## Reuse Plan

- Reuse the existing forms as the source for persistent label names and refresh
  all live inventories immediately before the authorized mutation. Derive
  colors and descriptions from applicable configuration; pause for an explicit
  decision if that configuration does not provide them.
- Treat the label property mapping and live inventory as change-owned evidence,
  not portable configuration.
- This proposal authorizes planning only. GitHub label changes require a later
  Gate 2 approval and fresh, exact mutation preview.
