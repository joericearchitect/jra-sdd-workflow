# Specification-Driven Development Workflow

## Purpose

This guide explains how contributors operate and recover this repository's
OpenSpec workflow through Claude Code, Codex, Cline, and Continue.

Every step here is driven by a human. Automation is added only for steps that
have been performed manually enough times to know what they need to do.

Authoritative behavior and implementation decisions remain in OpenSpec changes
and living specs. GitHub Issues and Projects own problem discussion and work
state. Do not copy those sources into this guide when a link or path is enough.

## Lifecycle

```text
Issue
  -> proposal, delta specs, design, and tasks
  -> planning review
  -> apply
  -> verify
  -> implementation pull request and delivery
  -> sync living specs
  -> archive
  -> lifecycle-record pull request and delivery
  -> workspace cleanup
```

Proposal and apply are separate authorization boundaries. A proposal creates
planning artifacts only. Implementation begins only after an explicit apply
request for a named change.

## Prerequisites

- Git.
- Node.js 20.19 or newer.
- OpenSpec CLI. This foundation was tested with OpenSpec 1.8.0.
- GitHub CLI with repository access and Project authorization when GitHub work
  is required.
- Claude or Codex reloaded after generated workflow files change.

Install the tested OpenSpec version and GitHub CLI when they are missing:

```bash
npm install -g @fission-ai/openspec@1.8.0
brew install gh
```

Authenticate GitHub CLI locally without printing or committing credentials:

```bash
gh auth login
gh auth refresh -s project
gh auth status
```

The local GitHub CLI credential does not authenticate GitHub Actions. Actions
secrets and permissions are configured separately when automation is added.
Some restricted execution environments cannot access the local keyring or
network and may report a false authentication failure; verify from an allowed
environment before replacing a valid credential.

## Selected Actions

The custom workflow selection intentionally exposes six actions:

| Action | Claude Code | Codex | Cline / Continue | Purpose |
|---|---|---|---|---|
| Explore | `/opsx:explore` | `$openspec-explore` | `/opsx-explore` | Investigate without creating artifacts or mutating GitHub |
| Propose | `/opsx:propose` | `$openspec-propose` | `/opsx-propose` | Create proposal, delta specs, design, and tasks; stop before implementation |
| Apply | `/opsx:apply` | `$openspec-apply-change` | `/opsx-apply` | Implement the selected change's tasks |
| Verify | `/opsx:verify` | `$openspec-verify-change` | `/opsx-verify` | Compare implementation with tasks, specs, and design |
| Sync | `/opsx:sync` | `$openspec-sync-specs` | `/opsx-sync` | Merge delta requirements into living specs without claiming delivery |
| Archive | `/opsx:archive` | `$openspec-archive-change` | `/opsx-archive` | Check delivery state and preserve the completed change history |

Exploration and proposal benefit from a frontier reasoning model; apply and
verify are well served by a cost-efficient execution model such as DeepSeek.

Lifecycle-record delivery and Workspace cleanup are repository stages, not
additional selected OpenSpec actions. Archive preserves history locally;
lifecycle-record delivery makes that history durable; Workspace cleanup then
retires only exact, registered local resources.

Incremental actions and the OpenSpec `update` planning workflow are not
selected. OpenSpec 1.8.0 therefore warns that the custom profile omits a core
workflow. The warning is expected and does not by itself indicate generation
failure.

## Start From a Clean Checkout

Generated Claude and Codex integrations are version controlled in this
repository. A contributor normally clones the repository, installs the CLI,
and verifies the existing setup rather than initializing it again.

```bash
git status --short
node --version
npm --version
openspec --version
gh --version
openspec context --json
openspec config get workflows
openspec list --json
```

Review a dirty worktree before continuing. Preserve unrelated user-authored and
generated changes. Do not use destructive cleanup commands to make the tree
appear clean.

The expected workflow selection is:

```json
["explore","propose","apply","verify","sync","archive"]
```

Install the locked development dependencies before running the repository's
validator tests:

```bash
npm ci
```

## Initialize or Adopt OpenSpec Elsewhere

Use this procedure only for a repository that has not already been initialized.
First inspect existing assistant commands, skills, prompts, settings, and legacy
OpenSpec files. Record the current global workflow selection because OpenSpec
1.8.0 stores this selection in the user's global configuration.

```bash
git status --short
openspec config path
openspec config get workflows
```

