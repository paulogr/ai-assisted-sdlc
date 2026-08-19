# Shareable Project Search Filters

## Problem

Keyword search alone makes it difficult for professionals to narrow project results to relevant opportunities.

## Objective

Allow professionals to filter projects and share or revisit the resulting search.

## Requirements

Users can filter projects by:

- category
- experience level
- project type
- minimum budget

Filters must work together with keyword search. The current search state must be represented in the URL.

## Acceptance Criteria

- **AC-01:** Users can apply each supported filter.
- **AC-02:** Multiple filters and keyword search can be combined.
- **AC-03:** Results include only projects matching all selected criteria.
- **AC-04:** The URL updates when search criteria change.
- **AC-05:** Opening or refreshing a filtered URL restores the search criteria and results.
- **AC-06:** Browser back and forward restore previous search states.
- **AC-07:** Users can clear all search criteria.
- **AC-08:** Existing keyword-only search continues to work.

## Non-goals

- Saving searches to a user account
- Search recommendations
- Sorting or pagination
- Changes to project creation
