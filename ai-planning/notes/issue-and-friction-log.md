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

## Current entries

| ID | Date | Status | Area | Summary | Exit or next action | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| IFL-001 | 2026-09-04 | Resolved | CI validation | The quoted validator-test glob in the GitHub Actions command was passed literally to Node 20, so the required tests were not found. | The workflow and contributor guidance now use shell-expanded test paths; retain direct CI coverage. | Archived [`align-tracking-contract` change](../../openspec/changes/archive/2026-09-04-align-tracking-contract/); its implementation and lifecycle PRs passed validation. |
| IFL-002 | 2026-09-04 | Open evidence gate | Post-Archive cleanup | The manual register, validation, audit, authorization, and receipt contract is implemented in the active `formalize-workspace-cleanup` change, but the earlier merged local topic branches predate registration and remain legacy, unproven resources. | Verify and deliver the contract through its two PRs. Use it before creating the next dogfood resources, preserve every legacy resource, and close this entry only after the first qualifying manual cleanup run has a finished receipt and sanitized observation. | [Cleanup workflow](../../docs/sdd-workflow.md#workspace-cleanup-after-lifecycle-delivery); [active change](../../openspec/changes/formalize-workspace-cleanup/); [cleanup design brief](../design-briefs/post-archive-workspace-cleanup.md). |
| IFL-003 | 2026-09-04 | Operational constraint | Restricted execution environment | The sandbox could not update Git fetch/index metadata or access the authenticated GitHub CLI keyring. The same scoped operations succeeded through the host-authorized environment. | Run the same narrowly scoped GitHub/Git operation through an approved host environment; never replace or expose credentials merely because the sandbox cannot read them. | [Workflow authentication guidance](../../docs/sdd-workflow.md#prerequisites). |
| IFL-004 | 2026-09-04 | Open documentation gap | OpenSpec lifecycle adapters | The custom selected workflow has Sync and Verify assistant actions, but the generic `openspec instructions sync` and `openspec instructions verify` lookups are not available as artifacts. | Follow the selected assistant skill for Sync/Verify and use `openspec instructions specs` for the sync content rules. Evaluate a documentation clarification after repeated occurrences. | [Workflow selected actions](../../docs/sdd-workflow.md#selected-actions). |
| IFL-005 | 2026-09-04 | Resolved workaround | Runtime linkage validation | The reusable linkage validators could not read shell process-substitution descriptors in this environment (`EBADF`). | Use short-lived, sanitized temporary files for the PR body and changed-path list, then remove them after validation. Escalate to the reusable-skill owner only if this recurs or prevents a safe validation. | Lifecycle-record PR #4 validation evidence. |
| IFL-006 | 2026-09-05 | Open tooling defect | GitHub issue intake | The reusable `create-or-find-issue` helper failed before lookup with `ghCommand args must be an array of strings`, so the configured issue-authoring path could not create or reuse an issue. | Repair the reusable helper in its owning repository. Until then, use a host-authorized exact-title `gh issue list` check followed by one explicit, scoped `gh issue create`; do not infer duplicate absence. | [Issue #5](https://github.com/joericearchitect/jra-sdd-workflow/issues/5) was created through the constrained fallback. |

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
