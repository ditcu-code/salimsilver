import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  )

  let priceIDR = 0
  let is_api = false
  let timestamp = new Date().toISOString()

  // 1. Attempt to Fetch from goldprice.org (Primary)
  try {
    console.log("Attempting to fetch from goldprice.org...")
    const response = await fetch("https://data-asg.goldprice.org/dbXRates/IDR")

    if (!response.ok) {
      throw new Error(`Primary fetch failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      throw new Error("Primary fetch validation failed: No items in response")
    }

    // Extract XAG Price (Silver per Ounce)
    const xagPrice = data.items[0].xagPrice
    if (!xagPrice) {
      throw new Error("Primary fetch validation failed: xagPrice not found")
    }

    // Convert Ounce to Kg
    // 1 Troy Ounce = 0.0311034768 kg => 1 kg = 32.15074656862798 oz
    const ouncesPerKg = 32.15074656862798
    const pricePerKg = xagPrice * ouncesPerKg

    priceIDR = Math.round(pricePerKg)

    if (isNaN(priceIDR) || priceIDR === 0) {
      throw new Error(`Primary fetch validation failed: Calculated price is invalid (${priceIDR})`)
    }

    // Extract Date from timestamp in response
    if (data.ts) {
      timestamp = new Date(data.ts).toISOString()
    }

    is_api = false // Marking as false to distinguish from the paid/limited metals.dev API
    console.log(`Primary fetch successful: ${priceIDR} (Source: goldprice.org, Time: ${timestamp})`)
  } catch (primaryError) {
    console.error("Primary fetch failed, switching to API fallback:", primaryError.message)

    // 2. Fallback to metals.dev API
    try {
      const apiKey1 = Deno.env.get("METALS_DEV_API_KEY")
      const apiKey2 = Deno.env.get("METALS_DEV_API_KEY_2")

      if (!apiKey1) throw new Error("Missing METALS_DEV_API_KEY")

      let selectedApiKey = apiKey1
      if (apiKey2) {
        // Deterministic rotation (same as before)
        const hour = new Date().getHours()
        const block = Math.floor(hour / 4)
        if (block % 2 !== 0) selectedApiKey = apiKey2
      }

      // Fetch Silver Price in IDR per Kilo (unit=kg)
      console.log("Fetching from metals.dev API...")
      const response = await fetch(
        `https://api.metals.dev/v1/latest?api_key=${selectedApiKey}&currency=IDR&unit=kg`
      )
      const data = await response.json()

      if (data.status !== "success") {
        throw new Error(`API Error: ${JSON.stringify(data)}`)
      }

      const apiPrice = data.metals.silver
      priceIDR = Math.round(apiPrice) // Save as integer with no decimal
      is_api = true

      // Parse API Timestamps: pick latest of "metal" vs "currency"
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

      console.log(`API successful: ${priceIDR} (Source: API, Time: ${timestamp})`)
    } catch (apiError) {
      console.error("API fallback failed:", apiError.message)
      return new Response(
        JSON.stringify({
          error: "All fetch methods failed",
          details: { primary: primaryError.message, api: apiError.message },
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      )
    }
  }

  // 3. Insert into Database
  try {
    const insertPayload = {
      price_idr: priceIDR,
      updated_at: timestamp,
      is_api: is_api,
    }

    const { error } = await supabaseClient.from("silver_prices").insert(insertPayload)

    if (error) throw error

    return new Response(JSON.stringify({ success: true, data: insertPayload }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    })
  } catch (dbError) {
    console.error("Database insert failed:", dbError)
    return new Response(JSON.stringify({ error: dbError.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    })
  }
})
