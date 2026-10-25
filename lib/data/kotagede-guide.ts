import {
  ROYAL_ROUTE_COORDINATES,
  KOTAGEDE_HERITAGE_ROUTE_COORDINATES,
  CULINARY_ROUTE_COORDINATES
} from "./kotagede-routes"

export type POICategory = "heritage" | "architecture" | "culinary" | "craft"

export interface POI {
  id: string
  nameKey: string
  category: POICategory
  coordinates: [number, number] // [lng, lat]
  walkingMinutesFromSalim: number
  distanceMeters: number
  imageUrl?: string
  googleMapsUrl: string
  bestTime?: string
  complexId?: "royal-complex"
}

export interface WalkingTrail {
  id: "royal" | "heritage" | "culinary"
  nameKey: string
  descriptionKey: string
  experienceMinutes: readonly [minimum: number, maximum: number]
  endStopId: string
  stopIds: string[]
  color: string
  routeGeoJson: GeoJSON.Feature<GeoJSON.LineString>
}

// Salim Silver exact coordinates: Kebohan, Purbayan, Kotagede
export const SALIM_SILVER_LOCATION: [number, number] = [110.4019932, -7.8273171]

export const KOTAGEDE_POIS: POI[] = [
  {
    id: "salim-silver",
    nameKey: "salimSilver",
    category: "craft",
    coordinates: [110.4019932, -7.8273171],
    walkingMinutesFromSalim: 0,
    distanceMeters: 0,
    imageUrl: "/images/kotagede-guide/salim-silver.webp",
    googleMapsUrl:
      "https://maps.google.com/maps/dir//Salim+Silver+Kebohan+KG+3%2F547+Purbayan+Kotagede,+Yogyakarta+City,+Special+Region+of+Yogyakarta+55173/@-7.8272881,110.4018794,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x2e7a571440134b63:0x5c7989d8a5177cca"
  },
  {
    id: "kembang-waru",
    nameKey: "kembangWaru",
    category: "culinary",
    coordinates: [110.403575, -7.825695],
    walkingMinutesFromSalim: 5,
    distanceMeters: 320,
    imageUrl: "/images/kotagede-guide/kembang-waru.webp",
    googleMapsUrl:
      "https://maps.google.com/?q=Roti+Kembang+Waru+Pak+Bas+Kotagede"
  },
  {
    id: "pasar-legi",
    nameKey: "pasarLegi",
    category: "culinary",
    coordinates: [110.3998, -7.82825],
    walkingMinutesFromSalim: 3,
    distanceMeters: 260,
    imageUrl: "/images/kotagede-guide/pasar-legi.webp",
    googleMapsUrl: "https://maps.google.com/?q=Pasar+Kotagede+Yogyakarta"
  },
  {
    id: "kipo-bu-djito",
    nameKey: "kipoBuDjito",
    category: "culinary",
    coordinates: [110.396366, -7.827329],
    walkingMinutesFromSalim: 8,
    distanceMeters: 650,
    imageUrl: "/images/kotagede-guide/kipo-bu-djito.webp",
    googleMapsUrl: "https://maps.google.com/?q=Kipo+Bu+Djito+Kotagede"
  },
  {
    id: "masjid-gedhe-mataram",
    nameKey: "masjidGedhe",
    category: "heritage",
    coordinates: [110.39821, -7.82937],
    walkingMinutesFromSalim: 6,
    distanceMeters: 470,
    imageUrl: "/images/kotagede-guide/masjid-gedhe-mataram.webp",
    googleMapsUrl:
      "https://maps.google.com/?q=Masjid+Gedhe+Mataram+Kotagede+Yogyakarta",
    complexId: "royal-complex"
  },
  {
    id: "makam-raja",
    nameKey: "makamRaja",
    category: "heritage",
    coordinates: [110.39768, -7.82937],
    walkingMinutesFromSalim: 7,
    distanceMeters: 540,
    imageUrl: "/images/kotagede-guide/makam-raja.webp",
    googleMapsUrl:
      "https://maps.google.com/?q=Makam+Raja-Raja+Mataram+Kotagede",
    complexId: "royal-complex"
  },
  {
    id: "sendang-seliran",
    nameKey: "sendangSeliran",
    category: "heritage",
    coordinates: [110.3977, -7.82985],
    walkingMinutesFromSalim: 7,
    distanceMeters: 550,
    imageUrl: "/images/kotagede-guide/sendang-seliran.webp",
    googleMapsUrl: "https://maps.google.com/?q=Sendang+Seliran+Kotagede",
    complexId: "royal-complex"
  },
  {
    id: "between-two-gates",
    nameKey: "betweenTwoGates",
    category: "heritage",
    coordinates: [110.39908, -7.83094],
    walkingMinutesFromSalim: 7,
    distanceMeters: 530,
    imageUrl: "/images/kotagede-guide/between-two-gates.webp",
    googleMapsUrl: "https://maps.google.com/?q=Between+Two+Gates+Kotagede"
  },
  {
    id: "watu-gilang",
    nameKey: "watuGilang",
    category: "heritage",
    coordinates: [110.399156, -7.832129],
    walkingMinutesFromSalim: 9,
    distanceMeters: 700,
    imageUrl: "/images/kotagede-guide/watu-gilang.webp",
    googleMapsUrl:
      "https://maps.google.com/?q=Situs+Watu+Gilang+%26+Watu+Gatheng+Kotagede"
  },
  {
    id: "benteng-cepuri",
    nameKey: "bentengCepuri",
    category: "heritage",
    coordinates: [110.40002, -7.83345],
    walkingMinutesFromSalim: 10,
    distanceMeters: 720,
    imageUrl: "/images/kotagede-guide/benteng-cepuri.webp",
    googleMapsUrl:
      "https://maps.google.com/?q=Situs+Benteng+Cepuri+Bokong+Semar+Kotagede"
  },
  {
    id: "omah-ugm",
    nameKey: "omahUgm",
    category: "architecture",
    coordinates: [110.39633445816, -7.8291468025372],
    walkingMinutesFromSalim: 10,
    distanceMeters: 740,
    imageUrl: "/images/kotagede-guide/omah-ugm.webp",
    googleMapsUrl: "https://maps.google.com/?q=Omah+UGM+Kotagede"
  },
  {
    id: "gang-soka",
    nameKey: "gangSoka",
    category: "architecture",
    coordinates: [110.39628, -7.82952],
    walkingMinutesFromSalim: 11,
    distanceMeters: 820,
    imageUrl: "/images/kotagede-guide/gang-soka.webp",
    googleMapsUrl: "https://maps.google.com/?q=Gang+Soka+Kotagede+Yogyakarta"
  },
  {
    id: "museum-kotagede",
    nameKey: "museumKotagede",
    category: "architecture",
    coordinates: [110.39217, -7.82634],
    walkingMinutesFromSalim: 15,
    distanceMeters: 1090,
    imageUrl: "/images/kotagede-guide/museum-kotagede.webp",
    googleMapsUrl:
      "https://maps.google.com/?q=Museum+Kotagede+Intro+Living+Museum"
  }
]

