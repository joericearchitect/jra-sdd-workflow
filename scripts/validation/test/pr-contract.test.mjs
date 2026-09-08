import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

import { validatePrContract } from "../validate-pr-contract.mjs";

test("accepts a completed implementation PR body", () => {
  const result = validatePrContract({
    body: "Closes #123\n\nOpenSpec change: example-change"
  });

  assert.deepEqual(result, {
    valid: true,
    issues: [],
    issue: 123,
    change: "example-change"
  });
});

test("accepts a completed lifecycle-record PR body", () => {
  const result = validatePrContract({
    body: "Related to #123\n\nOpenSpec change: example-change"
  });

  assert.equal(result.valid, true);
  assert.equal(result.issue, 123);
  assert.equal(result.change, "example-change");
});

test("accepts alternative closing issue-reference terms", () => {
  for (const [term, issue] of [["Fixes", 456], ["Resolves", 789]]) {
    const result = validatePrContract({
      body: `${term} #${issue}\n\nOpenSpec change: example-change`
    });

    assert.equal(result.valid, true);
    assert.equal(result.issue, issue);
    assert.equal(result.change, "example-change");
  }
});

test("rejects a PR body without an OpenSpec change marker", () => {
  const result = validatePrContract({ body: "Closes #123" });

  assert.equal(result.valid, false);
  assert.ok(result.issues.some((issue) => issue.ruleId === "pr.openspec_change"));
});

test("rejects the retired changed-path flag through the generic parser", () => {
  const directory = mkdtempSync(join(tmpdir(), "pr-contract-"));
  const bodyPath = join(directory, "body.md");
  const changedPathsPath = join(directory, "changed-paths.txt");
  writeFileSync(bodyPath, "Closes #123\n\nOpenSpec change: example-change");
  writeFileSync(changedPathsPath, "scripts/example.mjs\n");

  const result = spawnSync(process.execPath, [
    "scripts/validation/validate-pr-contract.mjs",
    "--body-file", bodyPath,
    "--changed-paths-file", changedPathsPath
  ], { encoding: "utf8" });

  assert.equal(result.status, 2);
  assert.match(result.stderr, /unexpected argument: --changed-paths-file/);
});
