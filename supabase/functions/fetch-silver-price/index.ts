import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

// Import TradingView API wrapper from npm
import TradingView from "npm:@mathieuc/tradingview"

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    })
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  )

  let priceIDR = 0
  let source = "tradingview"
  let timestamp = new Date().toISOString()
  const errors: Record<string, string> = {}

  // 1. Attempt to Fetch from TradingView API (Primary)
  // Ticker: FX_IDC:XAGIDRK (Silver Spot / Indonesian Rupiah (Kilo))
  try {
    console.log("Attempting to fetch from TradingView (FX_IDC:XAGIDRK)...")

    const price = await new Promise<number>((resolve, reject) => {
      const client = new TradingView.Client()
      const chart = new client.Session.Chart()

      let timeoutId: number

      chart.setMarket("FX_IDC:XAGIDRK", {
        timeframe: "1D",
      })

      chart.onUpdate(() => {
        if (chart.periods[0]) {
          const closePrice = chart.periods[0].close
          // Cleanup
          client.end()
          clearTimeout(timeoutId)
          resolve(closePrice)
        }
      })

      chart.onError((err: any) => {
        client.end()
        clearTimeout(timeoutId)
        reject(err)
      })

      // Timeout after 10 seconds if no data
      timeoutId = setTimeout(() => {
        client.end()
        reject(new Error("TradingView fetch timed out"))
      }, 10000) as unknown as number
    })

    console.log(`TradingView Fetch Result: ${price}`)

    // Validate price
    if (!price || isNaN(price) || price === 0) {
      throw new Error(`Invalid price from TradingView: ${price}`)
    }

    priceIDR = Math.round(price)
    source = "tradingview"
    console.log(`Primary fetch successful: ${priceIDR} (Source: tradingview)`)
  } catch (tvError: any) {
    console.error(
      "Primary (TradingView) fetch failed, switching to Fallback 1 (GoldPrice.org):",
      tvError.message
    )
    errors.tradingview = tvError.message

    // 2. Fallback 1: GoldPrice.org
    try {
      console.log("Attempting to fetch from goldprice.org...")
      const response = await fetch("https://data-asg.goldprice.org/dbXRates/IDR")
      if (!response.ok) {
        throw new Error(`GoldPrice fetch failed: ${response.status} ${response.statusText}`)
      }
      const data = await response.json()

      if (!data.items || data.items.length === 0) {
        throw new Error("GoldPrice validation failed: No items in response")
      }

      const item = data.items[0]
      const xagPrice = item.xagPrice

      if (!xagPrice) {
        throw new Error("GoldPrice validation failed: xagPrice not found")
      }

      // Convert Ounce to Kg
      const ouncesPerKg = 32.15074656862798
      const pricePerKg = xagPrice * ouncesPerKg
      priceIDR = Math.round(pricePerKg)

      if (data.ts) {
        timestamp = new Date(data.ts).toISOString()
      }
      source = "goldprice"
      console.log(`Fallback 1 successful: ${priceIDR} (Source: goldprice.org)`)
    } catch (gpError: any) {
      console.error(
        "Fallback 1 (GoldPrice) failed, switching to Fallback 2 (Metals.dev):",
        gpError.message
      )
      errors.goldprice = gpError.message

      // 3. Fallback 2: Metals.dev API
      try {
        const apiKey1 = Deno.env.get("METALS_DEV_API_KEY")
        const apiKey2 = Deno.env.get("METALS_DEV_API_KEY_2")

        if (!apiKey1) throw new Error("Missing METALS_DEV_API_KEY")

        let selectedApiKey = apiKey1
        if (apiKey2) {
          const hour = new Date().getHours()
          const block = Math.floor(hour / 4)
          if (block % 2 !== 0) selectedApiKey = apiKey2
        }

        console.log("Fetching from metals.dev API...")
        const response = await fetch(
          `https://api.metals.dev/v1/latest?api_key=${selectedApiKey}&currency=IDR&unit=kg`
        )
        const data = await response.json()

        if (data.status !== "success") {
          throw new Error(`API Error: \n${JSON.stringify(data, null, 2)}`)
        }

        const apiPrice = data.metals.silver
        priceIDR = Math.round(apiPrice)
        source = "metals_dev"

        if (data.timestamps) {
          const metalTime = data.timestamps.metal ? new Date(data.timestamps.metal).getTime() : 0
          const currencyTime = data.timestamps.currency
            ? new Date(data.timestamps.currency).getTime()
            : 0
          const latestTime = Math.max(metalTime, currencyTime)
          if (latestTime > 0) {
            timestamp = new Date(latestTime).toISOString()
          }
        }
        console.log(`Fallback 2 successful: ${priceIDR} (Source: metals_dev)`)
      } catch (apiError: any) {
        console.error("All fetch methods failed")
        errors.api = apiError.message

        return new Response(
          JSON.stringify({
            error: "All fetch methods failed",
            details: errors,
          }),
          {
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
            status: 500,
          }
        )
      }
    }
  }

  // 4. Insert into Database
  try {
    const insertPayload = {
      price_idr: priceIDR,
      updated_at: timestamp,
      source: source,
    }

    const { error } = await supabaseClient.from("silver_prices").insert(insertPayload)

    if (error) {
      // Should match the enum type if 'tradingview' is added correctly
      throw error
    }

    // 5. Update Summary Cache (Keeping existing logic)
    try {
      const now = new Date()
      const getHistoricalPrice = async (daysAgo: number) => {
        const targetDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000).toISOString()
        const { data } = await supabaseClient
          .from("silver_prices")
          .select("price_idr")
          .lte("updated_at", targetDate)
          .order("updated_at", {
            ascending: false,
          })
          .limit(1)
          .single()
        return data?.price_idr || null
      }

      const [price24h, price7d, price30d, price180d, price1y] = await Promise.all([
        getHistoricalPrice(1),
        getHistoricalPrice(7),
        getHistoricalPrice(30),
        getHistoricalPrice(180),
        getHistoricalPrice(365),
      ])

      const summaryPayload = {
        id: 1,
        price_idr: priceIDR,
        price_24h_ago: price24h,
        price_7d_ago: price7d,
        price_30d_ago: price30d,
        price_180d_ago: price180d,
        price_1y_ago: price1y,
        updated_at: timestamp,
      }

      const { error: summaryError } = await supabaseClient
        .from("silver_price_summary")
        .upsert(summaryPayload)

      if (summaryError) {
        console.error("Failed to update summary cache:", summaryError)
      } else {
        console.log("Summary cache updated successfully")
      }
    } catch (cacheError) {
      console.error("Error updating summary cache:", cacheError)
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: insertPayload,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      }
    )
  } catch (dbError: any) {
    console.error("Database insert failed:", dbError)
    return new Response(
      JSON.stringify({
        error: dbError.message,
        details: "Likely enum constraint error if migration not run",
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 400,
      }
    )
  }
})
