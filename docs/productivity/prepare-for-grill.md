## What it does

`prepare-for-grill` checks whether a grill prompt and any sources are precise, right-sized, and mutually consistent, then returns blockers, concrete fixes, and a revised prompt.

It is a **one-pass preflight**, not an interview. Sources are optional, and every supplied source is either assessed or explicitly blocked as unavailable or too large; the skill neither edits the inputs nor starts grilling.

## When to reach for it

You invoke this by typing `/prepare-for-grill` — the agent won't reach for it on its own.

Reach for it before [grill-me](https://aihero.dev/skills-grill-me) or [grill-with-docs](https://aihero.dev/skills-grill-with-docs) when a prompt may be ambiguous, too broad to converge, or dependent on external sources.

## The grill-ready check

The report tests three things: whether two readers would understand the same assignment, whether one decision tree can converge in a session, and whether every supplied source is assessable, relevant, and consistent with the prompt.

A source that contradicts the prompt is a grill-killer, so load-bearing content is inspected rather than trusted by title. An unavailable or impractically large source becomes a named blocker rather than an unverified claim.

The scope verdict also chooses the next route. Independent decision trees become separate grill prompts; a huge, foggy effort goes to [wayfinder](https://aihero.dev/skills-wayfinder); an already-settled design whose implementation spans sessions goes to [to-spec](https://aihero.dev/skills-to-spec), then [to-tickets](https://aihero.dev/skills-to-tickets).
## It's working if

- Every supplied source was assessed or explicitly blocked.
- Each blocker has a concrete fix.
- The report ends with a verdict and a right-sized revised prompt.
- No grilling or source editing happened.

## Where it fits

`prepare-for-grill` is a reach-for-it-anytime preflight immediately before the grilling front doors, [grill-me](https://aihero.dev/skills-grill-me) and [grill-with-docs](https://aihero.dev/skills-grill-with-docs). If the preflight exposes more fog than one grill can hold, [wayfinder](https://aihero.dev/skills-wayfinder) is the neighbouring on-ramp; [ask-matt](https://aihero.dev/skills-ask-matt) maps the wider flow.
