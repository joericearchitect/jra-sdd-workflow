# Issue and friction log

This is a concise, sanitized record of actionable problems encountered while
operating the workflow. It complements rather than replaces the authoritative
sources:

- GitHub Issues and Projects own product-work state.
- OpenSpec changes own requirements, design, and tasks.
- [Dogfood observations](../plans/dogfood-observations.md) own campaign-phase
  evidence.
- [Review records](../review-records/) own reviewed dispositions.

Do not record credentials, authentication codes, raw logs, or personal data.
Use repository-relative paths, check summaries, PR/issue numbers, and bounded
error descriptions as evidence. A note does not authorize a repair, a GitHub
mutation, cleanup, or automation.

## Automation evidence discipline

The campaign's eventual goal is to identify narrowly scoped automation that is
earned by manual evidence, not assumed from a design. For every issue or
workaround that could matter to automation, record the affected phase, manual
recovery, authorization and external-state boundaries, deterministic inputs and
outputs, safety gates, and known failure or restart behavior. Call out any
candidate follow-up change, but do not create it from the note alone.

Repeated, independently observed friction is evidence for a later Explore and
design review only after the campaign's stated manual-run threshold is met. The
resulting automation must preserve the existing human authorization, recovery,
and evidence gates; convenience is not a substitute for those controls.

## Current entries

