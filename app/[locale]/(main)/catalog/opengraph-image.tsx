import { BASE_URL } from "@/lib/constants"
import { generateOgImage } from "@/lib/og-generator"

export const runtime = "edge"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/jpeg"

export default async function OpengraphImage() {
  return await generateOgImage("Our Catalog", "Explore our complete collection of handcrafted silver jewelry. From intricate rings to statement necklaces, find your perfect piece.", `${BASE_URL}/images/og-background.jpg`)
}
