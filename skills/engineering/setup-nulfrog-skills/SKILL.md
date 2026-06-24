---
name: setup-nulfrog-skills
description: Apply this repo's local-specific (nulfrog) setup conventions on top of setup-matt-pocock-skills — AGENTS.md as the canonical agent doc with CLAUDE.md as a thin pointer, a concise-communication style wired into AGENTS.md + a Cursor rule + a Claude UserPromptSubmit hook, and a `prd` artifact label for PRD specs. Run once, after setup-matt-pocock-skills.
disable-model-invocation: true
---

# Setup nulfrog Skills

A thin overlay on top of [`setup-matt-pocock-skills`](../setup-matt-pocock-skills/SKILL.md). The base skill stays pristine (in sync with upstream `mattpocock/skills`); this skill layers on the local-only conventions this repo has adopted.

**Run the base skill first.** Run `/setup-matt-pocock-skills` to scaffold the issue tracker, triage labels, and domain docs. Then run this skill to apply the overrides and additions below.

## Overrides to the base skill

### Explore step — also check the CLAUDE.md / AGENTS.md relationship

In addition to the base skill's "Explore" checks, when inspecting `AGENTS.md` and `CLAUDE.md`: does `CLAUDE.md` import `AGENTS.md` (`@AGENTS.md`), or does it hold content directly?

### Write step — AGENTS.md is canonical, CLAUDE.md is a pointer

This **replaces** the base skill's "Pick the file to edit" logic (which edits whichever of `CLAUDE.md` / `AGENTS.md` already exists). Instead:

**Put the content in `AGENTS.md`, and point `CLAUDE.md` at it.** `AGENTS.md` is the canonical file — both the `## Communication style` and `## Agent skills` sections go there. `CLAUDE.md` stays a thin pointer that imports it, so Claude Code reads the same source as every other agent.

- **`AGENTS.md`** — create it if it doesn't exist; otherwise edit it in place. This is where the content sections below are written.
- **`CLAUDE.md`** — ensure it exists and references `AGENTS.md` via Claude's `@` import:

  ```markdown
  # CLAUDE.md

  @AGENTS.md
  ```

  If `CLAUDE.md` doesn't exist, create it with exactly this. If it exists but doesn't import `AGENTS.md`, add the `@AGENTS.md` line (keep any existing content). If it already imports `AGENTS.md`, leave it. If `CLAUDE.md` currently holds content directly (e.g. from a prior run of the base skill), move that content into `AGENTS.md` and replace `CLAUDE.md` with the pointer above.

The base skill's `## Agent skills` block still applies — write it into `AGENTS.md` (not `CLAUDE.md`). If an `## Agent skills` block already exists in `AGENTS.md`, update it in place rather than appending a duplicate.

## Additions

### Communication style

Wire up the concise-communication convention in three places. If any piece already exists, leave the user's wording as-is rather than overwriting it.

1. **`AGENTS.md` section.** Ensure `AGENTS.md` contains a `## Communication style` section. If it's missing, add it (near the top is fine).

```markdown
## Communication style

Be extremely concise. Sacrifice grammar for the sake of concision.
```

2. **Cursor rule.** Write `.cursor/rules/concise-communication.mdc`, copying the [concise-communication.mdc](./concise-communication.mdc) seed template. The `alwaysApply: true` frontmatter makes Cursor load it into every conversation.

3. **Claude `UserPromptSubmit` hook.** Merge the hook below into `.claude/settings.json` so the rule body is re-injected on every prompt submit. If the file doesn't exist, create it with this content. If it exists, merge into the existing `hooks` object (don't clobber other hooks or settings); if a `UserPromptSubmit` array already references this rule, leave it.

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node -e \"const s=require('fs').readFileSync('.cursor/rules/concise-communication.mdc','utf8');console.log(s.replace(/^---[\\s\\S]*?---\\r?\\n/,''))\""
          }
        ]
      }
    ]
  }
}
```

The command reads the `.mdc` rule, strips its frontmatter, and prints the body — so the rule and the hook stay in sync from a single source. It uses `node`, so it works cross-platform.

### `prd` artifact label

`/to-prd` applies a `prd` label to mark an issue as a specification (sliced into `ready-for-agent` issues by `/to-issues`, not moved through the triage state machine directly). It's a category tag, not a triage state. Record it in `docs/agents/triage-labels.md` alongside the canonical triage roles — rename the string if your tracker uses a different one:

| Label in mattpocock/skills | Label in our tracker | Meaning                                  |
| -------------------------- | -------------------- | ---------------------------------------- |
| `prd`                      | `prd`                | A PRD spec issue, sliced by `/to-issues` |
