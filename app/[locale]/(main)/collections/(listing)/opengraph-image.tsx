import { generateOgImage } from "@/lib/og-generator"

export const runtime = "nodejs"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/jpeg"

export default async function OpengraphImage() {
  return await generateOgImage(
    "Collections",
    "Browse Salim Silver's curated collections of handcrafted rings, necklaces, bracelets, and more.",
    "public/images/private-collection-priyana-jatmika-salim.webp"
  )
}
