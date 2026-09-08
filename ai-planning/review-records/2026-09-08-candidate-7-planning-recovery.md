# Candidate 7 planning-recovery review record

Record ID: `C7-PRR-2026-09-08`

Date: 2026-09-08

Assurance: `local-review` — same-session, advisory, read-only for the review
itself. This is neither CI, OpenSpec Verify, nor an independent review. The
planning edits it reviews were made under the user's recovery authorization.

## Bound planning packet

- Base authority for delivered repository source: `origin/main`
  `b49a98b32e9cb2ab13a21e156ba3c8b0870b9978`, refreshed on 2026-09-08.
- Candidate artifact manifest and SHA-256 digests:
  - `.openspec.yaml` — `850f6128b352f1f315a1996018db8e2bac2caaf8200281dac3230a7812a61546`
  - `proposal.md` — `c7257841998b9790401848db5741ca9fa4291a52e661e81b7fc744b14088aa1e`
  - `design.md` — `440f0b45e3ae0ac78bda39e4e2bd0e90f322065026df973778fba738eb5046c9`
  - `tasks.md` — `f2815cf9fd9cf4e0ebac978bc477bfea6235dec9ea3606cfde2bfe88eda2881b`
  - `tracking.yaml` — `d27020782cb2bd05bc0b84b319c2d8ff742bc7664a2338b400aa6115f80a20f5`
- Reviewed source and policy paths:
  - `scripts/validation/validate-pr-contract.mjs`
  - `scripts/validation/validate-openspec-linkage.mjs`
  - `scripts/validation/test/pr-contract.test.mjs`
  - `scripts/validation/test/openspec-linkage.test.mjs` (planned creation)
  - `.github/workflows/openspec-linkage.yml`
  - `.github/workflows/validate.yml`
  - `openspec/changes/add-tracking-schema-examples/design.md` decision 5
- Shared-state boundary: `ai-planning/plans/dogfood-10-changes.md` is outside
  candidate 7's mutation boundary. The configured work tracker owns campaign
  state; Git and merged pull requests own delivery state; a machine-local
  receipt owns cleanup state.

## Reconciliation performed

The third planning pass reached the convergence threshold. The remaining
candidate-owned issue was a latent alternatives rationale in design decision 3;
the other new observations concerned external campaign state or a prior reviewer
conclusion. One consolidated planning correction was made before this confirming
review:

1. recorded the consumer-to-coverage map, reverse path equality, fact
   authorities, scope-restatement fan-out, decisive equality checks, taxonomy,
   correction trigger, and candidate-8 external prerequisite in `design.md`;
2. replaced decision 3's fictitious rejected alternative with the actual shell
   replacement and its untrusted-input tradeoff;
3. clarified that the undocumented CLI removal is intentionally breaking without
   creating a living capability change;
4. made each focused CLI result, workflow inspection, and manual review result
   own a named evidence location in `tasks.md`; and
5. removed candidate-4-specific status wording from the safe-base plan without
   deleting or changing unrelated local work.

Correction class: contract-changing planning correction. New mechanism: no.
The asserted implementation scope did not widen; the candidate-8 relationship
was recorded as an existing external prerequisite.

## Prior findings and dispositions

| Finding | Provenance | Mutation owner | Disposition in this packet |
| --- | --- | --- | --- |
| R-01 | latent | candidate 7 | Closed: the full changed-path pathway, caller, API call, and permission are in scope. |
| R-02 | external-state | campaign/workspace owner | Not a candidate-7 repair: task 1.1 now requires a fresh isolated base and preserves unrelated local work. |
| R-03, R-04, R-05 | latent | candidate 7 | Closed in the earlier consolidated plan: focused tests are added, retained behavior is tested, and all planned mutation paths are tracked. |
| NR-01, NR-02, NR-04, NR-05 | repair-induced | candidate 7 | Closed: Node write retained, headings and parser behavior clarified, and task order is safe. |
| NR-03 | external-state | workspace owner | Not a candidate-7 repair; the implementation base excludes the unrelated active-copy directory. |
| TR-01 | external-state | campaign record owner | Reported once; candidate 7 does not assert candidate-4 campaign status. |
| TR-02 | reviewer-error | reviewer / campaign record owner | Withdrawn: candidate 8 design decision 5 proves its dependency on the linkage-test harness. Candidate 7 now records that prerequisite. |
| TR-03 | latent | candidate 7 | Closed by the design-reconciliation correction to decision 3. |

## Decisive equality and authority results

| Check | Result | Evidence |
| --- | --- | --- |
| Planned mutation paths equal `tracking.yaml` paths | Passed | The two validators, focused PR-contract and linkage tests, and linkage workflow are each mapped and tracked; reviewed no-edit paths are intentionally excluded from tracking. |
| Full changed-path pathway is represented | Passed | Source inspection found the field, parameters, CLI flags, workflow file discovery, output file/caller flag, and permission; each has a planned removal or retained no-edit decision. |
| Strict validation remains unconditional | Passed | `.github/workflows/validate.yml` runs `openspec validate --all --strict` without a changed-path condition. |
| Candidate 8 dependency authority | Passed | Candidate 8 design decision 5 names candidate 7 as the producer of `openspec-linkage.test.mjs` and candidate 8 as its later consumer. |
| Candidate-4 status is not inferred locally | Passed | Candidate 7's plan now records only its safe-base boundary; campaign state is external and read-only. |

