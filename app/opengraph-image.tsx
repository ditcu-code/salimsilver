import { generateOgImage } from "@/lib/og-generator"

export const runtime = "nodejs"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/jpeg"

export default async function OpengraphImage() {
  return await generateOgImage(
    "Handcrafted Javanese Jewelry",
    "Heritage silver pieces made by artisans in Kotagede, Yogyakarta. Rings, necklaces, and bracelets crafted with intention."
  )
}
