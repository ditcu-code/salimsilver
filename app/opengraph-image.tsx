import { BASE_URL } from "@/lib/constants"
import { generateOgImage } from "@/lib/og-generator"

export const runtime = "edge"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/jpeg"

export default async function OpengraphImage() {
  return await generateOgImage("Handcrafted Javanese Jewelry", "Heritage silver pieces made by artisans in Kotagede, Yogyakarta. Rings, necklaces, and bracelets crafted with intention.", `${BASE_URL}/images/og-background.jpg`)
}
