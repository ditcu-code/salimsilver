# Kotagede Walking Loop Groups Design

## Intent

Make the Kotagede guide dependable as an on-foot companion by giving each
loop a distinct visitor purpose, preserving exact walking order, separating
walking time from visit time, and hiding destinations whose location or access
has not been verified.

## Stage 1

- Royal Mataram Core: Salim Silver, Pasar Legi, Masjid Gedhe, Makam Raja,
  Sendang Seliran, Between Two Gates.
- Merchant Houses & Heritage Alleys: Salim Silver, Museum Kotagede, Omah UGM,
  Gang Soka.
- Markets & Traditional Snacks: Salim Silver, Kembang Waru, Pasar Legi,
  Kipo Bu Djito.
- Benteng Cepuri remains available through All Highlights and the heritage
  filter, but belongs to no Stage 1 loop.
- Yangko Pak Prapto is hidden until its storefront and route are verified.
- Omah UGM uses the official coordinate `110.39633445816,
-7.8291468025372`; Between Two Gates is identified with Gang Rukunan,
  Kampung Alun-alun.
- Trail geometry is the source of truth for distance and walking time. Walking
  time is distance divided by 75 metres per minute, rounded up to five minutes.
- Recommended experience ranges are 75–120 minutes for Royal, 90–150 for
  Merchant, and 60–90 for Culinary.
- Route cards show their descriptions, unique place count, and round-trip
  status. Returning to Salim does not create a duplicate itinerary row.
- Every authored visitor tip is visible. Unverified or unrelated destination
  photographs are replaced by neutral category artwork.

## Stage 2 Gate

Watu Gilang and Benteng Cepuri may form an optional Royal Archaeology
Extension. Rumah Pesik and Ngudi Roso are candidates for Merchant and Culinary
respectively, but are added only after exact location, current public access,
and route fit are verified. Destination photography must be owned or licensed.

## Non-goals

No turn-by-turn navigation, live opening-hours integration, booking flow,
database change, or new dependency is included.
