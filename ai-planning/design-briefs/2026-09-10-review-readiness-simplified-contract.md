# Review Readiness — Simplified Contract — design brief

Date: 2026-09-10

**Status: accepted by the repository owner on 2026-09-10, with one scope
change.** That acceptance is the owner decision that establishes a new review
binding for `establish-streamlined-review-readiness`, replacing the pass-3 stop
with a deliberate change of direction rather than a fourth ordinary pass.
Acceptance covers the back-out and rebuild; it does not authorize Apply, and
the Planning-to-Apply gate still sits between the rebuilt plan and any edit to
a delivered guidance file.

**The scope change:** the capability specification is dropped. This change
delivers documentation only, under `skip_specs: true`. §6 question 1 is
answered in favour of the cheaper option, for the reason given there. Sections
3, 4, 5, 6, and 7 below are updated to match; the reasoning that produced the
recommendation is left intact so the change of direction stays legible.

**Supersedes as proposed direction:**
[`streamlined-review-readiness-and-convergence.md`](streamlined-review-readiness-and-convergence.md),
[`review-loop-termination.md`](review-loop-termination.md), and
[`2026-09-08-review-readiness-design-reconciliation.md`](2026-09-08-review-readiness-design-reconciliation.md).
None of the three is edited; each remains a faithful record of its own moment
and the reconciliation brief remains the detailed evidence register behind the
decisions below.

## 1. Problem and desired outcome

The `review-readiness` change was proposed to reduce friction across several
review cycles. It produced three review passes, roughly thirty open findings,
two design briefs, and no delivered guidance. It reproduced, on itself, the
failure it was written to prevent.

The pass-3 handoff names three proximate causes: an incomplete close-out list,
two listed fixes that created new problems, and a class that could not be swept
until issue #33 was readable. Those are accurate but not root. The root cause is
visible in one comparison:

| | This change | Peer changes in this repository |
|---|---|---|
| Change directory | 2,185 lines | 213–396 lines |
| Delta spec | 12 requirements / 68 scenarios | 1–3 requirements / 4–6 scenarios |

It governs a guidance surface totalling 743 lines: `AGENTS.md` (36),
`CLAUDE.md` (36), `docs/sdd-workflow.md` (576), `openspec/config.yaml` (95). An
831-line normative specification to add review discipline to a 743-line guidance
set breaches this repository's **Proportion** ground rule by roughly an order of
magnitude, and it breaches the `openspec/config.yaml` statement of the same rule.

The mechanism that turned excess size into findings is specific and worth
stating precisely, because the remedy follows from it. The contract required
several facts to be restated verbatim across four to eight surfaces, and
required a hand-maintained fan-out register to police those restatements. That
converts every edit into an N-surface obligation and every missed surface into a
finding. The finding history bears this out: `rr-member-quote`,
`rr-c11-path-count`, `rr-quote-equality-unchecked`, `IF-2`,
`p3-boundary-not-on-fanout`, `p3-config-paraphrase`, and
`p3-brief-divergences-unlisted` are all one defect — copy N drifted from copy 1.
The design created a defect class and then built a register to track it.

**Desired outcome.** One manual review-readiness contract, small enough to
follow without a register, that keeps the operations the evidence supports —
bind inputs, discover consumers, declare coverage, close findings by identity,
diagnose repeated repair — and delivers them at a size proportional to the
workflow they govern.

## 2. Evidence and key findings

### Source set

- [Pass-3 handoff](../handoff-docs/2026-09-08-review-readiness-pass-3-handoff.md)
  and the [pass-3](../review-records/2026-09-08-establish-streamlined-review-readiness-pass-3.md),
  [pass-2](../review-records/2026-09-08-establish-streamlined-review-readiness-pass-2.md),
  [pass-2 correction](../review-records/2026-09-08-establish-streamlined-review-readiness-pass-2-correction.md),
  and [pass-1](../review-records/2026-09-08-establish-streamlined-review-readiness-pass-1.md)
  records.
- [Design reconciliation brief](2026-09-08-review-readiness-design-reconciliation.md)
  and its [self-review](../review-records/2026-09-08-review-readiness-design-reconciliation-self-review.md).
  Its evidence table and historical-finding coverage tables are the register this
  brief relies on rather than restating.
