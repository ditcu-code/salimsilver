import { generateOgImage } from "@/lib/og-generator"

export const runtime = "nodejs"
export const size = {
  width: 1200,
  height: 630
}
export const contentType = "image/jpeg"

export default async function OpengraphImage() {
  return await generateOgImage(
    "Kotagede Walking Guide",
    "Explore 500 years of living history on foot: royal Mataram landmarks, Between Two Gates, merchant houses, and traditional culinary spots.",
    "public/images/gebyok.webp"
  )
}
