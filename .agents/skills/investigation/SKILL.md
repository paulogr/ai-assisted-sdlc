---
name: investigation
description: Explicitly invoked architecture investigation for a feature PRD. Use only when the user directly invokes or names this skill; never activate it automatically.
disable-model-invocation: true
---

# Architecture Investigation

Investigate implementation options for a feature, discuss the trade-offs with the user, and record the approved architecture decision.

## Invocation

The user must explicitly invoke this skill and provide the path to a PRD:

```text
investigation <prd-path>
```

Do not invoke this skill automatically. If the PRD path is missing, ask for it before proceeding.

## Inputs

Given `<prd-path>`:

1. Read the repository's `AGENTS.md`.
2. Check the current Git branch and working-tree status.
3. Read the supplied PRD.
4. Inspect the existing code relevant to the PRD.

If the current branch is `main` or `master`, stop and request human approval to create or switch to a dedicated feature branch. Do not begin the investigation on the default branch.

Treat the PRD as the source of product requirements, acceptance criteria, constraints, and scope.

## Investigation

Do not modify application code.

Present a concise architecture analysis covering:

- current behavior and relevant code
- technical implications of the acceptance criteria
- affected frontend and API areas
- viable implementation options
- advantages, disadvantages, and risks of each option
- compatibility concerns
- recommended approach and reasoning
- unresolved questions requiring human judgment

Reference acceptance-criteria IDs where relevant. Distinguish verified codebase facts from assumptions.

## Discussion and Approval

Discuss the alternatives with the user and answer follow-up questions. Revise the recommendation when new information changes the trade-offs.

Do not write the architecture decision until the user explicitly approves an approach. Do not treat silence or the absence of objections as approval.

## Decision Output

After explicit approval, write:

```text
<feature-directory>/architecture.md
```

If the file already exists, ask before replacing it.

The decision must concisely include:

```markdown
# Architecture Decision

## Status

Accepted

## Context

## Decision

## Alternatives Considered

## Consequences and Risks

## Acceptance Criteria Impact

## Open Questions
```

Record only the approved decision. Do not claim that the user made statements they did not make.

## Boundaries

- Do not implement the feature.
- Do not create, switch, or reset branches without explicit human approval.
- Do not modify the PRD.
- Do not create an implementation plan.
- Do not commit changes.
- Do not create a separate analysis artifact unless the user requests one.
