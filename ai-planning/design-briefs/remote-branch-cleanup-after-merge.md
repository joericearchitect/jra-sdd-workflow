# Remote Branch Cleanup After Merge — design brief

## 1. Problem and desired outcome

The post-Archive workspace-cleanup contract currently cleans only exact local
resources. It deliberately leaves remote topic branches untouched. That was a
safe first boundary, but it assumes the hosting service removes merged PR
branches automatically. Live repository inspection on 2026-09-05 showed that
automatic source-branch deletion is disabled and that merged remote topic
branches remain.

The desired outcome is a manual, evidence-backed extension of cleanup that:

- detects the expected remote counterpart of a registered local branch after
  lifecycle delivery;
- proves whether that exact remote tip is already reachable from the current
  default branch;
- deletes only a safe same-repository remote branch after separate explicit
  authorization; and
- preserves and clearly alerts the user when a remote branch has unmerged
  commits, is a fork, is protected, is unknown, or changes during cleanup.

This is not a request to rely on host configuration or to introduce unattended
branch deletion.

## 2. Evidence and key findings

- [Post-Archive cleanup design brief](post-archive-workspace-cleanup.md)
  deliberately made remote deletion a first-increment non-goal while defining
  exact resource registration, fresh inspection, explicit authorization, and
  restartable receipts.
