# Dogfood preflight review disposition

Record ID: `DRR-2026-09-03-01`
Date: 2026-09-03
Reviewed revision: `5209334` on `main`
Decision owner: repository owner
Decision recorded: 2026-09-03T21:34:07Z

This is a historical decision record, not a live status tracker. GitHub Issues
and the dogfood roadmap own current work state. OpenSpec changes own the design
and implementation decisions for each accepted repair.

## 1. Problem and desired outcome

The pre-campaign review arrived as temporary model output. That format was
useful for exchanging feedback, but it is intentionally ignored and is not
durable repository evidence. Independent inspection and reproduction confirmed
several findings that would make candidate 1 unreliable or cause later
documentation-only candidates to deadlock.

The desired outcome is a concise, checked-in disposition that preserves the
verified conclusions, records disagreements, and defines evidence-gated work
that must finish before candidate 1 starts.

## 2. Evidence and key findings

Durable sources reviewed:

- [Dogfood roadmap](../plans/dogfood-10-changes.md)
- [Dogfood observation ledger](../plans/dogfood-observations.md)
- [SDD workflow](../../docs/sdd-workflow.md)
- [OpenSpec configuration](../../openspec/config.yaml)
- [Tracking schema](../../schemas/openspec-tracking-v1.schema.json) and
  [tracking implementation](../../scripts/validation/lib/tracking.mjs)
- [Artifact rules](../../quality/openspec-artifact-rules.json) and
  [artifact validator](../../scripts/validation/validate-openspec-artifacts.mjs)
- [PR template](../../.github/pull_request_template.md),
  [PR contract validator](../../scripts/validation/validate-pr-contract.mjs),
  and [linkage validator](../../scripts/validation/validate-openspec-linkage.mjs)

The temporary Claude CLI review dated 2026-09-03 was used as untrusted review
input. It is not retained or cited as a durable source. The conclusions below
are based on repository evidence and independent reproduction:

| Evidence ID | Observation | Result |
|---|---|---|
| E1 | An object violating repository-name patterns, positive integer bounds, URI format, non-empty strings, and non-empty paths passed `validateTrackingObject`. | Confirms F6: the schema and JavaScript contract have drifted. |
| E2 | A no-spec change with `skip_specs: true` passed strict OpenSpec validation but failed the custom artifact validator's unconditional `spec.exists` rule. | Confirms F2: documentation-only changes have incompatible gates. |
| E3 | Exact headings and per-task metadata required by the artifact validator are not named in the assistant-facing OpenSpec rules or contributor workflow documentation. | Confirms F1, with the review's blank-template failure count treated only as a risk illustration. |
| E4 | `- Issue: #1` failed the PR contract and `- Issue: Closes #1` passed. | Confirms F3 as a template defect, not a planning blocker. |
| E5 | The only Node tests cover the portability validator; the tracking parser and artifact validator have no direct regression tests. | Confirms F5. |
| E6 | A behavioral requirement containing “create `tracking.yaml` documentation” was rejected as an implementation task. | Confirms F8. |
| E7 | `requiresOpenSpecValidation` is returned by the linkage validators but has no consumer, while CI always runs strict OpenSpec validation. | Confirms F7 as low-priority dead state. |
| E8 | Generated assistant copies materially outweigh authored workflow surfaces. Counting those copies in the product denominator makes the three-times support threshold unlikely to fire. | Partially confirms F9; the roadmap disclosed the classification, so there was no hidden exemption. |
| E9 | Four candidates are documentation-focused; multi-repository parsing, ambiguous archive selection, and a controlled rollback are not exercised. | Confirms C1. |
| E10 | The two-PR lifecycle follows the current archive policy but costs twenty PRs for ten candidates. | Accepts C2 as a campaign measurement, not a preflight defect. |

The claim that baseline revision `39e3e7f` was stale is rejected: the
observation ledger intentionally identifies the pre-campaign baseline.

## 3. Options considered and tradeoffs

1. Commit the raw model review. This preserves exact provenance, but also gives
   durable weight to tool-specific verbosity, superseded claims, and
   unreproduced assertions.
2. Keep only a short observation-log entry. This is compact, but it cannot
   carry finding-level dispositions, acceptance evidence, or future
   traceability without overloading the campaign ledger.
3. Keep raw reviews as temporary scratch and commit a review disposition
   record. This loses the verbatim transcript by design while preserving the
   verified facts, disagreements, decisions, and resulting work.

Option 3 is selected.

## 4. Decisions, assumptions, and owner

Owner-confirmed decisions:

- Raw LLM review output remains temporary scratch and is not durable repository
  evidence.
- Durable review records preserve verified findings and their disposition,
  not verbatim model output.
- The accepted preflight repairs below must be completed and reviewed before
  candidate 1 enters Explore.

