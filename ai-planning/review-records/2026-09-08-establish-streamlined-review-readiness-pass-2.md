# establish-streamlined-review-readiness — pass 2 finding record

Record ID: `RR-P2-2026-09-08-01`
Date: 2026-09-08
Change: `establish-streamlined-review-readiness` (issue #33)
Mode: same-session local adversarial review. **Not** an independent review, not
OpenSpec Verify, not approval, and not Apply authorization. Under requirement 1
this record is a same-session local review and satisfies no requirement for an
isolated independent review, however framed.

## Bound identity

Base commit `1963c872178d3e563aa5cb8b3f4607066732a3b0`. `HEAD`, `origin/main`,
and the recorded base all agreed at the time of the pass.

All six member digests recorded in `review-packet.md` were reproduced and
matched:

| Member | SHA-256 | Match |
| --- | --- | --- |
| `.openspec.yaml` | `8119cfe5…a901fa91` | yes |
| `proposal.md` | `c7620f31…23e5da47` | yes |
| `design.md` | `c5b2f510…1ddaa6bc` | yes |
| `specs/review-readiness/spec.md` | `09b8ed86…c2ab02f2` | yes |
| `tasks.md` | `9de57b35…71b38f5ac` | yes |
| `tracking.yaml` | `4b1af7e8…8e064ee4dd6` | yes |

Both externally bound cited records also matched: the witness testimony
(`af67b043…3b02b6cca0`) and the pass-1 record (`64355079…4f3d9166ccb`). The
directory `ls` showed no unlisted regular file. The packet binds; the pass is
recorded against this identity.

The reviewer entered through `review-packet.md` by change name alone, as
requirement 2 intends.

## Evidence gaps bounding this pass

- The standing method at `docs/review/adversarial-review.md` does not exist yet,
  so the eight-class method in `design.md` was substituted, as the packet
  permits. That substitution is recorded here per the packet's instruction.
- **Issue #33 and its Project item could not be read** (no network access from
  the review environment). Every claim about the issue's current in-scope path
  list and acceptance criteria is therefore withheld rather than confirmed.
  Class 5 is consequently **partial**, not swept clean.
- No implementation exists, so Apply-profile behavior was reviewed only as
  specified text.

## Independently reproduced evidence

The packet's "Evidence already produced" table was verified rather than assumed.
All six checks reproduce at the bound identity:

| Check | Recorded | Reproduced |
| --- | --- | --- |
| `node --test scripts/validation/test/*.test.mjs` | 41 pass, 0 fail | 41 pass, 0 fail |
| `node scripts/validation/validate-no-hardcoded-environment.mjs` | passed | passed |
| `validate-tracking.mjs …/tracking.yaml` | passed | passed |
| `validate-openspec-artifacts.mjs …` | passed | passed |
| `openspec validate --all --strict` | 9 passed, 0 failed | 9 passed, 0 failed |
| `git diff --check` | clean | clean |

Passing checks remain scoped evidence. None of them observes cross-document
correctness, which is where every finding below sits.

## Declared coverage

| Class | Result |
| --- | --- |
| 1. Consumer and reverse-direction coverage | findings |
| 2. Evidence ownership and producibility | findings |
| 3. Task sequencing and safe intermediate states | findings |
| 4. Lifecycle, recovery, abort | findings |
| 5. External-state validity | **partial** — findings recorded; issue #33 and the Project unreadable, so the work-state half is unswept |
| 6. Repeated-claim and restatement consistency | findings |
| 7. First-run, empty, absent, partial, repeated, already-complete | findings |
| 8. Authority and citation correctness | findings |

Unswept area named per requirement 5: the live state of issue #33 and its
Project item.

## Pass and provenance

This is pass 2 of the current binding. Under requirement 6 every finding raised
after the first pass carries exactly one provenance value. No finding below
required splitting.

## Findings

All findings are change-local: every subject lies inside this change's own
planning mutation boundary, so the change owns the mutation for all of them.

