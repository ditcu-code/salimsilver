"use client"

import { motion } from "framer-motion"

interface CollectionInfoProps {
  fullDescription: string
  description: string
}

export default function CollectionInfo({ fullDescription, description }: CollectionInfoProps) {
  return (
    <motion.section
      className="py px-4 md:px-8 max-w-5xl mx-auto my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="prose max-w-none dark:prose-invert">
        <p className="text-lg text-primary leading-relaxed">
          {fullDescription || description}
        </p>
      </div>
    </motion.section>
  )
}
