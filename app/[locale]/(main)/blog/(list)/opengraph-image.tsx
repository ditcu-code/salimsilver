import { generateOgImage } from "@/lib/og-generator"

export const runtime = "nodejs"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/jpeg"

export default async function OpengraphImage() {
  return await generateOgImage(
    "Journal | Salim Silver",
    "Read about our craftsmanship, materials, and the stories behind Javanese silver jewelry.",
    "public/images/silversmith-workbench.webp"
  )
}
