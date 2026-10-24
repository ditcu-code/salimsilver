# Kotagede Map Visibility and Card Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep selected markers and controls outside fixed-header/details-sheet occlusion and render complete localized loop descriptions.

**Architecture:** Calculate selected-place camera offset from the top header and bottom sheet as a single usable viewport, and prevent route-fit padding from leaking into subsequent moves. Keep controls below the header on sub-desktop maps and let existing route cards grow to their localized content.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, MapLibre GL, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-24-kotagede-map-visibility-card-copy-design.md`

## Global Constraints

- Work directly in the current `main` checkout as already authorized; do not create a commit.
- Do not change route geometry, destination membership, sheet height, or localized copy.
- Add no dependency.
- Use browser-observable RED→GREEN tests.

## Review Focus

- A selected marker must remain visible after the map is scrolled beneath the fixed header.
- Camera route padding must not alter later `flyTo` placement.
- Controls must not collide with either the header or bottom sheet at phone/tablet widths.
- Longer Dutch descriptions must not clip.
- Desktop map controls and route cards must remain visually balanced.

---

### Task 1: Header-aware map camera and controls

**Files:**

- Modify: `components/features/walking-tour/kotagede-map-inner.tsx`
- Modify: `tests/kotagede-guide.spec.ts`

**Interfaces:**

- Consumes: fixed page header geometry and `getMapOverlayOcclusion()`.
- Produces: selected-marker placement inside the unobscured map region and controls below the header.

- [x] Add failing Playwright assertions that the selected marker has eight-pixel clearance below the header and above the sheet after scrolling.
- [x] Add a failing Playwright test that reset and locate controls remain fully below the fixed header.
- [x] Run the focused tablet tests and confirm both failures describe the measured overlaps.
- [x] Add header-aware camera offset, non-retained fit padding, and sub-desktop horizontal control placement.
- [x] Re-run the focused tests across Chromium, Firefox, and WebKit.

### Task 2: Complete route-card descriptions

**Files:**

- Modify: `components/features/walking-tour/trail-switcher.tsx`
- Modify: `tests/kotagede-guide.spec.ts`

**Interfaces:**

- Produces: unclipped route descriptions in English, Indonesian, and Dutch.

- [x] Add a failing browser test comparing each description's scroll and client heights in all locales.
- [x] Run the test and confirm the existing line clamp makes it fail.
- [x] Remove the description clamp while preserving the three-card layout.
- [x] Re-run the localized test, visual QA captures, lint, build, and the full Kotagede guide suite.
