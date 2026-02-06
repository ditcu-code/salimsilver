"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { sendGAEvent } from "@next/third-parties/google"
import Link from "next/link"
import { useState } from "react"
import { HistoricalPriceRow } from "./historical-price-row"
import { MetalPriceCard } from "./metal-price-card"

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
  enableTaxToggle?: boolean
  relatedMetal?: {
    name: string
    href: string
  }
}

export function MetalPriceDisplay({
  displayPrices,
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

  return (
    <div className="mx-auto max-w-7xl space-y-6">
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

      <MetalPriceCard
        includeTax={enableTaxToggle && includeTax}
        currentPriceDisplay={currentPriceDisplay}
        previousPriceDisplay={previousPriceDisplay}
        lastUpdated={lastUpdated}
      />

      <Card className="border-border/30 bg-card mt-10 shadow-sm">
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
