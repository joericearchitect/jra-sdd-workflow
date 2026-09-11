## Why

Reviews in this workflow repeatedly find valid problems in later passes that an
earlier pass could have found or prevented. A review may read every artifact yet
sweep only some defect classes. A correction may repair the reported line while
leaving stale restatements behind, or introduce a new mechanism that nobody
scrutinizes. Later findings do not say whether they were carried, created by a
repair, present all along, caused by something the change cannot edit, or a
reviewer mistake. Without that origin, a third pass has no principled response
and becomes an ordinary fourth pass.

The originating evidence is in the
[review-readiness and convergence design brief](../../../ai-planning/design-briefs/streamlined-review-readiness-and-convergence.md),
which supersedes
[the earlier loop-termination brief](../../../ai-planning/design-briefs/review-loop-termination.md),
and in the
[consolidated independent-review findings](../../../ai-planning/research/streamlined-independent-reviews/streamlined-independent-reviews-findings.md).
This proposal links that evidence rather than restating it.

Successive rounds of owner-directed scope additions have since moved several
of the brief's decisions, so this change supersedes the brief where they
differ. The
brief remains the record of why the work was undertaken and is not edited;
`design.md` Context lists every divergence and the reason for it.

The primary intake record is
[GitHub issue #33](https://github.com/joericearchitect/jra-sdd-workflow/issues/33),
whose scope and acceptance criteria were realigned to the current inventory
under explicit owner authorization. This proposal creates planning artifacts
only; it does not authorize implementation.

## What Changes

Scope: this repository's workflow policy. The change adds one durable
`review-readiness` capability and the repository-owned guidance that expresses
it, using the existing planning artifacts as a review-ready packet rather than
introducing a new schema or a new format for their content.

- Define one review-readiness contract with two phase profiles, Propose and
  Apply, that share the packet definition, defect taxonomy, and finding
  lifecycle but use phase-appropriate entry evidence and exit conditions.
- Require a bound review-ready packet whose base identity and fact authorities
  were verified before a review pass begins. A missing packet member produces a
  readiness result, not a review pass.
- Publish that packet as one index per change at a location derivable from the
  change name, so a reviewer can be directed to a change by name alone. The
  index carries only the bindings that vary and links a single repository-owned
  standing method; no change directory restates the method. Because planning
  artifacts stay uncommitted through Propose, the index records a content digest
  for every uncommitted member rather than relying on a base commit alone. An
  input the change contradicts may not stay listed as a conflict authority: it
  is recorded as superseded and every divergence enumerated, because a reviewer
  resolving against it would reach the wrong answer undetectably. A readiness
  stop condition that fires against a conforming packet is a defect in the
  condition rather than a failure of the packet.
- Require a bidirectional consumer-to-coverage map, a durable assertion fan-out,
  and decisive set equalities recorded in a reviewer-visible artifact. The edit
  a task may make must equal the edit the map records for that consumer, and a
  decisive set is restated as its members or by reference and never as a count,
  which stays readable after it stops being true.
- Require every review pass to declare each applicable defect-taxonomy class as
  `swept-clean`, `findings`, or `not-applicable` with a reason, and to name any
  unswept area.
- Give every finding a stable identity, pass ordinal, bound identity,
  disposition, and mutation ownership, record it whoever discovered it, and give
  every post-first-pass finding one provenance value, splitting a finding whose
  problem and framing have different origins rather than forcing one value.
- Require a material correction trigger declared before the first pass and held
  fixed for the bound review, plus explicit closure evidence for every
  correction, counted against the root fact changed rather than against each
  surface that restates it.
- Fire the existing second-repair stop on either a repeated repair to one
  component or a repeated defect class against it, adding a trigger without
  removing one.
- Make the third review pass on one bounded change a cause-aware stop that
  completes the unswept classes first, then groups the remaining material
  findings by root fact and applies every matching response in precedence order.
  Counting findings, or weighing one provenance group against another, is
  explicitly not the instrument.
- Record cross-change prerequisites and shared-record ownership separately from
  internal task identifiers. Where a shared work-state record declares the
  change's scope, that declaration sits on the mutation-path fan-out and must
  equal the planned inventory.
- Add the corresponding guidance to `AGENTS.md`, `CLAUDE.md`,
  `docs/sdd-workflow.md`, and `openspec/config.yaml`, and add the standing
  review method as one new document at `docs/review/adversarial-review.md`.
- Require every review pass to record which kind of reviewer produced it, and
  state that a same-session local review never satisfies a requirement for an
  isolated independent review however fresh the session is.
- Add the terms this contract uses normatively — review pass, component, root
  fact, independent reviewer, and same-session local review — to the
  existing glossary, so each has one definition in the repository's vocabulary
  owner rather than a local definition in this change.

## Capabilities

### New Capabilities

- `review-readiness`: the workflow defines observable phase-entry evidence,
  declared review coverage, finding provenance and disposition, correction
  closure, and a cause-aware convergence stop for one bounded change.

### Modified Capabilities

None. The existing `tracking-contract`, `artifact-quality-validation`,
`workspace-cleanup`, and `issue-template-label-alignment` specifications are
unchanged; `review-readiness` is added beside them rather than folded into any
of them.

## Non-Goals

- No controller, autonomous runner, general workflow engine, or automatic
  fix-and-review loop.
- No change to any validator, validator test, or the artifact rule set. The
  guidance added to `openspec/config.yaml` is assistant-facing context; the
  artifact validator reads `quality/openspec-artifact-rules.json` and is not
  affected. A deterministic cross-document checker remains a later Explore.
- No independent-review package or result schema version change, and no
  weakening of exact-head binding, reviewer freshness, read-only isolation,
  human gates, correction budgets, or the current one-correction production
  independent-review boundary. The defect-class trigger added to the
  second-repair stop supplies an additional condition on which that stop fires
  and narrows none of its existing conditions.
- No edit to the reusable-skills repository, to generated OpenSpec assistant
  integrations, or to any other repository's adoption assets.
- No vocabulary competing with the existing glossary terms for packet, taxonomy,
  provenance, correction fan-out, and the cause-aware third-pass stop, which are
  reused unchanged. The terms this contract needs and the glossary lacks
  are added to the glossary itself rather than defined locally.
- No claim that zero findings defines correctness.

## Impact

- Affected guidance and configuration: `AGENTS.md`, `CLAUDE.md`,
  `docs/sdd-workflow.md`, and `openspec/config.yaml`, plus one new document,
  `docs/review/adversarial-review.md`, holding the standing review method.
- Affected vocabulary: `docs/design/glossary/02-lifecycle.md` and
  `docs/design/glossary/05-validation-and-recovery.md` receive the entries
  task 2.3 names, and `docs/design/glossary/03-change-and-artifacts.md` receives
  cross-references. No existing definition is rewritten; the only edits to
  existing entries are extended `Related:` lines and one extension of the
  taxonomy entry's open example list.
- Affected change-directory convention: each change gains a `review-packet.md`
  index. This change authors its own as the first exercise; existing active
  changes are not retrofitted.
- Affected specification: a new `review-readiness` delta spec now, synced to
  `openspec/specs/review-readiness/spec.md` after delivery.
- Affected users: planners, implementers, and reviewers using any supported
  assistant. They gain required mechanical outputs — a map, equality results,
  declared class coverage, closure records, and provenance — in place of
  general exhortations to be thorough.
- Compatibility: additive. Existing changes, living specifications, validators,
  tests, tracking records, and delivery procedures continue to work unchanged.
  Planning artifacts authored before this change remain valid; the contract
  applies to review passes started after it is delivered. There is no data or
  external API migration. The recovery path for any gate this change introduces
  is documented with the gate in `design.md`.
- Security: the change adds documentation and specification text only. It
  introduces no credential, network call, dependency, privilege, or execution
  path. It requires targeted security and recovery scrutiny for any newly
  introduced mechanism during a correction, and it requires that sanitized
  evidence rather than raw authority output be recorded. The sealed independent
  reviewer continues to receive no dispositions and no intended conclusion.
- Portability: every path, fact authority, check command, taxonomy extension,
  and correction trigger is project-owned configuration. No account,
  repository, board, label, branch, absolute path, instance URL, or credential
  enters a portable asset, and the reusable-skills repository is named
  generically in scanned assets.

## Reuse Plan

Reuse the existing OpenSpec change artifacts as the review-ready packet, the
existing review-record location under `ai-planning/review-records/`, the
existing `tracking.yaml` contract, the existing glossary vocabulary in
[`docs/design/glossary/`](../../../docs/design/glossary/README.md), and the
existing repository validation commands. No new schema, machine-readable record
type, dependency, or automation is introduced; the two added Markdown documents
are an index of existing artifacts and a single copy of the review method, both
written and read by hand. The coordinated reusable-skills
change and the later consuming-repository adoption reuse this delivered policy
as their upstream contract; they are external prerequisites recorded in
`design.md` and `tasks.md`, not work items of this change.
