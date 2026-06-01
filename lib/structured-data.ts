import { BASE_URL, SUPABASE_CATALOG_URL } from "@/lib/constants"

/**
 * Shared business information used across JSON-LD structured data.
 * Single source of truth for address, contact, and opening hours.
 */
export const BUSINESS_INFO = {
  name: "Salim Silver",
  telephone: "+62 8997 90 50 30",
  email: "hello@salimsilver.com",
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo-salimsilver.webp`,
  image: `${SUPABASE_CATALOG_URL}/baroque-pearl-citrine-silver-brooch.webp`,
  priceRange: "$$",
  sameAs: ["https://www.instagram.com/salimsilverofficial/"],
  address: {
    "@type": "PostalAddress" as const,
    streetAddress: "Gg. Platina KG 3/547 - Kebohan, Purbayan, Kotagede",
    addressLocality: "Yogyakarta City",
    addressRegion: "Special Region of Yogyakarta",
    postalCode: "55173",
    addressCountry: "ID"
  },
  geo: {
    "@type": "GeoCoordinates" as const,
    latitude: -7.8273171,
    longitude: 110.4019932
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification" as const,
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    opens: "08:00",
    closes: "16:30"
  }
} as const

/**
 * Generates the Organization JSON-LD schema.
 * Should be included once on every page (typically in the root layout).
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS_INFO.name,
    url: BUSINESS_INFO.url,
    logo: {
      "@type": "ImageObject",
      url: BUSINESS_INFO.logo
    },
    image: BUSINESS_INFO.image,
    telephone: BUSINESS_INFO.telephone,
    email: BUSINESS_INFO.email,
    address: BUSINESS_INFO.address,
    sameAs: BUSINESS_INFO.sameAs
  }
}

/**
 * Generates the WebSite JSON-LD schema with SearchAction.
 * Enables the sitelinks search box in Google results.
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BUSINESS_INFO.name,
    url: BUSINESS_INFO.url
  }
}

/**
 * Generates a JewelryStore JSON-LD schema with full business details.
 */
export function getJewelryStoreSchema(overrides?: {
  "@id"?: string
  url?: string
  description?: string
}) {
  return {
    "@type": "JewelryStore",
    name: BUSINESS_INFO.name,
    image: BUSINESS_INFO.image,
    "@id": overrides?.["@id"] ?? BUSINESS_INFO.url,
    url: overrides?.url ?? BUSINESS_INFO.url,
    description: overrides?.description,
    telephone: BUSINESS_INFO.telephone,
    priceRange: BUSINESS_INFO.priceRange,
    address: BUSINESS_INFO.address,
    geo: BUSINESS_INFO.geo,
    sameAs: BUSINESS_INFO.sameAs,
    openingHoursSpecification: BUSINESS_INFO.openingHoursSpecification
  }
}
