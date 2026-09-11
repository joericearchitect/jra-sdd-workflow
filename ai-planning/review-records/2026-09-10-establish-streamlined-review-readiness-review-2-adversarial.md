# Adversarial review — establish streamlined review readiness

## Start header

- **Reviewed change:** `establish-streamlined-review-readiness`
- **Review base:** `4f5e058` on `preserve-review-readiness-evidence`, before this
  record was written
- **Inputs:** the change's `proposal.md`, `design.md`, `tasks.md`,
  `tracking.yaml`, and `.openspec.yaml`; `docs/sdd-workflow.md`;
  `openspec/config.yaml`; the accepted simplified-contract brief; repository
  Git topology; and the assistant-guidance file type metadata
- **Reachable authorities:** local Git state, repository files, the local
  preserved-artifacts record, and GitHub issue #33 through authenticated `gh`.
- **Reviewer kind:** same-session local adversarial review; advisory and
  non-approving, not an isolated independent review
- **Materiality rule:** a contradiction that prevents an authorized Apply task
  from satisfying its stated entry gate or evidence is material.

## Findings

### RRR-001 — preservation recovery cannot clear its own entry gate

- **Severity:** blocker
- **Disposition:** human-decision
- **Subject:** `openspec/changes/establish-streamlined-review-readiness/tasks.md`
  entry gates and `design.md` Recovery
- **Evidence:**
  - `tasks.md` lines 7–9 make commit `e9eaf79` reachable from the delivery base
    a precondition to task 0.1; task 0.1 repeats that requirement at line 24.
  - `git merge-base --is-ancestor e9eaf79 main` exited `1`, so the required
    relationship does not currently hold.
  - `design.md` lines 193–196 instead says the exit is either to merge the
    preservation branch *or* obtain the glossary text from the retired-artifacts
    record by an explicitly recorded route.
  - The alternate route cannot satisfy the task's unchanged reachability
    precondition. No task defines the required merge or changes the entry gate
    after an approved recorded-source route.
- **Impact:** Apply is blocked now. More importantly, one of the two documented
  recovery routes remains unusable even after its stated recovery action, which
  conflicts with the requirement that every gate have a usable exit. Merging a
  preservation-history commit into the default-branch delivery base is also a
  material sequencing and delivery decision, not a routine task-0.1 action.
- **Recommendation:** The owner should select one explicit route before Apply:
  either (a) deliver the preservation commit to the default branch through its
  own authorized path and retain the reachability gate, or (b) authorize the
  recorded patch as the source and replace the reachability gate with evidence
  that the exact preserved patch is readable and applies cleanly in the
  registered worktree. Update the entry gates, task 0.1 evidence, and Recovery
  together, then rerun a fresh review.

### RRR-002 — the assistant-block tasks conflict with the checked-in symlink

- **Severity:** blocker
- **Disposition:** objective-fix
- **Subject:** `tasks.md` 2.1–2.2 and `design.md` consumer-map rows C2–C3
- **Evidence:**
  - `CLAUDE.md` is a symbolic link whose target is `AGENTS.md`; `AGENTS.md` is
    the target regular file.
  - Task 2.1 requires one added block in `AGENTS.md` and its evidence requires
    a reviewed diff with one added block (`tasks.md` lines 62–66).
  - Task 2.2 then requires adding a byte-identical block to `CLAUDE.md`
    (`tasks.md` lines 68–71), which resolves to the same physical file.
  - The design similarly assigns a separate addition and selective revert to
    both logical paths (`design.md` lines 106–107), while requiring a single
    equality check (`design.md` lines 58–60).
- **Impact:** Performing both tasks literally produces two blocks in one file,
  violating task 2.1's one-block evidence and the intended thin routing
  guidance. Skipping the second write makes task 2.2's stated action and its
  separate revert evidence false. A byte comparison is vacuous for a symlink
  and does not resolve the conflict.
- **Recommendation:** Make the symlink an explicit no-op condition. Task 2.1
  should add the one physical block to `AGENTS.md`; task 2.2 should verify that
  `CLAUDE.md` resolves to it and therefore presents the same routing block,
  without a second insertion. Align C2/C3, the equality evidence, and recovery
  wording to that one physical edit, then rerun a fresh review.

## Live issue confirmation

GitHub issue #33 is open, titled **Establish streamlined review readiness**,
and labeled `sdd`. Its live body confirms the 2026-09-10 rescope, the
documentation-only `skip_specs: true` scope, the same eight delivered guidance
paths listed in `tracking.yaml`, and the stated retirement record. This clears
the prior live-issue evidence gap; it does not change either blocker.

## Coverage

| Area | Result |
| --- | --- |
| Planning/artifact validity | Reviewed; tracking and artifact-quality validators pass. |
| Task dependency and gate executability | Reviewed; RRR-001 found. |
| Filesystem and generated-asset ownership | Reviewed; RRR-002 found. |
| Source/brief consistency | Reviewed for the two findings; the accepted brief supports a clean worktree and a preserved glossary source, but not the contradictory alternate gate. |
| Security, dependencies, and runtime behavior | Not applicable: this is planning for documentation-only work with no new execution path. |
| Live GitHub state | Reviewed; issue #33 is open, has the expected title and `sdd` label, and its scope matches the change artifacts. |

## Conclusion

Do not approve Apply until RRR-001 and RRR-002 are resolved and this bounded
change is reviewed again against the corrected artifacts.
