import { generateOgImage } from "@/lib/og-generator"
import { createClient } from "@/lib/supabase/server"

export const runtime = "nodejs"

// Revalidate every 30 minutes
export const revalidate = 1800

export async function GET() {
  const supabase = await createClient()

  // Fetch latest silver price
  const { data: latestData } = await supabase
    .from("silver_prices")
    .select("price_idr, updated_at")
    .order("updated_at", { ascending: false })
    .limit(1)
    .single()

  const price = latestData?.price_idr || 0

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  const formattedPrice = formatter.format(price / 1000)

  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return await generateOgImage(
    `Harga Perak Hari Ini: ${formattedPrice} per gram`,
    `Update Terbaru ${today}. Cek detail harga perak murni hari ini di Salim Silver.`
  )
}
