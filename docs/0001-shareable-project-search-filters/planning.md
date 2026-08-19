# Implementation Plan

## Status

Approved

## Tasks

### Task 1 — Add API-side filtering

**Objective:**

Extend `GET /api/projects` to validate and apply `category`, `experienceLevel`, `projectType`, and `minBudget` alongside the existing keyword search, using AND semantics. Ignore invalid values. Apply minimum budget inclusively and only to fixed-price projects.

**Affected files:**

- `src/api/server.js`

**Dependencies:**

None.

**Acceptance criteria:**

AC-01, AC-02, AC-03, AC-08.

**Validation:**

- Exercise each filter individually with API requests.
- Verify combined filters and keyword search.
- Verify keyword-only behavior remains unchanged.
- Verify invalid values are ignored.
- Verify inclusive fixed-price minimum budget behavior.
- Verify `projectType=Hourly` with `minBudget` returns no results.

### Task 2 — Add controls and URL-backed search state

**Objective:**

Add single-value controls for all filters. On explicit form submission, build the query string, push a history entry, and request matching results. Add Clear All. On initial load, refresh, and `popstate`, restore controls and results without adding history entries. Prevent stale responses from overwriting newer results.

**Affected files:**

- `src/web/App.vue`

**Dependencies:**

Task 1.

**Acceptance criteria:**

AC-01, AC-02, AC-04, AC-05, AC-06, AC-07, AC-08.

**Validation:**

- Submit individual and combined search criteria.
- Confirm controls do not apply before submission.
- Copy, open, and refresh filtered URLs.
- Exercise browser back and forward.
- Clear all criteria and confirm all projects return.
- Verify keyword-only URLs and searches.
- Rapidly submit or navigate to ensure older responses cannot replace newer results.

### Task 3 — Style the expanded search form

**Objective:**

Style the filter controls and Clear All action consistently with the existing page, including responsive behavior.

**Affected files:**

- `src/web/style.css`

**Dependencies:**

Task 2.

**Acceptance criteria:**

Supports usable completion of AC-01 and AC-07.

**Validation:**

- Inspect desktop and narrow-screen layouts.
- Verify labels, inputs, selects, and buttons remain accessible and usable.
- Confirm there is no layout overflow or regression in project cards.

## Overall Validation

- Run `npm run build`.
- Run the API request matrix described in Task 1.
- Run a browser walkthrough covering AC-01 through AC-08.
- Do not add dependencies or a test framework.

## Assumptions and Open Questions

- Supported values exactly match the existing project data:
  - Categories: `Web Development`, `Backend Development`, `Design`, `Writing`
  - Experience levels: `Entry level`, `Intermediate`, `Expert`
  - Project types: `Fixed price`, `Hourly`
- A valid `minBudget` is a finite, non-negative number; other values are ignored.
- Invalid URL filter values remain in the URL during restoration, are not selected in controls, and are removed when the user next submits or clears.
- Unrelated pre-existing repository changes will not be modified.
- No open questions remain.
