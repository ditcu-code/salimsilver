import { generateOgImage } from "@/lib/og-generator"

export const runtime = "nodejs"
// The shared generator loads its fonts at request time, so avoid requiring
// external font access while the application is being built.
export const dynamic = "force-dynamic"
export const size = {
  width: 1200,
  height: 630
}
export const contentType = "image/jpeg"

export default async function OpengraphImage() {
  return await generateOgImage(
    "Share Your Salim Silver Experience",
    "Tell others about your visit to our workshop and showroom in Kotagede.",
    "public/images/salim-tells-old-design.webp"
  )
}
