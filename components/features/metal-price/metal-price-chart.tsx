"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { PriceHistoryItem } from "@/lib/types"

interface MetalPriceChartProps {
  type: "gold" | "silver"
  color?: string
  latestPrice?: number
  data: PriceHistoryItem[]
}

export function MetalPriceChart({
  type,
  color = "#d4af37",
  latestPrice,
  data: initialData,
}: MetalPriceChartProps) {
  // Append latest price if it exists
  const data = [...initialData]
  if (latestPrice && data.length > 0) {
    data.push({ date: new Date().toISOString(), price: latestPrice })
  }

  // Calculate min and max for Y-axis domain to make the chart look dynamic
  if (data.length === 0) return null

  const prices = data.map((d) => d.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const padding = (maxPrice - minPrice) * 0.1

  return (
    <Card className="border-border/50 bg-card shadow-sm mt-12">
      <CardHeader className="pb-4">
        <CardTitle className="text-base text-center font-bold text-muted-foreground">
          Grafik Harga {type === "gold" ? "Emas" : "Perak"} 30 Hari Terakhir
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-0 pb-4">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id={`gradient-${type}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tickFormatter={(date) => {
                  const d = new Date(date)
                  return `${d.getDate()}/${d.getMonth() + 1}`
                }}
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                minTickGap={30}
              />
              <YAxis
                domain={[minPrice - padding, maxPrice + padding]}
                tickFormatter={(value) => {
                  return new Intl.NumberFormat("id-ID", {
                    notation: "compact",
                    compactDisplay: "short",
                    maximumFractionDigits: 0,
                  }).format(value)
                }}
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={60}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-popover border-border rounded-lg border p-3 shadow-xl">
                        <div className="text-muted-foreground text-xs font-medium mb-1">
                          {new Date(label as string).toLocaleString("id-ID", {
                            weekday: "long",
                            day: "numeric",
                            month: "short", // shortened month to save space if needed, or keep long. Long is fine.
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                        <div className="text-foreground font-bold tabular-nums text-sm">
                          Rp{" "}
                          {Math.round(
                            payload[0].value as number,
                          ).toLocaleString("id-ID")}
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={color}
                fillOpacity={1}
                fill={`url(#gradient-${type})`}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
