Quickstart:

```bash
npx skills add Nulfrog/skills --skill=improving-great-skills
```

```bash
npx skills update improving-great-skills
```

[Source](https://github.com/Nulfrog/skills/tree/main/skills/productivity/improving-great-skills)

## What it does

`improving-great-skills` adds useful behavior to an existing skill without degrading what already makes that host skill work.

The change must be a compatible, purely additive **graft**. If it needs to rewrite the host or introduces a distinct concept, the skill rejects it and recommends a fork or a new skill instead.

## When to reach for it

You invoke this by typing `/improving-great-skills` — the agent won't reach for it on its own.

Reach for it when you want to extend an existing strong skill while preserving its voice, leading words, and process. For designing or rewriting a skill more generally, use [writing-great-skills](https://aihero.dev/skills-writing-great-skills).

## Prerequisites

The complete host must be available: its `SKILL.md`, glossary, and every disclosed reference. A graft cannot be judged safely from a partial reading.

## The deviation gate

A **graft** is compatible when no host instruction pulls against it, and additive when every existing host sentence survives unchanged. It attaches at the matching rung of the host's information hierarchy and uses the host's vocabulary.

If host tissue must change but the concept remains the same, the gate recommends a fork. If the addition has its own leading word and trigger, it recommends a new skill. Rejection stops there; it does not silently scaffold the alternative.

Owned hosts are edited in place. Vendored hosts receive a precise patch artifact so an upstream re-sync cannot erase the addition.

## It's working if

- The complete host was read before judging the change.
- A graft changes or deletes no host lines.
- The result reads like one coherent skill.
- Rejected changes are routed without modifying the host.

## Where it fits

`improving-great-skills` is a reach-for-it-anytime maintenance tool for extending skills safely. Its closest neighbour is [writing-great-skills](https://aihero.dev/skills-writing-great-skills), whose quality principles and split rules define a healthy host. [ask-matt](https://aihero.dev/skills-ask-matt) maps it into the wider skill set.
