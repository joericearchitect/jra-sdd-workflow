# workspace-cleanup Specification

## Purpose

Defines safe, portable, and restartable manual ownership and cleanup behavior
for local branches and secondary worktrees created during an OpenSpec delivery.

## Requirements

### Requirement: Record resource intent before creation

The workflow SHALL record each intended local delivery resource before it is
created. Each planned entry MUST be uniquely keyed by change name, delivery
role, resource kind, and positive attempt number; MUST identify its starting
commit, intended Git identity, and recovery reference; and MUST distinguish the
`implementation` and `lifecycle-record` roles and the `branch` and `worktree`
resource kinds.

#### Scenario: First implementation branch is planned

- **WHEN** a contributor prepares the first implementation branch for a
  selected change
- **THEN** the register contains a planned entry keyed by that change,
  `implementation`, `branch`, and attempt `1` before the branch is created

#### Scenario: Branch and worktree support the same role

- **WHEN** one delivery role uses both a branch and a secondary worktree
- **THEN** the register contains separate branch and worktree entries whose
  keys differ by resource kind

#### Scenario: A failed attempt is replaced

- **WHEN** a planned resource is cancelled or blocked and a replacement is
  needed
- **THEN** the original entry remains as history and the replacement uses the
  next attempt number for the same change, role, and kind

#### Scenario: A worktree retry reuses its valid branch

- **WHEN** a branch remains registered after its associated worktree attempt
  is cancelled or blocked
- **THEN** the next worktree attempt may reference that registered branch's
  full key even though their attempt numbers differ

### Requirement: Register only inspected matching resources

The workflow SHALL promote a planned resource to registered only after live Git
inspection confirms that its kind, intended identity, and starting commit match
the planned entry. A failed creation or mismatch MUST leave no registered
ownership claim and MUST provide a cancelled or blocked outcome with a recovery
path.

A registered worktree MUST identify an existing registered branch for the same
change and delivery role by that branch's complete resource key.

#### Scenario: Created resource matches its plan

- **WHEN** live inspection finds the intended resource at the planned starting
  commit with the expected identity
- **THEN** the workflow records the resource as registered

#### Scenario: Created resource differs from its plan

- **WHEN** live inspection finds a different branch, worktree identity, or
  starting commit
- **THEN** the workflow refuses registration and records the mismatch and its
  correction path without claiming ownership

#### Scenario: Creation fails before a resource exists

- **WHEN** the manual Git creation step fails
- **THEN** the workflow records the planned entry as cancelled or blocked and
  does not fabricate an actual resource

### Requirement: Protect the primary worktree and unrelated work

The workflow MUST keep the primary worktree outside the cleanup target set and
SHALL preserve unrelated or dirty work. Change-owned implementation and
lifecycle-record work MUST use registered secondary resources created from the
then-current discovered default-branch commit.

#### Scenario: Primary worktree is dirty

- **WHEN** the primary worktree contains unrelated changes
- **THEN** the workflow preserves those changes, creates no change-owned work
  there, and directs the contributor to a registered secondary worktree

#### Scenario: Registered entry resolves to the primary worktree

- **WHEN** inspection shows that an entry would target the primary worktree
- **THEN** cleanup classifies it as ineligible and performs no removal

### Requirement: Bind resources to separate delivery evidence

The workflow SHALL bind registered implementation and lifecycle-record
resources separately to their corresponding pull request and delivered commit.
The lifecycle-record resource MUST be based on the current default branch after
implementation delivery rather than inheriting the implementation resource's
delivery claim.

#### Scenario: Implementation pull request merges

- **WHEN** the implementation pull request is merged
- **THEN** only the registered implementation resources receive that pull
  request and delivered-commit binding

#### Scenario: Lifecycle-record delivery is prepared

- **WHEN** synchronized living specs and the archived change require delivery
- **THEN** separately registered lifecycle-record resources are created from
  the current default branch and bound to the lifecycle-record pull request

#### Scenario: Delivery evidence does not match

- **WHEN** a registered resource cannot be matched to its expected pull request
  or delivered commit
- **THEN** the workflow blocks cleanup for that resource and reports how to
  obtain or repair the evidence

### Requirement: Gate cleanup on completed lifecycle delivery

The cleanup audit SHALL require visible archived-change and living-spec
evidence, a closed primary issue, and merged implementation and lifecycle-record
delivery. When a GitHub Project is configured for the change, its configured
completion state MUST also be evidenced; when no Project is configured, the
receipt MUST record that gate as not applicable.

#### Scenario: All configured delivery gates pass

- **WHEN** archive, living-spec, issue, pull-request, and applicable Project
  evidence all show completed delivery
- **THEN** the workflow may classify registered resources for cleanup

#### Scenario: Configured Project is not complete

- **WHEN** the change uses a configured Project and its item is not in the
  configured completion state
- **THEN** the workflow stops before cleanup authorization and identifies the
  Project-state exit

#### Scenario: No Project is configured

- **WHEN** the selected change has no configured Project
- **THEN** the workflow records the Project gate as not applicable and
  continues evaluating the remaining delivery gates

### Requirement: Audit only registered selected-change resources

