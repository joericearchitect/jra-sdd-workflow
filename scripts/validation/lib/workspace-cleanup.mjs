import fs from "node:fs";

const CHANGE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const COMMIT = /^[0-9a-f]{40}(?:[0-9a-f]{24})?$/i;
const FRICTION_CODE = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*$/;
const ROLE = new Set(["implementation", "lifecycle-record"]);
const KIND = new Set(["branch", "worktree"]);
const STATE = new Set(["planned", "registered", "cancelled", "blocked"]);
const CLASSIFICATION = new Set(["eligible", "already-absent", "ineligible"]);
const ACTION = new Set(["none", "remove-worktree", "delete-local-branch"]);
const OUTCOME = new Set(["pending", "completed", "already-absent", "intentionally-ineligible", "failed"]);
const STATUS = new Set(["started", "completed", "blocked"]);
const AUTHORIZATION = new Set(["not-authorized", "authorized", "expired"]);
const UNSAFE_FIELD = /(token|secret|password|credential|auth(?:entication|orization)?_output|raw_(?:output|log)|stdout|stderr|command|script|body|project_item|field_id|option_id|timestamp|closed_at|merged_at)$/i;
const ABSOLUTE_PATH = /^(?:\/(?:[^/]+\/)*[^/]*|[A-Za-z]:[\\/]|\\\\|~[\\/])/;
const CREDENTIAL_VALUE = /\b(?:gh[pousr]_[A-Za-z0-9]{16,}|sk-[A-Za-z0-9]{16,}|AKIA[0-9A-Z]{12,}|xox[baprs]-[A-Za-z0-9-]{10,})\b/;

function issue(issues, path, message, expected) {
  issues.push({ path, message, ...(expected ? { expected } : {}) });
}

function object(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function expectObject(value, path, issues) {
  if (!object(value)) issue(issues, path, "invalid field type", "object");
  return object(value);
}

function expectArray(value, path, issues) {
  if (!Array.isArray(value)) issue(issues, path, "invalid field type", "array");
  return Array.isArray(value);
}

function required(value, key, path, issues) {
  if (!object(value) || !(key in value) || value[key] === undefined) {
    issue(issues, `${path}.${key}`, "missing required field");
    return undefined;
  }
  return value[key];
}

function expectString(value, path, issues, { max = 240, pattern } = {}) {
  if (typeof value !== "string") {
    issue(issues, path, "invalid field type", "string");
    return false;
  }
  if (value.length === 0 || value.length > max) issue(issues, path, "string length is outside allowed bounds", `1-${max} characters`);
  if (pattern && !pattern.test(value)) issue(issues, path, "invalid string format");
  if (ABSOLUTE_PATH.test(value)) issue(issues, path, "absolute paths are not allowed");
  if (/\r|\n/.test(value)) issue(issues, path, "multiline text is not allowed");
  if (CREDENTIAL_VALUE.test(value)) issue(issues, path, "credential-shaped values are not allowed");
  return true;
}

function expectInteger(value, path, issues, minimum = 1) {
  if (!Number.isInteger(value) || value < minimum) issue(issues, path, "invalid integer", `integer >= ${minimum}`);
}

function expectEnum(value, path, allowed, issues) {
  if (!allowed.has(value)) issue(issues, path, "unsupported value", [...allowed].join(" | "));
}

function expectExactKeys(value, path, allowed, issues) {
  if (!object(value)) return;
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) issue(issues, `${path}.${key}`, "unexpected field");
  }
}

function scanUnsafe(value, path, issues) {
  if (!object(value) && !Array.isArray(value)) return;
  for (const [key, child] of Object.entries(value)) {
    const childPath = Array.isArray(value) ? `${path}[${key}]` : `${path}.${key}`;
    if (!Array.isArray(value) && UNSAFE_FIELD.test(key)) issue(issues, childPath, "unsafe field is not allowed");
    if (typeof child === "string" && ABSOLUTE_PATH.test(child)) issue(issues, childPath, "absolute paths are not allowed");
    else if (typeof child === "string" && CREDENTIAL_VALUE.test(child)) issue(issues, childPath, "credential-shaped values are not allowed");
    else scanUnsafe(child, childPath, issues);
  }
}

