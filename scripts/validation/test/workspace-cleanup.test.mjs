import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  classifyResource,
  evaluateEntryGates,
  normalizeWorkspaceCleanup,
  parseWorkspaceCleanupJson,
  readWorkspaceCleanupFile,
  resourceKey,
  resumeCleanup,
  validateActionOrder,
  validateReceiptObject,
  validateRegisterObject,
  validateRegistrationTransition,
  validateWorkspaceCleanupObject
} from "../lib/workspace-cleanup.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const commit = "0123456789abcdef0123456789abcdef01234567";
const deliveredCommit = "89abcdef0123456789abcdef0123456789abcdef";
const lifecycleDeliveredCommit = "fedcba9876543210fedcba9876543210fedcba98";
const cleanInspection = {
  exists: true,
  primary: false,
  dirty: false,
  locked: false,
  unknown: false,
  externally_referenced: false,
  identity_mismatch: false,
  delivery_mismatch: false,
  state_drift: false
};

function key(role, kind, attempt = 1) {
  return { change: "example-change", role, kind, attempt };
}

function branch(role = "implementation", overrides = {}) {
  return {
    ...key(role, "branch"),
    state: "registered",
    starting_commit: commit,
    intended_identity: `refs/heads/example-${role}`,
    actual_identity: `refs/heads/example-${role}`,
    recovery_reference: "Re-audit from the repository root.",
    delivery: {
      pull_request: role === "implementation" ? 10 : 11,
      delivered_commit: role === "implementation" ? deliveredCommit : lifecycleDeliveredCommit
    },
    ...overrides
  };
}

function worktree(role = "implementation", overrides = {}) {
  return {
    ...key(role, "worktree"),
    state: "registered",
    starting_commit: commit,
    intended_identity: `example-${role}`,
    actual_identity: `example-${role}`,
    associated_branch: key(role, "branch"),
    recovery_reference: "Preserve it and repeat live inspection.",
    delivery: {
      pull_request: role === "implementation" ? 10 : 11,
      delivered_commit: role === "implementation" ? deliveredCommit : lifecycleDeliveredCommit
    },
    ...overrides
  };
}

function validRegister() {
  return {
    schema_version: 1,
    record_type: "workspace-cleanup-register-v1",
    change: "example-change",
    resources: [branch(), worktree(), branch("lifecycle-record"), worktree("lifecycle-record")]
  };
}

function gates(project = "not-applicable") {
  return {
    implementation_pull_request: "passed",
    lifecycle_record_pull_request: "passed",
    issue: "passed",
    archive: "passed",
    living_spec: "passed",
    project
  };
}

function receiptEntry(resource, overrides = {}) {
  return {
    key: key(resource.role, resource.kind, resource.attempt),
    classification: "eligible",
    authorized_action: resource.kind === "worktree" ? "remove-worktree" : "delete-local-branch",
    outcome: "completed",
    recovery_reference: "Use the delivered commit to recover if needed.",
    manual_effort_minutes: 1,
    friction_codes: [],
    ...overrides
  };
}

function validReceipt(register = validRegister()) {
  const ordered = [...register.resources].sort((left, right) => {
    if (left.role !== right.role) return left.role.localeCompare(right.role);
    if (left.attempt !== right.attempt) return left.attempt - right.attempt;
    return left.kind === "worktree" ? -1 : 1;
  });
  return {
    schema_version: 1,
    record_type: "cleanup-run-v1",
    change: register.change,
    run: 1,
    status: "completed",
    authorization: "authorized",
    entry_gates: gates(),
    resources: ordered.map((resource) => receiptEntry(resource))
  };
}

function assertInvalid(candidate, expectedPath, options = {}) {
  const result = validateWorkspaceCleanupObject(candidate, { expectedChange: "example-change", ...options });
  assert.equal(result.valid, false, JSON.stringify(result));
  assert.ok(result.issues.some((item) => item.path === expectedPath), JSON.stringify(result.issues));
}

