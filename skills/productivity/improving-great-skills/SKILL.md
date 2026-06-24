---
name: improving-great-skills
description: Add to an existing skill without degrading it — graft additive, compatible content onto a host skill, or route an oversized change to a fork or a new skill.
disable-model-invocation: true
---

A **graft** joins new growth to an existing great skill the way grafted tissue joins a tree: it takes only if it is *compatible* with the **host** — the skill you are improving — and it leaves the host's character intact. An incompatible or oversized graft is **rejected** and routed elsewhere, never forced in. This skill keeps every addition additive so the host stays great.

Builds on [`writing-great-skills`](../writing-great-skills/SKILL.md): its principles judge whether the host is still great, and its [*When to split*](../writing-great-skills/SKILL.md#when-to-split) governs where a **rejection** goes. **Bold terms** are defined in that skill's [`GLOSSARY.md`](../writing-great-skills/GLOSSARY.md); the graft vocabulary is defined inline below.

## Read the whole host

Read the host's `SKILL.md` and every file it discloses — its glossary and any sibling **reference**. You cannot graft onto tissue you have not seen. Done when you can name the host's **leading word**(s), its **branches**, and which rung of the **information hierarchy** each section sits on.

## Test graft compatibility

A graft is compatible when no surviving host instruction pulls a different way than the graft, and the graft reuses the host's leading words rather than coining a rival. Read every host instruction the graft touches and reconcile any clash by rewording the graft to agree with the host. Done when no host line contradicts the graft. Never graft over a contradiction — an irreconcilable clash is not an addition but a disagreement; send it to the gate.

## Test additivity

A graft is additive when every existing host sentence survives it unedited — the graft only adds (a new **branch**, a new rung-mate, a new step), never rewrites. Done when you can point to the graft as purely new lines and confirm no host line was changed or deleted. If making the addition's point requires editing host tissue, additivity fails; send it to the gate.

## The deviation gate

Measure deviation by how much host tissue the change forces you to alter:

- **No host tissue changed** (compatible *and* additive) → **graft**. Proceed to apply it.
- **Host tissue must change, same concept** — the change shares the host's leading word and domain but rewrites its process → recommend a **fork**: a divergent copy of the host. Reach for it when a shared or upstream host can't change but you need a variant.
- **A distinct concept** — the change carries its own leading word and trigger the host does not think with → recommend a **new skill** (the by-invocation split — see *When to split*). The two coexist and the host stays pristine.

On **rejection**, stop and report the recommendation with its reason. Don't fork or scaffold the new skill — that is a separate act.

## Graft it in

Locate the **graft site** — where the graft attaches in the host's **information hierarchy**, which rung and beside which neighbours — and attach there in the host's own voice, hierarchy, and leading words: inline what every branch needs, disclose what only some reach. Where you apply depends on ownership:

- **You own the host** (your edits persist) → edit the host `SKILL.md` in place. If the host is mirrored across skill trees, apply to each copy.
- **The host is vendored** (re-synced from upstream, so in-place edits get overwritten) → emit a patch artifact instead: the target path, a precise **anchor**, and the addition wrapped in `<!-- ADDITION -->` fences. Follow the existing convention in [`nulfrog-skill-patches/`](../../../nulfrog-skill-patches/).

## Prune the graft

Apply the host's **pruning** to the graft alone: cut **no-ops** and **duplication** against the host — don't restate what the host already says. Done when the host reads as one coherent skill rather than a host plus a bolt-on: a reader can't tell the graft from original tissue.