function validateKey(value, path, issues, expectedChange) {
  if (!expectObject(value, path, issues)) return;
  expectExactKeys(value, path, new Set(["change", "role", "kind", "attempt"]), issues);
  const change = required(value, "change", path, issues);
  if (expectString(change, `${path}.change`, issues, { max: 120, pattern: CHANGE }) && expectedChange && change !== expectedChange) {
    issue(issues, `${path}.change`, "change does not match containing document");
  }
  const role = required(value, "role", path, issues);
  expectEnum(role, `${path}.role`, ROLE, issues);
  const kind = required(value, "kind", path, issues);
  expectEnum(kind, `${path}.kind`, KIND, issues);
  expectInteger(required(value, "attempt", path, issues), `${path}.attempt`, issues);
}

export function resourceKey(value) {
  const source = value.key ?? value;
  return `${source.change}/${source.role}/${source.kind}/${source.attempt}`;
}

function validateDelivery(value, path, issues) {
  if (!expectObject(value, path, issues)) return;
  expectExactKeys(value, path, new Set(["pull_request", "delivered_commit"]), issues);
  expectInteger(required(value, "pull_request", path, issues), `${path}.pull_request`, issues);
  expectString(required(value, "delivered_commit", path, issues), `${path}.delivered_commit`, issues, { max: 64, pattern: COMMIT });
}

function validateResource(value, path, issues, documentChange) {
  if (!expectObject(value, path, issues)) return;
  expectExactKeys(value, path, new Set([
    "change", "role", "kind", "attempt", "state", "starting_commit",
    "intended_identity", "actual_identity", "associated_branch", "delivery",
    "outcome_reason", "recovery_reference"
  ]), issues);
  validateKey({ change: value.change, role: value.role, kind: value.kind, attempt: value.attempt }, path, issues, documentChange);
  const state = required(value, "state", path, issues);
  expectEnum(state, `${path}.state`, STATE, issues);
  expectString(required(value, "starting_commit", path, issues), `${path}.starting_commit`, issues, { max: 64, pattern: COMMIT });
  expectString(required(value, "intended_identity", path, issues), `${path}.intended_identity`, issues);
  expectString(required(value, "recovery_reference", path, issues), `${path}.recovery_reference`, issues);

  if (state === "registered") {
    expectString(required(value, "actual_identity", path, issues), `${path}.actual_identity`, issues);
  } else if (value.actual_identity !== undefined) {
    issue(issues, `${path}.actual_identity`, "actual identity is allowed only for registered resources");
  }
  if (state === "cancelled" || state === "blocked") {
    expectString(required(value, "outcome_reason", path, issues), `${path}.outcome_reason`, issues);
  } else if (value.outcome_reason !== undefined) {
    issue(issues, `${path}.outcome_reason`, "outcome reason is allowed only for cancelled or blocked resources");
  }
  if (value.kind === "worktree") {
    const associated = required(value, "associated_branch", path, issues);
    validateKey(associated, `${path}.associated_branch`, issues, documentChange);
    if (object(associated)) {
      if (associated.kind !== "branch") issue(issues, `${path}.associated_branch.kind`, "worktree association must identify a branch");
      if (associated.role !== value.role) issue(issues, `${path}.associated_branch`, "associated branch must use the same change and role");
    }
  } else if (value.associated_branch !== undefined) {
    issue(issues, `${path}.associated_branch`, "associated branch is allowed only for worktrees");
  }
  if (value.delivery !== undefined) {
    if (state !== "registered") issue(issues, `${path}.delivery`, "delivery binding requires a registered resource");
    validateDelivery(value.delivery, `${path}.delivery`, issues);
  }
}

function validateGateObject(value, path, issues) {
  if (!expectObject(value, path, issues)) return;
  const ordinary = ["implementation_pull_request", "lifecycle_record_pull_request", "issue", "archive", "living_spec"];
  expectExactKeys(value, path, new Set([...ordinary, "project"]), issues);
  for (const key of ordinary) expectEnum(required(value, key, path, issues), `${path}.${key}`, new Set(["passed", "blocked"]), issues);
  expectEnum(required(value, "project", path, issues), `${path}.project`, new Set(["passed", "blocked", "not-applicable"]), issues);
}

