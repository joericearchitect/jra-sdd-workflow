# Completing planning for candidate 7 — candidate 7, reviewer role

- **Author role:** reviewer (local `base-code-review`, read-only, advisory). This
  document proposes changes to candidate 7's planning artifacts. It does not
  make them, does not authorize Apply, and does not approve the change.
- **Change:** candidate 7 / `resolve-pr-validation-signal`.
- **Measured against:** the review-readiness contract in
  `../streamlined-independent-reviews-findings.md`, principally its
  consumer-to-coverage map, source-contradiction and fact-authority rules, and
  the proposed `openspec/config.yaml` proposal, design, and task rules.
- **Prior findings:** `ai-planning/scratch/2026-09-07-candidate-7-code-review.md`
  rounds 1–3; OBS-011 in `ai-planning/plans/dogfood-observations.md`.
- **Date:** 2026-09-08.

## Where candidate 7 stands

The change is planning-only: five artifacts, every task unchecked, no validator,
test, or workflow source modified. All six repository checks pass. Three review
rounds closed every change-owned finding raised against it; the artifacts are
internally coherent and the removal it describes is correct.

What it does not yet have is the evidence the manifest's contract asks for
*before* Apply. Nine actions below close that. Six are inside candidate 7's own
boundary; two belong to the campaign record's owner and should be escalated, not
fixed here; one is a correction to a finding of mine that new evidence overturns.

None of this is a defect in the planned implementation. It is the difference
between "the plan is right" and "the plan is demonstrably complete."

## A. Actions inside candidate 7's boundary

### A1 — Add the consumer-to-coverage map to `design.md`

The single largest gap. The manifest requires a bidirectional map from every
affected consumer to behavior, source edit or justified no-edit, requirement,
verification owner, task, producible evidence, recovery, and external
prerequisite. `design.md` currently names affected files in a Context paragraph,
which is not the same thing and does not support checking in both directions.

Every consumer below was verified in this workspace at the current base. Offered
as a starting draft for the change's author, not as text to paste unchanged.

| Consumer | Edit or no-edit | Verification owner | Task | Producible evidence |
|---|---|---|---|---|
| `validatePrContract()` result shape | Remove `requiresOpenSpecValidation` | `scripts/validation/test/pr-contract.test.mjs` | 2.1 | Focused test asserts remaining shape |
| `validatePrContract()` `changedPaths` param | Remove | same file | 2.1 | Same |
| `validate-pr-contract.mjs` `--changed-paths-file` | Remove branch | Existing generic parser `else` | 2.1 | Unknown-flag exit 2, no bespoke branch |
| `validateOpenSpecLinkage()` result shape | Remove forwarding | `scripts/validation/test/openspec-linkage.test.mjs` (**new**) | 2.3 | New focused test |
| `validateOpenSpecLinkage()` `changedPaths` param | Remove | same new file | 2.3 | Same |
| `validate-openspec-linkage.mjs` `--changed-paths-file` | Remove branch | Existing generic parser `else` | 2.3 | Unknown-flag exit 2 |
| `.github/workflows/openspec-linkage.yml` `pulls.listFiles` + `changed-paths.txt` | Remove | Workflow diff inspection | 2.2 | Named review record — see A5 |
| `.github/workflows/openspec-linkage.yml` run-step flag | Remove argument | Workflow diff inspection | 2.2 | Same |
| `permissions: pull-requests: read` | Remove | Workflow diff inspection | 2.2 | Same |
| `permissions: contents: read` | **No-edit** — required by `actions/checkout` | Workflow diff inspection | 2.2 | Explicit statement that it is retained and why |
| `actions/github-script` PR-body write | **No-edit** — retained so untrusted PR text never enters a shell | Workflow diff inspection | 2.2 | Decision 3 plus diff showing the step intact |
| `.github/workflows/validate.yml` | **No-edit** — unconditional strict validation is the enforcement mechanism | Inspection | 3.1 | Decision 5 plus inspection record |
| `README.md`, `docs/sdd-workflow.md`, `docs/design/glossary/*` | **No-edit** — verified: no repository document references the retired field, either CLI flag, or the JSON result shape | Repository search | 4.1 | Search result recorded as evidence |
| Living specifications | **No-edit** — `skip_specs: true`; internal implementation detail, no durable observable capability | — | — | Proposal Capabilities section |
| Candidate 8 (`add-tracking-schema-examples`) | **Downstream consumer** — see A2 | — | 2.3 | Cross-change note in design |

