---
"nulfrog-skills": patch
---

`decision-review` now runs its Coherence and Conformance sub-agents together in the foreground and aggregates the reports they return, matching `code-review`. It no longer names a Claude-only tool or subagent type, so it reads the same on every harness.
