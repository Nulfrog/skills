---
name: to-prd
description: Turn the current conversation into a PRD and publish it to the project issue tracker — no interview, just synthesis of what you've already discussed.
disable-model-invocation: true
---

This skill takes the current conversation context and codebase understanding and produces a PRD. Do NOT interview the user — just synthesize what you already know.

The issue tracker and triage label vocabulary should have been provided to you — run `/setup-matt-pocock-skills` if not.

## Process

1. Explore the repo to understand the current state of the codebase, if you haven't already. Use the project's domain glossary vocabulary throughout the PRD, and respect any ADRs in the area you're touching.

2. Sketch out the seams at which you're going to test the feature. Existing seams should be preferred to new ones. Use the highest seam possible. If new seams are needed, propose them at the highest point you can. The fewer seams across the codebase, the better - the ideal number is one.

Check with the user that these seams match their expectations.

3. Write the PRD using the template below, then publish it to the project issue tracker. Apply the `prd` label to mark it as a specification, not directly implementable work — don't apply a triage role automatically. This skill stops at the published PRD.

Turning the PRD into agent-ready work is a separate step you trigger — `to-prd` never does it on its own:

- **Slice it (usual path):** you run `/to-issues` to break the PRD into `ready-for-agent` issues.
- **Implement it whole:** add the `ready-for-agent` label to the PRD issue yourself, and an AFK agent can pick it up as-is.

Carry over any visualizations that emerged during the grill into the PRD's Visualizations section — they captured the shape of the change while it was being decided, so don't let them evaporate.

<prd-template>

## Problem Statement

The problem that the user is facing, from the user's perspective.

## Solution

The solution to the problem, from the user's perspective.

## Visualizations

Diagrams that capture the shape of the change. Carry over any visualizations that emerged during the grill, and add new ones where a relationship is clearer drawn than described.

Use Mermaid fenced code blocks — the issue tracker renders them. Reach for a diagram when the relationship is graph-shaped:

- **Flow / sequence** — how data or control moves end-to-end
- **State machine** — lifecycle of an entity with non-trivial transitions
- **Before / after** — when the change reshapes existing structure
- **Entity relationships** — when schema or domain relationships change

Diagrams must encode decisions and behavior, not transient implementation detail — same staleness rule as code snippets below. Skip any diagram that would only restate the prose.

## User Stories

A LONG, numbered list of user stories. Each user story should be in the format of:

1. As an <actor>, I want a <feature>, so that <benefit>

<user-story-example>
1. As a mobile bank customer, I want to see balance on my accounts, so that I can make better informed decisions about my spending
</user-story-example>

This list of user stories should be extremely extensive and cover all aspects of the feature.

## Implementation Decisions

A list of implementation decisions that were made. This can include:

- The modules that will be built/modified
- The interfaces of those modules that will be modified
- Technical clarifications from the developer
- Architectural decisions
- Schema changes
- API contracts
- Specific interactions

Do NOT include specific file paths or code snippets. They may end up being outdated very quickly.

Exception: if a prototype produced a snippet that encodes a decision more precisely than prose can (state machine, reducer, schema, type shape), inline it within the relevant decision and note briefly that it came from a prototype. Trim to the decision-rich parts — not a working demo, just the important bits.

## Testing Decisions

A list of testing decisions that were made. Include:

- A description of what makes a good test (only test external behavior, not implementation details)
- Which modules will be tested
- Prior art for the tests (i.e. similar types of tests in the codebase)

## Out of Scope

A description of the things that are out of scope for this PRD.

## Further Notes

Any further notes about the feature.

</prd-template>
