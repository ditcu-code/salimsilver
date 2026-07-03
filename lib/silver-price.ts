import { createClient } from "@/lib/supabase/server"
import { PriceHistoryItem, SilverPriceSummary } from "./types"

import { unstable_cache } from "next/cache"

export const getSilverPriceSummary = unstable_cache(
  async (): Promise<SilverPriceSummary | null> => {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("silver_price_summary")
      .select("*")
      .eq("id", 1)
      .single()

    if (error) {
      console.error("[silver-price] getSilverPriceSummary error:", error)
    }

    return data as SilverPriceSummary
  },
  ["silver-price-summary"],
  {
    tags: ["silver-price"],
    revalidate: 3600 // Fallback revalidate every hour
  }
)

export const getSilverPriceHistory = async (days: number = 30): Promise<PriceHistoryItem[]> => {
  const fetcher = unstable_cache(
    async () => {
      const supabase = await createClient()

      // Calculate the date from 'days' ago
      const date = new Date()
      date.setDate(date.getDate() - days)
      const fromDate = date.toISOString()

      let allData: any[] = []
      let lastDate = new Date().toISOString()
      
      while (true) {
        const { data } = await supabase
          .from("silver_prices")
          .select("price_idr, updated_at")
          .gte("updated_at", fromDate)
          .lte("updated_at", lastDate)
          .order("updated_at", { ascending: false })
          .limit(1000)

        if (!data || data.length === 0) break

        allData = allData.concat(data)

        if (data.length < 1000) break

        // Use the oldest date in this batch for the next iteration (subtract 1ms to avoid overlap)
        const oldestInBatch = new Date(data[data.length - 1].updated_at)
        oldestInBatch.setMilliseconds(oldestInBatch.getMilliseconds() - 1)
        lastDate = oldestInBatch.toISOString()
      }

      const reversedData = allData.reverse()

      const dailyData: PriceHistoryItem[] = []
      const now = new Date().getTime()
      let lastPushedDay = ""

      // Smart downsampling: keep full resolution for the last 30 days,
      // but downsample to 1 point per day for older data to keep the payload/chart fast.
      for (const item of reversedData) {
        const itemTime = new Date(item.updated_at).getTime()
        const daysOld = (now - itemTime) / (1000 * 60 * 60 * 24)

        if (daysOld <= 30) {
          dailyData.push({
            date: item.updated_at,
            price: item.price_idr / 1000 // Convert kg to gram
          })
        } else {
          const day = item.updated_at.split("T")[0]
          if (day !== lastPushedDay) {
            dailyData.push({
              date: item.updated_at,
              price: item.price_idr / 1000 // Convert kg to gram
            })
            lastPushedDay = day
          }
        }
      }

      return dailyData
    },
    ["silver-price-history", String(days)],
    {
      tags: ["silver-price"],
      revalidate: 3600
    }
  )

  return fetcher()
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

export function calculateDisplayPrices(
  summary: SilverPriceSummary | null
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
    lastUpdated: summary.updated_at
  }
}
