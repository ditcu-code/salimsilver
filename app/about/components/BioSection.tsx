"use client"

import { motion } from "framer-motion"
import { Award, Globe, Users } from "lucide-react"
import Image from "next/image"

export default function BioSection() {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="relative h-[600px] rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/rings-cover.png"
            alt="Jewelry craftsmanship"
            fill
            className="object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl mb-6 font-display">The Heritage</h2>
          <div className="text-muted-foreground space-y-4 mb-6">
            <p>
              Salim Silver is a guardian of heritage in Kotagede, the historic capital of the
              Mataram Sultanate. Our workshop is a living museum where the ancient art of Javanese
              silver crafting is preserved and renewed.
            </p>
            <p>
              Our founder, Priyo Jatmiko Salim, is a UGM alumnus who inherited the family business
              in 1987. He has dedicated his life to mastering and revitalizing the intricate
              techniques of Repoussé (embossing) and Filigree.
            </p>
            <p>
              Today, we continue to create pieces that are not just jewelry, but wearable art that
              honors our heritage while embracing the future of design.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Award size={20} className="text-primary" />
              <span className="text-primary">Master Craftsmanship</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={20} className="text-primary" />
              <span className="text-primary">Ethically Sourced</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={20} className="text-primary" />
              <span className="text-primary">Artisan Collective</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