- [Witness testimony](../notes/2026-09-08-review-readiness-witness-testimony.md).
- The current change artifacts, `docs/sdd-workflow.md`, `openspec/config.yaml`,
  `docs/design/glossary/`, and the four unrelated active changes as size
  comparators.

### What the evidence supports

1. **Duplication is the dominant finding generator.** Confirmed by the finding
   history above. The reconciliation brief's D1 reaches the same conclusion from
   the same evidence, independently.
2. **Two causes of later findings, needing different responses.** Incomplete
   coverage and repair-induced inconsistency. Retained from the preceding brief;
   still supported.
3. **The binding chain was circular.** The packet index bound the review record
   which bound the packet; the index could not hash itself (`p3-index-digest-window`
   is unfixable inside that model). Confirmed.
4. **Evidence was claimed at the wrong phase.** Task 2.2 required a link task 2.1
   creates later; task 4.2 claimed Sync evidence; task 5.1 sat inside Apply.
   Concrete, verified, and fixable.
5. **The mutation-boundary claim failed twice for a structural reason.** The
   claim "no path outside the boundary changed" is only hard because the work
   runs in a deliberately dirty shared worktree. It failed as prose
   (`rr-status-vacuous`), was repaired, and failed the same class again
   (`p3-boundary-observer`).

### What the evidence does not support

- That more procedure fixes procedure failure. The reconciliation brief responds
  to a proportionality complaint with 695 lines and its own 209-line self-review,
  retains every existing part, and adds four — a four-set input/mutation/
  observation/output model, a five-command Git observation protocol with content
  fingerprints and symlink/submodule/ignored classification, a snapshot-and-
  start-header binding protocol, and negative-control fixture exercises. Its
  diagnosis is right; its remedy does not reduce parts, it redistributes them.
- That provenance labelling has paid for itself at full width. Five values plus
  aliases plus split-a-two-origin-finding rules generated findings of their own.
  One distinction earned its keep: repair-induced versus everything else, which
  is what caught this failure at pass 3.

## 3. Options considered and tradeoffs

**Option A — Patch the sixteen pass-3 findings in place.** Cheapest per step.
Repeats the mechanism that failed at pass 2 and pass 3, and pays to repair
surfaces the accepted redesign deletes. Rejected.

**Option B — Adopt the reconciliation brief's D1–D9 and migrate the existing
artifacts in place (its §Migration).** Better than A, and its individual
decisions are mostly sound. It leaves the size problem untouched and revises
2,185 lines of artifacts against ~30 open findings, most of which live on
surfaces that should not survive. Rejected as the primary route; retained as the
fallback if the owner declines the back-out.

**Option C — Ship the method document only, `skip_specs: true`.** A ~150-line
`docs/review/adversarial-review.md`, a routing block in the two assistant files,
one linked workflow section. Ships in a day. Loses the durable capability, so
the coordinated skills-repository change has no upstream contract to pin, and a
future change can silently drop the discipline.

**Option D — Accept the sound decisions, cut the contract to proportion, back
out the artifacts, and regenerate against a size budget.** Keeps the operations
the evidence supports, deletes the mechanism that produced the findings, and
preserves the capability. Costs the regeneration and one disposition record.

**Selected: Option D's process with Option C's scope.** Back out and rebuild
under a size budget, as D describes, but deliver documentation only, with no
capability specification.

What resolved it was reading the agent-skills repository properly. Most of the
behaviour the specification was about to describe in prose already exists there
in executable, test-covered form: per-area coverage that must be declared,
findings with stable identities and separate severity and disposition, an
assurance label that cannot call a self-review independent, per-problem
correction budgets counted from durable records, exact-version evidence
binding, and a sealed read-only independent-review protocol. Four things are
genuinely missing — a planning-artifact review counterpart to code review, a
whole-change third-review stop, a repair-induced flag on findings, and
root-cause-grouped corrections — and all four belong on that side of the line,
where they can be enforced and tested rather than merely asserted.

Option C's stated cost was that the skills work would have no upstream contract
to pin. That cost is not currently live: those skills are being split into a
new repository that is still empty, and the owner is deliberately running this
repository's next changes first. So there is nothing to pin yet, and the
evidence for what the skill should enforce does not exist yet either. Shipping
the guide now and building the skill afterwards is the sequence this
repository's own manual-first rule prescribes — and this change has already
produced better evidence for that future skill, by failing three times, than
smooth runs would have.

