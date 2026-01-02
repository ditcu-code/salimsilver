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
  let source = "goldprice"
  let timestamp = new Date().toISOString()

  // 1. Attempt to Fetch from goldprice.org (Primary)
  try {
    console.log("Attempting to fetch from goldprice.org...")
    const response = await fetch("https://data-asg.goldprice.org/dbXRates/IDR")

    if (!response.ok) {
      throw new Error(`Primary fetch failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("GoldPrice.org Response:", data)

    if (!data.items || data.items.length === 0) {
      throw new Error("Primary fetch validation failed: No items in response")
    }

    // Extract XAG Price (Silver per Ounce)
    const item = data.items[0]
    const xagPrice = item.xagPrice

    if (!xagPrice) {
      throw new Error("Primary fetch validation failed: xagPrice not found")
    }

    // Check for Anomaly (Extreme Change > 5%)
    // The user requested: "lihat data 24 sebelumnya, jika perubahan nya ekstrem ambil dari api saja"
    // We use pcXag (Percentage Change) as the indicator.
    if (item.pcXag && Math.abs(item.pcXag) > 5) {
      throw new Error(`Primary fetch validation failed: Anomaly detected (pcXag: ${item.pcXag}%)`)
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

    source = "goldprice" // Marking source explicitly
    console.log(`Primary fetch successful: ${priceIDR} (Source: goldprice.org, Time: ${timestamp})`)
  } catch (primaryError) {
    console.error("Primary fetch failed, switching to Scraper fallback:", primaryError.message)

    // 2. Fallback to Scraper (bullion-rates.com)
    try {
      console.log("Attempting to scrape from bullion-rates.com...")
      const response = await fetch("https://www.bullion-rates.com/silver/IDR/spot-price.htm", {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        },
      })
      if (!response.ok) {
        throw new Error(`Scraper fetch failed: ${response.status} ${response.statusText}`)
      }
      const html = await response.text()

      // Regex to find Kilo price
      // Target HTML structure: <td class="rate">38.355.773</td>...<td class="Unit">Kilo</td>
      // We use \s* to match newlines and whitespace between elements
      // Updated regex to include commas (,) because Supabase environment receives comma-separated numbers
      const regex = /<td class="rate">\s*([0-9\.,]+)\s*<\/td>\s*<td class="Unit">Kilo<\/td>/
      const match = html.match(regex)

      if (!match) {
        throw new Error("Scraper regex failed to find Kilo price")
      }

      const priceString = match[1] // e.g. "38.355.773" or "38,355,773"
      // Remove dots AND commas to get integer value
      const priceClean = priceString.replace(/[.,]/g, "")
      priceIDR = parseInt(priceClean, 10)

      if (isNaN(priceIDR) || priceIDR === 0) {
        throw new Error(`Scraped price invalid: ${priceString}`)
      }

      source = "bullion_rates" // Scraper source
      timestamp = new Date().toISOString() // Use current time
      console.log(`Scraper successful: ${priceIDR} (Source: bullion-rates.com)`)
    } catch (scraperError) {
      console.error("Scraper fallback failed, switching to API fallback:", scraperError.message)

      // 3. Fallback to metals.dev API
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
        console.log("Metals.dev API Response:", data)

        if (data.status !== "success") {
          throw new Error(`API Error: \n${JSON.stringify(data, null, 2)}`)
        }

        const apiPrice = data.metals.silver
        priceIDR = Math.round(apiPrice) // Save as integer with no decimal
        source = "metals_dev"

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
            details: {
              primary: primaryError.message,
              scraper: scraperError.message,
              api: apiError.message,
            },
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
        )
      }
    }
  }

  // 3. Insert into Database
  try {
    const insertPayload = {
      price_idr: priceIDR,
      updated_at: timestamp,
      source: source,
    }

    const { error } = await supabaseClient.from("silver_prices").insert(insertPayload)

    if (error) throw error

    // 4. Update Summary Cache
    try {
      const now = new Date()
      const getHistoricalPrice = async (daysAgo: number) => {
        const targetDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000).toISOString()
        const { data } = await supabaseClient
          .from("silver_prices")
          .select("price_idr")
          .lte("updated_at", targetDate)
          .order("updated_at", { ascending: false })
          .limit(1)
          .single()
        return data?.price_idr || null
      }

      const [price24h, price7d, price30d, price1y] = await Promise.all([
        getHistoricalPrice(1),
        getHistoricalPrice(7),
        getHistoricalPrice(30),
        getHistoricalPrice(365),
      ])

      const summaryPayload = {
        id: 1,
        price_idr: priceIDR,
        price_24h_ago: price24h,
        price_7d_ago: price7d,
        price_30d_ago: price30d,
        price_1y_ago: price1y,
        updated_at: timestamp,
      }

      const { error: summaryError } = await supabaseClient
        .from("silver_price_summary")
        .upsert(summaryPayload)

      if (summaryError) {
        console.error("Failed to update summary cache:", summaryError)
        // We don't throw here to avoid failing the whole request if just the cache update fails
      } else {
        console.log("Summary cache updated successfully")
      }
    } catch (cacheError) {
      console.error("Error updating summary cache:", cacheError)
    }

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
