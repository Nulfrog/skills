## What it does

`decision-review` takes the decisions a [session](https://www.aihero.dev/ai-coding-dictionary/session) just changed (a new ADR, an amended one, a resolved glossary term) and reviews them along two axes: **Coherence**, whether the change agrees with the ADRs and `CONTEXT.md` already in the repo, and **Conformance**, where the codebase diverges from the decision as now written. Each axis runs as its own [subagent](https://www.aihero.dev/ai-coding-dictionary/subagent), and the two reports come back separately.

It fixes what it finds rather than handing you a list: the glossary and ADR edits, and the code that has mechanically drifted from them. Where a divergence is behavioural rather than mechanical it stops and specifies the work instead, on the grounds that an ADR is not a [spec](https://www.aihero.dev/ai-coding-dictionary/spec).

## When to reach for it

Type `/decision-review`, or the agent reaches for it automatically at the end of a grilling session that wrote to `CONTEXT.md` or `docs/adr/`, since [grill-with-docs](https://aihero.dev/skills-grill-with-docs) closes out by invoking it.

Reach for it by hand whenever a decision has just moved and you want to know what it breaks, including on an ADR you edited without a grilling session. For reviewing code a session wrote rather than decisions it made, use [code-review](https://aihero.dev/skills-code-review) instead; the two are counterparts and the axes do not overlap.

## Prerequisites

It reviews a decision change, so there has to be one: the diff of `CONTEXT.md`, `docs/adr/`, and any per-context copies a root `CONTEXT-MAP.md` names. When that diff is empty the skill says so and stops. It needs no setup of its own, though it edits code and so wants a typecheck and test command it can run, and it reaches for a tracker only when a behavioural divergence has to become a spec.

## The two axes, and why they are separate

The axes ask different questions of different material, and answering one tells you nothing about the other.

| Axis | Question | Material |
| --- | --- | --- |
| Coherence | Does the change agree with what the repo already decided? | The other ADRs, and `CONTEXT.md` |
| Conformance | Where does reality diverge from the change? | The codebase |

A decision can sit perfectly inside the existing ADR set while the code has never once behaved that way, and it can describe the code exactly while quietly contradicting a decision made a year ago. Reporting them together lets one hide the other, which is the same reason [code-review](https://aihero.dev/skills-code-review) keeps Standards and Spec apart.

Conformance is scoped by the **terms** the decision turns on, taken from the ADR body and the glossary. That is what keeps it pointed at the blast radius rather than reading the whole repo, and it is also why a decision written in vague language produces a vague review, because the terms are the search surface.

## What it fixes, and what it hands on

Coherence findings are always fixed, docs against docs, applied through [domain-modeling](https://aihero.dev/skills-domain-modeling). They go first, because a coherence fix changes what conforming even means.

Conformance findings split by the *kind* of fix, not its size:

| Divergence | Example | What happens |
| --- | --- | --- |
| Mechanical | The decision renames a concept and the code still carries the old word | Fixed here, however far it reaches |
| Behavioural | The code returns something the decision says it shouldn't | Collected into one brief, not fixed |

Size is a tempting line and the wrong one. A rename across fifty files is mechanical and should just happen; a three-line change to what a function returns is a design act. The mechanical ones have a single right answer that is verifiable by reading it, which also matters because the conformance report came from a read-only pass over prose and is wrong often enough to check.

Behavioural divergence is specified instead. An ADR constrains the outcome without fixing the mechanism, so *make the code conform* usually admits several implementations, and choosing between them is the deliberate design work the grilling session just did, not something to settle with a drive-by edit against no test harness.

**It never publishes an issue itself, and it writes at most one brief.** Findings are held until both axes are in, then one consolidated brief covers all of them, because they all descend from the same decision and a tracker full of sibling issues loses that. A review with nothing behavioural in it writes no brief at all. Publishing is your step: the skill hands you the brief and stops, because [to-spec](https://aihero.dev/skills-to-spec) is user-invoked and no skill can reach it. Breaking the resulting spec into separate tickets is [to-tickets](https://aihero.dev/skills-to-tickets), also yours, when you are ready to build.

Two behavioural findings deserve better than a ticket, and the tell for both is that the divergent code looks *intended*: a test asserts the current behaviour, a comment defends it, or another ADR exempts it. Either the decision is wrong, in which case working code contradicting a fresh ADR is the strongest evidence available that the grill missed a case, and you reopen the interview instead of filing work against it; or it is a real exemption, and it belongs in the ADR so the next run stops finding it.

## Common questions

**Why not just run `/code-review` after a grilling session?**
Its axes are aimed at a code diff: Standards checks coding standards plus a smell baseline, and Spec checks the diff against an originating issue. After a grilling session the diff is Markdown, so Standards has nothing to bite on and Spec has no source document. What is useful in that setup is the parallel subagent exploration, not the axes; this skill keeps the mechanism and replaces the brief.

**Will it fill my tracker with issues?**
No, and it cannot: it publishes nothing at all. Every behavioural finding is held until both axes are in and then folded into one brief, which it hands you to run `/to-spec` on. A review that finds nothing behavioural writes no brief. The step that turns one spec into many tickets is [to-tickets](https://aihero.dev/skills-to-tickets), and that is yours to invoke too.

**It found nothing. Is that a failure?**
No, and it is the common result for a small decision. An empty Conformance report on a brand-new decision usually means the code has not been written yet, which is exactly right at the head of the build chain.

## It's working if

- The two reports arrive under separate headings, and neither is ranked against the other.
- Every conformance finding quotes a file and line on one side and a clause of the decision on the other.
- The docs fixes and the mechanical code fixes land in the session, and the test suite is green before it hands back.
- Behavioural findings leave as one brief for you to publish, not as edits and not as a pile of issues, and one sometimes sends you back into the interview instead.
- On a repo whose ADRs have drifted, the first run is noisy, reporting a backlog rather than a regression.

## Where it fits

`decision-review` is the close-out step of the planning half of the main chain, mirroring where [code-review](https://aihero.dev/skills-code-review) sits in the building half:

```txt
grill-with-docs → decision-review → to-spec → to-tickets → implement → code-review
```

Its neighbours are [grill-with-docs](https://aihero.dev/skills-grill-with-docs), which invokes it once a session has left a paper trail, and [domain-modeling](https://aihero.dev/skills-domain-modeling), which owns the glossary and ADR formats it applies its coherence fixes through. Any skill that leaves ADRs behind can reach it, including [wayfinder](https://aihero.dev/skills-wayfinder) and [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture). When you're unsure which skill or flow fits, [ask-matt](https://aihero.dev/skills-ask-matt) routes you.
