# Review-readiness reconciliation: design self-review evidence

Date: 2026-09-08

Status: three design self-review rounds completed; the final bound sweep found
no further material design defect within the stated scope. This is
same-session design self-review, not an isolated
independent review, OpenSpec Verify, approval, or another pass on the unchanged
OpenSpec artifacts. The existing pass-3 stop remains in force.

## Final-sweep input binding

The input is the separate
[design recommendation](../design-briefs/2026-09-08-review-readiness-design-reconciliation.md),
SHA-256:

```text
af68abaf4cfe09105a28426da5e642f14474b1fda91953a88d1892c068870050
```

Before the final sweep, an exact disposable copy was retained outside the
repository and its digest compared successfully. This record is the review
output, not part of that frozen input. The durable recommendation itself
retains the reviewed bytes as long as that digest matches. A later editor must
preserve or commit those bytes before replacing them if historical comparison
is needed; this record does not promise durable storage of the temporary copy.

The source repository HEAD and the API-observed default-branch head were both
`1963c872178d3e563aa5cb8b3f4607066732a3b0`. A pre-edit snapshot recorded content,
type, and relevant modes for 205 tracked/nonignored-untracked source paths.
The original packet's SHA-256 was
`6442a766b314935c218e7d2749415f88d4ef049def8f92f060cec01f72c2f84a`.

The materiality criterion is the existing proposed contract's observable
correctness, security, privacy, data-loss, compatibility, authorization,
recovery, or contractual impact, regardless of severity label. It was not
relaxed for this recommendation. Findings on the unchanged artifacts retain
their historical identities; a design mapping is not their closure evidence.

## Draft-review rounds and resulting corrections

The first two rounds were iterative design audits during drafting. Their
intermediate exact bytes were not retained, so the notes below document the
decisions made, not immutable proof of earlier draft identities. The final
sweep assesses the complete bound result, including these corrections.

| Round / ID | Problem found in the design audit | Correction in the bound recommendation | Final verification target |
| --- | --- | --- | --- |
| 1 / DR-01 | Keeping merged delivery as an Apply task makes the requirement to complete every task before Verify/closure depend on that future closure. The original C5 also asks task 4.2 for future Sync evidence. | D8 moves former 5.1 to the subsequent lifecycle handoff, not an unchecked Apply task; Sync owns its own evidence. | Trace all implementation tasks to completion without a merged PR or living spec; then follow the existing closure and Sync sequence. |
| 1 / DR-02 | A local frozen copy does not satisfy the installed independent-review protocol's regular committed-blob contract. A fresh exact-head repository view also does not guarantee historical repository documents are inaccessible. | D4 separates local snapshots from committed independent input, keeps the configured request/result protocol, and states actual visibility and unavailable-boundary recovery. | Check the recommendation against the installed protocol/result contract and the workflow's optional independent-review gate. No adapter execution is claimed. |
| 2 / DR-03 | Preserving IF-4 text verbatim could retain an isolation claim the new design explicitly corrects; unrestricted reconciliation could instead overwrite delivered definitions or unrelated user work. | D8 preserves the source and permits only accepted reconciliation of selected, not-yet-delivered additions, with a separate decision for wider edits. | Trace source retention, selected-hunk transfer, destination conflict, corrected definition, and scope-expansion cases. |
| 2 / DR-04 | Removing the standing method during rollback can leave inbound links and active consumers broken. | D9 makes rollback dependency-aware, preserves prior evidence/user work, and requires a scoped follow-up for delivered contract changes. | Trace pre-delivery abort and post-delivery consumers; verify that neither permits deleting a live dependency or silently replacing a selected profile. |

Round 2 also made two applicability/recovery paths explicit: documentation-only
changes do not invent specs or Sync evidence, and failed registration or
unavailable permission cannot be bypassed with an unregistered resource. It
retained the staged-content observation requirement and exercised it directly.

Round 3 is the whole-design sweep below, including reverse consumer coverage,
all historical finding IDs, the corrections' new consequences, and the limits
of the actual diagnostic checks.

## Executed boundary-observer controls

All mutations for these controls occurred in a disposable temporary repository,
using Git 2.39.5. No real implementation file, index entry, branch, worktree
registration, issue, or Project item was changed. A synthetic file deletion and
synthetic commits were confined to that fixture. The temporary fixture is not
a new repository test harness or delivery dependency.

