## Context

See [proposal.md](proposal.md) for motivation and
[the review-readiness and convergence design brief](../../../ai-planning/design-briefs/streamlined-review-readiness-and-convergence.md)
for the resolved design decisions and their evidence. This change implements
that brief's Decision 1 workflow-policy half only.

This repository owns lifecycle semantics, role guidance, OpenSpec authoring
rules, and correction boundaries. It does not own reusable skills; those live
in a separate reusable-skills repository and are consumed, never vendored back.
That repository's coordinated change and the later consuming-repository
adoption are external prerequisites, recorded below and in
[tasks.md](tasks.md), not internal work.

Planning is bound to base commit
`1963c872178d3e563aa5cb8b3f4607066732a3b0`, which local `main`, local `HEAD`,
and `origin/main` all reported on 2026-09-08. The base is therefore fresh and
no dependent claim rests on an unverified delivery state. The configured
Project was read live on the same date as owner `joericearchitect`, number `1`,
title `SDD Workflow Board`; the primary issue is
[#33](https://github.com/joericearchitect/jra-sdd-workflow/issues/33).

The bound base commit contains the design briefs, the consolidated research,
the campaign ledgers, and the glossary pages as they stood at that commit.
The glossary additions this change plans, and this change's own review
records, are uncommitted working-tree text, not contents of that commit; see
packet finding IF-4. The shared
worktree remains deliberately dirty and is deliberately not rebased, reset,
committed, or cleaned. The unrelated work preserved in place is the modified
`ai-planning/to-dos/future-enhancements.md`, the four untracked active changes
(`add-docs-issue-template`, `add-tracking-schema-examples`,
`align-issue-template-labels`, `resolve-pr-validation-signal`), and the
`resolve-pr-validation-signal` implementation branch and its secondary
worktree. None of them is owned by this change.

The vocabulary for packet, defect taxonomy, finding provenance, correction
fan-out, and the cause-aware third-pass stop already exists in
[`docs/design/glossary/`](../../../docs/design/glossary/README.md). This change
reuses those exact terms. The terms it uses normatively that the glossary did
not yet carry — review pass, component, root fact, independent reviewer, and
same-session local review — are added there by task 2.3 rather than coined as a
parallel vocabulary in this change's own surfaces.

**This change supersedes the design brief where they differ.** The brief is the
origin of the work and remains the record of why it was undertaken, but
successive owner-directed scope additions have moved the decisions the
supersession table below records. It is
therefore superseded design input, not a conflict authority, and
[review-packet.md](review-packet.md) records it as such. A reviewer resolves a
brief-versus-change conflict in favor of this change's artifacts and reports any
divergence not listed below as a finding. The brief itself is not edited, so the
mutation boundary is unchanged and the brief stays a faithful record of its own
moment.

| Brief decision | Brief states | This change states | Why it moved |
| --- | --- | --- | --- |
| Decision 3, packet members | Nine members, with no packet index | Ten members, adding the index at a deterministic entrypoint | The owner asked that a reviewer be directable by change name alone, which requires an index the brief did not anticipate. |
| Decision 4, component | The smallest independently reviewable unit carrying the repaired claim | Unchanged; this change adopts the brief's definition verbatim in requirement 8 | No divergence remains. An earlier surface-keyed definition was withdrawn in pass 1 as finding `rr-component-stop`. |
| Decision 4, review pass | One evaluation of one bound identity producing findings or a clean conclusion; a confirming review is a pass | Adds that a pass declares its defect-taxonomy coverage, that counting is per binding, and that a new owner decision restarts the count | A reading that declares no coverage is indistinguishable from an unswept one, and the witness testimony showed a mid-loop owner decision silently inflating a pass count. |
| Decision 5, defect taxonomy | Seven default classes | Eight, adding authority and citation correctness | The testimony produced a finding no other class reaches. |
| Decision 10, third-pass diagnosis | Predominance by provenance count | Root-fact grouping with every matching response applied in precedence, and counting explicitly forbidden | On the testimony's own numbers, completing the sweep flips a count-based diagnosis to the wrong branch. |

A second design input arrived after the artifacts were first drafted and before
any review pass of this change:
[witness testimony on a four-pass manual review loop](../../../ai-planning/notes/2026-09-08-review-readiness-witness-testimony.md).
A separate planning session that had run such a loop answered a set of questions
about its own convergence failure. That record is owner-directed scope input,
not a review pass and not an independent review, and the note states the limits
on its weight. It is the evidence behind the eighth defect class, the root-fact
diagnosis, the dual second-repair trigger, and the digest requirement below, and
it is also why two candidate additions were declined.

Pass 2 withheld Apply-ready and grouped fourteen findings into eight root
facts. The owner treated that as a short design pause, not a rewrite of the
contract: packet members, isolation, the defect classes, and the claim-keyed
component stay as they are. What failed twice is close-out. A restatement
correction is closed only when a surface list written before the edit is filled
after the edit. A phrase search and a validator pass are not that proof.
Requirement 8 already requires this; the last closure record skipped it. The
pause, the locked owner calls, and the pre-edit surface lists are recorded in
[the pass-2 correction record](../../../ai-planning/review-records/2026-09-08-establish-streamlined-review-readiness-pass-2-correction.md).

## Goals / Non-Goals

**Goals:**

- Add one durable `review-readiness` capability describing observable
  phase-entry evidence, declared review coverage, finding provenance and
  disposition, correction closure, and a cause-aware convergence stop.
- Express one contract through two phase profiles, Propose and Apply, that
  share definitions and finding lifecycle.
- Carry the contract on the artifacts that already exist, so the change adds no
  schema, machine-readable record type, or automation. The two added Markdown
  documents index those artifacts and hold the review method; neither defines a
  format for the content they point at.
- Keep the guidance assistant-neutral and portable, with every path, authority,
  check, taxonomy extension, and trigger owned by the consuming project.

**Non-Goals:**

- Build a controller, autonomous runner, automatic fix-and-review loop, or
  deterministic cross-document checker.
- Change any validator, validator test, artifact rule set, living
  specification, independent-review package, or review-result schema.
- Weaken any existing correction budget, human gate, or the one-correction
  production independent-review boundary.
- Author, vendor, or anticipate the reusable-skills repository's files.

## Decisions

### Review-ready packet members

The packet is the bounded set of artifacts and evidence a review is bound to.
It is assembled from files that already exist. Requirement 1 is the single
authority for the member set; the table below quotes that list in its order and
wording and only adds this repository's owning location for each. An earlier
draft restated the members in its own wording, which made the recorded equality
uncheckable; that was pass-1 finding `rr-ten-members` and pass-2 finding
`rr-member-quote`.

| Packet member (quoted from requirement 1) | Location in this repository |
| --- | --- |
| the packet index at its deterministic entrypoint | `openspec/changes/<change-name>/review-packet.md` |
| the base identity and the evidence that each required fact authority was reachable | `design.md` Context |
| the complete artifact and changed-path manifest | `tracking.yaml` paths plus the named-file listing recorded with task 4.2 |
| the mutation boundary and shared-record identities | `design.md`, subsection below |
| the bidirectional consumer-to-coverage map | `design.md`, subsection below |
| the durable assertion fan-out and decisive equality sets | `design.md`, subsection below |
| the applicable defect taxonomy and material correction trigger | `design.md`, subsection below |
| the internal task graph and separately recorded cross-change prerequisites | `tasks.md` numbered tasks and its `Entry gates` section |
| the verification owners, producible evidence, recovery, and external-state observations | `tasks.md` `Evidence:` fields and `design.md` Verification Strategy and Recovery |
| the prior finding dispositions, or their recorded absence, which are withheld from a fresh isolated reviewer | The configured review record under `ai-planning/review-records/` |

The Apply profile binds the same members plus the implemented paths, current
focused and complete check evidence, and the current task evidence.

The index is the reviewer's single entrypoint. Its location is derivable from
the change name alone, so a reviewer can be directed to a change by name without
being told where its material lives. The index names the members and their
identities; it does not restate their content, and it is not a new format for
that content.

A base commit does not by itself bind a planning packet, because these artifacts
are uncommitted for the whole of Propose and can change while the base does not.
The witness testimony records four consecutive passes over exactly this
situation, none of which reviewed a fixed object. The index therefore carries a
content digest for every uncommitted member together with the command that
reproduces the set, and a pass begins only once the recorded digests match. The
index excludes itself from the set it carries, since it cannot record its own
digest. When it does, the review record for the bound pass carries the index
digest, so the index cannot move between passes with no stale-binding stop.

The standing review method — the defect taxonomy, finding format, materiality
rule, isolation rules, and finding output location — lives in exactly one
repository-owned location, `docs/review/adversarial-review.md`. Every index
links to it. Copying the method into a change folder would restate every defect class
in every change and guarantee drift, which is precisely the
failure the fan-out discipline below exists to prevent.

A consuming repository may choose different locations but must preserve the
concepts. The packet is carried into an optional isolated review by reference
through the existing artifact manifest; no package field is added.

### Mutation boundary and shared-record identities

The planning mutation boundary is this change's `.openspec.yaml`,
`proposal.md`, `design.md`, `specs/review-readiness/spec.md`, `tasks.md`,
`tracking.yaml`, and `review-packet.md`. Task 4.3's review-record write and
packet-index refresh are planning-boundary edits, not implementation-path
edits. The configured review-record location under `ai-planning/review-records/`
is therefore inside the planning boundary for those records and outside the
implementation path set.

The implementation mutation boundary is the delivered guidance and
specification paths:

- `AGENTS.md`
- `CLAUDE.md`
- `docs/design/glossary/02-lifecycle.md`, one added term
- `docs/design/glossary/03-change-and-artifacts.md`, cross-references only
- `docs/design/glossary/05-validation-and-recovery.md`, four added terms
- `docs/review/adversarial-review.md`, created by this change
- `docs/sdd-workflow.md`
- `openspec/config.yaml`
- `openspec/specs/review-readiness/spec.md`, created by Sync after delivery

The glossary pages named in the implementation boundary above are the one
boundary extension this change makes beyond
its original inventory. It is owner-directed, and it is narrow: the change uses
review pass, component, root fact, independent reviewer, and same-session local
review normatively, the glossary is the repository's single vocabulary owner,
and the alternative — defining them inside this change's own surfaces — is the
parallel-vocabulary failure the ground rules forbid. Only additions and
cross-reference extensions are made; no existing definition is rewritten.

The last two terms were folded in after pass 1. That pass declared itself a
same-session local review and refused to be counted as independent, which
exposed a gap: the contract required isolation but never required a pass to say
which kind of reviewer produced it, so the distinction lived only in one change's
packet prose. Requirement 1 now carries the rule and the glossary carries the
vocabulary.

Everything else is a read-only authority, a compatibility reference, or another
owner's record:

| Shared or external record | Owner | Treatment here |
| --- | --- | --- |
| `ai-planning/plans/dogfood-10-changes.md` and the other campaign ledgers | Campaign owner | Read-only. Sequencing is an entry gate, never an internal task. |
| The four unrelated active changes and the `resolve-pr-validation-signal` branch and worktree | Their own changes | Read-only. Preserved untouched. |
| `docs/design/glossary/` | Glossary owner | Read-only for existing entries, which are the authority for every term this change reuses. The pages and additions task 2.3 names receive those additions only. Remaining glossary pages are untouched. |
| `scripts/validation/` and `quality/openspec-artifact-rules.json` | Validation owner | Read-only. No behavior change in this increment. |
| `openspec/specs/tracking-contract/` and `openspec/specs/artifact-quality-validation/` | Their own capabilities | Read-only. Not extended. |
| Generated `.claude/` and `.agents/` OpenSpec integrations | OpenSpec generator | Read-only. Changed only through the generator. |
| The reusable-skills repository | Its own owner | Outside this repository entirely. |
| Issue #33 and its Project item | GitHub | Own work state. One owner-authorized scope realignment to the current path inventory; no other mutation during planning. |

### Consumer-to-coverage map

The map is checked in both directions: every discovered consumer has a planned
behavior or a justified no-edit decision, and every planned edit, task, and
evidence item traces back to a consumer. `None` marks an accepted consequence
rather than an unowned verification promise.

| ID | Consumer | Behavior and edit / no-edit decision | Requirement | Verification owner and task | Producible evidence | Recovery | External prerequisite |
| --- | --- | --- | --- | --- | --- | --- | --- |
| C1 | Assistant entry guidance (`AGENTS.md`) | Add the review-readiness block after `## Ground rules` and the qualification paragraph under `## Before delivery`. | `review-readiness` requirements 1-12 | Diff review and cross-surface equality check, 1.1 and 4.1 | The reviewed diff shows one added block and one added paragraph, with no edit to existing ground rules or commands. | Revert only the added block and paragraph. | None. |
| C2 | Assistant entry guidance (`CLAUDE.md`) | Add the byte-identical block and paragraph. | Same as C1 | Byte-identical comparison with `AGENTS.md`, 1.2 and 4.1 | A diff of the two added blocks is empty. | Revert only the added block and paragraph. | None. |
| C3 | Contributor workflow guide (`docs/sdd-workflow.md`) | Add `## Review Readiness and Correction Discipline` between `## Planning Artifact Quality Contract` and `## Register Local Delivery Resources Before Creation`. | Same as C1 | Structural review and section-order check, 2.1 | The section exists in the stated position and states the packet, map, authorities, taxonomy, trigger, closure, provenance, and stop. | Remove only the added section. | None. |
| C4 | OpenSpec authoring rules (`openspec/config.yaml`) | Append rule strings to the existing `rules.proposal`, `rules.design`, `rules.tasks`, and `operations.apply.guidance` lists. No new key. | Same as C1 | Key-set comparison before and after, 3.1 | The parsed key set is unchanged and only list members were added. | Remove only the appended strings. | None. |
| C5 | `review-readiness` living specification | Created by Sync from this change's delta after delivery. | All | Sync stage and `openspec validate --all --strict`, 4.2 | Strict validation passes and the synced spec matches the delta. | Preserve the delta and repair the Sync result before Archive. | Merged implementation delivery. |
| C6 | Existing living specifications | No edit. `tracking-contract`, `artifact-quality-validation`, `workspace-cleanup`, and `issue-template-label-alignment` keep their current requirements. | None | Diff review, 4.2 | `git status --short` shows no change under `openspec/specs/`. | Not applicable; no candidate mutation. | None. |
| C7 | Validators and their tests | No edit. The artifact validator reads `quality/openspec-artifact-rules.json`, not `openspec/config.yaml`, so appended guidance changes no enforced shape. | None | Complete test suite, 4.2 | `node --test scripts/validation/test/*.test.mjs` passes unchanged. | Not applicable; no candidate mutation. | None. |
| C8 | Environment-safety scan | The added `docs/` text names the reusable-skills repository generically and contains no environment value. | Repository portability policy | Environment-safety validator, 4.2 | The validator passes with the new section present. | Correct only the added text and rerun the validator. | Current `.ai-skills/no-hardcoded-environment.json`. |
| C9 | Generated assistant integrations | No edit. Their content is owned by the generator and its configuration. | None | Diff review, 4.2 | `git status --short` shows no change under `.claude/` or `.agents/`. | Not applicable; no candidate mutation. | None. |
| C10 | Glossary pages | Add `review pass` to `02-lifecycle.md`; add `component`, `root fact`, `independent reviewer`, and `same-session local review` to `05-validation-and-recovery.md`; extend cross-references in `03-change-and-artifacts.md`. The change consumes the existing entries for packet, taxonomy, provenance, correction fan-out, and the cause-aware third-pass stop unchanged. | `review-readiness` requirements 1 and 8 | Term comparison, 2.3 and 4.1 | Every normative term used in the new surfaces has exactly one glossary definition; the reviewed diff adds one entry per term task 2.3 names and extends only the `Related:` lines of entries they relate to plus the taxonomy entry's open example list, rewriting no definition; and the environment-safety validator passes with the added entries, since the glossary sits in the scanned `docs` root. | Remove only the added entries. If the glossary owner rejects a term, rename it across its complete fan-out rather than defining it locally in this change's surfaces. | None. |
| C11 | `tracking.yaml` | Records issue #33, the live Project values, and the implementation path set. The set is named here by reference, never by count. | Tracking v1 contract | Tracking validator, 4.2 | Selected tracking validation passes and the path set equals the planned mutation set. | Correct only the record from discovered facts. | Live repository, issue, and Project facts. |
| C12 | Campaign ledgers | No candidate edit. Their owner records this change's sequencing and status. | None | Campaign record owner; no candidate task. | Owner-controlled ledger state. | Pause task 0.1 until the sequencing decision permits entry. | Campaign owner's sequencing decision. |
| C13 | Reusable-skills repository | No edit from here. It consumes this delivered policy as its upstream contract. | None | Its own repository's review; no candidate task. | Its immutable reference to this delivered policy identity. | Report a mismatch to that repository's owner; do not repair it locally. | That repository's own issue and authorization. |
| C14 | Consuming repositories | No edit. Adoption configures project-owned authorities, checks, taxonomy extensions, and triggers. | None | Their own adoption work; no candidate task. | Their own recorded configuration. | Not applicable; outside this mutation boundary. | Delivered reusable-skills change. |
| C15 | Issue #33 and its Project item | Realign the issue's in-scope path list and acceptance criteria to the `tracking.yaml` path set, under the owner authorization recorded in the pass-2 correction record. No other mutation during planning; they own work state. | None | Read-only confirmation after the realignment, and PR linkage, 4.1 and 5.1 | The issue's in-scope path list equals the `tracking.yaml` path set, and the merged pull request links the issue and carries the change marker. | Reauthenticate or defer the dependent action if the authority is unavailable. | GitHub and Project access. |
| C16 | Deterministic checker work | No edit. Recorded as a later Explore rather than built. | None | None; this is an accepted deferral, not a verification claim. | Non-Goals and this row state the deferral consistently. | Revisit only through a separately scoped Explore. | Measured manual use first. |
| C17 | Reviewer session | Add `docs/review/adversarial-review.md` as the single standing method a reviewer is pointed at, holding the taxonomy, finding format, materiality rule, isolation rules, and finding output location, plus the packet-index skeleton. | `review-readiness` requirements 2, 5, 6, 7, and 12 | Structural review and single-copy check, 2.2 and 4.1 | The file exists, states every defect class and provenance value the delta specification lists exactly once, contains no environment-specific value, and the environment-safety validator passes. | Remove only the added file; reviews fall back to an explicitly supplied prompt. | None. |
| C18 | Per-change packet index | Add `review-packet.md` at a location derivable from the change name. This change authors its own index now as the first exercise of the convention. | `review-readiness` requirement 2 | Index review and reviewer dry run, 4.1 and 4.3 | The index names the bound identity, reviewed paths, authorities, boundary, evidence, and prior-findings state, and links the method without restating it. | If the index is absent or stale, report a readiness failure rather than reviewing; the exit is to author or rebind it. | None. |
| C19 | Reader of `docs/sdd-workflow.md` `## Human Review Gates` and `## Definition of Done for Selected Actions` | Edit both tables to point at the new section, so the Planning-to-Apply and Verify-ready rows state that a gate is met only with declared defect-class coverage against a bound packet. Without this, a reader of the operational checklist can treat planning review as complete without any of it. | `review-readiness` requirements 5 and 11 | Structural review and gate-text comparison, 2.1 and 4.1 | Both tables reference the new section, and no gate row implies completeness that the section withholds. | Revert only the added references; the tables return to their current wording and the section stands alone. | None. |
| C20 | Review-record location `ai-planning/review-records/` | No structural edit. It is the existing configured location for finding dispositions and is packet member 10; this change adds records there rather than changing the location or its format. | `review-readiness` requirement 6 | Record inspection, 4.3 | A pass-1 record exists there with declared coverage, findings, and dispositions, in the same shape as the existing records. | If the location is unavailable, record the findings in the packet index and repair the location before the next pass. | None. |
| C21 | Future changes and their authors | No edit to existing changes. New changes author an index from the skeleton. A change that predates this contract stays exempt from authoring an index until its owner starts a review after this contract is delivered; that first review requires an index, authored by that change's owner. This change does not retrofit the unrelated active changes. | `review-readiness` requirement 2 | Named-file listing under 4.2 | The listing shows no index added under another change's directory. | An existing change's owner authors its index when that owner starts a post-delivery review; this change does not do that work. | Each change's own owner. |

### Repeated assertions and decisive equalities

Every claim below is restated on more than one surface. A correction to any one
of them must update the complete fan-out.

| Repeated claim | Complete assertion fan-out |
| --- | --- |
| The default defect-taxonomy classes | `AGENTS.md` block; `CLAUDE.md` block; `docs/sdd-workflow.md` section; `docs/review/adversarial-review.md`; delta spec requirement 5; this design subsection below; `tasks.md` 1.1, 2.2, and 4.3. |
| The finding provenance values | `AGENTS.md` block; `CLAUDE.md` block; `docs/sdd-workflow.md` section; `docs/review/adversarial-review.md`; delta spec requirements 6 and 9; `tasks.md` 1.1 and 2.2. |
| The review-ready packet member set, owned by delta spec requirement 1 | `design.md` packet subsection; `docs/sdd-workflow.md` section; `docs/review/adversarial-review.md` skeleton; delta spec requirements 1 and 2; this change's `review-packet.md`; `tasks.md` evidence for 4.3. |
| The packet index filename, derivation rule, and digest obligation | `design.md` packet subsection and C18; `docs/sdd-workflow.md` section; `docs/review/adversarial-review.md`; delta spec requirement 2; this change's `review-packet.md`. |
| The implementation mutation path set | `design.md` boundary subsection and C1-C5, C10, C17; `tracking.yaml` paths; issue #33 in-scope path list; `tasks.md` 1.1, 1.2, 2.1, 2.2, 2.3, 3.1, 4.1, and 5.1; proposal Impact. |
| The second-repair stop fires on either a repeated repair or a repeated defect class against one component | `AGENTS.md` block; `CLAUDE.md` block; `docs/sdd-workflow.md` section; `docs/review/adversarial-review.md`; delta spec requirements 8, 9, and 11; this design subsection below; `docs/design/glossary/05-validation-and-recovery.md` component entry; Recovery below. |
| The third-pass stop diagnoses root facts in precedence order and never by finding count | `AGENTS.md` block; `CLAUDE.md` block; `docs/sdd-workflow.md` section; `docs/review/adversarial-review.md`; delta spec requirement 9; this design subsection below; `docs/design/glossary/02-lifecycle.md` cause-aware third-pass stop entry; proposal What Changes. |
| The terms this change adds to the glossary | `docs/design/glossary/02-lifecycle.md`; `docs/design/glossary/03-change-and-artifacts.md`; `docs/design/glossary/05-validation-and-recovery.md`; delta spec requirements 1 and 8; `design.md` Context, boundary, and C10; `tasks.md` 2.3 and 4.1; proposal What Changes and Impact. |
| A review pass records its reviewer kind, and a same-session local review never satisfies an independent-review requirement | Delta spec requirements 1 and 12; `docs/review/adversarial-review.md`, which owns the isolation rules; `docs/design/glossary/05-validation-and-recovery.md` independent-reviewer and same-session entries; `tasks.md` 2.2 and 4.3. This is an isolation rule, so requirement 2 gives it exactly one guidance expression: the standing method. `AGENTS.md` and `docs/sdd-workflow.md` link the method and MUST NOT restate it. |
| No validator or validator-test change in this increment | Proposal Non-Goals and Impact; design C7 and Verification Strategy; `tasks.md` 4.2 evidence; issue #33 scope. |
| The one-correction production independent-review boundary is preserved | Proposal Non-Goals; delta spec requirement 11; `docs/sdd-workflow.md` section; existing `## Human Review Gates` text, which is not edited. |
| Cross-repository work is an external prerequisite, not a task | Proposal Reuse Plan; design C13, C14, and the prerequisites subsection; `tasks.md` `Entry gates`. |
| The design brief is superseded input, not a conflict authority | `design.md` Context supersession table; `review-packet.md` authorities section; proposal Why. |

Two notes belong with that register and are kept below it so the table reads as
one complete set. First, issue #33 is deliberately absent from the
taxonomy-class and provenance-value rows: it requires both sets to be equal
across the delivered surfaces and names some values in its problem narrative,
but it enumerates neither, so it consumes the equality rather than restating
either fact. Two rows previously credited the issue with restatements it does
not make; both were corrected together as one root fact, which is why that
correction counts once against the component rather than twice. Second, the
mutation-path-set row is recorded as a set and never as a count, because the
count is what went stale twice — first in `tasks.md` 5.1 as packet finding IF-2,
then again in C11 as pass-1 finding `rr-c11-path-count`.

Planning and later correction checks use these set equalities and graph
assertions:

- planned implementation mutation paths = `tracking.yaml` paths = issue #33
  in-scope path list =
  `{AGENTS.md, CLAUDE.md, docs/design/glossary/02-lifecycle.md,
  docs/design/glossary/03-change-and-artifacts.md,
  docs/design/glossary/05-validation-and-recovery.md,
  docs/review/adversarial-review.md, docs/sdd-workflow.md,
  openspec/config.yaml, openspec/specs/review-readiness/spec.md}`;
- the packet member table quotes delta spec requirement 1's member list in its
  order and wording, adding only a location column;
- the taxonomy class set is identical across `AGENTS.md`, `CLAUDE.md`,
  `docs/sdd-workflow.md`, `docs/review/adversarial-review.md`, and the delta
  spec;
- the provenance value set is identical across those same surfaces;
- every term used normatively in the new surfaces has exactly one definition in
  `docs/design/glossary/`, and each term task 2.3 adds appears there once;
- the standing review method appears in exactly one repository-owned location;
  no change directory restates the taxonomy, finding format, materiality rule,
  or isolation rules;
- this change's `review-packet.md` names exactly the reviewed contract paths
  present in its own directory and links the standing method without restating
  it;
- the review-readiness block in `AGENTS.md` is byte-identical to the block in
  `CLAUDE.md`;
- the `openspec/config.yaml` top-level and nested key set is unchanged; only
  members of existing lists are added;
- every numbered task is reachable from 0.1 through explicit internal
  `Depends on:` edges, and no internal edge names an external prerequisite; and
- the set of paths in the named-file listing recorded with task 4.2 is a
  subset of the planning mutation boundary until Apply is authorized.

### Defect taxonomy and material correction trigger

Every review pass of this change declares each class below as `swept-clean`,
`findings`, or `not-applicable` with a reason, and names any unswept area.
Reading every file without declaring class coverage is an incomplete pass.

1. consumer and reverse-direction artifact coverage;
2. evidence ownership and producibility;
3. task sequencing and safe intermediate states;
4. lifecycle completeness, recovery, and abort behavior;
5. external-state validity;
6. repeated-claim and restatement consistency;
7. first-run, empty, absent, partial, repeated, and already-complete boundaries;
   and
8. authority and citation correctness — every requirement, constraint,
   permission, or decision an artifact attributes to a named source is actually
   expressed by that source.

Class 8 exists because the witness testimony produced a finding none of the
other seven reaches: a requirement credited to a governing document that does
not contain it. Class 6 compares the change's own restatements to each other and
so cannot see it, and class 5 covers thresholds, quotas, capacities, version
constraints, names, and permissions, which a false attribution is not. Widening
class 5 was rejected because it would leave the natural reading intact while the
failure stayed invisible. A miscitation is change-local even when the cited
source is not: the false claim sits in this change's artifacts, so the repair is
here and the cited document is not touched.

The material correction trigger is declared here, before the first review pass,
and is fixed for the bound review. It cannot be raised during a loop to force
convergence. A finding starts another correction cycle when it affects
observable correctness, security, privacy, data loss, compatibility,
authorization, recovery, or the contract expressed by these artifacts. A
low-labelled finding with one of those impacts is still material. A pure style
or wording observation with no such impact receives a recorded deferred or
accepted disposition and does not alone start a cycle; elevating it requires a
stated impact. The trigger changes whether a finding starts a cycle, never
whether it is recorded.

Any correction classifies itself as local, contract-changing, or
scope-widening, independently flags whether it introduces a new mechanism,
enumerates the fan-out above for a contract or scope correction, searches every
surviving expression of the old fact, reads every added line as new content,
rechecks the equalities, task reachability, evidence owners, recovery, and
external prerequisites, and records the root fact changed, the finding identity,
correction class, surfaces inspected, no-edit decisions, and new consequences.
The filled surface list is the closure evidence. A phrase search for remembered
wording, and a validator pass, are not that proof.

A correction is counted against the root fact it changes, not against each
surface restating it. The witness testimony is decisive here: nine
repair-induced findings traced to two facts, seven of them to a single decision
whose six restatements across four files were swept incompletely in what the
implementer understood at the time as one repair. Counted by finding, that reads
as widespread damage; counted by root fact, it reads as one incomplete fan-out,
which is what it was and what the correction discipline has to address.

A component is the brief's Decision 4 unit, adopted unchanged: the smallest
independently reviewable unit carrying the repaired claim. It is identified by
the claim, not by the surface, so one table holding several independent claims
holds several components. The second-repair stop fires on either a second repair
to a component or a second failure of one defect class against it.

Keying to the claim is what makes both triggers usable together. The testimony
records three amendments to one inventory table as three distinct defect
classes against mostly different rows, and argues that no surface-based unit
works: a table-level stop fires after round two and blocks work that was
progressing, while a line-level stop never fires at all. "Mostly" is
load-bearing. The testimony does not establish that the three amendments were
three unrelated claims, so this design does not claim that the repair trigger
stays silent on that table. The class trigger still catches the signal the
testimony called real — the same claim failing coverage twice. An earlier draft
of this change defined the component by surface and kept both triggers, which
retained exactly the over-fire the testimony rejected; pass 1 recorded that as
`rr-component-stop` and it is withdrawn. The class trigger adds a way for the
existing stop to fire and removes none, so no existing budget is relaxed.

The third review pass on this change is an escalation threshold, not an ordinary
step toward a fourth. Every unswept applicable class is completed first, because
until then the latent count measures the sweep rather than the change. The
testimony estimated further latent findings waiting behind the classes it had
never touched plus the classes it had only partially or incompletely swept.
The remaining material findings are then grouped by root fact and every
applicable response is applied in precedence: a repair-induced root fact
returns the change to design reconciliation before further edits; an
external-state root fact stabilizes or reassigns the external input; a
reviewer-error root fact corrects the disposition from authority evidence; a
carried root fact obtains the missing owner decision or enforces the
component-level stop; and the remaining latent root facts are consolidated into
one human-authorized batched response without rewriting sound artifacts.
Counting findings, or comparing one provenance group against another, is
explicitly not the instrument. On the testimony's own numbers, completing the
sweep would have converted a near-even split into a latent majority and
selected the batched-response branch, sending the loop away from the
incompletely swept fan-outs. The testimony traces the repair-induced findings
to two underlying facts, not one.

### Fact authorities and unavailable-authority response

| Fact | Authority and unavailable-authority response |
| --- | --- |
| Observable requirement | The living specification and its accepted delta. If absent, do not infer a requirement; return the gap to Explore. |
| Technical decision | This change's `design.md`. |
| Implementation checklist and task evidence | This change's `tasks.md`. |
| Delivered source state | Git and merged pull-request evidence. Pause dependent claims when unreadable; never infer delivery from this working copy. |
| Automated or manual verification | Current check output bound to the reviewed identity. Rerun rather than reuse output from a different identity. |
| Work state | Issue #33 and its Project item. Reauthenticate before any dependent action if unavailable. |
| Historical intent | The dated archived change. |
| Machine-local operation | The validated register or receipt, not an active-directory copy. |
| Campaign sequencing | The campaign ledger's owner. Treat an unresolved decision as an entry gate, not an internal dependency. |
| Reusable-skills contract state | That repository's own delivered identity. Report a mismatch to its owner. |

Recency, a dirty worktree, or a reviewer statement never overrides the declared
owner. When the applicable authority is missing, equally authoritative sources
disagree, or a material decision is required, preserve both claims and pause.

### Cross-change prerequisites

These are external. They have producers outside this change's mutation boundary
and never appear as internal task identifiers.

| Prerequisite | Producer | Owned artifact | Authoritative availability condition | Consumer | Follow-on edit or evidence | Recovery |
| --- | --- | --- | --- | --- | --- | --- |
| Reusable-behavior change | Reusable-skills repository owner | Its shared readiness contract, role skills, sealed prompts, and capability deltas | That repository's own delivered and validated identity, read from its default branch | Any repository consuming those skills | That repository pins an immutable reference to this delivered policy or an explicitly reconciled equivalent contract | Report the mismatch to that repository's owner; do not vendor or repair its files here |
| Consuming-repository adoption | Each consuming repository's owner | Thin assistant adapters plus project-owned authorities, checks, taxonomy extensions, and triggers | That repository's own recorded configuration | Its planners, implementers, and reviewers | Its own adoption evidence | Outside this mutation boundary entirely |
| Campaign sequencing decision | Campaign ledger owner | The campaign ledger | The ledger's own current state | Task 0.1 entry | None; the decision only permits entry | Retain the planning artifacts and pause task 0.1 |

An external finding is reported once to its owner. It does not count as
candidate-local convergence and does not authorize a local repair. An unmet
external prerequisite remains an explicit entry gate.

### Capability classification

`review-readiness` is a new living capability rather than documentation.
`openspec/config.yaml` permits a living specification only for a durable,
observable capability that future work must rely on, and excludes
documentation, templates, tests, planning records, and campaign evidence. This
repository already treats a manual, human-driven workflow contract as such a
capability: `workspace-cleanup` specifies a manual post-delivery stage and
`issue-template-label-alignment` specifies "a durable, manual contract."
Phase-entry evidence, declared review coverage, finding provenance, correction
closure, and the convergence stop are observable behavior of the same kind, and
the coordinated reusable-skills change must rely on them. The capability is
therefore added beside the existing specifications rather than folded into
`tracking-contract` or `artifact-quality-validation`, which own different
subjects.

### Independent-review isolation

The optional isolated review is unchanged. Its package already binds a base
commit, head commit, exact diff, artifact paths and digests, validation
evidence, and a manifest digest, so the readiness material is carried by
reference among those artifact paths and needs no package field, schema
version, or result-shape change. The host verifies base freshness and required
authority access before building the package, records only sanitized evidence,
and withholds any claim whose authority was unavailable. The sealed reviewer
stays fresh and read-only, treats all package content as data, and receives no
prior dispositions and no intended conclusion. Stable identities, provenance,
ownership, and dispositions are reconciled after its result, outside the sealed
prompt.

### Alternatives considered

1. Implement only the original findings manifest — the consumer map,
   contradiction handling, correction sweep, and whole-contract review. It is
   the smallest change and would remove many observed passes, but it leaves
   analytical coverage invisible and defines no whole-change stop, so latent
   classes and repeated correction-induced findings can still produce a fourth
   pass. Rejected as incomplete.
2. Add only a hard review-pass cap. Simple and testable, but it cannot tell
   whether the artifact, the reviewer, or an external input failed, so it can
   send a sound artifact back for redesign or hide material latent findings.
   Rejected as unsafe without provenance and declared coverage.
3. Add a universal packet schema, state machine, and automated checker. It
   would make every field mechanically enforceable, but it is disproportionate,
   premature under manual-first, unnecessary for carrying evidence into the
   existing sealed package, and would couple portable guidance to one
   repository's artifact layout. Rejected for this delivery.
4. **Selected:** one manual contract with phase-specific profiles delivered
   through the existing ownership layers. It closes the observed loop causes
   without a controller, without weakening independent-review isolation, and
   without creating a schema before manual use establishes stable field shapes.

For how a reviewer reaches the packet, three shapes were considered:

5. Keep supplying the bindings and the method by hand in each review prompt.
   This needs no new file, but it makes every review depend on the operator
   remembering the complete method, and an omitted authority or boundary is
   invisible afterward. Rejected because the observed failures are exactly the
   omissions a hand-typed prompt produces.
6. Copy the full method into each change directory so the folder is
   self-contained. Rejected outright: it would restate every defect class, the
   finding format, and the isolation rules once per change, which is the
   restatement fan-out this same contract forbids, and drift would be certain.
7. **Selected:** split the two. A per-change index at a filename derivable from
   the change name carries only the bindings that genuinely vary, and links one
   repository-owned method that carries everything that does not. The reviewer
   is directed by change name alone, the method has exactly one authoritative
   copy, and an absent index is already a readiness failure under requirement 1
   rather than a silent partial review.

Two further additions were considered against the witness testimony and
declined, both on that testimony's own evidence:

8. A review-pass budget with escalation, separate from the cause-aware stop.
   Declined because the witness judged that its own proposal would have had no
   effect on its run and would plausibly have deadlocked, having no branch for a
   near-even cause split. A cap cannot distinguish a sound artifact from an
   unswept one, which is the whole reason the stop is cause-aware.
9. Requiring a `not-applicable` declaration to cite the packet member or
   evidence that establishes inapplicability. Declined because the motivating
   case did not survive examination: the class that went unswept was not excused
   in bad faith, it was never on anyone's list, and the declaration requirement
   in requirement 5 already reaches that. Adding a citation obligation would be
   machinery for a failure nobody has observed.

## Verification Strategy

- Compare the added `AGENTS.md` and `CLAUDE.md` blocks byte for byte, and
  compare the taxonomy class set and provenance value set across those two
  files, `docs/sdd-workflow.md`, and the delta specification. A mismatch in any
  decisive set is a blocking finding, not a wording preference.
- Confirm the `docs/sdd-workflow.md` section sits between
  `## Planning Artifact Quality Contract` and
  `## Register Local Delivery Resources Before Creation`, and that it names the
  reusable-skills repository generically so the environment-safety scan of the
  `docs` root stays clean.
- Confirm the standing review method appears in exactly one repository-owned
  location by searching for the taxonomy class phrases outside
  `docs/review/adversarial-review.md`; the guidance surfaces may name the
  classes, but no change directory may restate the method. Confirm
  `docs/review/adversarial-review.md` uses `<change-name>` placeholders and
  contains no account, repository, absolute path, or instance URL, since the
  `docs` root is scanned.
- Exercise the entrypoint once end to end: direct a reviewer at this change by
  name alone, confirm it reaches `review-packet.md`, reads the linked method,
  and reports declared class coverage without further instruction. Confirm that
  renaming or removing the index produces a readiness failure rather than a
  partial review.
- Parse `openspec/config.yaml` before and after and confirm the key set is
  unchanged, so the appended guidance adds no key and changes no validator
  contract. `quality/openspec-artifact-rules.json` remains the artifact
  validator's only rule source and is not edited.
- Run the complete repository check set: the Node validator tests, the
  environment-safety validator, the selected change's tracking and artifact
  validators, `openspec validate --all --strict`, and `git diff --check`. The
  validator tests must pass unchanged, which is the evidence that no validator
  behavior moved.
- Confirm through an explicit named-file listing of the planning-boundary
  files — the same enumeration style the packet uses for digests — that no
  path outside the mutation boundary was modified and that the unrelated dirty
  and untracked work is intact. `git status --short` is not that observer: on
  an untracked change directory it reports the directory as a single entry and
  cannot see edits inside it.
- Confirm each term task 2.3 adds has exactly one
  definition in `docs/design/glossary/`, that the glossary diff adds entries
  without rewriting existing ones, and that no new surface defines a term the
  glossary already carries. Rerun the environment-safety validator, since the
  glossary sits in the scanned `docs` root.
- Exercise the digest obligation: confirm `review-packet.md` records a digest
  for every uncommitted reviewed member, that the recorded command reproduces
  the set, and that editing any member without refreshing the block produces a
  stale-binding stop rather than a review.
- Perform one whole-contract review that declares a result for each of the
  taxonomy classes the delta specification lists, then re-run the map in both directions, the assertion
  fan-out, the decisive equalities, and task reachability after any correction.
  Sweep class 8 against this change's own artifacts specifically: every claim
  these artifacts make about what the issue, the glossary, the config, the
  brief, or the testimony says must be checked against that source, since two
  such claims were already found false in the fan-out register.
  Security review is explicit: confirm the change introduces no step,
  dependency, privilege, credential, network call, data path, or execution
  context, and that no added text solicits or records sensitive operational
  data.
- This change is documentation and specification text, so its portable
  verification uses plain file inspection and the repository's existing
  commands. It requires no capability unique to one assistant or model.

## Attribution and Licensing

The added text is authored in this repository from its own design brief and
research notes. It adapts no third-party asset and adds no dependency, copied
code, or license obligation. The reusable-skills repository's files are neither
copied nor anticipated here; that repository remains the author and owner of
its own contract text. No automation is introduced, so there is no automation
rollback behavior to record beyond the selective revert described in Recovery.

## Recovery

Every gate this change introduces has a documented exit.

- If a required packet member cannot be produced, the pass stops as a readiness
  result with the missing member named. The exit is to produce that member or
  to record an explicit evidence gap and pause for the owner; it is never to
  proceed with an unbound review.
- If a fact authority is unreachable or the base is stale, stop before
  producing dependent claims, refresh or bind to an exact delivered object, and
  rebuild the affected packet evidence rather than correcting stale-base
  symptoms one at a time.
- If a taxonomy class is genuinely inapplicable to a pass, the exit is to
  declare it `not-applicable` with a reason. An undeclared class blocks only a
  clean conclusion, never the recording of findings.
- If the assertion fan-out is missing or shown incomplete, the exit is to
  rereview the full bounded change rather than to trust a partial list.
- If the packet index is absent at the derived location, the exit is to report a
  readiness failure naming that location and author the index; it is never to
  proceed on the change directory alone. If the index's recorded identity does
  not match the current repository state, the exit is to rebind the index and
  start a fresh pass, because a stale binding invalidates any conclusion drawn
  against it.
- If the standing method file is absent or unreadable, the exit is to supply the
  method explicitly in the review request for that one pass and to restore the
  file; a review may proceed without the file but not without the method.
- If the method and a guidance surface disagree about the taxonomy or finding
  format, the specification is the authority. Correct the divergent surface
  through the fan-out procedure rather than editing whichever copy is nearest.
- If the third-pass stop is reached, the exit is the cause-appropriate response
  named above plus, for any exceptional batched correction, an explicit human
  decision under the current workflow's authorization. Exhaustion is recorded
  as evidence, never disguised as success or failure.
- If this contract is adopted partway through an existing review loop, the exit
  is not to invalidate the passes already run. Bind the current identity, record
  the passes so far as history without retrofitting provenance onto findings
  that never carried it, declare which classes those passes actually swept and
  which are unknown, and treat every unknown class as unswept. A pass declared
  under the old practice is evidence of reading, not of coverage.
- If a change that predates this contract has run no review pass under it, that
  change stays exempt from authoring an index until its owner starts a review
  after this contract is delivered. The first such review requires an index,
  authored by that change's owner. Absence of an index on an older change that
  has not been asked for a review is not a readiness failure of that change.
- If an owner decision arrives mid-loop and changes intended behavior, the exit
  is to record a new binding and restart the pass count against it rather than
  continuing to count against the superseded one. The prior findings and their
  dispositions carry forward as history. This exit requires recorded owner
  evidence precisely because it resets a counter; a correction toward the
  behavior already agreed is never a new binding.
- If the campaign sequencing decision is unresolved, retain the complete
  planning artifacts and pause task 0.1. Do not edit the shared ledger from
  this change's loop.
- If the environment-safety validator flags the added `docs/` text, correct
  only that text to use the generic reference and rerun the validator.
- If a guidance surface is found to conflict with existing workflow text after
  delivery, revert only the added block, paragraph, section, or appended rule
  strings; each addition is independently removable and nothing existing is
  rewritten. A second repair to the same guidance component, or a second failure
  of one defect class against it, returns to design review.
- If Sync cannot reconcile the delta into a living specification, preserve the
  delta, repair the delivery evidence, and revalidate before Archive.

## Reuse Plan

Reuse the existing OpenSpec change artifacts as the packet, the existing review
record location under `ai-planning/review-records/`, the existing
`tracking.yaml` contract and validator, the existing glossary vocabulary, the
existing resource-registration and workspace-cleanup procedures for delivery,
and the existing repository validation commands. Reuse the findings manifest's
proposed guidance text as the baseline for the added blocks rather than
rewriting it. Introduce no new schema, machine-readable record type, dependency,
or automation. The two added Markdown files are an index of existing artifacts
and a single copy of the review method; neither defines a format for the content
they point at, and both are written and read by hand. The reusable-skills change and consuming-repository adoption reuse
this delivered policy as their upstream contract and remain externally owned.
