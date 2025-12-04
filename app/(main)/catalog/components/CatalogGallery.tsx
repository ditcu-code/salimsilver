"use client"

import { JewelryGallery } from "@/components/blocks/jewelry-gallery"
import { Jewelry } from "@/lib/types"
import { motion } from "framer-motion"

interface CatalogGalleryProps {
  photos: Jewelry[]
}

export default function CatalogGallery({ photos }: CatalogGalleryProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <JewelryGallery photos={photos} />
    </motion.div>
  )
}
