import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    )

    const apiKey1 = Deno.env.get("METALS_DEV_API_KEY")
    const apiKey2 = Deno.env.get("METALS_DEV_API_KEY_2")

    if (!apiKey1) {
      throw new Error("Missing METALS_DEV_API_KEY environment variable")
    }

    let selectedApiKey = apiKey1

    // Deterministic rotation: Use Key 2 on variable 4-hour blocks if available
    // Example: 00-03 (Block 0, Even) -> Key 1
    //          04-07 (Block 1, Odd)  -> Key 2
    if (apiKey2) {
      const hour = new Date().getHours()
      const block = Math.floor(hour / 4)

      if (block % 2 !== 0) {
        selectedApiKey = apiKey2
        console.log(`Using API Key 2 (Hour: ${hour}, Block: ${block})`)
      } else {
        console.log(`Using API Key 1 (Hour: ${hour}, Block: ${block})`)
      }
    }

    // 1. Fetch Silver Price in IDR
    const response = await fetch(
      `https://api.metals.dev/v1/latest?api_key=${selectedApiKey}&currency=IDR&unit=g`
    )
    const data = await response.json()

    if (data.status !== "success") {
      throw new Error(`API Error: ${JSON.stringify(data)}`)
    }

    const priceIDR = data.metals.silver

    // Round IDR price to nearest integer
    const roundedPriceIDR = Math.round(priceIDR)

    // Use the timestamp from the metal data source
    const timestamp = data.timestamps.metal

    const insertPayload = {
      price_idr: roundedPriceIDR,
      updated_at: timestamp,
    }

    const { error } = await supabaseClient.from("silver_prices").insert(insertPayload)

    if (error) throw error

    return new Response(JSON.stringify({ success: true, data: insertPayload }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    })
  }
})
