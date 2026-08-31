import assert from "node:assert/strict";
import test from "node:test";

import { scanContent } from "../validate-no-hardcoded-environment.mjs";

const ruleIds = (findings) => findings.map((finding) => finding.rule).sort();

test("rejects the local identity anywhere in a portable asset", () => {
  const findings = scanContent("skills/x/SKILL.md", "Use the repository owned by acme-corp.", ["acme-corp"]);
  assert.deepEqual(ruleIds(findings), ["local-identity"]);
  assert.equal(findings[0].line, 1);
});

test("identity match is case-insensitive but respects word boundaries", () => {
  assert.equal(scanContent("a.md", "owner: Acme-Corp", ["acme-corp"]).length, 1);
  assert.equal(scanContent("a.md", "acme-corporation-holdings is unrelated", ["acme-corp"]).length, 0);
});

test("rejects absolute filesystem paths", () => {
  assert.deepEqual(ruleIds(scanContent("a.md", 'run "/Users/someone/project/x.mjs"')), ["absolute-path"]);
  assert.deepEqual(ruleIds(scanContent("a.md", "cd /home/build/app")), ["absolute-path"]);
});

test("rejects a URL naming a specific repository but allows a placeholder", () => {
  assert.deepEqual(ruleIds(scanContent("a.md", "see https://github.com/acme/widgets/blob/main/x.md")), ["instance-url"]);
  assert.equal(scanContent("a.md", "see https://github.com/<owner>/<repo>").length, 0);
});

test("rejects email addresses and credential-shaped literals", () => {
  assert.deepEqual(ruleIds(scanContent("a.md", "contact someone@example.com")), ["email-address"]);
  assert.deepEqual(ruleIds(scanContent("a.md", "token: ghp_abcdefghijklmnopqrstuvwxyz0123")), ["credential"]);
  assert.deepEqual(ruleIds(scanContent("a.md", "key: sk-abcdefghijklmnopqrstuvwxyz")), ["credential"]);
});

test("authoring-repo paths are rejected only in a portable asset", () => {
  const line = "run scripts/validation/check.mjs";
  assert.equal(scanContent(".github/workflows/ci.yml", line, [], { portable: false }).length, 0);
  assert.deepEqual(ruleIds(scanContent("skills/x/SKILL.md", line, [], { portable: true })), ["authoring-repo-path"]);
});

test("an annotated line is exempt, but a bare marker is not", () => {
  assert.equal(scanContent("a.md", "url https://github.com/acme/widgets  <!-- allow-hardcoded: upstream project -->").length, 0);
  assert.equal(scanContent("a.md", "url https://github.com/acme/widgets  <!-- allow-hardcoded: -->").length, 1);
});

test("reports the accurate line number and a bounded excerpt", () => {
  const [finding] = scanContent("a.md", ["clean", "clean", "owner acme-corp here"].join("\n"), ["acme-corp"]);
  assert.equal(finding.line, 3);
  assert.equal(finding.file, "a.md");
  assert.ok(finding.excerpt.length <= 80);
});

test("clean content produces no findings", () => {
  const content = [
    "Derive the owner from `git remote get-url origin`.",
    "See https://github.com/<owner>/<repo> for the pattern.",
    "Paths are workspace-relative."
  ].join("\n");
  assert.deepEqual(scanContent("skills/x/SKILL.md", content, ["acme-corp"], { portable: true }), []);
});
