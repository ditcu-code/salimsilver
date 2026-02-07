import { createClient } from "@/lib/supabase/server"
import { PriceHistoryItem, SilverPriceSummary } from "./types"

import { unstable_cache } from "next/cache"

export const getSilverPriceSummary = unstable_cache(
  async (): Promise<SilverPriceSummary | null> => {
    const supabase = await createClient()

    const { data } = await supabase
      .from("silver_price_summary")
      .select("*")
      .eq("id", 1)
      .single()

    return data as SilverPriceSummary
  },
  ["silver-price-summary"],
  {
    revalidate: 3600, // Fallback revalidate every hour
  },
)

export const getSilverPriceHistory = unstable_cache(
  async (days: number = 30): Promise<PriceHistoryItem[]> => {
    const supabase = await createClient()

    // Calculate the date from 'days' ago
    const date = new Date()
    date.setDate(date.getDate() - days)
    const fromDate = date.toISOString()

    const { data } = await supabase
      .from("silver_prices")
      .select("price_idr, updated_at")
      .gte("updated_at", fromDate)
      .order("updated_at", { ascending: false })
      .limit(9000)

    const reversedData = data ? [...data].reverse() : []

    // Downsample to 1 point per day to keep payload light
    const dailyData: PriceHistoryItem[] = []
    const seenDates = new Set<string>()

    reversedData.forEach((item) => {
      const dateStr = new Date(item.updated_at).toISOString().split("T")[0]
      if (!seenDates.has(dateStr)) {
        seenDates.add(dateStr)
        dailyData.push({
          date: item.updated_at,
          price: item.price_idr / 1000,
        })
      }
    })

    return dailyData
  },
  ["silver-price-history-v2"],
  {
    tags: ["silver-price"],
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
  summary: SilverPriceSummary | null,
): DisplayPrices | null {
  if (!summary) return null

  // Convert from kg to per gram (divide by 1000)
  const currentPrice = summary.price_idr / 1000

  // Use 24h ago price if available, otherwise fallback to current
  const previousPrice = summary.price_24h_ago
    ? summary.price_24h_ago / 1000
    : currentPrice

  // Use 7d ago price if available, otherwise fallback to 24h ago price (and if that's missing, current)
  // This provides a cascading fallback
  const price7d = summary.price_7d_ago
    ? summary.price_7d_ago / 1000
    : previousPrice
  const price30d = summary.price_30d_ago
    ? summary.price_30d_ago / 1000
    : price7d
  const price180d = summary.price_180d_ago
    ? summary.price_180d_ago / 1000
    : price30d
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
