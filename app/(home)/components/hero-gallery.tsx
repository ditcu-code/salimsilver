"use client"

import Image from "next/image"
import { type ReactNode } from "react"

import { BentoGrid } from "@/components/blocks/hero-gallery-scroll-animation"
import { motion } from "framer-motion"

function FullBentoCell({ children, className }: { children: ReactNode; className?: string }) {
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
    <div className="relative w-full overflow-hidden bg-linear-to-br from-background via-secondary/30 to-background pt-24 pb-12 px-4 md:px-8">
      <BentoGrid variant="hero" className="h-full w-full gap-4 md:gap-6">
        {/* Cell 1: Title and Text (Top Left) */}
        <FullBentoCell className="flex flex-col justify-center items-start p-8 md:p-12 bg-background rounded-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <h1 className="font-display text-2xl md:text-4xl lg:text-5xl leading-[0.9] tracking-tight mb-4 text-foreground">
              Handcrafted silver jewelry that tells a story of elegance and tradition.
            </h1>
          </motion.div>
        </FullBentoCell>

        {/* Cell 2: Large Portrait Image (Right) */}
        <FullBentoCell className="relative overflow-hidden rounded-3xl h-full min-h-[400px]">
          <Image
            src="/images/hero-background.png" // Using existing image as placeholder for the model with hoop earrings
            alt="Model wearing statement gold hoop earrings"
            fill
            className="object-cover object-center"
            fetchPriority="high"
            loading="eager"
          />
        </FullBentoCell>

        {/* Cell 3: Portrait Image (Bottom Left) */}
        <FullBentoCell className="relative overflow-hidden rounded-3xl min-h-[300px]">
          <Image
            src="/images/rings-cover.png" // Using existing image
            alt="Model wearing gold earrings"
            fill
            className="object-cover object-center"
          />
        </FullBentoCell>

        {/* Cell 4: Landscape/Text Cell (Bottom Middle) */}
        <FullBentoCell className="relative overflow-hidden rounded-3xl min-h-[300px] bg-secondary flex flex-col justify-between p-6 items-end">
          <div className="relative w-full h-40 rounded-2xl overflow-hidden mb-4">
            <Image
              src="/images/necklaces-cover.png"
              alt="Model with red earrings"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="text-sm md:text-base text-right text-muted-foreground max-w-[200px]">
            Crafted by Salim artisans, each piece channels Javanese heritage into refined, modern
            elegance.
          </div>
        </FullBentoCell>
      </BentoGrid>
    </div>
  )
}
