import { getAllPosts } from "@/lib/blog"
import { getAllCollections, getAllJewelry } from "@/lib/collections"
import { BASE_URL } from "@/lib/constants"
import { MetadataRoute } from "next"

export const revalidate = 3600 // Revalidate at least every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts(false)
  const collections = await getAllCollections()
  const jewelry = await getAllJewelry()

  // Helper to generate localized entries
  const generateEntries = (path: string, lastModified: Date) => {
    // English (default)
    const enUrl = `${BASE_URL}${path}`
    // Indonesian
    const idUrl = `${BASE_URL}/id${path}`

    return [
      { url: enUrl, lastModified },
      { url: idUrl, lastModified },
    ]
  }

  const staticRoutes = [
    "",
    "/about",
    "/catalog",
    "/collections",
    "/contact",
    "/store-location",
    "/silver-price",
    "/blog",
  ]

  const staticEntries = staticRoutes.flatMap((route) => generateEntries(route, new Date()))

  const blogEntries = posts.flatMap((post) =>
    generateEntries(`/blog/${post.slug}`, new Date(post.updated_at || post.created_at))
  )

  const collectionEntries = collections.flatMap((collection) =>
    generateEntries(`/collections/${collection.slug}`, new Date())
  )

  const jewelryEntries = jewelry.flatMap((item) =>
    generateEntries(`/product/${item.slug}`, new Date(item.updated_at))
  )

  return [...staticEntries, ...blogEntries, ...collectionEntries, ...jewelryEntries]
}
