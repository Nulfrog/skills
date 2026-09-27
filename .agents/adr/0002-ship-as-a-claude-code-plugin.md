# Ship the skill set as a native Claude Code plugin from its own marketplace; defer a native Codex plugin

These skills are installable via [skills.sh](https://skills.sh/Nulfrog/skills) (`npx skills@latest add Nulfrog/skills`), which copies editable skill files into a user's project across Claude Code, Codex, and other Agent-Skills-standard harnesses. A recurring request is a **plug-and-play** distribution: subscribe to the set as a read-only, always-current bundle you don't edit, rather than a fork you own. That is exactly what native plugin systems provide.

We ship a native **Claude Code plugin**, served from this repo's own marketplace, and, for now, **defer** a native **Codex plugin**. The split is forced by how each ecosystem's plugin manifest selects skills, against this repo's bucketed layout.

## The constraint: bucketed skills vs. single-path selection

Skills live in bucket folders under `skills/`: `engineering/` and `productivity/` are **promoted** (shipped); `misc/`, `in-progress/`, and `deprecated/` are **not**. A plugin must expose only the promoted set, which spans two of those bucket folders.

- **Claude Code**: `.claude-plugin/plugin.json` accepts `skills` as an **array of explicit skill-directory paths**. We list the promoted skills one by one and exclude everything else with zero ambiguity. `claude plugin validate . --strict` passes.

- **Codex**: `.codex-plugin/plugin.json` accepts `skills` only as a **single path string** (arrays are rejected with `missing or invalid plugin.json`), and Codex discovers `SKILL.md` files recursively under it. There is no way to name two bucket folders, or to curate a subset, from one path. Two escape hatches were tested and rejected:
  - Pointing at `./skills/` would also ship `deprecated/`, `in-progress/`, and `misc/`: retired, draft, and rarely used skills we deliberately don't promote.
  - A curated flat directory of **symlinks** into the buckets does not survive install: Codex copies the plugin tree into its cache and **drops symlinks**, so the skills arrive empty.

The only robust ways to give Codex a single promoted-only path are (a) **restructure** so `skills/` contains only promoted skills (moving the non-promoted buckets out, a large blast radius across `CLAUDE.md`, `scripts/link-skills.sh`, the bucket READMEs, and the local dev workflow that relies on `in-progress/`), or (b) **commit duplicate copies** of promoted skills into a flat directory (a sync burden and a second source of truth). Both are structural decisions, not something to bundle into shipping the Claude plugin.

## Decision

- Ship the **Claude Code plugin** (`.claude-plugin/plugin.json`), curated to the promoted set, from this repo's own single-plugin marketplace (`.claude-plugin/marketplace.json`, marketplace `nulfrog`, plugin `nulfrog-skills`). Users add the marketplace, then install: `claude plugin marketplace add Nulfrog/skills`, then `claude plugin install nulfrog-skills@nulfrog`. Once added, Claude Code updates the plugin from this repo. The exact wording lives in [.agents/install-block.md](../install-block.md).
- Keep **skills.sh** as the universal installer: it serves Codex and other harnesses today, so no Codex user is left without an install path.
- **Defer** the native Codex plugin until we decide between restructuring `skills/` to promoted-only vs. committing a generated flat copy. Revisit when Codex either supports a `skills` array / include-list or preserves symlinks on install.

## Considered Options

- **Claude Code's official marketplace** (`claude-plugins-official`), which every Claude Code install has by default and which needs no `marketplace add`. Upstream's `mattpocock-skills` is listed there, but that listing points at `mattpocock/skills` and ships upstream's set, not this fork's. This fork is not listed, so its own marketplace is the only route that installs `nulfrog-skills`.

## Invariants this creates

- Every promoted skill has an entry in `.claude-plugin/plugin.json`'s `skills` array (this also stands as a `CLAUDE.md` rule; it gates the plugin's contents).
- `.claude-plugin/plugin.json`'s `version` tracks `package.json`'s version. `npm run version` runs `changeset version` and then `scripts/sync-plugin-version.mjs`, which copies the version across. Claude uses the plugin `version` to decide when installed users see an update.
