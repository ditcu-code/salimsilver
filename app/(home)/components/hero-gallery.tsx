"use client"

import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { type ReactNode, useRef } from "react"

import { BentoGrid } from "@/components/blocks/hero-gallery-scroll-animation"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
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
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  return (
    <div className="relative w-full overflow-hidden bg-linear-to-br from-background via-secondary/30 to-background pt-24 pb-12 px-4 md:px-8">
      {/* Desktop View */}
      <BentoGrid variant="hero" className="h-full w-full gap-4 md:gap-6 hidden md:grid">
        {/* ... existing desktop content ... */}
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
          <div className="text-sm md:text-base text-right text-primary max-w-[200px]">
            Crafted by Salim artisans, each piece channels Javanese heritage into refined, modern
            elegance.
          </div>
        </FullBentoCell>
      </BentoGrid>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full text-center"
        >
          <h1 className="font-display text-3xl leading-[0.9] tracking-tight my-15 px-6 text-foreground">
            Handcrafted silver jewelry that tells a story of elegance and tradition.
          </h1>
        </motion.div>

        <Carousel
          className="w-full max-w-xs mx-auto"
          opts={{ loop: true }}
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            <CarouselItem>
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-3xl">
                <Image
                  src="/images/hero-background.png"
                  alt="Model wearing statement gold hoop earrings"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-3xl">
                <Image
                  src="/images/rings-cover.png"
                  alt="Model wearing gold earrings"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </CarouselItem>
            <CarouselItem>
               <div className="relative aspect-3/4 w-full overflow-hidden rounded-3xl">
                <Image
                  src="/images/necklaces-cover.png"
                  alt="Model with red earrings"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
          <div className="flex justify-center mt-4 gap-1">
             {/* Custom dots or indicators could go here if needed, but standard Carousel might have them or we can rely on swipe */}
          </div>
        </Carousel>
        
         <div className="text-sm text-center text-primary px-4">
            Crafted by Salim artisans, each piece channels Javanese heritage into refined, modern
            elegance.
          </div>
      </div>
    </div>
  )
}
