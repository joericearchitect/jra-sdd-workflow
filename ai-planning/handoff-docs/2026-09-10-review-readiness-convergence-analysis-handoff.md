# Handoff — why the review-readiness work is not converging

Date: 2026-09-10
Change: `establish-streamlined-review-readiness` (issue #33)
Status: **stopped deliberately.** Four findings from review 4 are open and
unfixed. No further repair should be attempted before the analysis below is
acted on.

This handoff has two jobs: record why the loop is not converging, and set up a
next session to do repo-wide analysis and prompt-engineering research. It is not
a correction plan and does not authorize Apply.

## 1. State of the work

```
Branch: preserve-review-readiness-evidence
HEAD:   a42215f   (main is still at 1963c87)
PR #34: open, unmerged — carries all preserved records
```

Change artifacts at `openspec/changes/establish-streamlined-review-readiness/`
are **untracked**, per this repository's convention. Digests when this handoff
was written:

```
20d6686a9e123f40  .openspec.yaml      213110472e863397  proposal.md
6b65407299445aff  design.md           0fa31bd57750cdd4  tasks.md
8208b1bd68a5b185  tracking.yaml
```

Committed and durable: the retired artifacts, the full review history of both
attempts, the disposition record for all 52 prior findings, the scope-observation
design review, and the accepted design brief. All under `ai-planning/`.

Deliberately uncommitted: three glossary files and
`ai-planning/to-dos/future-enhancements.md`. See finding AR-002 — the glossary
edits are now contested.

Mechanical checks pass and have passed at every single review: 41 tests,
tracking, artifact quality, portability, `openspec validate --all --strict`.

## 2. Open findings — review 4, unfixed

All four verified independently before stopping. All valid.

| ID | Sev | Problem | My assessment |
| --- | --- | --- | --- |
| `AR-001` | blocker | The committed brief says the rebuild is done, but the artifacts are untracked and absent from `a42215f`. A durable record claims a state no later reader can reproduce from its own revision. | Valid, and it is not really *my* defect — it is the repository's untracked-planning convention colliding with committing governing records. See §4 pattern 5. |
| `AR-002` | blocker | The working tree already contains the glossary entries that task 4.1 is supposed to deliver, before the Planning-to-Apply gate. | Valid. The edits predate this rebuild — they are the `IF-4` text — but the current plan delivers them from the patch, which makes the working-tree copy both redundant and a boundary breach. |
| `AR-003` | high | `design.md` calls the task-5.2 review record a working file, not a delivered path; task 5.2 commits it "so it is delivered"; task 6.1 puts it in the pull-request scope set. | Valid. I introduced this across two consecutive fix batches. Genuinely contradictory. |
| `AR-004` | high | Task 0.1 pins preservation commit `713553d`, but the scope-observation design review arrived in `df8c0b7` and the governing reconciliation in `a42215f`. The gate can pass while the delivery base lacks the current governing decision. | Valid and sharp. I pinned the commit that existed when I wrote the gate, then kept committing. Verified: the design review is in `df8c0b7`, not `713553d`. |

Evidence gap: `gh` is unauthenticated in the reviewing session, so issue #33 and
PR #34 state are unverified there. They were verified earlier in this session.

## 3. The data

Nine review events across two attempts at the same work.

| Attempt | Event | Findings |
| --- | --- | ---: |
| Retired | pre-pass implementer (`IF-1`–`IF-4`) | 4 |
| Retired | pass 1 | 10 |
| Retired | pass-1 self-review | 8 |
| Retired | pass 2 | 14 |
| Retired | pass 3 | 16 |
| Rebuild | review 1 (code review) | 4 |
| Rebuild | review 2 (adversarial) | 2 |
| Rebuild | review 3 (adversarial) | 3 |
| Rebuild | self-review + sweeps | 12 |
| Rebuild | review 4 (adversarial) | 4 |
| | **Total** | **77** |

The rebuild was supposed to be the convergent version. It has produced 25
findings across 5 evaluations and the per-review count is flat, not declining.
**Flat is the signal.** A converging process produces a decreasing sequence.

**Roughly 17 of the rebuild's 25 findings (~68%) were introduced by fixes to
earlier findings.** Classification has judgment in it, but the magnitude is not
in doubt. Review 3's blocker was caused by two review-1 fixes that contradicted
each other. Ten of the twelve self-review findings were staleness created by the
review-3 fix batch. Three of review 4's four trace to my last two batches.

Every one of the 77 findings was invisible to every mechanical check, on every
run.

## 4. Why it is not converging

Seven patterns. The first three are the load-bearing ones.

### Pattern 1 — the defect-introduction rate approximately equals the fix rate

Each repair writes new prose that has never been reviewed. Review *N* finds *k*
defects; fixing them creates roughly *k* new unreviewed assertions; review *N+1*
finds defects in those. This is not a process that converges slowly — it is a
random walk with no restoring force.

The existing contract half-anticipates this: it has a `repair-induced` provenance
value and a rule that repair-induced causes return to design review. That rule
fired once (the scope observer) and worked. But it is scoped to one claim
failing twice, so it cannot see a *general* repair-induced rate of 68%.

### Pattern 2 — I reduced duplication in the wrong denominator

The rebuild's explicit thesis was that duplication across surfaces generates
drift, and it cut the change directory from 2,185 lines to 518. But it *added*
governing records: the design brief, the disposition record, the scope-observation
design review. Each restates decisions.

Total surfaces carrying decisions went **up**, not down. That is precisely why
the self-review found the governing records stale while the change artifacts were
clean — the correction had been applied to the shrunken denominator and not to
the grown one.

Current surfaces that must agree: `proposal.md`, `design.md`, `tasks.md`,
`tracking.yaml`, issue #33, the brief, the disposition record, the design review
record, and PR #34's body. Nine. With ~10 live decisions, that is on the order of
a hundred (decision, surface) pairs held consistent by hand, with no mechanical
check on any of them.

### Pattern 3 — the entire defect class is invisible to every check

41 tests, four validators, strict OpenSpec: green at all nine reviews. Every
finding is semantic — a claim whose subject does not bear it out. The validators
check headings and metadata shape.

So the only detector is careful reading by a human or a model, which is the
unreliable component. The process has no mechanical restoring force at all.

**Notable:** a meaningful share of the 77 *are* mechanically checkable — link
resolution, digest freshness, a pinned commit that is no longer the tip, a
symlink treated as a distinct file, a claimed set restated as a count, a cited
record that postdates its citation. `AR-004`, `RRR-002`, `IF-2` and its three
descendants, and several staleness findings would all fall to a small checker.

### Pattern 4 — the subject is self-referential

This change defines review discipline and is reviewed under it. Its artifacts
make claims about themselves: *"this is the only equality"*, *"every gate has a
documented exit"*, *"no fact appears on two surfaces"*. Self-claims must be
re-verified after every edit and are the ones that keep going stale. The peer
changes in this repository do not show this pattern, which is evidence that the
subject matter, not the author, is a major factor.

### Pattern 5 — the repository's own conventions have a latent conflict

`AR-001` and `AR-002` both come from the convention that planning artifacts stay
untracked through Propose. That convention means a durable record cannot
reference the artifacts reproducibly, and any uncommitted implementation work is
indistinguishable from Apply-before-gate.

**This is a repository-level finding, not a change-level one.** This change is
the first to commit governing records alongside untracked artifacts, so it
surfaced the conflict. Every future change inherits it.

### Pattern 6 — self-review searches for symptoms, not classes

My self-review found twelve things. It also wrote a re-entry guard as *"a claim
made from the dirty primary worktree"* — the two instances then known — which
would not have caught `ARR-001`, the clean-worktree instance it existed to catch.
Then, fixing the disposition record, I corrected one row and missed the identical
defect three rows below, because my search term was the symptom wording rather
than the underlying claim.

Each search encodes the current mental model, so it finds only what is already
suspected. This is a structural limit of self-review, not an effort problem.

### Pattern 7 — effort went to mechanical compliance over semantic coherence

I spent roughly fifteen tool calls trimming three lines to meet a budget I had
set by analogy, in the same session in which `AR-004` (a pinned commit going
stale) went unnoticed. Attention spent on countable compliance is attention not
spent on the defect class that actually recurs.

## 5. What this implies

Five structural options. They are not mutually exclusive; the first two are, I
think, the strongest.

1. **Collapse the surfaces.** Fewer documents carrying decisions, not shorter
   ones. Could the brief, disposition record, and design review fold into the
   change? Could the change be one document? The target metric is *(decisions ×
   surfaces)*, which no current rule tracks.
2. **Build the checker.** The manual-first exit condition is long past met — this
   has been done by hand nine times and found painful every time. A checker for
   link resolution, pinned-revision freshness, cited-record ordering, symlink
   identity, and set-versus-count would have caught a substantial fraction of the
   77 mechanically, at every review, for free.
3. **Change when fixes are reviewed.** Fixes are currently written, committed,
   and *then* found defective by the next review. Reviewing a fix batch as new
   content before it lands would attack the 68% directly.
4. **Ship with recorded defects.** Accept the change with `AR-001`–`AR-004`
   recorded as known, deliver it, and let real use drive correction. The guide
   itself has never been wrong — only the machinery describing its delivery.
5. **Question whether the change should exist in this form.** The deliverable is
   a ~150-line guide. It currently requires 518 lines of planning artifacts, nine
   governing surfaces, and nine reviews. A direct documentation commit with no
   change artifacts would have shipped in an hour. What is the machinery buying?

## 6. For the next session

### 6a. Repo-wide analysis

- Do the peer changes show the same pattern, or is this change an outlier? Check
  the archived changes for review counts and repair-induced findings. If peers
  converge in one or two passes, the cause is this change's self-reference and
  size, not the workflow. **This is the highest-value question to answer first.**
- Audit the untracked-planning convention (pattern 5). What breaks if planning
  artifacts are committed on a branch at Propose? What was the original reason?
- Inventory what the existing validators actually check versus what the 77
  findings are. Quantify the gap. That scopes option 2.
- Cross-check against the agent-skills repository. `base-code-review` already
  enforces declared coverage, finding identity, and an assurance label that
  cannot be faked; `base-verification-loop` already tracks correction budgets
  from durable records. How much of this repository's prose duplicates behaviour
  that is already executable and tested over there?

### 6b. Research

The question is not "how do I write a better prompt." It is: **what is known
about making LLM-driven iterative correction converge, when the artifact is
prose and the defect class is semantic inconsistency?**

Worth looking for:

- Published guidance from Anthropic, OpenAI, and GitHub on multi-pass review,
  self-critique, and when self-correction degrades rather than improves.
- Evidence on self-consistency and self-refinement failure modes — specifically
  whether models reliably introduce new errors while fixing old ones, and at what
  rate. Our measured ~68% is a data point worth comparing.
- Prior art on machine-checkable documentation invariants: doc linters,
  cross-reference checkers, literate-programming consistency tools, `mdbook`-style
  link checking, spec-to-implementation traceability tooling.
- How other spec-driven or RFC-driven processes bound the same problem —
  Rust RFCs, Python PEPs, Kubernetes KEPs. They face identical drift across
  proposal, design, and implementation surfaces. What do they do about it?

Keep the repository's ground rules in view while researching: manual first, no
hardcoded environment values, every gate ships with its exit, second repair means
design review, proportion.

## 7. What not to do

- Do not fix `AR-001`–`AR-004` before the analysis. That is a sixth evaluation of
  a binding that has not converged in five, and pattern 1 predicts the fixes will
  generate their own findings.
- Do not start Apply. PR #34 is unmerged and `AR-002` says Apply work already
  leaked into the working tree.
- Do not retrofit the four unrelated active changes, edit the campaign ledger, or
  touch the agent-skills repositories.
- Do not treat the scope-observation claim as repairable. It has failed three
  times and had two design reviews; its recorded exit is removal, not a fifth
  observer.

## 8. Records

Everything cited is committed under `ai-planning/`:

- Reviews of the rebuild: `review-records/2026-09-10-establish-streamlined-review-readiness-review-{1,2,3,4}-*`
- All 52 prior findings with outcomes: `review-records/2026-09-10-review-readiness-finding-dispositions.md`
- The scope-observation decision: `review-records/2026-09-10-review-readiness-scope-observation-design-review.md`
- Accepted design: `design-briefs/2026-09-10-review-readiness-simplified-contract.md`
- The retired attempt, verbatim: `review-records/2026-09-10-retired-review-readiness-artifacts/`
- The first attempt's review history: `review-records/2026-09-08-*` and
  `handoff-docs/2026-09-08-review-readiness-pass-3-handoff.md`
