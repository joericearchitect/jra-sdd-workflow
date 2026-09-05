#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseTrackingYaml } from "./lib/tracking.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");
const rulesPath = path.join(repoRoot, "quality", "openspec-artifact-rules.json");

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

function headingRegex(level, title) {
  return new RegExp(`^${"#".repeat(level)}\\s+${escapeRegExp(title)}\\s*$`, "m");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function listSpecFiles(specsDir) {
  if (!exists(specsDir)) return [];
  const found = [];
  const visit = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const next = path.join(dir, entry.name);
      if (entry.isDirectory()) visit(next);
      if (entry.isFile() && entry.name.endsWith(".md")) found.push(next);
    }
  };
  visit(specsDir);
  return found.sort();
}

function addIssue(issues, ruleId, filePath, message) {
  issues.push({
    ruleId,
    path: path.relative(process.cwd(), filePath),
    message
  });
}

function validateProposal(changeDir, rules, issues) {
  const filePath = path.join(changeDir, "proposal.md");
  if (!exists(filePath)) {
    addIssue(issues, "proposal.exists", filePath, "proposal.md is required");
    return;
  }

  const text = readText(filePath);
  for (const section of rules.requiredSections) {
    if (!headingRegex(2, section).test(text)) {
      addIssue(issues, `proposal.section.${section.toLowerCase().replaceAll(" ", "_")}`, filePath, `missing ## ${section}`);
    }
  }

  for (const term of rules.requiredTerms) {
    if (!text.toLowerCase().includes(term.toLowerCase())) {
      addIssue(issues, `proposal.term.${term.toLowerCase()}`, filePath, `missing required proposal term: ${term}`);
    }
  }

  if (!rules.issueLinkage.requiresAny.some((needle) => text.includes(needle))) {
    addIssue(issues, rules.issueLinkage.ruleId, filePath, "missing primary issue link or approved no-issue exception");
  }
}

function validateChangeMetadata(changeDir, issues) {
  const filePath = path.join(changeDir, ".openspec.yaml");
  if (!exists(filePath)) {
    addIssue(issues, "change.metadata.exists", filePath, ".openspec.yaml metadata is required");
    return { skipSpecs: false };
  }

  let metadata;
  try {
    metadata = parseTrackingYaml(readText(filePath));
  } catch {
    addIssue(issues, "change.metadata.parse", filePath, "invalid .openspec.yaml metadata; correct the file");
    return { skipSpecs: false };
  }

  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    addIssue(issues, "change.metadata.shape", filePath, ".openspec.yaml metadata must be a mapping");
    return { skipSpecs: false };
  }

  if (!("skip_specs" in metadata)) return { skipSpecs: false };
  if (typeof metadata.skip_specs !== "boolean") {
    addIssue(issues, "change.metadata.skip_specs", filePath, "skip_specs must be a boolean");
    return { skipSpecs: false };
  }

  return { skipSpecs: metadata.skip_specs };
}

