---
name: prepare-for-grill
description: Analyze a grill prompt and its sources in one pass, then hand back written feedback — blockers, fixes, and a revised prompt — to make it grill-ready before you run /grill-me or /grill-with-docs.
argument-hint: "The grill prompt, plus any links or files it relies on"
disable-model-invocation: true
---

# Prepare For Grill

**Verify** a grill is ready *before* you run it. A grill is a relentless interview that walks a design tree to shared understanding (`/grilling`); it fails when the prompt is ambiguous, the scope too big to **converge**, or a source **contradicts** the prompt. Analyze the prompt and its sources in one pass and hand back a **feedback report**. Don't interview question-by-question — that's the grill's job; here you diagnose and the user fixes.

## Steps

1. **Collect the inputs.** The grill prompt and every source it leans on (links, file paths, docs). Missing either? Ask once, then proceed.
2. **Open every source and analyze** against the checks (below). Read each source in full — never judge a link unseen. This is where the work is: do it before writing a word of feedback.
3. **Write the feedback report** (template below) and stop. Don't fix anything and don't start grilling — the user applies your feedback to the prompt and sources, then runs the grill in a fresh conversation.

## Checks

**Ambiguity — would two readers grill different things?**
- The subject is a concrete plan or design, not a vague topic.
- The decision or outcome the grill should reach is stated.
- No undefined jargon the grill would have to guess at.

**Scope — will this converge in one session?**
- One design tree, not several tangled together.
- Small enough to reach shared understanding before the **smart zone** runs out (~120k tokens; see `/ask-matt`). A grill that can't converge ends in failure — flag it to split, or route a multi-session build to `/to-prd` → `/to-issues`.

**Sources — open each one; does it hold up against the prompt?**
- **Reachable** — you can actually read it. Dead link, blocked page, or missing file.
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
- <path or url> — <reachable? consistent? "contradicts: …" / "missing">

## Revised prompt — suggested, edit to taste
<sharpened, unambiguous, right-sized prompt; one design tree>
```

Every check covered, every source opened, each finding paired with a concrete fix, and a verdict plus revised prompt — that's a complete report.
