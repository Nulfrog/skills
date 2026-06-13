---
name: git-commit
description: Stage and commit uncommitted changes to git safely and cross-platform. Use when the user asks to commit changes, "commit to git", "commit uncommitted", or create a git commit.
---

# Commit to Git

## Workflow

1. **Inspect** (in parallel): `git status`, `git diff` + `git diff --staged`,
   `git log --oneline -10` (match the repo's message style).
2. **Stage deliberately** — don't blindly `git add -A`. Review untracked files;
   exclude artifacts and anything that may hold secrets (`.env`, keys, creds).
   Track which obviously-shouldn't-be-committed files you skipped (build output,
   `node_modules/`, logs, caches) — they signal a `.gitignore` gap.
3. **Commit** (see OS-safe commit below).
4. **Pull** (`git pull --rebase`): run immediately after commit to integrate
   remote changes. Handle outcomes:
   - **Clean / fast-forward**: report "pull clean, tree up to date".
   - **Rebase conflicts**: run `git rebase --abort`, report which files
     conflicted, and tell the user to resolve manually before pushing. Do NOT
     attempt auto-resolution.
   - **Diverged / merge conflicts**: report the conflicting files and stop.
     Suggest `git pull --rebase` after manual resolution.
   - **Already up to date**: nothing to do, proceed.
5. **Verify**: `git status` after pull; report tree state + commits ahead/behind
   remote.
6. **Suggest `.gitignore` update**: if step 2 found files that obviously
   shouldn't be tracked, list them and offer to add the matching `.gitignore`
   entries. Only edit `.gitignore` if the user agrees.
7. **Ask to push**: end your reply by asking whether the user wants to push.
   Only `git push` if they say yes.

## OS-safe commit (CRITICAL)

Check OS first: `win32` = PowerShell 7 (`pwsh`), else POSIX. On Windows this repo
requires PS7 — if only 5.1 is present, complain and tell the user to run
`pnpm setup` before proceeding.

Single-line message works anywhere: `git commit -m "subject"`.

**Multi-line message:** PowerShell has no bash heredoc (it uses here-strings,
`@"..."@`), so `git commit -m "$(cat <<'EOF' ...)"` fails on Windows. Instead,
write the message to a temp file with the `Write` tool, then commit with `-F`
(`&&` works on PS7 and POSIX; `;` also fine):

```
git add <paths> && git commit -F .git/COMMIT_EDITMSG_TMP && git status
```

Delete the temp file afterward (`Delete` tool / `Remove-Item` / `rm`).

## Git safety

- Never update git config; never force-push/hard-reset unless explicitly asked.
- `--amend` only if asked AND the commit is unpushed + authored this session.
- Commit only when asked; push only when explicitly requested.
