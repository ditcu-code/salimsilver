"use client"

import { PhotoGallery } from "@/components/photo-gallery"
import { Photo } from "@/lib/types"
import { motion } from "framer-motion"

interface CatalogGalleryProps {
  photos: Photo[]
}

export default function CatalogGallery({ photos }: CatalogGalleryProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <PhotoGallery photos={photos} />
    </motion.div>
  )
}
