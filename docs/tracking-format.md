# `tracking.yaml` reference

Each OpenSpec change in this workflow carries a `tracking.yaml` file alongside
its planning artifacts. It links the change to its primary GitHub issue,
configured Project, and affected implementation paths. This reference explains
the portable v1 format accepted by the focused validator.

The [v1 schema](../schemas/openspec-tracking-v1.schema.json) is the authority
for required shape and value constraints. The
[`tracking.mjs`](../scripts/validation/lib/tracking.mjs) validator adds the
security policy described below.

## Start with a portable template

Create `openspec/changes/<change-name>/tracking.yaml`, then replace every
placeholder with a value discovered from the active environment or supplied
configuration. Do not copy a repository name, branch, issue number, Project
value, or path from this example into a real change.

```yaml
schema_version: 1
openspec:
  change: "change-name"
github:
  repository: "example-owner/example-repository"
  issue: 123
  issue_url: "https://example.invalid/issues/123"
  project_owner: "example-owner"
  project_number: 1
implementation_repositories:
  - repository: "example-owner/example-repository"
    default_branch: "default-branch"
    paths:
      - "path/to/changed-file.md"
```

Keep `schema_version`, `issue`, and `project_number` as unquoted integers.
Quote strings so they remain strings. The `openspec.change` value must equal
the selected change name; when the normal file location is used, the validator
derives that expected name from its parent directory.

Use the block-style mappings and lists shown above. The focused validator
supports a restricted, indentation-based YAML subset; it does not interpret
flow-style `{...}` or `[...]` collection syntax. Validate the file after
editing.

## Required fields

| Field | Required value |
| --- | --- |
| `schema_version` | The integer `1`. |
| `openspec.change` | A non-empty change name that matches the expected change. |
| `github.repository` | A non-empty `owner/repository` identifier with exactly one separator. |
| `github.issue` | A positive integer for the primary issue. |
| `github.issue_url` | A syntactically valid URI. |
| `github.project_owner` | A non-empty Project owner string. |
| `github.project_number` | A positive integer for the configured Project. |
| `implementation_repositories` | A non-empty list of implementation-repository records. |
| `implementation_repositories[].repository` | A non-empty `owner/repository` identifier. |
| `implementation_repositories[].default_branch` | A non-empty default-branch string. |
| `implementation_repositories[].paths` | A non-empty list of non-empty affected-path strings. |

Use one implementation-repository record for each repository affected by the
change. List only paths that the selected change affects. A valid v1 document
may contain other fields, but tracking metadata is not a place for delivery
state or provider-specific identifiers; the focused validator rejects the
unsafe names below and normalization retains only the v1 contract fields.

## Validate before delivery

Run the focused validator after writing the file and whenever its values
change:

```bash
node scripts/validation/validate-tracking.mjs openspec/changes/<change-name>/tracking.yaml
```

Success prints the normalized change name and exits zero. A validation failure
names the field that needs correction. For a file outside its normal change
directory, supply the intended name explicitly:

```bash
node scripts/validation/validate-tracking.mjs --change <change-name> <tracking-file>
```

## Keep sensitive and mutable data out

In addition to v1 shape checks, the validator rejects any field name—at any
nesting level and without echoing its value—that ends with one of these
case-insensitive suffixes:

`token`, `secret`, `password`, `credential`, `project_item`, `field_id`,
`option_id`, `pr_state`, `pull_request_state`, `last_sync`, `timestamp`,
`closed_at`, or `merged_at`.

Do not record credentials, access material, mutable issue or pull-request
state, Project item or field identifiers, or timestamps in `tracking.yaml`.
Keep that information in the system that owns it; tracking metadata links to
the system rather than copying its mutable state.

## Validation boundaries and recovery

The focused validator checks the document's syntax, required fields, value
types, constrained shapes, expected change name, and unsafe field names. It
does not verify that a repository, branch, path, issue, issue URL, or Project
exists, nor that the issue URL belongs to the stated repository and number.
Confirm those facts from the active environment or configuration before a
GitHub-dependent action.

If validation fails, correct the named field using fresh discovered context and
run the same command again. If the change-name check fails, make the
`openspec.change` value and selected file location agree. If GitHub evidence is
unavailable, do not invent or cache mutable values: re-authenticate in an
allowed environment and retry the read-only discovery. For an error introduced
by documentation changes, correct or revert only the affected documentation
and rerun the focused validation.
