import { generateOgImage } from "@/lib/og-generator"
import { getSilverPriceSummary } from "@/lib/silver-price"
import { unstable_cache } from "next/cache"

export const runtime = "nodejs"

// Image generation is expensive, so we cache the raw buffer.
// We use the same 'silver-price' tag so it invalidates when the price updates.
const getCachedOgImageBuffer = unstable_cache(
  async (formattedPrice: string, date: string) => {
    const response = await generateOgImage(
      `Harga Perak Hari Ini: ${formattedPrice} per gram`,
      `Update Terbaru ${date}. Cek detail harga perak murni hari ini di Salim Silver.`,
    )
    return response.arrayBuffer()
  },
  ["silver-price-og-image"],
  {
    tags: ["silver-price"],
    revalidate: 3600, // Fallback
  },
)

export async function GET() {
  const summary = await getSilverPriceSummary()
  const price = summary?.price_idr || 0

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  const formattedPrice = formatter.format(price / 1000)

  // Use the update time from the summary if available, otherwise current date
  const updateTime = summary?.updated_at
    ? new Date(summary.updated_at)
    : new Date()

  const dateStr = updateTime.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const imageBuffer = await getCachedOgImageBuffer(formattedPrice, dateStr)

  return new Response(imageBuffer, {
    headers: {
      "Content-Type": "image/jpeg",
      // Tell browsers/CDNs to check often (max-age=60), but serve stale for a bit if needed
      "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
    },
  })
}
