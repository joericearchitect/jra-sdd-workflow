# Handoff — establish-streamlined-review-readiness after pass 3

**Date:** 2026-09-08
**Change:** `establish-streamlined-review-readiness` (issue #33)
**Repository:** this repo only (`jra-sdd-workflow`)
**Phase:** Propose. Apply is not authorized.
**Status:** Apply-ready is withheld. The contract's own third-pass stop and
second-repair stop both fire. The next session starts in **design
reconciliation**, not another local correction.

This handoff is planning context. It does not authorize Apply, a pull request,
GitHub mutation, or a third repair of the boundary-observer claim.

## Why pass 3 still found issues

The pass-2 correction did what its written surface list said, and only that.
Pass 3 is the first complete sweep of this binding (issue #33 was readable).
Sixteen material findings are open.

Three reasons, not one:

1. **The list was incomplete.** The last close-out method was “walk the
   pre-edit list, then claim closed.” Surfaces not on that list still carry
   old facts: the packet’s Prior findings section still ends at pass 1; task
   2.2’s evidence still requires a link that 2.1 adds later; the path-set
   fan-out still omits `review-packet.md`; the correction record is cited and
   unbound.
2. **Two listed fixes created new problems.** Replacing `git status --short`
   with a listing of *planning-boundary* files cannot see the implementation
   tree and states a false claim at task 4.2. Moving task 2.2 before 1.1/2.1
   left 2.2’s evidence pointing at 2.1’s output.
3. **Reading issue #33 exposed what pass 2 could not see.** Class 5 was
   partial then. The recorded equality “issue #33 in-scope list =
   `tracking.yaml` paths” does not hold without reinterpreting the issue’s
   prose. An acceptance criterion also requires every change to have a packet
   index, which this contract deliberately does not require of older changes.

The pattern has not changed shape: a correction is closed against the surfaces
it remembered to list, and the next pass finds the rest plus the damage the
correction introduced.

Unlike pass 2, **the second-repair stop now fires with no owner judgment
call.** The claim “no path outside the mutation boundary changed, and here is
the check that observes it” failed evidence producibility in pass 2
(`rr-status-vacuous`), was repaired once, and failed the same class again
(`p3-boundary-observer`). Requirement 8’s exit is design review, not a third
fix of that claim.

Requirement 9 (third-pass stop) is also engaged. Precedence 1: repair-induced
root facts exist (RF-2, RF-6), so the change returns to design reconciliation
**before further edits**.

## What the next session must not do

- Do not start Apply.
- Do not run a fourth review pass as an ordinary next step.
- Do not apply another local wording patch to `tasks.md` 4.2 / Verification
  Strategy’s observer. That is the third fix the stop forbids.
- Do not treat “add more generic spec paragraphs” as the repair.
- Do not fold the four unrelated active changes into this one.
- Do not edit `reusable-skills`, validators, living specs, or campaign
  ledgers.
- Do not edit the plan file at
  `~/.cursor/plans/pass-2_design_pause_dc5a394f.plan.md`.

## What the next session must do first

**Design reconciliation**, owner-directed, recorded before any artifact edit.
The question is not “how do we patch the sixteen findings.” The question is:

**How does this change observe “no path outside the mutation boundary
changed” at Propose (planning files only) and at Apply (implementation paths
edited), without a third repair of the same claim?**

Settle that, then one human-authorized batched response for the remaining
root facts, with a surface list written *before* editing and filled *after*.
Requirement 9 still forbids rewriting sound artifacts merely because earlier
coverage was incomplete.

Issue #33 findings are `external-state`: report them to the issue owner and
realign only under explicit authorization. They do not authorize a local
invented path list.

## Bound identity (do not review a moving tree)

Base: `1963c872178d3e563aa5cb8b3f4607066732a3b0` (matched `HEAD` and
`origin/main` at pass 3).

Packet: `openspec/changes/establish-streamlined-review-readiness/review-packet.md`

Index digest at pass 3 (unchanged from the pass-2 rebind):
`6442a766b314935c218e7d2749415f88d4ef049def8f92f060cec01f72c2f84a`

Member digests are in that packet. If any file has moved since pass 3, rebind
before treating pass 3 as current.

Standing method `docs/review/adversarial-review.md` does not exist yet. A
reviewer substitutes the eight-class method in `design.md` and records that.

## Authoritative records (read these, in this order)

1. This handoff.
2. `ai-planning/review-records/2026-09-08-establish-streamlined-review-readiness-pass-3.md`
   — sixteen findings, ten root facts, stop diagnosis. **This is the current
   review result.**
3. `ai-planning/review-records/2026-09-08-establish-streamlined-review-readiness-pass-2.md`
   — fourteen findings, all still marked `Open` by identity. Pass 3 says none
   of them received a disposition.
4. `ai-planning/review-records/2026-09-08-establish-streamlined-review-readiness-pass-2-correction.md`
   — what the last correction listed and closed by surface. Incomplete as a
   finding-disposition record.
5. `ai-planning/review-records/2026-09-08-establish-streamlined-review-readiness-pass-1.md`
6. The change directory:
   `openspec/changes/establish-streamlined-review-readiness/`
7. Issue #33 (read live). Project: `SDD Workflow Board`, status `Todo`.

The design brief is **superseded input**, not a conflict authority:
`ai-planning/design-briefs/streamlined-review-readiness-and-convergence.md`.

Witness testimony (cited evidence, bound by digest):
`ai-planning/notes/2026-09-08-review-readiness-witness-testimony.md`.

## Isolation

Preserve in place, do not commit, delete, or fold in:

- `openspec/changes/add-docs-issue-template/`
- `openspec/changes/add-tracking-schema-examples/`
- `openspec/changes/align-issue-template-labels/`
- `openspec/changes/resolve-pr-validation-signal/`
- that change’s implementation branch and secondary worktree
- modified `ai-planning/to-dos/future-enhancements.md`

Do not invent issue URLs. Do not mutate GitHub without explicit authorization
in the new session.

## Owner decisions still open

Pass 3 requires these before a correction may start:

1. **Design review of RF-2** (boundary observer). Required by the second-repair
   stop. Do not patch 4.2 a third time without this.
2. **Dispositions by finding identity** for all sixteen pass-3 findings and
   the fourteen still-`Open` pass-2 findings. The last closure table was keyed
   by root fact and surface, never by finding ID. Requirement 6 and 11 need
   the IDs.
3. **Issue #33** (RF-7): whether to realign the in-scope list to literal paths
   matching `tracking.yaml`, and whether to qualify the “each change carries a
   packet index” acceptance criterion with the grandfather rule. Needs
   explicit GitHub authorization.
4. **IF-4 glossary text** (RF-1): `independent reviewer` and `same-session
   local review` exist only in the primary worktree. Task 0.1 creates a clean
   delivery worktree from `main`, where they are absent. Decide how that text
   reaches Apply without silent loss or parallel re-authoring.
5. **Pass 2’s stop question** (correction-closure component vs claim-keyed
   unit) is **overtaken**. Pass 3’s RF-2 fire is unambiguous. Still record a
   disposition on the pass-2 findings so they are not left `Open`.

Locked calls from the pass-2 pause still stand unless the design review
overturns them: older in-flight changes stay exempt until their owner starts
a post-delivery review; planning vs implementation boundary split; testimony
quoted as “mostly different rows,” not “three unrelated claims.”

## Pass 3 findings (short)

Change-local (this change owns the repair, after design reconciliation):

| ID | Sev | Prov | One-line problem |
| --- | --- | --- | --- |
| `p3-glossary-stranded` | high | latent | IF-4 glossary text will not be in the delivery worktree; 2.3 cannot “keep” it there. |
| `p3-boundary-observer` | high | repair-induced | Named listing of planning files cannot prove no implementation/outside path changed. **Stop fires here.** |
| `p3-prior-findings-stale` | high | carried | Packet Prior findings ends at pass 1; pass 2 findings have no per-ID dispositions. |
| `p3-correction-record-unbound` | med-high | latent | Correction record is cited and unhashed; binding chain ends in a moving object. |
| `p3-manifest-unproducible` | medium | latent | Packet member 3 (changed-path manifest) cannot be produced at Propose. |
| `p3-task-0-1-unmapped` | medium | latent | Task 0.1 has no consumer-map row. |
| `p3-2-2-forward-evidence` | medium | repair-induced | 2.2 evidence requires a 2.1 link that does not exist when 2.2 runs. |
| `p3-boundary-not-on-fanout` | medium | latent | Packet restates the path set; fan-out row omits it. |
| `p3-issue-authorization-survives` | medium | repair-induced | Packet still credits pass 1 with aligning to the current path set. |
| `p3-index-digest-window` | low | latent | “Review record for the bound pass” cannot exist until the pass ends. |
| `p3-brief-divergences-unlisted` | low | latent | Supersession table misses several brief-versus-change divergences. |
| `p3-config-paraphrase` | low | latent | Design overstates `openspec/config.yaml` living-spec rule. |
| `p3-c17-requirement-ids` | low | latent | C17 omits requirement 1 for isolation/reviewer-kind. |
| `p3-dir-carveout` | low | latent | Directory carve-out hides unlisted content (e.g. `.claude/`). |

External-state (issue owner, not a local invented fix):

| ID | Sev | Problem |
| --- | --- | --- |
| `p3-issue-path-prose` | medium | Issue scope is eight paths plus prose, not the nine-path set. |
| `p3-issue-index-criterion` | medium | Acceptance criterion requires every change to have an index; C21 exempts older ones. |

## Requirement 9 responses already diagnosed (do not re-derive)

1. RF-2, RF-6 → design reconciliation before further edits.
2. RF-7 → stabilize or realign issue #33 under its owner.
3. No reviewer-error root facts.
4. RF-3 → record the missing owner decision and per-ID dispositions.
5. RF-1, RF-4, RF-5, RF-8, RF-9, RF-10 → one human-authorized batch after (1);
   RF-1 is the only one that needs more than a bounded edit.

## Suggested first prompt for the new session

> Read `ai-planning/handoff-docs/2026-09-08-review-readiness-pass-3-handoff.md`
> and the pass-3 review record it names. Propose only. Do not Apply, do not
> edit product code, do not mutate GitHub unless I authorize a specific issue
> edit, do not create a PR, do not touch reusable-skills. Do not start a
> fourth ordinary review pass. Do not apply a third fix to the boundary
> observer on `tasks.md` 4.2.
>
> Start with design reconciliation of RF-2 (how we observe mutation-boundary
> integrity at Propose vs Apply). Record the decision, then wait for my
> authorization before editing artifacts.

## Ground rules that still apply

Manual first. No hardcoded environment values. Every gate ships with its
exit. Second repair means design review. Proportion.

Before any later delivery (not this session):

```bash
node --test scripts/validation/test/*.test.mjs
node scripts/validation/validate-no-hardcoded-environment.mjs
node scripts/validation/validate-tracking.mjs openspec/changes/establish-streamlined-review-readiness/tracking.yaml
node scripts/validation/validate-openspec-artifacts.mjs openspec/changes/establish-streamlined-review-readiness
openspec validate --all --strict
```
