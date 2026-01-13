"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { sendGAEvent } from "@next/third-parties/google"
import { useState } from "react"
import { HistoricalPriceRow } from "./historical-price-row"
import { PriceCard } from "./price-cards"

interface SilverPriceDisplayProps {
  currentPrice: number
  previousPrice: number
  price7d: number
  price30d: number
  price180d: number
  price1y: number
  lastUpdated: string
}

export function SilverPriceDisplay({
  currentPrice,
  previousPrice,
  price7d,
  price30d,
  price180d,
  price1y,
  lastUpdated,
}: SilverPriceDisplayProps) {
  const [includeTax, setIncludeTax] = useState(false)

  const taxMultiplier = includeTax ? 1.11 : 1
  const currentPriceDisplay = currentPrice * taxMultiplier

  const price7dDisplay = price7d * taxMultiplier
  const price30dDisplay = price30d * taxMultiplier
  const price180dDisplay = price180d * taxMultiplier
  const price1yDisplay = price1y * taxMultiplier

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-center justify-center space-x-2">
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

      <PriceCard
        includeTax={includeTax}
        currentPrice={currentPrice}
        previousPrice={previousPrice}
        lastUpdated={lastUpdated}
      />

      <Card className="border-border/30 bg-card/30 mt-10 shadow-sm backdrop-blur-sm">
        <CardContent className="divide-border/50 grid gap-4 divide-y p-6 sm:grid-cols-2 sm:gap-8 sm:divide-x sm:divide-y-0">
          <div className="space-y-1">
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
          </div>
          <div className="space-y-1 pt-4 sm:pt-0 sm:pl-8">
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
  )
}