| ID | Severity | Provenance | Subject | Problem | Disposition |
| --- | --- | --- | --- | --- | --- |
| `rr-divergence-count` | high | repair-induced | `design.md` Context; `review-packet.md` authorities | Both say the brief's decisions "moved five." The supersession table records four divergences plus one row that explicitly states "Unchanged … No divergence remains." The count went stale when `rr-component-stop` was closed by adopting the brief's definition. Requirement 4 forbids restating a decisive set as a cardinality and makes the mismatch blocking. | Open |
| `rr-glossary-set-stale` | high | repair-induced | `design.md` Context, shared-record table, Verification Strategy | Three surfaces still carry the pre-correction term and page sets: Context says "three further terms — review pass, component, and root fact" against five; the shared-record row says "Two pages receive additions only" and "`03-change-and-artifacts.md` … untouched" against a three-page boundary; Verification Strategy confirms one definition for three terms while task 4.1 says five. `03-change-and-artifacts.md` is in the boundary, in `tracking.yaml`, and modified in the worktree. The fan-out register lists `design.md` Context as a surface for this claim, so this is a listed surface that was missed, not an unlisted one. | Open |
| `rr-workstate-fanout` | high | repair-induced | `design.md` assertion fan-out and decisive equalities | Requirement 10 states that a work-state record declaring the change's scope "sits on the mutation-path fan-out and SHALL equal the planned inventory." The mutation-path fan-out row omits issue #33, the decisive-equality bullet omits it, and no task before 5.1 checks the equality. The rule `sr-generic-work-state` added was written into the spec and not applied to this change's own register. | Open |
| `rr-member-quote` | medium-high | repair-induced | `design.md` packet subsection | The design claims the table "quotes [requirement 1's] ten members in its order and only adds this repository's owning location." Five of ten rows are reworded: member 2, 3, 8, 9, and 10. Requirement 1 requires every other surface to "quote it rather than restate it in its own order or wording." Order holds; wording does not. `rr-ten-members`' disposition promised a list "quoted by the design"; that half did not land. | Open |
| `rr-index-locates-members` | medium | latent | `review-packet.md` | Requirement 2 requires the index to "locate every other member of the packet." The index locates members 1, 2 (partly), 4, 6, and 10. It never locates the changed-path manifest (3), the consumer-to-coverage map (5), the material correction trigger (7), the task graph and cross-change prerequisites (8), or verification owners and recovery (9). A reviewer directed by change name alone therefore cannot detect a missing member, so requirement 1's readiness check is unenforceable from the entrypoint that exists to carry it. | Open |
| `rr-index-unbound` | medium | latent | delta spec requirement 2; `review-packet.md` | Requirement 2's permission to exclude the index from its own digest set rests on the reasoning that it "cannot record its own digest." That rules out self-recording, not recording elsewhere. The index carries the mutation boundary, the authority list, the superseded-input demotion, and the prior-findings state, and can be edited between passes with no stale-binding stop — on a change whose thesis is that a moving object cannot be reviewed. The pass-1 record does not carry the index digest either. | Open |
| `rr-context-delivery-claim` | medium | latent | `design.md` Context | "The bound base commit already contains … the updated glossary pages, so those are delivered inputs rather than uncommitted work." Three glossary pages are modified in the worktree and the two new entries are absent from `HEAD`. The Context's enumeration of preserved dirty work omits them. This contradicts IF-4 in the packet and is the substitution requirement 1 forbids: "MUST NOT substitute a local working copy for delivered-state evidence." The same sentence's "the review records" is ambiguous — this change's own pass-1 record is untracked. | Open |
| `rr-status-vacuous` | medium | latent | `tasks.md` 4.2; `design.md` implementation boundary | `git status --short` reports the change directory as a single untracked entry, so it cannot observe any edit inside it; requirement 3 makes evidence a named check cannot observe vacuous. Separately, the implementation boundary is "exactly" nine paths and excludes `tasks.md`, `review-packet.md`, and `ai-planning/review-records/`, all of which task 4.3 and ordinary checkbox updates require editing. Requirement 3's task-versus-map equality rule makes that mismatch blocking. | Open |
| `rr-testimony-claims` | medium | latent | `design.md` taxonomy and trigger subsection | The design says the testimony "records one inventory table amended in three rounds for three unrelated claims" and concludes "those three amendments are three components, so the repair trigger does not fire on the shared table." The testimony says "Three amendments to one inventory table were three distinct defect classes against **mostly** different rows." Distinct classes, not distinct claims; "mostly" is load-bearing. If two amendments touched one claim, the claim-keyed repair trigger fires and the load-bearing safety argument is unsupported by its cited source. | Open |
| `rr-no-transition` | medium | latent | delta spec requirements 1 and 2; `design.md` C21 and Recovery | Requirement 2 requires an index per change unconditionally and requirement 1 makes a missing member a readiness result, while C21 states the four existing active changes are not retrofitted and recovery is only "through its own owner's decision." On delivery, none of them can record a review pass. `design.md` Recovery covers adoption "partway through an existing review loop" but not a change that has run no pass. | Open |
| `rr-testimony-latent-estimate` | low | latent | `design.md` third-pass subsection | "The testimony estimated nine or ten further latent findings waiting behind three never-touched classes." The testimony's estimate covers completing the three never-touched classes **plus** three partially or incompletely swept ones. The same paragraph's "the single unrecorded fan-out that had actually caused the trouble" understates the testimony, which traces nine repair-induced findings to two facts. | Open |
| `rr-dangling-method-link` | low | latent | `tasks.md` 1.1, 2.1, 2.2 | Tasks 1.1 and 2.1 add links to `docs/review/adversarial-review.md` before task 2.2 creates it, so the repository carries a dangling internal link across three intermediate task states. No task's evidence checks link resolution. | Open |
| `rr-quote-equality-unchecked` | low | latent | `tasks.md` 4.1 | The decisive equality "the packet member table quotes requirement 1's ten members in its order" appears on no task's recheck list, although its failure was pass-1 finding `rr-ten-members` and it is failing again now as `rr-member-quote`. | Open |
| `rr-issue-authorization-scope` | low | latent | `design.md` C15 | C15 cites "the owner authorization recorded in the pass-1 finding record" for realigning issue #33 to the `tracking.yaml` path set. The recorded disposition authorizes "the eight-path set"; the ninth glossary page entered through a later correction. The authorization C15 cites is narrower than the action it licenses. Unverifiable against the issue itself under the class 5 evidence gap. | Open |

