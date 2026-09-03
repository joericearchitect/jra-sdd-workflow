# Change runbook — one dogfood change, end to end

Date: 2026-09-03

This is the manual reference for one candidate in
`dogfood-10-changes.md`. It keeps GitHub mutations, proposal, Apply, merge,
Sync, and Archive as separate decisions and uses placeholders for values that
must be discovered from the current environment.

Use the current candidate definition for `<change>`, `<capability>`, affected
`<paths>`, outcome, scope, non-goals, and acceptance evidence. Issue #1 already
exists for `docs-tracking-format`; reuse it rather than creating a duplicate.

## 0. Preflight

From the repository root, inspect rather than clean away existing work:

```bash
git status --short --branch
node --version
openspec --version
gh --version
gh auth status
openspec context --json
openspec config get workflows
openspec list --json
```

Discover the repository, default branch, Project, and labels from the current
environment. Record only non-sensitive values needed by `tracking.yaml`. If the
worktree contains unrelated changes, identify them and keep every campaign
commit path-scoped.

## 1. Issue and Project intake

Reuse the candidate's existing issue or create one from its accepted problem,
outcome, scope, and acceptance evidence. Record `<issue-number>` and
`<issue-url>` from the result.

Add the issue to the configured Project through an explicitly authorized
GitHub action. Inspect the Project's actual fields and options rather than
assuming an owner, number, status field, or column name. Record the resulting
item URL or ID as evidence without storing credentials.

## 2. Explore

Invoke the platform's selected OpenSpec Explore action with:

- the issue;
- the candidate section in `dogfood-10-changes.md`;
- `docs/sdd-workflow.md` and `openspec/config.yaml`; and
- the candidate's named current-state source paths.

Confirm the outcome, scope, non-goals, acceptance evidence, dependencies,
shared-resource hazards, security/portability impact, and recovery. Record the
conclusion in `dogfood-observations.md`. Explore creates no artifacts and does
not mutate GitHub.

## 3. Propose

Create the change only after Explore finds it ready:

```bash
openspec new change <change> --description "<accepted description>" --goal "<accepted outcome>"
openspec status --change <change> --json
```

In the dependency order reported by status, retrieve authoritative instructions
and write each resolved output path:

```bash
openspec instructions proposal --change <change> --json
openspec instructions specs --change <change> --json
openspec instructions design --change <change> --json
openspec instructions tasks --change <change> --json
```

Create `tracking.yaml` separately because it is repository-specific:

```yaml
schema_version: 1
openspec:
  change: <change>
github:
  repository: <owner>/<repository>
  issue: <issue-number>
  issue_url: <issue-url>
  project_owner: <project-owner>
  project_number: <project-number>
implementation_repositories:
  - repository: <owner>/<repository>
    default_branch: <default-branch>
    paths:
      - <workspace-relative-path>
```

Replace every placeholder with a discovered/configured value before validation.
Do not copy example identities or paths. Proposal creates planning artifacts
only and does not authorize Apply.

## 4. Validate and review planning

Run the complete planning gate:

```bash
node --test "scripts/validation/test/*.test.mjs"
node scripts/validation/validate-no-hardcoded-environment.mjs
node scripts/validation/validate-tracking.mjs "openspec/changes/<change>/tracking.yaml"
node scripts/validation/validate-openspec-artifacts.mjs "openspec/changes/<change>"
openspec validate --all --strict
git diff --check
git status --short
```

Review proposal, specs, design, tasks, and tracking together. Every requirement
must express real observable behavior; do not invent behavior solely to satisfy
a validator. If no real behavior exists, pause and replace or redesign the
candidate through human review. Confirm each gate's correction or recovery
path. Stop on an unresolved product, architecture, security, governance, or
scope decision.

## 5. Apply

After explicit authorization for the named change:

```bash
openspec status --change <change> --json
openspec instructions apply --change <change> --json
```

Read every context path returned by the Apply instructions. Implement tasks in
dependency order, preserve unrelated work, and mark `[x]` only when the task's
current `Evidence:` exists. A second repair to the same component triggers a
design review instead of a third attempt.

## 6. Verify

Invoke the selected Verify action. Review completeness, correctness, coherence,
security, portability, recovery, attribution, and task evidence. Apply only
authorized, behavior-preserving corrections and rerun affected checks after
each correction. Finish by rerunning the complete gate from step 4.

## 7. Implementation PR and merge

Commit only the named change and its implementation. The PR body must contain:

```markdown
Closes #<issue-number>

OpenSpec change: <change>
```

Wait for review, linkage validation, and required CI. Merge only through an
explicitly authorized action. Confirm the exact merged commit is on the default
branch and the issue is closed. The issue and Project now represent delivered
implementation; keep the separate campaign row `In progress` until the
lifecycle-record PR merges.

## 8. Sync and Archive

Start from the merged default-branch head. Invoke the selected Sync action for
`<change>` and validate the resulting living specs. Then invoke Archive. The
archive must confirm merged delivery and a closed issue before moving the
change to its date-prefixed archive path.

Rerun the complete gate from step 4, substituting the archived change path for
the active artifact path where necessary. Do not call Sync or Archive delivery;
their repository mutations are not durable until the next step merges.

## 9. Lifecycle-record PR

Commit only the synchronized living specs, archived change, and campaign ledger
updates. The PR body must contain:

```markdown
Related to #<issue-number>

OpenSpec change: <change>
```

The linkage validator can resolve the archived change by its date-prefixed
directory. Merge after review and all required checks pass. Confirm the archive
and living specs are present on the default branch.

## 10. Close the campaign entry

Confirm the Project reflects implementation delivery and set the roadmap row to
`Done`. Add a sanitized observation containing:

- phase and expected behavior;
- observed behavior and evidence;
- any blocker and documented exit;
- recovery attempts and outcome;
- whether the same pain has appeared before; and
- any skipped, unavailable, or unresolved evidence.

Never place credentials, raw authentication output, personal data, or unbounded
logs in the observation record.
