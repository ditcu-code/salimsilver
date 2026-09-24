import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import {
  getCollection,
  getFeaturedCollections,
  getJewelryBySlug
} from "@/lib/collections"
import {
  getCanonicalUrl,
  getSeoAlternates,
  getSeoOpenGraphLocale
} from "@/lib/seo-indexing"
import { notFound } from "next/navigation"
export const revalidate = 86400

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

export async function generateMetadata({
  params,
  searchParams
}: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const { jewelry } = await searchParams
  const t = await getTranslations("CollectionDetailPage.Metadata")

  // 1. Check if specific jewelry is being shared
  if (jewelry) {
    const item = await getJewelryBySlug(jewelry)
    if (item) {
      const title = `${item.title} Collection`
      const description =
        item.description || t("fallbackDescription", { title: item.title })
      const images =
        item.images && item.images.length > 0
          ? [item.images[0].src]
          : ["/opengraph-image"]

      const productPath = `/product/${item.slug}`
      const productUrl = getCanonicalUrl("product", locale, productPath)

      return {
        title,
        description,
        alternates: {
          canonical: productUrl,
          languages: getSeoAlternates("product", productPath)
        },
        openGraph: {
          title,
          description,
          images,
          url: productUrl,
          siteName: "Salim Silver",
          locale: getSeoOpenGraphLocale("product", locale)
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images
        }
      }
    }
  }

  // 2. Fallback to Collection metadata
  const collection = await getCollection(slug)
  if (collection) {
    const title = `${collection.title} Collection`
    const description =
      collection.description ||
      t("fallbackDescription", { title: collection.title })
    const images = collection.coverImage
      ? [collection.coverImage]
      : ["/opengraph-image"]

    const collectionPath = `/collections/${slug}`
    const collectionUrl = getCanonicalUrl("collection", locale, collectionPath)

    return {
      title,
      description,
      alternates: {
        canonical: collectionUrl,
        languages: getSeoAlternates("collection", collectionPath)
      },
      openGraph: {
        title,
        description,
        images,
        url: collectionUrl,
        siteName: "Salim Silver",
        locale: getSeoOpenGraphLocale("collection", locale)
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images
      }
    }
  }

  return {
    title: "Collection Not Found"
  }
}

export default async function CollectionPage({ params, searchParams }: Props) {
  // Ensure params is properly awaited
  const { slug, locale } = await params
  const t = await getTranslations("CollectionDetailPage.Breadcrumbs")
  const collection = await getCollection(slug)
  const featuredCollections = await getFeaturedCollections()

  if (!collection) {
    notFound()
  }

  const collectionUrl = getCanonicalUrl(
    "collection",
    locale,
    `/collections/${collection.slug}`
  )
  const collectionsUrl = getCanonicalUrl("collection", locale, "/collections")

  return (
    <>
      <CollectionContent
        collection={collection}
        featuredCollections={featuredCollections}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: collection.title,
            description: collection.description,
            url: collectionUrl,
            image: collection.coverImage ? [collection.coverImage] : [],
            mainEntity: {
              "@type": "ItemList",
              itemListElement:
                collection.jewelryList?.map((item, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  url: getCanonicalUrl(
                    "product",
                    locale,
                    `/product/${item.slug}`
                  ),
                  name: item.title,
                  image: item.coverImage
                })) || []
            }
          })
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
                item: collectionsUrl
              },
              {
                "@type": "ListItem",
                position: 2,
                name: collection.title,
                item: collectionUrl
              }
            ]
          })
        }}
      />
    </>
  )
}
