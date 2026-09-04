# Agent Guidance

This repository defines a spec-driven development workflow built on OpenSpec.

## Before changing anything

- Read [`docs/sdd-workflow.md`](docs/sdd-workflow.md).
- Read `openspec/config.yaml` for project context, artifact rules, and
  operation guidance.

## Ground rules

- **Manual first.** Do not add automation for a step that has not been run
  manually and found painful. Do not propose a controller, autonomous runner,
  or general workflow engine.
- **No hardcoded environment values.** No account name, repository name,
  board column, label, absolute path, instance URL, or credential belongs in a
  portable asset. Derive from the environment, or take it as configuration.
- **Every gate ships with its exit.** A check that can block work arrives with
  the documented path past it.
- **Second repair means design review.** If a component needs a second repair,
  stop and request a design review rather than a third fix.
- **Proportion.** Supporting machinery stays small relative to what it
  supports.

## Before delivery

```bash
node --test scripts/validation/test/*.test.mjs
node scripts/validation/validate-no-hardcoded-environment.mjs
node scripts/validation/validate-openspec-artifacts.mjs openspec/changes/<change-name>
openspec validate --all --strict
```

Pull request bodies carry both the issue link and `OpenSpec change: <name>`.
