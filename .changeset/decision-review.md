---
"nulfrog-skills": minor
---

Add `/decision-review`, and close every `/grill-with-docs` session out with it.

A grilling session that writes an ADR leaves two questions unanswered: does the new decision still agree with the decisions already in the repo, and does the code? Running `/code-review` afterwards nearly works, since the parallel sub-agent exploration is the useful part, but its axes are aimed at a code diff, so **Standards** has nothing to bite on when the diff is Markdown and **Spec** has no originating issue to check against.

`/decision-review` keeps the mechanism and replaces the brief. It diffs the **decision surface** (`CONTEXT.md`, `docs/adr/`, and the per-context copies a `CONTEXT-MAP.md` names) then runs two axes as parallel sub-agents: **Coherence**, whether the change contradicts, duplicates, or silently supersedes an existing ADR or invalidates a glossary term, and **Conformance**, where the codebase diverges from the decision as now written, searched outward from the terms the decision turns on.

It then **fixes what it finds**, coherence first, through `domain-modeling`, which owns the glossary and ADR formats, since a coherence fix changes what conforming even means. Conformance fixes follow, and typechecking and the test suite run once the code edits are in.

Conformance findings split by the **kind** of fix rather than its size, since a rename across fifty files is mechanical while a three-line change to what a function returns is a design act. **Mechanical** divergence, such as a renamed concept the code still carries under the old word or a constant that no longer matches, is fixed however far it reaches: one right answer, verifiable by reading it, which matters because the conformance report came from a read-only pass over prose. **Behavioural** divergence is specified rather than fixed, because an ADR is not a spec: it constrains the outcome without fixing the mechanism, so *make the code conform* admits several implementations, and choosing between them is the deliberate design work the grill just did.

The skill **publishes nothing itself**. Behavioural findings are held until both axes are in and folded into **one** brief, since they descend from a common decision that a pile of sibling issues would obscure, and that brief is handed to the user to run `/to-spec` on. It has to be: `to-spec` is user-invoked, so no skill can reach it. `/to-tickets` stays the user's call too, so a planning session can't quietly decompose itself into a backlog.

Where the divergent code looks **deliberate**, because a test asserts it, a comment defends it, or another ADR exempts it, neither happens. The decision is the likelier mistake, and working code contradicting a minutes-old ADR is the strongest evidence available that the grill missed a case, so the session reopens the interview rather than filing work against it.

`ADR-FORMAT.md` also regains the rule the coherence fix depends on: supersede an ADR that was acted on, so the breadcrumb explains the implementation, and overwrite one that never was.
