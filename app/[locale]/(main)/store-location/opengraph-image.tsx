import { BASE_URL } from "@/lib/constants"
import { generateOgImage } from "@/lib/og-generator"

export const runtime = "edge"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/jpeg"

export default async function OpengraphImage() {
  return await generateOgImage("Visit Salim Silver", "Experience our workshop and store in Kotagede. See artisans at work and shop our handcrafted collection.", `${BASE_URL}/images/store-front.webp`)
}
