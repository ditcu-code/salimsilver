"use client"

import { PhotoGallery } from "@/components/photo-gallery"
import { Photo } from "@/lib/types"

interface CollectionGalleryProps {
  photos: Photo[]
}

export default function CollectionGallery({ photos }: CollectionGalleryProps) {
  return (
    <section className="py-8 px-4 md:px-8 max-w-[90%] mx-auto mb-20">
      <PhotoGallery photos={photos} />
    </section>
  )
}
