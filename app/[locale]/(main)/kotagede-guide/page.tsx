import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import {
  constructCanonicalUrl,
  getAlternates,
  getOpenGraphLocale
} from "@/lib/seo"
import { BUSINESS_INFO } from "@/lib/structured-data"
import KotagedeGuideClient from "./kotagede-guide-client"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({
    locale,
    namespace: "KotagedeGuidePage.Metadata"
  })
  const canonicalUrl = constructCanonicalUrl(locale, "/kotagede-guide")
  const pageTitle = t("title")
  const pageDescription = t("description")

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: t("keywords").split(", "),
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternates("/kotagede-guide")
    },
    openGraph: {
      type: "website",
      title: `${pageTitle} | Salim Silver`,
      description: pageDescription,
      url: canonicalUrl,
      siteName: "Salim Silver",
      locale: getOpenGraphLocale(locale)
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} | Salim Silver`,
      description: pageDescription
    }
  }
}

export default async function KotagedeGuidePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({
    locale,
    namespace: "KotagedeGuidePage.Metadata"
  })
  const trailText = await getTranslations({
    locale,
    namespace: "KotagedeGuidePage.Trails"
  })
  const canonicalUrl = constructCanonicalUrl(locale, "/kotagede-guide")
  const homeUrl = constructCanonicalUrl(locale, "")

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristDestination",
        "@id": `${canonicalUrl}#destination`,
        name: "Kotagede Heritage District",
        description: t("description"),
        url: canonicalUrl,
        geo: {
          "@type": "GeoCoordinates",
          latitude: BUSINESS_INFO.geo.latitude,
          longitude: BUSINESS_INFO.geo.longitude
        },
        touristType: [
          "Cultural Tourism",
          "Heritage Tourism",
          "Historical Walking Tour"
        ]
      },
      {
        "@type": "TouristTrip",
        "@id": `${canonicalUrl}#trip`,
        name: t("title"),
        description: t("description"),
        url: canonicalUrl,
        touristType: ["Walking Tour", "Heritage Tourism"],
        provider: {
          "@type": "Organization",
          name: BUSINESS_INFO.name,
          url: BUSINESS_INFO.url
        },
        itinerary: {
          "@type": "ItemList",
          numberOfItems: 3,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: trailText("royal.title"),
              description: trailText("royal.description")
            },
            {
              "@type": "ListItem",
              position: 2,
              name: trailText("heritage.title"),
              description: trailText("heritage.description")
            },
            {
              "@type": "ListItem",
              position: 3,
              name: trailText("culinary.title"),
              description: trailText("culinary.description")
            }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: homeUrl
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t("title"),
            item: canonicalUrl
          }
        ]
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <KotagedeGuideClient />
    </>
  )
}
