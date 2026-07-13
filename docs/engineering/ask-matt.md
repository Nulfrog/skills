Quickstart:

```bash
npx skills add Nulfrog/skills --skill=ask-matt
```

```bash
npx skills update ask-matt
```

[Source](https://github.com/Nulfrog/skills/tree/main/skills/engineering/ask-matt)

## What it does

`ask-matt` is the router over the skills in this repo. You describe the situation you're in; it tells you which skill or flow fits and in what order to run them.

It **does no work itself**. It doesn't grill, write a spec, or fix anything — it only orients. It exists for the **user-invoked** skills above all: nothing fires those for you, so *you* have to remember they exist, and `ask-matt` is the memory you offload that to. It also points at model-invoked skills such as `/tdd`, `/diagnosing-bugs`, `/prototype`, `/code-review`, `/domain-modeling`, and `/codebase-design`. It answers "which one, and when", then hands you off to the skill that actually does the job.

## When to reach for it

You invoke this by typing `/ask-matt` — the agent won't reach for it on its own.

Reach for it whenever you're unsure which skill or flow a situation calls for: you have an idea and don't know where to start, a pile of bug reports and don't know if they're for `/triage`, or two skills that look interchangeable and you can't tell them apart. If you already know the skill you want, skip the router and invoke it directly.

## Flows, not just skills

The idea `ask-matt` gives you to think with is the **flow** — a path *through* the skills rather than a single one. Most work runs along one **main flow** (idea → ship: grill → spec → tickets → implement → review), with on-ramps for incoming work, difficult bugs, codebase health, and efforts too foggy for one session. Ask a question and you get placed on the right flow, at the right step — not just handed a tool.

## Nulfrog additions

Before a grill, [prepare-for-grill](https://aihero.dev/skills-prepare-for-grill) checks that its prompt and any sources are consistent and small enough to converge. It splits independent design trees into separate grills and routes a huge, foggy effort to [wayfinder](https://aihero.dev/skills-wayfinder), rather than mistaking it for a settled multi-session build.

For repository setup, run [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills), then [setup-nulfrog-skills](https://aihero.dev/skills-setup-nulfrog-skills) to make `AGENTS.md` canonical, wire concise communication, and configure `spec` provenance. For Git maintenance, [resolving-merge-conflicts](https://aihero.dev/skills-resolving-merge-conflicts) finishes a conflicted merge or rebase from primary-source intent; [git-renormalize](https://aihero.dev/skills-git-renormalize) clears line-ending phantoms; and [git-commit](https://aihero.dev/skills-git-commit) stages and commits deliberately, then checks remote drift before offering to push.

## Where it fits

`ask-matt` is the **router** — the standalone map that sits over the whole set. It never sits *in* a chain; it points *into* every chain. From here you'll most often land on [grill-with-docs](https://aihero.dev/skills-grill-with-docs), the head of the main flow, or [triage](https://aihero.dev/skills-triage), the on-ramp for work you didn't create. Its [Source](https://github.com/Nulfrog/skills/tree/main/skills/engineering/ask-matt) is the map of record.
