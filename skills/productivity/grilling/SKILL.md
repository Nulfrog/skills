---
name: grilling
description: Interview the user relentlessly about a plan or design. Use when the user wants to stress-test a plan before building, or uses any 'grill' trigger phrases.
---

Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer.

Ask the questions one at a time, waiting for feedback on each question before continuing. Asking multiple questions at once is bewildering.

If a question can be answered by exploring the codebase, explore the codebase instead.

## Closing the session — default to PRD-first (engineering grills)

When grilling an engineering change that resolves into implementable code work (the `/grill-with-docs` path), do NOT create issues ad hoc (neither mid-grill nor at the end). Default to the project's PRD-first pipeline — run `/to-prd` to synthesize the session into a PRD. For non-code or pure-discussion grills (the `/grill-me` path), skip this. If unsure whether there is implementable engineering scope, ask before creating anything.
