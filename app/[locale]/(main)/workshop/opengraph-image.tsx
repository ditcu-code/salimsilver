import { BASE_URL } from "@/lib/constants"
import { generateOgImage } from "@/lib/og-generator"

export const runtime = "edge"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/jpeg"

export default async function OpengraphImage() {
  return await generateOgImage("Silversmith Jewelry Workshop", "Join our 3-hour hands-on silversmithing workshop in Kotagede. Create your own silver jewelry guided by master artisans.", `${BASE_URL}/images/tatah-cincin.webp`)
}