The reverse direction also needs stating: every path in `tracking.yaml` should
appear in this map, and every file the map names should appear in `tracking.yaml`.
At the current base those two sets match.

### A2 — Record the downstream cross-change dependency

`openspec/changes/add-tracking-schema-examples/design.md` decision 5 states that
**candidate 7 owns creation of `scripts/validation/test/openspec-linkage.test.mjs`**,
and that candidate 8 will extend that same file afterwards rather than create a
competing harness. Candidate 8's `tracking.yaml` claims the same path, and also
claims `scripts/validation/validate-openspec-linkage.mjs`.

Candidate 7's artifacts say nothing about this. It is the change that creates the
file, it does not know it has a consumer, and two active changes currently claim
two of the same paths with the ordering asserted only from the downstream side.

Add to `design.md` a short cross-change note: candidate 7 owns the file's
creation; candidate 8 depends on its existence and shape; candidate 7 must
therefore not defer the linkage test to a follow-up, and the file's structure
should leave room for an added duplicate-key case. This is an *external
prerequisite* entry in the manifest's map, and it is the kind of fact the map is
designed to surface.

### A3 — Fix task 1.1's dependency line

Task 1.1 reads `Depends on: Approval of Apply and current resource-registration
evidence.` The manifest's proposed task rule says to make every prerequisite
reachable through explicit task dependencies and to **not mix an external
delivery gate into an internal task ID chain**. This line does exactly that: an
authorization gate is written where a task ID belongs, so the internal chain has
no defined root and the gate is not separately checkable.

Split it. `Depends on: None.` for the internal chain, and state the Apply
authorization and resource-registration evidence as preconditions of the section
rather than as a dependency of the task.

### A4 — State the task ordering rationale in `design.md`

The ordering is correct as of round 3 — 2.1 PR-contract flag, then 2.2 workflow,
then 2.3 linkage flag — and it is safe for a specific reason: the workflow
invokes `validate-openspec-linkage.mjs` only, so 2.1 cannot affect CI at all, and
2.2 removes the caller argument before 2.3 removes the flag that accepts it. No
intermediate commit leaves the change's own linkage check failing.

That reasoning exists nowhere in the artifacts. The manifest's proposed design
rule requires defining task ordering that preserves compatible intermediate
states, or identifying edits that must land atomically. One sentence in
`design.md` closes it, and it protects the ordering from being "tidied" later by
someone who cannot see why it is what it is.

### A5 — Name the owner and location of each inspection result

Tasks 2.2, 3.1, 3.2, 4.1, and 4.3 all produce manual review or inspection
evidence, and none of them says where that evidence is recorded. The manifest's
proposed task rule requires naming the owner and location of every test or
inspection result and requiring evidence the named check can actually observe
what it claims.

Two of these also need the check to be observable at all: task 2.3's evidence
says "the linkage focused tests pass" for a file the same task creates, and task
2.2's workflow review has no artifact. Name the locations — the test path for
2.3, and a stated record for the inspection tasks, whether that is the PR
description, the change's own notes, or a scratch review file.

### A6 — Close the two open review findings

**TR-03 (open).** `design.md` decision 3 records "retaining both
`actions/github-script` and the API call" as the rejected alternative. Nobody
proposed that. The alternative actually considered and rejected was replacing the
step with a shell write of the PR body, and the reason was that the workflow runs
on `pull_request`, so a fork-originated body is attacker-controlled text and a
shell step creates a script-injection surface the Node write does not have. Name
that alternative and that reason. Without it a future change can undo the
decision without ever seeing the hazard.

