"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { InstagramEmbed, TikTokEmbed } from "react-social-media-embed"

interface SocialMediaGalleryProps {
  urls: string[]
  className?: string
  title?: string
}

export function SocialMediaGallery({ urls, className, title }: SocialMediaGalleryProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <section className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-primary mb-8 text-center font-serif text-3xl">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {urls.map((url, index) => (
            <motion.div
              key={url}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative flex justify-center hover:z-10"
            >
              {url.includes("tiktok.com") ? (
                <TikTokEmbed url={url} width={328} />
              ) : (
                <InstagramEmbed url={url} width={328} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
