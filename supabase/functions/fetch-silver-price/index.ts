import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"
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

  // 1. Attempt to Scrape (Primary)
  try {
    console.log("Attempting to scrape bullion-rates.com...")
    const response = await fetch("https://www.bullion-rates.com/silver/IDR/spot-price.htm")
    if (!response.ok) {
      throw new Error(`Scraper fetch failed: ${response.status}`)
    }
    const html = await response.text()
    const document = new DOMParser().parseFromString(html, "text/html")

    if (!document) throw new Error("Scraper validation failed: HTML parse error")

    // Extract Kilo Price
    const rows = document.querySelectorAll("table#dtDGrid tr")
    let kiloPriceRaw = ""

    for (const row of rows) {
      if (row.textContent.includes("Kilo")) {
        const rateElement = row.querySelector(".rate")
        if (rateElement) {
          kiloPriceRaw = rateElement.textContent.trim()
          break
        }
      }
    }

    if (!kiloPriceRaw) throw new Error("Scraper validation failed: 'Kilo' row not found")

    // Clean: "40.126.039" -> 40126039 (Handle both . and , as separators)
    const cleanedPrice = kiloPriceRaw.replace(/[.,]/g, "")
    priceIDR = parseInt(cleanedPrice, 10)

    if (isNaN(priceIDR) || priceIDR === 0) {
      throw new Error(`Scraper validation failed: Parsed price is invalid (${cleanedPrice})`)
    }

    // Extract Date from <span id="utc_1" dt="2025-12-29-13-30">
    const dateSpan = document.getElementById("utc_1")
    if (dateSpan) {
      const dtAttr = dateSpan.getAttribute("dt") // e.g. "2025-12-29-13-30"
      if (dtAttr) {
        const parts = dtAttr.split("-") // ["2025", "12", "29", "13", "30"]
        if (parts.length === 5) {
          const year = parseInt(parts[0], 10)
          const month = parseInt(parts[1], 10) - 1
          const day = parseInt(parts[2], 10)
          const hour = parseInt(parts[3], 10)
          const minute = parseInt(parts[4], 10)

          const scrapedDate = new Date(Date.UTC(year, month, day, hour, minute))
          if (!isNaN(scrapedDate.getTime())) {
            timestamp = scrapedDate.toISOString()
          }
        }
      }
    }

    is_api = false
    console.log(`Scrape successful: ${priceIDR} (Source: Scraper, Time: ${timestamp})`)
  } catch (scrapeError) {
    console.error("Scraping failed, switching to API fallback:", scrapeError.message)

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
          details: { scrape: scrapeError.message, api: apiError.message },
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

    return new Response(JSON.stringify({ success: true, data: insertPayload, is_api }), {
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
