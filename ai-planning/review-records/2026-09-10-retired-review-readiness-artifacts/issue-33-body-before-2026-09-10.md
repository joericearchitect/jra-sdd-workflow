### Problem

Planning and implementation reviews in this repository repeatedly find valid
issues in later passes that could have been found or prevented earlier. A
review may read every artifact yet sweep only some defect classes; a correction
may introduce new content or a new mechanism; later findings do not state
whether they were latent, repair-induced, external, or reviewer error; and the
workflow defines no cause-aware whole-change stop before an ordinary fourth
review pass. Stale bases, unavailable fact authorities, and mutable shared
records can produce an unbounded sequence of different-looking symptoms.

### Desired outcome

The workflow owns one durable review-readiness contract with two phase
profiles, Propose and Apply, expressed through the existing planning artifacts
as a review-ready packet rather than a new schema. Observable behavior:

- Each review pass binds a packet whose base identity and fact authorities were
  verified; a missing member produces a readiness result, not a review pass.
- Planners publish a bidirectional consumer-to-coverage map, a durable
  assertion fan-out, and decisive set equalities in a reviewer-visible artifact.
- Every review pass declares each applicable defect-taxonomy class as
  swept-clean, findings, or not-applicable with a reason.
- Every finding carries a stable identity, disposition, mutation ownership, and,
  after pass one, a provenance value.
- A material correction trigger is fixed before pass one, and every correction
  produces explicit closure evidence.
- The third review pass on one bounded change is a cause-aware stop rather than
  an ordinary step toward a fourth.

### Scope

In scope: `AGENTS.md`, `CLAUDE.md`, `docs/design/glossary/02-lifecycle.md`,
`docs/design/glossary/03-change-and-artifacts.md`,
`docs/design/glossary/05-validation-and-recovery.md`,
`docs/review/adversarial-review.md`, `docs/sdd-workflow.md`,
`openspec/config.yaml`, and a new `review-readiness` capability specification
(delta spec now, living-spec sync after delivery).

This list was realigned after two owner-directed scope additions: a single
standing review method document, and three glossary terms the contract uses
normatively. The change's `tracking.yaml` path set is the inventory this list
must equal.

Explicitly out of scope: any validator or validator-test behavior change; the
`tracking-contract` and `artifact-quality-validation` specifications; the PR
contract and OpenSpec linkage validators; the reusable-skills repository;
generated OpenSpec assistant integrations; any controller, autonomous runner,
or automatic fix-and-review loop; any independent-review package or result
schema version change; and any deterministic cross-document checker.

### Acceptance criteria

- A `review-readiness` capability specification states the packet, map, fan-out,
  taxonomy, finding lifecycle, correction trigger, correction closure,
  cause-aware third-pass stop, cross-change prerequisites, phase profiles, and
  portability behavior as SHALL or MUST requirements with scenarios covering
  positive, negative, failure, and stop behavior.
- `AGENTS.md` and `CLAUDE.md` carry one identical assistant-neutral review
  readiness block and a pre-delivery qualification paragraph.
- `docs/sdd-workflow.md` carries the canonical review-readiness and correction
  discipline section, naming the reusable-skills repository generically.
- `openspec/config.yaml` gains proposal, design, task, and apply-guidance rule
  strings appended to existing lists, with no new keys and no validator change.
- `docs/review/adversarial-review.md` exists as the single standing review
  method, and each change carries a packet index at a location derivable from
  its name that links that method rather than restating it.
- The five terms the contract uses normatively and the glossary lacked are
  added to the glossary, with no existing definition rewritten.
- Every review pass records which kind of reviewer produced it, and a
  same-session local review does not satisfy an independent-review requirement.
- The in-scope path list above equals the change's `tracking.yaml` path set.
- Existing correction budgets, human gates, and the one-correction production
  independent-review boundary are unchanged or stricter.
- No portable asset gains an environment-specific value.

### OpenSpec impact

Yes, behavior changes.

### Verification plan

- `node --test scripts/validation/test/*.test.mjs`
- `node scripts/validation/validate-no-hardcoded-environment.mjs`
- `node scripts/validation/validate-tracking.mjs` for the selected change
- `node scripts/validation/validate-openspec-artifacts.mjs` for the selected change
- `openspec validate --all --strict`
- Manual whole-contract review with declared defect-taxonomy coverage, plus a
  cross-surface equality check that the taxonomy class set and provenance value
  set are identical across the guidance surfaces and the specification.

### Additional context

Primary design input:
`ai-planning/design-briefs/streamlined-review-readiness-and-convergence.md`
(Decision 1, workflow-policy change).

Consolidated research:
`ai-planning/research/streamlined-independent-reviews/streamlined-independent-reviews-findings.md`

The coordinated reusable-skills change and consuming-repository adoption are
external prerequisites owned elsewhere, not tasks of this change.