function validateSpecs(changeDir, rules, metadata, issues) {
  const specFiles = listSpecFiles(path.join(changeDir, "specs"));
  if (specFiles.length === 0) {
    if (!metadata.skipSpecs) {
      addIssue(issues, "spec.exists", path.join(changeDir, "specs"), "at least one delta spec is required unless skip_specs is true");
    }
    return;
  }

  for (const filePath of specFiles) {
    const text = readText(filePath);
    const requirementMatches = [...text.matchAll(/^### Requirement:\s+(.+)$/gm)];
    if (requirementMatches.length === 0) {
      addIssue(issues, "spec.requirement.exists", filePath, "missing requirement heading");
      continue;
    }

    const sections = text.split(/^### Requirement:\s+/m).slice(1);
    for (const section of sections) {
      const firstLineEnd = section.indexOf("\n");
      const title = firstLineEnd === -1 ? section.trim() : section.slice(0, firstLineEnd).trim();
      const body = firstLineEnd === -1 ? "" : section.slice(firstLineEnd + 1);
      if (!rules.normativeTerms.some((term) => body.includes(term))) {
        addIssue(issues, "spec.requirement.normative", filePath, `requirement lacks normative language: ${title}`);
      }
      if (!body.includes(rules.scenarioHeading)) {
        addIssue(issues, "spec.scenario.exists", filePath, `requirement lacks scenario: ${title}`);
      }
      if (!rules.scenarioTerms.every((term) => new RegExp(`\\b${term}\\b`).test(body))) {
        addIssue(issues, "spec.scenario.when_then", filePath, `scenario lacks WHEN/THEN evidence: ${title}`);
      }
      if (/^\s*-\s+\[[ x]\]/im.test(body)) {
        addIssue(issues, "spec.requirement.behavioral", filePath, `requirement reads like an implementation task: ${title}`);
      }
    }
  }
}

function validateDesign(changeDir, rules, issues) {
  const filePath = path.join(changeDir, "design.md");
  if (!exists(filePath)) {
    addIssue(issues, "design.exists", filePath, "design.md is required");
    return;
  }

  const text = readText(filePath);
  for (const section of rules.requiredSections) {
    if (!headingRegex(2, section).test(text)) {
      addIssue(issues, `design.section.${section.toLowerCase().replaceAll(/[^a-z0-9]+/g, "_")}`, filePath, `missing ## ${section}`);
    }
  }

  for (const term of rules.requiredTerms) {
    if (!text.toLowerCase().includes(term.toLowerCase())) {
      addIssue(issues, `design.term.${term.toLowerCase()}`, filePath, `missing required design term: ${term}`);
    }
  }
}

function validateTasks(changeDir, rules, issues) {
  const filePath = path.join(changeDir, "tasks.md");
  if (!exists(filePath)) {
    addIssue(issues, "tasks.exists", filePath, "tasks.md is required");
    return;
  }

  const lines = readText(filePath).split(/\r?\n/);
  const taskLineRegex = new RegExp(rules.taskPattern);
  const taskIndexes = [];
  lines.forEach((line, index) => {
    if (taskLineRegex.test(line)) taskIndexes.push(index);
  });

  if (taskIndexes.length === 0) {
    addIssue(issues, "tasks.item.exists", filePath, "at least one stable numbered task is required");
    return;
  }

  for (let i = 0; i < taskIndexes.length; i += 1) {
    const start = taskIndexes[i];
    const end = taskIndexes[i + 1] ?? lines.length;
    const block = lines.slice(start, end).join("\n");
    const taskLine = lines[start];
    for (const metadata of rules.requiredMetadata) {
      if (!block.includes(metadata)) {
        addIssue(issues, `tasks.metadata.${metadata.toLowerCase().replace(/[^a-z]+/g, "_")}`, filePath, `missing ${metadata} for ${taskLine}`);
      }
    }
    if (taskLine.startsWith("- [x]") && !/^[ \t]*Evidence:[ \t]*\S/im.test(block)) {
      addIssue(issues, "tasks.completed.evidence", filePath, `completed task lacks evidence for ${taskLine}`);
    }
  }

  const text = lines.join("\n").toLowerCase();
  for (const required of ["validation", "review", "deliver"]) {
    if (!text.includes(required)) {
      addIssue(issues, `tasks.plan.${required}`, filePath, `task plan should include ${required} work`);
    }
  }
}

export function validateChange(changeDir, ruleConfig = JSON.parse(readText(rulesPath))) {
  const resolvedChangeDir = path.resolve(changeDir);
  const rules = ruleConfig.ruleSets;
  const issues = [];

  validateProposal(resolvedChangeDir, rules.proposal, issues);
  const metadata = validateChangeMetadata(resolvedChangeDir, issues);
  validateSpecs(resolvedChangeDir, rules.spec, metadata, issues);
  validateDesign(resolvedChangeDir, rules.design, issues);
  validateTasks(resolvedChangeDir, rules.tasks, issues);

  return {
    valid: issues.length === 0,
    issues
  };
}

function parseArgs(argv) {
  const args = { json: false, changeDir: null };
  for (const arg of argv) {
    if (arg === "--json") args.json = true;
    else if (!args.changeDir) args.changeDir = arg;
    else throw new Error(`unexpected argument: ${arg}`);
  }
  return args;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (!args.changeDir) throw new Error("usage: validate-openspec-artifacts.mjs [--json] <change-dir>");
    const result = validateChange(args.changeDir);
    if (args.json) {
      console.log(JSON.stringify(result, null, 2));
    } else if (result.valid) {
      console.log("OpenSpec artifact quality validation passed");
    } else {
      for (const issue of result.issues) {
        console.error(`${issue.ruleId} ${issue.path}: ${issue.message}`);
      }
    }
    process.exit(result.valid ? 0 : 1);
  } catch (error) {
    console.error(error.message);
    process.exit(2);
  }
}
