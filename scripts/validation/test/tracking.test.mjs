import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  normalizeTracking,
  parseTrackingYaml,
  stringifyTracking,
  validateTrackingObject
} from "../lib/tracking.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function validTracking() {
  return {
    schema_version: 1,
    openspec: { change: "example-change" },
    github: {
      repository: "example-owner/example-repository",
      issue: 1,
      issue_url: "https://example.invalid/issues/1",
      project_owner: "example-owner",
      project_number: 1
    },
    implementation_repositories: [{
      repository: "example-owner/example-repository",
      default_branch: "main",
      paths: ["scripts/example.mjs"]
    }]
  };
}

function assertInvalid(mutator, expectedPath) {
  const initial = validTracking();
  const replacement = mutator(initial);
  const candidate = replacement === undefined ? initial : replacement;
  const result = validateTrackingObject(candidate, { expectedChange: "example-change" });
  assert.equal(result.valid, false);
  assert.ok(result.issues.some((issue) => issue.path === expectedPath), JSON.stringify(result.issues));
}

test("accepts valid v1 metadata and normalizes it deterministically", () => {
  const result = validateTrackingObject(validTracking(), { expectedChange: "example-change" });
  assert.equal(result.valid, true);
  assert.deepEqual(result.issues, []);
  assert.deepEqual(normalizeTracking(validTracking()), validTracking());
});

test("rejects every required tracking field, type, and constrained value", () => {
  const cases = [
    ["root object", () => null, "$"],
    ["missing schema version", (value) => { delete value.schema_version; }, "$.schema_version"],
    ["non-numeric schema version", (value) => { value.schema_version = "1"; }, "$.schema_version"],
    ["non-integral schema version", (value) => { value.schema_version = 1.5; }, "$.schema_version"],
    ["unsupported schema version", (value) => { value.schema_version = 2; }, "$.schema_version"],
    ["missing OpenSpec metadata", (value) => { delete value.openspec; }, "$.openspec"],
    ["invalid OpenSpec metadata type", (value) => { value.openspec = []; }, "$.openspec"],
    ["missing change", (value) => { delete value.openspec.change; }, "$.openspec.change"],
    ["invalid change type", (value) => { value.openspec.change = 1; }, "$.openspec.change"],
    ["empty change", (value) => { value.openspec.change = ""; }, "$.openspec.change"],
    ["missing GitHub metadata", (value) => { delete value.github; }, "$.github"],
    ["invalid GitHub metadata type", (value) => { value.github = []; }, "$.github"],
    ["missing GitHub repository", (value) => { delete value.github.repository; }, "$.github.repository"],
    ["invalid GitHub repository type", (value) => { value.github.repository = 1; }, "$.github.repository"],
    ["invalid GitHub repository shape", (value) => { value.github.repository = "owner/repository/extra"; }, "$.github.repository"],
    ["missing issue", (value) => { delete value.github.issue; }, "$.github.issue"],
    ["invalid issue type", (value) => { value.github.issue = "1"; }, "$.github.issue"],
    ["non-positive issue", (value) => { value.github.issue = 0; }, "$.github.issue"],
    ["non-integral issue", (value) => { value.github.issue = 1.5; }, "$.github.issue"],
    ["missing issue URI", (value) => { delete value.github.issue_url; }, "$.github.issue_url"],
    ["invalid issue URI type", (value) => { value.github.issue_url = 1; }, "$.github.issue_url"],
    ["invalid issue URI", (value) => { value.github.issue_url = "not a URI"; }, "$.github.issue_url"],
    ["missing Project owner", (value) => { delete value.github.project_owner; }, "$.github.project_owner"],
    ["invalid Project owner type", (value) => { value.github.project_owner = 1; }, "$.github.project_owner"],
    ["empty Project owner", (value) => { value.github.project_owner = ""; }, "$.github.project_owner"],
    ["missing Project number", (value) => { delete value.github.project_number; }, "$.github.project_number"],
    ["invalid Project number type", (value) => { value.github.project_number = "1"; }, "$.github.project_number"],
    ["non-positive Project number", (value) => { value.github.project_number = 0; }, "$.github.project_number"],
    ["non-integral Project number", (value) => { value.github.project_number = 1.5; }, "$.github.project_number"],
    ["missing implementation repositories", (value) => { delete value.implementation_repositories; }, "$.implementation_repositories"],
    ["invalid implementation repositories type", (value) => { value.implementation_repositories = {}; }, "$.implementation_repositories"],
    ["empty implementation repositories", (value) => { value.implementation_repositories = []; }, "$.implementation_repositories"],
    ["invalid implementation repository type", (value) => { value.implementation_repositories = [[]]; }, "$.implementation_repositories[0]"],
    ["missing implementation repository identifier", (value) => { delete value.implementation_repositories[0].repository; }, "$.implementation_repositories[0].repository"],
    ["invalid implementation repository identifier type", (value) => { value.implementation_repositories[0].repository = 1; }, "$.implementation_repositories[0].repository"],
    ["invalid implementation repository identifier shape", (value) => { value.implementation_repositories[0].repository = "owner"; }, "$.implementation_repositories[0].repository"],
    ["missing default branch", (value) => { delete value.implementation_repositories[0].default_branch; }, "$.implementation_repositories[0].default_branch"],
    ["invalid default branch type", (value) => { value.implementation_repositories[0].default_branch = 1; }, "$.implementation_repositories[0].default_branch"],
    ["empty default branch", (value) => { value.implementation_repositories[0].default_branch = ""; }, "$.implementation_repositories[0].default_branch"],
    ["missing paths", (value) => { delete value.implementation_repositories[0].paths; }, "$.implementation_repositories[0].paths"],
    ["invalid paths type", (value) => { value.implementation_repositories[0].paths = {}; }, "$.implementation_repositories[0].paths"],
    ["empty paths", (value) => { value.implementation_repositories[0].paths = []; }, "$.implementation_repositories[0].paths"],
    ["invalid path type", (value) => { value.implementation_repositories[0].paths = [1]; }, "$.implementation_repositories[0].paths[0]"],
    ["empty path", (value) => { value.implementation_repositories[0].paths = [""]; }, "$.implementation_repositories[0].paths[0]"]
  ];

  for (const [name, mutator, expectedPath] of cases) assertInvalid(mutator, expectedPath);
});

