## What it does

`git-renormalize` removes **phantom** CRLF/LF changes from Git's working-tree status while preserving genuine edits and deletions.

It proves the problem on a sample before touching the index. If the sample has a real content diff, the skill stops instead of misdiagnosing it as line-ending churn.

## When to reach for it

Type `/git-renormalize`, or the agent reaches for it automatically when Git reports many changed files after a clone, checkout, or pull but their content diffs are empty.

Reach for it when status and diff disagree because of line endings. For deliberate staging and committing after the tree is clean, use [git-commit](https://github.com/Nulfrog/skills/blob/main/skills/engineering/git-commit/SKILL.md).

## Prerequisites

Run it inside a Git repository with at least one flagged file available to sample. A `.gitattributes` rule such as `* text=auto eol=lf` helps identify the intended canonical ending.

## Clear only phantoms

A **phantom** is modified by file stats but absent from the real content diff. The skill renormalizes the index, then rewrites only that phantom set from the index; files with real edits are excluded.

If `core.autocrlf=true` is fighting an LF rule, the skill may suggest disabling it as the durable fix. It never changes Git configuration without your agreement.

## It's working if

- At least one empty-content-diff sample confirms the diagnosis.
- Status retains real edits and deletions.
- No line-ending-only file remains flagged.

## Where it fits

`git-renormalize` is a reach-for-it-anytime Git maintenance tool, especially on cross-platform repositories. Its closest neighbour is [git-commit](https://github.com/Nulfrog/skills/blob/main/skills/engineering/git-commit/SKILL.md), which safely stages and commits the genuine changes left behind. [ask-matt](https://aihero.dev/skills-ask-matt) maps it into the wider skill set.