## Taxonomy coverage

| Class | Result | Notes |
| --- | --- | --- |
| Consumer and reverse-direction coverage | swept-clean | The map covers every pathway element and verifies planned-mutation path equality. |
| Evidence ownership and producibility | swept-clean | Every test or inspection has a named owner and location. |
| Task sequencing and intermediate safety | swept-clean | The workflow caller is removed before the linkage CLI flag; PR-contract work cannot affect the linkage workflow. |
| Lifecycle, recovery, and abort behavior | swept-clean | Recovery returns a discovered supported consumer or changed behavior to design review; the safe base preserves unrelated work. |
| External-state validity | swept-clean | Candidate 8's prerequisite is recorded; campaign state is explicitly outside this change. |
| Repeated-claim consistency | swept-clean | Proposal, design, and tasks agree on the full pathway, retained Node write, undocumented breaking CLI removal, and no living capability change. |
| Boundary behavior | swept-clean | Retained valid/invalid outcomes, generic unknown-argument behavior, absent live consumer, and `skip_specs: true` are all explicitly covered. |

## Evidence gaps and limits

- The GitHub CLI session could not currently re-read issue #30 or Project state
  because its credential was unavailable. This does not block planning: the
  candidate's tracked issue already exists and no planned task changes issue or
  Project state. Refresh the credential before any delivery action that needs
  live GitHub evidence.
- Repository search cannot prove that an undocumented CLI flag or JSON field has
  no consumer outside this repository. The accepted scope treats it as internal;
  discovery of a supported consumer remains a design-review stop condition.
- No source implementation, branch, pull request, CI run, OpenSpec Verify, or
  independent review exists yet. This record is planning evidence only.

## Confirming-review conclusion

No unresolved material finding remains inside candidate 7's planning mutation
boundary. The recovery is complete and this plan is ready to be presented at the
separate Planning-to-Apply gate. A changed planning artifact, base identity, or
external prerequisite invalidates this conclusion and returns the candidate to
design reconciliation rather than starting a fourth incremental review pass.

## Implementation evidence after Apply

Implementation began only after the separate Apply authorization and registered
secondary-worktree inspection. The implementation binding starts from
`b49a98b32e9cb2ab13a21e156ba3c8b0870b9978`; implementation evidence is bound
to the candidate worktree's changed-path manifest.

- Focused PR-contract and linkage tests pass. They assert retained result
  contracts, representative valid/invalid behavior, and exit 2 with the
  existing generic diagnostic for each removed flag.
- The complete Node validation suite passes with 45 tests after lockfile-pinned
  dependencies were installed in the secondary worktree.
- Production-source inspection finds no remaining
  `requiresOpenSpecValidation`, `changedPaths`, changed-path flag, file-list
  API call, or `pull-requests: read` reference in either validator or linkage
  workflow. The flag appears only in its intentional regression tests.
- Workflow inspection confirms `contents: read`, `actions/checkout`, and the
  Node PR-body write remain; the workflow no longer lists pull-request files or
  passes their names to the linkage validator. Pull-request text is not added to
  a shell step.
- Fresh local whole-contract implementation review found no material finding.
  It is same-session local-review evidence only; exact-head CI and any optional
  independent review remain for the Verification-to-closure gate.

## Prepared implementation pull-request description

The following body is prepared for the implementation pull request. It is not
evidence that a pull request exists or that issue/Project state has changed.

```markdown
Closes #30

OpenSpec change: resolve-pr-validation-signal

## Summary

- Remove the unused PR-validation result signal and its changed-path inputs.
- Remove the linkage workflow's now-unused pull-request file read and
  `pull-requests: read` permission while retaining the Node PR-body write.
- Add focused retained-contract and retired-flag regression coverage.

## Validation

- `node --test scripts/validation/test/*.test.mjs`
- `node scripts/validation/validate-no-hardcoded-environment.mjs`
- `node scripts/validation/validate-tracking.mjs openspec/changes/resolve-pr-validation-signal/tracking.yaml`
- `node scripts/validation/validate-openspec-artifacts.mjs openspec/changes/resolve-pr-validation-signal`
- `openspec validate --all --strict`
- `git diff --check`
```

## Final self-review and validation

The final implementation self-review covered the two validators, both focused
test files, the linkage workflow, the proposal/design/tasks/tracking packet,
and the prepared pull-request description. No unapproved CI, Project, secret,
or destructive mutation was made. The complete evidence set passed after task
completion evidence was recorded:

- focused validator tests: 8 passing tests;
- complete Node validation suite: 45 passing tests;
- no-hardcoded-environment validation;
- selected tracking and artifact validation;
- strict OpenSpec validation for all active items; and
- `git diff --check`.

The local review is current for the candidate worktree content. It does not
replace exact-head CI, a pull-request review, or an optional independent review
selected at the Verification-to-closure gate.
