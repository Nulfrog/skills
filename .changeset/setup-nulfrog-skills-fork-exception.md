---
"nulfrog-skills": patch
---

Let `/setup-nulfrog-skills` leave a fork's inherited `CLAUDE.md` direction alone.

The overlay made `AGENTS.md` canonical unconditionally, which is the wrong move in a repo that tracks an upstream keeping its instructions in `CLAUDE.md`. Both arrangements land every agent on a single source, so inverting the direction wins nothing but consistency — and it moves the fork's divergence onto the file upstream edits most, so every sync conflicts. The write step now names that exception and asks for the direction it found and why it kept it.
