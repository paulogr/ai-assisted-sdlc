---
name: implementation
description: Explicitly invoked implementation of a feature with an approved PRD, architecture decision, and implementation plan. Use only when the user directly invokes or names this skill; never activate it automatically.
disable-model-invocation: true
---

# Feature Implementation

Implement an approved feature plan and validate the resulting changes.

## Invocation

The user must explicitly invoke this skill and provide the path to a PRD:

```text
implementation <prd-path>
```

Do not invoke this skill automatically. If the PRD path is missing, ask for it before proceeding.

## Inputs

Given `<prd-path>`:

1. Read the repository's `AGENTS.md`.
2. Read the supplied PRD.
3. Read `<feature-directory>/architecture.md`.
4. Read `<feature-directory>/planning.md`.
5. Inspect the existing code and current Git status.

Stop and tell the user if the architecture decision is not accepted, the implementation plan is not approved, or required documents are missing.

## Implementation

Implement the approved tasks in their documented order.

For each task:

1. Inspect the affected code and relevant existing patterns.
2. Make only the changes required by the task.
3. Preserve existing behavior unless the approved documents require otherwise.
4. Run the validation specified for the task when practical.
5. Correct failures caused by the implementation before continuing.

Keep the implementation simple and consistent with the existing project. Do not introduce dependencies, abstractions, product behavior, or architecture changes that are not approved.

If implementation requires deviating from the approved documents, stop and ask for human guidance before proceeding.

## Final Validation

After all tasks are complete:

- run the overall validation defined in the plan
- run applicable repository build and check commands
- inspect the final diff for unrelated changes
- verify every acceptance criterion against the implementation and available evidence

Do not claim that validation passed unless the corresponding command or check was actually performed.

## Completion Report

Report:

- tasks completed
- files changed
- validation commands and results
- acceptance criteria covered
- assumptions or deviations
- unresolved issues and remaining manual checks

The implementation and Git diff are the development artifacts. Do not create a separate development document unless the user requests one.

## Boundaries

- Do not modify the PRD, architecture, or approved plan.
- Do not perform unrelated refactoring.
- Do not overwrite unrelated working-tree changes.
- Do not add dependencies without explicit human approval.
- Do not commit changes unless the user explicitly requests it.
- Do not proceed to code review or release.
