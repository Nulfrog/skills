---
"nulfrog-skills": minor
---

`domain-modeling` now rewrites a changed decision in its existing ADR, even one already implemented, instead of superseding it. The old choice moves under **Considered Options** with why it was dropped, the number stays, and git history keeps the earlier text. A withdrawn decision's ADR records the reversal if the reversal clears the ADR tests, and is deleted otherwise. The `deprecated` and `superseded by` statuses are gone.

This moves the overwrite rule into the ADR format itself. The `AGENTS.md` rule that `/setup-nulfrog-skills` writes and `/decision-review`'s hand-off no longer need to override a supersede rule, so both drop that clause. `ADR-FORMAT.md` already diverged from upstream in this section, and the Status line is a new small divergence.
