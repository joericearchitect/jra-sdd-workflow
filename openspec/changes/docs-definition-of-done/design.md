## Context

See `proposal.md` for motivation. `docs/sdd-workflow.md` already owns the
workflow narrative, detailed planning-artifact contract, delivery guidance, and
workspace-cleanup procedure. The lifecycle glossary defines terms but is not a
per-action operational checklist.

The affected file is `docs/sdd-workflow.md`. GitHub owns issue and Project
state; OpenSpec artifacts own planning and requirements; Git and pull requests
own delivery. This change must not move that ownership into a duplicate guide.
Security and portability require the summary to omit credentials,
environment-specific values, and executable instructions.

## Goals / Non-Goals

**Goals:**

- Give each selected OpenSpec action one concise entry, exit-evidence, and
  recovery reference.
- Make the reference usable by every supported assistant without depending on
  assistant-specific behavior.
- Preserve links to the existing detailed contracts.

**Non-Goals:**

- Introduce an executable checklist, controller, new phase, or automatic
  transition.
- Change validators, GitHub state, credentials, environments, or external
  interfaces.

## Decisions

1. Add one matrix near the lifecycle and human-gate overview rather than
   repeating checklists inside every later procedure. It gives a contributor a
   navigable summary before the detailed sections.

2. Cover only the selected OpenSpec actions: Explore, Propose, Apply, Verify,
   Sync, and Archive. Lifecycle-record delivery and Workspace cleanup remain
   repository stages with their own existing guidance, avoiding a new phase
   model.

3. Make every row link to its authoritative detailed source. This keeps the
   summary small and limits documentation drift. An alternative of duplicating
   artifact, delivery, and cleanup criteria would create competing contracts.

4. Use prose that requires human confirmation and observable evidence rather
   than instructions that imply automatic transitions. This preserves the
   manual-first boundary.

## Verification Strategy

- Review all six rows against the existing lifecycle, gate, planning,
  validation, and archive guidance.
- Confirm each row names an entry condition, durable exit evidence, and a
  practical recovery path.
- Run the repository Node validation tests, the no-hardcoded-environment
  check, tracking validation, artifact-quality validation, strict OpenSpec
  validation, and a whitespace diff check.

## Attribution and Licensing

This change authors original repository documentation. It adds no third-party
content, dependency, generated asset, or licensing obligation.

## Recovery

If review or validation finds a row inconsistent with its authoritative source,
revert or correct only the definition-of-done section and relink it to the
source. No external state, credential, or destructive action is introduced, so
no migration or data rollback is required.

## Reuse Plan

Reuse the existing lifecycle overview, human-review gate table, planning
artifact contract, validation section, and archive guidance as linked sources.
Do not duplicate their detailed content or copy environment-specific values
into the new reference.