function validateReceiptResource(value, path, issues, documentChange) {
  if (!expectObject(value, path, issues)) return;
  expectExactKeys(value, path, new Set([
    "key", "classification", "authorized_action", "outcome", "preservation_reason",
    "recovery_reference", "manual_effort_minutes", "friction_codes"
  ]), issues);
  validateKey(required(value, "key", path, issues), `${path}.key`, issues, documentChange);
  const classification = required(value, "classification", path, issues);
  const action = required(value, "authorized_action", path, issues);
  const outcome = required(value, "outcome", path, issues);
  expectEnum(classification, `${path}.classification`, CLASSIFICATION, issues);
  expectEnum(action, `${path}.authorized_action`, ACTION, issues);
  expectEnum(outcome, `${path}.outcome`, OUTCOME, issues);
  expectString(required(value, "recovery_reference", path, issues), `${path}.recovery_reference`, issues);
  expectInteger(required(value, "manual_effort_minutes", path, issues), `${path}.manual_effort_minutes`, issues, 0);
  const codes = required(value, "friction_codes", path, issues);
  if (expectArray(codes, `${path}.friction_codes`, issues)) {
    if (codes.length > 20) issue(issues, `${path}.friction_codes`, "too many friction codes", "at most 20");
    const seen = new Set();
    codes.forEach((code, index) => {
      expectString(code, `${path}.friction_codes[${index}]`, issues, { max: 40, pattern: FRICTION_CODE });
      if (seen.has(code)) issue(issues, `${path}.friction_codes[${index}]`, "duplicate friction code");
      seen.add(code);
    });
  }
  if (classification === "ineligible") expectString(required(value, "preservation_reason", path, issues), `${path}.preservation_reason`, issues);
  else if (value.preservation_reason !== undefined) issue(issues, `${path}.preservation_reason`, "preservation reason is allowed only for ineligible resources");
  if (classification === "eligible" && action === "none") issue(issues, `${path}.authorized_action`, "eligible resource requires its exact local action");
  if (classification !== "eligible" && action !== "none") issue(issues, `${path}.authorized_action`, "non-eligible resource cannot have a cleanup action");
  if (object(value.key)) {
    const expectedAction = value.key.kind === "worktree" ? "remove-worktree" : "delete-local-branch";
    if (classification === "eligible" && action !== expectedAction) issue(issues, `${path}.authorized_action`, "action does not match resource kind", expectedAction);
  }
  if (classification === "already-absent" && outcome !== "already-absent") issue(issues, `${path}.outcome`, "already-absent classification requires matching outcome");
  if (classification === "eligible" && !["pending", "completed", "failed"].includes(outcome)) issue(issues, `${path}.outcome`, "eligible resource must be pending, completed, or failed");
  if (classification === "ineligible" && !["pending", "intentionally-ineligible"].includes(outcome)) issue(issues, `${path}.outcome`, "ineligible resource must remain pending or become intentionally ineligible");
}

function validateDocumentHeader(value, issues, expectedChange, expectedType) {
  expectExactKeys(value, "$", expectedType === "workspace-cleanup-register-v1"
    ? new Set(["schema_version", "record_type", "change", "resources"])
    : new Set(["schema_version", "record_type", "change", "run", "status", "authorization", "entry_gates", "resources"]), issues);
  const version = required(value, "schema_version", "$", issues);
  if (version !== 1) issue(issues, "$.schema_version", "unsupported schema version", "1");
  const recordType = required(value, "record_type", "$", issues);
  if (recordType !== expectedType) issue(issues, "$.record_type", "unexpected record type", expectedType);
  const change = required(value, "change", "$", issues);
  if (expectString(change, "$.change", issues, { max: 120, pattern: CHANGE }) && expectedChange && change !== expectedChange) {
    issue(issues, "$.change", "change does not match expected change");
  }
  return change;
}

export function parseWorkspaceCleanupJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("invalid workspace-cleanup JSON: malformed JSON");
  }
}

