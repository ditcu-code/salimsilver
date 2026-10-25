# Kotagede Mobile Map First Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Open the Kotagede guide on mobile with a walk choice over a viewport-sized map, then keep routes, stops, and place information available without leaving the map.

**Architecture:** Keep the existing guide data and desktop state in `kotagede-guide-client.tsx`. Below `lg`, render a viewport-sized map and a single `MobileGuidePanel` whose explicit views cover walk choice, route summary, stops, place preview/details, places, and visitor tips. The panel remains inside the map frame so MapLibre can measure its real occlusion; desktop keeps its current layout.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, MapLibre GL, next-intl, lucide-react, Playwright, Yarn 1.22.22.

**Spec:** `docs/superpowers/specs/2026-10-25-kotagede-mobile-map-first-design.md`

## Global Constraints

- Change the map-first presentation only below `lg` (1024px); keep the current desktop layout, Royal default, and Salim Silver side card.
- Keep existing POIs, three walk definitions, route geometry, destination copy, photos, map provider, and Google Maps URLs.
- Keep English, Indonesian, and Dutch UI strings synchronized; add no UI dependency.
- Support 320px-wide phones and short viewports, fixed header, safe-area inset, keyboard and touch controls, and reduced motion.
- Do not request GPS permission until the visitor uses Locate Me; do not present the route summary as live navigation.
- Preserve the existing responsive tests' intent when replacing assertions for the old mobile sheet and mobile fullscreen button.

## File Structure

- `app/[locale]/(main)/kotagede-guide/kotagede-guide-client.tsx`: shared route/place state, mobile view state, responsive shell, and adapters between map and panel.
- `components/features/walking-tour/mobile-guide-panel.tsx` (new): one mobile panel with explicit walk, route, place, category, and tips views; reuse `POICard` for full details.
- `components/features/walking-tour/poi-card.tsx`: allow full details to fit the expanded mobile panel without changing the desktop card.
- `components/features/walking-tour/kotagede-map.tsx` and `kotagede-map-inner.tsx`: report map availability, reframe the visible map when the panel changes, and place controls safely.
- `dictionaries/en.json`, `id.json`, `nl.json`: mobile control and map-unavailable copy.
- `tests/kotagede-guide.spec.ts`: mobile entry, transitions, failure fallback, localization, camera visibility, and desktop regression.

## Review Focus

- At 320 × 568, the final walk and Explore action must be reachable by scrolling the panel without scrolling the document; Task 1 tests this.
- Choosing the currently previewed Royal walk must confirm it, not clear it; Task 1 tests the route summary and stop count.
- A long Dutch route/place label must wrap without horizontal overflow or covering controls; Task 2 tests all locales at phone width.
- A failed remote basemap style must leave walks, stops, place text, and external map links usable; Task 3 tests the error and retry flow.
- A selected pin must stay between the fixed header and the expanded panel at phone and tablet sizes; Task 3 tests marker geometry after panel changes.

---

### Task 1: Mobile map shell and walk-first entry

**Files:**

- Create: `components/features/walking-tour/mobile-guide-panel.tsx`
- Modify: `app/[locale]/(main)/kotagede-guide/kotagede-guide-client.tsx`
- Modify: `dictionaries/en.json`, `dictionaries/id.json`, `dictionaries/nl.json`
- Test: `tests/kotagede-guide.spec.ts`

**Interfaces:**

- Consumes: existing `WalkingTrail`, `POI`, `POICategory`, `WALKING_TRAILS`, `getTrailPois`, `getTrailWalkingMinutes`, and localized route names.
- Produces: `MobileGuideView = "choose" | "route" | "stops" | "place-preview" | "place-details" | "places" | "tips"` and `MobileGuidePanel` with props `view`, `activeTrail`, `selectedPoi`, `pois`, `category`, `onViewChange`, `onSelectWalk`, `onExploreAll`, `onSelectPoi`, and `onSelectCategory`. Task 1 renders `choose`, `route`, `stops`, and a basic `place-preview`; Task 2 completes that preview and the remaining views.
- Produces: stable test IDs `mobile-guide-panel`, `mobile-walk-picker`, `mobile-route-summary`, `mobile-stops`, and `mobile-place-preview`; each walk row has `data-walk-id`, and panel root uses `data-map-overlay="mobile-guide-panel"` for Task 3.

