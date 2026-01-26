import { getAllPosts } from "@/lib/blog"
import { getAllCollections, getAllJewelry } from "@/lib/collections"
import { BASE_URL } from "@/lib/constants"
import { MetadataRoute } from "next"

export const revalidate = 86400 // Revalidate every day

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts(false)
  const collections = await getAllCollections()
  const jewelry = await getAllJewelry()

  // Helper to generate localized entries
  const generateEntries = (
    path: string,
    lastModified: Date,
    changeFrequency:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never" = "daily",
    priority: number = 0.5,
  ) => {
    // English (default)
    const enUrl = `${BASE_URL}${path}`
    // Indonesian
    const idUrl = `${BASE_URL}/id${path}`

    return [
      { url: enUrl, lastModified, changeFrequency, priority },
      { url: idUrl, lastModified, changeFrequency, priority },
    ]
  }

  // 1. Static Routes
  const homeEntries = generateEntries("", new Date(), "daily", 1.0)
  const silverPriceEntries = generateEntries(
    "/silver-price",
    new Date(),
    "hourly",
    0.9,
  )

  const mainPages = ["/catalog", "/collections", "/workshop"].flatMap((route) =>
    generateEntries(route, new Date(), "weekly", 0.8),
  )

  const supportPages = ["/about", "/contact", "/store-location"].flatMap(
    (route) => generateEntries(route, new Date(), "monthly", 0.7),
  )

  const blogIndex = generateEntries("/blog", new Date(), "weekly", 0.8)

  // 2. Dynamic Routes
  const blogEntries = posts.flatMap((post) =>
    generateEntries(
      `/blog/${post.slug}`,
      new Date(post.updated_at || post.created_at),
      "monthly",
      0.6,
    ),
  )

  const collectionEntries = collections.flatMap((collection) =>
    generateEntries(
      `/collections/${collection.slug}`,
      new Date(),
      "weekly",
      0.7,
    ),
  )

  const jewelryEntries = jewelry.flatMap((item) =>
    generateEntries(
      `/product/${item.slug}`,
      new Date(item.updated_at),
      "weekly",
      0.8,
    ),
  )

  return [
    ...homeEntries,
    ...silverPriceEntries,
    ...mainPages,
    ...supportPages,
    ...blogIndex,
    ...blogEntries,
    ...collectionEntries,
    ...jewelryEntries,
  ]
}
