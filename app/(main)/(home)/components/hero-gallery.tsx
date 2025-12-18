"use client"

import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { type ReactNode, useRef } from "react"

import { BentoGrid } from "@/components/blocks/hero-gallery-scroll-animation"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { SUPABASE_CATALOG_URL } from "@/lib/constants"
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
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))

  return (
    <div className="from-background via-secondary/80 to-background relative w-full overflow-hidden bg-linear-to-tl px-4 pt-24 pb-12 md:h-screen md:px-8">
      {/* Desktop View */}
      <BentoGrid variant="hero" className="hidden h-full w-full gap-4 md:grid md:gap-6">
        {/* Cell 1: Title and Text (Top Left) */}
        <FullBentoCell className="bg-background flex flex-col items-start justify-center rounded-3xl p-8 md:p-12">
          <div className="w-full">
            <h1 className="font-display text-foreground mb-4 text-2xl leading-[0.9] tracking-tight md:text-4xl lg:text-5xl">
              Handcrafted silver jewelry that tells a story of elegance and tradition
            </h1>
          </div>
        </FullBentoCell>

        {/* Cell 2: Large Portrait Image (Right) */}
        <FullBentoCell className="relative h-full overflow-hidden rounded-3xl">
          <Image
            src="/images/jono-setting-filigree.webp"
            alt="Artisan creating intricate silver filigree"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
            fetchPriority="high"
            loading="eager"
          />
        </FullBentoCell>

        {/* Cell 3: Portrait Image (Bottom Left) */}
        <FullBentoCell className="relative h-full overflow-hidden rounded-3xl">
          <Image
            src={`${SUPABASE_CATALOG_URL}/hand-carved-silver-floral-relief-cuff-bracelet-salimsilver.webp`}
            alt="Hand carved silver floral relief cuff bracelet"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-center"
          />
        </FullBentoCell>

        {/* Cell 4: Image and Text (Bottom Middle) */}
        <div className="flex flex-col gap-4 md:gap-6">
          <FullBentoCell className="relative flex-2 overflow-hidden rounded-3xl">
            <Image
              src={`${SUPABASE_CATALOG_URL}/silver-pagoda-ring-pearl-salimsilver.webp`}
              alt="Silver pagoda ring with pearl"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center"
            />
          </FullBentoCell>

          {/* Cell 5: Text (Bottom Right) */}
          <FullBentoCell className="bg-secondary flex flex-1 items-center justify-center rounded-3xl px-6">
            <div className="text-primary text-center text-sm md:text-base">
              Crafted by Salim artisans, each piece channels Javanese heritage into refined, modern
              elegance.
            </div>
          </FullBentoCell>
        </div>
      </BentoGrid>

      {/* Mobile View */}
      <div className="flex flex-col gap-6 md:hidden">
        <div className="w-full text-center">
          <h1 className="font-display text-foreground my-12 px-6 text-3xl leading-[0.9] tracking-tight">
            Handcrafted silver jewelry that tells a story of elegance and tradition.
          </h1>
        </div>

        <Carousel
          className="mx-auto w-full max-w-xs"
          opts={{ loop: true }}
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            <CarouselItem>
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-3xl">
                <Image
                  src={`${SUPABASE_CATALOG_URL}/baroque-pearl-citrine-silver-brooch.webp`}
                  alt="Baroque pearl and citrine silver brooch"
                  fill
                  sizes="(max-width: 768px) 100vw, 1px"
                  className="object-cover object-center"
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-3xl">
                <Image
                  src={`${SUPABASE_CATALOG_URL}/hand-carved-silver-rings-couple-salimsilver.webp`}
                  alt="Hand carved silver couple rings"
                  fill
                  sizes="(max-width: 480px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-3xl">
                <Image
                  src={`${SUPABASE_CATALOG_URL}/silver-hibiscus-locket-purple-stone-pendant-necklace-salimsilver.webp`}
                  alt="Silver hibiscus locket with purple stone pendant"
                  fill
                  sizes="(max-width: 480px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
          <div className="mt-4 flex justify-center gap-1">
            {/* Custom dots or indicators could go here if needed, but standard Carousel might have them or we can rely on swipe */}
          </div>
        </Carousel>

        <div className="text-primary px-4 text-center text-sm">
          Crafted by Salim artisans, each piece channels Javanese heritage into refined, modern
          elegance.
        </div>
      </div>
    </div>
  )
}
