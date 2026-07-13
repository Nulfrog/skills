---
name: prepare-for-grill
description: Preflight a grill prompt and any sources in one pass, then hand back written feedback — blockers, fixes, and a revised prompt — before you run /grill-me or /grill-with-docs.
argument-hint: "The grill prompt, plus any links or files it relies on"
disable-model-invocation: true
---

# Prepare For Grill

**Preflight** a grill *before* you run it. A grill is a relentless interview that walks a design tree to shared understanding (`/grilling`); it fails when the prompt is ambiguous, the scope too big to **converge**, or a source **contradicts** the prompt. Analyze the prompt and any sources in one pass and hand back a **feedback report**. This is diagnosis for the user to apply; the question-by-question interview belongs to the grill.

## Steps

1. **Collect the inputs.** The grill prompt is required; sources are optional. Gather every link, file, or doc the prompt relies on. If the prompt is missing, ask once. If it references a source you cannot access, ask once, then carry the source into the report as a blocker if it remains unavailable.
2. **Open every source and analyze** against the checks (below). Inspect every section that bears on the prompt's claims and assumptions before writing feedback. If a source is unavailable or too large to assess reliably within this session, mark it blocked and name the narrower source or excerpt needed; never claim an unseen source was verified.
3. **Write the feedback report** (template below) and stop. The report proposes fixes and a revised prompt while leaving the inputs unchanged; the user applies it, then runs the grill in a fresh conversation.

## Checks

**Ambiguity — would two readers grill different things?**
- The subject is a concrete plan or design, not a vague topic.
- The decision or outcome the grill should reach is stated.
- No undefined jargon the grill would have to guess at.

**Scope — will this converge in one session?**
- One design tree, not several tangled together.
- Small enough to reach shared understanding before the **smart zone** runs out (~120k tokens; see `/ask-matt`).
- Several independent design trees should become separate grill prompts. A huge, foggy effort whose route is not yet clear belongs in `/wayfinder`; an already-settled design whose implementation spans sessions belongs in `/to-spec` → `/to-tickets`.

**Sources — open each one; does it hold up against the prompt?**
- **Reachable and assessable** — you can read the load-bearing content within this session. Flag a dead link, blocked page, missing file, or source too large to assess reliably.
- **Consistent** — its content agrees with the prompt's claims and assumptions. A source that **contradicts** the prompt is the classic grill-killer.
- **Relevant** — it bears on the prompt. Flag noise, and name any load-bearing source that's missing.

## Feedback report

```
## Verdict
Grill-ready: yes / not yet — <the blockers in one line, or "good to go">

## Blockers — fix before grilling
- [ambiguity | scope | source] <finding> → <concrete fix>

## Improvements — sharper, not required
- <finding> → <suggestion>

## Sources
- <path or url> — <assessed? consistent? "contradicts: …" / "blocked: unavailable or too large">

## Revised prompt — suggested, edit to taste
<sharpened, unambiguous, right-sized prompt; one design tree>
```

Every check covered, every source assessed or explicitly blocked, each finding paired with a concrete fix, and a verdict plus revised prompt — that's a complete report.
