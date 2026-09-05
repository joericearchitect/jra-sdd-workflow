#!/usr/bin/env node

import path from "node:path";
import { parseWorkspaceCleanupJson, readWorkspaceCleanupFile } from "./lib/workspace-cleanup.mjs";
import fs from "node:fs";

function parseArgs(argv) {
  const args = { filePath: null, expectedChange: null, registerPath: null, json: false, projectConfigured: undefined };
  const valueAfter = (index, flag) => {
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`${flag} requires a value`);
    return value;
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--json") args.json = true;
    else if (arg === "--change") {
      args.expectedChange = valueAfter(index, arg);
      index += 1;
    } else if (arg === "--register") {
      args.registerPath = valueAfter(index, arg);
      index += 1;
    } else if (arg === "--project-configured") {
      if (args.projectConfigured === false) throw new Error("--project-configured and --no-project are mutually exclusive");
      args.projectConfigured = true;
    } else if (arg === "--no-project") {
      if (args.projectConfigured === true) throw new Error("--project-configured and --no-project are mutually exclusive");
      args.projectConfigured = false;
    } else if (arg.startsWith("--")) {
      throw new Error("unknown option");
    }
    else if (!args.filePath) args.filePath = arg;
    else throw new Error("unexpected extra positional argument");
  }
  return args;
}

try {
  const args = parseArgs(process.argv.slice(2));
  if (!args.filePath) throw new Error("usage: validate-workspace-cleanup.mjs [--json] [--change <name>] [--register <register.json>] [--project-configured | --no-project] <record.json>");
  const register = args.registerPath ? parseWorkspaceCleanupJson(fs.readFileSync(args.registerPath, "utf8")) : undefined;
  const result = readWorkspaceCleanupFile(args.filePath, {
    expectedChange: args.expectedChange,
    register,
    projectConfigured: args.projectConfigured
  });
  const output = { valid: result.validation.valid, issues: result.validation.issues, normalized: result.normalized };
  if (output.valid) {
    if (result.value.record_type === "workspace-cleanup-register-v1" && path.basename(args.filePath) !== "register.json") {
      throw new Error("register record filename must be register.json");
    }
    if (result.value.record_type === "cleanup-run-v1") {
      if (!args.registerPath) throw new Error("receipt validation requires --register <register.json>");
      if (path.basename(args.registerPath) !== "register.json") throw new Error("referenced register filename must be register.json");
      if (args.projectConfigured === undefined) throw new Error("receipt validation requires --project-configured or --no-project");
      if (path.basename(args.filePath) !== `cleanup-run-${result.value.run}.json`) {
        throw new Error("receipt filename must match cleanup-run-<run>.json");
      }
    }
  }
  if (args.json) console.log(JSON.stringify(output, null, 2));
  else if (output.valid) console.log(`Workspace cleanup ${result.value.record_type} validation passed for ${result.value.change}`);
  else for (const item of output.issues) console.error(`${item.path}: ${item.message}${item.expected ? `; expected ${item.expected}` : ""}`);
  process.exit(output.valid ? 0 : 1);
} catch (error) {
  const name = path.basename(process.argv[1] ?? "validate-workspace-cleanup.mjs");
  const detail = error?.code ? `unable to read requested record (${error.code})` : String(error?.message ?? error).replace(/\s+/g, " ").slice(0, 200);
  console.error(`${name}: ${detail}`);
  process.exit(2);
}
