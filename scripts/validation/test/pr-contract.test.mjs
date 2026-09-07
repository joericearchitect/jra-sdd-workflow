import assert from "node:assert/strict";
import test from "node:test";

import { validatePrContract } from "../validate-pr-contract.mjs";

test("accepts a completed implementation PR body", () => {
  const result = validatePrContract({
    body: "Closes #123\n\nOpenSpec change: example-change"
  });

  assert.equal(result.valid, true);
  assert.equal(result.issue, 123);
  assert.equal(result.change, "example-change");
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
