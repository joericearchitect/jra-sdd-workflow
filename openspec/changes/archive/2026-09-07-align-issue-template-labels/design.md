## Context

See [proposal.md](proposal.md) for the motivation. The maintained Bug and
Feature issue forms declare labels that the current live repository does not
provide. The reconciliation changes live GitHub label metadata, not the form
files, so its inputs are mutable external state and its evidence must remain
change-scoped rather than become portable configuration.

Affected repository paths are `.github/ISSUE_TEMPLATE/bug.yml` and
`.github/ISSUE_TEMPLATE/feature.yml` as the source of required label names;
they are read but not edited. The live label inventory and issue-label use are
external state. GitHub credentials, Project item IDs, and raw CLI output remain
outside repository records.

## Goals / Non-Goals

**Goals:**

- Prove that a dedicated label can be created and removed without touching an
  existing or form-required label.
- Reconcile the live labels with the unchanged issue forms after that proof.
- Leave a bounded, manual recovery path for each external mutation.

**Non-Goals:**

- Automate label reconciliation, change form fields, or define an
  organization-wide label taxonomy.
- Persist live inventory snapshots, mutable provider identifiers, or
  credentials in portable repository assets.

## Decisions

1. Select a disposable rehearsal target only after fresh discovery, and include
   its complete name, color, and description in the exact mutation preview.
   - Rationale: a just-in-time collision check prevents reuse of a form label
     or an existing live label while avoiding a portable asset that hardcodes
     one repository's label value.
   - Alternative: rehearse by deleting a required form label. Rejected because
     it would knowingly break live intake.

2. Use two sequential external-state stages: rehearsal first, persistent
   reconciliation second.
   - Rationale: an actual create/delete run validates permissions, CLI behavior,
     and recovery before durable label state changes.
   - Alternative: create persistent labels immediately. Rejected because it
     would skip the agreed rollback rehearsal.

3. Derive persistent names from the current form files and colors/descriptions
   from applicable current configuration immediately before mutation. Present
   the complete mapping for every temporary and persistent label in the exact
   preview, and record that approved mapping in a change-owned GitHub issue
   comment after authorization.
   - Rationale: names and properties are external configuration and can drift;
     a missing property source is an actionable pause for an explicit human
     decision, not an operator choice made during mutation.
   - Alternative: hardcode current values in a shared script or policy.
     Rejected by the portability and manual-first boundaries.

4. Record fresh inventories and each mutation result in an issue comment and
   the delivery PR evidence without replacing human-authored issue content.
   - Rationale: GitHub owns external label state; the record is durable but does
     not copy mutable state into tracking metadata.
   - Alternative: save raw CLI output in the repository. Rejected because it is
     stale-prone, can contain sensitive context, and violates the evidence
     boundary.

## Verification Strategy

- Before every external action, inspect the maintained forms, live labels, and
  issue-label use; derive a complete name/color/description mapping; stop if
  the temporary target is referenced or already present, or if properties lack
  an approved configuration source.
- Verify temporary-label absence before creation, presence after creation, and
  absence after deletion using fresh live reads.
- Verify every label currently declared by the maintained forms exists after
  persistent reconciliation.
- Run the repository Node tests, portability check, selected-change tracking
  and artifact checks, strict OpenSpec validation, and whitespace check.
- Review the issue comment and PR body for scoped, non-sensitive evidence only.

## Security

The reconciliation uses the existing authenticated GitHub CLI only at the
moment of an approved live mutation. It neither stores credentials nor embeds
provider-internal identifiers in repository artifacts. Evidence is limited to
the discovered label names, complete approved properties, and before/after
results.

## Attribution and Licensing

The change uses existing repository forms and GitHub CLI operations; it adds no
third-party code, dependency, generated asset, or license obligation. Any
future automation is explicitly out of scope. Repository planning changes are
reverted selectively; live labels use the recovery sequence below.

## Recovery

- If the temporary rehearsal fails, preserve the before/after evidence, remove
  only the temporary label if it exists, and stop before persistent creation.
- If persistent label creation partially succeeds, re-inspect the live
  inventory, remove only labels newly created by this change that are not
  required to preserve a completed reconciliation, and report the remaining
  exact state for review.
- If the pre-action inventory drifts, authorization expires; refresh discovery
  and obtain a new exact preview rather than acting on stale evidence.
- A second repair to the same label-reconciliation component requires design
  review; no third correction proceeds automatically.

## Reuse Plan

Reuse the maintained issue forms as the source of required label names,
applicable current configuration as the source of colors and descriptions, and
the existing GitHub CLI authentication as the manual access path. Keep
discovered repository, owner, label, color, description, and issue values in
the live operation evidence; tracking records only the selected change and its
primary issue.
