#!/usr/bin/env node
// Rejects environment-specific literals in portable assets.
//
// Portable assets are installed elsewhere and run against repositories their
// author never saw. A value that is true in only one environment - an account
// name, a repository, a board column, an absolute path - makes the asset
// unusable by anyone else, and prose review does not catch these reliably.
//
// Configuration lives in .ai-skills/no-hardcoded-environment.json:
//
//   {
//     "roots": ["skills", "docs"],
//     "portableRoots": ["skills"],
//     "identities": ["my-github-account", "my-org"],
//     "allow": ["docs/examples/**"]
//   }
//
// `roots` are scanned for values that are wrong anywhere: local identities,
// absolute paths, instance URLs, emails, credentials.
//
// `portableRoots` are the subset that gets installed elsewhere. They are also
// rejected for referencing this repository's own source tree, because those
// paths cannot resolve once the asset is installed. A repository's own CI and
// scripts legitimately reference local paths and are not portable roots.
//
// `identities` is the highest-value field: the local account and organization
// names that must never appear in a portable asset.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CONFIG_PATH = ".ai-skills/no-hardcoded-environment.json";
const TEXT_EXTENSIONS = new Set([".md", ".mjs", ".js", ".json", ".yml", ".yaml", ".sh", ".ps1", ".txt"]);
// Test and fixture trees necessarily contain the patterns they assert against.
const SKIPPED_DIRECTORIES = new Set([".git", "node_modules", "openspec", ".ai-skills", "test", "tests", "__tests__", "fixtures"]);

// An `allow-hardcoded: <reason>` comment on the same line documents a
// deliberate exception. The reason must be real text: a bare marker, or one
// followed only by a comment terminator, is not accepted.
const INLINE_ALLOW = /allow-hardcoded:\s*(?!-->|\*\/)[A-Za-z0-9]/;