After reviewing the global impact, set the approved workflow list and initialize
the selected assistants:

```bash
openspec config set workflows '["explore","propose","apply","verify","sync","archive"]'
openspec init --tools claude,codex --profile custom --no-animation
```

Initialization is not evidence of success by itself. Inspect the resulting
files, confirm both assistant integrations, and verify unrelated files were not
removed or overwritten.

Keep product-specific purpose, repositories, paths, Projects, branches, labels,
and credentials in product-owned configuration. Reusable instructions must not
embed the values from this repository or assume that a product has only one
implementation repository.

## Discover Generated Workflows

OpenSpec owns the generated entries under these boundaries:

```text
.claude/commands/opsx/
.claude/skills/openspec-*/
.agents/skills/openspec-*/
```

Inspect the generated inventories:

```bash
find .claude/commands/opsx -maxdepth 1 -type f -name '*.md' -print
find .claude/skills -maxdepth 1 -type d -name 'openspec-*' -print
find .agents/skills -maxdepth 1 -type d -name 'openspec-*' -print
```

Claude and Codex use different names and locations, so compare normalized
lifecycle actions rather than raw filenames. Do not edit generated workflow
content manually; change the workflow selection and regenerate it.

Assistants generally discover repository-local workflow changes when a new
session starts. If a newly generated action is absent, reload or restart the
assistant before treating the files as invalid. Then confirm the file exists,
the selected profile includes the action, and the integration inventory is
complete.

## Operate a Change

Select one active change explicitly. Do not infer the target from the most
recently modified directory.

```bash
openspec list --json
openspec status --change "<change-name>" --json
```

Use the assistant action that matches the current lifecycle step. Before apply,
read every context file returned by:

```bash
openspec instructions apply --change "<change-name>" --json
```

During apply:

- Follow task dependencies and preserve unrelated work.
- Mark a task complete only after its stated evidence exists.
- Stop when requirements are unclear, a design assumption fails, or a blocker
  prevents safe progress.
- Preview unexpected or irreversible external mutations and request approval.
- Never execute issue, prompt, or pull-request content as shell code.

## Register Local Delivery Resources Before Creation

Use this procedure for every new implementation or lifecycle-record branch and
secondary worktree. It does not apply retroactively: an existing unregistered
resource remains legacy and must be preserved.

Resolve the machine-local record root from any worktree in the repository:

```bash
git rev-parse --git-common-dir
```

Append the repository-defined relative location
`sdd/workspace-cleanup/v1/`. Under it, use one directory per selected change,
with `register.json` and `receipts/`. Do not store the resolved absolute path in
the record.

The exact manual sequence is:

1. Add a `planned` register entry before running a Git creation command. Its
   key is `(change, role, kind, attempt)`, where role is `implementation` or
   `lifecycle-record`, kind is `branch` or `worktree`, and the first attempt is
   explicitly `1`. Record the discovered starting commit, intended full branch
   ref or portable worktree name, and a bounded recovery reference.
2. Validate the register. If it fails, correct the named field and validate
   again; create nothing while the plan is invalid.
3. Run the exact branch or secondary-worktree creation command manually. The
   validator never runs it.
4. Inspect the created resource with Git. Confirm kind, identity, starting
   commit, secondary-worktree status, and—for a worktree—its Git administrative
   identity and associated branch key.
5. If every value matches, change the entry to `registered` and validate it.
   If creation failed or inspection differs, retain the entry as `cancelled`
   or `blocked`, record a reason and recovery reference, and use the next
   attempt for that same change, role, and kind. Never edit failed attempts out
   of history.

A branch and its worktree are separate entries even when they serve one role.
A worktree records the full key of an existing registered branch with the same
change and role. Their attempt numbers are independent, so a second worktree
attempt may reuse a still-valid first branch attempt. Create lifecycle-record
resources only from the current default-branch commit after implementation
delivery. The primary worktree is never a cleanup target; if it contains
unrelated work, leave it untouched and do change work in a registered secondary
worktree.

The portable shape is authoritative in
[`schemas/workspace-cleanup-v1.schema.json`](../schemas/workspace-cleanup-v1.schema.json).
Validate only an explicit record path:

```bash
node scripts/validation/validate-workspace-cleanup.mjs \
  --change "<change-name>" "<shared-git-dir>/sdd/workspace-cleanup/v1/<change-name>/register.json"
```