No finding was disputed. No finding was deferred. Every finding states an
evidence-backed problem; no suggested fix is binding.

## Root-fact grouping

Requirement 8 counts a correction against the root fact it changes, not against
each surface. Grouped:

| Root fact | Findings | Provenance |
| --- | --- | --- |
| RF-A. The pass-1 sweep for "a decisive set is never restated as a cardinality" was incomplete | `rr-divergence-count`, `rr-glossary-set-stale` | repair-induced |
| RF-B. Pass-1's generic rules were written into the specification and not applied to this change's own artifacts | `rr-workstate-fanout`, `rr-member-quote` | repair-induced |
| RF-C. The index locates files rather than members, and binds nothing about itself | `rr-index-locates-members`, `rr-index-unbound` | latent |
| RF-D. The enumerated boundary and the tasks state different permitted scopes, and the named check cannot observe either | `rr-status-vacuous`, `rr-dangling-method-link` | latent |
| RF-E. Claims about the witness testimony drift from what it says | `rr-testimony-claims`, `rr-testimony-latent-estimate` | latent |
| RF-F. Delivered-state and authorization claims rest on the working copy | `rr-context-delivery-claim`, `rr-issue-authorization-scope` | latent |
| RF-G. The contract has no transition clause for changes that predate it | `rr-no-transition` | latent |
| RF-H. An equality whose failure was already found once is on no recheck list | `rr-quote-equality-unchecked` | latent |

## Second-repair stop: owner decision required

The pass-1 closure record for `sr-generic-set-not-count` states that applying
the new rule "found seven further stale counts, all corrected." RF-A falsifies
that closure claim: at least four stale restatements survive across three
surfaces.

This is the third generation of IF-2's root fact — IF-2 in `tasks.md` 5.1, then
`rr-c11-path-count` in `design.md` C11, now RF-A. Requirement 8 states that the
second-repair stop fires on "a second failure of the same defect class against
that component," and that "one root fact whose fan-out was incompletely swept is
one incomplete correction, however many findings the omission later produces on
however many surfaces."

Under the claim-keyed component definition adopted in pass 1, the three
generations carry different claims — the mutation path set, then the divergence
set and the glossary sets — so the stop does not strictly fire on any one
component. Under the correction-closure component, the same defect class has now
failed twice against the same discipline, and the stop does fire.

**This resolution is the owner's, not the reviewer's.** It is the sharpest
question this pass raises, and it is exactly the ambiguity `rr-component-stop`
and `sr-component-not-narrowing` were each closed against. Requirement 8's exit
if it fires is design review rather than a third fix.

## Conclusion

**Apply-ready is withheld.** Requirement 11 permits Apply-ready only when every
material change-owned finding is closed or carries an owner disposition and
every applicable taxonomy class has a declared result. Three high findings and
one medium-high are open, and class 5 is partial.

Under the declared material correction trigger, all fourteen findings affect the
contract these artifacts express, so all fourteen are material. None is a pure
style or wording observation.

The pattern is more informative than any single finding. Pass 1's corrections
were written into the specification as durable generic rules and then not
applied to the artifacts that carry them. `rr-divergence-count` and
`rr-glossary-set-stale` falsify a recorded closure claim; `rr-workstate-fanout`
and `rr-member-quote` are rules this change published and did not follow. That
is the incomplete-fan-out failure this change exists to prevent, occurring
inside the change itself.

This pass is not the third-pass threshold, so requirement 9's precedence
ordering is not yet engaged. Should a third pass be reached, RF-A and RF-B are
`repair-induced` root facts and precedence 1 would return the change to design
reconciliation before further edits.

## Correction classification

None applied. This record is the review result only; no artifact was edited
during the pass, and the bound identity is unchanged. Any correction that
follows must classify itself under requirement 8, enumerate the fan-out of each
root fact above before editing, and produce a fresh binding and a fresh pass.
