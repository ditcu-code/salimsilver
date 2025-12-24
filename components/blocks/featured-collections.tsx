"use client"

import AnimatedButton from "@/components/ui/animated-button"
import { useHammerSound } from "@/hooks/use-hammer-sound"
import type { Collection } from "@/lib/types"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface FeaturedCollectionsProps {
  title?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  sectionClassName?: string
  containerClassName?: string
  collections?: Collection[]
}

export default function FeaturedCollections({
  title,
  description,
  ctaLabel,
  ctaHref,
  sectionClassName,
  containerClassName = "max-w-7xl mx-auto",
  collections = [],
}: FeaturedCollectionsProps = {}) {
  const { playHammerSound } = useHammerSound()

  const shouldRenderSection = Boolean(title || description || (ctaLabel && ctaHref))

  const grid = (
    <div className="no-scrollbar -mx-4 mb-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:gap-8 md:px-0 md:pb-0 lg:grid-cols-3">
      {collections.map((collection, index) => (
        <motion.div
          key={collection.slug}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="h-full min-w-[85vw] snap-center md:min-w-0"
        >
          <Link
            href={`/collections/${collection.slug}`}
            className="group block h-full"
            onClick={playHammerSound}
          >
            <div className="relative h-full overflow-hidden rounded-3xl bg-black shadow-md">
              {/* Image container with overlay */}
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={collection.coverImage || "/placeholder.svg?height=600&width=800"}
                  alt={collection.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
              </div>

              {/* Content positioned at the bottom */}
              <div className="absolute right-0 bottom-0 left-0 translate-y-0 transform p-6 transition-transform duration-300 group-hover:translate-y-0">
                <h3 className="mb-2 text-2xl text-white transition-colors group-hover:text-white/90">
                  {collection.title}
                </h3>
                <div className="flex flex-row justify-between">
                  <p className="line-clamp-2 text-sm text-white/80 transition-colors group-hover:text-white/90">
                    {collection.description}
                  </p>
                  <ArrowRight
                    size={18}
                    className="-translate-x-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )

  if (!shouldRenderSection) {
    return grid
  }

  return (
    <section className={cn("px-4 md:px-8", sectionClassName)}>
      <div className={cn(containerClassName)}>
        {(title || description) && (
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {title && <h2 className="font-display mb-4 text-3xl md:text-4xl">{title}</h2>}
            {description && (
              <p className="text-muted-foreground mx-auto max-w-2xl">{description}</p>
            )}
          </motion.div>
        )}
        {grid}
        {ctaLabel && ctaHref && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <AnimatedButton href={ctaHref} variant="primary" icon={<ArrowRight size={18} />}>
              {ctaLabel}
            </AnimatedButton>
          </motion.div>
        )}
      </div>
    </section>
  )
}
