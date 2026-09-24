import { getAllPosts } from "@/lib/blog"
import { getAllCollectionsMetadata, getAllJewelry } from "@/lib/collections"
import {
  getCanonicalUrl,
  getIndexableLocales,
  type SeoRouteFamily
} from "@/lib/seo-indexing"
import type { MetadataRoute } from "next"

export const revalidate = 86400

function generateEntries(
  family: SeoRouteFamily,
  path: string,
  lastModified?: Date
): MetadataRoute.Sitemap {
  return getIndexableLocales(family).map((locale) => ({
    url: getCanonicalUrl(family, locale, path),
    ...(lastModified ? { lastModified } : {})
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, collections, jewelry] = await Promise.all([
    getAllPosts(false),
    getAllCollectionsMetadata(),
    getAllJewelry()
  ])

  const informationalEntries = [
    "",
    "/silver-price",
    "/gold-price",
    "/workshop",
    "/about",
    "/career",
    "/contact",
    "/store-location"
  ].flatMap((path) => generateEntries("static", path))

  const indexEntries = [
    ...generateEntries("product", "/catalog"),
    ...generateEntries("collection", "/collections"),
    ...generateEntries("blog", "/blog")
  ]

  const blogEntries = posts.flatMap((post) =>
    generateEntries(
      "blog",
      `/blog/${post.slug}`,
      new Date(post.updated_at || post.created_at)
    )
  )

  const collectionEntries = collections.flatMap((collection) =>
    generateEntries(
      "collection",
      `/collections/${collection.slug}`,
      new Date(collection.updated_at)
    )
  )

  const jewelryEntries = jewelry.flatMap((item) =>
    generateEntries(
      "product",
      `/product/${item.slug}`,
      new Date(item.updated_at)
    )
  )

  return [
    ...informationalEntries,
    ...indexEntries,
    ...blogEntries,
    ...collectionEntries,
    ...jewelryEntries
  ]
}
