# Contributing

This repo is Nulfrog's fork of [`mattpocock/skills`](https://github.com/mattpocock/skills). Issues and Discussions are off here, so it takes no reports.

## Where each request goes

Most of the skills here are Matt's, unchanged, so most reports belong upstream. Before you file there, check that the problem also happens with [Matt's copy of the skill](https://github.com/mattpocock/skills/tree/main/skills). Upstream does not know about this fork's changes, so a report about them is noise there.

| You have | Go to |
| --- | --- |
| A bug in a skill that Matt's copy also has | [Upstream bug issue](https://github.com/mattpocock/skills/issues/new?template=bug.yml) |
| A change to one of Matt's skills | [Upstream idea or feedback issue](https://github.com/mattpocock/skills/issues/new?template=idea.yml) |
| A question, or "how do I...?" | [Upstream Discussions: Q&A](https://github.com/mattpocock/skills/discussions/categories/q-a) |
| A problem in a skill only this fork has (`decision-review`, `setup-nulfrog-skills`), or in this fork's changes to Matt's skills | Nowhere: this fork takes no reports |

Every upstream issue is judged against the bar in [`SCOPE.md`](./SCOPE.md). Read it first.

## Issues written with AI

Agents are welcome to help, but you post the issue, so you own it:

- **One problem per issue.** Several findings from one session are several issues, or none.
- **Short.** If it does not fit on one screen, cut it.
- **Repro first.** The steps that show the problem come before any analysis.
- **No pasted specs.** No full proposals, plans, or rewritten `SKILL.md` files. Describe the problem; the fix is the maintainer's to design.
- **Not your project's issues.** If your agent files the specs or tickets for your own project into `mattpocock/skills` or this fork, it has the wrong repo. Run `/setup-matt-pocock-skills` and then `/setup-nulfrog-skills` in your project.