export function validateRegisterObject(value, { expectedChange } = {}) {
  const issues = [];
  scanUnsafe(value, "$", issues);
  if (!expectObject(value, "$", issues)) return { valid: false, issues };
  const change = validateDocumentHeader(value, issues, expectedChange, "workspace-cleanup-register-v1");
  const resources = required(value, "resources", "$", issues);
  if (expectArray(resources, "$.resources", issues)) {
    const seen = new Set();
    const attempts = new Map();
    resources.forEach((resource, index) => {
      const path = `$.resources[${index}]`;
      validateResource(resource, path, issues, change);
      if (!object(resource)) return;
      const key = resourceKey(resource);
      if (seen.has(key)) issue(issues, path, "duplicate resource key");
      seen.add(key);
      const series = `${resource.change}/${resource.role}/${resource.kind}`;
      const current = attempts.get(series) ?? [];
      current.push({ attempt: resource.attempt, state: resource.state, path });
      attempts.set(series, current);
    });
    for (const series of attempts.values()) {
      series.sort((left, right) => left.attempt - right.attempt);
      series.forEach((entry, index) => {
        if (entry.attempt !== index + 1) issue(issues, `${entry.path}.attempt`, "attempts must be contiguous and start at 1");
        if (index < series.length - 1 && !["cancelled", "blocked"].includes(entry.state)) {
          issue(issues, `${entry.path}.state`, "only a cancelled or blocked attempt may have a replacement");
        }
      });
    }
    const byKey = new Map(resources.filter(object).map((resource) => [resourceKey(resource), resource]));
    resources.forEach((resource, index) => {
      if (!object(resource) || resource.kind !== "worktree" || !object(resource.associated_branch)) return;
      const associated = byKey.get(resourceKey(resource.associated_branch));
      if (!associated) {
        issue(issues, `$.resources[${index}].associated_branch`, "associated branch is absent from the register");
        return;
      }
      if (resource.state === "registered" && associated.state !== "registered") {
        issue(issues, `$.resources[${index}].associated_branch`, "registered worktree must reference a registered branch");
      }
      if (resource.delivery && associated.delivery &&
          (resource.delivery.pull_request !== associated.delivery.pull_request || resource.delivery.delivered_commit !== associated.delivery.delivered_commit)) {
        issue(issues, `$.resources[${index}].delivery`, "worktree and associated branch delivery bindings differ");
      }
    });
    const roleDeliveries = new Map();
    resources.forEach((resource, index) => {
      if (!object(resource) || resource.state !== "registered" || !resource.delivery) return;
      const roleKey = `${resource.change}/${resource.role}`;
      const current = roleDeliveries.get(roleKey);
      if (current && (current.pull_request !== resource.delivery.pull_request || current.delivered_commit !== resource.delivery.delivered_commit)) {
        issue(issues, `$.resources[${index}].delivery`, "registered resources for one role must share delivery binding");
      } else if (!current) {
        roleDeliveries.set(roleKey, resource.delivery);
      }
    });
    const implementation = roleDeliveries.get(`${change}/implementation`);
    const lifecycle = roleDeliveries.get(`${change}/lifecycle-record`);
    if (implementation && lifecycle &&
        (implementation.pull_request === lifecycle.pull_request || implementation.delivered_commit === lifecycle.delivered_commit)) {
      issue(issues, "$.resources", "implementation and lifecycle-record delivery bindings must be distinct");
    }
  }
  return { valid: issues.length === 0, issues };
}

export function validateReceiptObject(value, { expectedChange, register, projectConfigured } = {}) {
  const issues = [];
  scanUnsafe(value, "$", issues);
  if (!expectObject(value, "$", issues)) return { valid: false, issues };
  const change = validateDocumentHeader(value, issues, expectedChange, "cleanup-run-v1");
  expectInteger(required(value, "run", "$", issues), "$.run", issues);
  const status = required(value, "status", "$", issues);
  expectEnum(status, "$.status", STATUS, issues);
  const authorization = required(value, "authorization", "$", issues);
  expectEnum(authorization, "$.authorization", AUTHORIZATION, issues);
  validateGateObject(required(value, "entry_gates", "$", issues), "$.entry_gates", issues);
  if (projectConfigured === true && value.entry_gates?.project === "not-applicable") {
    issue(issues, "$.entry_gates.project", "configured Project requires a passed or blocked result");
  }
  if (projectConfigured === false && value.entry_gates?.project !== "not-applicable") {
    issue(issues, "$.entry_gates.project", "unconfigured Project must be recorded as not applicable");
  }
  const resources = required(value, "resources", "$", issues);
  if (expectArray(resources, "$.resources", issues)) {
    const seen = new Set();
    resources.forEach((resource, index) => {
      const path = `$.resources[${index}]`;
      validateReceiptResource(resource, path, issues, change);
      if (!object(resource) || !object(resource.key)) return;
      const key = resourceKey(resource);
      if (seen.has(key)) issue(issues, path, "duplicate resource key");
      seen.add(key);
    });
    const order = validateActionOrder(resources);
    for (const orderIssue of order.issues) issue(issues, orderIssue.path, orderIssue.message);
    if (status === "completed" && resources.some((entry) => !["completed", "already-absent", "intentionally-ineligible"].includes(entry.outcome))) {
      issue(issues, "$.status", "completed receipt contains an unfinished resource");
    }
    if (status === "started" && resources.every((entry) => ["completed", "already-absent", "intentionally-ineligible"].includes(entry.outcome))) {
      issue(issues, "$.status", "started receipt has no unfinished resource");
    }
    if (status === "blocked" && resources.every((entry) => ["completed", "already-absent", "intentionally-ineligible"].includes(entry.outcome))) {
      issue(issues, "$.status", "blocked receipt has no unfinished resource");
    }
  }
  if (authorization === "authorized" && !evaluateEntryGates(value.entry_gates).ready) {
    issue(issues, "$.authorization", "authorization requires every delivery gate to pass");
  }
  if (authorization === "not-authorized" && Array.isArray(resources) && resources.some((entry) => entry?.classification === "eligible")) {
    issue(issues, "$.authorization", "eligible actions require explicit authorization");
  }
  if (authorization === "expired" && status !== "blocked") {
    issue(issues, "$.status", "expired authorization requires a blocked receipt");
  }
  if (status === "blocked" && authorization === "authorized") {
    issue(issues, "$.authorization", "blocked receipt cannot retain active authorization");
  }
  if (register) validateReceiptAgainstRegister(value, register, issues);
  return { valid: issues.length === 0, issues };
}

