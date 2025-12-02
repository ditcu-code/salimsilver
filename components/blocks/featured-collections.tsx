"use client"

import AnimatedButton from "@/components/ui/animated-button"
import { useShutterSound } from "@/hooks/use-shutter-sound"
import { getFeaturedCollections } from "@/lib/collections"
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
}

export default function FeaturedCollections({
  title,
  description,
  ctaLabel,
  ctaHref,
  sectionClassName,
  containerClassName = "max-w-7xl mx-auto",
}: FeaturedCollectionsProps = {}) {
  const collections = getFeaturedCollections()
  const { playShutterSound } = useShutterSound()

  const shouldRenderSection = Boolean(title || description || (ctaLabel && ctaHref))

  const grid = (
    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 md:pb-0 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
      {collections.map((collection, index) => (
        <motion.div
          key={collection.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="h-full min-w-[85vw] snap-center md:min-w-0"
        >
          <Link
            href={`/collections/${collection.slug}`}
            className="group block h-full"
            onClick={playShutterSound}
          >
            <div className="relative h-full overflow-hidden bg-black rounded-3xl shadow-md">
              {/* Image container with overlay */}
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={collection.coverImage || "/placeholder.svg?height=600&width=800"}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
              </div>

              {/* Content positioned at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl text-white mb-2 group-hover:text-white/90 transition-colors">
                  {collection.title}
                </h3>
                <p className="text-white/80 mb-4 line-clamp-2 text-sm group-hover:text-white/90 transition-colors">
                  {collection.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {collection.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full text-xs bg-white/20 text-white backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
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
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {title && (
              <h2 className="text-3xl md:text-4xl mb-4 font-display">
                {title}
              </h2>
            )}
            {description && <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>}
          </motion.div>
        )}
        {grid}
        {ctaLabel && ctaHref && (
          <motion.div
            className="text-center mt-12"
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