- [ ] **Step 1: Write failing Playwright tests for mobile entry and desktop preservation.** Name the cases `opens with three walk choices`, `keeps choices reachable on a short phone`, and `preserves desktop at the lg boundary`. Keep the existing `openGuide` helper. Core assertions:

  ```ts
  await page.setViewportSize({ width: 390, height: 844 })
  await openGuide(page)
  await expect(
    page.getByTestId("mobile-walk-picker").locator("[data-walk-id]")
  ).toHaveCount(3)
  expect(
    (await page.getByTestId("kotagede-map-frame").boundingBox())!.height
  ).toBeGreaterThanOrEqual(843)
  await page.locator('[data-walk-id="royal"]').click()
  await expect(page.getByTestId("mobile-route-summary")).toContainText(
    "Royal Mataram Walk"
  )
  await expect(page.getByTestId("mobile-route-summary")).toContainText(
    "6 places"
  )
  await page
    .getByTestId("mobile-route-summary")
    .getByRole("button", { name: /view stops/i })
    .click()
  await expect(
    page.getByTestId("mobile-stops").locator("[data-poi-id]")
  ).toHaveCount(6)
  expect(await page.evaluate(() => document.scrollingElement!.scrollTop)).toBe(
    0
  )
  ```

  At 320 × 568, click the final walk after panel-internal scrolling, reload the route, then click Explore; assert a compact Salim preview, no active route, and unchanged document scroll. At both 1024px and 1280px, assert the existing side card, hero, and route cards are visible and the mobile panel is hidden. Update old initial mobile-sheet and mobile-fullscreen tests to the new entry behavior without dropping their viewport and detail coverage.

- [ ] **Step 2: Run `yarn test:e2e tests/kotagede-guide.spec.ts --project=chromium` and confirm the new mobile tests fail for missing panel/shell behavior.**

- [ ] **Step 3: Build the below-`lg` shell in `kotagede-guide-client.tsx`.** Keep the current desktop markup behind `lg` styles; make the mobile map frame `100dvh` with header-safe top controls and no rounded page-card framing. Keep one accessible page heading, compress the visible mobile introduction, and put the panel inside the map frame. Initialize mobile view to `choose` while retaining the current Royal/Salim state for desktop and as a map preview. Add explicit `onSelectWalk(trail: WalkingTrail)` and `onExploreAll()` adapters so choosing the already previewed Royal walk never toggles it off. Marker selection sets `place-preview` on mobile.

- [ ] **Step 4: Implement the `choose`, `route`, `stops`, and basic `place-preview` panel views.** Render three compact localized walk rows with time, place count, and finish point; include Explore all places. After walk choice, show route name, first stop after Salim, and View stops in a compact summary. View stops opens the ordered itinerary; selecting a stop opens its basic name preview. After Explore, show the selected Salim name in the same compact preview. A visible Walks control reopens the picker. Add the Task 1 mobile labels to all three dictionaries. Keep full details, places, and tips unreachable until Task 2.

- [ ] **Step 5: Run `yarn test:e2e tests/kotagede-guide.spec.ts --project=chromium`; confirm Task 1 tests pass.**

- [ ] **Step 6: Run `yarn lint`; confirm exit code 0.**

- [ ] **Step 7: Commit `feat: open Kotagede mobile guide with walk picker`.** Stage only Task 1 files.

### Task 2: Stops, places, details, and cultural guidance in the panel

**Files:**