test("valid register and receipt round-trip to deterministic normalized records", () => {
  const register = validRegister();
  const receipt = validReceipt(register);
  assert.equal(validateRegisterObject(register, { expectedChange: register.change }).valid, true);
  assert.equal(validateReceiptObject(receipt, { expectedChange: receipt.change, register }).valid, true);

  const first = JSON.stringify(normalizeWorkspaceCleanup(register));
  const second = JSON.stringify(normalizeWorkspaceCleanup(parseWorkspaceCleanupJson(first)));
  assert.equal(second, first);

  const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, "schemas/workspace-cleanup-v1.schema.json"), "utf8"));
  assert.equal(schema.$id, "urn:workspace-cleanup:v1");
  assert.deepEqual(schema.oneOf, [{ $ref: "#/$defs/register" }, { $ref: "#/$defs/receipt" }]);
  assert.ok(schema.$defs.resourceKey.required.includes("kind"));
  assert.equal(schema.$defs.resource.allOf.length, 3);
  assert.equal(schema.$defs.receiptResource.allOf.length, 5);
  assert.equal(schema.$defs.receipt.allOf.length, 6);
});

test("register enforces complete compound keys, unique resources, and positive contiguous attempts", () => {
  const missing = validRegister();
  delete missing.resources[0].kind;
  assertInvalid(missing, "$.resources[0].kind");

  const duplicate = validRegister();
  duplicate.resources.push(structuredClone(duplicate.resources[0]));
  assertInvalid(duplicate, "$.resources[4]");

  const invalidAttempt = validRegister();
  invalidAttempt.resources[0].attempt = 0;
  assertInvalid(invalidAttempt, "$.resources[0].attempt");

  const skippedAttempt = validRegister();
  skippedAttempt.resources.push(branch("implementation", { attempt: 3, state: "planned", actual_identity: undefined, delivery: undefined }));
  assertInvalid(skippedAttempt, "$.resources[4].attempt");
});

test("register and receipt reject missing or ill-typed required fields", () => {
  const cases = [
    [() => { const value = validRegister(); delete value.schema_version; return value; }, "$.schema_version"],
    [() => ({ ...validRegister(), resources: {} }), "$.resources"],
    [() => ({ ...validRegister(), change: 1 }), "$.change"],
    [() => { const value = validReceipt(); delete value.entry_gates; return value; }, "$.entry_gates"],
    [() => ({ ...validReceipt(), run: "1" }), "$.run"],
    [() => { const value = validReceipt(); value.resources[0].manual_effort_minutes = "0"; return value; }, "$.resources[0].manual_effort_minutes"]
  ];
  for (const [candidate, expectedPath] of cases) assertInvalid(candidate(), expectedPath);
});

test("replacement attempts preserve cancelled or blocked history per role and kind", () => {
  const register = validRegister();
  register.resources = [
    branch("implementation"),
    worktree("implementation", { state: "blocked", actual_identity: undefined, delivery: undefined, outcome_reason: "Inspection differed." }),
    worktree("implementation", {
      attempt: 2,
      starting_commit: lifecycleDeliveredCommit,
      intended_identity: "example-implementation-2",
      actual_identity: "example-implementation-2",
      associated_branch: key("implementation", "branch", 1)
    })
  ];
  assert.equal(validateRegisterObject(register).valid, true);

  const illegal = validRegister();
  illegal.resources.push(branch("implementation", { attempt: 2 }));
  assertInvalid(illegal, "$.resources[0].state");
});

test("branch and worktree kinds and delivery roles remain separate", () => {
  const register = validRegister();
  assert.equal(new Set(register.resources.map(resourceKey)).size, 4);
  assert.equal(validateRegisterObject(register).valid, true);

  const wrongAssociation = validRegister();
  wrongAssociation.resources[1].associated_branch.role = "lifecycle-record";
  assertInvalid(wrongAssociation, "$.resources[1].associated_branch");

  const missingAssociation = validRegister();
  missingAssociation.resources = missingAssociation.resources.filter((resource) => !(resource.role === "implementation" && resource.kind === "branch"));
  assertInvalid(missingAssociation, "$.resources[0].associated_branch");

  const deliveryMismatch = validRegister();
  deliveryMismatch.resources[1].delivery.pull_request = 99;
  assertInvalid(deliveryMismatch, "$.resources[1].delivery");

  const nonRegisteredAssociation = validRegister();
  nonRegisteredAssociation.resources[0].state = "planned";
  delete nonRegisteredAssociation.resources[0].actual_identity;
  delete nonRegisteredAssociation.resources[0].delivery;
  assertInvalid(nonRegisteredAssociation, "$.resources[1].associated_branch");

  const crossRoleDeliveryReuse = validRegister();
  crossRoleDeliveryReuse.resources[2].delivery.pull_request = 10;
  assertInvalid(crossRoleDeliveryReuse, "$.resources");

  const crossRoleCommitReuse = validRegister();
  crossRoleCommitReuse.resources[2].delivery.delivered_commit = deliveredCommit;
  assertInvalid(crossRoleCommitReuse, "$.resources");

  const deliveryOnPlan = validRegister();
  deliveryOnPlan.resources[0].state = "planned";
  delete deliveryOnPlan.resources[0].actual_identity;
  assertInvalid(deliveryOnPlan, "$.resources[0].delivery");
});

