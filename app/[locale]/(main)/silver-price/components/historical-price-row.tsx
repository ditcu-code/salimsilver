"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Triangle } from "lucide-react"
import { useEffect, useState } from "react"

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
  const [showPercentage, setShowPercentage] = useState(false)
  const priceChange = currentPrice - historicalPrice
  const percentageChange = (priceChange / historicalPrice) * 100
  const isUp = priceChange >= 0
  const isSame = priceChange === 0

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPercentage((prev) => !prev)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

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
            className={`flex min-w-[70px] items-center justify-end text-xs font-medium ${trendColor} overflow-hidden`}
          >
            <div className="relative grid h-4 w-full place-items-end">
              <AnimatePresence mode="wait" initial={false}>
                {showPercentage ? (
                  <motion.div
                    key="percentage"
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="col-start-1 row-start-1 flex items-center justify-end tabular-nums"
                  >
                    <Triangle className={`mr-1 h-2 w-2 fill-current ${!isUp && "rotate-180"}`} />
                    {Math.abs(percentageChange).toFixed(2)}%
                  </motion.div>
                ) : (
                  <motion.div
                    key="nominal"
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="col-start-1 row-start-1 flex items-center justify-end tabular-nums"
                  >
                    <Triangle className={`mr-1 h-2 w-2 fill-current ${!isUp && "rotate-180"}`} />
                    <AnimatedCurrency value={Math.abs(priceChange)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
