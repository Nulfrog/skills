# The canonical install block

One install story, one wording. `README.md`, `.changeset/*`, and every page under `docs/` must say **this** and nothing else. Change it here first, then propagate.

This fork is **not** listed in Claude Code's official marketplace — that listing (`mattpocock-skills`, sourced from `anthropics/claude-plugins-official`) ships upstream's set. `Nulfrog/skills` is its own single-plugin marketplace instead, declared in `.claude-plugin/marketplace.json`, so it has to be added before the plugin can be installed. Once added, Claude Code updates the plugin from this repo, so "updates arrive automatically" stays a true claim.

## Claude Code — the plugin

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

## Codex, and other agents — skills.sh

The plugin is Claude Code only. Everywhere else, [skills.sh](https://skills.sh/Nulfrog/skills) copies editable skill files into the project. Use the whole-set form on `README.md`:

<canonical-block name="skills-sh-whole-set">

```bash
npx skills@latest add Nulfrog/skills
```

Pick the skills you want, and which coding agents to install them on. **The installer lets you choose which skills to take — make sure `setup-matt-pocock-skills` and `setup-nulfrog-skills` are both among them.**

</canonical-block>

…and the single-skill form wherever one skill is named on its own. Note that **`docs/` pages are not a consumer of this block**: ai-hero renders the install widget above the body, so a page that writes the commands out duplicates it. See [writing-docs.md](./writing-docs.md).

<canonical-block name="skills-sh-one-skill">

```bash
npx skills@latest add Nulfrog/skills --skill=<name>
```

```bash
npx skills@latest update <name>
```

</canonical-block>

`skills@latest` is the pinned spelling in all three. The pages under `docs/` used to carry their own copy of these commands; those blocks are now deleted rather than corrected, because the site renders the install commands itself.

## The two routes are exclusive

The plugin is a managed, read-only bundle you subscribe to. skills.sh writes files you own and edit. Installing both leaves the user with every skill twice — always say "pick one".

## Not the install story

`claude plugin install mattpocock-skills` installs **upstream's** set from the official marketplace, not this fork. It is a different plugin with overlapping skill names, so installing it alongside `nulfrog-skills` leaves the user with every upstream skill twice and none of the fork's changes applied. Never document it as a route into this repo.