- Modify: `components/features/walking-tour/mobile-guide-panel.tsx`
- Modify: `app/[locale]/(main)/kotagede-guide/kotagede-guide-client.tsx`
- Modify: `components/features/walking-tour/poi-card.tsx`
- Modify: `dictionaries/en.json`, `dictionaries/id.json`, `dictionaries/nl.json`
- Test: `tests/kotagede-guide.spec.ts`

**Interfaces:**

- Consumes: Task 1 `MobileGuideView`, `MobileGuidePanel` props, `selectedPoi`, `activeTrail`, `filteredPois`, and existing `POICard` content.
- Produces: stable IDs `mobile-place-details`, `mobile-places`, and `mobile-visitor-tips`; the existing `mobile-stops` and `mobile-place-preview` views gain details actions, and a visible Places control calls `onViewChange`.

- [ ] **Step 1: Write failing interaction tests.** Name the cases `moves from a walk to stops and full place details`, `explores places and visitor tips`, and `keeps localized mobile controls within 320px`. Core assertions:

  ```ts
  await page.locator('[data-walk-id="royal"]').click()
  await page
    .getByTestId("mobile-route-summary")
    .getByRole("button", { name: /view stops/i })
    .click()
  await expect(
    page.getByTestId("mobile-stops").locator("[data-poi-id]")
  ).toHaveCount(6)
  await page
    .getByTestId("mobile-stops")
    .locator('[data-poi-id="pasar-legi"]')
    .click()
  await expect(page.getByTestId("mobile-place-preview")).toContainText(
    "Pasar Legi"
  )
  await page
    .getByTestId("mobile-place-preview")
    .getByRole("button", { name: /details/i })
    .click()
  await expect(
    page
      .getByTestId("mobile-place-details")
      .getByRole("link", { name: /Google Maps/i })
  ).toBeVisible()
  ```

  Assert full photo, description, and visitor tip; close details and verify the Royal route remains selected. In Explore mode, test a category, place-list selection, and the general cultural note. For `/`, `/id/`, and `/nl/`, assert translated mobile labels and `scrollWidth <= innerWidth`. Replace the old tablet card-open assertion with this explicit preview/details flow.

- [ ] **Step 2: Run the focused Chromium spec and confirm the new panel-view tests fail.**

- [ ] **Step 3: Complete the panel views.** Extend the Task 1 stop list and compact preview with Details; add full place details via `POICard`, a places list with category filters, and the existing general cultural note. Keep Walks and Places reachable above expanded content. Expanded content scrolls inside the panel without a modal focus trap or backdrop over the remaining map. A marker tap or list selection sets `place-preview`; Details expands; closing returns to preview or route summary without clearing the walk. Choosing a category continues to use the existing filter behavior and resets a hidden selected POI.

- [ ] **Step 4: Make `POICard` fit the expanded panel and localize all new controls.** Preserve the desktop `card` variant and its content; update only mobile sizing/scroll behavior needed for the new panel and make its mobile Google Maps action at least 44px tall. Add the Task 2 labels to all three dictionaries, including controls and accessible names.

- [ ] **Step 5: Run `yarn test:e2e tests/kotagede-guide.spec.ts --project=chromium`; confirm Task 2 interactions and locale checks pass.**

- [ ] **Step 6: Run `yarn lint`; confirm exit code 0.**

- [ ] **Step 7: Commit `feat: show Kotagede stops and places over mobile map`.** Stage only Task 2 files.

### Task 3: Map visibility, availability, and final verification

**Files:**

- Modify: `components/features/walking-tour/kotagede-map.tsx`
- Modify: `components/features/walking-tour/kotagede-map-inner.tsx`
- Modify: `app/[locale]/(main)/kotagede-guide/kotagede-guide-client.tsx`
- Modify: `dictionaries/en.json`, `dictionaries/id.json`, `dictionaries/nl.json`
- Test: `tests/kotagede-guide.spec.ts`

