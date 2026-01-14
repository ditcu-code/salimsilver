import { useEffect, useState } from "react"

export function usePriceTrend(currentPrice: number, previousPrice: number) {
  const priceChange = currentPrice - previousPrice
  const percentageChange = previousPrice !== 0 ? (priceChange / previousPrice) * 100 : 0
  const isUp = priceChange >= 0
  const isSame = priceChange === 0

  const [showPercentage, setShowPercentage] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPercentage((prev) => !prev)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return {
    priceChange,
    percentageChange,
    isUp,
    isSame,
    showPercentage,
  }
}
