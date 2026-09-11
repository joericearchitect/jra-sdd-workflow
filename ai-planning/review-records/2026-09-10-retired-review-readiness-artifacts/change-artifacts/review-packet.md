# Review packet — establish-streamlined-review-readiness

This is the entrypoint for any review of this change. Read the standing method,
then apply it to the bindings below. The method is not restated here.

**Standing method:** [`docs/review/adversarial-review.md`](../../../docs/review/adversarial-review.md)

Until that file is delivered by this change's own task 2.2, the reviewer must be
supplied the method explicitly for the pass. Record that substitution in the
pass's review record.

## Bound identity

- Base commit: `1963c872178d3e563aa5cb8b3f4607066732a3b0`
  (identical to `origin/main` when this packet was bound, 2026-09-08)
- Pass: next review is pass 3 against this identity. Pass 2 concluded and
  withheld Apply-ready. This binding is the pass-2 correction; pass 2's
  conclusion does not apply to it.

Every reviewed artifact is an uncommitted planning file, so the base commit
alone does not bind them: they can change while the base does not. Identity is
therefore the base commit plus the digest set below. This index excludes itself,
since it cannot record its own digest. The review record for the current
correction carries this index's digest:
`ai-planning/review-records/2026-09-08-establish-streamlined-review-readiness-pass-2-correction.md`.

| Member | SHA-256 |
| --- | --- |
| `.openspec.yaml` | `8119cfe5ad04f1801d3027066b1b671140c63203d1b9ea7592d49018a901fa91` |
| `proposal.md` | `604ed0de896910396a53371f29736dc417a0cb99057de42192a116e224978c61` |
| `design.md` | `27e491068f9a06db433346112e891804d46a085b185824f656d54101f7f31b1c` |
| `specs/review-readiness/spec.md` | `a6362f476eb4c836dfe87997f7591ee3da1f57ce319b448de38c78a4556e014f` |
| `tasks.md` | `9f731b3ceee8faf5cb5261a359776ff9c8449d12d70d3fdd6996def0d765731a` |
| `tracking.yaml` | `4b1af7e8d04a526ae9cc58257046ab2c230f64ec0d32be8742bfe8e064ee4dd6` |

Two records outside this directory are bound as well, because the contract cites
them and a later clone must be able to check those citations:

| Cited record | SHA-256 |
| --- | --- |
| `ai-planning/notes/2026-09-08-review-readiness-witness-testimony.md` | `af67b04322acccd9909daefc50729bfb887226e29a877cd0a70ea33b02b6cca0` |
| `ai-planning/review-records/2026-09-08-establish-streamlined-review-readiness-pass-1.md` | `64355079b7912f3000a2b35204da0ffe7284f9528ad9a01641fef4c3d9166ccb` |
| `ai-planning/review-records/2026-09-08-establish-streamlined-review-readiness-pass-2.md` | `f4bd6aa078fdc34a96acc9221c82c93031452de856b4dde495d846c82d3c366b` |

Reproduce the set from this change's directory:

```bash
git rev-parse HEAD origin/main
shasum -a 256 .openspec.yaml proposal.md design.md \
  specs/review-readiness/spec.md tasks.md tracking.yaml
ls -A . specs specs/review-readiness
cd "$(git rev-parse --show-toplevel)" && shasum -a 256 \
  ai-planning/notes/2026-09-08-review-readiness-witness-testimony.md \
  ai-planning/review-records/2026-09-08-establish-streamlined-review-readiness-pass-1.md \
  ai-planning/review-records/2026-09-08-establish-streamlined-review-readiness-pass-2.md
```

The member list is enumerated rather than globbed so that a file added to this
directory and never listed is visible instead of silently absent from the
binding; the `ls` is what makes that check possible.

Stop and report a readiness failure if the repository HEAD differs from the
recorded base, if any listed file is absent, if any digest differs from the
recorded value, or if the directory holds an unlisted **regular file other than
this index**. Directories and this index are not extra files: the index cannot
record its own digest, and `specs/` is the parent of a listed member. An earlier
wording omitted those two carve-outs, which made this packet a literal readiness
failure against itself; that was pass-1 finding `rr-index-stop-condition`.

A changed identity invalidates any prior conclusion; it does not license
reviewing the differing content. Refresh this block, and only this block, when
rebinding for a new pass.

## Packet members

Requirement 1 is the single authority for the member set. This index locates
every other member so a reviewer directed by change name alone can detect a
missing member. The first column quotes that list.

