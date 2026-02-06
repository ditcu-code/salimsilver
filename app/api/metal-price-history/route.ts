import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get("type") as "gold" | "silver"
  const days = parseInt(searchParams.get("days") || "30")

  if (!type || (type !== "gold" && type !== "silver")) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 })
  }

  const supabase = await createClient()
  const tableName = type === "gold" ? "gold_prices" : "silver_prices"

  // Calculate the date from 'days' ago
  const date = new Date()
  date.setDate(date.getDate() - days)
  const fromDate = date.toISOString()

  const { data, error } = await supabase
    .from(tableName)
    .select("price_idr, updated_at")
    .gte("updated_at", fromDate)
    .order("updated_at", { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const chartData = data.map((item) => ({
    date: item.updated_at,
    price: type === "silver" ? item.price_idr / 1000 : item.price_idr,
  }))

  return NextResponse.json({ data: chartData })
}
