# Glossary

This folder holds plain-language definitions of the terms this framework uses.

## What this is

A glossary is a list of words and their meanings. This one explains the terms
that appear in the framework's code, the files it generates, and the answers an
AI assistant gives about it.

## Why it exists

1. **To help people find their way.** When someone reads code or files the
   framework produced, they can look up any unfamiliar word here instead of
   guessing.
2. **To keep naming consistent.** When everyone checks the same definitions,
   the same thing is called the same name everywhere in the framework.
3. **To explain AI answers.** When an AI assistant uses a technical word, this
   is the place to look up what it means.

## Why this lives under `docs/design/`

These terms are about how the framework is built and run. They are not written
for end users or customers, so they belong with the implementation docs
(`docs/design/`), not in user-facing documentation.

## How it is organized

Instead of one very long document, terms are split into a few short files.
Each file groups related terms so concepts that belong together are read
together:

| File | Covers |
|---|---|
| `01-foundations.md` | The framework and its guiding principles |
| `02-lifecycle.md` | The phases a change moves through |
| `03-change-and-artifacts.md` | The change folder, its files, and spec concepts |
| `04-github-and-delivery.md` | GitHub-side terms (issues, PRs, labels) |
| `05-validation-and-recovery.md` | Checks, proof, and how to undo |
| `06-industry-terms.md` | Terms borrowed from other industries (networking, AI, etc.) |

## Entry format

Every term uses the same shape:

```markdown
### Term name

A definition in plain language — no jargon, or jargon explained right here.

**Terminology Source:** <label> <optional context>

**Related:** other terms
```

- **Definition** — what the term means, in plain language.
- **Terminology Source** — where the term comes from (see the labels below),
  plus any extra context that matters.
- **Related** — other glossary terms that are close by.

## Terminology source labels

Use one of these labels in `Terminology Source`. If a term needs a label that
does not exist yet, add the label here first, then use it.

| Label | The term comes from |
|---|---|
| Industry — software engineering | General software practice: testing, DevOps, process, project planning. Not tied to any one framework. |
| Industry — distributed systems / networking | Networking or distributed systems, often borrowed by other fields. |
| Industry — AI / agentic AI | AI or agentic-AI systems. |
| SDD (spec-driven development) | The spec-driven-development methodology itself. |
| OpenSpec | The OpenSpec tool specifically. |
| This repository (jra-sdd-workflow) | This project — a term it invented or defined for itself. |
| GitHub (the platform) | GitHub's own features and vocabulary. |

If a term has a borrowed lineage (used in one field, then adopted by another),
name the origin label and add the later adoption as context — for example,
"Industry — distributed systems / networking, later adopted by AI / agentic AI."

## How to add a term

1. Put it in the file whose topic it best matches.
2. Write the definition in plain language. If you must use a technical word,
   define it in the same sentence.
3. Add a `**Terminology Source:**` line using a label from the table above.
   Add a short context clause if the label alone is not enough.
4. List any closely related terms under `**Related:**`.
5. Keep the definition to one or two sentences.

## Conventions

- One term per `###` heading.
- Cross-reference, don't duplicate: if two files need the same term, define it
  once and link to it.
- Prefer short definitions over complete ones. A glossary is a quick lookup,
  not a manual.
