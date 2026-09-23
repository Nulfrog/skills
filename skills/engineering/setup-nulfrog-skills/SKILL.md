---
name: setup-nulfrog-skills
description: Apply this repo's Nulfrog-specific setup conventions on top of setup-matt-pocock-skills: AGENTS.md as the canonical agent doc with CLAUDE.md as a thin pointer, concise-communication wiring, and a `spec` provenance label for issues created by /to-spec. Run once, after setup-matt-pocock-skills.
disable-model-invocation: true
---

# Setup nulfrog Skills

A thin overlay on top of `setup-matt-pocock-skills`. The base skill stays pristine (in sync with upstream `mattpocock/skills`); this skill layers on the local-only conventions this repo has adopted.

**Run the base skill first.** Run `/setup-matt-pocock-skills` to scaffold the issue tracker, triage labels, and domain docs. Then run this skill to apply the overrides and additions below.

## Overrides to the base skill

### Explore step: also check the CLAUDE.md / AGENTS.md relationship

In addition to the base skill's "Explore" checks, when inspecting `AGENTS.md` and `CLAUDE.md`: does `CLAUDE.md` import `AGENTS.md` (`@AGENTS.md`), or does it hold content directly?

### Write step: AGENTS.md is canonical, CLAUDE.md is a pointer

This **replaces** the base skill's "Pick the file to edit" logic (which edits whichever of `CLAUDE.md` / `AGENTS.md` already exists). Instead:

**Put the content in `AGENTS.md`, and point `CLAUDE.md` at it.** `AGENTS.md` is the canonical file, holding both the `## Communication style` and `## Agent skills` sections go there. `CLAUDE.md` stays a thin pointer that imports it, so Claude Code reads the same source as every other agent.

- **`AGENTS.md`**: create it if it doesn't exist; otherwise edit it in place. This is where the content sections below are written.
- **`CLAUDE.md`**: ensure it exists and references `AGENTS.md` via Claude's `@` import:

  ```markdown
  # CLAUDE.md

  @AGENTS.md
  ```

  If `CLAUDE.md` doesn't exist, create it with exactly this. If it exists but doesn't import `AGENTS.md`, add the `@AGENTS.md` line (keep any existing content). If it already imports `AGENTS.md`, leave it. If `CLAUDE.md` currently holds content directly (e.g. from a prior run of the base skill), move that content into `AGENTS.md` and replace `CLAUDE.md` with the pointer above.

**Exception, a fork whose upstream owns `CLAUDE.md`.** Where the repo tracks an upstream that keeps its instructions in `CLAUDE.md` and edits them often, leave the existing direction alone: `CLAUDE.md` canonical, `AGENTS.md` the pointer at it. Both arrangements land every agent on one source, so the win is only consistency, and inverting it would move the fork's divergence onto the file upstream changes most, buying a merge conflict on every sync. Say which direction you found and why you kept it. This repo, a fork of `mattpocock/skills`, is that case.

The base skill's `## Agent skills` block still applies; write it into `AGENTS.md` (not `CLAUDE.md`). If an `## Agent skills` block already exists in `AGENTS.md`, update it in place rather than appending a duplicate.

## Additions

### Communication style

Wire up the concise-communication convention in three places. If any piece already exists, leave the user's wording as-is rather than overwriting it. The exceptions are the old pointer line in step 1 and the old `node` hook in step 3.

1. **`AGENTS.md` section.** Ensure `AGENTS.md` contains a `## Communication style` section that holds the rule text itself. If it's missing, add it (near the top is fine).

```markdown
## Communication style

Talk in ASD-STE100 Simplified Technical English, and use the ubiquitous language from `CONTEXT.md`. Apply this to every reply, for the whole session.
```

Write the text, not a pointer to the rule file. A line such as "Follow `.cursor/rules/concise-communication.mdc`" loads nothing: an agent sees the rule only if it decides to open that file. Codex reads `AGENTS.md` as plain text and never opens `.cursor/`, and the Claude hook in step 3 does not fire for subagents. Inline text reaches Claude, Codex, Cursor, and subagents that load project instructions at session start, and Claude re-reads it after compaction.

If the section already exists and holds only that pointer line (the form earlier runs of this skill wrote), replace the pointer with the text above.

2. **Cursor rule.** Write `.cursor/rules/concise-communication.mdc`, copying the [concise-communication.mdc](./concise-communication.mdc) seed template. The `alwaysApply: true` frontmatter makes Cursor load it into every conversation. The rule text now lives in three places: the `AGENTS.md` section, this file's body, and the hook in step 3. Keep all three the same, so agents never get two versions of one rule.

3. **Claude `UserPromptSubmit` hook.** Merge the hook below into `.claude/settings.json` so the rule is re-injected on every prompt submit. If the file doesn't exist, create it with this content. If it exists, merge into the existing `hooks` object (don't clobber other hooks or settings). If a `UserPromptSubmit` array already holds a hook for this rule, leave it, unless it is the older `node -e` command that reads the `.mdc` file: replace that one with the command below.

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Talk in ASD-STE100 Simplified Technical English, and use the ubiquitous language from `CONTEXT.md`. Apply this to every reply, for the whole session.'"
          }
        ]
      }
    ]
  }
}
```

The `AGENTS.md` text loads once, at session start. The hook repeats the rule next to every prompt, so the rule stays close to the current turn in a long session.

The command prints the rule as static text, so it has nothing to fail on. Three details keep it reliable across Windows, macOS, and Linux:

- It needs no runtime. On Windows, Claude Code runs hook commands in Git Bash, or in PowerShell when Git Bash is not installed. `echo` exists in both shells, and on macOS and Linux.
- Single quotes make the text literal in bash and in PowerShell, so the backticks pass through unchanged. The rule text must not contain a single quote, because a quote ends the string in both shells.
- It reads no file, so a moved or missing rule file cannot make it print nothing. An older version of this hook ran `node` to read the `.mdc` rule: it failed with only a small notice on a machine without Node, and it printed nothing when the file was missing.

### `spec` provenance label

`/to-spec` applies both `ready-for-agent` and `spec` to the issue it publishes. `/to-tickets` applies only `ready-for-agent`, so `spec` identifies the source specifications without changing Matt's triage state machine.

Record `spec` in a separate **Category labels** section in `docs/agents/triage-labels.md`. If that file does not exist because `/triage` was not installed during base setup, create it with just this section. Rename the local string if the tracker already uses a different label:

```markdown
## Category labels

These labels describe what an issue is; they are not triage states and may coexist with any triage role.

| Label in Nulfrog/skills | Label in our tracker | Meaning |
| --- | --- | --- |
| `spec` | `spec` | A source specification published by `/to-spec` |
```

Keep this section separate from the five canonical triage roles. Do not add `spec` to `/to-tickets` output.