// Wrong anywhere in the repository.
const UNIVERSAL_RULES = [
  {
    id: "absolute-path",
    description: "absolute filesystem path",
    pattern: /(?:^|[\s"'`(=])(?:\/(?:Users|home|root|var|opt)\/[A-Za-z0-9._-]+|[A-Za-z]:\\\\?[A-Za-z0-9._\\-]+)/
  },
  {
    id: "instance-url",
    description: "URL naming a specific repository, org, or tenant",
    pattern: /https?:\/\/(?:[A-Za-z0-9-]+\.)*github\.com\/(?!<|\{|\$|owner\b|OWNER\b|orgs\/<)[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+/
  },
  {
    id: "email-address",
    description: "email address",
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/
  },
  {
    id: "credential",
    description: "credential-shaped literal",
    pattern: /\b(?:gh[pousr]_[A-Za-z0-9]{16,}|sk-[A-Za-z0-9]{16,}|AKIA[0-9A-Z]{12,}|xox[baprs]-[A-Za-z0-9-]{10,})\b/
  }
];

// Wrong only in an asset that is installed away from this repository.
const PORTABILITY_RULES = [
  {
    id: "authoring-repo-path",
    description: "path into the authoring repository's source tree",
    pattern: /(?:^|[\s"'`(])(?:scripts|evals|quality)\/[A-Za-z0-9._/-]+\.(?:mjs|js|json)\b/
  }
];

const text = (value) => typeof value === "string" && value.trim().length > 0;

export function loadConfig(root) {
  const configPath = path.join(root, CONFIG_PATH);
  if (!fs.existsSync(configPath)) {
    return { ok: false, code: "config-missing", detail: CONFIG_PATH };
  }
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch (error) {
    return { ok: false, code: "config-unreadable", detail: error.message };
  }
  if (!Array.isArray(parsed.roots) || parsed.roots.length === 0 || !parsed.roots.every(text)) {
    return { ok: false, code: "config-roots-invalid", detail: "roots must be a non-empty array of paths" };
  }
  const identities = parsed.identities ?? [];
  if (!Array.isArray(identities) || !identities.every(text)) {
    return { ok: false, code: "config-identities-invalid", detail: "identities must be an array of strings" };
  }
  const portableRoots = parsed.portableRoots ?? [];
  if (!Array.isArray(portableRoots) || !portableRoots.every(text)) {
    return { ok: false, code: "config-portable-roots-invalid", detail: "portableRoots must be an array of paths" };
  }
  const unknownPortable = portableRoots.filter((root) => !parsed.roots.some((declared) => root === declared || root.startsWith(`${declared}/`)));
  if (unknownPortable.length > 0) {
    return { ok: false, code: "config-portable-roots-unscanned", detail: `not inside roots: ${unknownPortable.join(", ")}` };
  }
  const allow = parsed.allow ?? [];
  if (!Array.isArray(allow) || !allow.every(text)) {
    return { ok: false, code: "config-allow-invalid", detail: "allow must be an array of path prefixes" };
  }
  return { ok: true, roots: parsed.roots, portableRoots, identities, allow };
}

function listTextFiles(root, relative, out) {
  const absolute = path.join(root, relative);
  let entries;
  try {
    entries = fs.readdirSync(absolute, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of [...entries].sort((a, b) => a.name.localeCompare(b.name))) {
    const next = relative ? `${relative}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      if (SKIPPED_DIRECTORIES.has(entry.name)) continue;
      listTextFiles(root, next, out);
    } else if (entry.isFile() && TEXT_EXTENSIONS.has(path.extname(entry.name))) {
      out.push(next);
    }
  }
  return out;
}

const allowed = (relativePath, allow) =>
  allow.some((prefix) => relativePath === prefix || relativePath.startsWith(prefix.replace(/\*+$/, "")));

export function scanContent(relativePath, content, identities = [], { portable = false } = {}) {
  const findings = [];
  const lines = content.split(/\r?\n/);

  const identityRules = identities.map((identity) => ({
    id: "local-identity",
    description: `local identity "${identity}"`,
    // Escaped, case-insensitive, not part of a longer word.
    pattern: new RegExp(`(?<![A-Za-z0-9_-])${identity.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![A-Za-z0-9_-])`, "i")
  }));

  lines.forEach((line, index) => {
    if (INLINE_ALLOW.test(line)) return;
    const active = [...identityRules, ...UNIVERSAL_RULES, ...(portable ? PORTABILITY_RULES : [])];
    for (const rule of active) {
      const match = rule.pattern.exec(line);
      if (!match) continue;
      findings.push({
        rule: rule.id,
        description: rule.description,
        file: relativePath,
        line: index + 1,
        excerpt: match[0].trim().slice(0, 80)
      });
    }
  });

  return findings;
}

const isPortable = (relativePath, portableRoots) =>
  portableRoots.some((root) => relativePath === root || relativePath.startsWith(`${root}/`));

export function scanRepository(root, config) {
  const findings = [];
  for (const declaredRoot of config.roots) {
    const files = listTextFiles(root, declaredRoot, []);
    for (const relative of files) {
      if (allowed(relative, config.allow)) continue;
      const content = fs.readFileSync(path.join(root, relative), "utf8");
      findings.push(...scanContent(relative, content, config.identities, {
        portable: isPortable(relative, config.portableRoots)
      }));
    }
  }
  return findings;
}

function main() {
  const root = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
  const config = loadConfig(root);

  if (!config.ok) {
    // Fail closed: an absent or malformed policy is not a passing scan.
    console.error(`no-hardcoded-environment: ${config.code} (${config.detail})`);
    console.error(`Create ${CONFIG_PATH} declaring the roots to scan and the local identities to reject.`);
    process.exit(2);
  }

  const findings = scanRepository(root, config);

  if (findings.length > 0) {
    console.error(`no-hardcoded-environment: ${findings.length} finding(s)\n`);
    for (const finding of findings) {
      console.error(`  ${finding.file}:${finding.line}  [${finding.rule}] ${finding.description}`);
      console.error(`      ${finding.excerpt}`);
    }
    console.error(`
Portable assets must not contain values true in only one environment.
Derive the value from the environment, accept it as configuration, or - if it
is genuinely fixed and safe - annotate the line with:
    allow-hardcoded: <reason>`);
    process.exit(1);
  }

  const portable = config.portableRoots.length > 0 ? `; portable: ${config.portableRoots.join(", ")}` : "";
  console.log(`no-hardcoded-environment: passed (roots: ${config.roots.join(", ")}${portable})`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
