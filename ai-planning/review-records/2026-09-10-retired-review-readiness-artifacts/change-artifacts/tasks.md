## Entry gates

These are external authorizations, owner decisions, and cross-change
prerequisites. They are not internal task dependencies: their absence pauses
the named task without changing the task graph, and no numbered task below
names one in its `Depends on:` field.

| Entry gate | Producer and owned artifact | Authoritative availability condition | Gated task | Recovery |
| --- | --- | --- | --- | --- |
| Planning-to-Apply approval | The human reviewer's decision on this planning set | Recorded approval for this named change | 0.1 | Retain the planning artifacts and continue planning review. |
| Campaign sequencing decision | Campaign ledger owner; the campaign ledger | The ledger's own current state | 0.1 | Retain the planning artifacts and pause 0.1. Do not edit the shared ledger from this change. |
| Verification-to-closure approval | The human reviewer's decision on the verification evidence | Recorded approval for this named change | 5.1 | Repair the missing verification evidence and return to the gate. |
| Reusable-behavior change | Reusable-skills repository owner; its shared contract, role skills, sealed prompts, and capability deltas | That repository's own delivered and validated identity, read from its default branch | None in this change | Report a mismatch to that repository's owner; never vendor or repair its files here. |
| Consuming-repository adoption | Each consuming repository's owner; its thin adapters and project-owned configuration | That repository's own recorded configuration | None in this change | Outside this change's mutation boundary entirely. |

The last two prerequisites are recorded for completeness of the cross-change
picture. They are consumers of this change's delivered policy, not blockers of
any task below.

## 0. Fresh delivery baseline

- [ ] 0.1 Following the documented resource-registration sequence, plan and
  validate this change's exact implementation branch and secondary-worktree
  records before creation, then create and inspect them from the current
  default-branch commit. Confirm the delivery worktree matches the planning
  base bound in `design.md` and preserve, rather than clean or commit, the
  unrelated dirty and untracked work in the primary worktree.
  Depends on: None.
  Entry gates: Planning-to-Apply approval; campaign sequencing decision.
  Evidence: Validated `planned` then `registered` entries match their inspected
  Git identities and starting commit; the delivery worktree's base equals the
  commit bound in `design.md` Context or a freshly re-bound successor recorded
  there; and the primary worktree still contains the modified
  `ai-planning/to-dos/future-enhancements.md` and the four untracked unrelated
  active changes. A failed registration records its bounded recovery and pauses
  implementation.

## 1. Assistant entry guidance

- [ ] 1.1 Add the review-readiness block to `AGENTS.md` after `## Ground rules`
  and before `## Before delivery`, and add the pre-delivery qualification
  paragraph immediately below the `## Before delivery` heading and before its
  command block. The   block states the planner, implementer, and reviewer
  obligations, the defect-taxonomy classes and finding provenance values the
  delta specification lists, the material correction trigger, correction
  closure counted by root fact, the dual second-repair trigger, and the
  cause-aware third-pass stop diagnosed in precedence order rather than by
  finding count, using the existing glossary vocabulary and naming the
  reusable-skills repository generically. It
  points reviewers at the per-change packet index and the standing method rather
  than restating the method.
  Depends on: 2.2.
  Evidence: The reviewed diff shows exactly one added block in the stated
  position and one added paragraph under `## Before delivery`, with no edit to
  the existing ground rules or delivery commands; the added block names every
  taxonomy class and provenance value the delta specification lists; and the
  existing `Second repair means design review` ground rule reads consistently
  with the dual trigger rather than contradicting it.

- [ ] 1.2 Add the byte-identical review-readiness block and pre-delivery
  qualification paragraph to `CLAUDE.md` in the same positions.
  Depends on: 1.1.
  Evidence: A direct comparison of the block added to `AGENTS.md` and the block
  added to `CLAUDE.md` reports no difference, and the same comparison holds for
  the qualification paragraph; the reviewed diff shows no other change to
  either file.

## 2. Contributor workflow guide

- [ ] 2.1 Add the `## Review Readiness and Correction Discipline` section to
  `docs/sdd-workflow.md`, positioned after `## Planning Artifact Quality
  Contract` and before `## Register Local Delivery Resources Before Creation`.
  The section states the review-ready packet, the bidirectional
  consumer-to-coverage map, the fact-authority table and its
  unavailable-authority response, the declared defect taxonomy, the material
  correction trigger, the implementer handoff and correction closure, the
  reviewer method and finding lifecycle with provenance, and the cause-aware
  third-pass stop. It states where a change's packet index lives, how that
  location is derived from the change name, and that the standing method is
  linked rather than copied. It names the reusable-skills repository generically
  and contains no environment-specific value.

  In the same file, point the `## Human Review Gates` and `## Definition of Done
  for Selected Actions` tables at the new section, so their Planning-to-Apply
  and Verify-ready rows state that a gate is met only with declared defect-class
  coverage against a bound packet. Without this, the operational checklist a
  contributor actually reads would still describe planning review as complete
  without any of the new bar.
  Depends on: 1.2.
  Evidence: The reviewed diff shows one added section in the stated position and
  reference-only edits to the two gate tables, with no gate row rewritten to
  imply completeness the section withholds; the surrounding sections are
  otherwise unchanged; the section's taxonomy class set and
  provenance value set match the delta specification; and
  `node scripts/validation/validate-no-hardcoded-environment.mjs` passes with
  the new section present.

