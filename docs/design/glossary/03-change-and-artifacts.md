# Change and artifacts — the change folder and its files

Terms for the folder that holds one piece of work and the documents inside it.

## Change (OpenSpec change)

One unit of work, stored as a folder under `openspec/changes/`. It holds the
plan documents that describe what to build and why. Every change has a short
kebab-case name (lowercase words joined by hyphens, like `add-dark-mode`).

**Terminology Source:** OpenSpec — the tool.

**Related:** artifact, OpenSpec

## Artifact

A single file that makes up a change. The default workflow has four artifacts —
proposal, specs, design, and tasks — plus this project's extra `tracking.yaml`.
"Artifact" just means "a produced file."

**Terminology Source:** Industry — software engineering (a produced file);
adopted by OpenSpec for change documents.

**Related:** change, proposal.md, spec, design.md, tasks.md, tracking.yaml

## proposal.md

The "why" document. It explains the problem, what will change, which specs are
touched, and the impact. It is written first and the other artifacts build on it.

**Terminology Source:** OpenSpec — the tool.

**Related:** artifact, change

## design.md

The "how" document. It records the technical decisions and trade-offs for how
the change will be implemented.

**Terminology Source:** OpenSpec — the tool.

**Related:** artifact, proposal.md

## tasks.md

The "checklist" document. A numbered list of small steps, each with what it
depends on and the evidence that proves it is done. The apply phase works
through this list.

**Terminology Source:** OpenSpec — the tool.

**Related:** artifact, apply, evidence

## Spec

Short for "specification". A written description of what a system must do —
observable behavior, inputs and outputs, and error cases — not how it does it.

**Terminology Source:** Industry — software engineering (specification);
central to SDD.

**Related:** delta spec, living specs, requirement, scenario

## Delta spec

A small spec file that lists only what is new, changed, or removed, rather than
the whole spec. "Delta" means "difference." It is merged into the living spec
during sync.

**Terminology Source:** OpenSpec — the tool; the "delta" (difference) idea comes
from version control.

**Related:** spec, living specs, sync

## Living specs

The permanent, always-current specs under `openspec/specs/`. Delta specs get
merged into these when a change is synced.

**Terminology Source:** OpenSpec — the tool.

**Related:** spec, delta spec

## Requirement

A single "the system SHALL / MUST …" statement inside a spec — one piece of
required behavior.

**Terminology Source:** Industry — software engineering (requirements); used by
SDD.

**Related:** spec, scenario, normative terms

## Scenario

A concrete example attached to a requirement, written as "WHEN … THEN …".
Each scenario is a potential test case for the requirement.

**Terminology Source:** Industry — software engineering (behavior-driven
development); adopted by SDD.

**Related:** requirement, spec

## Normative terms (SHALL / MUST)

The strong words a requirement must use — SHALL or MUST — to state required
behavior, rather than weak words like "should" or "may".

**Terminology Source:** Industry — standards and RFCs (RFC 2119); adopted by
SDD.

**Related:** requirement

## Capability / capability-path

A named area of behavior that a spec describes (for example `user-auth`). The
"capability-path" is its folder location under `specs/`. Each capability maps
to one `spec.md` file.

**Terminology Source:** OpenSpec — the tool.

**Related:** spec, delta spec

## tracking.yaml

This project's extra file, stored in each change, that links the change to its
GitHub issue, repository, and affected paths. It is not part of OpenSpec; it
exists so this repo's linkage checks can run.

**Terminology Source:** This repository (jra-sdd-workflow) — not part of
OpenSpec.

**Related:** artifact, change, linkage

## skip_specs

A setting a change can declare to say "this change changes no observable
behavior, so it has no spec." OpenSpec accepts it for doc-only or refactor
changes; this repo's own validator currently still requires a spec, so a real
(minimal) delta spec is kept instead.

**Terminology Source:** OpenSpec — the tool.

**Related:** delta spec, change

## Store (OpenSpec store)

A standalone OpenSpec project registered on your machine. Commands can target a
store with a `--store` flag. Without one, commands act on the nearest local
`openspec/` folder.

**Terminology Source:** OpenSpec — the tool (a CLI feature).

**Related:** OpenSpec, change