## 4. Decisions, assumptions, and owner

Decision owner: the repository owner. Every decision below is a recommendation
until acceptance is recorded. None is represented as already approved.

### Decision 1 — One owner per fact; every other surface links

Adopt the reconciliation brief's D1 in full. Each fact has exactly one owning
surface; others link to it by stable title and do not quote it.

| Owning surface | Owns |
|---|---|
| `docs/review/adversarial-review.md` | Defect classes, finding format, materiality rule, closure procedure, both stops, reviewer kinds and isolation, review-record start-header template |
| The agent-skills repository, later | Enforceable review behaviour — see §3. Not this change. |
| `docs/sdd-workflow.md` | Where the method enters the existing gates and lifecycle |
| `AGENTS.md` / `CLAUDE.md` | One identical short routing block |
| `openspec/config.yaml` | Short authoring and Apply obligations appended to existing lists |
| `design.md` | Change-specific decisions and the consumer map |
| `tasks.md` | Ordered work and each task's evidence |
| `tracking.yaml` | Path inventory and GitHub linkage |
| Review records | Findings, by identity |
| Glossary | Term definitions |

Exact equality survives in exactly one place: the two assistant routing blocks,
checked by one byte comparison. **The durable assertion fan-out register is
retired as a required artifact.** Fan-out remains a correction *technique*
described in the method — before editing a repeated claim, list the surfaces,
then fill the list after — but it is not a maintained artifact that can itself
go stale. Nothing polices the register, which is why the register kept being
wrong.

### Decision 2 — The review record's start header replaces the packet index

`review-packet.md` and the start header are the same object doing the same job.
Collapse them. A reviewer opens a new review record and writes a start header
*before* analysis, recording: base identity, the input list with digests for
uncommitted members, which authorities were reachable, reviewer kind, and the
declared materiality rule. Results are appended afterward, to the same record.

This deletes: requirement 2, consumer-map row C18, the self-exclusion problem,
the stale-index readiness failure, the deterministic-derivation rule, and
`p3-index-digest-window`. The owner requirement that a reviewer be directable by
change name alone is still met: `openspec/changes/<change-name>/` is already
derivable from the name, and the method document tells the reviewer what to do
on arrival.

Inputs are frozen before the pass; outputs are written outside the frozen set;
the record never participates in its own binding. This is the reconciliation
brief's D4 with one fewer artifact.

### Decision 3 — Resolve the boundary observer by clean worktree, not by protocol

Retire the claim in its failed form. Replace it with a structural property:

- **At Apply**, work runs in the registered clean worktree the existing
  resource-registration procedure already requires. In a clean worktree,
  `git status --porcelain=v1 --untracked-files=all` enumerates exactly this
  change's edits, and comparison against the planned path set is one command
  whose output is the evidence.
- **At Propose**, in the dirty primary worktree, the change makes no workspace-
  integrity claim at all. It claims only what is producible: these are the
  planning files I edited, here are their digests.

This is the reconciliation brief's D3 problem solved by removing the obligation
rather than by writing a longer procedure for it. D3's five-command protocol
with content fingerprints and symlink/submodule/ignored classification is
declined: it is a third statement of the claim that failed twice, in a form
harder to execute and still unverifiable by anything but another reading.

No script is added by this change, because under this decision the comparison is
already one command. If the clean-worktree route is exercised on this change and
the next and the comparison is still painful, a small checker is then justified
under manual-first and gets its own change. The reconciliation brief's D9 ban on
tooling is not adopted as a permanent rule.

### Decision 4 — Findings by identity; two provenance values, not five

Keep stable finding IDs, and keep status explicit: `open`, `corrected-unverified`,
`verified-closed`, `rejected-with-evidence`, `superseded`, `accepted-risk`.
Historical records are never edited; a reconciliation record owns current status
and links the history.

Reduce provenance to `repair-induced` and `pre-existing`. The repair-induced
distinction drives Decision 6's precedence and has demonstrably earned its place.
`carried` / `latent` / `external-state` / `reviewer-error` are recorded as prose
in the finding where they matter, not as a mutually exclusive label set that
forces artificial splits. Mutation ownership — can this change repair it? —
stays as a separate yes/no field, because it decides who acts.

