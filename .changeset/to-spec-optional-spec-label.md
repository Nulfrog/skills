---
"nulfrog-skills": patch
---

Make `/to-spec`'s `spec` provenance label optional.

The step that applies `spec` alongside `ready-for-agent` read as unconditional, so in a repo that ran only `/setup-matt-pocock-skills` the agent would reach for a label the tracker has never heard of — and, on a real tracker, could create it. The label is now explicitly the one `/setup-nulfrog-skills` configures: where it is missing, the spec publishes under `ready-for-agent` alone and the skill says so rather than inventing it.