- [Workflow guidance](../../docs/sdd-workflow.md#workspace-cleanup-after-lifecycle-delivery)
  presently excludes remote deletion from the contract, so a remote branch can
  remain after a fully merged lifecycle-record PR.
- [Living workspace-cleanup specification](../../openspec/specs/workspace-cleanup/spec.md)
  requires cleanup to preserve unknown or delivery-mismatched resources and to
  use a fresh inspection before each destructive action. Those safety rules
  are the right base for a remote extension.
- Live inspection on 2026-09-05 found the host setting that deletes a source
  branch after merge disabled. It also confirmed that the completed change's
  remote branches were all ancestors of the default branch, proving that an
  explicit remote check is useful even when no host policy exists.
- The installed reusable cleanup helper currently plans only local worktree
  removal and local branch deletion. It also expects a different opaque-token
  record shape, so it cannot safely be treated as an implementation of this
  repository's v1 key-based contract.

## 3. Options considered and tradeoffs

1. **Rely on a host's automatic delete-after-merge setting.**
   This has little workflow cost, but it is configuration-dependent, cannot
   distinguish a branch that received new commits after merge, and leaves
   repositories without that setting unmanaged.

2. **Extend this repository's manual cleanup contract, then make a separate
   reusable-skill change.**
   The repository first defines and tests portable discovery, classification,
   receipts, user alerts, and an exact manually authorized remote deletion.
   A later `jra-agent-skills` change can implement that accepted contract.
   This respects ownership and Manual first, at the cost of two coordinated
   changes.

3. **Immediately add remote deletion to the existing reusable helper.**
   This centralizes execution sooner, but crosses repository ownership and
   would require reconciling that helper's incompatible record model at the
   same time as introducing an irreversible network action. It does not yet
   have the required manual-run evidence.

**Recommendation:** Option 2. It adds one bounded manual action, but produces
a contract that can later support safe automation instead of encoding an
environment assumption in a helper.

## 4. Decisions, assumptions, and owner

Decision owner: repository owner.

Stated direction: cleanup must inspect a remote branch after PR merge; it must
delete the branch when it is proven safe and alert the user when it contains
unmerged changes. This brief records that direction, not a signed approval of
the detailed implementation choices below.

Recommended contract for Explore to evaluate:

1. Derive the candidate remote branch from a **registered local branch** and
   its delivery PR; never discover candidates by name search or age.
2. Resolve the default branch, destination remote, and PR head repository from
   current Git and PR evidence. Do not hardcode a remote name, account,
   repository, or default-branch name.
3. Treat a remote branch as eligible only when all of the following are true
   immediately before deletion:
   - its ref exactly matches the registered branch's short ref;
   - the PR is merged and the candidate head belongs to the same repository as
     the destination repository;
   - a fresh fetch finds that exact remote ref;
   - its exact tip is an ancestor of the freshly fetched default-branch ref;
   - it is not the default branch, protected, or otherwise outside the
     authenticated user's deletion authority; and
   - the human has separately authorized that exact remote ref.
4. Delete with one exact non-force remote-ref deletion command. Reinspect the
   remote immediately before acting and record the result. The remote action is
   last, after eligible local worktree and local-branch actions.
5. Treat an absent remote ref as `already-absent`. Treat unmerged commits,
   fork heads, unknown remotes, protected refs, failed fetches, permissions,
   or any drift as preserved outcomes with an actionable alert and recovery
   path—not as a reason to force deletion.

The current generic helper is an independent compatibility concern. The first
change should not retrofit its opaque ownership-token protocol; a later change
in its owning repository must consume the accepted v1 contract or replace the
incompatible interface deliberately.

## 5. Scope, non-goals, constraints, dependencies, and risks

### Proposed first increment in this repository

- Extend the `workspace-cleanup` behavior, v1 operational record contract,
  validator, and tests to represent an audited remote outcome for a registered
  branch without inventing a second opaque resource identity.
- Add remote eligibility classifications: `eligible`, `already-absent`, and
  `ineligible`/`blocked` with bounded reasons such as unmerged, fork,
  protected, mismatched, unavailable, or state drift.
- Require receipts to preserve the inspected remote ref, its audited tip,
  default-branch evidence, action authorization, outcome, and recovery
  reference without storing credentials, raw command output, absolute paths,
  or untrusted PR text.
- Update the workflow guide, lifecycle glossary, runbooks, and dogfood
  observations with the remote audit, authorization, alert, and recovery
  sequence.
- Add adversarial tests for: an ancestor remote tip; a remote tip with new
  unmerged commits; squash/rebase delivery that cannot prove ancestry; absent
  remote; fork source; default/protected ref; stale fetch; reinspection drift;
  remote-deletion failure; and proof that no remote command runs before exact
  authorization.

### Non-goals

- Changing host settings to enable automatic PR-source deletion.
- Deleting remote branches merely because their names resemble a change.
- Deleting fork, default, protected, unknown, mismatched, or unmerged refs.
- Force deletion, wildcard deletion, reset, or unattended cleanup.
- Modifying the reusable cleanup skill in this repository.

### Constraints and dependencies

- Manual first, proportionality, no hardcoded environment values, and every
  gate needs an exit remain mandatory.
- Remote inspection and deletion require an authenticated environment with
  current fetch and PR evidence. An unavailable credential or network is a
  blocked audit result, never an excuse to skip a check.
- Reusable skill implementation belongs to `jra-agent-skills` and therefore
  cannot share this repository's OpenSpec change or PR.

### Risks and recovery

- **Squash/rebase merge:** ancestry may be conservatively inconclusive even
  when equivalent content was delivered. Preserve the remote and alert the
  user; do not try to infer semantic equivalence.
- **New commits after merge:** fresh remote-tip ancestry catches this. Preserve
  it and direct the user to deliver or explicitly retain those commits.
- **Fork or protected branch:** preserve it and name the authority boundary;
  the owner can handle it in the appropriate repository.
- **Deletion failure or drift:** record a blocked receipt, re-fetch and
  re-audit. Never retry blindly or use force.

## 6. Open questions and blocking decisions

1. Should the repository contract be extended first as a manual capability,
   followed by a separate `jra-agent-skills` proposal, as recommended?
2. Should a same-repository PR head be the only remote deletion candidate?
   Recommendation: yes; always preserve fork heads.
3. Should remote evidence extend the existing branch receipt entry or be a
   separate receipt action keyed to that branch? Recommendation: extend the
   existing branch entry so its local and remote outcomes remain tied to one
   human-readable natural key.
4. How should the workflow discover whether a remote ref is protected without
   relying on a provider-specific API? Recommendation: treat explicit deletion
   refusal as a preserved, blocked result; use available provider metadata only
   as additional evidence, not as permission to delete.

## 7. Recommended next step

Run **OpenSpec Explore** for a repository-owned change tentatively named
`extend-remote-branch-cleanup`. Explore should resolve the open questions,
define the minimal record/receipt shape, and verify portable GitHub and Git
evidence sources. It should then propose the manual contract change here.

Only after that contract is accepted and manually exercised should a separate
`jra-agent-skills` Explore/Propose update the reusable cleanup skill to carry
out the same exact remote audit and explicitly authorized deletion.
