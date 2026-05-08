"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PriceHistoryItem } from "@/lib/types"
import { sendGAEvent } from "@next/third-parties/google"
import Link from "next/link"
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
  relatedMetal?: {
    name: string
    href: string
  }
}

export function MetalPriceDisplay({
  displayPrices,
  chartData,
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

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 gap-8 items-start lg:grid-cols-3">
        {/* Left Column: Chart (Takes 2/3 width) - Order 3 on Mobile, Order 1 on Desktop */}
        <div className="order-3 lg:order-1 lg:col-span-2">
          <MetalPriceChart
            type={relatedMetal?.name === "Perak" ? "gold" : "silver"}
            color={"#b0714a"}
            data={chartData}
            latestPrice={currentPrice}
            className="min-h-[450px]"
          />
        </div>

        {/* Right Column: Sticky Sidebar (Takes 1/3 width) - Order 1 & 2 on Mobile, Order 2 on Desktop */}
        <div className="order-1 lg:order-2 lg:col-span-1 space-y-6 lg:sticky lg:top-24">
          <MetalPriceCard
            currentPriceDisplay={currentPrice}
            previousPriceDisplay={previousPrice}
            lastUpdated={lastUpdated}
          />

          <Card className="border-border/30 bg-card shadow-sm">
            <CardContent className="space-y-2 p-0 px-6 py-3">
              <div className="divide-muted divide-y">
                <HistoricalPriceRow
                  label="1 Minggu Lalu"
                  historicalPrice={price7d}
                  currentPrice={currentPrice}
                />
                <HistoricalPriceRow
                  label="1 Bulan Lalu"
                  historicalPrice={price30d}
                  currentPrice={currentPrice}
                />
                <HistoricalPriceRow
                  label="6 Bulan Lalu"
                  historicalPrice={price180d}
                  currentPrice={currentPrice}
                />
                <HistoricalPriceRow
                  label="1 Tahun Lalu"
                  historicalPrice={price1y}
                  currentPrice={currentPrice}
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
