import { createClient } from "@/lib/supabase/server"
import { SilverPriceSummary } from "./types"

export async function getSilverPriceSummary(): Promise<SilverPriceSummary | null> {
  const supabase = await createClient()

  const { data } = await supabase.from("silver_price_summary").select("*").eq("id", 1).single()

  return data as SilverPriceSummary
}

export interface DisplayPrices {
  currentPrice: number
  previousPrice: number
  price7d: number
  price30d: number
  price180d: number
  price1y: number
  lastUpdated: string
}

export function calculateDisplayPrices(summary: SilverPriceSummary | null): DisplayPrices | null {
  if (!summary) return null

  // Convert from kg to per gram (divide by 1000)
  const currentPrice = summary.price_idr / 1000

  // Use 24h ago price if available, otherwise fallback to current
  const previousPrice = summary.price_24h_ago ? summary.price_24h_ago / 1000 : currentPrice

  // Use 7d ago price if available, otherwise fallback to 24h ago price (and if that's missing, current)
  // This provides a cascading fallback
  const price7d = summary.price_7d_ago ? summary.price_7d_ago / 1000 : previousPrice
  const price30d = summary.price_30d_ago ? summary.price_30d_ago / 1000 : price7d
  const price180d = summary.price_180d_ago ? summary.price_180d_ago / 1000 : price30d
  const price1y = summary.price_1y_ago ? summary.price_1y_ago / 1000 : price180d

  return {
    currentPrice,
    previousPrice,
    price7d,
    price30d,
    price180d,
    price1y,
    lastUpdated: summary.updated_at,
  }
}