### Decision 5 — Coverage is declared; evidence is producible at its phase

Keep the eight defect classes in the method document. Each pass declares each
class: `swept-clean`, `findings`, `not-applicable` with a reason, or `incomplete`
with the missing subject. An incomplete class cannot support a clean conclusion.

Keep the bidirectional consumer map in `design.md`, and keep the rule that the
reviewer discovers consumers independently from imports, callers, configuration,
and changed paths, then compares — the author's list is a hypothesis to test.

Every material evidence claim names what would distinguish correct from
incorrect behavior, who produces it, and at which phase the input exists. At
Propose, implementation results do not exist; check feasibility, not results.
This is the reconciliation brief's D5 and D8, adopted, and it fixes findings 4
above.

### Decision 6 — Keep both stops, with concrete exits

Unchanged from current policy and from the reconciliation brief's D7. A second
repair to the same claim, or a second failure of one defect class against it,
requires design review before that repair. The third evaluation triggers
diagnosis: complete the unswept classes first, then apply every matching
response — repair-induced returns to design reconciliation; external drift
preserves evidence and names the owner; reviewer error is corrected from
authority; the remainder becomes one human-authorized batch. Counting findings
is not the instrument.

A changed digest, a new session, or an accepted fix is not a counter reset. An
owner-accepted redesign is a new binding, carrying prior findings forward as
history. This brief's acceptance is exactly such a decision, and only the
owner's recorded acceptance — not this document — makes it one.

### Decision 7 — Size budget, binding on the regenerated artifacts

| Artifact | Budget | Revised 2026-09-10 |
|---|---|---|
| `docs/review/adversarial-review.md` (the delivered guide) | ≤ 180 lines | unchanged |
| `design.md` | ≤ 200 lines | ≤ 240 |
| `proposal.md` | ≤ 100 lines | ≤ 115 |
| `tasks.md` | ≤ 100 lines | ≤ 155 |
| Change directory total | ≤ 420 lines | derived, not set |

The per-file limits are the only authority. The directory total is their sum
plus `tracking.yaml` and `.openspec.yaml`, and is not stated as an independent
number — the original table stated both, and the two disagreed the moment the
per-file figures moved. A set written in two places that can drift is the defect
this change exists to remove, so the budget stops doing it.

**Budget revision, accepted by the owner on 2026-09-10.** The original figures
were set by analogy to `add-docs-issue-template` (396 lines), the closest peer.
Two costs that peer does not carry turned out to be real: `proposal.md` must
explain why a first attempt was retired, and `tasks.md` must encode the
disposition record's carried obligations as checkable evidence. An adversarial
review then raised three defects whose fixes add to `tasks.md` and `design.md`
rather than removing anything.

The guide is a delivered path, not part of the change directory, so its 180
lines never counted toward the directory total. The revision is a correction to
a figure chosen by analogy, not permission to grow; the six-topic scope, the
removal table, and the re-entry guards are unchanged and remain the real
constraint. At ≤ 500 the change is roughly a quarter the size of the retired
attempt's 2,185 lines.

No `specs/` tree. `.openspec.yaml` declares `skip_specs: true`, which the
Planning Artifact Quality Contract requires as an explicit boolean rather than
an absent directory.

Peer changes in this repository run 213–396 lines. Exceeding a budget is not a
style finding; it returns the scope to this brief. Neither preceding brief set a
budget, and without one the same authoring process produces the same artifacts.

The guide covers six topics, which are what the twelve specification
requirements reduce to once duplication is removed:

| Guide topic | Absorbs from the retired specification |
|---|---|
| Bind your inputs before you start reviewing | R1 and R2, via Decision 2. Carries reviewer kind and the same-session/independent distinction. |
| Declare what you actually checked | R5; the materiality trigger folds in as one paragraph. |
| Find everything affected, in both directions | R3 and the evidence-producibility half of R11. |
| Record findings by identity, with a status | R6, with Decision 4's reduction. |
| Show that a fix actually closed the finding | R8. |
| Stop at the third review and diagnose | R9. |

