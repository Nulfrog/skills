---
name: simplify-context
description: Make an existing CONTEXT.md glossary's opaque terms clear at first glance — propose a family-grouped rename map, then hand off.
disable-model-invocation: true
---

# Simplify Context

Take the **existing** `CONTEXT.md` glossary and make its terms clearer at first glance — without changing behaviour. Distinct from `domain-modeling` (builds and sharpens the glossary as you design). This skill **proposes** a vetted rename and hands off; it does not edit by default.

All concrete term names below are illustrative — use the target repo's own domain vocabulary.

## Workflow

1. **Read the glossary.** `CONTEXT.md` `## Language` section. Note its meta-rules (no schemas / file paths / impl detail) and any reserved words (a word one term forbids another from using, via its `_Avoid_`).
2. **Flag the opaque terms.** **First-glance test**: would a newcomer guess the meaning from the name alone? Mark jargon-as-noun and names that don't signal their family. Leave already-clear terms alone — clarity, not churn.
3. **Judge entrenchment** (drives scope). Grep each term across the codebase and the docs (ADRs and similar). Many hits — especially symbol names and filenames — mean renaming is a real refactor, not a doc edit.
4. **Pick scope with the user** — three tiers:
   - *Glosses only* — keep names, add a plain-language one-liner per term. Edits one file. Zero code risk.
   - *Rename everywhere* — new names across CONTEXT.md + code symbols + UI strings + docs. Confirm code-churn reach (symbols+strings vs also filenames).
   - *CONTEXT.md only* — fast but **introduces drift** between the glossary and the code/docs. Discourage.
5. **Build the rename map.** Default lens = **family grouping**: a shared prefix/suffix makes related terms scannable (`Order Placed` / `Order Shipped`; `Billing Address` / `Shipping Address`). Plain-language de-jargon (`Payment Retry` over `Dunning`) is the fallback when no natural family exists. Apply the checks below. Present as an old → new → family table.
6. **Confirm names.** Contested names → `AskUserQuestion`, recommended option first, 2–4 candidates each. Lock the full map before any handoff.
7. **Map the seams** (grounds the handoff — see below).
8. **Hand off.** `/to-prd` (a wide rename is usually PRD-sized), `/to-issues`, or direct edits. Whatever applies the rename, finish by confirming `CONTEXT.md` and the docs/ADRs still agree.

## Rename-map checks

- **Respect reserved words.** If a term's `_Avoid_` bans a word, keep that word out of its rename.
- **Flag collisions.** A proposed name already meaning something else is a stop sign. Surface it; resolve before locking.
- **Drop dead terms.** A glossary entry nothing uses — or that only forbids what the code already does — is drift, not vocabulary; propose removing it. Note any test asserting its presence.
- **Umbrella + instances.** When one term spans two kinds, name the umbrella plus each instance (`Address` → `Billing Address` / `Shipping Address`) — and check instance names against existing code symbols.
- **Prefix only the ambiguous.** Bare names for already-clear terms; prefixes are signal, not decoration.

## Seams to map

A rename is a refactor — use the highest existing seam, add none. Look for:
- **The glossary's source-of-truth test** — many repos parse `CONTEXT.md` and assert the term list and/or verbatim definitions. Renames update the glossary headers (keep order) plus that test's expectations.
- **Term-string literals** — anywhere code or UI looks a term up by its exact glossary spelling must move in lockstep, or the lookup falls back / breaks.
- **Behavior suites** — symbol renames are a pure refactor; behaviour tests should stay green except where they assert an on-screen term string.
- **Docs prose** (ADRs etc.) — find/replace term mentions. Usually no test guard — confirm by hand that the docs still match `CONTEXT.md`.

## Notes

- Vocabulary only: never bundle behaviour, scoring, or schema changes into a rename.
- Renaming internal code symbols is **not** the same as renaming a stable public identifier (event name, API field, DB column, persisted id) — those may need aliases or a migration; vocabulary and symbol renames usually don't. Check before touching any externally-visible name.
- Record rejected alternatives in the handoff so the naming choice stays traceable.
