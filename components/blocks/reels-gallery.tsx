"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { InstagramEmbed } from "react-social-media-embed"

interface ReelsGalleryProps {
  reels: string[]
  className?: string
}

export function ReelsGallery({ reels, className }: ReelsGalleryProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <section className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-primary mb-8 text-center font-serif text-3xl">Captured Moments</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reels.map((url, index) => (
            <motion.div
              key={url}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative flex justify-center hover:z-10"
            >
              <div className="w-full max-w-[328px] overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-xl">
                <InstagramEmbed url={url} width={328} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
