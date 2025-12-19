import { generateOgImage } from "@/lib/og-generator"

export const runtime = "nodejs"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/jpeg"

export default async function OpengraphImage() {
  return await generateOgImage(
    "Visit Salim Silver",
    "Experience our workshop and store in Kotagede. See artisans at work and shop our handcrafted collection.",
    "public/images/store-front.webp"
  )
}
