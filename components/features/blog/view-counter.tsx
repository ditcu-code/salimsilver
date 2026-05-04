"use client"

import { useEffect, useRef } from "react"

interface ViewCounterProps {
  postId: string
}

export function ViewCounter({ postId }: ViewCounterProps) {
  const hasIncremented = useRef(false)

  useEffect(() => {
    // Prevent double counting in Strict Mode or if re-mounting
    if (hasIncremented.current) return

    const incrementView = async () => {
      // Prevention: Only count views on production domain
      if (window.location.hostname !== "salimsilver.com") return

      // Check session storage to prevent spamming refreshes
      const storageKey = `viewed_post_${postId}`
      if (sessionStorage.getItem(storageKey)) return

      try {
        const response = await fetch("/api/blog/views", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId }),
          cache: "no-store",
          keepalive: true,
        })

        if (!response.ok) {
          throw new Error(`View increment failed: ${response.status}`)
        }

        sessionStorage.setItem(storageKey, "true")
        hasIncremented.current = true
      } catch (error) {
        console.error("Error incrementing view count:", error)
      }
    }

    incrementView()
  }, [postId])

  return null
}