test("rejects expected-change mismatches and unsafe fields without values", () => {
  const mismatch = validateTrackingObject(validTracking(), { expectedChange: "other-change" });
  assert.equal(mismatch.valid, false);
  assert.ok(mismatch.issues.some((issue) => issue.path === "$.openspec.change"));

  const unsafe = validTracking();
  unsafe.github.token = "redacted";
  const result = validateTrackingObject(unsafe, { expectedChange: "example-change" });
  assert.equal(result.valid, false);
  assert.deepEqual(result.issues, [{ path: "$.github.token", message: "unsafe tracking field is not allowed" }]);
});

test("reports bounded parser errors and stable CLI failure behavior", () => {
  assert.throws(
    () => parseTrackingYaml("openspec:\n    change: example-change\n"),
    /invalid tracking YAML: unexpected indentation at line 2/
  );

  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tracking-validation-"));
  const filePath = path.join(directory, "tracking.yaml");
  try {
    fs.writeFileSync(filePath, "openspec:\n    change: example-change\n");
    const malformed = spawnSync(process.execPath, ["scripts/validation/validate-tracking.mjs", filePath], {
      cwd: repoRoot,
      encoding: "utf8"
    });
    assert.equal(malformed.status, 2);
    assert.match(malformed.stderr, /invalid tracking YAML: unexpected indentation at line 2/);
    assert.equal(malformed.stdout, "");

    fs.writeFileSync(filePath, stringifyTracking({ ...validTracking(), openspec: { change: "other-change" } }));
    const invalid = spawnSync(process.execPath, ["scripts/validation/validate-tracking.mjs", filePath], {
      cwd: repoRoot,
      encoding: "utf8"
    });
    assert.equal(invalid.status, 1);
    assert.match(invalid.stderr, /^\$\.openspec\.change: change name does not match expected /m);
    assert.equal(invalid.stdout, "");
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test("parse, stringify, and parse preserve valid normalized metadata", () => {
  const initial = validTracking();
  initial.implementation_repositories[0].paths = ["z.mjs", "a.mjs"];
  const roundTripped = parseTrackingYaml(stringifyTracking(initial));
  const initialValidation = validateTrackingObject(initial, { expectedChange: "example-change" });
  const roundTripValidation = validateTrackingObject(roundTripped, { expectedChange: "example-change" });

  assert.equal(initialValidation.valid, true);
  assert.equal(roundTripValidation.valid, true);
  assert.deepEqual(normalizeTracking(roundTripped), normalizeTracking(initial));
});
