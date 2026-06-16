---
name: setup-matt-pocock-skills
description: Sets up an `## Agent skills` block in `AGENTS.md` (imported by `CLAUDE.md` via `@AGENTS.md`) and `docs/agents/` so the engineering skills know this repo's issue tracker (GitHub or local markdown), triage label vocabulary, and domain doc layout, plus a concise communication style (`AGENTS.md` section + `.cursor/rules/concise-communication.mdc` + a `.claude/settings.json` UserPromptSubmit hook). Run before first use of `to-issues`, `to-prd`, `triage`, `diagnose`, `tdd`, `improve-codebase-architecture`, or `zoom-out` — or if those skills appear to be missing context about the issue tracker, triage labels, or domain docs.
disable-model-invocation: true
---

# Setup Matt Pocock's Skills

Scaffold the per-repo configuration that the engineering skills assume:

- **Issue tracker** — where issues live (GitHub by default; local markdown is also supported out of the box)
- **Triage labels** — the strings used for the five canonical triage roles
- **Domain docs** — where `CONTEXT.md` and ADRs live, and the consumer rules for reading them
- **Communication style** — a concise-communication convention, wired into `AGENTS.md` (imported by `CLAUDE.md`), a Cursor rule, and a `UserPromptSubmit` hook so it's reinforced every turn

This is a prompt-driven skill, not a deterministic script. Explore, present what you found, confirm with the user, then write.

## Process

### 1. Explore

Look at the current repo to understand its starting state. Read whatever exists; don't assume:

- `git remote -v` and `.git/config` — is this a GitHub repo? Which one?
- `AGENTS.md` and `CLAUDE.md` at the repo root — does either exist? Is there already an `## Agent skills` section in either? Does `CLAUDE.md` import `AGENTS.md` (`@AGENTS.md`), or does it hold content directly?
- `CONTEXT.md` and `CONTEXT-MAP.md` at the repo root
- `docs/adr/` and any `src/*/docs/adr/` directories
- `docs/agents/` — does this skill's prior output already exist?
- `.scratch/` — sign that a local-markdown issue tracker convention is already in use

### 2. Present findings and ask

Summarise what's present and what's missing. Then walk the user through the three decisions **one at a time** — present a section, get the user's answer, then move to the next. Don't dump all three at once.

Assume the user does not know what these terms mean. Each section starts with a short explainer (what it is, why these skills need it, what changes if they pick differently). Then show the choices and the default.

**Section A — Issue tracker.**

> Explainer: The "issue tracker" is where issues live for this repo. Skills like `to-issues`, `triage`, `to-prd`, and `qa` read from and write to it — they need to know whether to call `gh issue create`, write a markdown file under `.scratch/`, or follow some other workflow you describe. Pick the place you actually track work for this repo.

Default posture: these skills were designed for GitHub. If a `git remote` points at GitHub, propose that. If a `git remote` points at GitLab (`gitlab.com` or a self-hosted host), propose GitLab. Otherwise (or if the user prefers), offer:

- **GitHub** — issues live in the repo's GitHub Issues (uses the `gh` CLI)
- **GitLab** — issues live in the repo's GitLab Issues (uses the [`glab`](https://gitlab.com/gitlab-org/cli) CLI)
- **Local markdown** — issues live as files under `.scratch/<feature>/` in this repo (good for solo projects or repos without a remote)
- **Other** (Jira, Linear, etc.) — ask the user to describe the workflow in one paragraph; the skill will record it as freeform prose

**Section B — Triage label vocabulary.**

> Explainer: When the `triage` skill processes an incoming issue, it moves it through a state machine — needs evaluation, waiting on reporter, ready for an AFK agent to pick up, ready for a human, or won't fix. To do that, it needs to apply labels (or the equivalent in your issue tracker) that match strings *you've actually configured*. If your repo already uses different label names (e.g. `bug:triage` instead of `needs-triage`), map them here so the skill applies the right ones instead of creating duplicates.

The five canonical roles:

