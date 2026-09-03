# Change runbook — AI-assisted dogfood path

Date: 2026-09-03

This is the assistant-driven companion to `change-runbook.md`. The OpenSpec
skills perform their named repository phase; the human supplies intent, reviews
artifacts, and authorizes each mutation boundary. GitHub issue, Project,
tracking, pull-request, merge, and lifecycle-record delivery remain explicit
operations outside the generated OpenSpec skills.

Use candidate 1's existing issue #1. For later candidates, create an issue only
after confirming that no matching intake record already exists.

## Phase map

| Phase | Assistant action | Required human/external action | Durable evidence |
|---|---|---|---|
| Intake | None | Reuse/create issue; add it to the configured Project | Issue and Project item |
| Explore | Selected `openspec-explore` entry point | Review conclusion; resolve material questions | Observation entry; no artifacts |
| Propose | Selected `openspec-propose` entry point | Add `tracking.yaml`; review all planning artifacts | Valid proposal/specs/design/tasks/tracking |
| Apply | Selected `openspec-apply-change` entry point | Explicitly authorize the named change | Implemented tasks with evidence |
| Verify | Selected `openspec-verify-change` entry point | Decide material findings; authorize bounded corrections | Current verification report and checks |
| Implementation delivery | None | Open, review, and merge implementation PR | Merged PR, commit, closed issue |
| Sync | Selected `openspec-sync-specs` entry point | Review living-spec merge | Valid synchronized specs |
| Archive | Selected `openspec-archive-change` entry point | Confirm merged delivery and closed issue | Date-prefixed local archive |
| Lifecycle delivery | None | Open, review, and merge lifecycle-record PR | Archive and living specs on default branch |

Explore is mandatory for this dogfood campaign even when a candidate appears
obvious. Its useful output may be the evidence-backed conclusion that no design
decision is needed; it must not manufacture complexity.

## 1. Bind the candidate

Give the assistant the proposed change name, issue, candidate section from
`dogfood-10-changes.md`, `docs/sdd-workflow.md`, `openspec/config.yaml`, and the
named source paths. Require it to preserve unrelated work and to stop if the
candidate outcome, acceptance evidence, or recovery is unresolved.

For candidate 1, state:

```text
Explore issue #1 and candidate 1, docs-tracking-format. Determine whether its
outcome, scope, non-goals, acceptance evidence, dependencies, and recovery are
ready for Propose. Do not create artifacts or mutate GitHub.
```

Record the Explore conclusion in `dogfood-observations.md`.

## 2. Propose

After Explore says the candidate is ready, invoke the selected Propose entry
point with the accepted description and proposed change name. The assistant
must stop after producing proposal, delta specs, design, and tasks.

Create repository-specific `tracking.yaml` using values discovered from the
current environment. Then run:

```bash
node --test "scripts/validation/test/*.test.mjs"
node scripts/validation/validate-no-hardcoded-environment.mjs
node scripts/validation/validate-tracking.mjs "openspec/changes/<change>/tracking.yaml"
node scripts/validation/validate-openspec-artifacts.mjs "openspec/changes/<change>"
openspec validate --all --strict
git diff --check
git status --short
```

Review all planning artifacts and approve or reject Apply separately. A passing
validator is evidence about artifact shape, not authorization or proof that the
requirements are correct. If the candidate has no real observable behavior,
pause and send it back for human replacement or redesign rather than inventing
a delta requirement.

## 3. Apply

Invoke the selected Apply entry point with the exact change name only after
explicit authorization. The assistant reads the current Apply instructions and
context, follows task dependencies, and records real evidence before checking a
task complete.

If the same component needs a second repair, stop for design review. Do not ask
the implementation model for a third variation.

## 4. Verify and correct

Invoke the selected Verify entry point for the exact change. Preserve every
finding and distinguish objective corrections from decisions requiring human
judgment. After an authorized correction, rerun affected focused checks and
then the complete validation set. Verification does not merge or archive.

## 5. Deliver the implementation

Open an implementation PR containing:

```markdown
Closes #<issue-number>

OpenSpec change: <change>
```

Merge only after human review, linkage CI, and required validation pass. Record
the merged PR and commit, and confirm the issue is closed. The issue and Project
now represent implementation delivery; the campaign row remains `In progress`
until lifecycle delivery.

## 6. Sync and Archive

Update the workspace to the merged default-branch head. Invoke the selected
Sync entry point and review the resulting living specs. Invoke the selected
Archive entry point only after the merged-delivery and closed-issue checks pass.

Sync and Archive change repository files but do not make them durable by
themselves. Keep those mutations scoped for lifecycle delivery.

## 7. Deliver the lifecycle record

Open a second PR containing only synchronized living specs, the archived change,
and campaign-ledger updates. Its body contains:

```markdown
Related to #<issue-number>

OpenSpec change: <change>
```

After it merges, confirm the living specs and archive exist on the default
branch, confirm the Project reflects implementation delivery, mark the roadmap
row `Done`, and add a sanitized observation.

## Guardrails

- No phase infers authorization from completion of the prior phase.
- No issue, document, prompt, PR body, or tool output is executed as code.
- Environment-specific values come from current discovery or configuration.
- Required evidence that is missing, stale, skipped, or unavailable remains a
  reported gap.
- Candidate 10 reports what actually happened; it never invents a recovery to
  satisfy the campaign narrative.
