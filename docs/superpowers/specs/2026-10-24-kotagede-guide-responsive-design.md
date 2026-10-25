# Responsive Kotagede Guide Design

## Intent

Make the existing Kotagede walking guide comfortable to use on a phone while someone is actively walking around the neighborhood. A map-pin selection must produce immediate, readable feedback without forcing the visitor to scroll past the rest of the guide.

## Goals

- Keep the map, category filters, trail picker, selected-place details, itinerary, and cultural note usable from 320px wide through desktop.
- Present the selected place as a dismissible bottom sheet attached to the map on small screens and preserve the existing side card at `lg` and above.
- Keep touch targets at least 44px where practical, avoid page-level horizontal overflow, and retain clear focus states.
- Use shorter mobile map height and compact controls while preserving the richer desktop layout.
- Cover the responsive structure and POI interaction with Playwright.

## Non-goals

- No changes to POI/trail data, map provider, route geometry, translations, or desktop information architecture.
- No new UI dependency and no generalized drawer/dialog abstraction.

## Constraints

- Continue using Next.js 16, React 19, TypeScript, Tailwind CSS v4, MapLibre GL, next-intl, and lucide-react.
- Preserve all unrelated work already present in the dirty worktree.
- The bottom sheet is in-flow within the map frame rather than a modal, so map panning and page scrolling remain available.

## Approaches

1. Keep every section stacked below the map. This is simplest, but a tapped marker and its response are separated by a long scroll.
2. Use a full modal drawer. This gives strong focus but blocks too much of the map and requires dialog/focus-management behavior for a small detail view.
3. Use a compact in-map bottom sheet on mobile and the current sidebar card on desktop. This keeps selection feedback adjacent to the map, preserves context, and needs no new dependency. This is the selected approach.

## Interaction and Layout

- Mobile order is header, categories, map with selected-place bottom sheet, trails, itinerary, then cultural guidance.
- The mobile map uses a viewport-sensitive height with sensible minimum/maximum bounds; tablet and desktop heights step up.
- Category and trail choices scroll horizontally on phones rather than forcing narrow multi-line cards.
- Map controls become 44px touch targets, tighten their offsets on phones, expose accessible labels, and hide the fullscreen action when the browser lacks that API.
- Closing the mobile sheet leaves the map visible. Selecting a marker or itinerary item reopens the corresponding sheet.
- At `lg`, the bottom sheet is hidden and the selected-place card returns to the right column unchanged in purpose.

## Success Criteria

- At 320px and 390px widths, the route has no document-level horizontal overflow.
- At phone widths, the selected place is visibly overlaid at the bottom of the map and can be closed and reopened by choosing an itinerary item.
- At desktop width, the guide remains a map-plus-sidebar layout and does not render the mobile sheet.
- Lint, focused Playwright coverage, and a production build pass.
