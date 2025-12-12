"use client"

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { useEffect, useState } from "react"

export function AnalyticsWrapper() {
  const [shouldTrack, setShouldTrack] = useState(false)

  useEffect(() => {
    // Only track on the production domain
    // We strictly check against salimsilver.com to exclude other URLs like salimsilver.vercel.app
    const hostname = window.location.hostname
    if (hostname === "salimsilver.com" || hostname === "www.salimsilver.com") {
      setShouldTrack(true)
    }
  }, [])

  // If we are not in the correct domain, do not render analytics
  if (!shouldTrack) {
    return null
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
