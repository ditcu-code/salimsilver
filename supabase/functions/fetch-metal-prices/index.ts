import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import TradingView from "npm:@mathieuc/tradingview"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
}

interface FetchResult {
  price: number
  timestamp: string
  source: string
  error?: string
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    })
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  )

  const messages: string[] = []
  const errors: Record<string, string> = {}

  // --- EXECUTE FETCHES ---

  const reqUrl = new URL(req.url)
  const skipSources = reqUrl.searchParams.get("skip_sources")?.split(",") || []

  // Helper to fetch price for a specific symbol
  async function fetchPrice(
    type: "silver" | "gold",
    tvSymbol: string, // FX_IDC:XAGIDRK or FX_IDC:XAUIDRK
    metalDevKey: string, // silver or gold (API key is same, but response key differs)
  ): Promise<FetchResult> {
    let priceIDR = 0
    let source = "tradingview"
    let timestamp = new Date().toISOString()

    // 1. TradingView
    try {
      if (skipSources.includes("tradingview")) {
        throw new Error("Simulated skip: tradingview")
      }
      console.log(`[${type}] Attempting TradingView (${tvSymbol})...`)
      const currentPrice = await new Promise<number>((resolve, reject) => {
        const client = new TradingView.Client()
        const chart = new client.Session.Chart()
        let timeoutId: number

        chart.setMarket(tvSymbol, { timeframe: "1D" })

        chart.onUpdate(() => {
          if (chart.periods[0]) {
            const close = chart.periods[0].close
            client.end()
            clearTimeout(timeoutId)
            resolve(close)
          }
        })

        chart.onError((err: any) => {
          client.end()
          clearTimeout(timeoutId)
          reject(err)
        })

        timeoutId = setTimeout(() => {
          client.end()
          reject(new Error("Timeout"))
        }, 10000) as unknown as number
      })

      if (!currentPrice || isNaN(currentPrice) || currentPrice === 0) {
        throw new Error("Invalid price")
      }
      priceIDR = Math.round(currentPrice)
      source = "tradingview"
    } catch (tvError: any) {
      console.warn(`[${type}] TradingView failed: ${tvError.message}`)

      // 2. GoldPrice.org
      try {
        if (skipSources.includes("goldprice")) {
          throw new Error("Simulated skip: goldprice")
        }
        console.log(`[${type}] Attempting GoldPrice.org...`)
        const response = await fetch(
          "https://data-asg.goldprice.org/dbXRates/IDR",
        )
        if (!response.ok) throw new Error("Fetch failed")

        const data = await response.json()
        if (!data.items || data.items.length === 0) throw new Error("No items")
        const item = data.items[0]

        // key is xagPrice for silver, xauPrice for gold
        const priceKey = type === "silver" ? "xagPrice" : "xauPrice"
        const rawPrice = item[priceKey]

        if (!rawPrice) throw new Error(`${priceKey} not found`)

        // Ounces to Kg
        const ouncesPerKg = 32.15074656862798
        const pricePerKg = rawPrice * ouncesPerKg
        priceIDR = Math.round(pricePerKg)

        if (data.ts) timestamp = new Date(data.ts).toISOString()
        source = "goldprice"
      } catch (gpError: any) {
        console.warn(`[${type}] GoldPrice failed: ${gpError.message}`)

        // 3. Metals.dev
        try {
          if (skipSources.includes("metals_dev")) {
            throw new Error("Simulated skip: metals_dev")
          }
          console.log(`[${type}] Attempting Metals.dev...`)
          const apiKey1 = Deno.env.get("METALS_DEV_API_KEY")
          const apiKey2 = Deno.env.get("METALS_DEV_API_KEY_2") // Optional fallback key

          if (!apiKey1) throw new Error("Missing API Key")

          // Simple rotation if key 2 exists
          let selectedApiKey = apiKey1
          if (apiKey2) {
            const hour = new Date().getHours()
            if (Math.floor(hour / 4) % 2 !== 0) selectedApiKey = apiKey2
          }

          const response = await fetch(
            `https://api.metals.dev/v1/latest?api_key=${selectedApiKey}&currency=IDR&unit=kg`,
          )
          const data = await response.json()

          if (data.status !== "success") throw new Error("API Error")

          priceIDR = Math.round(data.metals[type])
          source = "metals_dev"
        } catch (mdevError: any) {
          console.error(`[${type}] All sources failed`)
          return {
            price: 0,
            timestamp: "",
            source: "",
            error: mdevError.message,
          }
        }
      }
    }

    // Convert Gold to Per Gram (divide by 1000)
    // Silver remains Per Kg (as per user request)
    if (type === "gold" && priceIDR > 0) {
      priceIDR = Math.round(priceIDR / 1000)
    }

    return { price: priceIDR, timestamp, source }
  }

  const silverResult = await fetchPrice("silver", "FX_IDC:XAGIDRK", "silver")
  const goldResult = await fetchPrice("gold", "FX_IDC:XAUIDRK", "gold")

  // --- DATABASE UPDATES ---

  async function updateDatabase(type: "silver" | "gold", result: FetchResult) {
    if (result.error || result.price === 0) {
      errors[type] = result.error || "Unknown error"
      return
    }

    const tableHistory = type === "silver" ? "silver_prices" : "gold_prices"
    const tableSummary =
      type === "silver" ? "silver_price_summary" : "gold_price_summary"

    // 1. Insert History
    const insertPayload = {
      price_idr: result.price,
      updated_at: result.timestamp,
      source: result.source,
    }

    const { error: insertError } = await supabaseClient
      .from(tableHistory)
      .insert(insertPayload)

    if (insertError) {
      errors[`${type}_insert`] = insertError.message
      return
    }

    // 2. Update Summary
    try {
      const now = new Date()
      const getHistoricalPrice = async (daysAgo: number) => {
        const targetDate = new Date(
          now.getTime() - daysAgo * 24 * 60 * 60 * 1000,
        ).toISOString()
        const { data } = await supabaseClient
          .from(tableHistory)
          .select("price_idr")
          .lte("updated_at", targetDate)
          .order("updated_at", { ascending: false })
          .limit(1)
          .single()
        return data?.price_idr || null
      }

      const [price24h, price7d, price30d, price180d, price1y] =
        await Promise.all([
          getHistoricalPrice(1),
          getHistoricalPrice(7),
          getHistoricalPrice(30),
          getHistoricalPrice(180),
          getHistoricalPrice(365),
        ])

      const summaryPayload = {
        id: 1,
        price_idr: result.price,
        price_24h_ago: price24h,
        price_7d_ago: price7d,
        price_30d_ago: price30d,
        price_180d_ago: price180d,
        price_1y_ago: price1y,
        updated_at: result.timestamp,
      }

      const { error: summaryError } = await supabaseClient
        .from(tableSummary)
        .upsert(summaryPayload)

      if (summaryError) {
        errors[`${type}_summary`] = summaryError.message
      } else {
        messages.push(`${type} updated successfully`)
      }
    } catch (err: any) {
      errors[`${type}_summary_calc`] = err.message
    }
  }

  await Promise.all([
    updateDatabase("silver", silverResult),
    updateDatabase("gold", goldResult),
  ])

  // --- REVALIDATION ---
  // Revalidate if at least one succeeded
  const secret = reqUrl.searchParams.get("secret")

  if (secret && (silverResult.price > 0 || goldResult.price > 0)) {
    try {
      console.log("Triggering Next.js revalidation...")
      const tags = []
      if (silverResult.price > 0) tags.push("silver-price")
      if (goldResult.price > 0) tags.push("gold-price")

      // Sequential revalidations
      for (const tag of tags) {
        console.log(`Triggering revalidation for tag: ${tag}...`)
        const revalidateRes = await fetch(
          `https://www.salimsilver.com/api/revalidate?tag=${tag}&secret=${secret}`,
          { method: "POST" },
        )

        if (revalidateRes.ok) {
          console.log(`Revalidation request successful for tag: ${tag}`)
        } else {
          console.error(
            `Revalidation failed for ${tag}: ${revalidateRes.status} ${revalidateRes.statusText}`,
          )
          errors[`revalidation_${tag}`] =
            `Failed: ${revalidateRes.status} ${revalidateRes.statusText}`
        }
      }
      messages.push("Revalidation triggered")
    } catch (err: any) {
      errors["revalidation"] = err.message
    }
  }

  return new Response(
    JSON.stringify({
      success: Object.keys(errors).length === 0,
      messages,
      errors,
      data: {
        silver: silverResult,
        gold: goldResult,
      },
    }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: Object.keys(errors).length > 0 ? 500 : 200,
    },
  )
})
