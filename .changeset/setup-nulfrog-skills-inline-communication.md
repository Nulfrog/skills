---
"nulfrog-skills": patch
---

Make `/setup-nulfrog-skills` write the communication rule as text, in `AGENTS.md` and in the Claude hook.

The `## Communication style` section used to say "Follow `.cursor/rules/concise-communication.mdc`." A pointer loads nothing: an agent sees the rule only if it decides to open the file. Codex never opens `.cursor/`, and the Claude hook does not fire for subagents, so both saw the pointer and not the rule. The section now holds the rule sentence, and a re-run replaces the old pointer line.

The Claude `UserPromptSubmit` hook used to run `node` to read the `.mdc` rule. On a machine without Node it failed with only a small notice, and when the file was missing it printed nothing at all. The hook now uses `echo` to print the rule as static text, which works in Git Bash, PowerShell, macOS, and Linux with no runtime. A re-run replaces the old `node` hook.