test("registration accepts exact live evidence and rejects mismatch or primary worktree", () => {
  const planned = {
    ...key("implementation", "worktree"),
    state: "planned",
    starting_commit: commit,
    intended_identity: "example-implementation",
    associated_branch: key("implementation", "branch"),
    recovery_reference: "Cancel this attempt and plan the next one."
  };
  const observed = { ...planned, actual_identity: "example-implementation", primary: false };
  assert.deepEqual(validateRegistrationTransition(planned, observed), { allowed: true, issues: [] });

  assert.equal(validateRegistrationTransition(planned, { ...observed, starting_commit: deliveredCommit }).allowed, false);
  assert.equal(validateRegistrationTransition(planned, { ...observed, intended_identity: "different-name" }).allowed, false);
  assert.equal(validateRegistrationTransition(planned, { ...observed, primary: true }).allowed, false);
  assert.equal(validateRegistrationTransition(planned, { ...observed, primary: undefined }).allowed, false);
  assert.equal(validateRegistrationTransition(planned, { ...observed, associated_branch: key("implementation", "branch", 2) }).allowed, false);
  assert.equal(validateRegistrationTransition({ ...planned, state: "blocked" }, observed).allowed, false);
});

test("delivery gates require every lifecycle result and support configured or absent Project policy", () => {
  assert.deepEqual(evaluateEntryGates(gates("passed")), { ready: true, blocked: [] });
  assert.deepEqual(evaluateEntryGates(gates("not-applicable")), { ready: true, blocked: [] });
  assert.deepEqual(evaluateEntryGates(gates("passed"), { projectConfigured: true }), { ready: true, blocked: [] });
  assert.deepEqual(evaluateEntryGates(gates("not-applicable"), { projectConfigured: true }), { ready: false, blocked: ["project"] });
  assert.deepEqual(evaluateEntryGates(gates("not-applicable"), { projectConfigured: false }), { ready: true, blocked: [] });
  const incomplete = gates("blocked");
  incomplete.issue = "blocked";
  assert.deepEqual(evaluateEntryGates(incomplete), { ready: false, blocked: ["issue", "project"] });

  const receipt = validReceipt();
  receipt.authorization = "authorized";
  receipt.entry_gates.project = "blocked";
  assertInvalid(receipt, "$.authorization");

  const configured = validReceipt();
  configured.entry_gates.project = "not-applicable";
  assert.equal(validateReceiptObject(configured, { projectConfigured: true }).valid, false);
});

test("audit classifications preserve primary, dirty, locked, unknown, mismatched, external, and legacy state", () => {
  const resource = branch();
  assert.deepEqual(classifyResource(resource, cleanInspection, { gatesReady: true }), { classification: "eligible", action: "delete-local-branch" });
  assert.equal(classifyResource(worktree(), cleanInspection, { gatesReady: true }).action, "remove-worktree");
  assert.equal(classifyResource(resource, { exists: false }, { gatesReady: true }).classification, "already-absent");
  assert.match(classifyResource(resource, null, { gatesReady: true }).reason, /inspection/);
  assert.match(classifyResource({ ...resource, state: "planned" }, cleanInspection).reason, /not registered/);
  assert.match(classifyResource(resource, cleanInspection).reason, /gates/);
  assert.match(classifyResource(resource, cleanInspection, { gatesReady: false }).reason, /gates/);
  assert.match(classifyResource(resource, { exists: true }, { gatesReady: true }).reason, /unavailable/);
  assert.match(classifyResource({ ...resource, delivery: undefined }, cleanInspection, { gatesReady: true }).reason, /delivery binding/);

  for (const field of ["primary", "dirty", "locked", "unknown", "identity_mismatch", "delivery_mismatch", "externally_referenced", "state_drift"]) {
    const result = classifyResource(resource, { ...cleanInspection, [field]: true }, { gatesReady: true });
    assert.equal(result.classification, "ineligible", field);
  }

  const legacy = branch("implementation", { change: "unregistered-change" });
  const registeredKeys = new Set(validRegister().resources.map(resourceKey));
  assert.equal(registeredKeys.has(resourceKey(legacy)), false);
});

