# Kotagede Walking Loop Groups Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship three distinct, correctly ordered, measurable Kotagede walking loops with verified Stage 1 destinations and reliable visitor guidance.

**Architecture:** Keep POIs and trail definitions in the existing data module, but make route geometry the source of distance and walking-time metrics. Derive ordered itinerary POIs from `stopIds`, render trail metadata through the existing client components, and validate behavior through Playwright.

**Tech Stack:** Next.js 16, React 19, TypeScript, next-intl, MapLibre GL, Playwright, Yarn 1.22.22.

**Spec:** `docs/superpowers/specs/2026-10-24-kotagede-walking-loop-groups-design.md`

## Global Constraints

- Work in the current `main` checkout as explicitly authorized; preserve all pre-existing changes and do not create commits that mix them.
- Keep English, Indonesian, and Dutch dictionaries synchronized.
- Add no dependency, database change, or unverified Stage 2 destination.
- Use test-first RED→GREEN cycles for every behavior change.

## Review Focus

- Trail selection must preserve `stopIds` order rather than master POI order.
- Route metrics must remain derived from geometry and never drift into localized copy.
- A removed destination must not remain reachable through filters or stale selection.
- Mobile details must not cover the selected marker after camera motion completes.
- Missing destination photography must render an intentional category fallback.

---

### Task 1: Trail data model, membership, and route metrics

**Files:**

- Modify: `lib/data/kotagede-guide.ts`
- Modify: `lib/data/kotagede-routes.ts`
- Test: `tests/kotagede-guide.spec.ts`

**Interfaces:**

- Produces: `WalkingTrail.experienceMinutes`, `WalkingTrail.returnsToStart`, `getTrailPois(trail)`, `getTrailDistanceMeters(trail)`, and `getTrailWalkingMinutes(trail)`.

- [x] Add failing tests for exact loop membership/order, hidden Yangko, unassigned Benteng, closed geometry, derived distance, and walking-time rounding.
- [x] Run the focused tests and confirm the new assertions fail.
- [x] Implement unique ordered stops, corrected POI data, geometry-derived metrics, and revised Merchant/Culinary round trips.
- [x] Re-run focused tests and confirm they pass.

### Task 2: Trail cards, itinerary state, tips, and image fallback

**Files:**

- Modify: `app/[locale]/(main)/kotagede-guide/kotagede-guide-client.tsx`
- Modify: `components/features/walking-tour/trail-switcher.tsx`
- Modify: `components/features/walking-tour/poi-card.tsx`
- Test: `tests/kotagede-guide.spec.ts`

**Interfaces:**

- Consumes: Task 1 trail selectors and metrics.
- Produces: ordered visible itineraries, localized route metadata, safe POI selection, and category fallbacks.

- [x] Add failing browser tests for ordered itineraries, descriptions and metrics, selection reset, visible tips, and image fallbacks.
- [x] Run the focused tests and confirm the new assertions fail.
- [x] Implement the minimal UI and state changes needed for the tests.
- [x] Re-run focused tests and confirm they pass.

### Task 3: Localization and verification record

**Files:**

- Modify: `dictionaries/en.json`
- Modify: `dictionaries/id.json`
- Modify: `dictionaries/nl.json`
- Create: `docs/kotagede-guide-destination-verification.md`
- Test: `tests/kotagede-guide.spec.ts`

**Interfaces:**

- Produces: synchronized trail titles, descriptions, metric labels, place names, and source records.

- [x] Add failing localized-copy assertions for all three route cards.
- [x] Run them and confirm they fail on the old names/metadata.
- [x] Update all dictionaries and document destination sources, coordinates, access type, last-check date, and Stage 2 gates.
- [x] Re-run localized tests and confirm they pass.

### Task 4: Map camera stability and full verification

**Files:**

- Modify: `components/features/walking-tour/kotagede-map-inner.tsx`
- Modify: `tests/kotagede-guide.spec.ts`

**Interfaces:**

- Produces: `data-camera-state="moving|idle"` on the map root and consistent selected-marker clearance.

- [x] Update the Firefox-sensitive test to wait for camera idle and verify an eight-pixel clearance; confirm RED against current behavior.
- [x] Add the camera state and selected-marker clearance behavior, then confirm GREEN in Chromium, Firefox, and WebKit.
- [x] Run `yarn lint`, `yarn build`, and `yarn test:e2e tests/kotagede-guide.spec.ts`; require zero errors and no failing tests.
