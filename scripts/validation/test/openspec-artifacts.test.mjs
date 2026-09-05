import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { validateChange } from "../validate-openspec-artifacts.mjs";

const proposalSections = ["Why", "What Changes", "Non-Goals", "Impact", "Reuse Plan"];
const designSections = [
  "Context",
  "Goals / Non-Goals",
  "Decisions",
  "Verification Strategy",
  "Attribution and Licensing",
  "Recovery",
  "Reuse Plan"
];

function proposal() {
  return `## Why
The scoped change improves compatibility and security.

## What Changes
Validate planning artifacts.

## Non-Goals
Do not add a controller.

## Impact
Primary issue: https://github.com/example/example/issues/1

## Reuse Plan
Reuse the existing validator.
`;
}

function design() {
  return `## Context
The validator needs a portable, secure contract with security and portability.

## Goals / Non-Goals
Keep the change proportionate.

## Decisions
Reuse local parsing.

## Verification Strategy
Run direct tests.

## Attribution and Licensing
No new attribution is required.

## Recovery
Correct the named artifact and retry validation.

## Reuse Plan
Reuse existing Node tooling.
`;
}

function tasks() {
  return `## 1. Validate review and deliver

- [ ] 1.1 Validate the artifact contract.
  Depends on: approved specification.
  Evidence: focused validation tests pass.
`;
}

function spec() {
  return `## ADDED Requirements

### Requirement: Create named artifact behavior

The system SHALL create \`tracking.yaml\` documentation as observable behavior.

#### Scenario: Create a named artifact

- **WHEN** a contributor requests the behavior
- **THEN** the artifact is present
`;
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function createChange({ metadata = "schema: spec-driven\nskip_specs: false\n", specContent = spec() } = {}) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "openspec-artifacts-"));
  writeFile(path.join(directory, ".openspec.yaml"), metadata);
  writeFile(path.join(directory, "proposal.md"), proposal());
  writeFile(path.join(directory, "design.md"), design());
  writeFile(path.join(directory, "tasks.md"), tasks());
  if (specContent !== null) {
    writeFile(path.join(directory, "specs", "artifact-quality-validation", "spec.md"), specContent);
  }
  return directory;
}

function withChange(options, action) {
  const directory = createChange(options);
  try {
    action(directory);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

function ruleIds(result) {
  return result.issues.map((issue) => issue.ruleId);
}

function assertHasRule(result, ruleId) {
  assert.equal(result.valid, false, JSON.stringify(result.issues));
  assert.ok(ruleIds(result).includes(ruleId), JSON.stringify(result.issues));
}

test("accepts an artifact-valid change and behavioral named-artifact requirement", () => {
  withChange({}, (directory) => {
    const result = validateChange(directory);
    assert.equal(result.valid, true, JSON.stringify(result.issues));
    assert.deepEqual(result.issues, []);
  });
});

test("rejects every required proposal and design heading", () => {
  for (const section of proposalSections) {
    withChange({}, (directory) => {
      const filePath = path.join(directory, "proposal.md");
      fs.writeFileSync(filePath, fs.readFileSync(filePath, "utf8").replace(`## ${section}`, `## Missing ${section}`));
      assertHasRule(validateChange(directory), `proposal.section.${section.toLowerCase().replaceAll(" ", "_")}`);
    });
  }

  for (const section of designSections) {
    withChange({}, (directory) => {
      const filePath = path.join(directory, "design.md");
      fs.writeFileSync(filePath, fs.readFileSync(filePath, "utf8").replace(`## ${section}`, `## Missing ${section}`));
      assertHasRule(validateChange(directory), `design.section.${section.toLowerCase().replaceAll(/[^a-z0-9]+/g, "_")}`);
    });
  }
});

test("rejects missing task metadata and completed tasks without evidence", () => {
  withChange({}, (directory) => {
    const filePath = path.join(directory, "tasks.md");
    fs.writeFileSync(filePath, fs.readFileSync(filePath, "utf8").replace("Depends on:", "Dependency:"));
    assertHasRule(validateChange(directory), "tasks.metadata.depends_on_");
  });

  withChange({}, (directory) => {
    const filePath = path.join(directory, "tasks.md");
    fs.writeFileSync(filePath, fs.readFileSync(filePath, "utf8").replace("Evidence:", "Proof:"));
    assertHasRule(validateChange(directory), "tasks.metadata.evidence_");
  });

  withChange({}, (directory) => {
    const filePath = path.join(directory, "tasks.md");
    fs.writeFileSync(filePath, tasks().replace("- [ ]", "- [x]").replace("Evidence: focused validation tests pass.", "Evidence: "));
    assertHasRule(validateChange(directory), "tasks.completed.evidence");
  });

  withChange({}, (directory) => {
    const filePath = path.join(directory, "tasks.md");
    const blankEvidenceBeforeHeading = tasks()
      .replace("- [ ]", "- [x]")
      .replace("Evidence: focused validation tests pass.", "Evidence: \n\n## 2. Later validation review and delivery content");
    fs.writeFileSync(filePath, blankEvidenceBeforeHeading);
    assertHasRule(validateChange(directory), "tasks.completed.evidence");
  });
});

test("honors documentation-only metadata without bypassing supplied specs", () => {
  withChange({ metadata: "schema: spec-driven\nskip_specs: true\n", specContent: null }, (directory) => {
    assert.equal(validateChange(directory).valid, true);
  });

  withChange({ metadata: "schema: spec-driven\n", specContent: null }, (directory) => {
    assertHasRule(validateChange(directory), "spec.exists");
  });

  withChange({ metadata: "schema: spec-driven\nskip_specs: false\n", specContent: null }, (directory) => {
    assertHasRule(validateChange(directory), "spec.exists");
  });

  withChange({
    metadata: "schema: spec-driven\nskip_specs: true\n",
    specContent: "### Requirement: Invalid supplied spec\n\nThe system SHALL reject incomplete content.\n"
  }, (directory) => {
    assertHasRule(validateChange(directory), "spec.scenario.exists");
  });
});

test("reports bounded diagnostics for missing, malformed, and unsupported metadata", () => {
  withChange({}, (directory) => {
    fs.rmSync(path.join(directory, ".openspec.yaml"));
    assertHasRule(validateChange(directory), "change.metadata.exists");
  });

  withChange({ metadata: "skip_specs:\n    true\n" }, (directory) => {
    assertHasRule(validateChange(directory), "change.metadata.parse");
  });

  withChange({ metadata: "skip_specs: \"true\"\n" }, (directory) => {
    assertHasRule(validateChange(directory), "change.metadata.skip_specs");
  });

  withChange({ metadata: "- unsupported-root-shape\n" }, (directory) => {
    assertHasRule(validateChange(directory), "change.metadata.shape");
  });
});

test("rejects checkbox requirements as task-shaped", () => {
  withChange({}, (directory) => {
    const filePath = path.join(directory, "specs", "artifact-quality-validation", "spec.md");
    fs.writeFileSync(filePath, fs.readFileSync(filePath, "utf8").replace("#### Scenario:", "- [ ] Implement the requirement.\n\n#### Scenario:"));
    assertHasRule(validateChange(directory), "spec.requirement.behavioral");
  });
});
