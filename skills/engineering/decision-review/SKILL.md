---
name: decision-review
description: "Two-axis review of a decision a session just changed: Coherence (does it agree with the ADRs and CONTEXT.md already in the repo?) and Conformance (where does the codebase diverge from it?). Fixes the docs and the code that mechanically drifted from them, and specifies the rest. Use after a session writes or changes an ADR or CONTEXT.md, when the user asks what a decision breaks, or before acting on a decision that has just moved."
---

Two-axis review of the **decisions** a session just changed, the counterpart to `code-review`, which reviews the code a session just wrote:

- **Coherence**: does the changed decision agree with the ADRs and `CONTEXT.md` already in the repo?
- **Conformance**: where does the codebase diverge from the decision as now written?

Both axes run as **parallel sub-agents** so they don't pollute each other's context, then this skill aggregates their findings.

The review fixes what it finds. See [Fixing](#fixing).

## Process

### 1. Pin the decision change

The **decision surface** is `CONTEXT.md`, `docs/adr/`, and the per-context copies of both that a root `CONTEXT-MAP.md` names. Diff it against the state before the session: uncommitted changes by default (`git diff HEAD -- <decision surface>`), or the fixed point the user supplies if the session already committed.

Read every changed ADR **in full**, not just its hunks: both axes review the decision, and a diff shows only the words that moved.

Where that diff is empty, say so and stop. There is no decision to review.

### 2. Name the terms in play

List the domain terms the changed decision turns on, taking them from the ADR body and from `CONTEXT.md`. This is the Conformance sub-agent's search surface: it is what keeps the axis pointed at the blast radius instead of the whole codebase.

### 3. Spawn both sub-agents in parallel

Send a single message with two `Agent` tool calls. Use the `general-purpose` subagent for both.

**Coherence sub-agent prompt**: include the full text of every changed decision, the path and title of every *other* ADR, and `CONTEXT.md`. The brief:

> "Report: (a) every existing ADR the changed decision contradicts, quoting both sides; (b) every existing ADR it supersedes or duplicates without saying so; (c) every `CONTEXT.md` term the change has made wrong, and every term the change relies on that the glossary does not define. Cite file and line for each side of every finding. Under 400 words."

**Conformance sub-agent prompt**: include the full text of every changed decision and the terms from step 2. The brief:

> "Report where the codebase diverges from this decision as written: (a) code that contradicts it; (b) behaviour the decision requires that is absent. Search outward from the terms given. Quote the file, the line, and the clause of the decision it bears on. This is a read-only pass: report each divergence and leave the judgement of which side is wrong to the caller. Under 400 words."

### 4. Aggregate

Present the two reports under `## Coherence` and `## Conformance` headings, verbatim or lightly cleaned. Keep the axes separate and unranked; they carry different fix policies.

## Fixing

Fix every finding, coherence first, because a coherence fix changes what conforming even means and conformance work done before it can be wasted.

**Coherence.** Apply each fix by calling the Skill tool with "domain-modeling", which owns the glossary and ADR formats, including whether an outdated ADR is superseded or overwritten.

**Conformance.** Sort each finding by whether the fix is mechanical or behavioural. Size is not the test: a rename across fifty files is mechanical, and a three-line change to what a function returns is not.

**Mechanical divergence** is where the decision renames a concept and the code still carries the old word, a constant no longer matches the documented value, or a comment describes superseded behaviour. There is one right answer, it is verifiable by reading it, and no design is being done. Fix all of it, however far it reaches.

**Behavioural divergence** is where the code does something the decision says it shouldn't, or lacks something the decision requires. An ADR is not a spec: it constrains the outcome without fixing the mechanism, so *make the code conform* usually admits several implementations, and choosing between them is the deliberate design act the grill just did, not a drive-by edit. It also needs a test harness, which this skill does not provide.

First set aside the ones that should never reach a tracker. The tell for both is that the divergent code looks **deliberate**: a test asserts it, a comment defends it, another ADR exempts it. Either the decision is the likelier mistake, in which case reopen it by calling the Skill tool twice, for "grilling" and "domain-modeling", and amend the ADR rather than filing work against it; or it is a genuine exemption, which goes into the ADR so the next run stops finding it.

Specify what remains, and **exactly once**. Hold those findings until both axes are aggregated, then write **one** consolidated brief covering all of them, at the end of the review. Never one per finding: they all descend from the same decision, that shared cause is the most useful thing about them, and a tracker full of sibling issues loses it. A review with nothing left to carry writes no brief at all.

Then stop, and tell the user to run `/to-spec` on that brief. This skill cannot publish it: `to-spec` is user-invoked, so no skill can reach it. Stopping here is also right on its own terms, because `/to-tickets` is what decomposes a spec into separate issues, and that is the user's call to make when they are ready to build rather than this skill's on the way out of a planning session.

Trust the sub-agent's findings less on this axis than on coherence. It was a read-only pass over prose, and a mechanical fix can be checked by eye where a behavioural one cannot. Once the code edits are in, run typechecking and the full test suite: a fix that reddens the build has traded one divergence for another.

## Done when

- Every changed decision was read in full, and both axes ran against it.
- Every coherence finding and every mechanical divergence is fixed.
- Every behavioural divergence left the session as an amended ADR, a recorded exemption, or part of the one brief handed to the user for `/to-spec`.
- Typechecking and the test suite pass.
