import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { getCollection, getFeaturedCollections, getJewelryBySlug } from "@/lib/collections"
import { BASE_URL } from "@/lib/constants"
import { getOpenGraphLocale } from "@/lib/seo"
import { notFound } from "next/navigation"

import { CollectionContent } from "./collection-content"

interface Props {
  params: Promise<{
    slug: string
    locale: string
  }>
  searchParams: Promise<{
    jewelry?: string
  }>
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const { jewelry } = await searchParams
  const t = await getTranslations("CollectionDetailPage.Metadata")

  // 1. Check if specific jewelry is being shared
  if (jewelry) {
    const item = await getJewelryBySlug(jewelry)
    if (item) {
      const title = `${item.title} - Salim Silver`
      const description = item.description || t("fallbackDescription", { title: item.title })
      const images =
        item.images && item.images.length > 0 ? [item.images[0].src] : ["/opengraph-image"]

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          images,
          url: `${BASE_URL}/collections/${slug}?jewelry=${jewelry}`,
          siteName: "Salim Silver",
          locale: getOpenGraphLocale(locale),
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images,
        },
      }
    }
  }

  // 2. Fallback to Collection metadata
  const collection = await getCollection(slug)
  if (collection) {
    const title = `${collection.title} - Salim Silver`
    const description =
      collection.description || t("fallbackDescription", { title: collection.title })
    const images = collection.coverImage ? [collection.coverImage] : ["/opengraph-image"]

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images,
        url: `${BASE_URL}/collections/${slug}`,
        siteName: "Salim Silver",
        locale: getOpenGraphLocale(locale),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images,
      },
    }
  }

  return {
    title: "Collection Not Found",
  }
}

export default async function CollectionPage({ params, searchParams }: Props) {
  // Ensure params is properly awaited
  const { slug } = await params
  const t = await getTranslations("CollectionDetailPage.Breadcrumbs")
  const collection = await getCollection(slug)
  const featuredCollections = await getFeaturedCollections()

  if (!collection) {
    notFound()
  }

  return (
    <>
      <CollectionContent
        collection={collection}
        featuredCollections={featuredCollections}
        initialJewelrySlug={(await searchParams).jewelry}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: collection.title,
            description: collection.description,
            url: `${BASE_URL}/collections/${collection.slug}`,
            image: collection.coverImage ? [collection.coverImage] : [],
            mainEntity: {
              "@type": "ItemList",
              itemListElement:
                collection.jewelryList?.map((item, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  url: `${BASE_URL}/catalog?jewelry=${item.slug}`,
                  name: item.title,
                  image: item.coverImage,
                })) || [],
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: t("collections"),
                item: `${BASE_URL}/collections`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: collection.title,
                item: `${BASE_URL}/collections/${collection.slug}`,
              },
            ],
          }),
        }}
      />
    </>
  )
}
