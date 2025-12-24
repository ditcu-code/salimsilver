"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useMemo, useState } from "react"
import type { ComponentsProps, RenderExtras, RenderImage } from "react-photo-album"
import PhotoAlbum from "react-photo-album"
import "react-photo-album/masonry.css"

import type { Jewelry } from "@/lib/types"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface JewelryGalleryProps {
  jewelryList: Jewelry[]
  className?: string
}

// Extend Jewelry to include properties required by react-photo-album
export type AlbumJewelry = Jewelry & {
  key: string
  src: string
  width: number
  height: number
  alt?: string
  blurDataUrl?: string
}

const masonryColumns = (containerWidth: number) => (containerWidth < 768 ? 2 : 3)

const PhotoMetadataOverlay = ({ photo }: { photo: AlbumJewelry }) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-end bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <div className="w-full p-6 text-white">
        {photo.title && (
          <h3 className="mb-2 font-serif text-xl font-medium tracking-wide text-white">
            {photo.title}
          </h3>
        )}
        {photo.description && (
          <p className="line-clamp-2 text-sm leading-relaxed text-white/90">{photo.description}</p>
        )}

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/80">
          {photo.weightGrams && (
            <div>
              <span className="block text-white/60">Weight</span>
              {photo.weightGrams}g
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function JewelryGallery({ jewelryList, className }: JewelryGalleryProps) {
  const [error, setError] = useState<string | null>(null)

  const handlePhotoError = useCallback(() => {
    setError("Failed to load some images. Please try refreshing the page.")
  }, [])

  const validPhotos = useMemo(
    () =>
      jewelryList.filter((jewelry) => {
        if (!jewelry.coverImage && (!jewelry.images || jewelry.images.length === 0)) {
          console.warn("Invalid jewelry (no images):", jewelry)
          return false
        }
        return true
      }),
    [jewelryList]
  )

  const albumPhotos = useMemo<AlbumJewelry[]>(
    () =>
      validPhotos.map((photo, index) => ({
        ...photo,
        key: photo.id || `photo-${index}`,
        src: photo.coverImage || photo.images?.[0]?.src || "/placeholder.svg",
        width: 800, // Mock dimensions since DB doesn't store them
        height: 800, // Square aspect ratio for now
        alt: photo.title,
      })),
    [validPhotos]
  )

  const renderImage: RenderImage<AlbumJewelry> = useCallback(
    ({ alt, title, sizes, className, style }, { photo, index }) => {
      const href = `/product/${photo.slug}`

      return (
        <motion.div
          className={cn(className, "relative overflow-hidden rounded-2xl")}
          style={style}
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link href={href} className="block h-full w-full">
            <Image
              src={photo.src}
              alt={alt || photo.alt || "Photo"}
              title={title}
              fill
              sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
              className="object-cover transition-transform duration-500 hover:scale-105"
              quality={85}
              priority={index < 3}
            />
          </Link>
        </motion.div>
      )
    },
    []
  )

  const renderExtras: RenderExtras<AlbumJewelry> = useCallback(
    (_, { photo }) => <PhotoMetadataOverlay photo={photo} />,
    []
  )

  const componentsProps = useMemo<ComponentsProps<AlbumJewelry>>(
    () => ({
      wrapper: {
        className: "group relative overflow-hidden rounded-2xl",
      },
      image: {
        className: "rounded-2xl transition-transform duration-300 group-hover:scale-[1.02]",
        onError: handlePhotoError,
      },
    }),
    [handlePhotoError]
  )

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-500">
        <p>{error}</p>
      </div>
    )
  }

  if (!albumPhotos.length) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        <p>No photos available</p>
      </div>
    )
  }

  return (
    <div className={cn("relative mb-16", className)}>
      <PhotoAlbum
        photos={albumPhotos}
        layout="masonry"
        columns={masonryColumns}
        spacing={(containerWidth) => (containerWidth < 768 ? 12 : 24)}
        render={{ image: renderImage, extras: renderExtras }}
        componentsProps={componentsProps}
      />
    </div>
  )
}
