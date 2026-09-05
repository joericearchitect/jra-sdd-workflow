## Why

The workflow can complete implementation delivery, sync, archive, and its
lifecycle-record pull request without proving which local branches and
secondary worktrees belong to the change. Those resources then become legacy
cleanup debt because safe retirement requires ownership evidence that the
current workflow never records.

## What Changes

- Add a repository-local, manual workspace-cleanup stage after lifecycle-record
  delivery without adding a new selected OpenSpec action.
- Define a creation-time register for planned and verified local branches and
  secondary worktrees, keyed by change, delivery role, resource kind, and
  attempt.
- Define delivery bindings, entry gates, explicit authorization, pre-action
  reinspection, ordered worktree/branch cleanup, and restart-safe receipts.
- Store exact operational records in the Git-shared metadata directory and
  record only sanitized material outcomes or friction in repository planning
  notes.
- Protect primary, dirty, locked, unknown, delivery-mismatched,
  externally-referenced, and legacy resources with documented exits rather
  than forced cleanup.
- Add proportional validation fixtures and update contributor guidance and
  dogfood runbooks so resource ownership is recorded before the first
  change-owned branch or worktree is created.

## Scope

This change covers the repository-owned manual contract for registering local
change resources, binding them to implementation and lifecycle delivery,
auditing them after lifecycle-record delivery, authorizing local cleanup,
recording outcomes, and recovering from partial or blocked runs.

## Non-Goals

- Deleting or backfilling the current unregistered legacy resources.
- Deleting remote branches.
- Automatically creating, switching, removing, or deleting Git resources.
- Adding a controller, autonomous runner, reusable execution adapter, or new
  selected OpenSpec action.
- Modifying the separate agent-skills repository.

## Capabilities

### New Capabilities

- `workspace-cleanup`: records exact ownership of local delivery resources and
  guides an explicitly authorized, evidence-backed post-delivery cleanup with
  safe exits and restartable receipts.

### Modified Capabilities

- None.

## Impact

- Primary issue: https://github.com/joericearchitect/jra-sdd-workflow/issues/5
- Design brief:
  `ai-planning/design-briefs/post-archive-workspace-cleanup.md`.
- Affected code and documentation: a versioned cleanup record/receipt schema,
  focused validation and fixtures, `README.md`, `docs/sdd-workflow.md`, the
  lifecycle glossary, the human and AI dogfood runbooks, and campaign evidence
  notes.
- Affected users: contributors and assistants creating local change branches or
  secondary worktrees and maintainers auditing workspace hygiene after
  delivery.
- Compatibility: the existing Explore through Archive actions remain
  unchanged. Future change-owned local resources must follow the new register
  and cleanup contract; existing unregistered resources remain preserved as
  legacy resources.
- Migration: no existing branch or worktree is backfilled. The first delivery
  after implementation starts a new register using the versioned schema.
- Security: credentials and raw authentication output are prohibited from
  records; destructive actions require an exact registered target, fresh
  inspection, and separate explicit authorization. Untrusted issue, pull
  request, and branch text is treated as data, never shell code.
- Portability: the Git-shared metadata directory, default branch, repository,
  worktrees, and delivery evidence are derived from the active environment;
  optional Project expectations come from configuration. Portable assets do
  not embed account names, repository names, absolute paths, instance URLs, or
  credentials.
- Planning boundary: this proposal authorizes planning only, not implementation
  or cleanup.

## Reuse Plan

Reuse Git's shared metadata discovery, the existing tracking and artifact
validation patterns, the current issue/Project/PR evidence sources, and the
installed conservative workspace-cleanup skill's classifications. Do not add a
reusable apply/resume adapter until at least ten completed manual runs show the
same friction in at least three independent runs with no unresolved safety
issue.
