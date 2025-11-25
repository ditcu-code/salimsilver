"use client"

import { useCallback, useEffect, useRef } from "react"
import Image from "next/image"

import AnimatedButton from "@/components/animated-button"
import {
  BentoCell,
  BentoGrid,
  ContainerScale,
  ContainerScroll,
} from "./hero-gallery-scroll-animation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const IMAGES = [
  { src: "/images/hero-background.png", alt: "Handcrafted silver jewelry displayed on woven fabric" },
  { src: "/images/rings-cover.png", alt: "Close-up of ornate silver rings from Salim Silver" },
  { src: "/images/necklaces-cover.png", alt: "Silver necklaces with intricate Javanese motifs" },
  { src: "/images/bracelets-cover.png", alt: "Engraved silver bracelets from the collection" },
  { src: "/images/hero-background.png", alt: "Handcrafted silver jewelry displayed on woven fabric" },
]

const NAV_REVEAL_PROGRESS = 1

export function HeroGalleryScroll() {
  const isCondensedRef = useRef(false)

  const handleProgressChange = useCallback((value: number) => {
    const isCondensed = value >= NAV_REVEAL_PROGRESS
    if (isCondensedRef.current === isCondensed) return

    isCondensedRef.current = isCondensed
    document.body.dataset.heroCondensed = isCondensed ? "true" : "false"
    window.dispatchEvent(
      new CustomEvent("hero-condensed-change", { detail: { condensed: isCondensed } })
    )
  }, [])

  useEffect(() => {
    document.body.dataset.heroCondensed = "false"
    window.dispatchEvent(new CustomEvent("hero-condensed-change", { detail: { condensed: false } }))

    return () => {
      delete document.body.dataset.heroCondensed
      window.dispatchEvent(new CustomEvent("hero-condensed-change", { detail: { condensed: true } }))
    }
  }, [])

  return (
    <ContainerScroll className="h-[125vh]" onProgressChange={handleProgressChange}>
      <BentoGrid className="sticky left-0 top-0 z-0 h-screen w-full p-4">
        {IMAGES.map((image, index) => (
          <BentoCell key={index} className="relative overflow-hidden rounded-3xl shadow-xl">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover object-center"
              priority={index === 0}
            />
          </BentoCell>
        ))}
      </BentoGrid>

      <ContainerScale className="relative z-10 text-center" appearAt={NAV_REVEAL_PROGRESS}>
        <motion.h1
          className="max-w-4xl text-5xl md:text-7xl tracking-tighter text-primary text-backdrop-invert font-display"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Salim Silver
        </motion.h1>
        <motion.p
          className="my-6 max-w-xl text-primary text-lg md:text-xl font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Handcrafted silver jewelry that tells a story of elegance and tradition.
        </motion.p>
        <div className="flex items-center flex-col md:flex-row justify-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <AnimatedButton href="/catalog" variant="outline" icon={<ArrowRight size={16} />}>
              View Catalog
            </AnimatedButton>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <AnimatedButton href="/about" variant="outline" icon={<ArrowRight size={16} />}>
              Our Story
            </AnimatedButton>
          </motion.div>
        </div>
      </ContainerScale>
    </ContainerScroll>
  )
}

export function HeroDemo1() {
  return (
    <ContainerScroll className="h-[350vh]">
      <BentoGrid className="sticky left-0 top-0 z-0 h-screen w-full p-4">
        {IMAGES.map((image, index) => (
          <BentoCell key={index} className="relative overflow-hidden rounded-3xl shadow-xl">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover object-center"
              priority={index === 0}
            />
          </BentoCell>
        ))}
      </BentoGrid>

      <ContainerScale className="relative z-10 text-center">
        <h1 className="max-w-xl text-5xl font-bold tracking-tighter text-slate-800">
          Your Animated Hero
        </h1>
        <p className="my-6 max-w-xl text-sm text-slate-700 md:text-base">
          Yet another hero section, this time with scroll trigger animations, animating the hero
          content with motion.
        </p>
        <div className="flex items-center justify-center gap-4">
          <AnimatedButton href="/about" variant="outline" icon={<ArrowRight size={16} />}>
            Learn more about my journey
          </AnimatedButton>
          <Button variant="link" className="bg-transparent px-4 py-2 font-medium">
            Learn more
          </Button>
        </div>
      </ContainerScale>
    </ContainerScroll>
  )
}

export function HeroDemo2() {
  return (
    <ContainerScroll className="h-[350vh]">
      <BentoGrid variant="fourCells" className="sticky left-0 top-0 h-svh w-full p-4">
        {IMAGES.filter((_, index) => index <= 3).map((image, index) => (
          <BentoCell key={index} className="relative overflow-hidden rounded-3xl shadow-xl">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover object-center"
              priority={index === 0}
            />
          </BentoCell>
        ))}
      </BentoGrid>
      <ContainerScale className="text-center">
        <h1 className="max-w-xl text-5xl font-bold tracking-tighter">Your Animated Hero</h1>
        <p className="my-6 max-w-xl text-sm text-stone-500 md:text-base">
          Yet another hero section, this time with scroll trigger animations, animating the hero
          content with motion.
        </p>
        <div className="flex items-center justify-center gap-4">
          <AnimatedButton href="/about" variant="outline" icon={<ArrowRight size={16} />}>
            Learn more about my journey
          </AnimatedButton>
          <Button variant="link" className="bg-transparent px-4 py-2 font-medium">
            Learn more
          </Button>
        </div>
      </ContainerScale>
    </ContainerScroll>
  )
}

export function HeroDemo3() {
  return (
    <ContainerScroll className="h-[350vh] bg-slate-900 text-slate-100">
      <BentoGrid variant="threeCells" className="sticky left-0 top-0 h-svh w-full p-4">
        {IMAGES.filter((_, index) => index <= 2).map((image, index) => (
          <BentoCell key={index} className="relative overflow-hidden rounded-3xl shadow-xl">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover object-center"
              priority={index === 0}
            />
          </BentoCell>
        ))}
      </BentoGrid>
      <ContainerScale className="text-center">
        <h1 className="max-w-xl text-5xl font-bold tracking-tighter">Your Animated Hero</h1>
        <p className="my-6 max-w-xl text-sm opacity-80 md:text-base">
          Yet another hero section, this time with scroll trigger animations, animating the hero
          content with motion.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button className="bg-indigo-700 px-4 py-2 font-medium hover:bg-indigo-400">
            Get Started
          </Button>
          <Button variant="link" className="bg-transparent px-4 py-2 font-medium text-white">
            Learn more
          </Button>
        </div>
      </ContainerScale>
    </ContainerScroll>
  )
}
