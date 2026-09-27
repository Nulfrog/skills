## What it does

`setup-nulfrog-skills` applies Nulfrog's repository conventions on top of the upstream engineering setup: `AGENTS.md` becomes canonical, `CLAUDE.md` points to it, concise communication is wired across agents, ADRs are overwritten in place, and `spec` records specification provenance.

It is an **overlay**, not a replacement. The upstream setup remains responsible for the issue tracker, triage vocabulary, and domain-doc layout.

## When to reach for it

You invoke this by typing `/setup-nulfrog-skills`, and the agent won't reach for it on its own.

Reach for it once when adopting Nulfrog skills in a repository, immediately after [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills). Re-run it only when those Nulfrog-specific conventions need restoring or updating.

## Prerequisites

Run [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) first so the issue tracker, triage labels, and domain documentation are already configured.

## The Nulfrog overlay

The overlay keeps agent guidance in one place: `AGENTS.md` contains the communication and skill configuration, while `CLAUDE.md` imports that file rather than drifting into a second source.

One repo is exempt: a fork whose upstream owns `CLAUDE.md` and edits it often keeps the direction it inherited. Either arrangement lands every agent on a single source, so inverting it would buy consistency at the price of a merge conflict on the upstream file that changes most.

It tells every agent to overwrite an ADR in place when a decision changes, with a short rule under **Domain docs** in `AGENTS.md`, even when the old decision was already implemented. No amendment note and no superseding ADR is added, because git history already holds the old text. The choice that was replaced moves into the ADR's **Considered Options** with why it was dropped, so developers and agents reading the current ADR still see what was tried. The rule repeats the one in [domain-modeling](https://aihero.dev/skills-domain-modeling)'s ADR format, and [decision-review](https://github.com/Nulfrog/skills/blob/main/skills/engineering/decision-review/SKILL.md) follows it too, so an agent that edits an ADR by hand, one working through `domain-modeling`, and one fixing it through a review all do the same thing.

It also separates issue state from provenance. [to-spec](https://aihero.dev/skills-to-spec) applies both `ready-for-agent` and `spec`; [to-tickets](https://aihero.dev/skills-to-tickets) applies only `ready-for-agent`, so `spec` means “source specification” rather than another triage state.

## It's working if

- One of `AGENTS.md` and `CLAUDE.md` holds the content and the other points at it: `AGENTS.md` by default, or the inherited direction in a fork that tracks an upstream.
- `AGENTS.md` holds the concise-communication rule text itself, not a pointer to the rule file, and the Cursor rule and the Claude hook carry the same text. The hook prints static text and needs no runtime such as Node.js.
- `AGENTS.md` tells agents, under **Domain docs**, to overwrite an ADR in place, not to amend it or supersede it with a new one, and to list the replaced choice under Considered Options.
- The tracker documents `spec` separately from triage states.

## Where it fits

`setup-nulfrog-skills` is a run-once setup immediately after [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) and before Nulfrog's engineering flows. Its label convention is consumed by [to-spec](https://aihero.dev/skills-to-spec). [ask-matt](https://aihero.dev/skills-ask-matt) maps the full flow.
