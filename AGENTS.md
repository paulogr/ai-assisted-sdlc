# Agent Instructions

## Project

WorkMatch is a small project marketplace with:

- Vue and Vite in `src/web/`
- Express in `src/api/server.js`
- Vite proxying `/api` requests to Express on port 3000

Keep the implementation simple and direct. Do not add abstractions or dependencies without a clear requirement and human approval.

## Commands

```bash
npm run dev       # Start the frontend and API
npm run dev:web   # Start only Vite
npm run dev:api   # Start only Express
npm run build     # Build the frontend
npm start         # Start only Express without watch mode
```

## Feature Work

Work on a dedicated feature branch before architecture investigation begins. If the current branch is `main` or `master`, stop and request human approval to create or switch branches before continuing.

Before working on a feature, read its documents under `docs/<feature-id>-<feature-name>/` in this order when available:

1. `prd.md`
2. `architecture.md`
3. `planning.md`

Treat the PRD as the source of product requirements and acceptance criteria. Treat approved architecture and planning documents as constraints.

Follow the current lifecycle stage only. An analysis or planning request must not modify application code. Do not make decisions explicitly reserved for human approval.

## Engineering Rules

- Inspect existing code before proposing or making changes.
- Preserve existing behavior unless the feature requires otherwise.
- Keep changes scoped to the approved feature and plan.
- Avoid unrelated refactoring.
- Use the existing project structure and coding style.
- Run relevant validation commands before finishing.
- Report assumptions, unresolved questions, and validation results.