- `needs-triage` — maintainer needs to evaluate
- `needs-info` — waiting on reporter
- `ready-for-agent` — fully specified, AFK-ready (an agent can pick it up with no human context)
- `ready-for-human` — needs human implementation
- `wontfix` — will not be actioned

Default: each role's string equals its name. Ask the user if they want to override any. If their issue tracker has no existing labels, the defaults are fine.

**Section C — Domain docs.**

> Explainer: Some skills (`improve-codebase-architecture`, `diagnose`, `tdd`) read a `CONTEXT.md` file to learn the project's domain language, and `docs/adr/` for past architectural decisions. They need to know whether the repo has one global context or multiple (e.g. a monorepo with separate frontend/backend contexts) so they look in the right place.

Confirm the layout:

- **Single-context** — one `CONTEXT.md` + `docs/adr/` at the repo root. Most repos are this.
- **Multi-context** — `CONTEXT-MAP.md` at the root pointing to per-context `CONTEXT.md` files (typically a monorepo).

### 3. Confirm and edit

Show the user a draft of:

- The `## Communication style` block to add to `AGENTS.md` (the canonical file — see step 4)
- The `## Agent skills` block to add to `AGENTS.md`
- The `CLAUDE.md` pointer that imports `AGENTS.md` (`@AGENTS.md`)
- The `.cursor/rules/concise-communication.mdc` rule file
- The `UserPromptSubmit` hook to add to `.claude/settings.json`
- The contents of `docs/agents/issue-tracker.md`, `docs/agents/triage-labels.md`, `docs/agents/domain.md`

Let them edit before writing.

### 4. Write

**Put the content in `AGENTS.md`, and point `CLAUDE.md` at it.** `AGENTS.md` is the canonical file — both the `## Communication style` and `## Agent skills` sections go there. `CLAUDE.md` stays a thin pointer that imports it, so Claude Code reads the same source as every other agent.

- **`AGENTS.md`** — create it if it doesn't exist; otherwise edit it in place. This is where the content sections below are written.
- **`CLAUDE.md`** — ensure it exists and references `AGENTS.md` via Claude's `@` import:

  ```markdown
  # CLAUDE.md

  @AGENTS.md
  ```

  If `CLAUDE.md` doesn't exist, create it with exactly this. If it exists but doesn't import `AGENTS.md`, add the `@AGENTS.md` line (keep any existing content). If it already imports `AGENTS.md`, leave it. If `CLAUDE.md` currently holds content directly (e.g. from a prior run of this skill), move that content into `AGENTS.md` and replace `CLAUDE.md` with the pointer above.

If an `## Agent skills` block already exists in `AGENTS.md`, update its contents in-place rather than appending a duplicate. Don't overwrite user edits to the surrounding sections.

**Communication style.** Wire up the concise-communication convention in three places. If any piece already exists, leave the user's wording as-is rather than overwriting it.

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

**Agent skills block:**

```markdown
## Agent skills

### Issue tracker

[one-line summary of where issues are tracked]. See `docs/agents/issue-tracker.md`.

### Triage labels

[one-line summary of the label vocabulary]. See `docs/agents/triage-labels.md`.

### Domain docs

[one-line summary of layout — "single-context" or "multi-context"]. See `docs/agents/domain.md`.
```

Then write the three docs files using the seed templates in this skill folder as a starting point:

- [issue-tracker-github.md](./issue-tracker-github.md) — GitHub issue tracker
- [issue-tracker-gitlab.md](./issue-tracker-gitlab.md) — GitLab issue tracker
- [issue-tracker-local.md](./issue-tracker-local.md) — local-markdown issue tracker
- [triage-labels.md](./triage-labels.md) — label mapping
- [domain.md](./domain.md) — domain doc consumer rules + layout
- [concise-communication.mdc](./concise-communication.mdc) — Cursor rule for the communication style (copied to `.cursor/rules/`)

For "other" issue trackers, write `docs/agents/issue-tracker.md` from scratch using the user's description.

### 5. Done

Tell the user the setup is complete and which engineering skills will now read from these files. Mention they can edit `docs/agents/*.md` directly later — re-running this skill is only necessary if they want to switch issue trackers or restart from scratch.