Approval evidence: repository owner, 2026-09-03T21:34:07Z. Decision digest:
`sha256:da2cea1f9f3394ec94a2ed2a8301f6d0b4e745ddce02f4db06360bc6d0b9bb1f`.

| Review item | Disposition | Consequence |
|---|---|---|
| F1 | Confirmed | Repair in PF2 before candidate 1. |
| F2 | Confirmed blocker | Repair in PF2 before candidate 1. |
| F3 | Confirmed, non-blocking by itself | Repair in PF3 before the first campaign PR. |
| F4 | Valid self-containment cleanup, not an authorization defect | Remove the foreign term in PF3. |
| F5 | Confirmed | Add direct tests with the related PF1 and PF2 behavior. |
| F6 | Confirmed blocker and highest priority | Repair in PF1 before candidate 1. |
| F7 | Confirmed, low priority | Candidate 7 will resolve whether the signal is enforced or removed. |
| F8 | Confirmed | Repair and test in PF2. |
| F9 | Partially confirmed | Make the proportion checkpoint falsifiable and correct README claims in PF3. |
| F10 | Resolved by owner policy | Ignore raw reviews; preserve this disposition instead. |
| C1 | Confirmed | Rebalance candidates and add explicit coverage in PF3. |
| C2 | Accepted observation | Measure the two-PR cost during the campaign; do not redesign it before evidence accumulates. |
| Baseline revision finding | Rejected | Preserve `39e3e7f` as the intentional pre-campaign baseline. |

Assumptions:

- The `../scratch` ignore rule is intentional local hygiene.
- This record authorizes only the planning-document edits that create and link
  it. It does not authorize GitHub mutation, an OpenSpec proposal, Apply, merge,
  Sync, Archive, or candidate 1.
- Proposed preflight change names are planning identifiers until their issue
  and OpenSpec records exist.

## 5. Scope, non-goals, constraints, dependencies, and risks

### Required preflight changes

Run the following as three serial, independently reviewable changes. Each gets
its own GitHub issue, OpenSpec change, implementation PR, lifecycle record, and
observation entry under the normal workflow. Do not create those records from
this decision document.

#### PF1 — `align-tracking-contract` (F5, F6)

Make the JSON schema authoritative for portable tracking shape and value
constraints. Treat the unsafe-field check as an explicit repository security
policy layered on that schema, rather than an undocumented competing schema.

Concrete edits:

- State that authority and the security extension in a top-level schema
  `$comment`, a validator code comment, and the eventual tracking
  documentation.
- Update `scripts/validation/lib/tracking.mjs` so it enforces every current
  schema constraint: non-empty change and branch values, exactly one
  owner/repository separator, positive integer issue and Project numbers, URI
  syntax, at least one implementation repository, at least one non-empty path,
  and integer rather than generic number semantics.
- Add direct parser and validator tests covering a valid document, every
  constrained invalid value, expected-change mismatch, unsafe fields,
  malformed YAML, parsing/stringifying round trips, and stable issue paths.
- Keep the implementation proportional. Do not add a general YAML or JSON
  Schema engine unless Explore demonstrates that focused validation cannot
  keep the declared contract enforceable.

Exit evidence:

- The previously accepted invalid object fails for each relevant constraint.
- The valid fixture and round trip pass.
- Parser failures exit non-zero with a bounded diagnostic rather than a stack
  trace or partial normalized result.
- Focused tests and the complete repository validation set pass.

Recovery: revert PF1 as one scoped change. If a second repair to tracking
parsing or validation is needed, stop for design review before another fix.

#### PF2 — `align-artifact-quality-gates` (F1, F2, F5, F8)

Make assistant instructions, custom validation, and standard OpenSpec
validation describe one satisfiable artifact contract.

Concrete edits:

- Add the exact required proposal and design heading names and the literal
  `Depends on:` and `Evidence:` task metadata to the appropriate rules in
  `openspec/config.yaml`; document the same shape in `docs/sdd-workflow.md`.
- Update `validate-openspec-artifacts.mjs` to read the change's
  `.openspec.yaml`. Permit an absent `specs/` tree only when
  `skip_specs: true`; continue validating any specs that are present, and keep
  requiring a delta spec when the flag is false or absent.
- Narrow the implementation-task heuristic so normal behavioral requirements
  may mention creating, editing, renaming, or deleting a named artifact.
- Add direct artifact-validator tests for all required sections and metadata,
  both branches of `skip_specs`, malformed or unsupported change metadata,
  completed-task evidence, and the reproduced behavioral false positive.
- Document a correction path for each new or clarified gate.

Exit evidence:

- Assistant-facing OpenSpec instructions expose the exact strings enforced by
  the custom validator.