function validateReceiptAgainstRegister(receipt, register, issues) {
  const registerValidation = validateRegisterObject(register, { expectedChange: receipt.change });
  if (!registerValidation.valid) {
    issue(issues, "$.resources", "referenced register is invalid");
    return;
  }
  const registered = new Set(register.resources.filter((entry) => entry.state === "registered").map(resourceKey));
  const receiptKeys = new Set((receipt.resources ?? []).filter((entry) => object(entry?.key)).map(resourceKey));
  for (const key of receiptKeys) if (!registered.has(key)) issue(issues, "$.resources", `receipt references unregistered resource ${key}`);
  for (const key of registered) if (!receiptKeys.has(key)) issue(issues, "$.resources", `receipt omits registered resource ${key}`);
  register.resources.filter((entry) => entry.state === "registered").forEach((entry) => {
    if (!entry.delivery) issue(issues, "$.resources", `registered resource lacks delivery binding ${resourceKey(entry)}`);
  });
}

export function validateWorkspaceCleanupObject(value, options = {}) {
  if (value?.record_type === "workspace-cleanup-register-v1") return validateRegisterObject(value, options);
  if (value?.record_type === "cleanup-run-v1") return validateReceiptObject(value, options);
  return { valid: false, issues: [{ path: "$.record_type", message: "unsupported record type", expected: "workspace-cleanup-register-v1 | cleanup-run-v1" }] };
}

function sortObjectKeys(value) {
  if (Array.isArray(value)) return value.map(sortObjectKeys);
  if (!object(value)) return value;
  return Object.fromEntries(Object.keys(value).sort().map((key) => [key, sortObjectKeys(value[key])]));
}

export function normalizeWorkspaceCleanup(value) {
  const clone = sortObjectKeys(structuredClone(value));
  if (Array.isArray(clone.resources)) {
    clone.resources.sort((left, right) => {
      if (clone.record_type !== "cleanup-run-v1") return resourceKey(left).localeCompare(resourceKey(right));
      const leftKey = left.key;
      const rightKey = right.key;
      if (leftKey.change !== rightKey.change) return leftKey.change.localeCompare(rightKey.change);
      if (leftKey.role !== rightKey.role) return leftKey.role.localeCompare(rightKey.role);
      if (leftKey.kind !== rightKey.kind) return leftKey.kind === "worktree" ? -1 : 1;
      return leftKey.attempt - rightKey.attempt;
    });
    for (const entry of clone.resources) {
      if (Array.isArray(entry.friction_codes)) entry.friction_codes.sort();
    }
  }
  return clone;
}

