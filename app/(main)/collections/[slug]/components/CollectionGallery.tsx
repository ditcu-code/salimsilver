"use client"

import { JewelryGallery } from "@/components/blocks/jewelry-gallery"
import { Jewelry } from "@/lib/types"

interface CollectionGalleryProps {
  jewelryList: Jewelry[]
}

export default function CollectionGallery({ jewelryList }: CollectionGalleryProps) {
  return (
    <section className="md:px-8 max-w-[90%] mx-auto mb-20">
      <JewelryGallery jewelryList={jewelryList} />
    </section>
  )
}
