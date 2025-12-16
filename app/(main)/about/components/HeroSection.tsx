"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative h-[50vh] w-full">
      <Image
        src="/images/private-collection-priyana-jatmika-salim.webp"
        alt="About Salim Silver"
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-display mb-4 text-4xl text-white md:text-5xl">Our Story</h1>
        <p className="max-w-2xl text-lg text-white/90">Crafting timeless elegance since 1930</p>
      </motion.div>
    </section>
  )
}
