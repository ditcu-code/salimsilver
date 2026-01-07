import { generateOgImage } from "@/lib/og-generator"

export const runtime = "nodejs"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/jpeg"

export default async function OpengraphImage() {
  return await generateOgImage(
    "About Salim Silver",
    "Meet Salim Silver: artisans crafting Javanese-inspired silver jewelry in Kotagede. Discover our heritage, values, and craftsmanship.",
    "public/images/priyana-jatmika-salim-with-his-loupe.webp"
  )
}
