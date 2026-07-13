Quickstart:

```bash
npx skills add Nulfrog/skills --skill=setup-nulfrog-skills
```

```bash
npx skills update setup-nulfrog-skills
```

[Source](https://github.com/Nulfrog/skills/tree/main/skills/engineering/setup-nulfrog-skills)

## What it does

`setup-nulfrog-skills` applies Nulfrog's repository conventions on top of the upstream engineering setup: `AGENTS.md` becomes canonical, `CLAUDE.md` points to it, concise communication is wired across agents, and `spec` records specification provenance.

It is an **overlay**, not a replacement. The upstream setup remains responsible for the issue tracker, triage vocabulary, and domain-doc layout.

## When to reach for it

You invoke this by typing `/setup-nulfrog-skills` — the agent won't reach for it on its own.

Reach for it once when adopting Nulfrog skills in a repository, immediately after [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills). Re-run it only when those Nulfrog-specific conventions need restoring or updating.

## Prerequisites

Run [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) first so the issue tracker, triage labels, and domain documentation are already configured. The concise Claude hook also expects Node.js.

## The Nulfrog overlay

The overlay keeps agent guidance in one place: `AGENTS.md` contains the communication and skill configuration, while `CLAUDE.md` imports that file rather than drifting into a second source.

It also separates issue state from provenance. [to-spec](https://aihero.dev/skills-to-spec) applies both `ready-for-agent` and `spec`; [to-tickets](https://aihero.dev/skills-to-tickets) applies only `ready-for-agent`, so `spec` means “source specification” rather than another triage state.

## It's working if

- `AGENTS.md` is canonical and `CLAUDE.md` points to it.
- Cursor and Claude share the concise-communication rule.
- The tracker documents `spec` separately from triage states.

## Where it fits

`setup-nulfrog-skills` is a run-once setup immediately after [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) and before Nulfrog's engineering flows. Its label convention is consumed by [to-spec](https://aihero.dev/skills-to-spec). [ask-matt](https://aihero.dev/skills-ask-matt) maps the full flow.
