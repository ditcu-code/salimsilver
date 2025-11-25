"use client"

import AnimatedButton from "@/components/animated-button"
import FeaturedCollections from "@/components/blocks/featured-collections"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function OtherCollectionsSection() {
  return (
    <section className="mt-20 mb-20 py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-primary text-3xl md:text-4xl mb-4 font-cormorantGaramond">Featured Collections</h2>
          <p className="text-primary max-w-2xl mx-auto">
            Explore our other handcrafted collections
          </p>
        </motion.div>
        <FeaturedCollections />
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <AnimatedButton href="/catalog" variant="primary" icon={<ArrowRight size={18} />}>
            View All Collections
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  )
}