| ID | Date | Status | Area | Summary | Exit or next action | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| IFL-001 | 2026-09-04 | Resolved | CI validation | The quoted validator-test glob in the GitHub Actions command was passed literally to Node 20, so the required tests were not found. | The workflow and contributor guidance now use shell-expanded test paths; retain direct CI coverage. | Archived [`align-tracking-contract` change](../../openspec/changes/archive/2026-09-04-align-tracking-contract/); its implementation and lifecycle PRs passed validation. |
| IFL-002 | 2026-09-04 | Open evidence gate | Post-Archive cleanup | The manual register, validation, audit, authorization, and receipt contract is implemented in the active `formalize-workspace-cleanup` change, but the earlier merged local topic branches predate registration and remain legacy, unproven resources. | Verify and deliver the contract through its two PRs. Use it before creating the next dogfood resources, preserve every legacy resource, and close this entry only after the first qualifying manual cleanup run has a finished receipt and sanitized observation. | [Cleanup workflow](../../docs/sdd-workflow.md#workspace-cleanup-after-lifecycle-delivery); [active change](../../openspec/changes/formalize-workspace-cleanup/); [cleanup design brief](../design-briefs/post-archive-workspace-cleanup.md). |
| IFL-003 | 2026-09-04 | Operational constraint | Restricted execution environment | The sandbox could not update Git fetch/index metadata or access the authenticated GitHub CLI keyring. The same scoped operations succeeded through the host-authorized environment. | Run the same narrowly scoped GitHub/Git operation through an approved host environment; never replace or expose credentials merely because the sandbox cannot read them. | [Workflow authentication guidance](../../docs/sdd-workflow.md#prerequisites). |
| IFL-004 | 2026-09-04 | Open documentation gap | OpenSpec lifecycle adapters | The custom selected workflow has Sync and Verify assistant actions, but the generic `openspec instructions sync` and `openspec instructions verify` lookups are not available as artifacts. | Follow the selected assistant skill for Sync/Verify and use `openspec instructions specs` for the sync content rules. Evaluate a documentation clarification after repeated occurrences. | [Workflow selected actions](../../docs/sdd-workflow.md#selected-actions). |
| IFL-005 | 2026-09-04 | Resolved workaround | Runtime linkage validation | The reusable linkage validators could not read shell process-substitution descriptors in this environment (`EBADF`). | Use short-lived, sanitized temporary files for the PR body and changed-path list, then remove them after validation. Escalate to the reusable-skill owner only if this recurs or prevents a safe validation. | Lifecycle-record PR #4 validation evidence. |
| IFL-006 | 2026-09-05 | Open tooling defect | GitHub issue intake | The reusable `create-or-find-issue` helper failed before lookup with `ghCommand args must be an array of strings`, so the configured issue-authoring path could not create or reuse an issue. | Repair the reusable helper in its owning repository. Until then, use a host-authorized exact-title `gh issue list` check followed by one explicit, scoped `gh issue create`; do not infer duplicate absence. | [Issue #5](https://github.com/joericearchitect/jra-sdd-workflow/issues/5) was created through the constrained fallback. |
| IFL-007 | 2026-09-05 | Open follow-up change | GitHub issue intake configuration | PF2 could not use the configured issue-to-OpenSpec handoff because `config/sdd-github.json` is absent. After an exact-title search found no match, the owner authorized one scoped manual issue creation for [#8](https://github.com/joericearchitect/jra-sdd-workflow/issues/8); current Project evidence was then discovered before writing `tracking.yaml`. | Propose and deliver the repository-local intake configuration and documented manual create-or-reuse flow described in the design brief. Keep issue creation, Project changes, and plain Propose as separate authorization boundaries; assess later reusable-helper repair separately under IFL-006. | [Intake design brief](../design-briefs/github-intake-before-propose.md); [PF2 tracking](../../openspec/changes/archive/2026-09-05-align-artifact-quality-gates/tracking.yaml). |
| IFL-008 | 2026-09-05 | Resolved manual recovery | Implementation workspace registration | PF2's first secondary worktree used an administrative identity derived from its destination name, not the separately planned portable identity. The register accepted the branch but correctly blocked the worktree before any implementation edits. | After exact authorization, the clean mismatched worktree was removed and a second attempt named from the selected target was created, inspected, and registered. For future automation, treat worktree administrative identity as discovered evidence, not a value inferred from the change name; assess only after repeated manual occurrences. | Local PF2 workspace register; [workspace registration procedure](../../docs/sdd-workflow.md#register-local-delivery-resources-before-creation). |
| IFL-009 | 2026-09-05 | Open workflow handoff gap | Apply workspace setup | PF2 planning artifacts and the campaign log were uncommitted in the original worktree when its registered implementation worktree was created from the recorded default-branch commit. The new worktree therefore lacked its Apply context and required a manual, change-scoped copy while the original files were preserved. | In manual runs, copy and inspect only the selected change's planning artifacts and applicable campaign note before editing. For future automation, define an explicit, auditable planning-artifact handoff with exact source, destination, provenance, and verification; do not infer or copy unrelated original-worktree state. Assess after repeated manual occurrences. | Registered PF2 worktree attempt 2; [`align-artifact-quality-gates`](../../openspec/changes/archive/2026-09-05-align-artifact-quality-gates/) change context. |
| IFL-010 | 2026-09-05 | Resolved objective correction | Artifact evidence validation | PF2's first independent review proved that completed-task validation accepted a blank `Evidence:` field when a later heading followed because the whitespace match crossed a newline. This could allow automated gates to treat unevidenced completion as valid. | Evidence is now constrained to a non-blank value on the same line, with a focused regression probe that first reproduced and then rejected the false pass. Retain that probe; require design review before a second repair to this evidence classifier. | [`validate-openspec-artifacts.mjs`](../../scripts/validation/validate-openspec-artifacts.mjs); [`openspec-artifacts.test.mjs`](../../scripts/validation/test/openspec-artifacts.test.mjs). |
| IFL-011 | 2026-09-05 | Resolved manual workaround | Machine-readable command output | During PF2 Sync, the host login shell repeatedly prepended `Not privileged to set domain environment.` to successful OpenSpec, Node, and Git command output, including an OpenSpec JSON response. Manual inspection separated the warning from the command payload, but an adapter that assumes the complete shell stream is pure JSON could fail. | Run machine-readable commands without login-shell initialization when it is unnecessary; a non-login rerun produced clean output. Any later adapter must still reject invalid JSON rather than silently strip arbitrary diagnostics, and this single run does not justify new automation. | PF2 Sync command evidence; the same validation set passed without the warning under a non-login shell. |
| IFL-012 | 2026-09-05 | Resolved manual workaround | Archived tracking validation | After PF2 Archive, invoking the tracking validator with only the dated archive path inferred `2026-09-05-align-artifact-quality-gates` from the directory name and rejected the canonical `align-artifact-quality-gates` identifier. | Supply the validator's explicit `--change <canonical-change-name>` option for a dated archive path; the corrected invocation passed. Preserve the canonical identifier in `tracking.yaml`, and consider a documentation clarification only if this command-shape error recurs independently. | PF2 archived tracking validation; [`validate-tracking.mjs`](../../scripts/validation/validate-tracking.mjs). |

## Entry template

Add an entry when a problem is reproducible, blocks a phase, requires a
workaround, or supplies evidence for a future workflow decision. Link the
authoritative artifact instead of copying large content.

| ID | Date | Status | Area | Summary | Exit or next action | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| IFL-XXX | YYYY-MM-DD | Open / Resolved / Operational constraint | | | | |

## Review cadence

- Update an entry's status when its stated exit has durable evidence.
- Move campaign-specific recurring friction into the campaign observation
  ledger; add or update a review record when a human makes a material
  disposition.
- Treat repeated occurrences as input to an Explore decision, not as automatic
  authority to build a controller or cleanup automation.
