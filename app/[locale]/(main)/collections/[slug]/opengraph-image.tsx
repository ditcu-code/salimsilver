import { BASE_URL } from "@/lib/constants"
import { getCollection } from "@/lib/collections"
import { generateOgImage } from "@/lib/og-generator"

export const runtime = "edge"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/jpeg"

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const collection = await getCollection(slug)

  if (!collection) {
    return await generateOgImage("Salim Silver", "Handcrafted Javanese Jewelry", `${BASE_URL}/images/og-background.jpg`)
  }

  return await generateOgImage(
    collection.title,
    collection.description || "Handcrafted Javanese Jewelry"
  )
}