| Dropped entirely | Why |
|---|---|
| R2 deterministic packet entrypoint | Decision 2 collapses it into the start header. |
| R4 persist the assertion fan-out and decisive equalities | Decision 1 retires the register; fan-out survives as a correction technique. |
| R7 declare the material trigger before pass one | One paragraph in the coverage topic; the trigger itself is project configuration. |
| R10 external prerequisites and shared-record ownership | Real and useful, but it is `design.md` authoring guidance. Moves to a `rules.design` string in `openspec/config.yaml`. |
| R11 phase-specific profiles | Two other topics each carry "at its producing phase." A separate profile requirement restated both. |
| R12 portability and isolation preservation | Portability is already `openspec/config.yaml` policy; isolation is the reviewer-kind rule. |

The guide states these as practice a person follows, not as `SHALL` clauses
with scenarios. That is the point of dropping the specification: prose that
admits it is prose, rather than prose dressed as an enforceable contract that
nothing can enforce.

### Decision 8 — Back out and regenerate rather than migrate in place

Conditions favour it: nothing is committed, the change directory is entirely
untracked, there is no branch, no worktree, and no pull request for this change,
and task 0.1 never ran. Back-out cost is a preservation commit and a directory
removal.

Sequence, with the four conditions that make it safe:

1. **Preserve bytes first.** Passes 1–3 bind these files by digest; deleting them
   orphans the historical evidence. Snapshot the change directory to a dated
   folder under `ai-planning/`, together with a patch capturing the uncommitted
   glossary additions, and commit that before removing anything. Confirm whether
   `validate-no-hardcoded-environment` scans the destination — `tracking.yaml`
   carries the repository slug and is exempt where it currently sits.
2. **Keep the change name and issue #33.** Same work, same intake record. A new
   name means a second issue, a second tracking record, an orphaned finding
   history, and the appearance of a counter reset achieved by relabelling.
3. **Disposition every open finding by ID before regenerating**, in one
   reconciliation record: `resolved-by-design` naming the decision,
   `obsolete-by-removal` where the surface no longer exists, `carried-open` where
   the new artifacts must satisfy it, or `external` for issue #33. The
   reconciliation brief's coverage tables are ~90% of this record already, but
   they explicitly disposition nothing. Without this, pass 1 of the new artifacts
   re-finds all of them.
4. **Regenerate against Decision 7's budget**, not from the old artifacts.

### Decision 9 — Preserve the glossary contributions structurally

`independent reviewer` and `same-session local review` are already drafted in the
working tree and are good. They are stranded there (`p3-glossary-stranded`,
`IF-4`): a clean Apply worktree created from `main` does not contain them.

Capture them as a patch in the step-1 preservation commit and leave the working
tree untouched, so nothing is lost on either route. Apply then delivers the
glossary from a committed source rather than from a working copy that the
delivery worktree cannot see. The terms to deliver are `review pass`,
`component`, `root fact`, `independent reviewer`, and `same-session local
review`. `component` is a genuine gap: `docs/sdd-workflow.md` already uses it
normatively in the second-repair rule and nothing defines it.

### Assumptions

- The owner authorizes the back-out, and records acceptance as a new binding.
- Issue #33 remains the intake record and can be realigned under explicit
  authorization. Its state here is taken from the pass-3 handoff and the
  reconciliation brief's live read, not from an independent check by this brief.
- The four unrelated active changes, their branch and worktree, and the modified
  `ai-planning/to-dos/future-enhancements.md` stay preserved and untouched.
- The coordinated skills-repository change remains an external prerequisite with
  its own issue and gate; it does not block this repository's policy work.

## 5. Scope, non-goals, constraints, and risks

### In scope

| Surface | Change |
|---|---|
| `docs/review/adversarial-review.md` | New, ~150 lines. The standing method. Sole owner of the classes, finding format, materiality rule, closure procedure, stops, isolation rules, and start-header template. |
| `AGENTS.md`, `CLAUDE.md` | One identical routing block, ~10 lines. Points to the method; restates no policy set. |
| `docs/sdd-workflow.md` | One `## Review Readiness and Correction Discipline` section between `## Planning Artifact Quality Contract` and `## Register Local Delivery Resources Before Creation`, plus gate-row links in `## Human Review Gates` and `## Definition of Done for Selected Actions`. |
| `openspec/config.yaml` | Rule strings appended to existing `rules.*` and `operations.apply.guidance` lists. No new key. |
| `docs/design/glossary/` | Five terms per Decision 9; `Related:` extensions only on existing entries. |

No specification, no `specs/` tree, and no Sync stage. `.openspec.yaml` declares
`skip_specs: true`.

