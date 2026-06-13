---
name: audit-context-drift
description: Audit CONTEXT.md (the project glossary) for drift against the ADRs in docs/adr, using parallel read-only sub-agents, then apply verified fixes. Use for periodic glossary maintenance, or when the user asks to sanity-check / reconcile CONTEXT.md against the ADRs, suspects an outdated or renamed term, or wants ADR citations verified.
---

# Audit CONTEXT.md against the ADRs

Periodic maintenance. The ADRs (`docs/adr/`) are the source of truth; `CONTEXT.md` is the glossary that must track them. Goal: find and fix drift — stale terms, wrong citations, contradictions, implementation-detail leakage.

## Workflow

1. **Survey.** Read `CONTEXT.md`; list `docs/adr/*.md` (plus `docs/migration/`, `docs/agents/`, `docs/testing.md`). Note the glossary's top-of-file meta-rule (no schemas / file paths / implementation details).
2. **Group.** Partition the ADRs into ~5 thematic groups (e.g. lesson & playback core; toy runtime contract & validation; registry / resolution / hosting / failures; identity / auth / multi-tenant / agent; tooling & conventions). Map each glossary term to a group.
3. **Fan out.** Launch one read-only `explore` sub-agent **per group, in parallel** (one message, multiple `Task` calls, `readonly: true`). Give each its ADR file list, its glossary terms, and the per-group checks below. Subagents do NOT have the chat context — spell out every file path and term.
4. **Synthesize.** Merge findings into ONE prioritized drift report: (1) contradicts an ADR decision, (2) wrong/stale ADR citation, (3) glossary-rule violation (impl-detail leakage), (4) missing canonical term, (5) ADR-vs-ADR conflict. Link sub-agents by id. Present to the user before editing.
5. **Verify before editing.** For each finding, open the cited ADR and confirm against its actual text — never trust a sub-agent summary alone (per `AGENTS.md`: verify before recommending). Note what you couldn't confirm.
6. **Apply in-scope fixes only.** Factual corrections, citation fixes, and stale-term renames: apply. Scope changes (stripping implementation detail, adding new terms): **ask first**. ADR-vs-ADR conflicts: do **not** silently pick a winner in the glossary — file an issue or draft an ADR amendment, then make the glossary follow that decision.

## Per-group checks (paste into each sub-agent prompt)

For each assigned term, check:
- **Definition** matches the ADR decision? Flag contradictions.
- **Stale wording** — a capability/field/role renamed across ADRs (e.g. a later ADR supersedes an earlier name)?
- **Citations** — every cited ADR number exists AND is in effect. Read status headers for `Superseded by` / `Supersedes` / `Amends` / `Updated by` / `Withdrawn`.
- **Missing term** the ADRs establish but the glossary omits?
- **Rule violation** — schemas, file paths, code identifiers, table/field names, or framework component names leaking into a definition.

Each finding: `term · issue · evidence (ADR id + short quote) · recommended fix`. Read-only; no edits.

## Notes

- ADR status headers are authoritative for supersession; a superseded ADR's claims are not current.
- Treat the glossary meta-rule as a lint: definitions are domain prose, not implementation detail. A banned synonym inside an `_Avoid_` list is fine.
- A term renamed by a later ADR but left stale in an earlier ADR is also ADR drift — note it for a separate ADR cleanup even after fixing the glossary.
