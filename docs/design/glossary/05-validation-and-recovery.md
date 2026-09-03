# Validation and recovery — checks, proof, and how to undo

Terms for the automated checks, the proof they require, and the safety nets.

## Validator / validation

A small program that checks whether files follow the rules, and fails if they
do not. Most validators run before a change can merge. "Validation" is the act
of running those checks.

**Terminology Source:** Industry — software engineering (testing and static
analysis).

**Related:** rule sets, evidence, CI

## Rule sets / artifact rules

A machine-readable list of rules that the artifact validator enforces — for
example, which sections a proposal must contain and which words a spec must
use. They live in `quality/openspec-artifact-rules.json`.

**Terminology Source:** This repository (jra-sdd-workflow) — the rules file is
custom.

**Related:** validator, artifact

## Evidence

Proof that a task is actually done — a passing test, a file, a merged pull
request. A task is marked complete only when its evidence exists; "I ran the
command" is not evidence that it succeeded.

**Terminology Source:** Industry — software engineering (quality); the
"Evidence:" field is this repository's.

**Related:** evidence over assertion, validator

## Recovery / rollback

The documented way to undo if something goes wrong. Every check that can block
work must come with a recovery path — a way back out — so a gate is never a
trap.

**Terminology Source:** Industry — software engineering (deployment and
operations).

**Related:** entry/exit conditions

## Fixture

A small sample file used by tests or examples — for instance, a sample
`tracking.yaml` that a validator checks. It is not real configuration; it is
test data.

**Terminology Source:** Industry — software engineering (testing).

**Related:** validator, tracking.yaml

## Observation log

A running record of what happened during the dogfooding campaign — friction,
recoveries, non-events, and conclusions. It is the raw material that later
justifies (or rejects) automation.

**Terminology Source:** This repository (jra-sdd-workflow).

**Related:** dogfooding

## Hard dependency

A prerequisite that must be done before a change can start, recorded in the
campaign plan. A change with a hard dependency is blocked until that dependency
is finished. (The numbered order of changes is a sequence, not a dependency;
only the listed hard dependencies block.)

**Terminology Source:** Industry — software engineering (project planning).

**Related:** preflight, entry/exit conditions
