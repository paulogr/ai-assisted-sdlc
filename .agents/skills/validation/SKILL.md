---
name: validation
description: Explicitly invoked validation of an implemented feature against its approved requirements, architecture, and plan. Use only when the user directly invokes or names this skill; never activate it automatically.
disable-model-invocation: true
---

# Feature Validation

Validate an implemented feature using objective evidence and record the results.

## Invocation

The user must explicitly invoke this skill and provide the path to a PRD:

```text
validation <prd-path>
```

Do not invoke this skill automatically. If the PRD path is missing, ask for it before proceeding.

## Inputs

Given `<prd-path>`:

1. Read the repository's `AGENTS.md`.
2. Check the current Git branch and working-tree status.
3. Read the supplied PRD.
4. Read `<feature-directory>/architecture.md`.
5. Read `<feature-directory>/planning.md`.
6. Inspect the implemented code and relevant Git diff.

Stop and tell the user if the current branch is `main` or `master`, required documents are missing, the architecture decision is not accepted, the plan is not approved, or no implementation is available to validate.

## Validation

Do not modify application code.

Build a validation checklist from:

- every acceptance criterion in the PRD
- task-level and overall validation in the approved plan
- compatibility and risk statements in the architecture document

Perform all practical deterministic checks, including applicable build commands, API requests, existing automated checks, and focused code inspection. Start development processes only when needed and stop processes started during validation when finished.

For checks requiring a browser or human judgment:

1. Provide concise, reproducible steps.
2. Ask the user to report the observed result.
3. Record the check as pending until evidence is provided.

Do not install dependencies or introduce a test framework unless it was approved in the plan. Do not claim a check passed unless it was actually performed and produced supporting evidence.

## Result Rules

Use one status:

- **Passed:** every required check passed, including required human checks.
- **Failed:** one or more required checks failed.
- **Pending:** one or more required checks were not performed or lack evidence.

If validation fails, report the findings for the implementation stage. Do not fix the code within this skill.

## Validation Output

After completing the available checks, write:

```text
<feature-directory>/validation.md
```

If the file already exists, ask before replacing it.

Use this concise structure:

```markdown
# Validation Report

## Status

Passed | Failed | Pending

## Scope

## Deterministic Checks

| Check | Result | Evidence |
|---|---|---|

## Acceptance Criteria

| Criterion | Result | Evidence |
|---|---|---|

## Manual Checks

| Check | Result | Evidence or Steps |
|---|---|---|

## Findings

## Remaining Risks
```

The report must distinguish executed evidence, human-reported evidence, and unperformed checks.

## Completion Report

Tell the user:

- overall validation status
- commands and checks performed
- failed or pending acceptance criteria
- manual checks still required
- path to the validation report

## Boundaries

- Do not modify implementation code or approved feature documents.
- Do not resolve defects during validation.
- Do not add dependencies without explicit human approval.
- Do not create, switch, or reset branches.
- Do not commit changes.
- Do not proceed to code review or release.
