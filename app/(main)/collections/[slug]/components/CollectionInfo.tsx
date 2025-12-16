"use client"

import { motion } from "framer-motion"

interface CollectionInfoProps {
  description: string
}

export default function CollectionInfo({ description }: CollectionInfoProps) {
  return (
    <motion.section
      className="py mx-auto my-8 max-w-5xl px-4 md:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-primary text-lg leading-relaxed">{description}</p>
      </div>
    </motion.section>
  )
}
