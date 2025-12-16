"use client"

import { motion } from "framer-motion"
import Image from "next/image"

import AnimatedButton from "@/components/ui/animated-button"

export default function StoreHero() {
  return (
    <section className="relative flex h-[60vh] min-h-[500px] w-full items-center justify-center overflow-hidden">
      <Image
        src="/images/store-front.webp"
        alt="Salim Silver Workshop"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      <motion.div
        className="relative z-10 container mx-auto px-4 text-center text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-white/80 uppercase">
          Store & Workshop
        </p>
        <h1 className="font-display mb-6 text-5xl md:text-7xl">Visit Us in Kotagede</h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
          See where our silver is crafted and shop the collection in our historic workshop & store.
        </p>
        <div className="mt-8">
          <AnimatedButton href="#location" variant="primary" className="px-8">
            Get Directions
          </AnimatedButton>
        </div>
      </motion.div>
    </section>
  )
}
