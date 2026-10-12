---
"nulfrog-skills": minor
---

`wayfinder` now calls `decision-review` before closing a ticket that changed `GLOSSARY.md` or wrote or rewrote an ADR. Before, only `grill-with-docs` triggered the review, so a decision made on a wayfinder ticket was never checked. Inside a map, `decision-review` fixes the docs but edits no code, because the map plans rather than does and other sessions may be working its tickets in parallel. It lists mechanical drift in the ticket's resolution comment and adds each behavioural divergence to the map as a ticket or under **Not yet specified**, instead of writing a brief for `/to-spec`.
