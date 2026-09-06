# Dogfood campaign observations

Date opened: 2026-09-03

This is the sanitized evidence ledger for `dogfood-10-changes.md`. It records
manual integration behavior and recovery without storing credentials, raw
authentication output, personal data, or unbounded command logs. GitHub URLs,
commit IDs, validation summaries, and repository-relative paths are preferred
evidence.

An observation does not authorize a repair or automation. Repeated pain is
assessed only after the manual campaign completes.

## Workspace cleanup run evidence

For each candidate whose resources are created after the cleanup contract is
delivered, record a sanitized cleanup summary in its observation. Include the
cleanup schema version and run number, registered-resource count, eligible /
already-absent / intentionally-ineligible outcomes, whether resume occurred,
manual effort, bounded friction codes, and any unresolved recovery reference.
Do not copy the machine-local register, receipt, absolute paths, raw Git or
authentication output, or authorization text into this ledger.

A run qualifies toward later automation review only when it starts with at
least one registered resource, passes every applicable delivery gate, reaches
a final valid receipt after an exact manual cleanup or preservation decision,
and has this sanitized entry. A zero-resource exercise does not qualify. Keep a
running count here only after those facts are evidenced; never infer it from a
merged pull request or completed Archive action.

Automation review remains closed until there are at least ten qualifying runs,
the same friction code occurs in at least three independent runs, and no
relevant safety issue remains unresolved. The threshold opens a separate design
review; it does not approve implementation.

## Baseline

| Evidence | Result |
|---|---|
| Repository revision | `39e3e7f` on `main` |
| Node.js | `v26.7.0` |
| OpenSpec CLI | `1.8.0` |
| GitHub CLI | `2.97.0` |
| Selected workflow actions | `explore`, `propose`, `apply`, `verify`, `sync`, `archive` |
| Node validator tests | 9 passed |
| Hardcoded-environment validator | Passed |
| Strict OpenSpec validation | No items found to validate |
| Active OpenSpec changes | None |
| Candidate 1 intake | Issue #1 exists and is on the configured Project in its initial state |
| Worktree boundary | An unrelated `.gitignore` edit is preserved outside planning commits |
| Core workflow product surfaces | 1,835 lines before campaign planning files |
| Generated assistant entry points | 8,527 lines, reported separately |
| New campaign supporting machinery | 0 lines at baseline |

## Preflight observations

### OBS-001 — roadmap state lagged external intake

- Phase: campaign setup.
- Expected: the live checklist names the existing issue and current state.
- Observed: issue #1 existed while the roadmap still showed `TBD` and
  `Not started`.
- Exit/recovery: update the roadmap in the planning-only commit and thereafter
  update external evidence and the ledger together.
- Automation conclusion: none; one preflight occurrence does not justify it.

### OBS-002 — issue-template labels do not match live labels

- Phase: intake discovery.
- Expected: every label named by an issue form exists in the repository.
- Observed: the forms name `sdd`, `type:bug`, and `type:feature`; the discovered
  live label set contains none of those names.
- Exit/recovery: candidate 4 will Explore and reconcile the configuration with
  a rollback plan before any label mutation. Candidate 5 depends on it.
- Automation conclusion: none; preserve this as evidence for the manual run.

### OBS-003 — one-PR wording could not preserve post-merge archive state

- Phase: lifecycle design review.
- Expected: implementation delivery precedes Archive, while synced specs and
  the archived change remain durable and reviewed.
- Observed: the original roadmap promised one merged PR per candidate but placed
  Sync and Archive after that merge, leaving their file changes undelivered.
- Exit/recovery: use an implementation PR followed by a narrowly scoped
  lifecycle-record PR, both linked to the same issue and OpenSpec change.
- Automation conclusion: none; validate the two-PR flow manually ten times.

### OBS-004 — independent review exposed pre-campaign contract mismatches

- Phase: campaign preflight review.
- Expected: temporary reviewer feedback is assessed against repository evidence,
  and only the resulting dispositions become durable.
- Observed: independent reproduction confirmed drift between the tracking
  schema and validator, incompatible no-spec gates, missing literal artifact
  instructions, a PR-template mismatch, and untested validator behavior. The
  raw Claude CLI review remains intentionally ignored.
- Evidence:
  [`DRR-2026-09-03-01`](../review-records/2026-09-03-dogfood-preflight-review-disposition.md).
