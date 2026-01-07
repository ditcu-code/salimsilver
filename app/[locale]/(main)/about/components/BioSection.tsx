"use client"

import { motion } from "framer-motion"
import { Award, Globe, Users } from "lucide-react"
import Image from "next/image"

export default function BioSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <motion.div
          className="relative overflow-hidden rounded-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/priyana-jatmika-salim-with-his-loupe.webp"
            alt="Priyana Jatmika Salim looking at silver ring with his loupe"
            width={600}
            height={800}
            className="h-auto w-full"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display mb-6 text-3xl md:text-4xl">The Heritage</h2>
          <div className="text-muted-foreground mb-6 space-y-4">
            <p>
              Salim Silver is a guardian of heritage in Kotagede, Yogyakarta, the historic capital
              of the Mataram Sultanate. Our workshop is a living museum where the ancient art of
              Javanese silver crafting is preserved and renewed.
            </p>
            <p>
              Our journey began in 1930 with Karto Oetomo, followed by his son Salim Widardjo in
              1952. Representing the third generation, <strong>Priyo Salim</strong> joined the
              family legacy in 1985.
            </p>
            <p>
              In 1987, inspired by the book <em>Power and Gold</em>, Priyo pivots the
              workshop&apos;s focus to handcrafted silver jewelry. He has since dedicated his life
              to preserving and revitalizing the intricate Javanese techniques of Repoussé
              (embossing) and Filigree.
            </p>
            <p>
              Today, the <strong>4th generation</strong> has stepped in to polish and elevate this
              heritage. We continue to create pieces that are not just jewelry, but wearable art
              that honors our past while embracing the future of design.
            </p>
          </div>
          <div className="flex flex-col flex-wrap gap-4 md:flex-row">
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