**Interfaces:**

- Consumes: Task 1 `data-map-overlay="mobile-guide-panel"`, Task 2 panel views, existing MapLibre route geometry and marker selection.
- Produces: optional `onMapStatusChange?: (status: "ready" | "unavailable") => void` on `KotagedeMap` and its inner map; parent exposes `mobile-map-fallback` and a retry button that remounts the map. The map measures panel and header bounds when it reframes routes or places.

- [ ] **Step 1: Write failing map tests.** Name the cases `keeps the selected pin in visible map space`, `keeps guide content usable when the basemap fails`, and `waits for Locate Me before requesting GPS`. With the existing deterministic empty-style helper, choose Heritage, open stops and a place, and at 390 × 844 and 768 × 900 assert:

  ```ts
  const pin = await page
    .locator(".maplibregl-marker:has(.ring-4)")
    .boundingBox()
  const header = await page.getByRole("banner").boundingBox()
  const panel = await page.getByTestId("mobile-guide-panel").boundingBox()
  expect(pin!.y).toBeGreaterThanOrEqual(header!.y + header!.height + 8)
  expect(pin!.y + pin!.height).toBeLessThanOrEqual(panel!.y - 8)
  ```

  Abort the CARTO style request; assert `mobile-map-fallback` and Retry appear, then assert walk choice, stops, place text, and Google Maps link remain usable. Restore the request, retry, and assert fallback clears. Stub `navigator.geolocation.watchPosition` before load and assert zero calls until Locate Me is pressed. Assert mobile fullscreen is absent and desktop fullscreen remains available where supported.

- [ ] **Step 2: Run the focused Chromium spec and confirm the new visibility/failure tests fail.**

- [ ] **Step 3: Reframe visible map content.** Replace the old fixed `poi-details` occlusion lookup with the actual `mobile-guide-panel` bounds. Observe panel size changes with `ResizeObserver`; on route choice, fit route bounds to visible map; on place choice or panel expansion, move the selected pin into the unobscured region. Keep existing desktop camera behavior. Position Reset and Locate Me below the site header and above the compact/expanded panel; hide only the redundant mobile fullscreen control. Localize the map-control labels and geolocation error copy. Set MapLibre transition duration to `0` when `prefers-reduced-motion: reduce` matches.

- [ ] **Step 4: Report map readiness and failure.** Call `onMapStatusChange("ready")` on MapLibre load; report `unavailable` if the initial style fails or does not become ready within 10 seconds. Do not treat an isolated tile error after load as a whole-map failure. Show a localized mobile fallback with Retry, preserving the independent panel data and links; each Retry click remounts the map. Add matching copy to all dictionaries.

- [ ] **Step 5: Run `yarn test:e2e tests/kotagede-guide.spec.ts --project=chromium`; confirm all focused tests pass.**

- [ ] **Step 6: Run `yarn lint`; confirm exit code 0.**

- [ ] **Step 7: Run `yarn build`; confirm production build succeeds.**

- [ ] **Step 8: Capture and inspect screenshots at 320 × 568, 390 × 844, 768 × 900, and 1280 × 900 for panel occlusion, header clearance, and desktop preservation.** Attach representative screenshots to the PR.

- [ ] **Step 9: Run `yarn test:e2e` across the configured browsers before merge; confirm no route, metadata, or interaction regressions.**

- [ ] **Step 10: Commit `fix: keep Kotagede mobile map usable around panels`.** Stage only Task 3 files.

## Execution Notes

- Keep the current `tests/kotagede-guide.spec.ts` data and desktop checks; rewrite only assertions whose mobile entry state intentionally changes.
- For map tests, use the existing empty-style route helper so tile network conditions do not determine marker geometry. Use a separate intentionally failed style request for the fallback test.
- Do not add swipe-only behavior, automatic GPS activation, or new navigation claims while implementing the panel.
