---
name: planning
description: Explicitly invoked implementation planning for a feature with an approved PRD and architecture decision. Use only when the user directly invokes or names this skill; never activate it automatically.
disable-model-invocation: true
---

# Implementation Planning

Break an approved feature into implementation tasks, discuss the proposed plan with the user, and record the approved plan.

## Invocation

The user must explicitly invoke this skill and provide the path to a PRD:

```text
planning <prd-path>
```

Do not invoke this skill automatically. If the PRD path is missing, ask for it before proceeding.

## Inputs

Given `<prd-path>`:

1. Read the repository's `AGENTS.md`.
2. Read the supplied PRD.
3. Read `<feature-directory>/architecture.md`.
4. Inspect the existing code relevant to the approved feature.

Stop and tell the user if the architecture document is missing or its decision is not accepted.

## Planning

Do not modify application code.

Present a concise, ordered implementation plan. For each task, identify:

- objective
- affected files
- dependencies on earlier tasks
- acceptance criteria covered
- required validation

Tasks must be independently understandable, appropriately scoped, and consistent with the approved requirements and architecture. Identify assumptions or unresolved issues instead of introducing new product or architecture decisions.

## Discussion and Approval

Discuss the proposed breakdown with the user and revise it based on feedback.

Do not write the approved plan until the user explicitly approves it. Do not treat silence or the absence of objections as approval.

## Plan Output

After explicit approval, write:

```text
<feature-directory>/planning.md
```

If the file already exists, ask before replacing it.

The plan must concisely include:

```markdown
# Implementation Plan

## Status

Approved

## Tasks

### Task 1 — <name>

**Objective:**

**Affected files:**

**Dependencies:**

**Acceptance criteria:**

**Validation:**

## Overall Validation

## Assumptions and Open Questions
```

Record only the approved plan.

## Boundaries

- Do not implement the feature.
- Do not modify the PRD or architecture decision.
- Do not change the approved architecture.
- Do not add unrelated work.
- Do not commit changes.
- Do not create a separate draft artifact unless the user requests one.
