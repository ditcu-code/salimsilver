"use client"

import { motion } from "framer-motion"
import Script from "next/script"
import { useCallback, useEffect } from "react"

import { cn } from "@/lib/utils"

export type SocialMediaItem =
  | {
      platform: "tiktok"
      url: string
      videoId: string
    }
  | {
      platform: "instagram"
      url: string
      embedHtml: string | null
    }

interface SocialMediaGalleryProps {
  items: SocialMediaItem[]
  className?: string
  title: string
  instagramFallbackLabel: string
}

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process?: () => void
      }
    }
  }
}

const TIKTOK_PLAYER_PARAMS =
  "controls=1&progress_bar=0&timestamp=0&music_info=0&description=0&rel=0&autoplay=0&loop=0"

export function SocialMediaGallery({
  items,
  className,
  title,
  instagramFallbackLabel
}: SocialMediaGalleryProps) {
  const hasInstagram = items.some((item) => item.platform === "instagram")
  const processInstagramEmbeds = useCallback(() => {
    window.instgrm?.Embeds?.process?.()
  }, [])

  useEffect(() => {
    if (hasInstagram) processInstagramEmbeds()
  }, [hasInstagram, items, processInstagramEmbeds])

  return (
    <section className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-primary mb-8 text-center font-serif text-3xl">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.url}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              data-social-platform={item.platform}
              className="group relative flex min-w-0 justify-center hover:z-10"
            >
              {item.platform === "tiktok" ? (
                <iframe
                  src={`https://www.tiktok.com/player/v1/${item.videoId}?${TIKTOK_PLAYER_PARAMS}`}
                  title={`${title} ${index + 1}`}
                  loading="lazy"
                  allow="fullscreen"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  data-social-platform="tiktok"
                  className="aspect-[9/16] w-full max-w-[360px] rounded-xl border-0"
                />
              ) : item.embedHtml ? (
                <div
                  className="w-full max-w-[540px] [&_.instagram-media]:!mx-auto [&_.instagram-media]:!min-w-0 [&_.instagram-media]:!w-full"
                  dangerouslySetInnerHTML={{ __html: item.embedHtml }}
                />
              ) : (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border bg-card text-card-foreground flex aspect-[9/16] w-full max-w-[360px] items-center justify-center rounded-xl border p-6 text-center font-medium underline-offset-4 hover:underline"
                >
                  {instagramFallbackLabel}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      {hasInstagram ? (
        <Script
          id="instagram-embed-script"
          src="https://www.instagram.com/embed.js"
          strategy="lazyOnload"
          onReady={processInstagramEmbeds}
        />
      ) : null}
    </section>
  )
}
