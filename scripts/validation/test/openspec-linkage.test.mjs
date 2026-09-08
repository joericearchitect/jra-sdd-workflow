import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { validateOpenSpecLinkage } from "../validate-openspec-linkage.mjs";

function createRepository() {
  const repository = mkdtempSync(join(tmpdir(), "openspec-linkage-"));
  const changeDirectory = join(repository, "openspec/changes/example-change");
  mkdirSync(changeDirectory, { recursive: true });
  writeFileSync(join(changeDirectory, "tracking.yaml"), `schema_version: 1
openspec:
  change: example-change
github:
  repository: example/repository
  issue: 123
  issue_url: https://example.test/issues/123
  project_owner: example
  project_number: 1
implementation_repositories:
  - repository: example/repository
    default_branch: main
    paths:
      - scripts/example.mjs
`);
  return { repository, changeDirectory };
}

test("accepts linkage with a matching tracked issue", () => {
  const { repository, changeDirectory } = createRepository();
  const result = validateOpenSpecLinkage({
    body: "Closes #123\n\nOpenSpec change: example-change",
    repoRoot: repository
  });

  assert.equal(result.valid, true);
  assert.deepEqual(result.issues, []);
  assert.equal(result.changeDir, changeDirectory);
  assert.deepEqual(result.pr, {
    valid: true,
    issues: [],
    issue: 123,
    change: "example-change"
  });
});

test("rejects linkage with a mismatched tracked issue", () => {
  const { repository } = createRepository();
  const result = validateOpenSpecLinkage({
    body: "Closes #456\n\nOpenSpec change: example-change",
    repoRoot: repository
  });

  assert.equal(result.valid, false);
  assert.ok(result.issues.some((issue) => issue.ruleId === "openspec.issue_match"));
});

test("rejects the retired changed-path flag through the generic parser", () => {
  const result = spawnSync(process.execPath, [
    "scripts/validation/validate-openspec-linkage.mjs",
    "--changed-paths-file", "changed-paths.txt"
  ], { encoding: "utf8" });

  assert.equal(result.status, 2);
  assert.match(result.stderr, /unexpected argument: --changed-paths-file/);
});