| Control | Actual observation | What it establishes |
| --- | --- | --- |
| New planning directory | Ordinary short status showed the directory; expanded untracked status showed its individual file. | A collapsed directory name is not a complete changed-file manifest. |
| Already-dirty tracked and untracked files | Changing the planning file, an already-modified tracked file, and an existing untracked file left the entire expanded status text identical; content comparison detected all three paths. | Stable status categories do not establish preservation. Classifying the planning path as allowed still leaves both user-work edits outside that boundary. |
| Ignored generated output | Default untracked enumeration omitted it; explicit ignored-file enumeration found it. | Ignored content requires an applicability decision, not an assumption that it cannot matter. |
| Committed addition and deletion outside the planning boundary | Before commit, staged diff reported `D product.txt` and `A staged.txt`; after commit, base-to-head diff reported both while ordinary working status no longer did. | Working status alone misses committed changes; deletion must remain in the comparison domain. |
| Hidden nested entry | Expanded inventory located `planning/.hidden/unlisted.md`. | An organizational-directory exception must not exempt its contents. |
| Staged bytes differ while working bytes are restored | Staged diff contained `Staged-only change not visible in final working bytes`; unstaged diff showed the working copy restored to its previous text. | A final working-file fingerprint is not proof that the index was preserved. |

The identical-status control produced:

```text
statusUnchanged: true
changed: planning/proposal.md, preserved.txt, user-untracked.txt
```

These are counterexamples and controls for the proposed manual observation
method. They do not constitute execution of a delivered observer, proof about
all filesystems, or an independently validated implementation. Rename,
symlink, submodule, unreadable-entry, and concurrent-writer handling below were
reviewed as design cases, not represented as executed controls.

## Complete-design scenario sweep

The cases below are tabletop traces of the bound recommendation unless they
explicitly reference an executed control above. “Covered” means the design
provides a coherent decision, evidence owner, and recovery; it does not mean
future implementation has passed a test.

