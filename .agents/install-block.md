# The canonical install block

One install story, one wording. `README.md`, `.changeset/*`, and every page under `docs/` must say **this** and nothing else. Change it here first, then propagate.

## Managed installs first

Lead with installs that update themselves. Fall back to skills.sh, labelled "manual updates", only for agents that have no such install. Call a route managed only if it updates without the user running a command. Put any one-time opt-in beside its install command. Never promise "instant".

This fork is **not** listed in Claude Code's official marketplace; that listing (`mattpocock-skills`, sourced from `anthropics/claude-plugins-official`) ships upstream's set. Every managed route, Claude Code included, installs from this repo's own marketplace, `nulfrog`, declared in `.claude-plugin/marketplace.json` and `plugin.json`, so it has to be added before the plugin can be installed. Those routes reinstall only when the `version` in `plugin.json` changes. The Release workflow runs `npm run version`, which copies that field from `package.json`, so users get a release when the "chore: version skills" PR merges.

| Agent         | Route                            | Updates itself?                                                  |
| ------------- | -------------------------------- | ---------------------------------------------------------------- |
| Claude Code   | `@nulfrog` marketplace           | Yes, once the marketplace is added                               |
| Codex         | `@nulfrog` marketplace           | Yes, at startup, by default                                      |
| Copilot CLI   | `@nulfrog` marketplace           | Yes, after a one-time `autoUpdate: true`                         |
| VS Code       | Chat: Install Plugin From Source | Yes, daily, by default                                           |
| Gemini CLI    | `gemini skills install` (copies) | No. A Gemini extension would need a flat `skills/<name>/` layout |
| Everyone else | skills.sh                        | No. Run `npx skills update`, and re-run `add` for new skills     |

Sources (2026-10-08, checked upstream against `@mattpocock`; the `@nulfrog` routes use the same manifests): Codex `core-plugins/src/manager.rs`; Copilot [cli-config-dir-reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference); VS Code `pluginAutoUpdate.ts`; Gemini `skillLoader.ts`.

Nobody has run Auggie, Droid, Qwen or Goose against this repo, so they stay on skills.sh until someone does.

## Claude Code

<canonical-block name="claude-code">

```bash
claude plugin marketplace add Nulfrog/skills
claude plugin install nulfrog-skills@nulfrog
```

Or, from inside a session:

```
/plugin marketplace add Nulfrog/skills
/plugin install nulfrog-skills@nulfrog
```

This fork ships its own marketplace, so add it first; after that, updates arrive automatically.

</canonical-block>

## Codex

<canonical-block name="codex">

```bash
codex plugin marketplace add Nulfrog/skills
codex plugin add nulfrog-skills@nulfrog
```

Updates itself at startup.

</canonical-block>

## GitHub Copilot (CLI and VS Code)

Use the marketplace, not `copilot plugin install Nulfrog/skills`. Copilot has deprecated direct repo installs, and they can't auto-update. The `extraKnownMarketplaces` entry follows the documented schema, but nobody has run it yet.

<canonical-block name="copilot">

```bash
copilot plugin marketplace add Nulfrog/skills
copilot plugin install nulfrog-skills@nulfrog
```

Then, once, add to `~/.copilot/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "nulfrog": { "source": { "source": "github", "repo": "Nulfrog/skills" }, "autoUpdate": true }
  }
}
```

In VS Code, run **Chat: Install Plugin From Source** and enter `https://github.com/Nulfrog/skills`. It updates daily.

</canonical-block>

## Gemini CLI

Gemini doesn't read `.claude-plugin`, and `--path` takes one bucket. One install per promoted bucket gives exactly the promoted set.

<canonical-block name="gemini">

```bash
gemini skills install https://github.com/Nulfrog/skills.git --path skills/engineering
gemini skills install https://github.com/Nulfrog/skills.git --path skills/productivity
```

Re-run both commands to update.

</canonical-block>

## Every other agent, or editable files (skills.sh)

`-a` preselects the agent. Each agent in the comment was run on 2026-10-07. Prefer skills.sh to an agent's own repo installer, such as `amp skill add` or `pi install git:…`, because those also pull in `misc/` and `in-progress/`. `npx skills update` skips skills added upstream since `add`, so the block tells users to re-run `add`.

<canonical-block name="other-agents">

```bash
npx skills@latest add Nulfrog/skills -a <agent>  # cursor, opencode, devin, windsurf, amp, pi; omit -a to choose
```

When the installer asks which skills to take, include both `setup-matt-pocock-skills` and `setup-nulfrog-skills`. To update, run `npx skills@latest update`, and re-run `add` to pick up new skills.

</canonical-block>

Use the single-skill form wherever one skill is named on its own. `docs/` pages don't use this block, because ai-hero renders the install widget above the page body. See [writing-docs.md](./writing-docs.md).

<canonical-block name="skills-sh-one-skill">

```bash
npx skills@latest add Nulfrog/skills --skill=<name>
```

```bash
npx skills@latest update <name>
```

</canonical-block>

`skills@latest` is the pinned spelling everywhere.

## The two routes are exclusive

The plugin is a managed, read-only bundle you subscribe to. skills.sh writes files you own and edit. Installing both leaves the user with every skill twice: always say "pick one".

## Not the install story

`claude plugin install mattpocock-skills` installs **upstream's** set from the official marketplace, not this fork. It is a different plugin with overlapping skill names, so installing it alongside `nulfrog-skills` leaves the user with every upstream skill twice and none of the fork's changes applied. Never document it as a route into this repo.
