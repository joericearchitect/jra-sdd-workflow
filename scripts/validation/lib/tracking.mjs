import fs from "node:fs";
import path from "node:path";

const REPOSITORY_IDENTIFIER = /^[^/]+\/[^/]+$/;
// The schema defines the portable contract. This policy is an additional
// repository security boundary for sensitive and mutable delivery metadata.
const UNSAFE_FIELD = /(token|secret|password|credential|project_item|field_id|option_id|pr_state|pull_request_state|last_sync|timestamp|closed_at|merged_at)$/i;

function scalar(value) {
  const trimmed = value.trim();
  if (/^-?\d+$/.test(trimmed)) return Number(trimmed);
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed.slice(1, -1);
    }
  }
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function quotedScalar(value) {
  const trimmed = value.trim();
  return (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"));
}

function parseBlock(lines, start, indent) {
  const container = isListAt(lines, start, indent) ? [] : {};
  let index = start;

  while (index < lines.length) {
    const raw = lines[index];
    if (!raw.trim() || raw.trim().startsWith("#")) {
      index += 1;
      continue;
    }

    const currentIndent = raw.match(/^ */)[0].length;
    if (currentIndent < indent) break;
    if (currentIndent > indent) throw new Error(`unexpected indentation at line ${index + 1}`);

    const line = raw.slice(indent);
    if (Array.isArray(container)) {
      if (!line.startsWith("- ")) break;
      const itemText = line.slice(2);
      if (!quotedScalar(itemText) && itemText.includes(":")) {
        const [key, rest] = splitKeyValue(itemText, index);
        const item = {};
        if (rest === "") {
          const parsed = parseBlock(lines, index + 1, indent + 4);
          item[key] = parsed.value;
          index = parsed.index;
        } else {
          item[key] = scalar(rest);
          index += 1;
        }
        while (index < lines.length) {
          const next = lines[index];
          if (!next.trim()) {
            index += 1;
            continue;
          }
          const nextIndent = next.match(/^ */)[0].length;
          if (nextIndent <= indent) break;
          if (nextIndent !== indent + 2) throw new Error(`unexpected list item indentation at line ${index + 1}`);
          const [nestedKey, nestedRest] = splitKeyValue(next.slice(indent + 2), index);
          if (nestedRest === "") {
            const parsed = parseBlock(lines, index + 1, indent + 4);
            item[nestedKey] = parsed.value;
            index = parsed.index;
          } else {
            item[nestedKey] = scalar(nestedRest);
            index += 1;
          }
        }
        container.push(item);
      } else {
        container.push(scalar(itemText));
        index += 1;
      }
    } else {
      const [key, rest] = splitKeyValue(line, index);
      if (rest === "") {
        const parsed = parseBlock(lines, index + 1, indent + 2);
        container[key] = parsed.value;
        index = parsed.index;
      } else {
        container[key] = scalar(rest);
        index += 1;
      }
    }
  }

  return { value: container, index };
}

function splitKeyValue(line, index) {
  const match = line.match(/^([^:]+):(.*)$/);
  if (!match) throw new Error(`invalid YAML at line ${index + 1}`);
  return [match[1].trim(), match[2].trim()];
}

function isListAt(lines, start, indent) {
  for (let index = start; index < lines.length; index += 1) {
    const raw = lines[index];
    if (!raw.trim() || raw.trim().startsWith("#")) continue;
    return raw.match(/^ */)[0].length === indent && raw.slice(indent).startsWith("- ");
  }
  return false;
}

export function parseTrackingYaml(text) {
  try {
    return parseBlock(text.split(/\r?\n/), 0, 0).value;
  } catch (error) {
    const detail = String(error?.message ?? "invalid YAML").replace(/\s+/g, " ").slice(0, 160);
    throw new Error(`invalid tracking YAML: ${detail}`);
  }
}

function addIssue(issues, pathValue, message, expected) {
  issues.push({ path: pathValue, message, ...(expected ? { expected } : {}) });
}

function requireField(value, key, pathValue, issues) {
  if (!value || typeof value !== "object" || Array.isArray(value) || !(key in value)) {
    addIssue(issues, `${pathValue}.${key}`, "missing required field");
    return false;
  }
  return true;
}

function expectType(value, pathValue, type, issues) {
  if (type === "array") {
    if (!Array.isArray(value)) addIssue(issues, pathValue, "invalid field type", "array");
    return Array.isArray(value);
  }
  if (type === "object") {
    const valid = value !== null && typeof value === "object" && !Array.isArray(value);
    if (!valid) addIssue(issues, pathValue, "invalid field type", "object");
    return valid;
  }
  if (typeof value !== type || Array.isArray(value)) {
    addIssue(issues, pathValue, "invalid field type", type);
    return false;
  }
  return true;
}

function readRequiredField(value, key, pathValue, type, issues) {
  if (!requireField(value, key, pathValue, issues)) return undefined;
  const field = value[key];
  return expectType(field, `${pathValue}.${key}`, type, issues) ? field : undefined;
}

function expectNonEmptyString(value, pathValue, issues) {
  if (value.length === 0) addIssue(issues, pathValue, "must not be empty", "non-empty string");
}

function expectRepositoryIdentifier(value, pathValue, issues) {
  if (!REPOSITORY_IDENTIFIER.test(value)) {
    addIssue(issues, pathValue, "invalid repository identifier", "owner/repository");
  }
}

function expectPositiveInteger(value, pathValue, issues) {
  if (!Number.isInteger(value) || value < 1) {
    addIssue(issues, pathValue, "must be a positive integer", "integer >= 1");
  }
}

function expectUri(value, pathValue, issues) {
  try {
    new URL(value);
  } catch {
    addIssue(issues, pathValue, "invalid URI", "URI");
  }
}

function scanUnsafeFields(value, pathValue, issues) {
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    const childPath = pathValue ? `${pathValue}.${key}` : key;
    if (UNSAFE_FIELD.test(key)) addIssue(issues, childPath, "unsafe tracking field is not allowed");
    if (child && typeof child === "object") scanUnsafeFields(child, childPath, issues);
  }
}