- One minimal documentation-only fixture passes both the custom validator and
  strict OpenSpec validation with `skip_specs: true`.
- The same fixture fails with stable guidance when the flag is absent or false.
- A genuine implementation-task-shaped requirement fails, while the reproduced
  behavioral sentence passes.
- Focused tests and the complete repository validation set pass.

Recovery: revert PF2 as one scoped change. If a second repair to artifact-gate
semantics is needed, stop for design review.

#### PF3 — `make-dogfood-entry-coherent` (F3, F4, F9, F10, C1 and minor findings)

Bring the campaign entry documentation and templates into line after PF1 and
PF2 have made documentation-only changes valid.

Concrete edits:

- Change the PR template linkage prompt to lead authors to
  `Closes #<issue-number>` and retain `OpenSpec change: <change-name>`; include
  the lifecycle-record alternative `Related to #<issue-number>` in guidance.
- Remove `prototype-rapid` from the roadmap and state its local risk and
  recovery assumptions directly.
- Measure supporting machinery against authored product surfaces; report
  generated assistant copies separately and exclude their duplicated lines
  from the three-times checkpoint denominator.
- Correct README claims that the generated integrations are thin pointers and
  that Aider is supported unless a corresponding integration exists.
- Add tracking validation to the delivery command lists in `AGENTS.md` and
  `CLAUDE.md`.
- Remove the empty, unused `dogfood-command-log.txt`; the sanitized observation
  ledger remains the campaign evidence sink.
- Rebalance the campaign: replace candidate 7 with
  `resolve-pr-validation-signal`, whose Explore decides whether
  `requiresOpenSpecValidation` must be enforced or removed; replace candidate 9
  with a change that rejects ambiguous archived-change suffix matches; make
  candidate 8's positive case cover two implementation repositories and its
  negative case reject duplicate tracking keys; and require candidate 4
  Explore to define a bounded, approved label rollback rehearsal with its exact
  reversal evidence. If no safe disposable label operation exists, candidate 4
  must record that constraint and the roadmap must name another safe rollback
  rehearsal before the campaign starts.

Exit evidence:

- A body completed from the PR template passes the PR contract validator.
- The revised ten candidates still have useful outcomes, explicit non-goals,
  dependencies, acceptance evidence, and recovery.
- Candidate 1 is marked `Blocked` until PF1–PF3 are durable, then returns to
  `Not started`; it changes to `In progress` only when Explore begins, and issue
  #1 is reused rather than duplicated.
- The authored-product/support ratio and generated-copy count are separately
  reproducible.
- Documentation review finds no unsupported assistant or adapter claim.
- The complete repository validation set passes.

Recovery: revert only the PF3 documentation/template change. External rollback
rehearsal mutations require their own preview and just-in-time authorization;
PF3 itself performs none.

### Campaign entry gate

Candidate 1 may enter Explore only when:

1. PF1, PF2, and PF3 have completed their normal delivery and lifecycle record;
2. their GitHub issues, OpenSpec tracking, PRs, archived changes, and observation
   entries agree;
3. the complete validation set passes at the resulting default-branch commit;
4. no accepted blocking finding remains open; and
5. the roadmap records the evidence and changes candidate 1 from `Blocked` to
   `Not started`.

Traceability for each repair is:

```text
DRR-2026-09-03-01 / PF item
  -> GitHub issue
  -> OpenSpec change and tracking.yaml
  -> implementation PR
  -> lifecycle-record PR
  -> archived change and dogfood observation
```

Scope is limited to the review disposition, these three preflight changes, and
the campaign entry gate. Non-goals are retaining raw model output, creating a
controller, automating campaign transitions, changing the two-PR policy before
measurement, or starting candidate 1 from this record.

Dependencies are PF1 before PF2, and PF2 before PF3. Primary risks are creating
disproportionate validation machinery, obscuring rollback by bundling unrelated
code, or treating this historical record as live state. The serial grouping and
roadmap/issue ownership boundaries mitigate those risks.

## 6. Open questions and blocking decisions

No question blocks committing this disposition. These decisions belong to the
named preflight Explore steps and must be resolved before their Propose steps:

- PF1 must choose the smallest dependency strategy that keeps the schema and
  validator aligned.
- PF3 must identify an exact disposable label and reversal procedure before
  seeking authorization for a rollback rehearsal; absence of a safe target is
  a planning blocker, not permission to mutate a real label speculatively.
- Proposed issue numbers and final OpenSpec names remain unknown until intake.

## 7. Recommended next step

Commit this record and its roadmap/observation links as planning documentation.
Then use OpenSpec Explore for proposed preflight change
`align-tracking-contract`. Do not start candidate 1 and do not create OpenSpec
artifacts or GitHub records without the normal explicit authorization.
