"use client"

import { JewelryGallery } from "@/components/blocks/jewelry-gallery"
import { Jewelry } from "@/lib/types"
import { motion } from "framer-motion"

interface CatalogGalleryProps {
  jewelryList: Jewelry[]
}

export default function CatalogGallery({ jewelryList }: CatalogGalleryProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <JewelryGallery jewelryList={jewelryList} />
    </motion.div>
  )
}
