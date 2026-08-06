## What it does

`git-commit` turns reviewed working-tree changes into a deliberate, portable commit, then pulls with rebase and reports the resulting branch state.

It never treats commit as permission to stage everything or push. Secrets and artifacts stay out, conflicts stop the workflow, and pushing requires a separate explicit yes.

## When to reach for it

Type `/git-commit`, or the agent reaches for it automatically when you ask to commit uncommitted changes.

Reach for it when a finished change needs staging and committing safely. If Git is showing line-ending-only changes that should disappear before staging, use [git-renormalize](https://github.com/Nulfrog/skills/blob/main/skills/engineering/git-renormalize/SKILL.md) first.

## Deliberate staging

The leading idea is **deliberate** staging: inspect the status, diffs, untracked files, and recent commit style before choosing paths. A missing `.gitattributes` gains an LF-normalization rule, while suspicious files are skipped and reported as possible `.gitignore` gaps.

Commit messages are written in an OS-safe way, so multiline messages do not depend on bash heredocs. After the commit, a pull/rebase check catches remote drift before the skill asks whether you want to push.

## It's working if

- Only intended files are committed.
- Rebase conflicts are aborted and reported, not guessed through.
- The final report states branch status and asks before pushing.

## Where it fits

`git-commit` is a reach-for-it-anytime standalone at the end of a change. Its closest maintenance neighbour is [git-renormalize](https://github.com/Nulfrog/skills/blob/main/skills/engineering/git-renormalize/SKILL.md), because phantom line-ending changes should be cleared before staging. [ask-matt](https://aihero.dev/skills-ask-matt) maps it into the wider skill set.