| Case | Required outcome in the recommendation | Decision |
| --- | --- | --- |
| First planning review; standing method not delivered | Bind the accepted bootstrap procedure; do not require a future living spec or silently improvise an absent method. | D4, D8 |
| Valid documentation-only change | Bind the applicability decision and actual artifacts; require neither an invented delta nor future Sync result. | D8 |
| Older change with no previous review | Owner begins prospective adoption with a producible current packet and honest history; no automatic retrofit. | D8 |
| Older change partway through review | Preserve actual findings/counters and unknown historical coverage; new content identity does not reset history. | D4, D7, D8 |
| Packet missing a material input | Record diagnostic observations, but withhold readiness until the input is supplied and bound. | D4, D5 |
| Packet itself changes after review begins | Its digest no longer matches; retain old findings and rebind before a claim about the successor. | D4 |
| Current review output is still being written | The start header binds inputs; the output is not one of its own inputs. A later packet can bind the completed record. | D4 |
| Only a digest of old uncommitted input remains | State that the bytes are unavailable; do not claim historical reconstruction or closure. Current behavior can still be reviewed. | D4 |
| Material input drifts during review | Keep findings against the old snapshot; no clean result for new content. Resume the same frozen evaluation where possible. | D4, D7 |
| Result bookkeeping changes a reviewed task file | Make a successor snapshot and confirm the exact delta; no inherited independent result for a different head. | D4, D8 |
| Planning versus Apply versus Sync | Use different authorized sets and evidence producers; tracking's union is not current-phase permission. | D2, D8 |
| Allowed planning edit with no other changes | Full-domain comparison permits the scoped edit; it does not reject an otherwise conforming packet. | D2, D3; executed planning-path control |
| Outside edit to already-dirty user work | Content comparison detects the extra edit despite identical status; preserve and reconcile rather than claiming unchanged work. | D3; executed control |
| Committed, staged-only, unstaged, or untracked outside edit | Complementary head, index, working-content, and expanded inventories expose it before allowlist classification. | D3; executed controls |
| Deleted or renamed entry | Compare the union of inventories, including old and new endpoints, rather than enumerating only surviving files. | D3 |
| Empty directory versus hidden nested file | Empty organizational directory is harmless; recursively classify actual content. | D3; executed hidden-file control |
| Ignored generated cache versus ignored material input | Exclude only by justified applicability; do not exempt an input, deliverable, or protected user file because it is ignored. | D3; executed ignored-file control |
| Symlink, submodule, unreadable/nonregular entry, or secret | Use type-appropriate observation without following an out-of-scope link or disclosing secrets; name a material unsupported-input gap. | D3 |
| Concurrent edit or transient edit fully undone | Detect checkpoint drift where observable; state the limitation and avoid claims about unobserved events or another writer's intent. | D3, D4 |
| Implementation HEAD differs from base/default branch | Expected implementation commits are not an error; refresh/reconcile relevant authority, without requiring head equality. | D4 |
| Default branch moves or an older base is deliberately pinned | Review relevance and explicit compatibility; withhold dependent readiness if justification is absent. | D4 |
| External issue/Project unavailable or newly inconsistent | Preserve local evidence, name the owning authority and dependent gate, and request authorized reconciliation. Local analysis may continue. | D4, D7 |
| New change has no need to edit every allowed path | Record an evidence-backed no-edit reconciliation rather than manufacture a diff. | D2, D5 |
| New mechanism introduced by a correction | Revisit its complete data/control path, error behavior, trust boundary, and affected consumers, not just the original complaint. | D5, D6 |
| Registry lists all author's chosen consumers but omits an actual caller | Independently discover callers/inputs and compare with the map; a populated map is not proof of completeness. | D1, D5, D6 |
| Tests pass while cited behavior is wrong | Keep structural/regression success scoped; require behavior-specific evidence and reject vacuous observation. | D5, alternatives and limits |
| Review class inapplicable, incomplete, or unswept | Explain inapplicability; explicitly record missing coverage; incomplete applicable coverage prevents a clean conclusion. | D5 |
| Finding renamed, repeated on another line, or reported by another reviewer | Link the original ID/alias and underlying claim; do not erase persistence or repair count. | D6, D7 |
| Finding corrected without evidence | Status remains corrected-unverified, not closed. Review the correction's consequences against the successor. | D6 |
| Owner accepts a finding versus accepts a residual risk | Validity acceptance is not risk acceptance; only a specific, permitted owner risk decision can affect that gate, and it is not a fix. | D6 |
| External ownership and repair-induced cause overlap | Record ownership and cause separately; neither label conceals the other or erases a blocking prerequisite. | D6, D7 |
| Pure style observation versus low-labelled material impact | Record both; only the material impact triggers correction. Do not raise the materiality threshold. | D5, D6; retained materiality contract |
| False reviewer premise | Reject/correct it with authority evidence; do not implement a compensating defect. | D6, D7 |
| Second repair to the same claim, including different lines | Design review precedes the second repair; a relabelled incomplete correction cannot authorize endless retries. | D7 |
| Third evaluation with some external evidence unavailable | Diagnose demonstrated causes now, finish available coverage, record the remaining dependent gap; no ordinary fourth loop. | D7 |
| Third evaluation shows only latent omissions or is clean | Complete the missing coverage and disposition real problems; do not force an unnecessary redesign or invent findings. | D7 |
| Interrupted review resumes on the same frozen input | Keep its number; new snapshot, new chat, or renamed claim alone does not reset the series. | D7 |
| Owner genuinely changes intended behavior | Record a new approved decision and explicit series relationship; preserve unchanged-component history and stricter active limits. | D7 |
| Selected glossary transfer missing or conflicts with destination | Preserve source/user work and pause or reconcile only selected hunks; verify destination before dependent tasks. | D8 |
| A transferred unpublished glossary claim needs correction | Correct only accepted selected additions while retaining source/rationale; wider delivered-definition edits need scope authority. | D8 |
| Registration or permission fails | Preserve inputs and pause dependent work at the existing gate; no unregistered substitute. | D8 |
| Method creation, assistant links, and workflow links | Produce the method before callers; each task proves its own result, not a successor's edit. | D8 |
| Task completion, Verify, delivery, Sync, Archive, and cleanup | Complete Apply before its gate; delivery evidence follows closure; Sync and later actions own their own results and exact-resource checks. | D8 |
| Local snapshot offered as independent-review input | Do not call it compatible: the installed protocol requires regular blobs at the committed head. | D4 |
| Independent reviewer has a fresh session but prior history remains visible | Report actual assurance; do not claim unsupported inaccessibility. Keep the fixed request and host reconciliation separate. | D4 |
| Independent profile unavailable, weaker than required, or bound to an old head | Pause the selected gate or obtain a genuinely new result as applicable; do not silently substitute self-review or choose the human-only option. | D4 |
| Abort before delivery; method has inbound links | Restore/remove authorized callers before removing their method; preserve user work and the attempted-review evidence. | D9 |
| Rollback after other changes adopt the delivered contract | Use scoped, gated follow-up and compatible consumers; do not delete a live policy or waive the selected assurance. | D9 |

