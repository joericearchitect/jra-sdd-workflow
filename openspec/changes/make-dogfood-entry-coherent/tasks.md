## 1. Establish durable-spec and human-gate guidance

- [x] 1.1 Add the portable durable-observable-capability classification rule
  and documentation-only correction path to OpenSpec configuration and the
  workflow guide.
  Depends on: Proposal decision to use `skip_specs: true` and design decision 1.
  Evidence: `openspec/config.yaml` and `docs/sdd-workflow.md` agree that
  documentation, templates, tests, planning records, and internal details do
  not create a living spec by themselves, and name the Explore correction path.
- [x] 1.2 Define the three human gates, their entry evidence, authorized
  coverage, expiry conditions, exception pauses, and recovery paths in the
  workflow guide.
  Depends on: 1.1 and design decisions 2 and 4.
  Evidence: focused documentation review confirms no controller, automatic
  transition, force operation, broad deletion, or routine Gate 3 pause was
  introduced.

## 2. Align pull-request guidance with the existing contract

- [x] 2.1 Update the pull-request template to lead implementation PRs with a
  passing `Closes #<issue-number>` form and retain the lifecycle-record
  `Related to #<issue-number>` alternative alongside the OpenSpec marker.
  Depends on: Design decision 3.
  Evidence: a completed implementation body and a completed lifecycle-record
  body copied from the documented shape each pass `validatePrContract`.
- [x] 2.2 Add focused direct PR-contract test coverage for both accepted body
  forms and the rejected missing-marker case without changing validator policy.
  Depends on: 2.1.
  Evidence: the focused Node test passes and proves the existing validator
  behavior, including the lifecycle-record alternative.

## 3. Reconcile campaign-facing records

- [x] 3.1 Correct README support and generated-entry wording; add explicit
  tracking validation to `AGENTS.md` and `CLAUDE.md`; remove the empty command
  log while preserving the sanitized observation ledger as the evidence sink.
  Depends on: Design decision 6.
  Evidence: documentation review finds no unsupported Aider claim or “thin
  pointers” claim, both delivery command lists name `validate-tracking.mjs`
  with its explicit target, and no duplicate command-log file remains.
- [x] 3.2 Revise the dogfood roadmap with local risk, recovery, and
  external-state assumptions; the candidate 4 safe-rehearsal fallback; the
  rebalanced candidates 7–9; the manual measurement method; and the
  post-lifecycle-record campaign-entry recheck rule.
  Depends on: Design decisions 4 and 5.
  Evidence: roadmap review confirms no generic delivery profile remains,
  candidate 4 cannot mutate a real label speculatively, candidates 7–9 have
  the accepted outcomes, the measurement names exact inventory and result
  recording requirements, and PF3 lifecycle-record delivery rechecks the gate
  before changing candidate 1 from `Blocked` to `Not started`; `In progress`
  remains reserved for candidate 1's actual Explore.
- [x] 3.3 Perform and record the reviewed manual product/support measurement
  using unique checked path inventories and separate generated-entry counts.
  Depends on: 3.1 and 3.2.
  Evidence: the campaign ledger names the exact inventory paths, counting
  command, authored-product result, supporting-machinery result,
  generated-copy result, and three-times threshold conclusion without adding a
  measurement tool.

## 4. Verify planning and implementation evidence

- [x] 4.1 Run focused and complete validation: Node tests, portability,
  selected-change tracking and artifact validators, strict OpenSpec validation,
  and `git diff --check`.
  Depends on: 1.1, 1.2, 2.2, 3.1, 3.2, and 3.3.
  Evidence: each command exits successfully; PF3 retains `skip_specs: true`
  with no delta specs; and any unavailable external evidence is recorded as
  blocked rather than passing.
- [x] 4.2 Self-review the diff for portability, untrusted-input safety,
  least-privilege external-state boundaries, documentation coherence, and
  attribution/licensing impact; prepare Gate 3 evidence without delivering.
  Depends on: 4.1.
  Evidence: self-review findings and any first bounded correction are recorded;
  no credential, absolute path, external identifier default, executable issue
  text, or unapproved GitHub mutation is introduced.
- [ ] 4.3 At Gate 3, pause with the current reviewed head and verification
  evidence for a human decision. If the human selects independent review,
  obtain a fresh read-only review and, only if authorized, handle one in-scope
  objective-fix/test loop before requesting closure approval; otherwise record
  direct closure authorization for the exact head.
  Depends on: 4.2.
  Evidence: human Gate 3 decision identifies the reviewed head and verification
  evidence. When independent review is selected, its conclusion identifies the
  same head and evidence; any objective correction has affected and complete
  revalidation plus a fresh review, while a second same-component repair returns
  to design review.
