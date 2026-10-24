# Kotagede Royal Archaeology Extension Design

## Intent

Prepare the first Stage 2 addition to Kotagede Heritage Walk: a verified
archaeology segment centred on Watu Gilang and the surviving Cepuri
fortification landscape, including Bokong Semar where the verified walking
route permits it. The extension gives visitors who want more of the former
Mataram royal centre a deliberately archaeological route without diluting the
focused Royal Mataram Walk.

The goal is a trustworthy on-foot experience. It must not publish an assumed
entrance, invite visitors into restricted or residential space, or imply that
unlicensed photographs represent a destination.

## What we know

- The DIY heritage registry records [Watu Gilang](https://jogjacagar.jogjaprov.go.id/detail/4376/watu-gilang-kotagede)
  as a protected heritage object in a small protective structure within a
  residential setting; it notes that the location is crossed by a public road.
- The [Kotagede heritage-area record](https://jogjacagar.jogjaprov.go.id/detail/915/kawasan-cagar-budaya-kotagede)
  identifies the inner Cepuri, remaining fortification structures, and the
  southeast "Bokong Semar" corner as parts of the royal landscape.
- A cultural-office heritage exploration used the sequence Museum Kotagede →
  mosque and tomb complex → Cepuri (Tembok Jebol) → Cungkup Watu Gilang →
  Bokong Semar, which supports the thematic relationship but is not a
  substitute for a visitor-safe route beginning at Salim Silver.

## Chosen approach

Publish the extension only after a verification-first reconnaissance phase.
When its gate is satisfied, its verified stops extend the longer Kotagede
Heritage Walk. It is not a fourth route group and is not automatically added
to the focused Royal Mataram Walk.

The eventual route starts at Salim Silver, includes Watu Gilang and one or
more verified, publicly viewable Cepuri stops, and finishes at a verified,
visitor-sensible archaeology endpoint with safe onward pedestrian access.
Existing Stage 1 membership stays unchanged; its route model and geometry are
separately revised by the Salim-led-routes design.

### Alternatives considered

1. **Add Watu Gilang immediately to Royal Mataram Walk.** Rejected: the present
   entrance, on-site access treatment, and full pedestrian route are still
   unverified.
2. **Create a separate fourth archaeology route.** Rejected: the guide has
   three visitor-facing route groups, and the longer Heritage walk is the
   right home for verified archaeology stops.
3. **Extend Kotagede Heritage Walk after verification.** Chosen: it preserves
   the shorter Royal walk while giving the longer walk more archaeological
   context when public access and pedestrian geometry are confirmed.

## Admission gate

All of these must be recorded in
`docs/kotagede-guide-destination-verification.md` before any new Stage 2 POI,
route, translation, or UI selection is published:

1. Exact coordinates for the visitor-facing point, captured from an on-site
   check and matched to the heritage record.
2. Current visitor treatment for every stop: public viewpoint or passage,
   permitted entrance, restricted area, etiquette, closures, and any need to
   ask an attendant or resident.
3. A safe, continuous pedestrian route that starts at Salim Silver, finishes
   at an appropriate onward destination, uses public/shared passage only, and
   places every displayed stop within 30 metres of a recorded route vertex.
4. A coherent one-way distance, geometry-derived walking time, and visitor
   experience range that do not overstate what can actually be seen.
5. A source and last-checked date for every factual or access claim.

Failure of any item keeps the candidate out of the guide. A conservative
visitor-facing description is preferred over a claim of admission or access
that the field check cannot substantiate.

## Published experience after admission

- Extend Kotagede Heritage Walk with the verified archaeology stops, updated
  geometry-derived distance and walking time, place count, and explicit
  start/finish labels.
- Preserve stop order in the itinerary and map selection just as the three
  live routes do today.
- Keep Royal Mataram Walk as the focused, shorter heritage choice.
- Use neutral category artwork for Watu Gilang and the Cepuri stops unless
  Salim Silver owns the image or its repository record contains a documented
  licence that covers web use.

## Data and UI boundaries

- Update the existing `heritage` route, its stop list, and all three locale
  dictionaries only after the gate is complete.
- Add high-precision walking geometry to `lib/data/kotagede-routes.ts`; the
  geometry, not a straight-line estimate, remains the source of distance and
  walking time.
- Keep each documented access restriction in the visitor tip that appears on
  the POI card. The card must retain its neutral fallback when no approved
  image is present.
- Do not add a map marker, all-highlights POI, or hidden route placeholder
  before a candidate passes the admission gate.

## Verification after implementation

- Data tests assert the exact extension stop order, outward geometry, route
  proximity for each stop, and geometry-derived duration.
- Playwright coverage asserts its localized title and copy, optional selection,
  itinerary order, neutral-image fallback, and no regression in the three
  Stage 1 routes.
- Run `yarn lint`, `yarn build`, and the Kotagede guide Playwright suite.

## Non-goals

- No turn-by-turn navigation, booking, or live opening-hours service.
- No speculative access claims, route geometry, or marker placement.
- No stock, search-engine, or AI-generated destination photographs presented
  as real places; photography remains a separate rights-verified workstream.
