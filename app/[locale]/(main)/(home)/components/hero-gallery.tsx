"use client"

import Autoplay from "embla-carousel-autoplay"
import { motion } from "framer-motion"
import Image from "next/image"
import { type ReactNode, useRef } from "react"

import { BentoGrid } from "@/components/blocks/hero-gallery-scroll-animation"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { SUPABASE_CATALOG_URL } from "@/lib/constants"
import { cn } from "@/lib/utils"

import { useTranslations } from "next-intl"

const CONTENT = {
  images: {
    heroPortrait: "/images/jono-setting-filigree.webp",
    heroPortraitBlur: "/images/jono-setting-filigree-blur.webp",
    floralCuff: `${SUPABASE_CATALOG_URL}/hand-carved-silver-floral-relief-cuff-bracelet-salimsilver.webp`,
    pagodaRing: `${SUPABASE_CATALOG_URL}/silver-pagoda-ring-pearl-salimsilver.webp`,
    brooch: `${SUPABASE_CATALOG_URL}/baroque-pearl-citrine-silver-brooch.webp`,
    coupleRings: `${SUPABASE_CATALOG_URL}/hand-carved-silver-rings-couple-salimsilver.webp`,
    locket: `${SUPABASE_CATALOG_URL}/silver-hibiscus-locket-purple-stone-pendant-necklace-salimsilver.webp`,
  },
} as const

function FullBentoCell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={cn("relative", className)}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

function HeroDesktop() {
  const t = useTranslations("HomePage.Hero")

  return (
    <BentoGrid variant="hero" className="hidden h-full w-full gap-4 md:grid md:gap-6">
      {/* Cell 1: Title */}
      <FullBentoCell className="bg-background flex flex-col items-start justify-center rounded-3xl p-8 md:p-12">
        <div className="w-full">
          <h1 className="font-display text-foreground mb-4 text-2xl leading-[0.9] tracking-tight md:text-4xl lg:text-5xl">
            {t("title")}
          </h1>
        </div>
      </FullBentoCell>

      {/* Cell 2: Large Portrait Image */}
      <FullBentoCell className="relative h-full overflow-hidden rounded-3xl">
        <Image
          src={CONTENT.images.heroPortrait}
          alt="Artisan creating intricate silver filigree"
          fill
          sizes="(max-width: 768px) 1px, 50vw"
          className="object-cover object-center"
          fetchPriority="high"
          loading="eager"
          quality={90}
          blurDataURL={CONTENT.images.heroPortraitBlur}
        />
      </FullBentoCell>

      {/* Cell 3: Portrait Image (Bottom Left) */}
      <FullBentoCell className="relative h-full overflow-hidden rounded-3xl">
        <Image
          src={CONTENT.images.floralCuff}
          alt="Hand carved silver floral relief cuff bracelet"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center"
          quality={50}
        />
      </FullBentoCell>

      {/* Cell 4: Container for Image + Text */}
      <div className="flex flex-col gap-4 md:gap-6">
        <FullBentoCell className="relative flex-2 overflow-hidden rounded-3xl">
          <Image
            src={CONTENT.images.pagodaRing}
            alt="Silver pagoda ring with pearl"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-center"
            quality={50}
          />
        </FullBentoCell>

        <FullBentoCell className="bg-secondary flex flex-1 items-center justify-center rounded-3xl px-6">
          <div className="text-primary text-center text-sm md:text-base">{t("description")}</div>
        </FullBentoCell>
      </div>
    </BentoGrid>
  )
}

function HeroMobile() {
  const t = useTranslations("HomePage.Hero")
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))

  return (
    <div className="flex h-full flex-col justify-evenly gap-4 md:hidden">
      <div className="w-full text-center">
        <h1 className="font-display text-foreground px-6 text-3xl leading-[0.9] tracking-tight">
          {t("title")}.
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
                src={CONTENT.images.brooch}
                alt="Baroque pearl and citrine silver brooch"
                fill
                sizes="(max-width: 320px) 100vw, (max-width: 768px) 320px, 1px"
                className="object-cover object-center"
                fetchPriority="high"
                loading="eager"
                quality={85}
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-3xl">
              <Image
                src={CONTENT.images.coupleRings}
                alt="Hand carved silver couple rings"
                fill
                sizes="(max-width: 480px) 100vw, 50vw"
                className="object-cover object-center"
                quality={85}
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-3xl">
              <Image
                src={CONTENT.images.locket}
                alt="Silver hibiscus locket with purple stone pendant"
                fill
                sizes="(max-width: 480px) 100vw, 50vw"
                className="object-cover object-center"
                quality={85}
              />
            </div>
          </CarouselItem>
        </CarouselContent>
        <div className="mt-4 flex justify-center gap-1" />
      </Carousel>

      <div className="text-primary px-4 text-center text-sm">{t("description")}</div>
    </div>
  )
}

export function HeroGallery() {
  return (
    <div className="from-background via-secondary/80 to-background relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] h-dvh w-screen overflow-hidden bg-linear-to-tl pt-24 pb-12">
      <div className="container mx-auto h-full px-4 md:px-8">
        <HeroDesktop />
        <HeroMobile />
      </div>
    </div>
  )
}
