---
name: git-renormalize
description: Renormalize line endings to clear phantom CRLF/LF changes from git status without losing real edits. Use when the user says git thinks line endings changed, asks to refresh the git cache, sees many files modified right after a clone/checkout/pull, or when whole files show modified but git diff is empty.
---

# Git Renormalize

A **phantom** is a file git reports as modified whose only difference is its line
endings (CRLF vs LF). Goal: clear every phantom from `git status` while leaving
real content edits and deletions untouched.

## Confirm it's phantom

1. **Check the setup**: `git config core.autocrlf` and look for a `.gitattributes`
   (e.g. `* text=auto eol=lf`). A mismatch between the two is the usual cause.
2. **Prove a sample**: pick a flagged file — `git diff <file>` shows nothing (or
   only a `CRLF will be replaced by LF` warning) while `git status` lists it
   modified. An empty content diff is the signature of a phantom.

Completion criterion: at least one flagged file confirmed to have an empty content
diff. If the diffs show real content, this is not a line-ending problem — stop.

## Clear the phantoms

3. **Renormalize the index**: `git add --renormalize .`. This rewrites tracked
   blobs to the canonical line ending. If it aborts with `unable to stat … No such
   file` (pending deletions block the walk), renormalize the existing modified
   files only instead of `.`. Anything it *stages* is a legitimate normalization to
   commit.
4. **Rewrite the working tree**: re-checkout only the phantoms so the working copy
   gets canonical endings. The phantom set is the files modified by stat but absent
   from the real diff — restoring them from the index never touches a file with
   real edits:

   - PowerShell:
     `$real = git diff --name-only; git ls-files -m | ? { $real -notcontains $_ } | % { git checkout -- $_ }`
   - bash:
     `comm -23 <(git ls-files -m | sort) <(git diff --name-only | sort) | xargs -r git checkout --`

Completion criterion: `git status` shows only genuine content changes and
deletions; no file whose sole difference is EOL remains flagged.

## Root cause (offer, don't apply)

`core.autocrlf=true` fighting a `.gitattributes` `eol=lf` rule causes recurring
phantoms on Windows. The durable fix is `git config core.autocrlf false`, leaving
`.gitattributes` as the single source of truth. Suggest it; run it only if the user
agrees — never change git config unprompted.
