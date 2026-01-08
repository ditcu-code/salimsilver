import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import FeaturedCollections from "@/components/blocks/featured-collections"
import { getAllCollections } from "@/lib/collections"

import { BASE_URL } from "@/lib/constants"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("CollectionsPage.Metadata")

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}/collections`,
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}/collections`,
      siteName: "Salim Silver",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  }
}

export default async function CollectionsPage() {
  const t = await getTranslations("CollectionsPage.Metadata")
  const collections = await getAllCollections()

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <FeaturedCollections collections={collections} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: t("title"),
            description: t("description"),
            url: `${BASE_URL}/collections`,
          }),
        }}
      />
    </>
  )
}
