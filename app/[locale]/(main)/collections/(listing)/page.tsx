import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import FeaturedCollections from "@/components/blocks/featured-collections"
import { getAllCollections } from "@/lib/collections"
import {
  getCanonicalUrl,
  getSeoAlternates,
  getSeoOpenGraphLocale
} from "@/lib/seo-indexing"
export const revalidate = 86400

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({
    locale,
    namespace: "CollectionsPage.Metadata"
  })
  const canonicalUrl = getCanonicalUrl("collection", locale, "/collections")

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: getSeoAlternates("collection", "/collections")
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
      siteName: "Salim Silver",
      locale: getSeoOpenGraphLocale("collection", locale)
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description")
    }
  }
}

export default async function CollectionsPage({ params }: Props) {
  const { locale } = await params
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
            url: getCanonicalUrl("collection", locale, "/collections")
          })
        }}
      />
    </>
  )
}
