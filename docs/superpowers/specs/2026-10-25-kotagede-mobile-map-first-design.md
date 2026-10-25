# Kotagede Mobile Map First Design

## Intent

Make the Kotagede guide useful the moment a visitor opens it on a phone at Salim Silver. The first decision is which of the three existing walks to take. After that decision, the map should remain the main surface while route stops and place information stay one tap away.

## Current State and Reason for Change

At a 390 × 844 viewport, the map begins about 355px down the page. The selected Salim Silver card covers 316px of the 512px map. The walk picker starts around 948px and the stop list around 1,273px. The existing responsive work prevents horizontal overflow and puts place details next to the map, but the route decision and navigation remain below the first screen.

The page currently defaults to the Royal Mataram Walk and Salim Silver. Keep that desktop presentation. On mobile, the Royal walk may remain visible as a preview behind the opening walk picker, but the visitor must see all three choices before the picker collapses.

## Goals

- At widths below `lg` (1024px), show a viewport-sized map immediately beneath the fixed site header, with the walk picker open on first visit.
- Let visitors choose any of the three existing walks or choose **Explore all places** without scrolling the document.
- Once a walk is chosen, leave most of the map visible and keep its route name, stops, place details, and route picker accessible from the map view.
- Preserve all existing destination descriptions, photos, visitor tips, cultural guidance, category filtering, and Google Maps links in the mobile interface.
- Keep the selected marker and route legible as the mobile panel changes size; keep the guide usable if map tiles fail.
- Keep the current `lg` and wider layout, default Royal route, and Salim Silver side card.

## Non-goals

- No turn-by-turn navigation, live progress tracking, offline tile download, new destinations, route geometry edits, or map-provider change.
- No new general-purpose drawer library or browser Fullscreen API dependency for the mobile layout.
- No changes to the main site header or other routes.

## Constraints

- Use the existing Next.js 16, React 19, TypeScript, Tailwind CSS v4, MapLibre GL, next-intl, and lucide-react stack.
- Keep English, Indonesian, and Dutch UI copy synchronized.
- Work from 320px-wide phones and short viewports through tablet; account for the fixed header and safe-area inset.
- The mobile interface must work with touch and keyboard. Its panel opens through explicit labeled buttons; no drag gesture is required.
- Keep map location permission opt-in. Choosing a walk must not prompt for GPS access.

## Approaches Considered

1. **Compact the current scrolling page.** Lower effort, but walk selection and stop information remain physically separated from the map.
2. **Fill the mobile viewport with a map and put all controls and text on it at once.** Immediate map access, but controls and the existing large place card obscure the map on small phones.
3. **Use a viewport-sized map with a compact, expandable information panel.** The opening panel asks the visitor to choose a walk; later it shows only a short summary until the visitor requests stops or details. This is the selected approach because it combines a clear first decision with room to read the map.

## Mobile Screen and Interaction

### Opening screen

- The site header stays visible. The page title and introduction remain in the document for accessibility and search, but mobile presents only a compact guide title above or within the map surface.
- The map fills the remaining visible screen using dynamic viewport height. It previews the current Royal route and Salim starting point without treating that preview as a completed choice.
- An open bottom panel titled **Choose a walking route** presents three compact route rows. Each row shows the localized route name, walking time, place count, and finish point. A separate **Explore all places** action is equally reachable.
- The initial panel may scroll internally on short phones but must leave a useful portion of the map visible. The document itself should not need to scroll to make a choice.

### After choosing a walk

- The selected route is drawn and fitted in the unobscured part of the map. The panel collapses to a short route summary with its name and a **View stops** action. The summary identifies the first stop after Salim Silver, not a live navigation instruction.
- **View stops** expands the panel into the ordered itinerary. Tapping a stop centers its pin and shows a compact place preview. A **Details** action expands the full photo, description, visitor tip, and Google Maps link.
- A visible **Walks** control reopens the route picker. Choosing the already active walk confirms it and returns to the map; it does not silently clear the walk.
- Closing full place details returns to the compact place preview or route summary. The current walk remains selected until the visitor explicitly switches walks or chooses **Explore all places**.

### Exploring places

- **Explore all places** clears the active route, shows all existing place pins, and leaves a small Salim Silver preview at the bottom.
- Tapping a pin updates the compact preview; **Details** expands the complete place card. A **Places** control opens category filters and the existing place list. Selecting a list item centers that place and opens its preview.
- The **Walks** control remains visible so an explorer can start a guided route later.
- The existing general cultural guidance remains reachable from the route or places panel. Place-specific visitor tips remain in full place details.

### Map and panel behavior

- Use a CSS viewport-sized mobile layout rather than making visitors enter browser fullscreen. Keep the site header available and hide the redundant mobile fullscreen button; retain the existing desktop fullscreen behavior.
- The bottom panel has two explicit sizes: compact preview/summary and expanded content. Expanded content scrolls within the panel and does not trap focus or block map interaction outside its bounds.
- Reset and opt-in location controls stay reachable above the panel and clear of the site header. Map camera padding responds to the actual visible panel height, not a fixed guessed offset.
- If the basemap style or tiles cannot load, show a clear map-unavailable message and retry action. Walk choices, stop lists, place descriptions, and external Google Maps links remain usable without the map.

## Desktop and Tablet Boundary

At `lg` and wider, retain the current header, introduction, category row, map height, trail cards, itinerary, cultural note, Royal default, and right-column place card. The map-first layout applies below `lg`, matching the breakpoint already used for the mobile place sheet. At the boundary, only one visible place-detail surface and one operable set of mobile/desktop controls may appear.

## Success Criteria

- At 320 × 568 and 390 × 844, a visitor can choose a walk or explore all places without document scrolling; no document-level horizontal overflow occurs.
- The initial picker makes all three walks and the explore action reachable within the panel, without document scrolling. After choosing, the compact panel leaves substantially more map visible than the current 62%-height place card.
- Selecting a route, marker, or stop keeps its relevant pin and route visible outside the panel and below the site header.
- Full details, tips, cultural guidance, categories, and external map links remain reachable on mobile in all three locales.
- A failed basemap does not prevent visitors from reading walks and places.
- At 1024px and wider, the current desktop arrangement and Royal/Salim defaults remain intact.

## Decisions Left to the Builder

- Choose the smallest component split that keeps the mobile panel states understandable; reuse existing data and cards.
- Choose exact compact-panel height and visual styling after checking 320 × 568, 390 × 844, and 768 × 900 layouts.
- Choose whether route and place panel changes animate, provided reduced-motion users get immediate transitions.
