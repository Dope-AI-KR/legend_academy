---
name: harness-executor
description: Automatically route normal repository requests through the agentOS workflow by reading the adapter files first, choosing plan-vs-execution correctly, and enforcing validation/review before completion.
---

# Harness executor

## When to use

Use this skill as the default intake path for ordinary repo work such as:

- implement a feature
- fix a bug
- refactor a subsystem
- investigate behavior
- review a change
- audit MCP or runtime impact

## Workflow

Default method:

1. Read in order:
   - `docs/HARNESS_CHECKLIST.md`
   - `AGENTS.md`
   - `repo_harness.toml`
   - `docs/HARNESS_GUIDE.md`
   - `.codex/config.toml`
   - `.agents/skills/`
   - `docs/MCP_CONTRACT.md` when MCP exists
   - the active task plan under `docs/exec-plans/active/`
2. Classify the request into:
   - explanation or research
   - review
   - implementation
   - MCP or contract change
   - handoff or closeout
3. If the task is complex, ambiguous, or non-trivial:
   - create or update an active execution plan before code changes
   - use `harness-planner` when needed
4. If the task needs review or runtime proof:
   - use `harness-reviewer`
   - use `harness-runtime-verifier`
   - use `harness-mcp-auditor` for MCP-specific checks
5. Before claiming complete:
   - run validation
   - record validation evidence
   - record review evidence
   - update completion status
   - add `retain-artifact: relative/path` lines for any evidence that must survive cleanup
   - rely on the launcher and cleanup wrappers to prune disposable screenshots, temporary images, Playwright captures, and delegated run outputs

If the same workflow keeps repeating, convert the method into a shared skill.
If the workflow becomes stable and recurring, turn it into an automation only
after the manual loop is reliable.

## Completion evidence

This skill is complete only when the execution plan contains:

- the validation evidence
- the review evidence
- the completion status
- any retained artifact paths that must survive cleanup
