import { BASE_URL } from "@/lib/constants"
import { generateOgImage } from "@/lib/og-generator"

export const runtime = "edge"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/jpeg"

export default async function OpengraphImage() {
  return await generateOgImage("Journal | Salim Silver", "Read about our craftsmanship, materials, and the stories behind Javanese silver jewelry.", `${BASE_URL}/images/silversmith-workbench.webp`)
}
