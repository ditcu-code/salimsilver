"use client"

import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script"
import { useEffect, useState } from "react"

export function AnalyticsWrapper() {
  const [shouldTrack, setShouldTrack] = useState(false)
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

  useEffect(() => {
    // Only track on the production domain
    // We strictly check against salimsilver.com to exclude other URLs like salimsilver.vercel.app
    const hostname = window.location.hostname
    if (hostname === "salimsilver.com" || hostname === "www.salimsilver.com") {
      setShouldTrack(true)
    }
  }, [])

  if (!shouldTrack) {
    return null
  }

  return (
    <>
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="lazyOnload"
          />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}
      <SpeedInsights />
    </>
  )
}
