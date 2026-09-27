---
"nulfrog-skills": minor
---

Overwrite an outdated ADR in place, in `/decision-review` and in the `AGENTS.md` that `/setup-nulfrog-skills` writes.

`/decision-review` handed its coherence fixes to `domain-modeling`, whose ADR format supersedes an ADR that was acted on. That leaves two documents that disagree, and a reader has to follow the status line to learn which one is in force. `/decision-review` now tells `domain-modeling` to rewrite the outdated ADR so it states the decision now in force, with no amendment note, no `superseded by` status, and no new ADR beside it. Where the session already wrote a new ADR for a decision an existing ADR records, the review folds it into the existing ADR and deletes the new file. The replaced choice moves into the ADR's **Considered Options** with why it was dropped, so the current ADR still warns against it. Git history holds the old text.

`/setup-nulfrog-skills` writes the same rule into `AGENTS.md`, under **Domain docs**, so an agent that edits an ADR by hand follows it too:

> ADRs record only the decisions in force: one file per decision, always current. When a decision changes, including one already implemented, rewrite that same file to the new decision. Every rewrite adds the old choice under a Considered Options heading, with why it was dropped. Git history keeps the earlier text.
