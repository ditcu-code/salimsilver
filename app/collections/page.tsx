"use client"

import FeaturedCollections from "@/components/featured-collections"
import { motion } from "framer-motion"

export default function CollectionsPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-cormorantGaramond mb-4">Our Collections</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our handcrafted series, each telling a unique story of tradition and artistry.
          </p>
        </motion.div>

        <FeaturedCollections />
      </div>
    </div>
  )
}
