# Responsive Kotagede Guide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Kotagede walking guide responsive and immediately useful after a map interaction on a phone.

**Architecture:** The guide keeps one `selectedPoi` state and renders the same `POICard` content in two responsive positions: an in-map mobile bottom sheet and the existing desktop sidebar. The surrounding filters, trail picker, itinerary, and MapLibre controls receive mobile-first overflow, sizing, and accessibility rules without changing data flow.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, MapLibre GL, next-intl, Playwright

**Spec:** `docs/superpowers/specs/2026-10-24-kotagede-guide-responsive-design.md`

## Global Constraints

- Do not change POI/trail data, route geometry, translations, or the map provider.
- Add no dependency and preserve unrelated dirty-worktree changes.
- Support widths down to 320px without document-level horizontal overflow.
- Keep selected-place content adjacent to the map on mobile and in the side panel at `lg` and above.

## Review Focus

- At 320px, long English labels must not widen the document; Task 1 checks `scrollWidth <= innerWidth`.
- A dismissed place sheet must return when a visitor selects an itinerary item; Task 1 exercises close and reopen.
- Desktop must not duplicate the place card; Task 1 checks one visible details region at 1280px.
- Long translated copy must wrap inside controls and cards; Task 1 runs the overflow assertion for English, Indonesian, and Dutch routes.
- Map controls must stay operable above the bottom sheet; Task 1 checks named control visibility at phone width.

---

### Task 1: Responsive guide structure and interaction

**Files:**

- Create: `tests/kotagede-guide.spec.ts`
- Modify: `app/[locale]/(main)/kotagede-guide/kotagede-guide-client.tsx`
- Modify: `components/features/walking-tour/poi-card.tsx`
- Modify: `components/features/walking-tour/category-filter.tsx`
- Modify: `components/features/walking-tour/trail-switcher.tsx`
- Modify: `components/features/walking-tour/kotagede-map-inner.tsx`
- Modify: `components/features/walking-tour/kotagede-map.tsx`

**Interfaces:**

- Consumes: existing `selectedPoi`, `activeTrail`, `filteredPois`, `POICard`, `KotagedeMap`, `CategoryFilter`, and `TrailSwitcher` interfaces.
- Produces: `POICard` supports a compact mobile presentation through an optional `variant: "card" | "sheet"` prop and exposes a `data-testid="poi-details"` root; the guide exposes stable map and details test IDs.

- [x] **Step 1: Write the failing responsive Playwright tests**

Add tests named `keeps phone content within the viewport`, `shows dismisses and reopens mobile place details`, `keeps map controls available on phones`, `handles localized copy without horizontal overflow`, and `uses a single desktop side-panel detail card`. Assert 320px/390px viewport geometry, sheet close/reopen behavior, named controls, `/id` and `/nl` overflow, and one visible `poi-details` at 1280px.

- [x] **Step 2: Run the focused tests to verify they fail**

Run: `yarn test:e2e tests/kotagede-guide.spec.ts --project=chromium`

Expected: FAIL because responsive test IDs/labels and the mobile bottom-sheet behavior do not exist yet.

- [x] **Step 3: Implement the responsive guide and mobile sheet**

In `kotagede-guide-client.tsx`, make the outer spacing mobile-first, use a viewport-sensitive map height, render `POICard variant="sheet"` inside the map wrapper below `lg`, retain `variant="card"` in the desktop sidebar, and prevent the itinerary and filters from creating page overflow. Ensure itinerary selection restores a closed sheet.

- [x] **Step 4: Make child components phone-friendly and accessible**

In `poi-card.tsx`, add `variant?: "card" | "sheet"` and compact sheet styling while keeping all content readable. In category/trail controls, add bounded horizontal scrolling and 44px touch targets. In MapLibre controls, add `aria-label`s, responsive offsets/sizes, a real fullscreen-change listener, and safe mobile padding for route fitting.

- [x] **Step 5: Run focused tests and static checks**

Run: `yarn test:e2e tests/kotagede-guide.spec.ts --project=chromium`

Expected: all responsive guide tests PASS.

Run: `yarn lint`

Expected: exit code 0.

- [x] **Step 6: Run production verification**

Run: `yarn build`

Expected: production build completes successfully and includes the localized Kotagede guide route.

- [ ] **Step 7: Commit after user approval**

Suggested commit: `fix: make kotagede guide mobile friendly`
