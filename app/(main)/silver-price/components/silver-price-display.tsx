"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { PriceCard } from "./price-cards"

interface SilverPriceDisplayProps {
  currentPrice: number
  previousPrice: number
  lastUpdated: string
}

export function SilverPriceDisplay({
  currentPrice,
  previousPrice,
  lastUpdated,
}: SilverPriceDisplayProps) {
  const [includeTax, setIncludeTax] = useState(false)

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-center justify-center space-x-2">
        <Switch id="ppn-mode" checked={includeTax} onCheckedChange={setIncludeTax} />
        <Label htmlFor="ppn-mode">Termasuk PPN 11%</Label>
      </div>

      <PriceCard
        includeTax={includeTax}
        currentPrice={currentPrice}
        previousPrice={previousPrice}
        lastUpdated={lastUpdated}
      />
    </div>
  )
}
