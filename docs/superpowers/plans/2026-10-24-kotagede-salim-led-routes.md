# Kotagede Salim-Led Routes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the closed Royal, Merchant, and Culinary loops with three one-way, Salim-led routes: Royal Mataram Walk, Kotagede Heritage Walk, and Kotagede Food Walk.

**Architecture:** Keep the existing `WalkingTrail` data shape and MapLibre consumer, but make a route explicitly finish at `endStopId` rather than returning to Salim. Re-author the three route geometries as outward paths, then let the existing map and ordered itinerary render the data. The UI reads a localized start/finish summary from the route object; Stage 2 remains documentation-only until its field-verification gate passes.

**Tech Stack:** Next.js 16 App Router, TypeScript, React, MapLibre GL, next-intl, Tailwind CSS v4, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-24-kotagede-salim-led-routes-design.md`

## Global Constraints

- Publish exactly three routes with IDs `royal`, `heritage`, and `culinary`; remove the `merchant` route ID.
- Every route starts at `salim-silver`, ends at `endStopId`, and has no return segment to Salim.
- Default to ascending verified Salim-origin walking distance; keep Masjid Gedhe, Makam Raja, and Sendang Seliran contiguous as the Royal Mataram complex, then place Between Two Gates after the complex.
- Use these exact Stage 1 orders:
  - `royal`: `salim-silver`, `pasar-legi`, `masjid-gedhe-mataram`, `makam-raja`, `sendang-seliran`, `between-two-gates`
  - `heritage`: `salim-silver`, `pasar-legi`, `masjid-gedhe-mataram`, `makam-raja`, `sendang-seliran`, `between-two-gates`, `omah-ugm`, `gang-soka`, `museum-kotagede`
  - `culinary`: `salim-silver`, `kembang-waru`, `pasar-legi`, `kipo-bu-djito`
- The final itinerary stop is visibly the finish; show a localized “Starts at Salim Silver · Ends at {destination}” summary and no visitor-facing “loop,” “round trip,” or “return to Salim” claim.
- Keep all English, Indonesian, and Dutch route names/copy synchronized: Royal Mataram Walk, Kotagede Heritage Walk, and Kotagede Food Walk, with the approved translations from the spec.
- Do not add Watu Gilang, Cepuri, Bokong Semar, Rumah Pesik, Ngudi Roso, or Yangko Pak Prapto to a route. Do not add destination photography without documented ownership or licence.
- Preserve the existing 30-metre route-vertex proximity rule, neutral image fallback, categories, map-sheet behaviour, and all existing visitor-access cautions.

## Review Focus

- A route whose last geometry vertex quietly returns to Salim instead of ending at `endStopId`; Task 1 asserts both endpoints and that no route is closed.
- The 530-metre Between Two Gates stop splitting the 470/540/550-metre Royal complex; Task 1 asserts the three complex stops are consecutive before Between Two Gates.
- A renamed `heritage` route leaving `merchant` in a route selector, source ID, or localized card; Task 2 asserts only the three approved route controls appear in each locale.
- Start/finish copy wrapping or clipping in the three locales, especially on a 320px phone; Task 2 extends the localized overflow and full-description tests.
- Structured data or verification notes continuing to advertise a “loop” or a return; Tasks 2 and 3 assert route names in JSON-LD and scan the live guide/dictionary/verification sources for obsolete visitor claims.

---

### Task 1: Define and verify the one-way route data contract

**Files:**

- Modify: `lib/data/kotagede-guide.ts:18-216`
- Modify: `lib/data/kotagede-routes.ts:1-699`
- Modify: `tests/kotagede-guide.spec.ts:1-145`

**Interfaces:**

- Consumes: `POI`, `SALIM_SILVER_LOCATION`, `getTrailPois`, `getTrailDistanceMeters`, and `getTrailWalkingMinutes` from `lib/data/kotagede-guide.ts`.
- Produces: `WalkingTrail` with `id: "royal" | "heritage" | "culinary"`, `endStopId: string`, ordered `stopIds`, and one-way `routeGeoJson`; `WALKING_TRAILS` with exactly the three approved entries.
- Produces: `ROYAL_ROUTE_COORDINATES`, `KOTAGEDE_HERITAGE_ROUTE_COORDINATES`, and `CULINARY_ROUTE_COORDINATES`, each starting near Salim and ending at its route finish.

- [ ] **Step 1: Replace the data-test expected orders with the approved `royal`, `heritage`, and `culinary` routes.**

  In `tests/kotagede-guide.spec.ts`, define:

  ```ts
  const EXPECTED_ROUTE_STOPS = {
    royal: [
      "salim-silver",
      "pasar-legi",
      "masjid-gedhe-mataram",
      "makam-raja",
      "sendang-seliran",
      "between-two-gates"
    ],
    heritage: [
      "salim-silver",
      "pasar-legi",
      "masjid-gedhe-mataram",
      "makam-raja",
      "sendang-seliran",
      "between-two-gates",
      "omah-ugm",
      "gang-soka",
      "museum-kotagede"
    ],
    culinary: ["salim-silver", "kembang-waru", "pasar-legi", "kipo-bu-djito"]
  } as const
  ```

  Assert the route ID list is exactly `["royal", "heritage", "culinary"]`, every `stopIds` list is unique and begins at Salim, `endStopId` equals its final ID, the Royal complex IDs are consecutive, and Benteng remains outside the three routes.

- [ ] **Step 2: Add failing endpoint and one-way geometry assertions.**

  Replace the closed-route test with assertions that every coordinate array starts within 2 metres of `SALIM_SILVER_LOCATION`, ends within 30 metres of the POI named by `endStopId`, and ends more than 30 metres from Salim. Retain the existing assertion that every displayed stop is within 30 metres of a route vertex and that distance/minutes are derived from the geometry.

- [ ] **Step 3: Run the data group to verify the new contract fails.**

  Run: `yarn test:e2e tests/kotagede-guide.spec.ts --grep "Kotagede walking trail data"`

  Expected: FAIL because the present `merchant` ID, `returnsToStart` data, closed geometries, and old orders do not satisfy the new tests.

- [ ] **Step 4: Implement `endStopId` and the three approved route entries in `lib/data/kotagede-guide.ts`.**

  Change `WalkingTrail` to remove `returnsToStart`, add `endStopId: string`, and restrict `id` to `"royal" | "heritage" | "culinary"`. Retain `getTrailPois`, `getTrailDistanceMeters`, and `getTrailWalkingMinutes` unchanged. Define the exact stop orders from Global Constraints; give the Royal route `between-two-gates`, Heritage `museum-kotagede`, and Culinary `kipo-bu-djito` as their end IDs.

- [ ] **Step 5: Re-author the pedestrian geometry exports in `lib/data/kotagede-routes.ts`.**

  Keep only the three route exports used by the guide. Trim the Royal route at the Between Two Gates vertex; trim the Culinary route at its first Kipo Bu Djito vertex; create `KOTAGEDE_HERITAGE_ROUTE_COORDINATES` as a continuous pedestrian path through the approved Heritage order. It must travel from Between Two Gates to Omah UGM, Gang Soka, and Museum Kotagede without a Salim return leg. Remove the obsolete `MERCHANT_ROUTE_COORDINATES`, `MERCHANT_CORE_ROUTE_COORDINATES`, and duplicate culinary-core export after moving consumers.

- [ ] **Step 6: Run the data group to verify it passes.**

  Run: `yarn test:e2e tests/kotagede-guide.spec.ts --grep "Kotagede walking trail data"`

  Expected: PASS with all three data routes beginning at Salim, ending at their declared finish, retaining the 30-metre stop proximity guarantee, and using five-minute-rounded geometry estimates.

- [ ] **Step 7: Commit the data contract and geometry.**

  ```bash
  git add lib/data/kotagede-guide.ts lib/data/kotagede-routes.ts tests/kotagede-guide.spec.ts
  git commit -m "refactor: make Kotagede routes one way"
  ```

### Task 2: Render the three Salim-led routes and localized start/finish guidance

**Files:**

- Modify: `app/[locale]/(main)/kotagede-guide/kotagede-guide-client.tsx:20-184`
- Modify: `app/[locale]/(main)/kotagede-guide/page.tsx:56-121`
- Modify: `components/features/walking-tour/trail-switcher.tsx:30-116`
- Modify: `dictionaries/en.json:351-500`
- Modify: `dictionaries/id.json:351-500`
- Modify: `dictionaries/nl.json:351-500`
- Modify: `tests/kotagede-guide.spec.ts:332-493`

**Interfaces:**

- Consumes: Task 1's `WalkingTrail.endStopId`, route IDs, ordered `stopIds`, and `getTrailPois(trail)`.
- Produces: route-card summary test IDs `trail-route-endpoints-royal`, `trail-route-endpoints-heritage`, and `trail-route-endpoints-culinary`; the final itinerary button carries `data-route-finish="true"` when an active route's `endStopId` matches its POI ID.
- Produces: the three localized `Trails` entries keyed `royal`, `heritage`, and `culinary`, plus `MapControls.routeStartEnd` and `MapControls.finish`.

- [ ] **Step 1: Replace the Merchant/loop Playwright expectations with failing three-route assertions.**

  Update the route-experience tests to click `trail-heritage`, expect the nine approved Heritage IDs in order, and assert Royal's complex sequence is contiguous. Replace `trail-round-trip-royal` with `trail-route-endpoints-royal`, expecting `Starts at Salim Silver · Ends at Between Two Gates (Gang Rukunan, Kampung Alun-alun)` in English. Assert the final itinerary item has `data-route-finish="true"`, all three controls are `royal`, `heritage`, and `culinary`, and no `trail-merchant` control exists.

  Update the three-locale title/descriptions test to expect the approved names, use `heritage` instead of `merchant`, and retain the Between Two Gates POI accessibility assertion. Extend the 320px localized-copy test to include the start/finish summary and all three route descriptions.

- [ ] **Step 2: Add a failing JSON-LD route-name assertion.**

  On the English guide page, parse the `application/ld+json` script and assert its `TouristTrip.itinerary` names are exactly `Royal Mataram Walk`, `Kotagede Heritage Walk`, and `Kotagede Food Walk`, with no name containing `Loop`.

- [ ] **Step 3: Run the route-experience tests to verify they fail.**

  Run: `yarn test:e2e tests/kotagede-guide.spec.ts --grep "Kotagede walking loop experience"`

  Expected: FAIL because the cards currently render `merchant`, “Round trip,” old loop copy, and stale structured-data names.

- [ ] **Step 4: Update `TrailSwitcher` and the itinerary to expose start/finish.**

  In `trail-switcher.tsx`, resolve the final POI through `getTrailPois(trail)`, replace the round-trip span with `MapControls.routeStartEnd`, and render the Task 2 endpoint test ID. In `kotagede-guide-client.tsx`, mark only the final active-route item with `data-route-finish="true"` and a localized `MapControls.finish` label while retaining selection and category-reset behaviour. Update the default-route comment to Royal Mataram Walk.

- [ ] **Step 5: Synchronize the route copy in all dictionaries.**

  Replace all visitor-facing loop/return language in `KotagedeGuidePage`: select a walking route, route itinerary, start point, three route titles/descriptions, and Salim's start-only description. Remove `roundTrip`; add `routeStartEnd` and `finish` with ICU placeholders matching the Task 2 interface. Use the approved English, Indonesian, and Dutch names exactly; route descriptions must explain the final destination and the intact Royal complex without promising return travel.

- [ ] **Step 6: Update the guide's structured data.**

  In `page.tsx`, change the three `TouristTrip` itinerary entries to the approved route names and their current one-way, ordered stop descriptions. Remove every `Loop` name; do not add a fourth Stage 2 trip.

- [ ] **Step 7: Run the route-experience and responsive-localization tests to verify they pass.**

  Run: `yarn test:e2e tests/kotagede-guide.spec.ts --grep "Kotagede walking loop experience|Kotagede guide responsive layout"`

  Expected: PASS; the shared Royal complex remains consecutive, all cards render localized start/finish guidance without clipping, and the changed route geometry still fits the map.

- [ ] **Step 8: Commit the UI, localization, schema, and regression tests.**

  ```bash
  git add 'app/[locale]/(main)/kotagede-guide/kotagede-guide-client.tsx' 'app/[locale]/(main)/kotagede-guide/page.tsx' components/features/walking-tour/trail-switcher.tsx dictionaries/en.json dictionaries/id.json dictionaries/nl.json tests/kotagede-guide.spec.ts
  git commit -m "feat: add Salim-led Kotagede routes"
  ```

### Task 3: Align provenance documentation and verify the release

**Files:**

- Modify: `docs/kotagede-guide-destination-verification.md:1-50`
- Modify: `docs/superpowers/specs/2026-10-24-kotagede-royal-archaeology-extension-design.md:1-112`
- Modify: `docs/superpowers/specs/2026-10-24-kotagede-salim-led-routes-design.md`
- Create: `docs/superpowers/plans/2026-10-24-kotagede-salim-led-routes.md`

**Interfaces:**

- Consumes: the route IDs and one-way endpoint model from Task 1 and the approved route composition from the spec.
- Produces: documentation that describes three Salim-led routes, keeps Stage 2 as a gate for additions to Kotagede Heritage Walk, and preserves the no-unlicensed-photography rule.

- [ ] **Step 1: Update the verification record's route claims.**

  Replace “walking loops,” “starting and return point,” “closed,” and “round trip” statements with the three one-way Salim-led routes and their 30-metre vertex rule. Record that the Royal complex remains contiguous, that Kotagede Heritage replaces Merchant as the longer route, and that Stage 2 candidates only extend Kotagede Heritage after all existing gate checks pass.

- [ ] **Step 2: Correct the Stage 2 design's stale fourth-route and closed-geometry language.**

  Change its rejected/chosen alternatives and verification bullets so the document consistently says verified archaeology stops extend Kotagede Heritage Walk, never create a fourth group, and use one-way geometry. Retain its hard field-access and photography-licence gates.

- [ ] **Step 3: Run documentation consistency checks.**

  Run:

  ```bash
  git diff --check
  rg -n -i 'round trip|walking loop|return to Salim|merchant.*loop' \
    'app/[locale]/(main)/kotagede-guide' components/features/walking-tour \
    dictionaries/en.json dictionaries/id.json dictionaries/nl.json \
    docs/kotagede-guide-destination-verification.md
  ```

  Expected: `git diff --check` is silent; the search finds no stale visitor-facing claim in the scoped guide, dictionaries, or verification record.

- [ ] **Step 4: Run final verification.**

  Run:

  ```bash
  yarn lint
  yarn build
  yarn test:e2e tests/kotagede-guide.spec.ts
  ```

  Expected: lint has no errors, the production build includes `/[locale]/kotagede-guide`, and all Kotagede Playwright projects pass.

- [ ] **Step 5: Commit the documentation and implementation plan.**

  ```bash
  git add docs/kotagede-guide-destination-verification.md \
    docs/superpowers/specs/2026-10-24-kotagede-royal-archaeology-extension-design.md \
    docs/superpowers/specs/2026-10-24-kotagede-salim-led-routes-design.md \
    docs/superpowers/plans/2026-10-24-kotagede-salim-led-routes.md
  git commit -m "docs: define Salim-led Kotagede routes"
  ```
