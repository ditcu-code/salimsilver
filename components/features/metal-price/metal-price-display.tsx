"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { PriceHistoryItem } from "@/lib/types"
import { sendGAEvent } from "@next/third-parties/google"
import Link from "next/link"
import { useState } from "react"
import { HistoricalPriceRow } from "./historical-price-row"
import { MetalPriceCard } from "./metal-price-card"
import { MetalPriceChart } from "./metal-price-chart"

// ...

export interface DisplayPrices {
  currentPrice: number
  previousPrice: number
  price7d: number
  price30d: number
  price180d: number
  price1y: number
  lastUpdated: string
}

interface MetalPriceDisplayProps {
  displayPrices: DisplayPrices
  chartData: PriceHistoryItem[]
  enableTaxToggle?: boolean
  relatedMetal?: {
    name: string
    href: string
  }
}

export function MetalPriceDisplay({
  displayPrices,
  chartData,
  enableTaxToggle = true,
  relatedMetal,
}: MetalPriceDisplayProps) {
  const {
    currentPrice,
    previousPrice,
    price7d,
    price30d,
    price180d,
    price1y,
    lastUpdated,
  } = displayPrices

  const [includeTax, setIncludeTax] = useState(false)

  // Force tax to 1 (no tax) if toggle is disabled
  const taxMultiplier = enableTaxToggle && includeTax ? 1.11 : 1
  const currentPriceDisplay = currentPrice * taxMultiplier
  const previousPriceDisplay = previousPrice * taxMultiplier

  const price7dDisplay = price7d * taxMultiplier
  const price30dDisplay = price30d * taxMultiplier
  const price180dDisplay = price180d * taxMultiplier
  const price1yDisplay = price1y * taxMultiplier

  // Apply tax multiplier to chart data
  const chartDataDisplay = chartData.map((item) => ({
    ...item,
    price: item.price * taxMultiplier,
  }))

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col items-center justify-center gap-6 mb-8">
        {enableTaxToggle && (
          <div className="flex items-center space-x-2">
            <Switch
              id="ppn-mode"
              checked={includeTax}
              onCheckedChange={(checked) => {
                setIncludeTax(checked)
                sendGAEvent("event", "toggle_ppn", {
                  value: checked ? "on" : "off",
                })
              }}
            />
            <Label htmlFor="ppn-mode">Termasuk PPN 11%</Label>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 items-start lg:grid-cols-3">
        {/* Left Column: Chart (Takes 2/3 width) - Order 3 on Mobile, Order 1 on Desktop */}
        <div className="order-3 lg:order-1 lg:col-span-2">
          <MetalPriceChart
            type={relatedMetal?.name === "Perak" ? "gold" : "silver"}
            color={"#b0714a"}
            data={chartDataDisplay}
            latestPrice={currentPriceDisplay}
            className="min-h-[450px]"
          />
        </div>

        {/* Right Column: Sticky Sidebar (Takes 1/3 width) - Order 1 & 2 on Mobile, Order 2 on Desktop */}
        <div className="order-1 lg:order-2 lg:col-span-1 space-y-6 lg:sticky lg:top-24">
          <MetalPriceCard
            includeTax={enableTaxToggle && includeTax}
            currentPriceDisplay={currentPriceDisplay}
            previousPriceDisplay={previousPriceDisplay}
            lastUpdated={lastUpdated}
          />

          <Card className="border-border/30 bg-card shadow-sm">
            <CardContent className="space-y-2 p-0 px-6 py-3">
              <div className="divide-muted divide-y">
                <HistoricalPriceRow
                  label="1 Minggu Lalu"
                  historicalPrice={price7dDisplay}
                  currentPrice={currentPriceDisplay}
                />
                <HistoricalPriceRow
                  label="1 Bulan Lalu"
                  historicalPrice={price30dDisplay}
                  currentPrice={currentPriceDisplay}
                />
                <HistoricalPriceRow
                  label="6 Bulan Lalu"
                  historicalPrice={price180dDisplay}
                  currentPrice={currentPriceDisplay}
                />
                <HistoricalPriceRow
                  label="1 Tahun Lalu"
                  historicalPrice={price1yDisplay}
                  currentPrice={currentPriceDisplay}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {relatedMetal && (
        <div className="flex justify-center pt-4">
          <Button variant="outline" className="rounded-full" asChild>
            <Link
              href={relatedMetal.href}
              onClick={() => {
                sendGAEvent("event", "click_related_metal_price", {
                  metal: relatedMetal.name,
                })
              }}
            >
              Lihat Harga {relatedMetal.name}
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