**NR-04 residue (minor).** The proposal's BREAKING bullet and decision 4 now agree
that flag rejection delegates to the existing generic parser branch. One tension
remains unresolved between two artifacts: the proposal labels the CLI change
BREAKING while the Capabilities section declares no living requirement changes.
Both are defensible together — the flag is an undocumented internal interface —
but the manifest's source-contradiction rule asks for the resolution to be stated
once rather than inferred. A clause in decision 4 settles it.

## B. Escalate — outside candidate 7's boundary

Per the ownership discipline both candidate-7 delta notes propose, these are
reported once with an owner and are not fixed inside this change.

### B1 — Campaign record: candidate 4 status and deleted delivery evidence

`ai-planning/plans/dogfood-10-changes.md` deleted candidate 4's merged
pull-request links and archive reference, and downgraded its status on reasoning
that does not hold: the checkout is behind the default branch, and the missing
cleanup receipt is machine-local and therefore absent from every checkout for
every candidate.

**What candidate 7 must do about it: remove its own dependence on the disputed
claim.** `design.md` Recovery and task 1.1 both call the workspace directory "the
**archived** candidate-4 active-copy directory", which asserts a status the
campaign record currently contradicts. Restate it neutrally and cite the
authority instead — a directory exists in this workspace that is also archived on
the default branch; the default branch is the authority for delivered source
state; exclude the workspace copy from the implementation base. Candidate 7 then
needs no position on candidate 4's campaign status at all, which is the correct
outcome for a change that does not own that record.

The status decision itself belongs to the roadmap's owner. See the correction in
section C.

### B2 — Campaign record: candidate 8's dependency is justified but uncited

This revises my round 3 finding TR-02 — see section C.

## C. Correction to my own findings

**TR-02 is substantially wrong and I am withdrawing it.** I reported that
candidate 8's new hard dependency on candidate 7 had no recorded justification
and might over-constrain the campaign. The justification exists and is specific:
`openspec/changes/add-tracking-schema-examples/design.md` decision 5 states that
candidate 7 owns creation of the linkage test file and that candidate 8 will
extend it afterwards "to avoid parallel test-file creation or an untested linkage
recovery path." That is a real shared-artifact dependency and the ordering is
correct.

What survives is much smaller: the roadmap asserts the dependency without citing
where it is justified, so a reader of the roadmap alone cannot check it. The fix
is a citation in the roadmap, not removal of the dependency.

I missed this because I reviewed candidate 7's artifacts and the roadmap without
reading the *other* active change that names candidate 7. That is precisely the
failure the manifest's consumer map is meant to prevent, and it is a second
instance in this run of my own D8 point — asserting a conclusion past the
evidence I actually had. The related overreach on candidate 4's status is
corrected in the review note and in OBS-011.

## D. Already satisfied — do not redo

Recorded so this list is not mistaken for a larger gap than it is.

- Scope is complete and correct: the dead pathway is traced end to end and no
  consumer of the retired field exists in this repository.
- The workflow security decision is right, and right for the right reason.
- Task section numbering, task ordering, and tracking paths are all correct.
- `skip_specs: true` is the correct classification under the repository's
  living-specification guidance, and strict validation passes with it.
- All six repository checks pass, and the test count confirms the change is still
  planning-only rather than partially applied.

## Exit criteria for calling candidate 7's planning complete

1. `design.md` contains the bidirectional consumer-to-coverage map (A1), and the
   set of paths it names equals the set in `tracking.yaml`.
2. The cross-change dependency with candidate 8 is recorded from candidate 7's
   side (A2).
3. Task 1.1's dependency line contains only internal task references (A3).
4. `design.md` states why the task order keeps every intermediate state green
   (A4).
5. Every task's evidence names a location a reviewer can open (A5).
6. Decision 3 names the shell-step alternative and the injection reason; decision
   4 resolves the BREAKING-versus-no-capability tension (A6).
7. Candidate 7's Recovery and task 1.1 no longer assert candidate 4's campaign
   status (B1).
8. All six repository checks still pass, and a fresh bounded review confirms 1–7
   without opening a fourth correction round on the change's own content.

Items 1 through 7 are additive documentation of decisions already made. None of
them changes what candidate 7 will implement, and none should require a design
decision. If any of them turns out to require one, that is the signal to stop and
reconcile rather than to continue correcting.
