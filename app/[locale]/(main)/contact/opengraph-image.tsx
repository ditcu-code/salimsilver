import { generateOgImage } from "@/lib/og-generator"

export const runtime = "nodejs"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/jpeg"

export default async function OpengraphImage() {
  return await generateOgImage(
    "Contact Salim Silver",
    "Get in touch for custom designs, wholesale partnerships, or workshop bookings. Located in Kotagede, Yogyakarta.",
    "public/images/gebyok.webp"
  )
}