export const WALKING_TRAILS: WalkingTrail[] = [
  {
    id: "royal",
    nameKey: "royal",
    descriptionKey: "royal",
    experienceMinutes: [75, 120],
    endStopId: "between-two-gates",
    color: "#b45309", // Warm amber / royal bronze
    stopIds: [
      "salim-silver",
      "pasar-legi",
      "masjid-gedhe-mataram",
      "makam-raja",
      "sendang-seliran",
      "between-two-gates"
    ],
    routeGeoJson: {
      type: "Feature",
      properties: { trailId: "royal" },
      geometry: {
        type: "LineString",
        coordinates: ROYAL_ROUTE_COORDINATES
      }
    }
  },
  {
    id: "heritage",
    nameKey: "heritage",
    descriptionKey: "heritage",
    experienceMinutes: [120, 180],
    endStopId: "museum-kotagede",
    color: "#0f766e", // Deep teal / heritage patinated silver
    stopIds: [
      "salim-silver",
      "pasar-legi",
      "between-two-gates",
      "watu-gilang",
      "masjid-gedhe-mataram",
      "makam-raja",
      "sendang-seliran",
      "gang-soka",
      "omah-ugm",
      "museum-kotagede"
    ],
    routeGeoJson: {
      type: "Feature",
      properties: { trailId: "heritage" },
      geometry: {
        type: "LineString",
        coordinates: KOTAGEDE_HERITAGE_ROUTE_COORDINATES
      }
    }
  },
  {
    id: "culinary",
    nameKey: "culinary",
    descriptionKey: "culinary",
    experienceMinutes: [60, 90],
    endStopId: "kipo-bu-djito",
    color: "#be185d", // Rich berry / traditional culinary warm rose
    stopIds: ["salim-silver", "kembang-waru", "pasar-legi", "kipo-bu-djito"],
    routeGeoJson: {
      type: "Feature",
      properties: { trailId: "culinary" },
      geometry: {
        type: "LineString",
        coordinates: CULINARY_ROUTE_COORDINATES
      }
    }
  }
]

