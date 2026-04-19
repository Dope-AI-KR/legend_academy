---
name: harness-reviewer
description: Review changes against the global harness rules for source-of-truth, convergence, and validation completeness.
---

# Harness reviewer

## When to use

Use this skill when reviewing a change for correctness, drift, or false
completion claims.

## Workflow

1. Read the active execution plan and the repo-local source-of-truth files.
2. Look for violations of one source of truth, projection drift, or incomplete
   mutation paths.
3. Check that validation evidence actually matches the changed behavior.
4. Prefer findings-first output ordered by severity.
5. Call out missing tests, missing docs, hidden regressions, and false claims of
   completion.

## Completion evidence

A review using this skill should explicitly cover:

- one source of truth
- canonical mutation result
- projection stability
- runtime validation completeness
- any unresolved findings that block completion
