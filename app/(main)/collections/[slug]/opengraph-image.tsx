import { getCollection } from "@/lib/collections"
import { generateOgImage } from "@/lib/og-generator"

export const runtime = "nodejs"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/jpeg"

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const collection = await getCollection(slug)

  if (!collection) {
    return await generateOgImage("Salim Silver", "Handcrafted Javanese Jewelry")
  }

  return await generateOgImage(
    collection.title,
    collection.description || "Handcrafted Javanese Jewelry"
  )
}
