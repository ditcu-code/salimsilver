"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"

import { Button } from "@/components/ui/button"
import { PriceHistoryItem } from "@/lib/types"
import { cn } from "@/lib/utils"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { startTransition, useCallback, useMemo, useState } from "react"

interface MetalPriceChartProps {
  type: "gold" | "silver"
  color?: string
  latestPrice?: number
  data: PriceHistoryItem[]
  className?: string
}

// Reuse Intl formatters — constructing them is expensive
const formattersGold: Record<string, Intl.NumberFormat> = {
  id: new Intl.NumberFormat("id-ID", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1
  }),
  nl: new Intl.NumberFormat("nl-NL", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1
  }),
  en: new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1
  })
}

const formattersSilver: Record<string, Intl.NumberFormat> = {
  id: new Intl.NumberFormat("id-ID", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 0
  }),
  nl: new Intl.NumberFormat("nl-NL", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 0
  }),
  en: new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 0
  })
}

export function MetalPriceChart({
  type,
  color = "#d4af37",
  latestPrice,
  data: initialData,
  className
}: MetalPriceChartProps) {
  const t = useTranslations("MetalPrice.Chart")
  const tDisplay = useTranslations("MetalPrice.Display")
  const locale = useLocale()
  const dateLocale =
    locale === "id" ? "id-ID" : locale === "nl" ? "nl-NL" : "en-US"

  const [period, setPeriod] = useState<"1w" | "1m" | "6m">("1w")
  const isGold = type === "gold"
  const compactFormatter = isGold
    ? formattersGold[locale] || formattersGold.en
    : formattersSilver[locale] || formattersSilver.en

  /**
   * Memoize the sorted data array. Previously, `[...initialData]` spread +
   * `.sort()` ran on every render, creating a new array and doing O(n log n)
   * comparison work each time — even when initialData hadn't changed.
   */
  const data = useMemo(() => {
    const arr = [...initialData]
    if (latestPrice && arr.length > 0) {
      arr.push({ date: new Date().toISOString(), price: latestPrice })
    }
    arr.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    return arr
  }, [initialData, latestPrice])

  // Memoize filtered data — only recompute when data or period changes
  const filteredData = useMemo(() => {
    if (!data.length) return []

    const now = new Date()
    const daysToSubtract = period === "1w" ? 7 : period === "1m" ? 30 : 180

    const cutoffDate = new Date()
    cutoffDate.setDate(now.getDate() - daysToSubtract)
    cutoffDate.setHours(0, 0, 0, 0)

    return data.filter((item) => new Date(item.date) >= cutoffDate)
  }, [data, period])

  // Memoize Y-axis domain calculation
  const { minPrice, maxPrice, padding } = useMemo(() => {
    if (filteredData.length === 0)
      return { minPrice: 0, maxPrice: 0, padding: 0 }

    const prices = filteredData.map((d) => d.price)
    const min = Math.min(...prices)
    const max = Math.max(...prices)
    return { minPrice: min, maxPrice: max, padding: (max - min) * 0.1 }
  }, [filteredData])

  // Memoize X-axis ticks — involves expensive toLocaleString calls
  const ticks = useMemo(
    () =>
      filteredData
        .map((item) => item.date)
        .filter((date, index) => {
          if (index === 0) return false
          const prevDate = new Date(filteredData[index - 1].date)
          const currDate = new Date(date)

          // Check for day change in WIB (UTC+7)
          const options: Intl.DateTimeFormatOptions = {
            timeZone: "Asia/Jakarta",
            day: "numeric"
          }

          const prevDay = prevDate.toLocaleString("en-US", options)
          const currDay = currDate.toLocaleString("en-US", options)

          return prevDay !== currDay
        }),
    [filteredData]
  )

  // Stable callback for Y-axis formatter — avoids creating new closure each render
  const yAxisFormatter = useCallback(
    (value: number) => compactFormatter.format(value),
    [compactFormatter]
  )

  // Stable callback for X-axis formatter
  const xAxisFormatter = useCallback(
    (date: string) => {
      return new Date(date).toLocaleDateString(dateLocale, {
        day: "numeric",
        month: "numeric",
        timeZone: "Asia/Jakarta"
      })
    },
    [dateLocale]
  )

  if (filteredData.length === 0) return null

  return (
    <Card className={cn("border-border/50 bg-card shadow-sm", className)}>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 space-y-0 pb-2">
        <CardTitle className="text-base font-normal">
          {tDisplay("chartTitle", {
            metal: isGold
              ? locale === "id"
                ? "Emas"
                : locale === "nl"
                  ? "Goud"
                  : "Gold"
              : locale === "id"
                ? "Perak"
                : locale === "nl"
                  ? "Zilver"
                  : "Silver"
          })}
        </CardTitle>
        <div className="flex items-center">
          <div className="flex items-center p-1 bg-muted rounded-lg gap-1">
            <Button
              variant={period === "1w" ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "h-7 px-3 text-xs",
                period === "1w" && "bg-background text-foreground shadow-sm"
              )}
              onClick={() => startTransition(() => setPeriod("1w"))}
            >
              {t("oneWeek")}
            </Button>
            <Button
              variant={period === "1m" ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "h-7 px-3 text-xs",
                period === "1m" && "bg-background text-foreground shadow-sm"
              )}
              onClick={() => startTransition(() => setPeriod("1m"))}
            >
              {t("oneMonth")}
            </Button>
            <Button
              variant={period === "6m" ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "h-7 px-3 text-xs",
                period === "6m" && "bg-background text-foreground shadow-sm"
              )}
              onClick={() => startTransition(() => setPeriod("6m"))}
            >
              {t("sixMonths")}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-4 px-4 sm:pr-6">
        <div className="h-[350px] w-full min-w-0 sm:h-[400px]">
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
                ticks={ticks}
                tickFormatter={xAxisFormatter}
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[minPrice - padding, maxPrice + padding]}
                tickFormatter={yAxisFormatter}
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={35}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-popover border-border rounded-lg border p-3 shadow-xl">
                        <div className="text-muted-foreground text-xs font-medium mb-1">
                          {new Date(label as string).toLocaleString(
                            dateLocale,
                            {
                              weekday: "long",
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              timeZone: "Asia/Jakarta"
                            }
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-foreground font-bold tabular-nums text-sm">
                            Rp{" "}
                            {Math.round(
                              payload[0].value as number
                            ).toLocaleString(dateLocale)}
                          </div>
                          {(() => {
                            const currentPrice = payload[0].value as number
                            const currentIndex = data.findIndex(
                              (item) => item.date === label
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
