"use client"

import { createClient } from "@/lib/supabase/client"
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
      // Check session storage to prevent spamming refreshes
      const storageKey = `viewed_post_${postId}`
      if (sessionStorage.getItem(storageKey)) return

      const supabase = createClient()

      try {
        await supabase.rpc("increment_post_views", { post_id: postId })
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
