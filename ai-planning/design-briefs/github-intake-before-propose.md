# github-intake-before-propose design brief

## 1. Problem and desired outcome
Problem: OpenSpec Propose must reference a primary GitHub issue, but this repository has no configured issue-intake file and the current planning-only Propose workflow cannot safely create an issue when none exists.
Desired outcome: Contributors can reliably create or reuse the correct GitHub intake issue before a change proposal is completed, with a future explicit opt-in path to compose that intake into Propose only after the manual flow has been proven.

## 2. Evidence and key findings
- [Post-Archive Workspace Cleanup design brief](post-archive-workspace-cleanup.md): evidence of the unregistered-resource failure that led to this workflow work.
- [Issue and friction log](../notes/issue-and-friction-log.md): records the missing durable register and the current intake constraint.
- [SDD workflow guide](../../docs/sdd-workflow.md): defines a planning-only Propose boundary and manual-first operation.
- [OpenSpec project configuration](../../openspec/config.yaml): assigns GitHub Issue ownership and prohibits premature automation.
- [Tracking-contract specification](../../openspec/specs/tracking-contract/spec.md): defines the metadata contract to populate after an issue is known.
- [AI-assisted change runbook](../plans/change-runbook-ai.md): documents the existing issue-before-work expectation.

## 3. Options considered and tradeoffs
- Leave issue creation outside the workflow and rely on ad hoc manual GitHub CLI use: lowest implementation cost, but repeats missing or duplicate issue failures.
- Configure and document the existing create-or-find issue flow as a required manual pre-Propose step: adds a small repository configuration and an explicit, auditable recovery path without changing Propose authorization.
- Make every plain Propose request create an issue automatically: convenient, but silently turns a planning-only request into an external GitHub mutation and conflicts with the current authorization boundary.
- Later add an explicit propose-with-GitHub-intake orchestration capability: it can search first and create only when the request expressly authorizes it, but belongs in the reusable agent-skills boundary and requires manual-run evidence first.

## 4. Decisions, assumptions, and owner
- Owner: Repository owner
- Confirmed decisions: None; recommendation remains pending owner decision.
- Approval evidence: Not supplied.
- Assumptions: GitHub Issues remain the authority for problem discussion and work state.; The repository continues to use the existing tracking-contract metadata after an issue is known.; A GitHub CLI credential with repository access is available only in an approved host environment.; A Project is optional and is configured separately from issue creation.

## 5. Scope, non-goals, constraints, dependencies, and risks
- Scope: Define the repository configuration, documented manual pre-Propose intake sequence, exact-title reuse behavior, safe issue-body ownership rules, validation, and evidence needed before a later reusable explicit opt-in orchestration capability.
- Non-goals: Creating an issue now; changing a plain OpenSpec Propose request to mutate GitHub; adding a controller or autonomous runner; storing credentials, account identities, Project item IDs, or mutable delivery state in tracked metadata; modifying generated OpenSpec skills by hand.
- Constraints: Manual first; plain Propose remains planning-only; no hardcoded environment values in portable assets; external GitHub mutation requires explicit authorization; repository workflow and reusable agent skills have separate ownership boundaries
- Dependencies: A checked-in repository GitHub intake configuration; the installed create-or-find issue helper; GitHub CLI authentication with appropriate repository scope; the existing issue-to-OpenSpec tracking handoff; manual-run evidence before reusable orchestration
- Risks: Duplicate issues if title matching or idempotency is underspecified; overwriting human-authored issue content if managed boundaries are not explicit; unexpected external mutation if authorization is implicit; portability failure if repository, account, labels, or Project data are embedded in reusable instructions; premature automation that violates the manual-first rule

## 6. Open questions and blocking decisions
- Should a user request such as propose with GitHub intake itself be the explicit authorization to create or reuse an issue, or should every missing-issue creation require a separate confirmation?
- Which issue title and managed-body convention will make exact-title reuse idempotent while preserving human-authored content?
- Which repository-owned GitHub settings are required in configuration, and which must be derived from the current remote or supplied at invocation time?
- How many successful manual intake runs and what repeated friction threshold should justify the later reusable orchestration capability?

## 7. Recommended next step
Recommendation pending owner confirmation: First propose a repository-local change that configures and documents the existing manual create-or-find issue intake flow and its tracking handoff. Run it manually for the remaining dogfood changes and record friction. Only then propose a separate reusable explicit opt-in propose-with-GitHub-intake capability; do not make plain Propose create GitHub issues automatically.
Recommended workflow action: OpenSpec Explore. No OpenSpec artifacts were created.
