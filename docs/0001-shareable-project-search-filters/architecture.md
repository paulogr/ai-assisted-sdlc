# Architecture Decision

## Status

Accepted

## Context

WorkMatch currently has a single Vue page that submits an optional `q` parameter to `GET /api/projects`. The frontend does not use a router or represent search state in the browser URL. The API performs case-insensitive keyword matching and otherwise returns all projects.

The feature requires single-value filters for category, experience level, project type, and minimum budget. Applied keyword and filter state must be shareable, restorable after refresh, and compatible with browser back and forward navigation.

## Decision

Filtering will be performed by `GET /api/projects`. The API will accept these optional query parameters:

- `q`
- `category`
- `experienceLevel`
- `projectType`
- `minBudget`

Each filter is single-value. The API will combine all valid active criteria with AND semantics while preserving the existing keyword matching behavior. Invalid or unsupported filter values will be silently ignored.

Minimum budget will apply only to fixed-price projects and will use inclusive comparison. Supplying `minBudget` therefore restricts results to fixed-price projects whose budget is greater than or equal to the requested amount. Combining `projectType=Hourly` with `minBudget` will return no results.

The URL will represent the applied search state. The frontend will use native browser APIs—`URLSearchParams`, `history.pushState`, and the `popstate` event—for URL query handling and navigation. No client-side router will be added.

Criteria will be applied only when the user explicitly submits the search form. Submitting a search or clearing all criteria will create a browser history entry. Initial page load, refresh, and `popstate` handling will restore controls from the URL and request the corresponding API results without creating another history entry.

## Alternatives Considered

### Client-side filtering

Fetching all projects and filtering in Vue would reduce API work, but it would duplicate or split search behavior across layers, download unnecessary data, and scale poorly if the project collection grows or pagination is introduced.

### Vue Router

Vue Router could manage query state and navigation, but the application has one route and native browser APIs provide all required behavior without another dependency or abstraction.

### Applying filters immediately

Updating results whenever a control changes was considered. Explicit submission was selected to avoid excessive requests and browser history entries, especially while entering keywords.

### Rejecting invalid query values

Returning an HTTP 400 response would make malformed requests visible, but silently ignoring invalid values was selected for resilient shared URLs and compatibility.

## Consequences and Risks

- The frontend and API must use the same query parameter names and supported values.
- Filter option values may be duplicated between frontend controls and API validation.
- URL restoration must not push new history entries while handling initial load or `popstate`.
- Concurrent requests must not allow an older response to overwrite newer search results.
- Exact filter labels in URLs may create compatibility concerns if labels change later.
- A URL containing ignored invalid values may not correspond exactly to the restored controls until the next explicit search rewrites the applied state.
- Minimum budget and hourly project type are intentionally incompatible and produce no results when combined.

## Acceptance Criteria Impact

- **AC-01:** Each supported filter is represented by a single-value control and API parameter.
- **AC-02:** Keyword and filter parameters can be submitted together.
- **AC-03:** The API applies valid active criteria using AND semantics.
- **AC-04:** Explicit search and clear actions update the URL.
- **AC-05:** Initial load and refresh restore state from URL query parameters.
- **AC-06:** Native history entries and `popstate` restore previous applied searches.
- **AC-07:** Clear All removes all applied search parameters and reloads all projects.
- **AC-08:** Existing `q` behavior remains supported when used alone.

## Open Questions

None.