test("receipts cover every registered resource and enforce worktree-before-branch order", () => {
  const register = validRegister();
  const receipt = validReceipt(register);
  assert.equal(validateReceiptObject(receipt, { register }).valid, true);

  const omitted = structuredClone(receipt);
  omitted.resources.pop();
  assertInvalid(omitted, "$.resources", { register });

  const legacy = structuredClone(receipt);
  legacy.resources.push(receiptEntry(branch("implementation", { attempt: 2 }), { key: key("implementation", "branch", 2) }));
  assertInvalid(legacy, "$.resources", { register });

  const reversed = structuredClone(receipt);
  [reversed.resources[0], reversed.resources[1]] = [reversed.resources[1], reversed.resources[0]];
  assert.equal(validateActionOrder(reversed.resources).valid, false);
  assertInvalid(reversed, "$.resources[0]");

  const started = validReceipt(register);
  started.status = "started";
  for (const resource of started.resources) resource.outcome = "pending";
  assert.equal(validateReceiptObject(started, { register }).valid, true);

  const normalized = normalizeWorkspaceCleanup(receipt);
  assert.equal(validateReceiptObject(normalized, { register }).valid, true);

  const missingDelivery = validRegister();
  delete missingDelivery.resources[0].delivery;
  delete missingDelivery.resources[1].delivery;
  assert.equal(validateRegisterObject(missingDelivery).valid, true);
  assertInvalid(validReceipt(missingDelivery), "$.resources", { register: missingDelivery });
});

test("receipt classification, outcome, status, and authorization combinations are coherent", () => {
  const unauthorized = validReceipt();
  unauthorized.authorization = "not-authorized";
  assertInvalid(unauthorized, "$.authorization");

  const absentWithAction = validReceipt();
  absentWithAction.resources[0] = receiptEntry(worktree(), {
    classification: "already-absent",
    outcome: "already-absent"
  });
  assertInvalid(absentWithAction, "$.resources[0].authorized_action");

  const eligibleAbsent = validReceipt();
  eligibleAbsent.resources[0].outcome = "already-absent";
  assertInvalid(eligibleAbsent, "$.resources[0].outcome");

  const ineligibleFailed = validReceipt();
  ineligibleFailed.resources[0] = receiptEntry(worktree(), {
    classification: "ineligible",
    authorized_action: "none",
    outcome: "failed",
    preservation_reason: "Live state did not match."
  });
  assertInvalid(ineligibleFailed, "$.resources[0].outcome");

  const strayReason = validReceipt();
  strayReason.resources[0].preservation_reason = "Not applicable to eligible resources.";
  assertInvalid(strayReason, "$.resources[0].preservation_reason");

  const expiredStarted = validReceipt();
  expiredStarted.status = "started";
  expiredStarted.authorization = "expired";
  assertInvalid(expiredStarted, "$.status");

  const blockedAuthorized = validReceipt();
  blockedAuthorized.status = "blocked";
  assertInvalid(blockedAuthorized, "$.authorization");

  const blockedButFinished = validReceipt();
  blockedButFinished.status = "blocked";
  blockedButFinished.authorization = "expired";
  assertInvalid(blockedButFinished, "$.status");

  const startedButFinished = validReceipt();
  startedButFinished.status = "started";
  assertInvalid(startedButFinished, "$.status");
});

test("interrupted receipts resume without replay and require re-audit after drift", () => {
  const receipt = validReceipt();
  receipt.status = "started";
  receipt.resources[1].outcome = "failed";
  receipt.resources[2].outcome = "pending";
  const driftKey = resourceKey(receipt.resources[2]);
  const result = resumeCleanup(receipt, new Map([[driftKey, { exists: true, state_drift: true }]]));
  assert.equal(result.complete.length, 2);
  assert.equal(result.reAudit.length, 2);
  assert.deepEqual(result.reAudit[1].observation, { exists: true, state_drift: true });

  const completed = structuredClone(receipt);
  completed.status = "completed";
  assertInvalid(completed, "$.status");

  const drifted = validReceipt();
  drifted.status = "blocked";
  drifted.authorization = "expired";
  drifted.resources[0].outcome = "failed";
  drifted.resources[1].outcome = "pending";
  assert.equal(validateReceiptObject(drifted).valid, true);
});

