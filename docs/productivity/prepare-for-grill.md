Quickstart:

```bash
npx skills add Nulfrog/skills --skill=prepare-for-grill
```

```bash
npx skills update prepare-for-grill
```

[Source](https://github.com/Nulfrog/skills/tree/main/skills/productivity/prepare-for-grill)

## What it does

`prepare-for-grill` checks whether a grill prompt and its sources are precise, right-sized, and mutually consistent, then returns blockers, concrete fixes, and a revised prompt.

It is a **one-pass preflight**, not an interview. It neither edits the inputs nor starts grilling; you apply the report and begin the grill in a fresh conversation.

## When to reach for it

You invoke this by typing `/prepare-for-grill` — the agent won't reach for it on its own.

Reach for it before [grill-me](https://aihero.dev/skills-grill-me) or [grill-with-docs](https://aihero.dev/skills-grill-with-docs) when a prompt may be ambiguous, too broad to converge, or dependent on external sources.

## The grill-ready check

The report tests three things: whether two readers would understand the same assignment, whether one design tree can converge in a session, and whether every source is reachable, relevant, and consistent with the prompt.

A source that contradicts the prompt is a grill-killer, so every source is opened rather than trusted by title. Each finding comes with a fix, and the verdict makes clear whether the prompt is ready now or still blocked.

## It's working if

- Every supplied source was read.
- Each blocker has a concrete fix.
- The report ends with a verdict and a right-sized revised prompt.
- No grilling or source editing happened.

## Where it fits

`prepare-for-grill` is a reach-for-it-anytime preflight immediately before the grilling front doors, [grill-me](https://aihero.dev/skills-grill-me) and [grill-with-docs](https://aihero.dev/skills-grill-with-docs). For the interview technique itself, see [grilling](https://aihero.dev/skills-grilling); [ask-matt](https://aihero.dev/skills-ask-matt) maps the wider flow.
