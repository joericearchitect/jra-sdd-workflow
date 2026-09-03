# GitHub and delivery — the GitHub side of the workflow

Terms for the issues, pull requests, labels, and checks that connect the work
to GitHub.

## Issue

A GitHub record where a problem is discussed and its state is tracked. In this
framework, the issue owns the conversation and lifecycle state; the spec files
own the requirements.

**Terminology Source:** GitHub (the platform).

**Related:** intake, project, pull request

## Intake / issue template / form

The pre-built form GitHub shows when someone files a new issue. It captures the
right information (problem, outcome, scope, acceptance criteria) at the start.
"Intake" means the act of receiving new work.

**Terminology Source:** GitHub (the platform); "intake" is general process
vocabulary.

**Related:** issue, labels

## Labels

Colored tags applied to GitHub issues to categorize them (for example
`type:bug`). The workflow relies on labels matching between the issue forms and
the live repository.

**Terminology Source:** GitHub (the platform).

**Related:** issue, intake

## Pull request (PR)

A request to merge a branch of work into the main branch. It is how
implementation and review happen. A PR body must name its issue and its OpenSpec
change.

**Terminology Source:** GitHub (the platform); the concept originated with git
hosting.

**Related:** linkage, CI, lifecycle-record PR

## Linkage / linkage validation / PR contract

The check that ties everything together: a pull request must reference its
GitHub issue (for example `Closes #12`) and name its OpenSpec change
(`OpenSpec change: <name>`). "PR contract" is the set of rules the PR body must
satisfy.

**Terminology Source:** This repository (jra-sdd-workflow) — custom validators.

**Related:** pull request, tracking.yaml, CI

## Project (GitHub Projects board)

A GitHub board that shows work items in columns (for example "To do", "In
progress", "Done"). It owns the work-state view; the issue owns the discussion.

**Terminology Source:** GitHub (the platform) — GitHub Projects.

**Related:** issue

## CI (continuous integration)

Automated checks that run when you push or open a pull request — running the
tests and validators and failing the build if anything is wrong. "Continuous"
means it runs automatically on every change.

**Terminology Source:** Industry — software engineering (DevOps).

**Related:** validator, pull request
