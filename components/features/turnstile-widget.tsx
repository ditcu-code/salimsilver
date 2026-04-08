"use client"

import Script from "next/script"
import { useCallback, useEffect, useRef, useState } from "react"

interface TurnstileWidgetProps {
  onTokenChange: (token: string) => void
  resetKey: number
}

interface TurnstileRenderOptions {
  sitekey: string
  theme?: "auto" | "light" | "dark"
  size?: "normal" | "flexible" | "compact"
  appearance?: "always" | "execute" | "interaction-only"
  callback?: (token: string) => void
  "error-callback"?: () => void
  "expired-callback"?: () => void
  "timeout-callback"?: () => void
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileRenderOptions) => string
      reset: (widgetId?: string) => void
      remove: (widgetId?: string) => void
    }
  }
}

const TURNSTILE_SCRIPT_URL =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"

export function TurnstileWidget({
  onTokenChange,
  resetKey,
}: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const lastResetKeyRef = useRef(resetKey)
  const [scriptReady, setScriptReady] = useState(false)

  const handleTokenCleared = useCallback(() => {
    onTokenChange("")
  }, [onTokenChange])

  const renderWidget = useCallback(() => {
    if (!siteKey || !scriptReady || !containerRef.current || !window.turnstile) {
      return
    }

    if (widgetIdRef.current) {
      return
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: "auto",
      size: "flexible",
      appearance: "interaction-only",
      callback: onTokenChange,
      "error-callback": handleTokenCleared,
      "expired-callback": handleTokenCleared,
      "timeout-callback": handleTokenCleared,
    })
  }, [handleTokenCleared, onTokenChange, scriptReady, siteKey])

  useEffect(() => {
    if (window.turnstile) {
      setScriptReady(true)
    }
  }, [])

  useEffect(() => {
    renderWidget()
  }, [renderWidget])

  useEffect(() => {
    if (resetKey === lastResetKeyRef.current) {
      return
    }

    lastResetKeyRef.current = resetKey
    onTokenChange("")

    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current)
    }
  }, [onTokenChange, resetKey])

  useEffect(() => {
    return () => {
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [])

  if (!siteKey) {
    return null
  }

  return (
    <>
      <Script
        src={TURNSTILE_SCRIPT_URL}
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <div ref={containerRef} />
    </>
  )
}
