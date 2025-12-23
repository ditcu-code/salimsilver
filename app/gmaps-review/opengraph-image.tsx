import { generateOgImage } from "@/lib/og-generator"

export const runtime = "nodejs"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/jpeg"

export default async function OpengraphImage() {
  return await generateOgImage(
    "Review Salim Silver",
    "Share your experience visiting our workshop and showroom in Kotagede.",
    "public/images/store-front.webp"
  )
}
