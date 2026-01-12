"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { sendGAEvent } from "@next/third-parties/google"
import { Triangle } from "lucide-react"
import { useState } from "react"
import { AnimatedCurrency } from "./animated-currency"
import { PriceCard } from "./price-cards"

interface SilverPriceDisplayProps {
  currentPrice: number
  previousPrice: number
  price7d: number
  lastUpdated: string
}

export function SilverPriceDisplay({
  currentPrice,
  previousPrice,
  price7d,
  lastUpdated,
}: SilverPriceDisplayProps) {
  const [includeTax, setIncludeTax] = useState(false)

  const taxMultiplier = includeTax ? 1.11 : 1
  const currentPriceDisplay = currentPrice * taxMultiplier
  const price7dDisplay = price7d * taxMultiplier
  const priceChange7d = currentPriceDisplay - price7dDisplay
  const isUp7d = priceChange7d >= 0
  const isSame7d = priceChange7d === 0

  const trendColor7d = isSame7d
    ? "text-muted-foreground"
    : isUp7d
      ? "text-green-600 dark:text-green-400"
      : "text-red-600 dark:text-red-400"

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
        <CardContent className="flex items-center justify-between space-x-4 py-3">
          <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
            1 Minggu Lalu
          </span>
          <div className="flex items-center space-x-6">
            <span className="text-foreground text-sm font-semibold tabular-nums">
              <AnimatedCurrency value={price7dDisplay} />
            </span>
            {!isSame7d && (
              <div className={`flex items-center text-xs font-medium ${trendColor7d}`}>
                <Triangle className={`mr-0.5 h-2 w-2 fill-current ${!isUp7d && "rotate-180"}`} />
                <AnimatedCurrency value={Math.abs(priceChange7d)} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