### Non-goals

- No controller, autonomous runner, workflow engine, or automatic fix-and-review
  loop.
- No validator, validator test, schema, or artifact-rule change in this change.
  A checker remains a later, separately scoped decision under Decision 3.
- No edit to the skills repository, generated integrations, or another
  repository's adoption assets.
- No retrofit of the four active changes. Older changes adopt the contract when
  their owner starts a review after delivery.
- No weakening of human gates, correction budgets, exact-head binding, reviewer
  freshness, or read-only isolation.
- No claim that zero findings defines correctness.

### Constraints

Manual first. No hardcoded environment values. Every gate ships with its exit.
Second repair means design review. Proportion — which this time is a measured
budget, not an exhortation.

### Risks

| Risk | Mitigation |
|---|---|
| Regeneration reproduces the sprawl | Decision 7's budget is binding, and the removal table names what must not come back. |
| Retiring the fan-out register lets drift return | Decision 1 removes most of the duplication the register existed to police. The one surviving equality is a byte comparison of two blocks. |
| Dropping the packet index leaves reviews under-bound | The start header carries the same bindings and is written by the reviewer, who has the strongest incentive to bind correctly and cannot claim a clean pass without it. |
| Two provenance values lose diagnostic signal | The one distinction that drove a correct diagnosis is kept. The rest is recorded as prose where it matters. |
| The clean-worktree route proves insufficient at Apply | Decision 3's checker becomes justified under manual-first and gets its own change; the obligation is not silently dropped. |
| Owner declines the back-out | Option B is the fallback: the reconciliation brief's D1–D9 migration, at higher cost. |
| The disposition record becomes a rubber stamp | Each ID needs a named decision or a surviving obligation; `obsolete-by-removal` requires the surface to actually be absent from the regenerated artifacts. |

## 6. Questions and answers

1. **Specification or documentation-only?** **Answered: documentation-only,
   `skip_specs: true`.** See §3 for the reasoning. The original recommendation
   was the specification; reading the agent-skills repository properly reversed
   it.
2. **Glossary preservation route.** **Answered: patch captured in the
   preservation commit**, delivered at Apply, with the working tree left
   untouched so the edits exist in both places. Done; see
   [the retired-artifacts record](../review-records/2026-09-10-retired-review-readiness-artifacts/README.md).
3. **Issue #33 realignment.** **Still open.** Needs explicit authorization. Its
   scope must now shrink further than the reconciliation brief's draft assumed:
   it currently promises a durable capability, which this change no longer
   delivers.
4. **Does the coordinated skills-repository change stay in the picture?**
   **Answered: yes, but later and elsewhere.** The skills are moving to a new
   repository that is currently empty, and the owner is deliberately running
   this repository's next changes first to generate evidence for what the skill
   should enforce. It is not a prerequisite for this change, and this change is
   not a prerequisite for it.

One question this brief did not ask, now answered by §3: **where does the
enforceable half live?** In the agent-skills repository, built after this
repository's next runs supply evidence. The four missing behaviours are named
in §3.

## 7. Sequence

1. ~~Record acceptance as the new binding.~~ **Done** — see the status block.
2. **Done** — the change directory and the glossary patch are preserved at
   [`ai-planning/review-records/2026-09-10-retired-review-readiness-artifacts/`](../review-records/2026-09-10-retired-review-readiness-artifacts/README.md),
   verified byte-identical, with `review-packet.md` matching the digest recorded
   at pass 3.
3. Remove `openspec/changes/establish-streamlined-review-readiness/`.
4. Write the finding-disposition record covering every open pass-1, pass-2, and
   pass-3 identity.
5. Realign issue #33 under explicit authorization.
6. Rebuild the planning artifacts against Decision 7's budget, documentation-only.
7. One review pass against the new binding, then the Planning-to-Apply gate.

Stop after step 7. Writing the guide itself and editing `AGENTS.md`,
`CLAUDE.md`, `docs/sdd-workflow.md`, `openspec/config.yaml`, and the glossary is
Apply, and remains a separate explicit human gate.

Deferred beyond this change, in the agent-skills repository once this
repository's next runs supply evidence: a planning-artifact review counterpart
to code review, a whole-change third-review stop, a repair-induced flag on
findings, and root-cause-grouped corrections.
