"use client"

import AnimatedButton from "@/components/ui/animated-button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function IntroductionSection() {
  return (
    <section id="introduction" className="mt-32 mb-20 sm:py-0 py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="order-2 md:order-1"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl mb-6 font-display">The Art of Silver Craftsmanship</h2>
          <p className="text-muted-foreground mb-6">
            At Salim Silver, we believe that jewelry is more than just an accessory; it is an expression of art and tradition.
            Our pieces are handcrafted by skilled artisans in Kotagede, Yogyakarta, preserving a legacy of renewal and design.
          </p>
          <p className="text-muted-foreground mb-8">
            From intricate filigree rings to bold statement necklaces, every item in our collection tells a unique story.
          </p>
          <AnimatedButton href="/about" variant="outline" icon={<ArrowRight size={16} />}>
            Discover Our Heritage
          </AnimatedButton>
        </motion.div>
        <motion.div
          className="relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden order-1 md:order-2"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/mbah-wasik-carving.webp"
            alt="Artisan at work"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}
