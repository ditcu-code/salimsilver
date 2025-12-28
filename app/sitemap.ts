import { getAllPosts } from "@/lib/blog"
import { getAllCollections, getAllJewelry } from "@/lib/collections"
import { BASE_URL } from "@/lib/constants"
import { MetadataRoute } from "next"

export const revalidate = 3600 // Revalidate at least every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts(false)
  const collections = await getAllCollections()
  const jewelry = await getAllJewelry()

  const blogUrls = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at || post.created_at),
  }))

  const collectionUrls = collections.map((collection) => ({
    url: `${BASE_URL}/collections/${collection.slug}`,
    lastModified: new Date(),
  }))

  const jewelryUrls = jewelry.map((item) => ({
    url: `${BASE_URL}/product/${item.slug}`,
    lastModified: new Date(item.updated_at),
  }))

  return [
    { url: `${BASE_URL}/`, lastModified: new Date() },
    { url: `${BASE_URL}/about`, lastModified: new Date() },
    { url: `${BASE_URL}/catalog`, lastModified: new Date() },
    { url: `${BASE_URL}/collections`, lastModified: new Date() },
    { url: `${BASE_URL}/contact`, lastModified: new Date() },
    { url: `${BASE_URL}/store-location`, lastModified: new Date() },
    { url: `${BASE_URL}/silver-price`, lastModified: new Date() },
    { url: `${BASE_URL}/blog`, lastModified: new Date() },
    ...blogUrls,
    ...collectionUrls,
    ...jewelryUrls,
  ]
}
