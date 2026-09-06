# PF3 implementation handoff — campaign entry coherence and three review gates

## Purpose and current state

PF1 `align-tracking-contract` and PF2 `align-artifact-quality-gates` are
delivered, archived, and recorded in the dogfood ledger. PF3
`make-dogfood-entry-coherent` is the remaining preflight repair before
candidate 1 may leave `Blocked` and enter Explore.

This handoff records the repository owner's decisions and the recommended
answers for PF3 Explore. It is planning context for the next session; it does
not authorize implementation, GitHub mutation, or a rollback rehearsal.

Read this handoff with:

- `ai-planning/review-records/2026-09-03-dogfood-preflight-review-disposition.md`
- `ai-planning/plans/dogfood-10-changes.md`
- `ai-planning/plans/dogfood-observations.md`
- `docs/sdd-workflow.md`
- `openspec/config.yaml`

The current default branch has no active OpenSpec change. Candidate 1 already
has issue #1 and remains on the configured Project in its initial state; do
not create a duplicate issue for candidate 1.

## Owner decisions to implement in PF3

### Living specs are only for durable capabilities

Add repository-wide guidance with this meaning:

> Create or update a living OpenSpec specification only when a change adds,
> removes, or changes a durable, observable capability that future work must
> rely on. Documentation, templates, tests, planning records, campaign
> evidence, and internal implementation details do not create a living spec by
> themselves. When the classification is unclear, resolve it explicitly in
> Explore; do not manufacture a spec merely to satisfy a process check.

PF3 is documentation/template/process-coherence work. It must use the
documentation-only form (`skip_specs: true`) and must not create a delta spec
or synchronize a new living specification. If Explore finds a genuine durable
capability, stop and propose it as separately scoped work rather than adding it
to PF3.

Put the rule in both `openspec/config.yaml` and `docs/sdd-workflow.md` so it
governs future changes and is understandable to contributors. Keep the wording
portable: it must not name this repository, a user, a Project, labels, or an
absolute path.

### Three human review gates

The repository stays manual-first. This policy reduces unnecessary
authorization pauses; it does not create a controller, autonomous runner, or
automatic campaign transition.

| Gate | Entry evidence | Human decision | Work covered after approval |
|---|---|---|---|
| 1. Explore to Propose | The named change has been explored, open questions have practical answers, and the proposed scope, non-goals, evidence, recovery, and external-state hazards are clear. | Resolve questions interactively and approve planning artifact creation. | Create and validate the proposal, design, tasks, delta spec when justified, and `tracking.yaml`. |
| 2. Planning to Apply | Planning artifacts and planning validation are complete and reviewed. | Approve Apply for the named change. | Register planned local delivery resources, implement tasks, verify, self-review, and make bounded objective corrections. |
| 3. Verification to closure | Task evidence, focused and complete checks, local self-review, and the current reviewed head are available. | Review verification, initiate an independent manual review in a separate session, permit its bounded objective-fix/test loop, then approve the named change's closure. | Delivery PR and exact-head merge, issue/Project reconciliation, Sync when a living-spec delta exists, Archive, lifecycle-record PR and merge, fresh resource audit and exact cleanup, and verified remote-branch retirement. |

Gate 3 is one sustained review gate, not a sequence of new authorization
pauses. The independent reviewer must be fresh and read-only. If an objective
finding is within the accepted scope, the implementer may fix it, rerun the
affected checks and complete validation set, and obtain a fresh independent
review of the changed head. The owner then approves the closure portion of the
same gate; there is no routine pause between delivery, Sync, Archive,
lifecycle-record delivery, and cleanup.

### Start authority and closure limits

The implementation should make these boundaries unambiguous:

- A request to start a named change may cover exact issue reuse-or-create and
  configured Project intake needed before Explore. It does not authorize
  Propose, Apply, or closure.
- Gate 2 Apply authority covers routine, registered branch/worktree creation
  and all ordinary implementation, verification, self-review, and first
  objective-correction work for the selected change.
- Gate 3 closure authority is bounded to the selected change, its reviewed
  head, its configured delivery target, and its registered resources. It may
  cover only exact commits, PRs, branches, worktrees, and cleanup targets that
  are inspected at the time of action.
- A fresh cleanup audit still occurs immediately before cleanup. It may act
  only on exact registered secondary worktrees and local branches that remain
  eligible. Remote branches may be deleted only after their exact heads are
  proven merged into the current default branch. Never include the primary
  worktree, force options, broad patterns, legacy resources, or unknown
  resources.

The authorization expires and the workflow returns to review if the scope,
reviewed head, CI result, delivery target, resource identity, ownership,
Project/issue evidence, or independent-review conclusion drifts. It also
returns to review for a material design, security, compatibility, or external
state decision; unavailable permissions; a failed recovery path; or a second
repair to the same component. These are exceptions, not routine phase pauses.

## Recommended PF3 scope decisions

### 1. PR template and direct proof

**Recommendation:** change the template so an implementation PR leads with a
passing issue-reference form, `Closes #<issue-number>`, and retains
`OpenSpec change: <change-name>`. Explain that a lifecycle-record PR uses
`Related to #<issue-number>` instead of `Closes`.

Add a small direct validator test or fixture body copied from the completed
template. It must pass the PR contract validator. The test should also preserve
the lifecycle-record alternative. Do not change the validator merely to accept
an incomplete template prompt; the template should teach the already-supported
contract.

### 2. Safe label rollback rehearsal for candidate 4

**Current evidence:** the current live label inventory contains only the normal
repository labels and no known disposable rehearsal label. The issue templates
refer to `sdd`, `type:bug`, and `type:feature`, which are absent from that
inventory. PF3 itself performs no label mutation.

**Recommendation:** candidate 4 Explore should select a new, dedicated,
temporary label that is not referenced by an issue template, issue, workflow,
or policy. Before seeking a later, exact authorization, record its intended
name and properties, a pre-mutation inventory, creation evidence, deletion
evidence, and a post-mutation inventory. Do not use one of the intended final
template labels as the rehearsal target, because deleting it would temporarily
break real intake configuration.

If no dedicated temporary label can be safely created and removed, record that
constraint honestly. Replace the roadmap's required rehearsal with a different
safe, externally reversible operation before candidate 1 begins; never mutate
a real label speculatively just to satisfy the exercise.

### 3. Product/support proportion measurement

**Recommendation:** make the measurement manual and reproducible, using a
checked path inventory and line counts rather than a new measurement tool.

- Authored product denominator: unique, repository-authored workflow docs,
  configuration, validators, schemas/rules, templates/workflows, and living
  specifications.
- Supporting numerator: new helpers, harnesses, fixtures, or orchestration
  that exist only to support those product surfaces.
- Separate disclosure: generated assistant integrations are reported as a
  distinct generated-copy count. Do not include their duplicated lines in the
  authored product denominator or use them to make the three-times checkpoint
  harder to reach.
- Preserve the existing three-times review threshold and state the exact path
  inventory, counting command, and result in the campaign ledger. Do not add a
  counter or controller.

### 4. README support claims

**Current evidence:** README names Aider as supported, but the checked-in
assistant integrations cover Claude/Codex and generated Cline/Continue entry
points; no Aider integration exists. README also calls generated integrations
“thin pointers,” while the checked-in generated skill copies are full generated
instruction files.

**Recommendation:** remove the Aider support claim rather than add a new
integration. Replace “thin pointers” with factual wording such as
“generated assistant-specific entries that expose the selected workflow
actions.” Do not broaden PF3 into new tool support.

### 5. Candidate 7: unused PR-validation signal

**Current evidence:** `requiresOpenSpecValidation` is calculated and returned
by both PR/linkage validators, but no consumer uses it; CI already runs strict
OpenSpec validation for every PR.

**Recommendation:** plan candidate 7 as `resolve-pr-validation-signal` and
prefer removing this dead return field and its tests unless Explore identifies
a concrete, necessary consumer with different behavior. Do not add a second,
hidden CI policy merely to preserve an unused signal.

### 6. Candidate 8: tracking examples

**Recommendation:** revise its positive case to contain two valid,
distinguishable implementation-repository entries. Revise its negative case to
use a duplicate tracking key and assert the stable bounded rejection. Keep
environment values as placeholders.

### 7. Candidate 9: archive lookup ambiguity

**Recommendation:** replace the current candidate with a change that rejects
ambiguous archived-change suffix matches. The eventual validator behavior
should select an archive only on one exact canonical match; zero matches and
more than one suffix match must stop with clear correction guidance. Add direct
tests for both failure cases and the exact-match success case.

### 8. Roadmap risk wording and command lists

**Recommendation:** remove the generic `prototype-rapid` label from the
roadmap. State each candidate's local risk, recovery, and external-state
assumptions directly. Add `validate-tracking.mjs` with its explicit
`tracking.yaml` target to the delivery command lists in `AGENTS.md` and
`CLAUDE.md`. Remove the empty `ai-planning/plans/dogfood-command-log.txt`; the
sanitized observation ledger is the sole campaign evidence sink.

## Required PF3 non-goals

- No living-spec delta, Sync, or new durable capability specification.
- No controller, autonomous runner, or campaign-transition automation.
- No label, Project, issue, or other GitHub mutation during PF3 itself.
- No new Aider integration or expansion of assistant support.
- No unbounded PR/CI/review retries, force operations, broad deletion, or
  primary-worktree cleanup.
- No starting candidate 1 until PF3 is delivered, archived, recorded, and the
  campaign entry gate is rechecked.

## Recommended next-session sequence

1. Confirm the default branch is current and clean, read the five context files
   named above, and inspect the current repository facts again rather than
   trusting stale command output.
2. Start PF3 intake under the named-change start authority, then Explore. Use
   the recommendations above as proposed answers and record any changed fact or
   owner decision.
3. Pause at Gate 1 only when Explore can present a proposal-ready scope,
   including the label-rehearsal fallback and exact measurement method.
4. After explicit Gate 1 approval, Propose PF3 with `skip_specs: true`; put the
   repo-wide living-spec and three-gate rules in the proposal/design/tasks as
   documentation/configuration work, not as a new capability spec.
5. After Gate 2 approval, Apply, validate, self-review, and correct objective
   findings within the defined repair limit.
6. At Gate 3, conduct the separate independent review, handle only bounded
   objective fixes with fresh evidence, obtain closure approval, then complete
   the two-PR lifecycle and exact cleanup without routine authorization pauses.

## Completion evidence for PF3

- The PR template has passing implementation and lifecycle-record examples.
- The repository guidance explicitly limits living specs to durable observable
  capabilities and explains the documentation-only path.
- The repository guidance defines the three gates, their coverage, expiration
  conditions, and exception pauses without authorizing automation.
- The roadmap reflects the rebalanced candidates, local risk/recovery
  assumptions, measurement method, and candidate 4's safe rehearsal path.
- README claims match the checked-in integrations; delivery command lists
  include tracking validation; the unused command log is gone.
- Planning/apply evidence, independent review, complete validation, delivery,
  archive, campaign observation, and cleanup evidence are durable before
  candidate 1 becomes `Not started`.