## Coverage by analytical class

| Existing default class | Final result | Evidence checked for this design |
| --- | --- | --- |
| Consumer and reverse-direction coverage | swept-clean | D1 ownership map; D5 independent discovery; all historical IDs; D8 task and phase consumers; rollback's inbound links. |
| Evidence ownership and producibility | swept-clean | D2–D5 boundary/input/output distinctions; executed Git controls; task evidence and independent-package producers. |
| Task sequencing and safe intermediate states | swept-clean | D8 dependency chain, method-before-links, transfer-before-glossary, moved delivery task, and Sync ownership. |
| Lifecycle, recovery, and abort | swept-clean | D4 drift/unavailable inputs; D7 exits; D8 permissions/transfer; D9 pre-/post-delivery rollback. |
| External-state validity | swept-clean | Live read-only issue/API observations in the source register; authority freshness and permission cases. Future owner approval is explicitly absent. |
| Repeated-claim and restatement consistency | swept-clean | D1 reference ownership, remaining real equalities, phase inventory versus authorization, materiality and history carried across D4/D6/D7. |
| First-run, empty, absent, partial, repeated, already-complete | swept-clean | Bootstrap, docs-only, grandfathering, missing packets, directory contents, interrupted evaluations, no-edit paths, and already-delivered consumers. |
| Authority and citation correctness | swept-clean | Existing workflow/configuration, original findings and source testimony, installed independent-review protocol/result contract, official Git references. Historical estimates remain estimates. |

The scope is the recommendation's internal design coherence and compatibility
with the inspected sources. There is no implemented new method, no independent
execution, and no empirical measurement of improved review convergence yet.

## Repository checks

The existing checks were run on the unchanged implementation/planning artifacts:

| Command | Observed result |
| --- | --- |
| `node --test scripts/validation/test/*.test.mjs` | 41 passed, 0 failed. |
| `node scripts/validation/validate-no-hardcoded-environment.mjs` | Passed for its configured roots: docs, quality, schemas, scripts, and .github. This does not claim that it scans these planning records. |
| `node scripts/validation/validate-tracking.mjs openspec/changes/establish-streamlined-review-readiness/tracking.yaml` | Passed. |
| `node scripts/validation/validate-openspec-artifacts.mjs openspec/changes/establish-streamlined-review-readiness` | Passed. |
| `openspec validate --all --strict` | 9 items passed, 0 failed. |
| `git diff --check` | Passed for the tracked diff; new documents receive their own link/whitespace checks. |

An ID extraction compared the recommendation with the actual finding tables:
all 18 pass-1/self-review IDs, 14 pass-2 IDs, and 16 pass-3 IDs were present.
IF-1 through IF-4 are also explicitly accounted for. This checks traceability,
not closure of the original findings.

## Final disposition

The complete bound recommendation was traced through every case above and all
eight default classes. DR-01 through DR-04 have coherent resolutions in the
final design, with no remaining material design finding identified in this
self-review. This closes those draft-design concerns only; their corresponding
implementation and artifact checks remain future obligations.

The final recommendation digest still matches the pre-sweep copy. All 25 local
links in the recommendation and the link in this record resolve. Neither new
document has trailing whitespace. The after-snapshot contains 207 paths: all
205 original paths have unchanged content/type/mode, and the only additions
are these two documents. HEAD and the original packet digest are unchanged;
the real Git index has no staged changes. This preservation check covers the
declared tracked/nonignored-untracked domain, not every ignored or external
file or unobserved transient operation.

The evidence supports a design ready for the owner's decision, not a guarantee
against every future defect. Existing tests cannot prove cross-document
semantics, and no improved convergence rate has yet been measured. The next
authorized work is the recommendation's bounded migration: accept the design,
reconcile issue/artifact obligations, demonstrate each historical finding's
outcome, and return to the existing Planning-to-Apply gate. No original finding
or human gate is closed by this record.