- Blocker or impact: candidate 1 cannot safely document tracking while its
  schema and validator disagree; later documentation-only candidates cannot
  satisfy both current artifact gates.
- Exit/recovery: complete PF1–PF3 from the disposition through the normal SDD
  lifecycle, rerun the campaign entry gate, and keep candidate 1 `Blocked`
  until the evidence is durable.
- Automation conclusion: none; these are manual preflight repairs and do not
  justify a controller or campaign automation.

### OBS-005 — PF2 completed the first qualifying manual cleanup run

- Candidate/change: campaign preflight / PF2 `align-artifact-quality-gates`.
- Phase: implementation delivery, lifecycle-record delivery, and Workspace
  cleanup.
- Expected behavior: artifact-quality requirements are delivered through the
  two-PR lifecycle, then only exact registered local resources are manually
  cleaned after all delivery gates pass.
- Observed behavior: [issue #8](https://github.com/joericearchitect/jra-sdd-workflow/issues/8),
  [implementation PR #9](https://github.com/joericearchitect/jra-sdd-workflow/pull/9),
  and [lifecycle-record PR #10](https://github.com/joericearchitect/jra-sdd-workflow/pull/10)
  were delivered. The change is [archived](../../openspec/changes/archive/2026-09-05-align-artifact-quality-gates/),
  the living specification is synchronized, and the issue's configured Project
  item is Done.
- Evidence: the merged PRs, archived change, synchronized living spec, and the
  validated local cleanup receipt. Authorization-pause dispositions are
  recorded in [PF2 pause observations](../notes/pf2-authorization-pause-observations.md).
- Blocker or impact: the reusable cleanup helper rejected the repository's
  valid register because it requires fields that the repository schema does not
  own. Receipt persistence also first stopped safely because the exact
  change-owned `receipts/` directory was absent. Manual cleanup then completed
  from the validated repository contract.
- Documented exit/recovery: retain exact-target cleanup authorization; use the
  repository validator and receipt as the authority; resolve helper/register
  ownership in a later design change rather than fabricating fields.
- Recovery attempts and result: the missing receipts directory was created,
  the receipt revalidated, and all registered resources were cleaned. A stale
  primary-checkout merge warning was resolved by proving each exact topic head
  was in current `origin/main` before local branch deletion.
- Prior matching occurrences: none. These are one-run observations.
- Skipped, unavailable, or unresolved evidence: remote branch deletion is
  outside the Workspace cleanup contract and is handled as a separate,
  verified Git operation. The helper/register ownership mismatch remains open
  for later design review.
- Possible post-campaign improvement: evaluate authorization consolidation,
  receipt-directory initialization, default-branch ancestry evidence, and the
  helper/register contract only after the campaign's repeated-run threshold.
- Workspace cleanup schema/run: v1 / 1.
- Registered and final outcome counts: 4 registered resources; 4 completed
  exact local actions.
- Resume used: No.
- Manual effort and bounded friction codes: action entries recorded 0 whole
  minutes; `AUTHORIZATION-PAUSE-DENSITY`,
  `CLEANUP-HELPER-CONTRACT-MISMATCH`, `RECEIPT-DIRECTORY-MISSING`, and
  `STALE-PRIMARY-BRANCH-WARNING`.
- Qualifying cleanup run: Yes; it began with registered resources, every
  delivery gate passed, and its validated receipt is complete.
- Automation conclusion: none. One qualifying run is below the ten-run and
  repeated-friction thresholds, and no authorization or recovery gate changes.

### OBS-006 — PF3 product/support proportion measurement

- Candidate/change: campaign preflight / PF3 `make-dogfood-entry-coherent`.
- Phase: Apply, before implementation delivery.
- Expected behavior: proportion is measured manually from a checked path
  inventory; generated assistant copies are visible but excluded from the
  authored-product denominator.
- Observed behavior: the reviewed inventory contains 4,213 authored-product
  lines across 31 paths, 31 new supporting-test lines, and 7,379 generated-copy
  lines across 37 paths. Supporting machinery is well below the three-times
  review threshold.
- Counting commands:

  ```bash
  git ls-files README.md AGENTS.md 'docs/**' 'openspec/config.yaml' 'openspec/specs/**' 'scripts/validation/*.mjs' 'scripts/validation/lib/**' 'schemas/**' 'quality/**' '.github/**' ':(exclude)scripts/validation/test/**' | sort -u | xargs wc -l
  git ls-files '.agents/**' '.claude/**' '.continue/**' '.cline/**' | sort -u | xargs wc -l
  wc -l scripts/validation/test/pr-contract.test.mjs
  ```

- Authored-product inventory:

  ```text
  .github/ISSUE_TEMPLATE/bug.yml
  .github/ISSUE_TEMPLATE/config.yml
  .github/ISSUE_TEMPLATE/feature.yml
  .github/pull_request_template.md
  .github/workflows/openspec-linkage.yml
  .github/workflows/validate.yml
  AGENTS.md
  README.md
  docs/design/glossary/01-foundations.md
  docs/design/glossary/02-lifecycle.md
  docs/design/glossary/03-change-and-artifacts.md
  docs/design/glossary/04-github-and-delivery.md
  docs/design/glossary/05-validation-and-recovery.md
  docs/design/glossary/06-industry-terms.md
  docs/design/glossary/README.md
  docs/sdd-workflow.md
  openspec/config.yaml
  openspec/specs/artifact-quality-validation/spec.md
  openspec/specs/tracking-contract/spec.md
  openspec/specs/workspace-cleanup/spec.md
  quality/openspec-artifact-rules.json
  schemas/openspec-tracking-v1.schema.json
  schemas/workspace-cleanup-v1.schema.json
  scripts/validation/lib/tracking.mjs
  scripts/validation/lib/workspace-cleanup.mjs
  scripts/validation/validate-no-hardcoded-environment.mjs
  scripts/validation/validate-openspec-artifacts.mjs
  scripts/validation/validate-openspec-linkage.mjs
  scripts/validation/validate-pr-contract.mjs
  scripts/validation/validate-tracking.mjs
  scripts/validation/validate-workspace-cleanup.mjs
  ```

- Generated-copy inventory:

  ```text
  .agents/skills/.openspec-target
  .agents/skills/openspec-apply-change/SKILL.md
  .agents/skills/openspec-archive-change/SKILL.md
  .agents/skills/openspec-explore/SKILL.md
  .agents/skills/openspec-propose/SKILL.md
  .agents/skills/openspec-sync-specs/SKILL.md
  .agents/skills/openspec-verify-change/SKILL.md
  .claude/commands/opsx/apply.md
  .claude/commands/opsx/archive.md
  .claude/commands/opsx/explore.md
  .claude/commands/opsx/propose.md
  .claude/commands/opsx/sync.md
  .claude/commands/opsx/verify.md
  .claude/skills/openspec-apply-change/SKILL.md
  .claude/skills/openspec-archive-change/SKILL.md
  .claude/skills/openspec-explore/SKILL.md
  .claude/skills/openspec-propose/SKILL.md
  .claude/skills/openspec-sync-specs/SKILL.md
  .claude/skills/openspec-verify-change/SKILL.md
  .cline/skills/openspec-apply-change/SKILL.md
  .cline/skills/openspec-archive-change/SKILL.md
  .cline/skills/openspec-explore/SKILL.md
  .cline/skills/openspec-propose/SKILL.md
  .cline/skills/openspec-sync-specs/SKILL.md
  .cline/skills/openspec-verify-change/SKILL.md
  .continue/prompts/opsx-apply.prompt
  .continue/prompts/opsx-archive.prompt
  .continue/prompts/opsx-explore.prompt
  .continue/prompts/opsx-propose.prompt
  .continue/prompts/opsx-sync.prompt
  .continue/prompts/opsx-verify.prompt
  .continue/skills/openspec-apply-change/SKILL.md
  .continue/skills/openspec-archive-change/SKILL.md
  .continue/skills/openspec-explore/SKILL.md
  .continue/skills/openspec-propose/SKILL.md
  .continue/skills/openspec-sync-specs/SKILL.md
  .continue/skills/openspec-verify-change/SKILL.md
  ```

- Supporting inventory: `scripts/validation/test/pr-contract.test.mjs` (31
  lines). New PF3 planning artifacts and campaign records are not counted as
  product or supporting machinery.
- Exit/recovery: retain the checked inventories and rerun the commands after a
  material path change. Stop for review if supporting machinery approaches
  three times the authored product it supports.
- Automation conclusion: none. The measurement is a manual campaign
  checkpoint, not authorization for a counter or controller.

### OBS-007 — PF3 lifecycle recheck released candidate 1 for Explore

- Candidate/change: campaign preflight / PF1–PF3 disposition recheck.
- Phase: post-lifecycle campaign-entry reconciliation.
- Expected behavior: candidate 1 remains `Blocked` until PF1, PF2, and PF3
  have closed issues, merged implementation and lifecycle-record PRs, archived
  changes, matching observation evidence, a passing complete validation set,
  and default-branch inclusion.
- Observed behavior: PF1 ([issue #2](https://github.com/joericearchitect/jra-sdd-workflow/issues/2),
  [PR #3](https://github.com/joericearchitect/jra-sdd-workflow/pull/3),
  [PR #4](https://github.com/joericearchitect/jra-sdd-workflow/pull/4), and
  its archived change; [IFL-001 and IFL-005](../notes/issue-and-friction-log.md)
  record its validation and lifecycle friction), PF2 ([issue #8](https://github.com/joericearchitect/jra-sdd-workflow/issues/8),
  [PR #9](https://github.com/joericearchitect/jra-sdd-workflow/pull/9),
  [PR #10](https://github.com/joericearchitect/jra-sdd-workflow/pull/10), its
  archived change, and OBS-005), and PF3 ([issue #12](https://github.com/joericearchitect/jra-sdd-workflow/issues/12),
  [PR #13](https://github.com/joericearchitect/jra-sdd-workflow/pull/13),
  [PR #14](https://github.com/joericearchitect/jra-sdd-workflow/pull/14), its
  archived change, and OBS-006) are all durable. Their lifecycle commits are
  reachable from the reviewed default branch. No accepted blocking finding is
  open, and this follow-up's complete validation set passed.
- Evidence: archived OpenSpec records; PF1's IFL-001/IFL-005, PF2's OBS-005,
  and PF3's OBS-006; closed PF1–PF3 issues in their configured Project
  completion state; merged PRs and lifecycle-commit ancestry; and the
  validation commands recorded in this follow-up's tasks.
- Blocker or impact: the original PF3 lifecycle record omitted this campaign
  ledger update, leaving the roadmap stale even though delivery was complete.
- Documented exit/recovery: record the recheck in a separate scoped change,
  preserve PF3's delivered cleanup resources, and change only the roadmap state
  from `Blocked` to `Not started`. If any input later drifts, return candidate 1
  to `Blocked` and refresh the affected evidence.
- Recovery attempts and result: the delivered lifecycle resources were not
  reused; this documentation-only correction records the missing evidence and
  leaves candidate 1's GitHub issue and Project state unchanged.
- Prior matching occurrences: OBS-001 recorded an earlier roadmap/external
  intake lag; this is the first post-lifecycle recurrence.
- Skipped, unavailable, or unresolved evidence: no living-spec Sync applies to
  PF3 because it declares `skip_specs: true`. Candidate 1 Explore remains
  unstarted and requires its own authorization.
- Possible post-campaign improvement: assess whether lifecycle-record review
  checklists need a more explicit campaign-ledger prompt only after repeated
  manual evidence; this observation does not authorize automation.
- Workspace cleanup schema/run: not applicable; PF3 cleanup remains a separate
  authorized action.
- Registered and final outcome counts: not applicable to this record-only
  correction.
- Resume used: No.
- Manual effort and bounded friction codes: `LIFECYCLE-LEDGER-OMISSION`.
- Qualifying cleanup run: No; this recheck did not clean a workspace resource.
- Automation conclusion: none. One observed omission is below the campaign
  threshold and remains evidence for later design review only.

## Per-change observation template

Copy this section for each material event. Use `None observed` when a phase ran
without friction; do not invent a problem or recovery.

### OBS-XXX — concise title

- Candidate/change:
- Phase:
- Expected behavior:
- Observed behavior:
- Evidence:
- Blocker or impact:
- Documented exit/recovery:
- Recovery attempts and result:
- Prior matching occurrences:
- Skipped, unavailable, or unresolved evidence:
- Possible post-campaign improvement:
- Workspace cleanup schema/run:
- Registered and final outcome counts:
- Resume used:
- Manual effort and bounded friction codes:
- Qualifying cleanup run: Yes / No, with reason

## Campaign summary

Complete during candidate 10:

- Runs completed:
- Qualifying Workspace cleanup runs:
- Repeated cleanup friction codes and independent-run counts:
- Friction counts by phase:
- Recovery events:
- Phases with no observed friction:
- Repeated pain that may justify design work:
- Proposed follow-up changes, not yet created:
- Explicit no-automation conclusions:
