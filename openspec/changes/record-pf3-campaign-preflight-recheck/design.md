## Context

See [proposal.md](proposal.md) for motivation. The default branch contains
PF1–PF3 implementation and lifecycle-record deliveries, while the campaign
roadmap still describes PF3 as active and candidate 1 as `Blocked`. The
preflight disposition requires the opposite state only after durable evidence
is rechecked. Candidate 1's GitHub issue and Project state are external
records and remain outside this documentation-only correction. Security and
portability require treating those external values as run evidence, not as
reusable constants or executable input.

## Goals / Non-Goals

**Goals:**

- Reconcile the roadmap and observation ledger with durable delivery evidence.
- Record each campaign-entry gate result before changing candidate 1's roadmap
  status to `Not started`.
- Preserve a direct recovery path: a missing, contradictory, or failed input
  leaves candidate 1 `Blocked` and names the evidence to refresh.

**Non-Goals:**

- Reopen PF3, change a GitHub issue or Project field, or start candidate 1
  Explore.
- Add a validator, counter, controller, new workflow phase, or living spec.

## Decisions

1. **Use a new documentation-only correction change.** The delivered PF3
   lifecycle resources remain immutable for cleanup evidence, so a separate
   change records the previously omitted campaign record instead of reusing a
   delivered branch. This preserves resource ownership and two-PR evidence.

2. **Recheck the disposition gate from durable sources.** The update will
   verify PF1–PF3's issue, implementation PR, lifecycle PR, archived change,
   observation entry, complete validation, default-branch inclusion, and no
   accepted open blocker. The roadmap will name these results rather than claim
   a generic successful run.

3. **Transition only the roadmap state.** After every recheck passes, change
   candidate 1 from `Blocked` to `Not started` in the campaign row and current
   state. Candidate 1's GitHub issue and Project state are not equivalent to
   the roadmap's campaign-state vocabulary and must not change. `In progress`
   remains reserved for actual Explore.

4. **Make the recovery fact explicit.** Record the omitted lifecycle-ledger
   update as observed process friction, not as authorization to automate or to
   reuse delivery resources. If a recheck input cannot be reproduced, retain
   `Blocked`, cite the missing input, and return to the affected evidence.

## Verification Strategy

- Inspect the archived PF1–PF3 artifacts and GitHub issue/PR delivery state;
  prove each lifecycle commit is reachable from the current default branch.
- Run the complete repository validation set, including Node tests,
  no-hardcoded-environment, selected-change tracking and artifact validators,
  strict OpenSpec validation, and `git diff --check`.
- Review the roadmap and observation entries for exact transition semantics:
  `Blocked` to `Not started` only after a passing recheck; no GitHub candidate
  state change and no premature `In progress`.

## Attribution and Licensing

This change records repository-owned lifecycle evidence only. It adds no
third-party content, dependency, generated integration, or licensing change.

## Recovery

If any PF1–PF3 delivery, archive, observation, validation, or default-branch
input is missing or contradictory, preserve candidate 1 as `Blocked`, record
the missing input in the observation ledger, and correct that evidence through
its own scoped lifecycle path. A second repair to this campaign-record
component returns to design review. A scoped revert restores the prior roadmap
and observation entries without affecting external issue or Project state.

## Reuse Plan

Reuse the existing preflight disposition, archived OpenSpec records, GitHub
links, validation commands, and campaign record formats. No helper or
automation is introduced.
