---
name: prd-to-html
description: Convert a PRD (or spec/issue) into a single self-contained interactive HTML page. Use when the user wants to visualize a PRD as an HTML file, turn an issue/spec into an interactive doc, or mentions "PRD to HTML", "interactive HTML for this PRD", or a visual breakdown of a change.
---

# PRD → interactive HTML

Produces ONE self-contained `.html` file (inline CSS + JS, no network, no deps) that visualizes a PRD. Reuse [TEMPLATE.html](TEMPLATE.html) as the component library — copy its `<style>` and `<script>` verbatim and assemble only the components each PRD needs.

## Workflow

1. **Resolve the PRD source** (auto-detect):
   - A number / "issue 49" / a tracker URL → `gh issue view <n> --json title,body --jq '.title, .body'`.
   - A file path → read it.
   - Otherwise → use the current conversation context.
2. **Parse the PRD** into its template sections (Problem, Solution, User Stories, Implementation Decisions incl. rejected alternatives, Testing, Migration/phases, Out of Scope). Note which are present — never invent content the PRD lacks.
3. **Map sections → components** (see table). Skip components whose source section is absent.
4. **Assemble** the page: copy the `:root`/`<style>` and `<script>` from `TEMPLATE.html` unchanged, then emit the chosen component blocks in order, filling them from the PRD. Keep the section-number badges sequential.
5. **Write** to `docs/<slug>.html`, where `<slug>` is a kebab-case of the PRD title. Confirm `docs/` exists first.
6. **Report** the path and footer-link the source (issue URL / file). Offer a Cursor canvas as an alternative if they want it beside the chat.

## Section → component mapping

| PRD section | Component in TEMPLATE.html |
| --- | --- |
| Title + Problem + Solution | `hero` + `toggle` (before→after of the core change) |
| User Stories | `stories` (numbered grid) |
| Implementation Decisions | `schema` cards (data shape) + `keytable` (contracts) |
| Decisions incl. trade-offs / rejected alts | `decisions` accordion (`.decided` / `.rejected`) |
| Testing Decisions | `keytable` (seam → what it asserts) |
| Migration / rollout / phased steps | `phases` (numbered) + optional `compare` (fixed vs. intrinsic) |
| Out of Scope | `outscope` (muted list) |
| any per-entity / multi-tenant split | `apps` (per-column chains) |

## Rules

- **Self-contained only.** No CDN links, fonts, or external images. Everything inline.
- **Faithful, not padded.** Pull wording from the PRD; don't fabricate schema fields, phases, or stories that aren't there.
- **Interactivity earns its place.** Use the before/after `toggle` for the central change and the `decisions` accordion for the decision tree; don't add toggles for static lists.
- **One file.** If a PRD is huge, prefer more sections over multiple files.

## Quick start

"Make an interactive HTML for issue 49" → fetch via `gh`, parse sections, copy the template shell, emit hero+toggle+stories+schema+decisions+phases+outscope, write `docs/<slug>.html`.

See [TEMPLATE.html](TEMPLATE.html) for every component block (each is labelled with an HTML comment) and the full stylesheet.
