# Post-Archive Workspace Cleanup — design brief

Date: 2026-09-04

## 1. Problem and desired outcome

The workflow can deliver a change—the implementation PR, synchronized living
specification, archive, and lifecycle-record PR can all reach the default
branch—without recording which local branches and worktrees were created for
that change. Those local resources then become legacy resources: their merge
history is visible, but their ownership and safe retirement are not proved.

The first desired outcome is a **repository-local, manual Workspace cleanup
contract**. It must register every intentional change branch or secondary
worktree at creation time, keep the primary worktree protected, audit after
lifecycle delivery, and record manual cleanup outcomes. That is sufficient to
prevent the next run from producing unowned resources. It is not an automated
cleanup system.

## 2. Evidence and key findings

- [The workflow guide](../../docs/sdd-workflow.md#lifecycle) defines six
  selected OpenSpec actions ending at Archive. The [dogfood runbook](../plans/change-runbook-ai.md#7-deliver-the-lifecycle-record)
  adds a lifecycle-record PR but neither source defines creation-time resource
  registration or a cleanup handoff.
- [The current issue and friction log](../notes/issue-and-friction-log.md)
  records the observed result: the merged local topic branches are unregistered
  legacy resources, while the primary worktree is dirty with unrelated planning
  documents and must be preserved.
- The installed reusable `sdd-workspace-cleanup` skill is intentionally
  conservative. It requires an exact selected-entry resource record, current
  delivery evidence, and clean non-primary resources; it refuses ownership
  inference, remote deletion, and primary/dirty resource removal. Its declared
  standalone runtime operations plan cleanup but do not perform manual
  apply/resume.
- [The research recommendation](../research/openai-harness-engineering-symphony/recommendation.md#1-harness-engineering--adopt-the-mindset-keep-it-proportional)
  and [project configuration](../../openspec/config.yaml) require manual-first,
  proportional workflow evolution. Adding an execution adapter before observing
  the manual procedure would violate that constraint.

## 3. Options considered and tradeoffs

1. **Leave cleanup informal.** Lowest immediate cost, but future branches and
   worktrees remain unowned and cannot be safely retired on evidence alone.
2. **Implement one repository-local manual contract (recommended first
   increment).** Adds a small record format, a documented creation/handoff/
   cleanup procedure, validation, and receipts. It makes the next run safely
   cleanable without adding a controller or a reusable execution adapter.
3. **Add a reusable apply/resume skill now.** Centralizes execution but is
   premature: the repository has not yet run the manual procedure repeatedly or
   identified its real friction.

## 4. Decisions, assumptions, and owner

**Owner decision recorded 2026-09-04:** implement option 2 as one
repository-local OpenSpec change, `formalize-workspace-cleanup`. Keep the
selected OpenSpec action list unchanged and add a repository-defined delivery
stage after lifecycle delivery:

```text
explore -> propose -> apply -> verify -> implementation PR -> sync -> archive
-> lifecycle-record PR -> workspace cleanup
```

The first increment records and guides a human through cleanup; it does not
automatically create, switch, remove, or delete Git resources. A later
reusable-skill change is not part of this decision.

Assumptions:

- A primary worktree remains protected and is normally left on the default
  branch. It must not host change-owned implementation or lifecycle work.
- A resource can be a branch, a secondary worktree, or both. Each has a
  distinct registration entry. Branch and worktree entries serving the same
  delivery role share that role's delivery binding; implementation and
  lifecycle-record roles have separate bindings.
- A change can have no registered local resources. The audit records that
  outcome and succeeds without deletion.
- Existing unregistered resources remain legacy resources. They are not
  backfilled or deleted by the first increment.

The exact operational register and receipts live in the Git-shared metadata
directory resolved at runtime. Sanitized material outcomes and friction live
in the repository planning notes. The rules and schema are version controlled;
machine-specific resource details are not.

Each resource is identified by the human-readable tuple **change name, role,
resource kind, and attempt number**. Roles are `implementation` and
`lifecycle-record`; resource kinds are `branch` and `worktree`. A branch and a
secondary worktree supporting the same role are two distinct records, not a
single `both` kind. Attempt one is stored explicitly as `1`; a cancelled or
blocked attempt remains in the record, and a replacement of the same change,
role, and kind uses the next attempt number. A worktree names its associated
branch by that branch's complete key. The branch must have the same change and
role, but its attempt is independent: for example, worktree attempt `2` may
reuse a still-valid branch attempt `1`. This replaces opaque resource IDs and
ownership tokens: neither is justified while one change normally owns at most
one active resource of each role and kind.

Project completion is a cleanup entry gate only when Project information is
configured for the change. Otherwise the receipt records that gate as not
applicable. A later execution adapter remains conditional on ten completed
manual cleanup runs, the same friction in at least three independent runs, no
unresolved safety issue, and a proportionate automation that preserves the
manual gates and recovery paths.

Decision owner: repository owner. This records planning decisions only; it
does not authorize cleanup of any resource.

## 5. Scope, non-goals, constraints, dependencies, and risks

### First increment: one repository-local OpenSpec change

The `formalize-workspace-cleanup` change should define the following manual
contract and its validation. The resource register and receipts live in the
Git-shared metadata directory resolved at runtime, outside any worktree that
may be removed. A sanitized material outcome or friction summary belongs in
the repository planning notes.

#### A. Create resources with an ownership handoff

Before creating a change branch or secondary worktree, record a **planned
resource** bound to the selected change. Its key is change name, role,
resource kind, and attempt number; it includes the intended branch name or
derived locator, starting commit, intended PR role (implementation or
lifecycle record), and a recovery reference. It must not store an absolute
local path, credential, account, or other environment-specific value.

Create the branch and optional linked secondary worktree manually from the
discovered default-branch commit. The primary worktree stays on the default
branch and is never a cleanup target. If unrelated work already makes the
primary worktree dirty, preserve it and create no change-owned work there.

Immediately inspect the created resource and promote its record to
**registered** only when its actual branch/worktree identity and starting
commit match the planned record. If creation fails or inspection disagrees,
mark the planned record cancelled or blocked; do not treat it as owned.

Register implementation and lifecycle-record resources separately. After the
implementation PR merges, create the lifecycle-record resource from the then
current default branch; never assume that the implementation branch also owns
the archive/living-spec delivery.

#### B. Handoff through delivery and cleanup

At implementation and lifecycle delivery, bind each registered resource to the
corresponding PR and final delivered commit. Treat archived-change and
living-spec visibility as change-level cleanup entry gates. After the
lifecycle-record PR is merged, audit the selected change:

- confirm archive visibility, closed issue, and configured Project evidence
  when that Project gate applies;
- enumerate only resources from the selected change's register;
- re-inspect each resource and classify it as eligible, already gone, or
  ineligible with a bounded reason; and
- display the exact proposed local worktree and branch actions before asking
  for separate cleanup authorization.

Manual apply is allowed only after that authorization. Re-inspect immediately
before each action; remove a secondary worktree before deleting its associated
local branch; and write a started and final receipt outside the target
worktree. A restart reads those receipts, never replays a completed action,
and re-audits blocked work.

#### C. Safe exits and evidence

The phase exits when every registered resource has a receipt that it is
completed, already absent, or intentionally ineligible, with a reason and
recovery reference. A zero-resource audit is a successful exit. Dirty,
primary, locked, unknown, delivery-mismatched, externally referenced, or
legacy resources remain preserved; their exit is a recorded pause, not forced
cleanup.

The change should add proportional validation/fixtures for:

- planned-to-registered promotion and mismatch/cancellation;
- separate implementation and lifecycle resource bindings;
- no-resource, primary, dirty, locked, unproven, and already-absent cases;
- ordered manual worktree/branch cleanup, receipt persistence, and resume; and
- portability: no absolute paths, credentials, or repository-specific constants
  in reusable instructions.

It should update the README, `docs/sdd-workflow.md`, lifecycle glossary, and
both dogfood runbooks so Archive no longer claims to retire resources and the
creation/handoff/audit sequence is visible before the first branch is made.

### Later increment: only if evidence justifies it

After at least ten manual cleanup runs, review the issue log and campaign
observations. If a repeated, specific execution burden remains, propose a
separate `jra-agent-skills` change for a human-authorized, local-only
apply/resume adapter. That change cannot be one OpenSpec delta with the first
increment because the two repositories have independent OpenSpec roots and
ownership boundaries. It must consume the proven record contract, preserve all
manual gates, and add cross-repository compatibility evidence.

Non-goals for the first increment: deleting the current legacy resources;
remote-branch deletion; `git reset`, broad cleanup commands, or automatic
branch/worktree disposal; a controller or runner; a new selected OpenSpec
action; and modification of `jra-agent-skills`.

## 6. Recorded design decisions

| Decision | Accepted direction |
| --- | --- |
| Register and receipts | Exact operational records in Git-shared metadata; sanitized material summaries in planning notes. |
| Creation handoff | Planned → manually created → inspected → registered only on an exact match. |
| Resource key | Change name + role + resource kind + attempt number; no opaque resource ID or ownership token. |
| Project completion | Required only when a Project is configured; otherwise explicitly not applicable. |
| Later automation | Structured receipts and at least ten manual runs, with the same friction in three independent runs and no unresolved safety issue. |

## 7. Recommended next step

The brief is ready for a separate explicit **OpenSpec Propose** request for
`formalize-workspace-cleanup`. Do not create a `jra-agent-skills` change or
delete legacy resources until the manual contract has been implemented and
observed.