export function validateTrackingObject(value, { expectedChange } = {}) {
  const issues = [];
  scanUnsafeFields(value, "$", issues);

  if (!expectType(value, "$", "object", issues)) return { valid: false, issues };

  const schemaVersion = readRequiredField(value, "schema_version", "$", "number", issues);
  if (schemaVersion !== undefined && (!Number.isInteger(schemaVersion) || schemaVersion !== 1)) {
    addIssue(issues, "$.schema_version", "unsupported schema version", "1");
  }

  const openspec = readRequiredField(value, "openspec", "$", "object", issues);
  if (openspec) {
    const change = readRequiredField(openspec, "change", "$.openspec", "string", issues);
    if (change !== undefined) {
      expectNonEmptyString(change, "$.openspec.change", issues);
      if (expectedChange && change !== expectedChange) {
        addIssue(issues, "$.openspec.change", `change name does not match expected ${expectedChange}`);
      }
    }
  }

  const github = readRequiredField(value, "github", "$", "object", issues);
  if (github) {
    const repository = readRequiredField(github, "repository", "$.github", "string", issues);
    if (repository !== undefined) expectRepositoryIdentifier(repository, "$.github.repository", issues);
    const issue = readRequiredField(github, "issue", "$.github", "number", issues);
    if (issue !== undefined) expectPositiveInteger(issue, "$.github.issue", issues);
    const issueUrl = readRequiredField(github, "issue_url", "$.github", "string", issues);
    if (issueUrl !== undefined) expectUri(issueUrl, "$.github.issue_url", issues);
    const projectOwner = readRequiredField(github, "project_owner", "$.github", "string", issues);
    if (projectOwner !== undefined) expectNonEmptyString(projectOwner, "$.github.project_owner", issues);
    const projectNumber = readRequiredField(github, "project_number", "$.github", "number", issues);
    if (projectNumber !== undefined) expectPositiveInteger(projectNumber, "$.github.project_number", issues);
  }

  const repositories = readRequiredField(value, "implementation_repositories", "$", "array", issues);
  if (repositories !== undefined) {
    if (repositories.length === 0) {
      addIssue(issues, "$.implementation_repositories", "must contain at least one repository");
    }
    repositories.forEach((repo, index) => {
      const repoPath = `$.implementation_repositories[${index}]`;
      if (!expectType(repo, repoPath, "object", issues)) return;
      const repository = readRequiredField(repo, "repository", repoPath, "string", issues);
      if (repository !== undefined) expectRepositoryIdentifier(repository, `${repoPath}.repository`, issues);
      const defaultBranch = readRequiredField(repo, "default_branch", repoPath, "string", issues);
      if (defaultBranch !== undefined) expectNonEmptyString(defaultBranch, `${repoPath}.default_branch`, issues);
      const paths = readRequiredField(repo, "paths", repoPath, "array", issues);
      if (paths !== undefined) {
        if (paths.length === 0) addIssue(issues, `${repoPath}.paths`, "must contain at least one path");
        paths.forEach((item, itemIndex) => {
          const itemPath = `${repoPath}.paths[${itemIndex}]`;
          if (expectType(item, itemPath, "string", issues)) expectNonEmptyString(item, itemPath, issues);
        });
      }
    });
  }

  return { valid: issues.length === 0, issues };
}

