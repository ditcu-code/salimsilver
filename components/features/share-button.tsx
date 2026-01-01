"use client"

import { Button } from "@/components/ui/button"
import { sendGAEvent } from "@next/third-parties/google"
import { Check, Share2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface ShareButtonProps {
  title: string
  text?: string
  url?: string
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareUrl = url || window.location.href

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        })
        sendGAEvent("event", "share", {
          method: "navigator",
          content_type: "url",
          item_id: shareUrl,
        })
        return
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Error sharing:", error)
        }
      }
    }

    // Fallback to copy
    copyToClipboard(shareUrl)
  }

  const copyToClipboard = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true)
      toast.success("Link copied to clipboard")
      sendGAEvent("event", "share", {
        method: "clipboard",
        content_type: "url",
        item_id: textToCopy,
      })
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <Button variant="outline" size="sm" className="gap-2" onClick={handleShare}>
      {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      Share
    </Button>
  )
}
