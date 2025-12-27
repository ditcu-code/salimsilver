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

    const API_KEY = Deno.env.get("METALS_DEV_API_KEY")
    if (!API_KEY) {
      throw new Error("Missing METALS_DEV_API_KEY environment variable")
    }

    // 1. Fetch Silver Price in IDR
    const response = await fetch(
      `https://api.metals.dev/v1/latest?api_key=${API_KEY}&currency=IDR&unit=g`
    )
    const data = await response.json()

    if (data.status !== "success") {
      throw new Error(`API Error: ${JSON.stringify(data)}`)
    }

    const priceIDR = data.metals.silver
    const usdRate = data.currencies.USD

    // Calculate USD Price
    // Calculate USD Price
    // User requested to not save price_usd, but it is not null in DB, so set to 0.
    const priceUSD = 0

    // Round IDR price to nearest integer
    const roundedPriceIDR = Math.round(priceIDR)
    const timestamp = new Date().toISOString()

    const insertPayload = {
      price_usd: priceUSD,
      price_idr: roundedPriceIDR,
      source: "metals.dev",
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