test("zero-resource completed receipts are valid but do not represent an automated qualifying run", () => {
  const register = { ...validRegister(), resources: [] };
  const receipt = { ...validReceipt(register), authorization: "not-authorized", resources: [] };
  assert.equal(validateReceiptObject(receipt, { register }).valid, true);
  assert.deepEqual(resumeCleanup(receipt), { complete: [], reAudit: [] });
});

test("security policy rejects sensitive fields, raw output, executable text fields, remote actions, and absolute paths without echoing values", () => {
  for (const [field, value] of [
    ["token", "sensitive-value"],
    ["auth_output", "sensitive-value"],
    ["command", "delete something"],
    ["body", "untrusted pull request text"]
  ]) {
    const candidate = validRegister();
    candidate[field] = value;
    const result = validateRegisterObject(candidate);
    assert.equal(result.valid, false);
    assert.doesNotMatch(JSON.stringify(result.issues), /sensitive-value|delete something|untrusted pull request text/);
  }

  const absolute = validRegister();
  absolute.resources[0].recovery_reference = "/private/example/worktree";
  const result = validateRegisterObject(absolute);
  assert.equal(result.valid, false);
  assert.doesNotMatch(JSON.stringify(result.issues), /private\/example/);

  const credential = validRegister();
  credential.resources[0].recovery_reference = "ghp_1234567890abcdefghijkl";
  const credentialResult = validateRegisterObject(credential);
  assert.equal(credentialResult.valid, false);
  assert.doesNotMatch(JSON.stringify(credentialResult.issues), /1234567890/);

  const remote = validReceipt();
  remote.resources[0].authorized_action = "delete-remote-branch";
  assertInvalid(remote, "$.resources[0].authorized_action");
});

test("equivalent assistant input produces the same normalized decisions", () => {
  const input = validRegister();
  for (const assistant of ["claude", "codex", "cline", "continue"]) {
    const parsed = parseWorkspaceCleanupJson(JSON.stringify(input));
    const validation = validateRegisterObject(parsed);
    assert.equal(validation.valid, true, assistant);
    assert.deepEqual(normalizeWorkspaceCleanup(parsed), normalizeWorkspaceCleanup(input), assistant);
    assert.deepEqual(classifyResource(parsed.resources[0], cleanInspection, { gatesReady: true }), { classification: "eligible", action: "delete-local-branch" });
  }
});