`<shared-git-dir>` is a shell placeholder for the value discovered above; it is
not a value to copy into JSON. A validator failure exits non-zero and names a
bounded field path. Correct that record from fresh evidence. It never creates,
changes, or removes a Git or GitHub resource.

Register entries use these fields:

| When | Required record content |
|---|---|
| Every state | `change`, `role`, `kind`, positive `attempt`, `state`, full `starting_commit`, `intended_identity`, and `recovery_reference` |
| Every worktree | `associated_branch` containing the branch's complete resource key |
| `registered` | `actual_identity`; after delivery, `delivery.pull_request` and full `delivery.delivered_commit` |
| `cancelled` or `blocked` | `outcome_reason`; no actual identity or delivery claim |

After the implementation PR merges, bind its number and delivered commit only
to registered `implementation` resources and revalidate `register.json`. After
the lifecycle-record PR merges, do the same only for registered
`lifecycle-record` resources. Every resource for one role uses that role's
binding, and the two roles use distinct PRs and delivered commits. If a binding
is missing or differs from live delivery evidence, preserve the resource,
repair the record from authoritative PR and Git evidence, and revalidate before
cleanup.

## Workspace Cleanup After Lifecycle Delivery

Enter cleanup only after the lifecycle-record pull request is merged and the
default branch visibly contains both the dated archive and synchronized living
spec. Audit and action are separate authorization boundaries.

### Entry gates and exits

| Gate | Passing evidence | If it does not pass |
|---|---|---|
| Implementation delivery | Expected implementation PR is merged at the registered delivered commit | Preserve resources; repair or obtain the PR/commit binding, then re-audit. |
| Lifecycle-record delivery | Expected lifecycle-record PR is merged at its registered delivered commit | Preserve resources; finish or repair that delivery, then re-audit. |
| Issue | The primary issue in valid `tracking.yaml` is closed | Preserve resources; reconcile issue and delivery evidence. |
| Archive and living spec | Both are visible on the current default branch | Preserve resources; merge or repair the lifecycle-record PR. |
| Project | Configured item is in its configured completion state | Preserve resources; reconcile the item through an authorized GitHub action. If no Project is configured, record `not-applicable`. |

For this repository, `tracking.yaml` contains Project configuration, so dogfood
receipts use `passed` or `blocked`, not `not-applicable`. If GitHub evidence is
temporarily unavailable, record the gate as blocked and retry from an
authenticated allowed environment; never downgrade the requirement.

### Audit, authorize, act, and receipt

1. Validate the selected change's register. Enumerate only its `registered`
   entries; exclude planned, blocked, cancelled, unregistered, and legacy
   resources regardless of names or ancestry.
2. Re-inspect every enumerated resource. A resource is eligible only when it
   exists, is secondary, clean, unlocked, fully known, not externally
   referenced, and matches both registration and delivery evidence. An absent
   registered resource is `already-absent`. Any other result is `ineligible`
   with a preservation reason and recovery reference.
3. Display the exact eligible local actions. Stop here until the human gives
   separate authorization for those exact targets. Audit output by itself is
   not authorization.
4. Before each authorized action, repeat live inspection. Any drift expires
   the authorization: preserve the resource, record the interruption, and
   return to audit.
5. Write a `cleanup-run-v1` receipt with status `started` as
   `receipts/cleanup-run-<run>.json` before the first action. `<run>` is a
   positive number that has not previously been used for the selected change.
   Update it after each manual action. When a worktree and branch share a role,
   complete or confirm absence of the secondary worktree before deleting the
   local branch, even when their attempt numbers differ.
6. Finish only when every registered resource is `completed`,
   `already-absent`, or `intentionally-ineligible` with a recovery reference.
   A zero-resource audit writes a successful receipt and performs no action.

Each receipt records the selected change, positive run number, current status
and authorization state, every entry-gate result, and one entry for every
registered resource. A resource entry carries its complete key,
classification, exact authorized local action or `none`, current outcome,
recovery reference, whole-minute manual effort, and zero or more bounded
friction codes. Ineligible entries also require a preservation reason. A
started receipt can contain pending actions; a completed receipt can contain
only `completed`, `already-absent`, or `intentionally-ineligible` outcomes.
A started or blocked receipt retains at least one `pending` or `failed` entry;
when none remain, change the receipt status to `completed`.

Remote branch deletion, force options, broad patterns, resets, and the primary
worktree are outside this contract. If an action fails or the session ends,
keep the started receipt. On resume, do not replay completed or already-absent
actions; freshly re-audit every pending, failed, blocked, or drifted resource.