| Packet member (quoted from requirement 1) | Location |
| --- | --- |
| the packet index at its deterministic entrypoint | this file |
| the base identity and the evidence that each required fact authority was reachable | `design.md` Context |
| the complete artifact and changed-path manifest | `tracking.yaml` paths plus the named-file listing recorded with task 4.2 |
| the mutation boundary and shared-record identities | `design.md`, Mutation boundary and shared-record identities |
| the bidirectional consumer-to-coverage map | `design.md`, Consumer-to-coverage map |
| the durable assertion fan-out and decisive equality sets | `design.md`, Repeated assertions and decisive equalities |
| the applicable defect taxonomy and material correction trigger | `design.md`, Defect taxonomy and material correction trigger |
| the internal task graph and separately recorded cross-change prerequisites | `tasks.md` numbered tasks and its `Entry gates` section |
| the verification owners, producible evidence, recovery, and external-state observations | `tasks.md` `Evidence:` fields and `design.md` Verification Strategy and Recovery |
| the prior finding dispositions, or their recorded absence, which are withheld from a fresh isolated reviewer | `ai-planning/review-records/2026-09-08-establish-streamlined-review-readiness-pass-1.md` and `ai-planning/review-records/2026-09-08-establish-streamlined-review-readiness-pass-2.md` |

If any row's location is absent, this packet is not ready: that is a missing
member, not a review pass.

## Reviewed contract

These files, and only these, are under review. Read them as one contract, not as
separate documents and not as a diff.

- `.openspec.yaml`
- `proposal.md`
- `design.md`
- `specs/review-readiness/spec.md`
- `tasks.md`
- `tracking.yaml`

This packet index is itself a change-owned planning artifact. Review it for
accuracy against the files above, but it carries bindings rather than contract
behavior.

## Read-only authorities

Resolve every conflict against these. Do not review them and do not report
findings about their content.

| Authority | Governs |
| --- | --- |
| `openspec/config.yaml` | Artifact rules, the living-specification test, and the repository's ground boundaries |
| `docs/sdd-workflow.md` | Existing lifecycle gates, correction budgets, and procedures this change must not weaken |
| `docs/design/glossary/03-change-and-artifacts.md` | Change and artifact vocabulary, including packet |
| `quality/openspec-artifact-rules.json` | What the artifact validator actually enforces |
| `AGENTS.md` | Repository ground rules |

The glossary pages in the mutation boundary below are a mixed case. Their
existing entries are authority for every term this change reuses, but the change
also plans additions, described in `tasks.md` 2.3. Treat the existing entries as
authority and the planned additions as reviewable. Two of those additions are
already present as uncommitted working-tree text; see IF-4.

**Superseded design input, not an authority.**
`ai-planning/design-briefs/streamlined-review-readiness-and-convergence.md` is
where this work came from, and successive rounds of owner-directed additions have since
moved the decisions `design.md` Context records in its supersession table. Do
**not** resolve conflicts against it. Where the
brief and this change differ, this change governs, and `design.md` Context lists
every known divergence. A divergence that is not on that list is a finding.

Background, not an authority:
`ai-planning/research/streamlined-independent-reviews/streamlined-independent-reviews-findings.md`.

Cited evidence, bound by digest below so its citations stay checkable:
`ai-planning/notes/2026-09-08-review-readiness-witness-testimony.md`.

## Mutation boundary

This change may edit only `AGENTS.md`, `CLAUDE.md`,
`docs/design/glossary/02-lifecycle.md`,
`docs/design/glossary/03-change-and-artifacts.md`,
`docs/design/glossary/05-validation-and-recovery.md`,
`docs/review/adversarial-review.md`, `docs/sdd-workflow.md`,
`openspec/config.yaml`, and a synced `openspec/specs/review-readiness/spec.md`.

Everything else belongs to another owner. A finding about a subject outside this
boundary is `external-state`: report it once to its owner and do not count it as
convergence for this change. The four unrelated active changes under
`openspec/changes/`, the campaign ledgers, the remaining glossary pages, the
validators, and the reusable-skills repository are all outside the boundary.

## Change-specific checks

Beyond the standing method, verify the decisive equalities that `design.md`
records under "Repeated assertions and decisive equalities". They are meant to
be checkable without reinterpreting intent, so a mismatch is a blocking finding
rather than a wording preference.

Check every claim these artifacts make about what another document says against
that document. These artifacts assert what the issue, the glossary,
`openspec/config.yaml`, the design brief, and the witness testimony contain, and
two such claims have already been found false. Attribution here is unusually
load-bearing, because this change proposes rules justified by cited evidence.

## Evidence already produced

