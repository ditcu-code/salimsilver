import { createClient } from "@/lib/supabase/server"
import { unstable_cache } from "next/cache"
import { PriceHistoryItem, SilverPriceSummary } from "./types"

export type GoldPriceSummary = SilverPriceSummary

export const getGoldPriceSummary = unstable_cache(
  async (): Promise<GoldPriceSummary | null> => {
    const supabase = await createClient()

    const { data } = await supabase
      .from("gold_price_summary")
      .select("*")
      .eq("id", 1)
      .single()

    return data as GoldPriceSummary
  },
  ["gold-price-summary"],
  {
    revalidate: 3600, // Fallback revalidate every hour
  },
)

export const getGoldPriceHistory = unstable_cache(
  async (days: number = 30): Promise<PriceHistoryItem[]> => {
    const supabase = await createClient()

    // Calculate the date from 'days' ago
    const date = new Date()
    date.setDate(date.getDate() - days)
    const fromDate = date.toISOString()

    const { data } = await supabase
      .from("gold_prices")
      .select("price_idr, updated_at")
      .gte("updated_at", fromDate)
      .order("updated_at", { ascending: false })
      .limit(2000)

    const reversedData = data ? [...data].reverse() : []

    // Map directly to PriceHistoryItem format (no downsampling)
    const dailyData: PriceHistoryItem[] = reversedData.map((item) => ({
      date: item.updated_at,
      price: item.price_idr,
    }))

    return dailyData
  },
  ["gold-price-history"],
  {
    tags: ["gold-price"],
    revalidate: 3600,
  },
)

export interface DisplayPrices {
  currentPrice: number
  previousPrice: number
  price7d: number
  price30d: number
  price180d: number
  price1y: number
  lastUpdated: string
}

export function calculateDisplayPrices(
  summary: GoldPriceSummary | null,
): DisplayPrices | null {
  if (!summary) return null

  // Price is already per gram in DB
  const currentPrice = summary.price_idr

  // Use 24h ago price if available, otherwise fallback to current
  const previousPrice = summary.price_24h_ago
    ? summary.price_24h_ago
    : currentPrice

  // Use 7d ago price if available, otherwise fallback to 24h ago price (and if that's missing, current)
  // This provides a cascading fallback
  const price7d = summary.price_7d_ago ? summary.price_7d_ago : previousPrice
  const price30d = summary.price_30d_ago ? summary.price_30d_ago : price7d
  const price180d = summary.price_180d_ago ? summary.price_180d_ago : price30d
  const price1y = summary.price_1y_ago ? summary.price_1y_ago : price180d

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
