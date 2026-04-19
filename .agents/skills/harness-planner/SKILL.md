---
name: harness-planner
description: Turn broad requests into bounded sprints with explicit owner files, acceptance, validation, and runtime impact.
---

# Harness planner

## When to use

Use this skill when a request is broad, ambiguous, risky, or large enough that
implementation should not start from intuition alone.

Apply it before code changes when the task needs a real execution plan with:

- goal
- owner files
- acceptance
- validation
- deploy/runtime impact

## Workflow

1. Read the repo adapter in order before planning.
2. Define the target behavior and the non-goals.
3. Bound the write set to the smallest owning files or directories.
4. Name the owning layer and any contract surfaces that will change.
5. Write explicit acceptance criteria and a validation matrix.
6. Call out deploy/runtime impact and open risks.
7. Write the plan into the target repo's `docs/exec-plans/active/`.

## Completion evidence

The plan is only good enough when:

- the write set is concrete
- acceptance is testable
- validation is named
- the repo can tell what would count as completion before edits begin
