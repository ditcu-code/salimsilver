"use client"

import { cn } from "@/lib/utils"
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { InstagramEmbed, TikTokEmbed } from "react-social-media-embed"

interface SocialMediaGalleryProps {
  urls: string[]
  className?: string
  title?: string
  previousLabel: string
  nextLabel: string
}

export function SocialMediaGallery({
  urls,
  className,
  title,
  previousLabel,
  nextLabel
}: SocialMediaGalleryProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const hasTikTok = urls.some((url) => url.includes("tiktok.com"))

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!carouselApi) return

    const updateSelectedIndex = () => {
      setSelectedIndex(carouselApi.selectedScrollSnap())
    }

    updateSelectedIndex()
    carouselApi.on("select", updateSelectedIndex)
    carouselApi.on("reInit", updateSelectedIndex)

    return () => {
      carouselApi.off("select", updateSelectedIndex)
      carouselApi.off("reInit", updateSelectedIndex)
    }
  }, [carouselApi])

  if (!isMounted) return null

  return (
    <section className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-primary mb-8 text-center font-serif text-3xl">
          {title}
        </h2>
        {hasTikTok ? (
          <Carousel
            setApi={setCarouselApi}
            aria-label={title}
            className="mx-auto w-full max-w-sm"
          >
            <CarouselContent>
              {urls.map((url, index) => (
                <CarouselItem
                  key={url}
                  className="flex min-h-[550px] justify-center"
                >
                  {index === selectedIndex ? (
                    url.includes("tiktok.com") ? (
                      <TikTokEmbed url={url} width={328} retryDisabled />
                    ) : (
                      <InstagramEmbed url={url} width={328} />
                    )
                  ) : null}
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-6 flex items-center justify-center gap-4">
              <CarouselPrevious
                aria-label={previousLabel}
                className="static translate-y-0"
              />
              <span
                aria-live="polite"
                aria-atomic="true"
                className="text-muted-foreground min-w-12 text-center text-sm tabular-nums"
              >
                {selectedIndex + 1} / {urls.length}
              </span>
              <CarouselNext
                aria-label={nextLabel}
                className="static translate-y-0"
              />
            </div>
          </Carousel>
        ) : (
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
                <InstagramEmbed url={url} width={328} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
