## Why

Candidate 1 cannot enter the dogfood campaign until the preflight guidance,
template prompts, and roadmap describe the already-approved manual workflow
coherently. PF1 and PF2 repaired the underlying tracking and artifact gates;
this documentation-only repair makes their use understandable and reviewable.

The primary intake record is [GitHub issue #12](https://github.com/joericearchitect/jra-sdd-workflow/issues/12).
This proposal creates planning artifacts only and does not authorize
implementation or further GitHub changes.

## What Changes

- Add repository guidance that limits living OpenSpec specifications to durable,
  observable capabilities and explains the documentation-only `skip_specs: true`
  path.
- Define the three human review gates, including their evidence, authorized
  work, expiry conditions, and exception pauses.
- Make the pull-request template teach the existing implementation and
  lifecycle-record linkage forms, with direct validator proof.
- Reconcile campaign documentation: support claims, delivery command lists,
  roadmap risks and candidate definitions, the manual product/support
  measurement, and the single evidence ledger.

The scope is limited to those repository-owned guidance, template, test, and
planning-record surfaces. Compatibility is preserved because existing validator
semantics and the selected workflow actions remain unchanged. Security is
preserved by retaining manual authorization boundaries, avoiding credentials in
records, and treating issue and pull-request text as untrusted data.

## Capabilities

### New Capabilities

None. This change does not add a durable observable capability.

### Modified Capabilities

None. This change does not alter an existing living-spec requirement.

The change declares `skip_specs: true` because it is documentation, template,
test, and planning-record coherence work. If implementation discovery finds a
genuine durable capability, that work must be paused and proposed separately.

## Non-Goals

- Create a living-spec delta, synchronize a new living specification, or
  redefine existing observable requirements.
- Add a controller, autonomous runner, automatic campaign transition, or a
  hidden CI policy.
- Mutate labels, candidate 1's GitHub Issue or Project state, or other GitHub
  state beyond the already-created PF3 intake record. The evidence-gated
  campaign-roadmap transition occurs only after PF3 is durably delivered.
- Add Aider support, broaden assistant support, or perform the candidate 4
  rollback rehearsal.

## Impact

Affected repository surfaces are OpenSpec configuration, workflow guidance,
the pull-request template and its focused validation coverage, README and
assistant guidance, and the campaign roadmap and observation records. Existing
validators retain their linkage behavior; the change corrects the template and
adds proof rather than weakening that contract.

Values that identify the repository, default branch, Project, labels, and
future temporary rehearsal label remain environment-discovered or
configuration-owned. The tracked PF3 issue is the current repository intake
evidence; it is not a portable workflow default. There is no API, migration,
or compatibility change.

## Reuse Plan

Reuse the existing PR contract and linkage validators, the delivered
documentation-only metadata support, the campaign roadmap and observation
ledger, and the established two-PR lifecycle guidance. Measure proportion with
a checked path inventory and line counts, not a new counter or controller.
