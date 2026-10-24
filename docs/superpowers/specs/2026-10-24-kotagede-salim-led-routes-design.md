# Kotagede Salim-Led Routes Design

## Intent

Reframe the Kotagede guide as a visitor companion for people beginning at
Salim Silver. Every route starts at Salim and leads through a purposeful,
walkable sequence to a useful final destination; a route is not required to
return to Salim.

This better reflects how visitors actually explore Kotagede: they may continue
to a market, museum, food stop, or another part of the heritage area rather
than retrace the same path to the workshop.

## Route groups and names

The guide has exactly three visitor-facing groups, all expressed as walking
routes:

| Group    | English                | Indonesian               | Dutch                         | Purpose                                                                                            |
| -------- | ---------------------- | ------------------------ | ----------------------------- | -------------------------------------------------------------------------------------------------- |
| Royal    | Royal Mataram Walk     | Jelajah Kerajaan Mataram | Koninklijke Mataram-wandeling | A focused introduction to the royal Mataram landscape.                                             |
| Kotagede | Kotagede Heritage Walk | Jelajah Warisan Kotagede | Kotagede-erfgoedwandeling     | The longer heritage route: an extended Royal route that also includes the merchant heritage stops. |
| Culinary | Kotagede Food Walk     | Jelajah Kuliner Kotagede | Kotagede-culinaire wandeling  | A food-led walk through market and snack stops.                                                    |

There is no separate Merchant route and no fourth archaeology group.

## Goals

- Every published route starts at Salim Silver.
- Every route ends at a meaningful, visitor-facing destination with a clear
  independent next step: continue exploring, eat, visit a public institution,
  or use the existing map link to navigate onward.
- Each itinerary is ordered from the closest verified stop to Salim through to
  the farthest, except where completing a contiguous managed cultural complex
  requires one connected outside stop to follow it. The last stop is the route
  finish.
- Route geometry, distance, and walking time describe only the recommended
  outward walk; no artificial return leg is included.
- The itinerary, map, route card, and all three locales clearly say where a
  route starts and finishes.
- Stage 2 follows the same model, but continues to honour its admission gate.

## Non-goals

- No promise of opening hours, admission, transport, or a return journey.
- No turn-by-turn navigation or live routing service.
- No change to a destination's access treatment, photography-rights gate, or
  cultural-respect guidance.

## Route model

Keep the existing data structure but replace its closed-loop assumption:

- `stopIds[0]` is always `salim-silver`.
- Add `endStopId`, which must equal the last stop in `stopIds`.
- After Salim, sort stops by their verified walking distance from Salim in
  ascending order. If two stops are substantively tied, use their verified
  pedestrian connectivity to choose the order and document that choice.
- Treat destinations in the same managed cultural complex as one contiguous
  itinerary unit. Do not insert an outside stop between them even when its
  Salim-origin distance would otherwise place it there; the first connected
  outside stop may therefore follow the complex as the route finish.
- Remove `returnsToStart`; a route geometry ends at `endStopId` instead of
  adding a final segment back to Salim.
- Derive distance and walking time from this one-way geometry at the existing
  75 metres-per-minute convention.
- Display: **Starts at Salim Silver · Ends at {destination}**. Do not display
  “round trip” or imply that the listed distance includes a return.

## Proposed Stage 1 directions

The exact geometry is re-authored and tested before publishing, but the
recommended destination order is chosen so the finish serves the visitor:

