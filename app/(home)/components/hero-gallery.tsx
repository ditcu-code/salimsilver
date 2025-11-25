"use client"

import Image from "next/image"
import { type ReactNode } from "react"

import AnimatedButton from "@/components/animated-button"
import { BentoGrid } from "@/components/blocks/hero-gallery-scroll-animation"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const IMAGES = [
  { src: "/images/hero-background.png", alt: "Handcrafted silver jewelry displayed on woven fabric" },
  { src: "/images/rings-cover.png", alt: "Close-up of ornate silver rings from Salim Silver" },
  { src: "/images/necklaces-cover.png", alt: "Silver necklaces with intricate Javanese motifs" },
  { src: "/images/bracelets-cover.png", alt: "Engraved silver bracelets from the collection" },
  { src: "/images/hero-background.png", alt: "Handcrafted silver jewelry displayed on woven fabric" },
]

function FullBentoCell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={`relative ${className ?? ""}`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export function HeroGallery() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <BentoGrid className="absolute inset-0 z-0 h-full w-full p-4">
        {IMAGES.map((image, index) => (
          <FullBentoCell key={index} className="overflow-hidden rounded-3xl shadow-xl">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover object-center"
              priority={index === 0}
            />
          </FullBentoCell>
        ))}
      </BentoGrid>

      <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="max-w-4xl text-5xl md:text-7xl tracking-tighter text-secondary text-backdrop-invert font-cormorantGaramond"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Salim Silver
          </motion.h1>
          <motion.p
            className="my-4 max-w-xl text-secondary text-lg md:text-xl font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Handcrafted silver jewelry that tells a story of elegance and tradition.
          </motion.p>
          <div className="flex items-center flex-col md:flex-row justify-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <AnimatedButton href="/catalog" variant="outline" icon={<ArrowRight size={16} />}>
                View Catalog
              </AnimatedButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <AnimatedButton href="/about" variant="outline" icon={<ArrowRight size={16} />}>
                Our Story
              </AnimatedButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
