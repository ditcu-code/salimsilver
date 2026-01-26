import { BASE_URL } from "@/lib/constants"
import { generateOgImage } from "@/lib/og-generator"

export const runtime = "edge"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/jpeg"

export default async function OpengraphImage() {
  return await generateOgImage("Contact Salim Silver", "Get in touch for custom designs, wholesale partnerships, or workshop bookings. Located in Kotagede, Yogyakarta.", `${BASE_URL}/images/gebyok.webp`)
}
