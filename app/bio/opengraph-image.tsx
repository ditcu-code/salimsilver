import { generateOgImage } from "@/lib/og-generator"

export const runtime = "nodejs"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/jpeg"

export default async function OpengraphImage() {
  return await generateOgImage(
    "Connect with Salim Silver",
    "Visit our website, shop collections, book a workshop, or find us in Kotagede. Handcrafted Javanese silver jewelry."
  )
}