- [ ] 2.2 Create `docs/review/adversarial-review.md` as the single standing
  review method. It states the defect classes the delta specification lists, the finding format
  including pass ordinal and bound identity, the rule that a finding is recorded
  whoever discovered it, the materiality rule, the isolation rules, the finding
  output location, and a packet-index skeleton using `<change-name>`
  placeholders. The isolation rules state the two reviewer kinds, require every
  pass to record which produced it, and state that a same-session local review
  never satisfies an independent-review requirement however fresh the session
  is. This file is their only guidance expression; no other file restates them.
  The skeleton carries the digest block for uncommitted members.
  It also states how a reviewer derives the index location from a change name
  and that an absent index is a readiness failure rather than a licence to
  review the directory alone. No other file restates this method.
  Depends on: 0.1.
  Evidence: The file exists with every defect class and provenance value the
  delta specification lists, each stated once; a repository search finds no change directory restating the
  method and no other file stating the reviewer-kind rule;
  `node scripts/validation/validate-no-hardcoded-environment.mjs`
  passes, confirming no account, repository, absolute path, or instance URL
  entered the scanned `docs` root; and `docs/sdd-workflow.md` links the method
  rather than duplicating it.

- [ ] 2.3 Add the terms this change uses normatively to the glossary:
  `review pass` to `docs/design/glossary/02-lifecycle.md`, and `component`,
  `root fact`, `independent reviewer`, and `same-session local review` to
  `docs/design/glossary/05-validation-and-recovery.md`, extending
  cross-references in `docs/design/glossary/03-change-and-artifacts.md`. Follow
  the existing entry shape of plain-language definition, terminology source, and
  related terms. Rewrite no existing definition. The only permitted edits to
  existing entries are extending the `Related:` lines of entries the new terms
  relate to and extending the taxonomy entry's open example list, which is
  already introduced by "for example" and so is not a definition change. C10 and
  proposal Impact state the same rule.

  `independent reviewer` and `same-session local review` already exist as
  uncommitted working-tree text written ahead of this task, recorded as packet
  finding IF-4. Reconcile that text against requirement 1 and keep it if it
  agrees; do not re-author it in parallel, and do not leave two variants.

  Each entry is a plain-language restatement of a requirement, and the
  specification governs if they diverge: `review pass` restates requirement 1,
  including that counting is per binding and that a retried check, a
  reconciliation, or a reading without declared coverage is not a pass;
  `component` restates requirement 8's claim-keyed unit and its two triggers;
  `root fact` restates requirement 8's rule that a correction is counted against
  the statement it changes rather than each surface restating it; and
  `independent reviewer` and `same-session local review` restate requirement 1's
  reviewer-kind rule, including that a fresh session is not isolation.
  Depends on: 2.1.
  Evidence: Each term this task adds has exactly one glossary definition; the
  reviewed diff shows one added entry per term plus `Related:` and example-list
  extensions, with no definition rewritten; no new surface defines a term the
  glossary already carries; and
  `node scripts/validation/validate-no-hardcoded-environment.mjs` passes with
  the added entries, since the glossary sits in the scanned `docs` root.

## 3. OpenSpec authoring rules

- [ ] 3.1 Append rule strings to the existing `rules.proposal`, `rules.design`,
  `rules.tasks`, and `operations.apply.guidance` lists in
  `openspec/config.yaml`. Add no new key, no new rule set, and no new operation.
  The appended strings require naming every affected consumer including
  justified no-edit effects, resolving or preserving contradictory source
  claims, defining the bidirectional consumer-to-coverage map, enumerating the
  restatement fan-out, defining task ordering with safe intermediate states,
  making every prerequisite reachable through explicit internal task
  dependencies without mixing in an external gate, naming the owner and
  location of every verification result, reconciling the whole implementation
  before review, classifying and closing corrections, and preserving finding
  identities and dispositions.
  Depends on: 2.3.
  Evidence: A parsed comparison of `openspec/config.yaml` before and after
  shows an unchanged key set at every level with only list members added; the
  reviewed diff shows no edit to `context`, to any existing rule string, or to
  the `archive` operation; and `quality/openspec-artifact-rules.json` is
  unchanged.

