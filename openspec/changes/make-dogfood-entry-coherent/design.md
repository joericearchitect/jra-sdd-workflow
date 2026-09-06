## Context

See [proposal.md](proposal.md) for motivation. PF1 and PF2 made the
documentation-only and artifact-quality contracts usable, but the repository
still has inconsistent campaign-entry guidance: the PR template does not
produce a passing linkage body, README claims exceed checked integrations, and
the roadmap does not express the accepted preflight decisions. The existing PR
validators already accept both implementation and lifecycle-record issue
references; PF3 must teach and prove that contract instead of changing it.

The primary issue is #12. Its repository, Project, status fields, branch,
labels, and any future temporary rehearsal label are external state. They are
discovered at action time and are not portable constants in workflow assets.
Portability requires contributors to derive those values or obtain them from
configuration rather than copying them into reusable guidance.

## Goals / Non-Goals

**Goals:**

- Put the durable-capability classification rule in both the OpenSpec context
  and contributor-facing workflow guide.
- Make three human gates understandable, bounded, and recoverable without
  adding a lifecycle controller.
- Give authors a PR template that is directly provable against the existing
  linkage validator.
- Make campaign entry records honest about supported integrations, roadmap
  exercises, manual measurement, and external-state limits.

**Non-Goals:**

- Change living-spec behavior, PR/linkage validator semantics, CI policy, or
  issue-template labels.
- Create a generic metric tool, fixture framework, assistant integration, or
  rollback-rehearsal mutation.
- Apply tasks, open pull requests, merge, archive, or clean up resources.

## Decisions

1. **Documentation-only classification is explicit and duplicated at its two
   points of use.** `openspec/config.yaml` carries the concise repository rule;
   `docs/sdd-workflow.md` explains the contributor decision and correction
   path. PF3 retains `skip_specs: true` and no `specs/` directory. This is
   preferable to inventing a specification because the work changes process
   guidance, not a durable observable capability.

2. **Three gates are policy prose, not executable state.** The workflow guide
   will define entry evidence, the human decision, authorized work after each
   approval, expiration conditions, and return-to-review exceptions. Gate 3
   includes the fresh read-only independent review and one bounded
   objective-fix/test loop; it does not add routine pauses between delivery,
   Sync, Archive, lifecycle record, and exact cleanup. A controller or
   automatic status transition is rejected because it would violate the
   manual-first campaign.

3. **The template changes; validators do not.** The implementation prompt will
   lead with `Closes #<issue-number>` and `OpenSpec change: <change-name>`;
   lifecycle-record guidance will use `Related to #<issue-number>`. A focused
   Node test will exercise completed implementation and lifecycle-record bodies
   against `validatePrContract`, preserving the existing alternative. This is
   safer than loosening the validator to accept an incomplete prompt.

4. **Campaign recommendations become scoped roadmap facts.** Remove the
   generic `prototype-rapid` profile. Candidate 7 becomes
   `resolve-pr-validation-signal` and normally removes the dead return field;
   candidate 8 tests two distinguishable valid implementation-repository
   entries and a duplicate-key rejection; candidate 9 rejects zero and
   ambiguous archived suffix matches and accepts one exact canonical match.
   Candidate 4 records a dedicated, unreferenced disposable label only after
   fresh inspection. If none can be safely created and removed, the roadmap
   records that constraint and names another safe externally reversible
   rehearsal before candidate 1 begins.

5. **Proportion is measured manually with a checked path inventory.** At
   campaign checkpoints, count unique tracked workflow docs/configuration,
   validator and parser sources, schemas/rules, templates/workflows, and
   living specs as authored product; list any new helper, harness, or fixture
   that exists solely to support those paths as supporting machinery. Run
   `git ls-files` with the reviewed inventories, sort uniquely, then pass the
   resulting paths to `wc -l`; report generated assistant entries from their
   separate inventory. The ledger records the exact paths, counting command,
   result, and three-times review conclusion. A committed counter or controller
   is explicitly rejected.

6. **Support claims describe checked-in evidence.** Remove the unsupported
   Aider claim and replace “thin pointers” with wording that accurately
   describes generated assistant-specific workflow entries. Add the explicit
   tracking validator invocation to both delivery command lists and remove the
   empty duplicate command log so the sanitized observation ledger is the sole
   campaign evidence sink.

## Verification Strategy

- Add direct tests proving both completed PR body forms pass the existing PR
  contract validator; retain a missing-marker rejection.
- Run the repository Node test suite, no-hardcoded-environment validator,
  selected-change tracking and artifact validators, strict OpenSpec validation,
  `git diff --check`, and a focused documentation/template review.
- Confirm PF3 declares `skip_specs: true` and has no delta specs.
- Re-run the manual path inventory and line-count command from the reviewed
  exact inventories; report generated copies separately and assess the
  supporting/product threshold.
- Before delivery, obtain a fresh read-only independent review of the current
  head. Any in-scope objective finding gets one bounded fix and affected/full
  revalidation, followed by a fresh independent review.

## Attribution and Licensing

PF3 adapts repository-owned documentation, templates, validators, and campaign
records only. It adds no third-party dependency, copied external content, or
generated integration refresh. No licensing or attribution change is expected.

## Recovery

- **Gate 1 — Explore to Propose:** entry requires a named explored change with
  practical answers for scope, non-goals, evidence, recovery, and external
  hazards. The human approves planning-artifact creation. If facts or scope
  drift, return to Explore; do not create partial artifacts from stale facts.
- **Gate 2 — Planning to Apply:** entry requires complete, reviewed, validated
  planning artifacts. The human approves Apply for the named change. If
  planning validation, scope, external state, or resource identity drifts,
  correct from fresh evidence and return to planning review.
- **Gate 3 — Verification to closure:** entry requires task evidence, focused
  and complete checks, self-review, the current reviewed head, and a fresh
  read-only independent review. The human authorizes the selected change’s
  bounded closure. If the reviewed head, CI, target, resource ownership,
  Project/issue evidence, or review conclusion drifts—or a material design,
  security, compatibility, external-state, permission, recovery, or second
  same-component repair issue arises—preserve state and return to review.

PF3 itself is recovered by a scoped revert of its documentation/template/test
change. Future label rehearsal is separately previewed and authorized just in
time; no real label is mutated speculatively. Cleanup later re-audits exact
registered secondary resources, excludes the primary worktree and broad or
force operations, and deletes a remote branch only after its exact head is
proved merged into the then-current default branch.

The PF3 lifecycle-record delivery rechecks and records the campaign-entry gate
after PF3's issue, implementation delivery, archive, observation, and current
default-branch validation are durable. Only that evidence permits its
lifecycle-record roadmap update to change candidate 1 from `Blocked` to `Not
started`. Candidate 1 remains `Not started` until its own Explore actually
begins, when it becomes `In progress`; this planning change does not alter
candidate 1's GitHub Issue or Project state. This post-Archive action is not a
PF3 completion task, because Archive requires PF3 tasks to be complete.

## Reuse Plan

Reuse the existing PR contract and linkage validators, `skip_specs` artifact
validator support, runbook lifecycle wording, campaign roadmap, and sanitized
observation ledger. The design introduces no reusable skill, workflow engine,
or new assistant-specific mechanism.
