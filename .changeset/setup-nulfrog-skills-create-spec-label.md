---
"nulfrog-skills": patch
---

`setup-nulfrog-skills` now creates the `spec` label on GitHub or GitLab when the tracker lacks it, as `setup-matt-pocock-skills` does for the triage labels. Before, `/to-spec` failed to publish on a fresh tracker because it applies the label but never creates it. Re-run `/setup-nulfrog-skills` to create it.
