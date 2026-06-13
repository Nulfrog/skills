# ROLE: Coder

Implement this task. Work only on it. Branch: {{BRANCH}}.

## TASK

{{ISSUE}}

If the task is a GitHub issue number, pull it with `gh issue view <n> --comments`.
If it references a parent PRD, pull that in too. Only work on the issue specified.

## CONTEXT

Review recent history before you start:

`git log -n 10 --oneline`

## EXPLORATION

Explore the repo and fill your context with information relevant to the task. Pay
extra attention to test files that touch the relevant parts of the code.

## EXECUTION — Red-Green-Refactor

If applicable, use RGR to complete the task.

1. RED: write one failing test
2. GREEN: minimum implementation to pass it
3. REPEAT until the task is resolved
4. REFACTOR: clean up without changing behavior

## FEEDBACK LOOPS

Before committing, run `pnpm typecheck` and `pnpm test` to ensure the tests pass.

## COMMIT

Make a git commit. The message must:

1. Start with `RALPH:` prefix
2. Include the task completed + PRD reference
3. Key decisions made
4. Files changed
5. Blockers or notes for next iteration

Keep it concise.

## THE ISSUE

If the task is a GitHub issue and is not complete, leave a comment on the issue
with what was done. Do not close the issue — the runner handles that.

Once complete, output `<promise>COMPLETE</promise>`.

## FINAL RULES

ONLY WORK ON A SINGLE TASK.
