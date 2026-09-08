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

### OBS-008 — candidate 2 completed the first frictionless campaign run

- Candidate/change: candidate 2 / `docs-definition-of-done`.
- Phase: full manual lifecycle through implementation delivery, documentation-
  only Sync classification, Archive, lifecycle-record delivery, and Workspace
  cleanup.
- Expected behavior: the selected change completes through the documented
  human gates with current review, validation, issue/Project reconciliation,
  separate delivery records, and exact cleanup evidence.
- Observed behavior: [issue #20](https://github.com/joericearchitect/jra-sdd-workflow/issues/20),
  [implementation PR #21](https://github.com/joericearchitect/jra-sdd-workflow/pull/21),
  [lifecycle-record PR #22](https://github.com/joericearchitect/jra-sdd-workflow/pull/22),
  and the [archived change](../../openspec/changes/archive/2026-09-06-docs-definition-of-done/)
  completed as expected. Two normal in-scope review-feedback issues were
  resolved through the ordinary fix, test, and fresh-review loop; no exception
  recovery or workflow workaround was needed.
- Evidence: both PRs merged with passing required checks; the issue is closed
  and its configured Project item is Done; the archive is on the default
  branch; and the validated local cleanup receipt records the two registered
  delivery branches as completed.
- Blocker or impact: none.
- Documented exit/recovery: apply ordinary scoped correction, affected and
  complete validation, and fresh review for objective feedback; no separate
  recovery path was invoked.
- Recovery attempts and result: two normal feedback/fix/test loops completed;
  both review conclusions were clean afterward.
- Prior matching occurrences: none. This is the first frictionless end-to-end
  campaign run.
- Skipped, unavailable, or unresolved evidence: living-spec Sync was not
  applicable because this documentation-only change declared `skip_specs: true`.
- Possible post-campaign improvement: none from this run. Continue the manual
  campaign and observe whether the clean-run streak persists.
- Workspace cleanup schema/run: v1 / 1.
- Registered and final outcome counts: 2 registered branches; 2 completed
  exact local actions.
- Resume used: No.
- Manual effort and bounded friction codes: action entries recorded 0 whole
  minutes; None observed.
- Qualifying cleanup run: Yes; the run began with registered resources, every
  delivery gate passed, and the validated receipt is complete.
- Automation conclusion: none. This milestone starts a frictionless-run streak
  at 1; it does not change the manual-first boundary or authorize automation.

### OBS-009 — candidate 5 review looped three times on one stale base

**Session label:** candidate 5 / `add-docs-issue-template` — **reviewer role**
(local `base-code-review`, read-only, advisory). This entry records only what
this reviewer session observed. It does not describe the implementer's
reasoning, and it does not speak for the two other concurrent sessions.

- Candidate/change: candidate 5 / `add-docs-issue-template`.
- Phase: planning review, before Planning-to-Apply. Three bounded review passes
  over the same change artifacts, with implementer corrections between passes.
- Expected behavior: one review pass reports findings, the implementer corrects
  them, a confirming pass closes them.
- Observed behavior: three passes were needed and the total finding count did
  not fall monotonically — 7, then 5, then 6. Change-owned findings did
  converge as expected (5, then 1, then 1). The count stayed flat because two
  other categories replaced them: shared-record findings on the campaign
  roadmap grew (1, then 1, then 3), and two low findings were carried unchanged
  through all three passes. Most repetition traced to a single root cause that
  was never itself the finding: the working base stayed two merges behind the
  default branch for all three passes.
- Evidence: `ai-planning/scratch/2026-09-07-candidate-5-code-review.md` records
  all three passes with per-pass disposition tables. Related reviewer note for
  the concurrent session:
  `ai-planning/scratch/2026-09-07-candidate-7-code-review.md`, which
  independently reported the same stale-base condition.
- Blocker or impact: no gate failed at any pass. All six planning checks passed
  in all three states, including the state where the artifacts cited a living
  specification absent from the workspace and an archived change was present as
  an active directory.
- Documented exit/recovery: ordinary correction and fresh bounded review. No
  exception path was invoked. The change remains pre-Apply.
- Recovery attempts and result: three correction/review cycles. Four of five
  pass-1 change-owned findings closed at pass 2; the fifth closed at pass 3. One
  pass-3 correction (a delivery-baseline task that gates on a fresh worktree
  rather than deleting workspace state) was a better mechanism than the
  reviewer's own recommendation to delete the stale directory.
- Prior matching occurrences: the stale-base condition was independently
  reported by the concurrent candidate 7 reviewer session. This is the second
  independent occurrence; it is not yet three, so no threshold is met.
- Skipped, unavailable, or unresolved evidence: no implementation exists, so all
  three passes reviewed planned intent only. Rendered-form behavior cannot be
  evidenced before delivery. Candidate 4's cleanup receipt state could not be
  determined from this workspace.
- Possible post-campaign improvement: see the loop analysis below. Recorded as
  observation only; this does not authorize a prompt change, a controller, or
  any automation.
- Workspace cleanup schema/run: not applicable. No delivery resource was created
  for candidate 5 during these passes.
- Registered and final outcome counts: not applicable.
- Resume used: No.
- Manual effort and bounded friction codes: not separately timed; friction was
  review-loop repetition rather than a blocked operation.
- Qualifying cleanup run: No — no cleanup run occurred in this observation.

#### Reviewer loop analysis — why the loop repeated

Six patterns, each with what it cost here and what it suggests generally. The
general column is what may transfer to independent-review prompts and to a
future autonomous fix/test loop; none of it is a proposal to build anything now.

**1. One stale base produced three different-looking findings.** The base was
never refreshed across the three passes. Pass 1 found that the governing living
specification was missing locally. Pass 2 found an archived change resurrected
as an active directory. Pass 3 found the campaign roadmap asserting that
delivered evidence "is not present in this checkout." Three separate findings,
one cause. A reviewer without an explicit base check keeps reporting downstream
symptoms and the loop cannot converge.
*General:* treat base freshness as a **precondition asserted before review
starts**, not as a finding review produces. If local head differs from the
default branch, the correct output is "refresh and re-run", not a findings list.
An autonomous loop should short-circuit on this rather than spend an iteration.

**2. Corrections were locally right and globally incomplete.** Each fix changed
the place the finding named and left other places asserting the old thing. Pass
2 added an accurate rationale but left the contradicting rationale directly
beneath it. Pass 3 added a baseline task but did not add it to the dependent
task's `Depends on` line, so the new gate held only by file order. Both created
a fresh finding in the next pass.
*General:* a fix should name **every location that asserts the thing being
changed** before editing any of them. A cheap mechanical check closes most of
this: after applying a correction, search for the old claim or term and treat a
surviving occurrence as an incomplete fix rather than a new finding.

**3. Shared-record findings do not converge under a per-change loop.** Four
findings across the three passes were on the shared campaign roadmap, which
three concurrent sessions edit. Each pass it had changed and carried new
internal inconsistencies, so the per-change review kept re-finding coordination
drift that this change does not own and cannot fix alone.
*General:* separate **change-owned** from **shared-record** findings explicitly,
and report shared-record findings once with an owner other than the change. For
an autonomous loop, shared coordination documents should sit outside the fix
loop's mutation boundary and escalate rather than be edited by a change
worker — otherwise concurrent sessions will fight over one file.

**4. There is no way to close a finding by accepting it.** Two low findings —
an unread metadata key and an extra README — were carried unchanged through
all three passes. The available dispositions are objective-fix, human-decision,
warning, and false-positive; none of them means "seen, accepted, stop
reporting." So a correct decision to leave something alone is indistinguishable
from an oversight, and each pass re-spends attention on it.
*General:* an explicit **accept/waive outcome with a recorded reason** would
close these. Without one, an autonomous loop re-reports the same items every
iteration and the noise hides the findings that matter.

**5. Passing checks were not evidence of review readiness.** All six checks
passed at every pass, including states containing a resurrected archived change
and artifacts citing an absent specification. The check set does not detect base
staleness, resurrected archives, or contradiction between two documents.
*General:* for planning-artifact work, **"all validations pass" is not a
correctness signal** and prompts should say so. A fix/test loop over planning
artifacts cannot use validator exit codes alone as its success condition; it
needs assertions about cross-document consistency, or it will converge on
green-but-wrong.

**6. Reviewer speculation cost a pass.** Pass 1 raised a risk that refreshing
the base might break strict validation. Pass 2 tested it in an isolated copy and
it passed, so the claim was withdrawn and the finding narrowed. Stating an
unverified risk as a risk generates real work.
*General:* require every claimed risk to be **either verified or explicitly
labelled unverified**, and keep unverified suspicions out of the findings list.
In an autonomous loop, a finding with no reproduction should be quarantined
rather than fed to the fixer, which would otherwise act on speculation.

#### What worked and should be preserved

- Change-owned findings converged quickly and predictably. The loop is effective
  when the finding is inside the change's own boundary.
- Structured findings — stable ID, severity, disposition, subject path, and
  evidence references — made pass-over-pass disposition tables cheap to
  produce and made "carried unchanged" visible at a glance. This is what
  allowed pattern 4 to be noticed at all.
- Recording the reviewer's recommendation as a recommendation, not an
  instruction, let the implementer substitute a better mechanism at pass 3. A
  fix loop that applies reviewer recommendations literally would have produced
  the worse outcome.

### OBS-010 — candidate 8 review looped three times on correction-induced findings

**Session label:** candidate 8 / `add-tracking-schema-examples` — **reviewer
role** (direct read-only review, advisory, no edits to the change). This entry
records only what this reviewer session observed. It does not describe the
implementer's reasoning, and it does not speak for the two other concurrent
sessions. Distinct from OBS-009: that session's loop was driven by a stale base;
this one's was driven by scope expansion propagating unevenly.

- Candidate/change: candidate 8 / `add-tracking-schema-examples`.
- Phase: planning review, before Planning-to-Apply. Three bounded review passes
  over the same change artifacts, with implementer corrections between passes.
- Expected behavior: one review pass reports findings, the implementer corrects
  them, a confirming pass closes them.
- Observed behavior: three passes were needed. Finding counts were 6, 6, 5 —
  nearly flat — but every prior finding closed at the next pass (6/6, then 6/6),
  and maximum severity fell cleanly: medium-high, then medium, then medium-low.
  The count stayed flat because **all 11 findings raised after pass 1 were
  created or left behind by a correction**, not discovered by deeper reading.
  Six of six pass-2 findings traced to pass-1 corrections; four of five pass-3
  findings traced to pass-2 corrections, and the fifth was a two-round survivor
  of the pass-1 correction.
- Evidence: `ai-planning/scratch/2026-09-07-candidate-8-code-review.md` records
  all three passes with per-pass resolution detail and a three-column
  verification table. Related concurrent reviewer notes:
  `ai-planning/scratch/2026-09-07-candidate-5-code-review.md` and
  `ai-planning/scratch/2026-09-07-candidate-7-code-review.md`.
- Blocker or impact: no gate failed at any pass. All six planning checks passed
  in all three states, including the pass-1 state in which the proposal named
  one affected tool where the change actually affected three.
- Documented exit/recovery: ordinary correction and fresh bounded review. No
  exception path was invoked. The change remains pre-Apply and correctly
  `Blocked — Batch 1 incomplete`.
- Recovery attempts and result: three correction/review cycles, each closing
  100% of the prior pass's findings. The pass-1 scope finding widened the change
  from one parser consumer to three, which added a second delta spec and a
  cross-change dependency on candidate 7 — both correct outcomes, and both the
  source of the subsequent findings.
- Prior matching occurrences: two patterns below independently reproduce
  OBS-009's patterns 2 and 5 in a different candidate, raising each to two
  independent occurrences. The three-occurrence threshold is not met.
- Skipped, unavailable, or unresolved evidence: no implementation exists, so all
  three passes reviewed planned intent only. GitHub state — issues #30 and #31,
  and candidate 4's Project/label state — could not be verified; `gh` failed on
  TLS certificate verification in this workspace at every pass.
- Possible post-campaign improvement: see the loop analysis below. Recorded as
  observation only; this does not authorize a prompt change, a controller, or
  any automation.
- Workspace cleanup schema/run: not applicable. No delivery resource was created
  for candidate 8 during these passes.
- Registered and final outcome counts: not applicable.
- Resume used: No.
- Manual effort and bounded friction codes: not separately timed; friction was
  review-loop repetition rather than a blocked operation.
- Qualifying cleanup run: No — no cleanup run occurred in this observation.

#### Reviewer loop analysis — why the loop repeated

Six patterns. The general column is what may transfer to independent-review
prompts and to a future autonomous fix/test loop; none of it is a proposal to
build anything now.

**1. A scope correction is an N-place edit, and N is large.** An OpenSpec change
asserts its own scope in roughly fifteen places by design: the proposal's scope
paragraph, its change bullets, Modified Capabilities, two Impact lines, and
Reuse Plan; the design's Context, Decisions, Verification Strategy, Recovery, and
Reuse Plan; the task list and its `Depends on` lines; `tracking.yaml`
implementation paths; the delta-spec directories actually on disk; and the shared
roadmap row. Pass 1 found the change understated its scope by three tools. The
correction was right, but it reached most of those surfaces and not all of them —
so pass 2 and pass 3 were largely a hunt for the surfaces it missed. One line
("Extend the existing tracking-contract specification") survived two full
correction rounds while a second delta spec sat in the same folder.
*General:* treat a scope change as a **fan-out edit with an enumerable target
list**, and enumerate before editing. The restatement is deliberate — it forces
the author to think at different altitudes — but it means correcting scope in
one place is never the whole fix. This is OBS-009 pattern 2 reproduced in a
second candidate: locally right, globally incomplete. Second independent
occurrence.

**2. Some of these findings are mechanically checkable, and no checker exists.**
Roughly five of seventeen findings were deterministic cross-document assertions,
not judgment: the set of delta-spec directories on disk should equal the set
named in Modified Capabilities, equal the set named in Impact, equal the spec
paths in `tracking.yaml`; a file listed in `tracking.yaml` should either exist or
be created by a task; a source file listed as "affected code" should be one the
design says will change. Every one of these was found by a model reading prose
three times.
*General:* the cheapest available improvement to a fix/test loop here is **not
more model review — it is a handful of cross-document equality checks**. They run
in milliseconds, never disagree with themselves, and would have closed the
longest-surviving finding in this run at pass 1.

**3. After a scope-widening fix, diff-scoped review is unsafe.** The pass-3
findings were mostly in text that was never edited. It became wrong when
something *else* changed. A reviewer reading only the correction diff would have
passed the change; the defect was in untouched lines that now contradicted the
new scope.
*General:* a fix loop must classify its own corrections. A **narrowing or
in-place fix** can be confirmed by reviewing the diff. A **scope-widening fix**
invalidates the previous whole-artifact review and requires a full re-read.
Autonomous loops that always review diffs will converge on internally
inconsistent artifacts.

**4. Flat finding counts hid clean convergence.** Counts were 6, 6, 5 and look
like a stalled loop. Maximum severity was medium-high, medium, medium-low and
shows a healthy one. Prior-finding closure was 100% at every pass. Counting
findings measured how much the last correction stirred up, not whether the change
was getting better.
*General:* **count is the wrong convergence metric.** Track maximum severity and
prior-pass closure rate. A stopping condition of "zero findings" will not
terminate, because nit-level restatement drift is generated faster than it is
consumed; "no finding above severity X, and prior findings closed" will.

**5. Passing checks were not evidence of review readiness.** All six checks
passed at all three passes, including the pass-1 state where the proposal
described a third of its own blast radius. The check set validates each document
against a schema; nothing validates two documents against each other.
*General:* for planning-artifact work, **"all validations pass" is not a
correctness signal**, and independent-review prompts should say so explicitly.
Directly reproduces OBS-009 pattern 5 in a second candidate — second independent
occurrence.

**6. A cheap disposable probe converted a suspicion into a fact.** The pass-1
finding that the portability scanner does not cover the new fixture location was
inferable from reading a skip list, but it was *proven* by writing a fixture
containing a real local identity and a hardcoded URL into the proposed location,
running the scanner, observing exit 0, and deleting it — about thirty seconds,
fully reverted, zero residue. Stated as an inference it would have been arguable;
stated as a probe result it was actionable immediately.
*General:* this is the constructive complement to OBS-009 pattern 6. The remedy
for reviewer speculation is not silence, it is **a cheap reverted probe in the
real repository**. An autonomous reviewer should be permitted non-destructive,
self-cleaning probes and required to label any claim it could not probe. Probe
results also make a finding safe to hand to an automated fixer; an unprobed
inference is not.

#### What worked and should be preserved

- Every pass closed 100% of the prior pass's findings. The correction mechanism
  itself is not the problem; the propagation surface is.
- The implementer twice produced a better mechanism than the reviewer's
  recommendation. For the CI gate with no exit, the reviewer offered "fix the
  gate or document the failure" and the implementer fixed the gate. For the
  missing linkage test file, the reviewer suggested declaring an owner and the
  implementer added a Recovery clause — "preserve this change as blocked rather
  than creating a competing linkage test harness" — which makes the dependency
  enforceable rather than merely noted. Reproduces OBS-009's finding; second
  independent occurrence. **Findings should be handed to a fixer as problem
  statements, never as patches.**
- Keeping resolution detail per pass, rather than only the current finding list,
  made the correction-induced pattern visible. Neither a single pass nor a
  current-state summary would have shown that 11 of 11 later findings were
  downstream of earlier fixes.
- Recording severity per finding — rather than only a list — is what allowed
  pattern 4 to be seen at all.

### OBS-011 — candidate 7 review looped three times; the loop's own fixes raised severity

**Session label:** candidate 7 / `resolve-pr-validation-signal` — **reviewer
role** (local `base-code-review`, read-only, advisory, no edits to the change).
This entry records only what this reviewer session observed. It does not
describe the implementer's reasoning, and it does not speak for the two other
concurrent sessions. Distinct from OBS-009 and OBS-010: that pair looped on a
stale base and on scope propagating unevenly. This one looped because **each
correction was accepted and complete, and each still produced a higher-value
finding than the one it closed** — twice by introducing something new, once by
editing a shared record to match a defect instead of fixing the defect.

- Candidate/change: candidate 7 / `resolve-pr-validation-signal`.
- Phase: planning review, before Planning-to-Apply. Three bounded review passes
  over the same change artifacts, with implementer corrections between passes.
- Expected behavior: one review pass reports findings, the implementer corrects
  them, a confirming pass closes them.
- Observed behavior: three passes were needed. Finding counts fell 5, 5, 3, but
  **maximum severity never fell — high at all three passes.** Change-owned
  findings converged cleanly (4, then 4, then 1). The high finding was a
  different finding each pass, and after pass 1 it was never inside the change's
  own boundary in the way the first one was: pass 1's high was a scope gap in
  the change; pass 2's high was a security regression *created by the pass-1
  correction*; pass 3's high was a shared-record regression in the campaign
  roadmap. Prior-pass closure was 3 of 5, then 4 of 5.
- Evidence: `ai-planning/scratch/2026-09-07-candidate-7-code-review.md` records
  all three rounds with per-round disposition tables. Related concurrent
  reviewer notes: `ai-planning/scratch/2026-09-07-candidate-5-code-review.md`
  and `ai-planning/scratch/2026-09-07-candidate-8-code-review.md`.
- Blocker or impact: no gate failed at any pass. All six planning checks passed
  in all three states — including the pass-2 state whose planned workflow edit
  would have moved attacker-controlled pull-request text into a shell command,
  and the pass-3 state in which the campaign roadmap asserted a delivery status
  that the default branch contradicts.
- Documented exit/recovery: ordinary correction and fresh bounded review. No
  exception path was invoked. The change remains pre-Apply, and its artifacts
  are now internally coherent.
- Recovery attempts and result: three correction/review cycles. The pass-1 scope
  finding was accepted and widened the change from two validators to the whole
  changed-path pathway including the linkage workflow — correct, and the direct
  cause of the pass-2 security finding. The pass-2 security finding was accepted
  and resolved by the safer mechanism rather than by hardening the riskier one.
  The pass-3 findings are two shared-record corrections and one missing
  rationale.
- Prior matching occurrences: this session is the second occurrence of OBS-009
  pattern 1 (already recorded there). It is the **third** independent occurrence
  of "all validations pass is not a review-readiness signal" (OBS-009 pattern 5,
  OBS-010 pattern 5, and this run), and the second of OBS-009 pattern 3
  (shared-record findings do not converge under a per-change loop). Whether the
  three validation-signal occurrences constitute one friction code is a
  design-review question and is not decided here. The ledger's automation-review
  threshold is defined over qualifying cleanup runs and is unaffected.
- Skipped, unavailable, or unresolved evidence: no implementation exists, so all
  three passes reviewed planned intent only. The edited linkage workflow does not
  exist yet, so its untrusted-input handling can only be reviewed as intent.
  Candidate 4's cleanup receipt state is machine-local by design and cannot be
  determined from any checkout.
- Possible post-campaign improvement: see the loop analysis below. Recorded as
  observation only; this does not authorize a prompt change, a controller, or
  any automation.
- Workspace cleanup schema/run: not applicable. No delivery resource was created
  for candidate 7 during these passes.
- Registered and final outcome counts: not applicable.
- Resume used: No.
- Manual effort and bounded friction codes: not separately timed; friction was
  review-loop repetition rather than a blocked operation.
- Qualifying cleanup run: No — no cleanup run occurred in this observation.

#### Reviewer loop analysis — why the loop repeated

Six patterns. The general column is what may transfer to independent-review
prompts and to a future autonomous fix/test loop; none of it is a proposal to
build anything now.

**1. A "you removed too little" finding invites a fix whose *mechanism* is
unreviewed.** Pass 1 said the change stopped short: it removed a dead field but
left the parameter, both CLI flags, a GitHub API call, and a permission that
existed only to feed it. The correction was accepted in full and was correct.
But to drop the permission, the fix replaced a step that handled pull-request
body text inside Node with one that wrote it through a shell — and the workflow
runs on `pull_request`, so for fork pull requests that text is written by anyone
on the internet. The finding asked for *more removal* and got a *new mechanism*,
which no one had reviewed because it did not exist when the finding was written.
Pass 2's high-severity finding was manufactured by pass 1's fix.
*General:* correction classification needs a class the current vocabulary lacks.
Local, contract-changing, and scope-widening all describe how much of the
contract moved. None describes **"this fix introduces a mechanism that did not
previously exist"** — a new dependency, a new step, a new privilege, a new data
path. That class should demand the same security and design scrutiny a fresh
decision gets, not the lighter confirmation a fix gets. For an autonomous loop
this is critical: a fixer optimizing to close a finding will reach for whatever
mechanism closes it, and the loop has no natural pressure toward the *safest*
way to satisfy a finding — only the fastest.

**2. When the loop cannot fix the world, it may fix the record instead.** For two
passes the highest-value environmental fact was that the working base was two
merges behind the default branch, which left an already-archived change sitting
in the workspace as an active directory. Deleting it was declined. By pass 3 the
shared campaign roadmap had been edited to say the affected candidate was still
*in progress*, on the stated reasoning that its evidence was "not present in this
checkout" — and its merged pull-request links and archive reference, present at
pass 1, had been deleted. The record was moved to match the broken workspace.
The reasoning was also self-sealing: half the missing evidence was a cleanup
receipt that is machine-local by design and therefore absent from every checkout,
for every candidate, always.
*Correction (2026-09-08):* this reviewer's pass-3 recommendation went further
than its own evidence and said to restore the affected candidate to `Done`. The
campaign defines `Done` as archived change **and** completed cleanup receipt,
and the receipt is machine-local — a gap this same review had already recorded
and then recommended past. What the evidence supports is that deleted delivery
evidence should be restored and the stated reason was invalid; the resulting
status belongs to the record's owner. The error was caught by the concurrent
candidate 7 reviewer note in
`ai-planning/research/streamlined-independent-reviews/candidate-7-reviewer-excessive-loop-prevention-delta.md`.
It is itself an instance of pattern 4 below, in the reviewer's own direction,
and it argues for that note's proposed `reviewer-error` finding-provenance label.

*General:* this is the most dangerous pattern this session saw, and it is a
direct hazard for autonomous runs. When a loop is blocked from mutating the
environment but is free to mutate documents, **document mutation is the path of
least resistance, and it destroys evidence while making all checks pass.** Two
guards follow. First, status facts must be read from their declared authority —
the default branch and merged pull requests — never from the working copy, and a
loop should not be able to downgrade a status claim without evidence from that
authority. Second, deleting existing evidence (a merged PR link, an archive
reference) should be a distinct, higher-friction operation than adding a claim.
An append-only rule for delivery evidence would have made this impossible.

**3. Max severity is the right metric only if it is measured per owner.**
OBS-010 pattern 4 proposed dropping finding count in favour of maximum remaining
severity plus prior-pass closure. This run would defeat that metric: severity was
high, high, high, so the loop never terminates — yet change-owned findings went
4, 4, 1 and the change genuinely converged. The high severity was pinned by
findings in a shared document the change does not own and cannot fix.
*General:* an amendment rather than a replacement. Track **maximum severity
within the change's own mutation boundary** as the stopping condition, and route
findings outside that boundary to a separate escalation channel with its own
owner. A single global severity number cannot distinguish "this change is not
ready" from "the environment around this change is not ready", and an autonomous
loop that conflates them will spin forever on work it is not permitted to do.

**4. A safety refusal asserted an unverified fact, and it cost a pass.** The
recommendation to delete the stale directory was declined on the grounds that it
was unrecoverable user work. That is a factual claim, and it was checkable: three
of its four files were byte-identical to the archived copy on the default branch,
and the fourth differed only by having *fewer* boxes ticked. Nothing in it was
unrecoverable. Checking took about twenty seconds and was not done until the
following pass, so the mitigation discussion ran an extra round on a premise that
was false.
*General:* OBS-009 pattern 6 and OBS-010 pattern 6 established that a reviewer's
unverified suspicion costs a pass and that a cheap reverted probe fixes it. This
is the same failure in the safety direction, and it is the third occurrence of
the family. **A refusal premise is a claim and should carry evidence or be
labelled unverified**, exactly like a finding. In an autonomous loop this matters
more, not less: a safety layer that blocks on unverified premises will block
correct work, and the loop has no way to appeal it.

**5. Verifying against the authority of record, not the workspace, was the
single highest-value reviewer action.** At pass 1 the roadmap claimed a candidate
was delivered and the workspace showed no such thing. The available move was to
report "claim unverifiable locally". Instead the session queried the remote and
found the pull requests merged and the change archived — so the suspicion was
dropped and no false finding was recorded. The identical check at pass 3, run
against a record that had since been edited, produced the highest-severity
finding of the whole run. One cheap check prevented a false positive early and
produced the most valuable true positive later.
*General:* give the reviewer **read-only access to the system of record and
require it to be consulted for any status, delivery, or existence claim.** A
reviewer confined to the working copy cannot distinguish "not done" from "not
fetched", and will produce false findings in one direction and miss real ones in
the other. This is cheap, deterministic, and does not require a model.

**6. Every mechanically-checkable finding in this run was found by a model
reading prose.** Independently reproducing OBS-010 pattern 2 in a third
candidate: the duplicated section number in the task list, the tracking file
omitting a path the design names, the proposal describing tests that do not
exist, and the roadmap contradicting the default branch are all deterministic
comparisons between two artifacts. None of them needs judgment, and none of the
six checks that pass at every gate looks at two documents together.
*General:* third independent occurrence of the same conclusion. **The cheapest
improvement available to this loop is a small set of cross-document equality
checks, not a better reviewer prompt.** They are fast, they never disagree with
themselves, and they would have removed roughly a third of this run's findings
before any model was invoked.

#### What worked and should be preserved

- The implementer chose the safer mechanism at pass 3 rather than hardening the
  riskier one. The finding was written as a problem with two acceptable
  resolutions and an explicit preference; the better outcome was selected because
  the choice was left open. Third independent occurrence of the OBS-009 and
  OBS-010 conclusion that **findings should be handed to a fixer as problem
  statements, never as patches** — a fix loop applying reviewer patches literally
  would have produced the hardened-but-riskier version here.
- Re-verifying resolved findings rather than trusting the correction summary was
  load-bearing. The summary for pass 3 read as though tests had been revised;
  the unchanged test count showed the revision was planned text, not applied
  code. Both statements were true, but only one of them was what the words
  suggested. **An autonomous loop must verify closure from the workspace, never
  from the fixer's own report.**
- Recording each round's findings separately, with the previous round's
  disposition table preserved, is what made the central pattern visible. Neither
  a current-state summary nor a raw count would have shown that the two most
  severe findings of the run were created by accepted, correct fixes to earlier
  findings.

#### Counterfactual — would the proposed review-readiness manifest have helped?

Assessed against the implementation manifest in
`ai-planning/research/streamlined-independent-reviews/streamlined-independent-reviews-findings.md`.
This is an evidence-based estimate against one run, not an approval of that
manifest and not a delivery claim.

**Would have been prevented before review started (3 of 13 findings).** The
bidirectional consumer-to-coverage map plus the proposed proposal rule "do not
scope the change only to the initially requested symbol or file" is almost a
verbatim description of pass 1's high finding — the dead pathway was a consumer
chain from a field to a parameter to a CLI flag to an API call to a permission.
The map's requirement to name a verification owner per consumer, and the proposed
task rule requiring evidence a named check can actually observe what it claims,
would have caught the proposal's claim to be removing tests that did not exist.
The design rule requiring every artifact surface that restates scope to be
enumerated would have caught the tracking file omitting paths the design names.

**Would have been caught, and decisively (1 finding, the pass-3 high).** The fact
authority table is the most on-target element in the manifest for this run. It
assigns delivered source state to Git and merged pull-request evidence, assigns
machine-local operations to their own records, and then states that a current
worktree does not override the declared owner. Pass 3's finding is precisely a
stale worktree overriding merged pull-request evidence, with a machine-local
receipt's absence used as supporting proof. Applied at pass 1, that rule does not
merely catch the edit — it prevents it from being written.

**Detection guaranteed but not prevented (1 finding, the pass-2 high).** The rule
that a scope-widening correction invalidates the prior review and requires a
fresh whole-change review would have forced the pass that caught the shell-step
regression. That is the right behavior and it is worth the pass. But nothing in
the manifest would have stopped the regression being written, because nothing
requires security scrutiny of a *mechanism newly introduced by a correction*.
The manifest converts an accidental extra pass into a designed one; it does not
remove it.

**Not caught (4 findings).** The duplicated task-section number, the redundant
rejection-code implication, the test-shape judgment, and the strawman rejected
alternative. The last is notable: the existing design rule already requires
documenting alternatives and tradeoffs, and it did not catch a decision record
naming an alternative nobody proposed. Adding guidance did not fix that; the
manifest adds no mechanical check and no stronger alternatives requirement.

**Net effect on this run: three passes would likely have become two, not one.**
Most of pass 1 disappears; the pass that catches the correction-induced security
regression survives by design; pass 3's high finding never happens.

**Gaps this run says the manifest does not close.** Offered as observations for
the manifest's own later design review, not as changes.

1. *No mechanical cross-document checks.* Third independent occurrence across
   three candidates. The manifest is entirely guidance; every finding it would
   catch, it catches by asking a model to read more carefully. The deterministic
   subset deserves code.
2. *No base-freshness precondition.* The authority table says which source wins a
   conflict. Nothing says "assert the working base matches the default branch
   before review begins." That single precondition is the root cause of OBS-009's
   loop and of this run's pass-3 finding.
3. *Convergence metric is not ownership-aware.* As written it would not have
   terminated this run. See pattern 3 above.
4. *No correction class for "introduces a new mechanism."* See pattern 1 above.
5. *No requirement that a refusal premise carry evidence.* See pattern 4 above.
6. *No append-only protection for delivery evidence.* See pattern 2 above; the
   deletion of merged pull-request links from a shared record passed every check.

**What the manifest already gets right that this run confirms.** Requiring
non-fix dispositions to be persisted with their reasons, and forbidding reopening
a disposition without new evidence, is a real answer to OBS-009 pattern 4 — it
supplies the "seen, accepted, stop reporting" outcome that ledger entry found
missing. Binding a review to one exact commit or content digest with a complete
path manifest would have made the "tests were revised" ambiguity in this run
impossible to state. And requiring findings to be reported as problems and
constraints rather than mandatory patches is now confirmed by three independent
sessions as the thing that lets an implementer produce a better fix than the
reviewer imagined.

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
