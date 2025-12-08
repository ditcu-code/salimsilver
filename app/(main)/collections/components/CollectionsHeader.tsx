"use client"

import { motion } from "framer-motion"

export default function CollectionsHeader() {
  return (
    <motion.div
      className="text-center m-10 md:m-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl md:text-5xl font-display mb-4">Our Collections</h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Explore our handcrafted series, each telling a unique story of tradition and artistry.
      </p>
    </motion.div>
  )
}