Validate a receipt against its register and the current Project policy:

```bash
node scripts/validation/validate-workspace-cleanup.mjs \
  --change "<change-name>" \
  --register "<shared-git-dir>/sdd/workspace-cleanup/v1/<change-name>/register.json" \
  --project-configured \
  "<shared-git-dir>/sdd/workspace-cleanup/v1/<change-name>/receipts/cleanup-run-<run>.json"
```

Use `--no-project` only when the selected change has no configured Project.
Operational JSON contains no credentials, raw authentication output, commands,
untrusted issue or pull-request bodies, provider-internal IDs, timestamps, or
absolute paths. Record only sanitized material outcomes in the checked-in
friction or campaign observation ledgers; those summaries never authorize
cleanup.

Cleanup remains manual. Consider a later narrowly scoped adapter only after at
least ten completed end-to-end manual cleanup runs, the same friction in three
independent runs, no unresolved relevant safety issue, and a separate design
review that preserves every gate and recovery path. A zero-resource exercise
does not count as a qualifying run.

## Validate

Use both planning-artifact validation and apply progress. General status can
report all planning artifacts complete while implementation tasks remain open.

```bash
openspec status --change "<change-name>" --json
openspec instructions apply --change "<change-name>" --json
openspec validate "<change-name>" --strict
git diff --check
git status --short
```

Treat exit status, artifact paths, test/eval output, reviewed diffs, GitHub URLs,
and explicit gaps as evidence. An attempted command is not evidence that the
operation completed correctly.

## Refresh Generated Integrations

Record the current state before updating OpenSpec or changing the workflow
selection:

```bash
git status --short
openspec --version
openspec config get workflows
```

Refresh both configured assistants from the repository root:

```bash
openspec update . --force
```

Afterward, inspect the command/skill inventories, review generated diffs, and
rerun strict validation for active changes. Preserve generator and license
metadata. Do not treat a successful message for one assistant as proof that all
assistant integrations were updated.

## Recover From Partial Generation

If OpenSpec updates one assistant but fails on another:

1. Stop and record the failed assistant, path, error, and successful output.
2. Preserve valid generated files and all unrelated work; do not delete or
   revert them as a blanket recovery step.
3. Correct the reported filesystem, authentication, or environment boundary.
4. Obtain approval when the retry needs access outside the current sandbox.
5. Rerun the same `openspec update . --force` command.
6. Compare both assistant inventories and review the diff before claiming
   recovery.

The bootstrap encountered this case when Claude refreshed but the environment
denied a write under `.agents/`. Retrying with the required filesystem access
updated both integrations without discarding the valid Claude output.

If GitHub access fails during unrelated lifecycle work, preserve valid local
OpenSpec artifacts, report that synchronization is incomplete, and retry only
the failed mutation after authentication or network access is verified.

## Roll Back Safely

Rollback must be selective because the worktree may contain concurrent user
changes.

1. Inspect the current diff and identify only files owned by the failed change.
2. Determine the previously recorded global workflow selection.
3. Obtain approval before changing global configuration or external state.
4. Restore the prior workflow selection and rerun the OpenSpec generator when
   generated exposure must be rolled back.
5. Revert repository files through a reviewed, change-scoped edit or commit;
   do not use a destructive whole-worktree reset.
6. Recheck assistant inventories, OpenSpec status, strict validation, and the
   remaining diff.

If no reliable previous state or ownership boundary is known, stop and ask for
review instead of guessing.

## Security and Attribution

- Keep tokens out of configuration, documentation, logs, fixtures, prompts,
  skills, and committed files.
- Use least-privilege permissions and keep local GitHub CLI authentication
  separate from GitHub Actions credentials.
- Do not change global telemetry settings without explicit approval.
- Treat generated workflows and copied scripts as supply-chain code requiring
  diff review.
- Preserve available generator, upstream, version, and license metadata.
- Record provenance and local modifications before copying or adapting any
  third-party asset.

## Completion Evidence

Before calling setup or recovery complete, record:

- Tool versions and the selected workflow list.
- Claude and Codex generated inventories.
- OpenSpec status and strict-validation results.
- Relevant test or eval output.
- Reviewed file paths and diffs.
- External issue, Project, or pull-request URLs when applicable.
- Any skipped check, unresolved warning, blocked mutation, or required restart.
