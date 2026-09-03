# Foundations — the framework and its principles

Terms that describe what this project is and the rules it is built around.

## Spec-driven development (SDD)

A way of building software where you write down what you want *before* you
build it, agree on it, and then prove you did what you said. "Spec" is short
for "specification" — a written description of what something must do.

**Terminology Source:** SDD (spec-driven development) — the methodology. A
general approach to building software; OpenSpec is one tool that implements it.

**Related:** OpenSpec, evidence over assertion

## OpenSpec

The open-source tool this framework is built on. It stores each piece of work
as a folder of plan documents (a "change") and provides the commands that
create, check, and file away those documents.

**Terminology Source:** OpenSpec — the tool. The open-source spec-driven tool
this framework is built on.

**Related:** spec-driven development, spec-driven schema, change

## Spec-driven schema

The built-in template that OpenSpec uses for the default workflow. It defines
which documents a change is made of — a proposal, specs, a design, and a task
list — and the order they are written in.

**Terminology Source:** OpenSpec — the tool. The artifact layout OpenSpec ships
as its default workflow.

**Related:** OpenSpec, change, artifact

## Manual first

A rule of this project: nothing gets automated until it has first been done by
hand enough times to know exactly what it needs to do. The goal is to design
automation around real, observed problems rather than imagined ones.

**Terminology Source:** This repository (jra-sdd-workflow) — a project-specific
rule.

**Related:** dogfooding, proportion

## Evidence over assertion

The principle that "it works" or "it is done" is not a claim — it must be
backed by something that can be checked, such as a passing test, a file, or a
merged pull request.

**Terminology Source:** Industry — software engineering (testing and quality);
restated here as a core principle.

**Related:** evidence, validator

## Proportion (3× rule)

A rule that the supporting machinery (scripts, harnesses, fixtures) must stay
small compared to the product it supports. If the support code grows to about
three times the size of the product, stop and justify it rather than
continuing.

**Terminology Source:** This repository (jra-sdd-workflow) — a project-specific
rule with a numeric checkpoint.

**Related:** manual first

## Portability (no hardcoded environment values)

The rule that no asset may contain a value that is true in only one place — an
account name, a repository name, an absolute path, or a credential. Such values
must be read from the environment or supplied as configuration instead.

**Terminology Source:** Industry — software engineering (configuration and
twelve-factor practice); enforced here by a repo-specific validator.

**Related:** validator

## Dogfooding

"Eating your own dog food" — using your own product yourself. Here it means
running the workflow's own changes through the workflow, to prove it works and
to find the rough edges before automating anything.

**Terminology Source:** Industry — software engineering idiom ("eating your own
dog food").

**Related:** manual first, observation log