export function validateRegistrationTransition(planned, observed) {
  const issues = [];
  if (planned?.state !== "planned") issue(issues, "$.state", "registration transition must start from planned");
  for (const field of ["change", "role", "kind", "attempt", "starting_commit", "intended_identity"]) {
    if (planned?.[field] !== observed?.[field]) issue(issues, `$.${field}`, "live inspection does not match planned value");
  }
  if (planned?.kind === "worktree" && observed?.primary !== false) issue(issues, "$.primary", "worktree inspection must confirm a non-primary worktree");
  if (planned?.kind === "worktree" && !observed?.actual_identity) issue(issues, "$.actual_identity", "worktree inspection must provide its Git administrative identity");
  if (planned?.kind === "worktree" && resourceKey(planned.associated_branch ?? {}) !== resourceKey(observed?.associated_branch ?? {})) {
    issue(issues, "$.associated_branch", "live inspection does not match planned branch association");
  }
  if (observed?.actual_identity !== planned?.intended_identity) issue(issues, "$.actual_identity", "inspected identity does not match planned identity");
  return { allowed: issues.length === 0, issues };
}

export function evaluateEntryGates(gates, { projectConfigured } = {}) {
  if (!object(gates)) return { ready: false, blocked: ["entry_gates"] };
  const required = ["implementation_pull_request", "lifecycle_record_pull_request", "issue", "archive", "living_spec"];
  const blocked = required.filter((key) => gates[key] !== "passed");
  if (projectConfigured === true ? gates.project !== "passed" : projectConfigured === false ? gates.project !== "not-applicable" : !["passed", "not-applicable"].includes(gates.project)) blocked.push("project");
  return { ready: blocked.length === 0, blocked };
}

const INELIGIBLE_CHECKS = [
  ["primary", "resource is the primary worktree"],
  ["dirty", "resource contains uncommitted work"],
  ["locked", "resource is locked"],
  ["unknown", "resource state is unknown"],
  ["externally_referenced", "resource has an external reference"],
  ["identity_mismatch", "live identity does not match registration"],
  ["delivery_mismatch", "delivery evidence does not match registration"],
  ["state_drift", "live state changed after audit"]
];

export function classifyResource(resource, observation, { gatesReady = false } = {}) {
  if (resource?.state !== "registered") return { classification: "ineligible", reason: "resource is not registered" };
  if (!gatesReady) return { classification: "ineligible", reason: "delivery entry gates are not complete" };
  if (!object(resource.delivery)) return { classification: "ineligible", reason: "resource delivery binding is unavailable" };
  if (observation?.exists === false) return { classification: "already-absent", reason: "registered resource is already absent" };
  if (!object(observation) || observation.exists !== true) return { classification: "ineligible", reason: "fresh live inspection is unavailable" };
  for (const [field] of INELIGIBLE_CHECKS) {
    if (typeof observation[field] !== "boolean") return { classification: "ineligible", reason: `inspection field ${field} is unavailable` };
  }
  for (const [field, reason] of INELIGIBLE_CHECKS) if (observation[field] === true) return { classification: "ineligible", reason };
  return {
    classification: "eligible",
    action: resource.kind === "worktree" ? "remove-worktree" : "delete-local-branch"
  };
}

export function validateActionOrder(resources) {
  const issues = [];
  const completedWorktrees = new Set();
  resources.forEach((entry, index) => {
    if (!object(entry?.key)) return;
    const roleKey = `${entry.key.change}/${entry.key.role}`;
    if (entry.key.kind === "worktree" && ["completed", "already-absent"].includes(entry.outcome)) completedWorktrees.add(roleKey);
    if (entry.key.kind === "branch" && entry.authorized_action === "delete-local-branch" && ["completed", "failed"].includes(entry.outcome)) {
      const hasAssociatedWorktree = resources.some((candidate) => candidate?.key?.kind === "worktree" &&
        `${candidate.key.change}/${candidate.key.role}` === roleKey);
      if (hasAssociatedWorktree && !completedWorktrees.has(roleKey)) {
        issue(issues, `$.resources[${index}]`, "worktree outcome must be complete before its branch action");
      }
    }
  });
  return { valid: issues.length === 0, issues };
}

export function resumeCleanup(receipt, observations = new Map()) {
  const complete = [];
  const reAudit = [];
  for (const entry of receipt.resources ?? []) {
    const key = resourceKey(entry);
    if (["completed", "already-absent", "intentionally-ineligible"].includes(entry.outcome)) complete.push(key);
    else reAudit.push({ key, observation: observations.get(key) ?? null });
  }
  return { complete, reAudit };
}

export function readWorkspaceCleanupFile(filePath, options = {}) {
  const value = parseWorkspaceCleanupJson(fs.readFileSync(filePath, "utf8"));
  const validation = validateWorkspaceCleanupObject(value, options);
  return { value, validation, normalized: validation.valid ? normalizeWorkspaceCleanup(value) : null };
}
