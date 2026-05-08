import { useSyncExternalStore } from "react"

/**
 * Module-level shared state for the percentage/nominal toggle.
 *
 * Previously, each component instance (5 total: 1 MetalPriceCard + 4
 * HistoricalPriceRow) had its own `setInterval` + `useState`. This caused:
 * - 5 independent intervals firing at staggered times
 * - Each firing a setState → re-render with AnimatePresence animations
 * - If any interval fires during a user interaction → INP spike
 *
 * Now uses a single shared interval via `useSyncExternalStore`:
 * - 1 interval instead of 5
 * - All 5 instances toggle simultaneously → React batches into 1 render pass
 * - Proper cleanup when all components unmount
 */
let _showPercentage = false
const _listeners = new Set<() => void>()
let _intervalId: ReturnType<typeof setInterval> | null = null
let _subscriberCount = 0

function subscribe(callback: () => void) {
  _listeners.add(callback)
  _subscriberCount++

  // Start interval only when first subscriber appears
  if (_subscriberCount === 1 && !_intervalId) {
    _intervalId = setInterval(() => {
      _showPercentage = !_showPercentage
      // Notify all subscribers in the same microtask → React batches them
      _listeners.forEach((l) => l())
    }, 5000)
  }

  return () => {
    _listeners.delete(callback)
    _subscriberCount--

    // Clean up interval when last subscriber unmounts
    if (_subscriberCount === 0 && _intervalId) {
      clearInterval(_intervalId)
      _intervalId = null
    }
  }
}

function getSnapshot() {
  return _showPercentage
}

export function usePriceTrend(currentPrice: number, previousPrice: number) {
  const priceChange = currentPrice - previousPrice
  const percentageChange =
    previousPrice !== 0 ? (priceChange / previousPrice) * 100 : 0
  const isUp = priceChange >= 0
  const isSame = priceChange === 0

  // All instances share a single external store → 1 interval, batched renders
  const showPercentage = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getSnapshot, // Server snapshot: always false
  )

  return {
    priceChange,
    percentageChange,
    isUp,
    isSame,
    showPercentage,
  }
}
