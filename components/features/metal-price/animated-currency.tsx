"use client"

import { memo, useMemo } from "react"

// Reuse a single Intl.NumberFormat instance — constructing it is expensive
const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
})

export function useFormattedCurrency(val: number) {
  return currencyFormatter.format(val)
}

/**
 * Renders a formatted IDR currency value.
 *
 * Previously used Framer Motion's `useSpring` + `useTransform` which called
 * `Intl.NumberFormat().format()` on every animation frame (~60x/s per instance).
 * With 7 simultaneous instances during PPN toggle, this caused ~420 format
 * calls/second — a major INP bottleneck on mobile.
 *
 * Now uses instant rendering with `memo` to avoid unnecessary re-renders.
 * The visual trade-off (no counting animation) is worth the INP improvement,
 * and instant price updates are better UX for financial data.
 */
export const AnimatedCurrency = memo(function AnimatedCurrency({
  value
}: {
  value: number
}) {
  const formatted = useMemo(
    () => currencyFormatter.format(Math.round(value)),
    [value]
  )

  return <span>{formatted}</span>
})
