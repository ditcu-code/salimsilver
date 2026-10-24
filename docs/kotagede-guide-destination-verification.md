# Kotagede Guide Destination Verification

Last checked: 2026-10-24

This record defines the evidence and visitor-access assumptions used by the
Stage 1 walking loops. Coordinates are stored as longitude, latitude. A place
being listed here does not imply unrestricted entry: homes, places of worship,
cemeteries, and residential lanes remain subject to signs, ceremonies, and
instructions from residents or attendants.

## Published destinations

| Destination                     | App coordinates                     | Placement evidence                                                                                                                                                                                                                                                                    | Visitor-access treatment                                                                                          |
| ------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Salim Silver                    | `110.4019932, -7.8273171`           | Salim Silver business listing and the route link maintained by the workshop                                                                                                                                                                                                           | Workshop/business; starting and return point for guests                                                           |
| Kembang Waru                    | `110.4025, -7.82885`                | Public vendor map listing; the regional tourism office identifies Kembang Waru as a Kotagede specialty in [Makanan Khas Kotagede](https://visitingjogja.jogjaprov.go.id/42323/makanan-khas-kotagede-yang-wajib-dicoba/)                                                               | Retail food stop; availability is not guaranteed and no opening hours are asserted                                |
| Pasar Legi Kotagede             | `110.3998, -7.82825`                | Public market map listing and the provincial registry's [Kotagede cultural-heritage area](https://jogjacagar.jogjaprov.go.id/detail/915/kawasan-cagar-budaya-kotagede)                                                                                                                | Public market; use normal market entrances and expect the liveliest trade in the morning                          |
| Kipo Bu Djito                   | `110.39765, -7.82685`               | Public vendor map listing; vendor and food tradition described by [RRI](https://rri.co.id/en/culinary/1321496/kipo-bu-djito-preserving-a-16th-century-kotagede-treat)                                                                                                                 | Retail food stop; daily stock and trading hours can vary                                                          |
| Masjid Gedhe Mataram            | `110.39821, -7.82937`               | Yogyakarta cultural office profile of [Masjid Gede Mataram](https://budaya.jogjaprov.go.id/berita/detail/1388-masjid-gede-mataram-kotagede-saksi-persebaran-agama-islam-di-yogyakarta)                                                                                                | Active place of worship; modest dress, prayer activity, and attendant guidance take priority                      |
| Makam Raja-Raja Mataram         | `110.39768, -7.82937`               | Yogyakarta cultural office profile of the [royal cemetery complex](https://budaya.jogjaprov.go.id/berita/detail/1395-kompleks-makam-raja-raja-mataram-islam-destinasi-wisata-religi-di-kotagede)                                                                                      | Managed sacred site; inner areas have dress, schedule, and conduct requirements                                   |
| Sendang Seliran                 | `110.3977, -7.82985`                | Yogyakarta cultural office account of [Sendang Seliran](https://budaya.jogjaprov.go.id/berita/detail/1583-mengenal-lebih-dekat-tradisi-nawu-sendang-seliran-tradisi-peninggalan-kerajaan-mataram-islam-di-kotagede)                                                                   | Managed part of the royal complex; follow on-site separation and access rules                                     |
| Between Two Gates               | `110.39908, -7.83094`               | Kotagede district description of [Between Two Gates](https://kotagedekec.jogjakota.go.id/detail/index/8362) and the provincial heritage record for [Gang Rukunan](https://jogjacagar.jogjaprov.go.id/detail/4970/displayrecords-i-nama-warisan)                                       | Shared residential passage in Kampung Alun-alun; quiet pedestrian passage only, with residents' privacy respected |
| Benteng Cepuri and Bokong Semar | `110.40002, -7.83345`               | Provincial heritage record for [Benteng Cepuri](https://jogjacagar.jogjaprov.go.id/detail/3954/displayrecords-i-nama-warisan)                                                                                                                                                         | Exterior heritage remains visible under All Highlights; excluded from Stage 1 loops                               |
| Omah UGM                        | `110.39633445816, -7.8291468025372` | Coordinate and identity from the provincial record for [Rumah Tradisional Milik UGM](https://jogjacagar.jogjaprov.go.id/detail/782/rumah-tradisional-milikugm), with conservation context from [UGM](https://ugm.ac.id/id/berita/22154-pesona-bangunan-tradisional-jawa-di-omah-ugm/) | Heritage house; the route may reach its public-facing exterior, but entry must be confirmed on site               |
| Gang Soka                       | `110.39628, -7.82952`               | Jagalan village coverage of the [heritage-village route and cultural attractions](https://jagalan.bantulkab.go.id/first/artikel/421) plus the public lane map listing                                                                                                                 | Active residential lane; remain on the shared passage and ask before photographing homes                          |
| Museum Kotagede                 | `110.39217, -7.82634`               | Yogyakarta cultural office profile of [Living Museum Kotagede](https://budaya.jogjaprov.go.id/berita/detail/1874-living-museum-kotagede-menjelajahi-sejarah-dan-inovasi-yogyakarta) and its [museum directory entry](https://wkmdisbuddiy.jogjaprov.go.id/museum/index?id=44)         | Public museum when open; visitors should confirm current hours and holiday closures before departure              |

The Merchant and Culinary path geometries were pedestrian-routed against
OpenStreetMap/Valhalla and checked to pass every listed stop before returning
to Salim Silver. The Royal path uses the existing mapped pedestrian geometry.
Every loop is closed, and the automated data test requires every stop to be
within 30 metres of a route vertex.

## Stage 2 admission gate

Candidates remain out of the published loops until all three checks pass:
exact location, current visitor access, and a safe pedestrian route that fits
the loop's purpose.

| Candidate         | Evidence already available                                                                                                | Still required before admission                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Watu Gilang       | Identity and heritage record: [Watu Gilang Kotagede](https://jogjacagar.jogjaprov.go.id/detail/4376/watu-gilang-kotagede) | Field-check the entrance, current access, and Royal extension route                             |
| Benteng Cepuri    | Identity and location are recorded above                                                                                  | Validate the proposed Royal Archaeology Extension as a coherent, comfortable round trip         |
| Rumah Pesik       | Heritage identity is known                                                                                                | Confirm the exact visitor-facing point, whether public entry is allowed, and Merchant route fit |
| Ngudi Roso        | Culinary business name is known                                                                                           | Confirm the currently operating storefront, coordinates, trading access, and Culinary route fit |
| Yangko Pak Prapto | Published references point to a shop on Jalan Pramuka rather than the former loop point                                   | Field-check the current storefront and build a route that does not mislead walkers              |

Destination photography has a separate gate: use only an image owned by Salim
Silver or covered by a documented license. Until then, the interface uses the
neutral destination fallback.