The workflow SHALL enumerate cleanup candidates only from the selected
change's valid register and MUST re-inspect each live resource before
classification. It SHALL classify each registered resource as eligible,
already absent, or ineligible with a bounded reason and MUST NOT infer ownership
from names, directory locations, merge ancestry, or pull-request history.

#### Scenario: Registered resource is clean and fully delivered

- **WHEN** fresh inspection confirms a non-primary, unlocked, clean resource
  with matching delivery evidence and no external reference
- **THEN** the audit classifies it as eligible and displays its exact proposed
  local action

#### Scenario: Resource is dirty, locked, unknown, or externally referenced

- **WHEN** fresh inspection finds any disqualifying condition
- **THEN** the audit classifies the resource as ineligible, preserves it, and
  records a reason and recovery reference

#### Scenario: Unregistered legacy branch is present

- **WHEN** the repository contains a branch or worktree absent from the
  selected change's register
- **THEN** the audit excludes and preserves it even if its name or commits
  appear related to the change

#### Scenario: Registered resource is already gone

- **WHEN** fresh inspection cannot find a registered resource and the record is
  otherwise valid
- **THEN** the audit classifies it as already absent and records that outcome
  without replaying a deletion

### Requirement: Require explicit authorization and fresh pre-action inspection

The workflow MUST remain audit-only until the exact eligible local actions are
displayed and separate cleanup authorization is given. It MUST re-inspect each
target immediately before acting, remove an eligible secondary worktree before
its associated local branch, and MUST NOT delete a remote branch or use forced
or broad cleanup commands.

#### Scenario: Audit completes without authorization

- **WHEN** eligible actions are displayed but cleanup authorization has not
  been given
- **THEN** the workflow performs no destructive Git action and reports the
  authorization required to continue

#### Scenario: State changes after authorization

- **WHEN** pre-action inspection differs from the authorized audit result
- **THEN** the workflow stops, preserves the resource, and requires a new audit
  and authorization

#### Scenario: Worktree and branch are both eligible

- **WHEN** an authorized role has eligible worktree and branch records
- **THEN** the worktree removal is completed and receipted before local branch
  deletion is attempted

#### Scenario: Remote branch exists

- **WHEN** a registered local branch also has a remote counterpart
- **THEN** the workspace-cleanup action leaves the remote branch unchanged

### Requirement: Persist restartable cleanup receipts

The workflow SHALL write a started receipt outside every target worktree before
the first authorized action and SHALL persist each resource outcome as
completed, already absent, or intentionally ineligible. A resumed run MUST read
the receipt, avoid replaying completed actions, and re-audit incomplete or
blocked resources. A started or blocked receipt MUST contain at least one
pending or failed resource; once every resource has a terminal outcome, the
receipt MUST be marked completed.

#### Scenario: Cleanup completes normally

- **WHEN** every authorized resource action succeeds
- **THEN** the final receipt records all outcomes, entry-gate results, recovery
  references, manual effort, and bounded friction codes

#### Scenario: Cleanup is interrupted

- **WHEN** a run stops after one or more actions
- **THEN** its started receipt remains usable to distinguish completed actions
  from resources that require fresh audit

#### Scenario: Selected change has no registered resources

- **WHEN** lifecycle delivery is complete and the valid register contains no
  registered resources
- **THEN** the workflow records a successful zero-resource receipt and performs
  no Git removal

### Requirement: Keep operational evidence portable and safe

The workflow SHALL resolve the shared Git metadata location and current Git and
delivery identities from the active environment, take optional Project policy
from configuration, and produce equivalent decisions for every supported
assistant. Versioned schemas and instructions MUST NOT contain environment-only
values, and operational records MUST NOT contain credentials, raw
authentication output, executable issue or pull-request content, or absolute
worktree paths.

#### Scenario: Linked worktree invokes the workflow

- **WHEN** a supported assistant starts the procedure from any worktree in the
  same repository
- **THEN** it resolves the same shared operational register without relying on
  a stored absolute path

#### Scenario: Unsafe data appears in a proposed record

- **WHEN** a record contains a credential-like field, raw authentication
  output, executable external text, or an absolute worktree path
- **THEN** validation rejects it without emitting the sensitive value

#### Scenario: Different supported assistants inspect the same evidence

- **WHEN** supported assistants receive the same register, receipt, live Git
  state, delivery evidence, and configuration
- **THEN** they produce equivalent gate and resource classifications

### Requirement: Require evidence before later cleanup automation

The workflow SHALL treat cleanup as manual until at least ten end-to-end manual
cleanup runs are complete, the same friction is recorded in at least three
independent runs, no relevant safety issue remains unresolved, and a proposed
automation is narrowly scoped and proportionate while preserving all gates and
recovery paths.

#### Scenario: Threshold is not met

- **WHEN** fewer than ten qualifying runs exist or no friction recurs in three
  independent runs
- **THEN** the workflow rejects cleanup automation as premature and continues
  the manual procedure

#### Scenario: Dry run has no owned resources

- **WHEN** an audit exercise has no registered resources and does not execute
  an end-to-end cleanup decision
- **THEN** it does not count toward the manual-run threshold

#### Scenario: Evidence supports a narrow adapter review

- **WHEN** all run, recurrence, safety, and proportionality thresholds are met
- **THEN** the evidence may support a separate design review and OpenSpec
  change in the reusable skill's owning repository without authorizing it
  automatically