test("CLI succeeds on an explicit record and fails with bounded path-free diagnostics", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "workspace-cleanup-validation-"));
  const registerPath = path.join(directory, "register.json");
  const receiptPath = path.join(directory, "cleanup-run-1.json");
  try {
    fs.writeFileSync(registerPath, JSON.stringify(validRegister()));
    fs.writeFileSync(receiptPath, JSON.stringify(validReceipt()));
    const success = spawnSync(process.execPath, ["scripts/validation/validate-workspace-cleanup.mjs", "--change", "example-change", registerPath], {
      cwd: repoRoot,
      encoding: "utf8"
    });
    assert.equal(success.status, 0, success.stderr);
    assert.match(success.stdout, /validation passed for example-change/);

    const receiptSuccess = spawnSync(process.execPath, ["scripts/validation/validate-workspace-cleanup.mjs", "--register", registerPath, "--no-project", receiptPath], {
      cwd: repoRoot,
      encoding: "utf8"
    });
    assert.equal(receiptSuccess.status, 0, receiptSuccess.stderr);

    const missingReceiptContext = spawnSync(process.execPath, ["scripts/validation/validate-workspace-cleanup.mjs", receiptPath], {
      cwd: repoRoot,
      encoding: "utf8"
    });
    assert.equal(missingReceiptContext.status, 2);
    assert.match(missingReceiptContext.stderr, /requires --register/);

    const alternateRegisterPath = path.join(directory, "alternate-register.json");
    fs.writeFileSync(alternateRegisterPath, JSON.stringify(validRegister()));
    const wrongRegisterName = spawnSync(process.execPath, ["scripts/validation/validate-workspace-cleanup.mjs", "--register", alternateRegisterPath, "--no-project", receiptPath], {
      cwd: repoRoot,
      encoding: "utf8"
    });
    assert.equal(wrongRegisterName.status, 2);
    assert.match(wrongRegisterName.stderr, /referenced register filename must be register.json/);

    const conflictingPolicy = spawnSync(process.execPath, ["scripts/validation/validate-workspace-cleanup.mjs", "--project-configured", "--no-project", registerPath], {
      cwd: repoRoot,
      encoding: "utf8"
    });
    assert.equal(conflictingPolicy.status, 2);
    assert.match(conflictingPolicy.stderr, /mutually exclusive/);

    const missingOptionValue = spawnSync(process.execPath, ["scripts/validation/validate-workspace-cleanup.mjs", "--change", "--json", registerPath], {
      cwd: repoRoot,
      encoding: "utf8"
    });
    assert.equal(missingOptionValue.status, 2);
    assert.match(missingOptionValue.stderr, /--change requires a value/);

    fs.writeFileSync(registerPath, JSON.stringify({ ...validRegister(), token: "never-print-this" }));
    const failure = spawnSync(process.execPath, ["scripts/validation/validate-workspace-cleanup.mjs", registerPath], {
      cwd: repoRoot,
      encoding: "utf8"
    });
    assert.equal(failure.status, 1);
    assert.match(failure.stderr, /^\$\.token: unsafe field is not allowed/m);
    assert.doesNotMatch(`${failure.stdout}${failure.stderr}`, /never-print-this|workspace-cleanup-validation-/);

    fs.writeFileSync(registerPath, "{invalid");
    const malformed = spawnSync(process.execPath, ["scripts/validation/validate-workspace-cleanup.mjs", registerPath], {
      cwd: repoRoot,
      encoding: "utf8"
    });
    assert.equal(malformed.status, 2);
    assert.match(malformed.stderr, /invalid workspace-cleanup JSON/);
    assert.doesNotMatch(malformed.stderr, new RegExp(directory.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test("explicit file reader returns validated normalized content without Git or GitHub effects", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "workspace-cleanup-reader-"));
  const file = path.join(directory, "register.json");
  try {
    fs.writeFileSync(file, JSON.stringify(validRegister()));
    const result = readWorkspaceCleanupFile(file, { expectedChange: "example-change" });
    assert.equal(result.validation.valid, true);
    assert.equal(result.normalized.record_type, "workspace-cleanup-register-v1");
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test("non-destructive record walkthrough reaches a valid zero-action receipt", () => {
  const plannedBranch = {
    ...key("implementation", "branch"),
    state: "planned",
    starting_commit: commit,
    intended_identity: "refs/heads/example-implementation",
    recovery_reference: "Cancel the attempt if exact inspection does not match."
  };
  const plannedRegister = {
    schema_version: 1,
    record_type: "workspace-cleanup-register-v1",
    change: "example-change",
    resources: [plannedBranch]
  };
  assert.equal(validateRegisterObject(plannedRegister).valid, true);

  const inspection = { ...plannedBranch, actual_identity: plannedBranch.intended_identity, primary: false };
  assert.equal(validateRegistrationTransition(plannedBranch, inspection).allowed, true);
  const registeredBranch = {
    ...plannedBranch,
    state: "registered",
    actual_identity: plannedBranch.intended_identity,
    delivery: { pull_request: 10, delivered_commit: deliveredCommit }
  };
  const registered = { ...plannedRegister, resources: [registeredBranch] };
  assert.equal(validateRegisterObject(registered).valid, true);
  assert.equal(evaluateEntryGates(gates("passed"), { projectConfigured: true }).ready, true);
  assert.equal(classifyResource(registeredBranch, { exists: false }, { gatesReady: true }).classification, "already-absent");

  const zeroActionReceipt = {
    schema_version: 1,
    record_type: "cleanup-run-v1",
    change: "example-change",
    run: 1,
    status: "completed",
    authorization: "not-authorized",
    entry_gates: gates("passed"),
    resources: [receiptEntry(registeredBranch, {
      classification: "already-absent",
      authorized_action: "none",
      outcome: "already-absent",
      manual_effort_minutes: 0
    })]
  };
  assert.equal(validateReceiptObject(zeroActionReceipt, { register: registered, projectConfigured: true }).valid, true);
  assert.deepEqual(resumeCleanup(zeroActionReceipt), { complete: [resourceKey(registeredBranch)], reAudit: [] });
});
