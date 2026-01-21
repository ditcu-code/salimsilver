import { getAllCollections, getJewelryBySlug } from "@/lib/collections"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

import CatalogPageClient from "./page.client"

import {
  constructCanonicalUrl,
  getAlternates,
  getOpenGraphLocale,
} from "@/lib/seo"

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ jewelry?: string }>
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { locale } = await params
  const { jewelry } = await searchParams
  const t = await getTranslations({ locale, namespace: "CatalogPage.Metadata" })

  if (jewelry) {
    const item = await getJewelryBySlug(jewelry)
    if (item) {
      const title = `${item.title} - Salim Silver`
      const description = item.description || t("fallbackDescription")
      const images =
        item.images && item.images.length > 0 ? [item.images[0].src] : []
      const productUrl = constructCanonicalUrl(
        locale,
        `/catalog?jewelry=${jewelry}`,
      )

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          images,
          url: productUrl,
          siteName: "Salim Silver",
          locale: getOpenGraphLocale(locale),
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images,
        },
        alternates: {
          canonical: productUrl,
          languages: getAlternates(`/catalog?jewelry=${jewelry}`),
        },
      }
    }
  }

  const canonicalUrl = constructCanonicalUrl(locale, "/catalog")

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternates("/catalog"),
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
      siteName: "Salim Silver",
      locale: getOpenGraphLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  }
}

export default async function CatalogPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations("CatalogPage.Metadata")
  const collections = await getAllCollections()
  return (
    <>
      <Suspense>
        <CatalogPageClient collections={collections} />
      </Suspense>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: t("title"),
            description: t("description"),
            url: constructCanonicalUrl(locale, "/catalog"),
          }),
        }}
      />
    </>
  )
}