Verify these claims rather than assuming them. All were run at the bound base.

| Check | Result |
| --- | --- |
| `node --test scripts/validation/test/*.test.mjs` | 41 pass, 0 fail |
| `node scripts/validation/validate-no-hardcoded-environment.mjs` | passed |
| `node scripts/validation/validate-tracking.mjs <this change>/tracking.yaml` | passed |
| `node scripts/validation/validate-openspec-artifacts.mjs <this change>` | passed |
| `openspec validate --all --strict` | 9 passed, 0 failed |
| `git diff --check` | clean |

Passing checks are scoped evidence. They establish only the properties those
checks observe, not cross-document correctness.

## Prior findings

**Pass 1 concluded on 2026-09-08 and withheld Apply-ready.** It was a
same-session local review, not an independent one. It declared all eight
taxonomy classes, raised ten findings — one blocker, two high, six medium, one
low — and none were disputed or deferred. The full record with dispositions is
`ai-planning/review-records/2026-09-08-establish-streamlined-review-readiness-pass-1.md`,
bound by digest above.

All ten were corrected in a single batched contract-changing correction. Three
required owner decisions, which were taken: the change supersedes the design
brief where they differ; the component is the brief's claim-keyed unit rather
than a surface; and issue #33's scope was realigned to the `tracking.yaml` path set.
Pass 1 also confirmed that packet finding IF-2's root fact was **not** closed —
the path set was still restated as a count in consumer C11 — so this correction
swept every numeric restatement of that set rather than the instance named.

Two earlier things are *not* passes and should not be counted as such.

**Design input, not a review pass.** A separate planning session that had run a
four-pass manual review loop answered questions about its own convergence
failure, and that testimony was folded in as an owner-directed scope addition.
It is recorded at
`ai-planning/notes/2026-09-08-review-readiness-witness-testimony.md` with the
limits on its weight. It was not asked to attack this change, it produced no
findings bound to an identity, and it is not an independent review. Under
requirement 1 the scope addition it prompted is a new binding, so the pass count
starts here.

**Implementer-found findings, before pass 1.** Requirement 6 records a finding
whoever found it, so two problems found while making that addition are recorded
here rather than lost. Neither carries a provenance value, because provenance
attaches only after the first pass of a binding.

| ID | Subject | Problem | Class | Disposition |
| --- | --- | --- | --- | --- |
| IF-1 | `design.md` assertion fan-out register | Two rows credited issue #33 with restating the taxonomy class set and the provenance value set. The issue requires the sets to be equal across surfaces and names some values in its problem narrative, but enumerates neither, so it consumes the equality rather than restating either fact. | Authority and citation correctness | Fixed. Both rows corrected together as one root fact, so the correction counts once against the component. |
| IF-2 | `tasks.md` 5.1 evidence | The evidence field claimed the default branch would contain "the four guidance and configuration edits" after an earlier scope addition had raised the count to five. | Repeated-claim and restatement consistency | Fixed. Replaced with a reference to the `tracking.yaml` path set so the claim cannot go stale against a count again. |
| IF-4 | `docs/design/glossary/`, before task 2.3 | The `independent reviewer` and `same-session local review` entries were written into the glossary by another party ahead of task 2.3 and the Planning-to-Apply gate, so the worktree is partially applied. The terms themselves are sound and fill a gap this contract had. | Task sequencing and safe intermediate states | Folded into scope rather than reverted, because the text is not this change's to discard and reverting would lose it. The boundary, `tracking.yaml`, issue #33, and task 2.3 now cover the glossary pages those records name, and 2.3 reconciles the existing text against requirement 1 instead of re-authoring it. The premature-application half is unresolved and is why the glossary shows as modified during Propose. |
| IF-3 | The planning boundary, during this scope addition | Task 2.3's glossary edits were written into `docs/design/glossary/` during Propose, ahead of the Planning-to-Apply approval and campaign sequencing gates that 0.1 places in front of every implementation task. | Task sequencing and safe intermediate states | Reverted. The glossary is unmodified and 2.3 now names the requirement each entry restates, so the wording is drafted at Apply without losing the decisions. Recorded rather than discarded, because a silently corrected slip is exactly the evidence the witness testimony lost. |

IF-1 is the reason class 8 is swept against this change's own artifacts under
"Change-specific checks" above: the defect it names was found in the very table
that exists to prevent that kind of defect.

When review findings exist, they live in the configured review record under
`ai-planning/review-records/`. For a fresh isolated review, remove this whole
section from the supplied material rather than instructing the reviewer not to
read it.