export function normalizeTracking(value) {
  return {
    schema_version: value.schema_version,
    openspec: {
      change: value.openspec.change
    },
    github: {
      issue: value.github.issue,
      issue_url: value.github.issue_url,
      project_number: value.github.project_number,
      project_owner: value.github.project_owner,
      repository: value.github.repository
    },
    implementation_repositories: [...value.implementation_repositories]
      .map((repo) => ({
        default_branch: repo.default_branch,
        paths: [...repo.paths].sort(),
        repository: repo.repository
      }))
      .sort((left, right) => left.repository.localeCompare(right.repository))
  };
}

export function readTrackingFile(filePath, options = {}) {
  const value = parseTrackingYaml(fs.readFileSync(filePath, "utf8"));
  const expectedChange = options.expectedChange ?? path.basename(path.dirname(filePath));
  const validation = validateTrackingObject(value, { expectedChange });
  return { value, validation, normalized: validation.valid ? normalizeTracking(value) : null };
}

export function mergeTracking(existing, patch) {
  const merged = structuredClone(existing);
  for (const [key, value] of Object.entries(patch)) {
    if (value && typeof value === "object" && !Array.isArray(value) && merged[key] && typeof merged[key] === "object" && !Array.isArray(merged[key])) {
      merged[key] = mergeTracking(merged[key], value);
    } else {
      merged[key] = value;
    }
  }
  return merged;
}

export function stringifyTracking(value, indent = 0) {
  const lines = [];
  const stringifyScalar = (item) => typeof item === "string" ? JSON.stringify(item) : String(item);
  const stringifyScalarArray = (items, itemIndent) => items.map((item) => `${" ".repeat(itemIndent)}- ${stringifyScalar(item)}`);
  for (const [key, child] of Object.entries(value)) {
    const prefix = " ".repeat(indent);
    if (Array.isArray(child)) {
      lines.push(`${prefix}${key}:`);
      for (const item of child) {
        if (item && typeof item === "object" && !Array.isArray(item)) {
          const entries = Object.entries(item);
          const [firstKey, firstValue] = entries[0];
          if (Array.isArray(firstValue)) {
            lines.push(`${" ".repeat(indent + 2)}- ${firstKey}:`);
            lines.push(...stringifyScalarArray(firstValue, indent + 4));
          } else if (firstValue && typeof firstValue === "object") {
            lines.push(`${" ".repeat(indent + 2)}- ${firstKey}:`);
            lines.push(stringifyTracking(firstValue, indent + 4));
          } else {
            lines.push(`${" ".repeat(indent + 2)}- ${firstKey}: ${stringifyScalar(firstValue)}`);
          }
          for (const [nestedKey, nestedValue] of entries.slice(1)) {
            if (Array.isArray(nestedValue)) {
              lines.push(`${" ".repeat(indent + 4)}${nestedKey}:`);
              lines.push(...stringifyScalarArray(nestedValue, indent + 6));
            } else if (nestedValue && typeof nestedValue === "object") {
              lines.push(`${" ".repeat(indent + 4)}${nestedKey}:`);
              lines.push(stringifyTracking(nestedValue, indent + 6));
            } else {
              lines.push(`${" ".repeat(indent + 4)}${nestedKey}: ${stringifyScalar(nestedValue)}`);
            }
          }
        } else {
          lines.push(`${" ".repeat(indent + 2)}- ${stringifyScalar(item)}`);
        }
      }
    } else if (child && typeof child === "object") {
      lines.push(`${prefix}${key}:`);
      lines.push(stringifyTracking(child, indent + 2));
    } else {
      lines.push(`${prefix}${key}: ${stringifyScalar(child)}`);
    }
  }
  return lines.join("\n");
}