| Route                  | Start        | Proposed sequence after Salim                                                                                                                                                                                              | Finish rationale                                                                                                                                                                        |
| ---------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Royal Mataram Walk     | Salim Silver | Pasar Legi (260 m) → **Royal Mataram complex:** Masjid Gedhe Mataram (470 m) → Makam Raja (540 m) → Sendang Seliran (550 m) → Between Two Gates (530 m)                                                                    | Masjid, Makam, and Sendang remain together as one managed complex. Between Two Gates follows it as the next connected heritage destination, even though it is slightly closer to Salim. |
| Kotagede Heritage Walk | Salim Silver | Pasar Legi (260 m) → **Royal Mataram complex:** Masjid Gedhe Mataram (470 m) → Makam Raja (540 m) → Sendang Seliran (550 m) → Between Two Gates (530 m) → Omah UGM (740 m) → Gang Soka (820 m) → Museum Kotagede (1,090 m) | This longer route keeps the Royal complex together, then adds the merchant-heritage stops and finishes at the farthest, visitor-facing museum. Current hours still need checking.       |
| Kotagede Food Walk     | Salim Silver | Kembang Waru → Pasar Legi → Kipo Bu Djito                                                                                                                                                                                  | Kipo Bu Djito is an intentional food finish; stock and trading hours remain variable.                                                                                                   |

The Stage 1 distances above are the existing verified Salim-origin figures;
they are rechecked against the replacement pedestrian geometry during
implementation. The Royal Mataram complex—Masjid Gedhe, Makam Raja, and
Sendang Seliran—is deliberately kept together, which is the documented
exception to the distance ordering. The change replaces the Merchant route
with the longer Kotagede Heritage Walk and does not add or remove any Stage 1
destination. Shared destinations are intentional: the focused Royal Walk is
the shorter option, while Kotagede Heritage Walk is its longer, broader
version.

## Royal Archaeology Extension

After it passes the existing Stage 2 gate, Watu Gilang and the verified Cepuri
stops may extend Kotagede Heritage Walk. They do not create a fourth group.
The field check must place any new stop in ascending verified distance from
Salim (without splitting an established complex), prove a safe, coherent
outward order, and confirm the resulting final stop is an appropriate
visitor-facing finish—potentially the verified Cepuri/Bokong Semar endpoint;
otherwise the stops remain unpublished.

Watu Gilang, Cepuri, and Bokong Semar remain out of every live route until
exact visitor-facing coordinates, access treatment, and outward walking
geometry are field-verified.

## UI and content changes

- Rename visitor-facing “walking loop” language to “walking route” or the
  localized equivalent throughout the guide, banner, cards, and metadata.
- Replace Merchant Heritage with Kotagede Heritage Walk everywhere: data ID,
  translations, route selection, tests, and metadata.
- Change the route card’s final metadata row from a round-trip status to the
  localized start and finish pair.
- Make the final itinerary item visibly the route finish and retain every POI
  card's existing map link for onward navigation.
- Keep current map selection, category filtering, responsive sheet behaviour,
  and neutral photography fallback unchanged unless the endpoint data requires
  an additional verified POI.
- Synchronize English, Indonesian, and Dutch descriptions, route labels, and
  endpoint names.

## Data and verification changes

- Re-author the three Stage 1 route coordinate arrays without their Salim
  return legs. Each array begins near Salim, follows the ascending
  Salim-distance itinerary, and ends within 30 metres of the route's
  `endStopId`.
- Update the Stage 1 membership assertions: Kotagede Heritage Walk includes
  every verified Royal and former Merchant stop once, while Royal Mataram Walk
  remains the shorter focused subset.
- Update unit/data coverage to assert Salim is first, `endStopId` is last,
  geometry is not artificially closed, and every stop remains within 30
  metres of a route vertex.
- Update Playwright coverage to assert the start/finish language, the revised
  itinerary order in each locale, one-way distance/time metadata, and no
  “round trip” copy.
- Run `yarn lint`, `yarn build`, and the Kotagede guide Playwright suite.

## Approaches considered

1. **Keep round trips.** Rejected: it asks visitors to retrace their route and
   misrepresents the guide's purpose.
2. **Keep separate Royal and Merchant groups.** Rejected: it obscures the
   longer, fuller Kotagede heritage experience that visitors want.
3. **Start at Salim and order each route from closest to farthest, while
   keeping the Royal Mataram complex intact, with a focused Royal route and an
   extended Kotagede Heritage route.** Chosen: it gives every visitor an
   easy-to-follow outward progression without splitting an important managed
   heritage complex.
