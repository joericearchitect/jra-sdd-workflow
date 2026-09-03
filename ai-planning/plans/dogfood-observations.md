# Dogfood campaign observations

Date opened: 2026-09-03

This is the sanitized evidence ledger for `dogfood-10-changes.md`. It records
manual integration behavior and recovery without storing credentials, raw
authentication output, personal data, or unbounded command logs. GitHub URLs,
commit IDs, validation summaries, and repository-relative paths are preferred
evidence.

An observation does not authorize a repair or automation. Repeated pain is
assessed only after the manual campaign completes.

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

## Campaign summary

Complete during candidate 10:

- Runs completed:
- Friction counts by phase:
- Recovery events:
- Phases with no observed friction:
- Repeated pain that may justify design work:
- Proposed follow-up changes, not yet created:
- Explicit no-automation conclusions:
