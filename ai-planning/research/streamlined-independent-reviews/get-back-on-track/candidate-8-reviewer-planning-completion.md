# Candidate 8 — what remains to complete planning

**Change:** `add-tracking-schema-examples` (candidate 8), issue #31.
**Author role: reviewer.** I did not author or correct any candidate 8 artifact.
Everything below is a recommendation to the change's implementer; none of it is
an instruction, an approval, or an Apply authorization.

**Date:** 2026-09-08.
**Basis:** the three review passes recorded in
`ai-planning/scratch/2026-09-07-candidate-8-code-review.md`, `OBS-010`, and the
guidance in
[`streamlined-independent-reviews-findings.md`](../streamlined-independent-reviews-findings.md)
plus the [peer synthesis](../candidate-8-reviewer-delta-to-findings.md).

**Current state.** Pre-Apply. All six planning gates pass. Status is
`Blocked — Batch 1 incomplete`, dependencies `1, 7`. Five pass-3 findings are
open. No implementation exists.

---

## Summary of what is needed

| # | Item | Class | Effort |
| --- | --- | --- | --- |
| 1 | Close the five open pass-3 findings | Artifact edits | Small |
| 2 | Define duplicate-key identity in the delta spec | **New — spec gap** | Small |
| 3 | Record the consumer-to-coverage map | Manifest guidance | Medium |
| 4 | Record the scope-restatement surface list | Manifest guidance | Small |
| 5 | Move the candidate 7 prerequisite out of the task dependency line | Manifest guidance | Small |
| 6 | Run one declared-taxonomy sweep and record class coverage | Manifest guidance | Medium |
| 7 | Resolve or record the unreachable-authority precondition | **Correction to my own pass 1** | Blocked |
| 8 | Reclassify the shared-record findings as external | Synthesis guidance | Small |

Items 1 through 6 complete planning. Item 7 cannot be completed from this
workspace and must be recorded as a gap. Item 8 is bookkeeping that changes what
counts as this change's remaining work.

---

## 1. Close the five open pass-3 findings

These are already reported and unfixed. Restated here only as the checklist.

- **G** — `proposal.md:29-30` and `:63-64` name only `tracking-contract`. Two
  delta specs exist and `tracking.yaml:16` lists both. Name both in each place.
- **H** — `design.md:131-136` Reuse Plan does not carry the candidate 7 harness
  sentence that `proposal.md:83-85` now carries.
- **I** — `design.md:11-13` says the change affects "both downstream validators
  and their tests." After finding D was resolved, artifact validation takes no
  source edit.
- **J** — record *why* `portable: false` is pinned (because `portableRoots` is
  `[]`), so a future policy change has a breadcrumb.
- **K** — see item 5; this is the same defect with a structural fix.

## 2. Define duplicate-key identity — a spec gap not previously reported

**This is a new finding**, surfaced by applying the sweep taxonomy's boundary-case
class (item 6). It is the only substantive defect in this document.

The delta spec requires rejecting "a duplicate mapping key at any supported
mapping level" but never defines when two keys are the same key. The parser
derives a key from `line.match(/^([^:]+):(.*)$/)` then `match[1].trim()`
(`scripts/validation/lib/tracking.mjs:103-107`). Probed against the current
parser:

```
input: "schema_version: 1\n\"repository\": \"a/b\"\nrepository: \"c/d\"\n"
result: {"schema_version":1,"\"repository\"":"a/b","repository":"c/d"}

input: "schema_version: 1\nrepository : \"a/b\"\n"
result: {"schema_version":1,"repository":"a/b"}
```

Whitespace variants collide correctly. A quoted key and an unquoted key produce
**two distinct object keys**, so a document that YAML considers to have a
duplicate key would pass the proposed check. The negative fixture will not catch
it, because the fixture is written with unquoted keys.

**Recommended resolution** — and this is a recommendation, not the only safe one:
state key identity explicitly in the delta spec, and state that quoted mapping
keys are unsupported syntax rather than adding support for them. Adding quoted-key
normalization would cross the change's own non-goal *"Support additional YAML
constructs."* One sentence in the requirement plus one parser test closes it.

The alternative — treating a quoted key as a distinct key by design — is
defensible if written down. What is not defensible is leaving it undefined while
the requirement says "any supported mapping level."

## 3. Record the consumer-to-coverage map

The manifest's central planning control, and candidate 8 is the run that most
directly demonstrates its absence: pass 1's highest-severity finding was that the
proposal named one consumer of `parseTrackingYaml` where three exist.

The map now exists implicitly across three passes of corrections. Recording it
makes it checkable and gives item 4 its input. Minimum content:

| Consumer | Behavior and stop behavior | Source edit or justified no-edit | Requirement | Verification owner | Task | Producible evidence | Recovery |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `validate-tracking.mjs` | Rejects duplicate key, exit 2, no normalized output | No edit — inherits parser | `tracking-contract` | `tracking.test.mjs` | 1.1, 1.2 | Fixture through CLI | Remove or rename key |
| `validate-openspec-artifacts.mjs` | Structured `change.metadata.parse` issue on `.openspec.yaml` | **Explicit no-edit** — already catches at `:84-88` | `artifact-quality-validation` | `openspec-artifacts.test.mjs` | 2.1 | Regression test | Existing correction path |
| `validate-openspec-linkage.mjs` | Structured tracking issue with correction | Edit — wrap the uncaught `readTrackingFile` call | `tracking-contract` | `openspec-linkage.test.mjs` | 2.1 | Test via candidate 7 harness | Revert focused change |
| `docs/tracking-format.md` | Documents the rule and recovery | Edit | — | Documentation review | 3.1 | Review against validator behavior | Revert section |

**Check it in both directions.** The reverse direction is what caught finding D —
a file listed as affected that needs no edit — two passes late.

## 4. Record the scope-restatement surface list

`rules.design` requires enumerating every surface that restates scope so a later
correction updates the complete fan-out. Candidate 8 is the evidence for why:
three of its five pass-3 findings are surfaces a pass-1 correction missed, and one
of them (G) survived two full correction rounds.

The list is not hypothetical for this change — it is known:

- `proposal.md`: scope paragraph; change bullets; Modified Capabilities; Impact
  affected-code line; Impact affected-documentation line; Reuse Plan
- `design.md`: Context; Decisions 1, 2, and 5; Verification Strategy; Recovery;
  Reuse Plan
- `tasks.md`: task list and every `Depends on:` line
- `tracking.yaml`: `implementation_repositories[].paths`
- `specs/`: the delta-spec directories present on disk
- Shared: campaign roadmap row 8 — **external, see item 8**

Recording it in `design.md` costs a short subsection and makes the next
correction a walk rather than a recall.

## 5. Move the candidate 7 prerequisite out of the task dependency line

Finding K, with the structural fix the synthesis supplies. `tasks.md:26` reads
`Depends on: 1.1, candidate 7 delivery`. The manifest's `rules.tasks` forbids
mixing an external delivery gate into an internal task ID chain — but does not say
where the external condition goes instead, which is a gate without an exit.

Record it as a separate cross-change prerequisite:

- **Producer:** candidate 7 `resolve-pr-validation-signal`, which owns creation of
  `scripts/validation/test/openspec-linkage.test.mjs`.
- **Availability condition:** that file present on the default branch, not merely
  in an active local worktree.
- **Consumer:** candidate 8 task 2.1, which adds the duplicate-key case to it.
- **Recovery:** already correct in `design.md:126-127` — preserve candidate 8 as
  blocked rather than creating a competing harness.

Then `Depends on:` names task IDs only and references the prerequisite record.

## 6. Run one declared-taxonomy sweep and record class coverage

The peer evidence — nine of ten `home-roots` third-pass findings latent in version
one — says the risk is a class never swept rather than a class swept shallowly.
Applied to candidate 8, my three passes cover the classes unevenly:

| Class | Status across three passes |
| --- | --- |
| Coverage | Swept — findings 1, A, D |
| Evidence producibility | Swept — finding 2 |
| Restatement consistency | Swept — findings G, H, I, C, E |
| Sequencing and intermediate state | Partial — K and the candidate 7 dependency; task ordering itself never examined |
| Lifecycle completeness | **Not swept.** Verified since: `tasks.md` correctly omits Sync, Archive, and cleanup tasks — the archived changes follow the same convention, so this is not a defect. The abort path exists at `design.md:126-127`. |
| External-state validity | **Not swept — cannot be.** See item 7. |
| Boundary cases | **Not swept.** Sweeping it produced item 2, the one new defect in this document. |

Boundary cases remaining to sweep beyond item 2: an empty or whitespace-only
tracking document; a duplicate key where one occurrence opens a nested block and
the other is scalar; the first-run state where the fixtures directory does not yet
exist.

**Record the coverage, including the gaps.** A declared "external-state validity:
not swept, authority unreachable" is a scheduled round; an undeclared one is
indistinguishable from a clean sweep.

## 7. Resolve or record the unreachable-authority precondition

**I am recording this against my own pass 1.**

`gh` failed TLS certificate verification at every one of my three passes, so I
could not query GitHub for any fact. Under the precondition rule the synthesis
adopts, that is a review-readiness failure and the correct output is an evidence
gap, not a findings list containing status claims.

I reported one anyway. Pass-1 finding 6 said the roadmap's archive link for
candidate 4 was broken, on the evidence of a directory absent from **this
checkout**. The accepted correction downgraded candidate 4 from `Done` to
`In progress`. If PRs #27 and #28 did merge, that correction replaced accurate
delivery evidence with a status inferred from the one source the append-only rule
names as insufficient.

**What this needs, and it is not something I can do:**

1. Someone with GitHub access confirms whether #27 and #28 merged and whether
   candidate 4's change was archived on the default branch.
2. If it was, candidate 4's roadmap row is restored by **adding a dated
   correction citing that authority**, not by re-editing the status in place.
3. Issue #31 and issue #30 are confirmed to exist as the artifacts claim.

Until then, every GitHub-derived fact in candidate 8's planning record — issue
#31, the candidate 7 dependency's delivery state, the batch 1 completion condition
— is unverified. That does not block the artifact edits in items 1 through 6, and
it does block treating candidate 8's blocked-status reasoning as evidenced.

## 8. Reclassify the shared-record findings as external

Under convergence scoped to the change's mutation boundary, three of my seventeen
findings were never candidate 8's to fix:

- Pass 1 finding 6 — roadmap ledger drift, broken archive link, unmet batch gate
- Pass 2 finding B — the hard-dependency column reading `1`
- The roadmap half of the pass-3 context

These belong to the campaign record's owner. Reported once, named, and removed
from candidate 8's finding set. Two of the three were corrected by the candidate 8
implementer, which is how three concurrent sessions came to be editing one roadmap
between passes — the mechanism candidate 5 and candidate 7 both identify as
unbounded.

**Consequence for this change:** candidate 8's remaining planning work is items 1
through 6 only. Item 7 is an external precondition; item 8's subjects are external
findings.

---

## What I would not do

- **Do not Apply yet.** Candidate 8 is correctly `Blocked` on batch 1, and item 5's
  prerequisite is genuinely unsatisfied — the linkage test file does not exist.
- **Do not add quoted-key support** to close item 2. It crosses a stated non-goal.
  Define the boundary instead.
- **Do not re-edit the candidate 4 roadmap row** to "fix" item 7 from this
  workspace. That is the exact action the append-only rule prohibits, and it is
  what produced the problem.
- **Do not treat items 3, 4, and 6 as blocking** if the owner judges them
  disproportionate for a change this size. They are the manifest's controls and
  this change is the evidence for them — but that argument is mine, and the
  proportion call is the owner's.

## Estimated effect

Items 1 and 2 are the only ones affecting the delivered artifact's correctness.
Items 3 through 6 are the manifest's planning controls applied retroactively;
their value is that the next correction to this change walks a list instead of
relying on recall, which is precisely what failed three times here.

If items 1 through 6 are completed together, I would expect one confirming review
pass rather than another finding round — with the caveat that this is the same
counterfactual estimate every session in this research set has made and none has
measured.
