# Adversarial review — current and latest change

Date: 2026-09-10

Assurance: `local-review` — same-session, read-only for the implementation.
This is advisory only; it is not OpenSpec Verify, CI, independent review, or
approval.

## Findings

### BLOCKER AR-2026-09-10-001 — latest record claims an unreproducible completed rebuild

Subject: `ai-planning/design-briefs/2026-09-10-review-readiness-simplified-contract.md`

The latest committed brief says the planning-artifact rebuild is done, but the
`a42215f` tree contains none of
`openspec/changes/establish-streamlined-review-readiness/`; that directory is
untracked. A durable record therefore claims a completed artifact set which a
later reviewer cannot reproduce from its revision.

Recommendation: keep the rebuild pending until its exact artifact set is
durably bound, or record a reproducible manifest and make the entry gate verify
that binding.

### BLOCKER AR-2026-09-10-002 — Apply work is present before the plan permits Apply

Subject: `docs/design/glossary/05-validation-and-recovery.md`

The working tree already adds the glossary entries assigned to Apply task 4.1.
The proposal says the change creates planning artifacts only; task 4.1 depends
on task 1.1, which depends on gated task 0.1. This crosses the
Planning-to-Apply boundary in the primary worktree and makes the packet
inconsistent with its own task graph.

Recommendation: remove or isolate these implementation edits until the required
approval and preservation-delivery gate have been evidenced, then make them in
the registered delivery worktree.

### HIGH AR-2026-09-10-003 — review-record delivery semantics conflict

Subject: `openspec/changes/establish-streamlined-review-readiness/design.md`

The design calls the task-5.2 review record a working file and not a delivered
path. Task 5.2 requires committing it so it is delivered, and task 6.1 includes
it in the pull-request scope set. The same file has incompatible delivery
semantics, leaving the claimed authoritative scope check ambiguous.

Recommendation: either classify it consistently as a delivered provenance
artifact outside the guidance inventory, or keep it out of the delivery branch
and remove it from the pull-request set. Update the design, tasks, and
scope-observation decision together.

### HIGH AR-2026-09-10-004 — the pinned entry-gate commit predates required governing sources

Subject: `openspec/changes/establish-streamlined-review-readiness/tasks.md`

Task 0.1 says its prerequisite delivery contains every preserved record cited by
the plan, but verifies only commit `713553d`. The scope-observation design
review and governing-record reconciliation arrived later in `df8c0b7` and
`a42215f`. The pinned check can therefore pass while the delivery base lacks
the current governing decision or revised sources.

Recommendation: bind the gate to the exact preservation revision containing the
final cited sources, or to a versioned manifest of their digests. Do not treat
path existence alone as proof of current governing content.

## Evidence gaps

- GitHub issue #33 and the preservation pull request could not be inspected:
  the local GitHub CLI session is unauthenticated. Remote issue body, PR merge
  state, and forge changed-file evidence remain unverified.

## Checks run

- `node --test scripts/validation/test/*.test.mjs` — 41 passing tests.
- Tracking and artifact validation for the active change — passed.
- `node scripts/validation/validate-no-hardcoded-environment.mjs` — passed.
- `openspec validate --all --strict` — 9 passed, 0 failed.

Machine-readable result: `2026-09-10-adversarial-review-current-and-latest.json`
(validated with `validate-implementation-quality`).
