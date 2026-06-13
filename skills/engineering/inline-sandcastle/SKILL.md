---
name: inline-sandcastle
description: Run the sandcastle implement→review pipeline inside one agent instead of Docker sandboxes. The runner (you) spawns a coder, then a reviewer, as real subagents in sequence. Use when the user wants to run the castle/sandcastle process inline, drive a task or issue through coder→reviewer, or says "inline sandcastle", "run the castle process", "coder reviewer".
---

# Inline Sandcastle

Collapses the two shared-sandbox agents of `.sandcastle/run.mts` (Implementer +
Reviewer) into one agent. The Planner and Merger phases are intentionally dropped.
You are the **runner**. You orchestrate two subagents via the Task tool — you do NOT
write or review code yourself. Both subagents run in the same working tree (no Docker
isolation), so the coder's commits carry forward to the reviewer, mirroring how
sandcastle shares one sandbox between those two phases.

Testing is NOT a separate stage — like real sandcastle, each phase runs
`pnpm typecheck` and `pnpm test` itself before committing.

## Quick start

User invokes with a task or an issue number:
- `/inline-sandcastle 48` → resolve issue #48
- `/inline-sandcastle add a /healthz route` → free-text task

Then run the pipeline below.

## Runner workflow

1. **Resolve the input.**
   - All-digits arg → issue. Run `gh issue view N --comments`; capture title + body.
     Set `BRANCH=sandcastle/issue-N`, create/checkout it. `ISSUE=#N`.
   - Otherwise → free-text task. `ISSUE` = the task text. Work on the current branch
     (mention this to the user; offer to branch if they prefer).

2. **Coder.** Spawn a subagent (`subagent_type: general-purpose`) with the full text
   of [prompts/coder.md](prompts/coder.md), substituting `{{ISSUE}}` and `{{BRANCH}}`.
   Wait for it to return. It must have committed (`RALPH:` prefix) and ended with
   `<promise>COMPLETE</promise>`. If it produced no commit, stop and report why —
   do NOT run the reviewer (mirrors sandcastle's zero-commit short-circuit).

3. **Reviewer.** Spawn a subagent with [prompts/reviewer.md](prompts/reviewer.md),
   same substitutions. It applies simplifications on the branch, re-runs the gates,
   and commits `RALPH: Review -` if it changed anything, then returns `COMPLETE`.

4. **Report.** Summarize both stages and the final branch state for the user. Do not
   merge or close issues — the original sandcastle Merger is dropped here.

## Rules

- Pass enough context into each subagent prompt: it does NOT see this conversation.
  Always include the task/issue text and the branch.
- Relay each subagent's final summary to the user as you go — they can't see subagents.
- Read each prompt file fresh before spawning; do not paraphrase from memory.
