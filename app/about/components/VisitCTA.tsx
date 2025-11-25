"use client"

import AnimatedButton from "@/components/animated-button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function VisitCTA() {
  return (
    <section className="min-w-[90%] justify-self-center mr-4 ml-4 py-20 my-20 px-4 md:px-8 rounded-3xl border border-border bg-secondary/30">
      <motion.div
        className="max-w-7xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-primary text-3xl md:text-4xl mb-6 font-cormorantGaramond">Visit Our Workshop</h2>
        <p className="text-primary max-w-2xl mx-auto mb-8">
          Experience the magic of silver crafting firsthand. Book a tour or a jewelry-making class.
        </p>
        <AnimatedButton href="/contact" variant="primary" icon={<ArrowRight size={18} />}>
          Book a Visit
        </AnimatedButton>
      </motion.div>
    </section>
  )
}
