"use client"

import AnimatedButton from "@/components/ui/animated-button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function IntroductionSection() {
  return (
    <section id="introduction" className="mx-auto mt-32 mb-20 max-w-7xl px-4 py-20 sm:py-0 md:px-8">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <motion.div
          className="order-2 md:order-1"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display mb-6 text-3xl md:text-4xl">
            The Art of Silver Craftsmanship
          </h2>
          <p className="text-muted-foreground mb-6">
            At Salim Silver, we believe that jewelry is more than just an accessory; it is an
            expression of art and tradition. Our pieces are handcrafted by skilled artisans in
            Kotagede, Yogyakarta, preserving a legacy of renewal and design.
          </p>
          <p className="text-muted-foreground mb-8">
            From intricate filigree rings to bold statement necklaces, every item in our collection
            tells a unique story.
          </p>
          <AnimatedButton href="/about" variant="outline" icon={<ArrowRight size={16} />}>
            Discover Our Heritage
          </AnimatedButton>
        </motion.div>
        <motion.div
          className="relative order-1 h-[300px] overflow-hidden rounded-3xl md:order-2 md:h-[500px]"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/mbah-wasik-carving.webp"
            alt="Artisan at work"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}