const EARTH_RADIUS_METERS = 6_371_000
const WALKING_METERS_PER_MINUTE = 75

function haversineMeters(from: [number, number], to: [number, number]): number {
  const radians = (degrees: number) => (degrees * Math.PI) / 180
  const latitudeDelta = radians(to[1] - from[1])
  const longitudeDelta = radians(to[0] - from[0])
  const fromLatitude = radians(from[1])
  const toLatitude = radians(to[1])
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(fromLatitude) *
      Math.cos(toLatitude) *
      Math.sin(longitudeDelta / 2) ** 2

  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(haversine))
}

export function getTrailPois(trail: WalkingTrail): POI[] {
  const poisById = new Map(KOTAGEDE_POIS.map((poi) => [poi.id, poi]))

  return trail.stopIds.flatMap((id) => {
    const poi = poisById.get(id)
    return poi ? [poi] : []
  })
}

export function getTrailDistanceMeters(trail: WalkingTrail): number {
  const coordinates = trail.routeGeoJson.geometry.coordinates
  let distanceMeters = 0

  for (let index = 1; index < coordinates.length; index += 1) {
    distanceMeters += haversineMeters(
      coordinates[index - 1] as [number, number],
      coordinates[index] as [number, number]
    )
  }

  return Math.round(distanceMeters)
}

export function getTrailWalkingMinutes(trail: WalkingTrail): number {
  const rawMinutes = getTrailDistanceMeters(trail) / WALKING_METERS_PER_MINUTE
  return Math.ceil(rawMinutes / 5) * 5
}

// Walled perimeter boundary enclosing Masjid Gedhe, Makam Raja, and Sendang Seliran
// Traced precisely from OpenStreetMap cadastral heritage ways 359048957 & 216214440
export const ROYAL_COMPLEX_POLYGON: GeoJSON.Feature<GeoJSON.Polygon> = {
  type: "Feature",
  properties: {
    name: "Kompleks Cagar Budaya Makam & Masjid Gedhe Mataram Kotagede"
  },
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        // Northeast boundary along Jl. Masjid Besar & Great Mosque courtyard
        [110.39806, -7.8290328],
        [110.3985449, -7.829159],
        [110.3984449, -7.829496],
        [110.3983856, -7.8296955],
        // Southeast boundary enclosing Sendang Seliran sacred spring baths
        [110.3983326, -7.829969],
        [110.3979149, -7.8298217],
        [110.3978725, -7.8299619],
        [110.397603, -7.8298293],
        [110.3976672, -7.8296266],
        // Southwest & Northwest boundary of the Royal Cemetery (Hastana Kitha Ageng)
        [110.3973735, -7.82952],
        [110.3974808, -7.8291134],
        [110.3979822, -7.8292502],
        // Closing back to northern dividing line
        [110.39806, -7.8290328]
      ]
    ]
  }
}
