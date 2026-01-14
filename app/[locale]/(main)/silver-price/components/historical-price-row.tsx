import { Triangle } from "lucide-react"

import { AnimatedCurrency } from "./animated-currency"

export function HistoricalPriceRow({
  label,
  historicalPrice,
  currentPrice,
}: {
  label: string
  historicalPrice: number
  currentPrice: number
}) {
  const priceChange = currentPrice - historicalPrice
  const isUp = priceChange >= 0
  const isSame = priceChange === 0

  const trendColor = isSame
    ? "text-muted-foreground"
    : isUp
      ? "text-green-600 dark:text-green-400"
      : "text-red-600 dark:text-red-400"

  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
        {label}
      </span>
      <div className="flex items-center space-x-6">
        <span className="text-foreground text-sm font-semibold tabular-nums">
          <AnimatedCurrency value={historicalPrice} />
        </span>
        {!isSame && (
          <div
            className={`flex min-w-12 items-center justify-end text-xs font-medium ${trendColor}`}
          >
            <Triangle className={`mr-0.5 h-2 w-2 fill-current ${!isUp && "rotate-180"}`} />
            <AnimatedCurrency value={Math.abs(priceChange)} />
          </div>
        )}
      </div>
    </div>
  )
}
