## Why

PF3 has completed implementation and lifecycle-record delivery, but the
campaign records still present it as active and keep candidate 1 blocked. This
follow-up records the required evidence-gated campaign-preflight recheck so the
roadmap reflects the durable default-branch state.

The primary intake record is [GitHub issue #15](https://github.com/joericearchitect/jra-sdd-workflow/issues/15).
This proposal creates planning artifacts only and does not authorize Apply or
any GitHub mutation.

The scope is limited to campaign planning records and their durable evidence.
Compatibility is preserved because no workflow or validator behavior changes.
Security is preserved by treating GitHub output as evidence only and storing no
credentials or environment-specific workflow defaults.

## What Changes

- Recheck the disposition's campaign-entry gate using the durable PF1–PF3
  issue, PR, archive, observation, validation, and default-branch evidence.
- Update the campaign roadmap's PF3 delivery row and current state; transition
  candidate 1 from `Blocked` to `Not started` only when that recheck passes.
- Add one sanitized observation that records the recheck inputs, result,
  recovery lesson, and preservation of candidate 1's existing GitHub issue and
  Project state.

## Capabilities

### New Capabilities

None. This change does not add a durable observable capability.

### Modified Capabilities

None. This change does not modify an existing living-spec requirement.

The change declares `skip_specs: true` because it corrects campaign planning
records and evidence only. If investigation finds a durable workflow behavior
change, stop and propose that capability separately.

## Non-Goals

- Change candidate 1's GitHub issue or Project status, begin its Explore, or
  mark it `In progress`.
- Reopen, modify, or re-deliver PF3; change validators, workflow behavior, or
  living specifications.
- Create a controller, automate a campaign transition, or infer missing
  external-state evidence.

## Impact

The affected surfaces are the dogfood roadmap and observation ledger. The
follow-up preserves compatibility and adds no dependency, API, or migration.
Issue, PR, Project, branch, and commit values are discovery evidence for this
run, not portable workflow defaults; no credentials are stored.

## Reuse Plan

Reuse the existing preflight disposition, PF1–PF3 archived records, delivery
links, validation commands, and campaign roadmap/observation formats. No new
counter, helper, lifecycle engine, or integration is introduced.
