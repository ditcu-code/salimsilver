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

import { Button } from "@/components/ui/button"
import { PriceHistoryItem } from "@/lib/types"
import { cn } from "@/lib/utils"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"
import { useState } from "react"

interface MetalPriceChartProps {
  type: "gold" | "silver"
  color?: string
  latestPrice?: number
  data: PriceHistoryItem[]
  className?: string
}

export function MetalPriceChart({
  type,
  color = "#d4af37",
  latestPrice,
  data: initialData,
  className,
}: MetalPriceChartProps) {
  // Append latest price if it exists
  const data = [...initialData]
  if (latestPrice && data.length > 0) {
    data.push({ date: new Date().toISOString(), price: latestPrice })
  }

  const [period, setPeriod] = useState("1B")

  // Filter data based on selected period
  const filteredData = (() => {
    if (!data.length) return []
    const sortedData = [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )

    const now = new Date()
    let daysToSubtract = 30 // Default 1B

    switch (period) {
      case "1M": // 1 Minggu
        daysToSubtract = 7
        break
      case "1B": // 1 Bulan
        daysToSubtract = 30
        break
      case "6B": // 6 Bulan
        daysToSubtract = 180
        break
      case "1T": // 1 Tahun
        daysToSubtract = 365
        break
      default:
        daysToSubtract = 30
    }

    const cutoffDate = new Date()
    cutoffDate.setDate(now.getDate() - daysToSubtract)

    return sortedData.filter((item) => new Date(item.date) >= cutoffDate)
  })()

  // Calculate min and max for Y-axis domain to make the chart look dynamic
  if (filteredData.length === 0) return null

  const prices = filteredData.map((d) => d.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const padding = (maxPrice - minPrice) * 0.1

  return (
    <Card className={cn("border-border/50 bg-card shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">Grafik Harga</CardTitle>
        <div className="flex items-center space-x-1">
          {[
            { key: "1M", label: "1 Minggu" },
            { key: "1B", label: "1 Bulan" },
            { key: "6B", label: "6 Bulan" },
            { key: "1T", label: "1 Tahun" },
          ].map((p) => (
            <Button
              key={p.key}
              variant={period === p.key ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setPeriod(p.key)}
              className="h-7 px-3 text-xs"
            >
              {p.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-4 pl-0 pr-4 sm:pr-6">
        <div className="h-[350px] w-full sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData}>
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
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-foreground font-bold tabular-nums text-sm">
                            Rp{" "}
                            {Math.round(
                              payload[0].value as number,
                            ).toLocaleString("id-ID")}
                          </div>
                          {(() => {
                            const currentPrice = payload[0].value as number
                            const currentIndex = data.findIndex(
                              (item) => item.date === label,
                            )
                            const prevItem =
                              currentIndex > 0 ? data[currentIndex - 1] : null

                            if (!prevItem) return null

                            const diff = currentPrice - prevItem.price
                            const percentage = (diff / prevItem.price) * 100
                            const isPositive = diff > 0
                            const isNegative = diff < 0
                            const isZero = diff === 0

                            return (
                              <div
                                className={`flex items-center text-xs font-medium ${
                                  isPositive
                                    ? "text-green-600"
                                    : isNegative
                                      ? "text-red-600"
                                      : "text-muted-foreground"
                                }`}
                              >
                                {isPositive && (
                                  <ArrowUp className="mr-1 h-3 w-3" />
                                )}
                                {isNegative && (
                                  <ArrowDown className="mr-1 h-3 w-3" />
                                )}
                                {isZero && <Minus className="mr-1 h-3 w-3" />}
                                {Math.abs(percentage).toFixed(2)}%
                              </div>
                            )
                          })()}
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