## 4. Coherence, validation, and review

- [ ] 4.1 Recheck the decisive equalities and cross-surface consistency
  recorded in `design.md`: the taxonomy class set and the provenance value set
  are identical across `AGENTS.md`, `CLAUDE.md`, `docs/sdd-workflow.md`,
  `docs/review/adversarial-review.md`, and the delta specification; the
  `AGENTS.md` and `CLAUDE.md` blocks are byte-identical; the planned mutation
  path set equals the `tracking.yaml` path set and equals issue #33's in-scope
  path list; the `design.md` packet-member table quotes requirement 1's member
  list in its order and wording; the standing review method
  appears in exactly one repository-owned location with no change directory
  restating it; this change's `review-packet.md` names exactly its own reviewed
  contract paths, locates every packet member, carries a current digest for
  every uncommitted member, and
  links the method without restating it; every numbered task is reachable from
  0.1 through internal `Depends on:` edges; and every term used normatively in
  the new surfaces has exactly one glossary definition, including each term
  added by 2.3. Sweep authority and citation correctness across this change's
  own artifacts: every claim about what the issue, the glossary,
  `openspec/config.yaml`, the design brief, or the witness testimony states is
  checked against that source.
  Depends on: 3.1.
  Evidence: Each listed equality is recorded as holding with the comparison
  that established it; any mismatch is recorded as a blocking finding and
  triggers the correction closure procedure in `design.md` rather than a local
  edit.

- [ ] 4.2 Run the complete repository validation set for the selected change
  and confirm no path outside the mutation boundary changed.
  Depends on: 4.1.
  Evidence: `node --test scripts/validation/test/*.test.mjs`,
  `node scripts/validation/validate-no-hardcoded-environment.mjs`,
  `node scripts/validation/validate-tracking.mjs openspec/changes/establish-streamlined-review-readiness/tracking.yaml`,
  `node scripts/validation/validate-openspec-artifacts.mjs openspec/changes/establish-streamlined-review-readiness`,
  `openspec validate --all --strict`, and `git diff --check` all pass; the
  validator tests pass unchanged, which evidences that no validator behavior
  moved; and an explicit named-file listing of the planning-boundary files
  (`.openspec.yaml`, `proposal.md`, `design.md`,
  `specs/review-readiness/spec.md`, `tasks.md`, `tracking.yaml`,
  `review-packet.md`) plus the review-record files this change added shows
  changes only within the planning mutation boundary, with the unrelated dirty
  and untracked work intact. `git status --short` is not that observer: on this
  untracked change directory it reports the directory as a single entry.

- [ ] 4.3 Perform one whole-contract review of the bound change with a declared
  result for each defect-taxonomy class the delta specification lists, entering through this
  change's own packet index so the entrypoint convention is exercised rather
  than only described. Refresh the index's digest block before the pass and
  confirm it matches. Record findings, dispositions, and any provenance in the
  configured review record under `ai-planning/review-records/`, including any
  problem discovered outside the pass itself, and record which kind of reviewer
  produced the pass.
  Depends on: 4.2.
  Evidence: A reviewer directed at the change by name alone reaches
  `review-packet.md`, reads the linked standing method, and reports declared
  class coverage without further instruction; removing or renaming the index
  produces a readiness failure rather than a partial review; and editing a
  reviewed member without refreshing the digest block produces a stale-binding
  stop. The review record names the bound identity and complete path manifest,
  declares each applicable class as swept-clean, findings, or not-applicable
  with a reason, gives every finding a stable identity, pass ordinal, bound
  identity, severity, evidence, disposition, and mutation ownership regardless
  of who discovered it, and confirms the change introduces no new step,
  dependency, privilege, credential, network call, data path, or execution
  context. A material finding follows the correction closure procedure, is
  counted against its root fact, and requires a fresh review of the changed
  identity.

## 5. Delivery

- [ ] 5.1 Deliver the reviewed implementation through the normal pull-request
  process with the issue link and the marker
  `OpenSpec change: establish-streamlined-review-readiness` in the body.
  Depends on: 4.3.
  Entry gates: Verification-to-closure approval.
  Evidence: The merged implementation pull request links
  [issue #33](https://github.com/joericearchitect/jra-sdd-workflow/issues/33),
  records the exact change marker, and the default branch contains every
  implementation path recorded in `tracking.yaml` except the living
  specification, which Sync creates after delivery.

Sync of `openspec/specs/review-readiness/spec.md`, Archive, lifecycle-record
delivery, and Workspace cleanup are repository lifecycle stages that follow
delivery. They are governed by their own documented procedures and entry gates
and are deliberately not numbered tasks of this change.
