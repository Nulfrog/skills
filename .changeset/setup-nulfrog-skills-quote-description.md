---
"nulfrog-skills": patch
---

Quote the `description` front matter in `setup-nulfrog-skills`. The em-dash sweep left an unquoted colon-space after `setup-matt-pocock-skills`, which made the block invalid YAML. `npx skills` skipped the skill during discovery, so `skills add` did not list it or update it.
