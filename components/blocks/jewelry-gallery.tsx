"use client"

import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react"
import type { ComponentsProps, RenderExtras, RenderImage } from "react-photo-album"
import PhotoAlbum from "react-photo-album"
import "react-photo-album/masonry.css"

import type { Jewelry } from "@/lib/types"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { JewelryLightbox } from "./jewelry-lightbox"

// export type GalleryJewelry = Jewelry & { blurDataUrl?: string }

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
const THUMBNAIL_WIDTH = 80

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
          <p className="mb-4 text-sm leading-relaxed text-white/90">{photo.description}</p>
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

function JewelryGalleryContent({ jewelryList, className }: JewelryGalleryProps) {
  const [error, setError] = useState<string | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const thumbnailsRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const searchParamsString = useMemo(() => searchParams.toString(), [searchParams])
  const router = useRouter()
  const pathname = usePathname()

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
    [jewelryList],
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
    [validPhotos],
  )

  const updateUrl = useCallback(
    (slug: string | null) => {
      const params = new URLSearchParams(searchParamsString)
      if (slug) {
        params.set("jewelry", slug)
      } else {
        params.delete("jewelry")
      }

      const nextQuery = params.toString()
      const nextPath = nextQuery ? `${pathname}?${nextQuery}` : pathname
      router.replace(nextPath, { scroll: false })
    },
    [pathname, router, searchParamsString],
  )

  const selectPhoto = useCallback(
    (index: number) => {
      if (!albumPhotos.length) return
      const normalizedIndex = (index + albumPhotos.length) % albumPhotos.length
      setCurrentPhotoIndex(normalizedIndex)
      updateUrl(albumPhotos[normalizedIndex].slug)
    },
    [albumPhotos, updateUrl],
  )

  useEffect(() => {
    const jewelrySlug = new URLSearchParams(searchParamsString).get("jewelry")

    if (!jewelrySlug) {
      setLightboxOpen(false)
      return
    }

    if (!albumPhotos.length) return

    const index = albumPhotos.findIndex((photo) => photo.slug === jewelrySlug)
    if (index !== -1) {
      setCurrentPhotoIndex(index)
      setLightboxOpen(true)
    }
  }, [albumPhotos, searchParamsString])

  const openLightbox = useCallback(
    (index: number) => {
      selectPhoto(index)
      setLightboxOpen(true)
    },
    [selectPhoto],
  )

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    updateUrl(null)
  }, [updateUrl])

  const goToPrevious = useCallback(() => {
    selectPhoto(currentPhotoIndex - 1)
  }, [currentPhotoIndex, selectPhoto])

  const goToNext = useCallback(() => {
    selectPhoto(currentPhotoIndex + 1)
  }, [currentPhotoIndex, selectPhoto])

  const handleLightboxClick = useCallback(
    (event: MouseEvent) => {
      if (event.target !== event.currentTarget) return
      const rect = lightboxRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = event.clientX - rect.left
      if (x < rect.width / 3) {
        goToPrevious()
      } else if (x > (rect.width * 2) / 3) {
        goToNext()
      }
    },
    [goToNext, goToPrevious],
  )

  useEffect(() => {
    if (!lightboxOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [lightboxOpen])

  useEffect(() => {
    if (!lightboxOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox()
      if (event.key === "ArrowLeft") goToPrevious()
      if (event.key === "ArrowRight") goToNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [closeLightbox, goToNext, goToPrevious, lightboxOpen])

  useEffect(() => {
    if (!lightboxOpen || !thumbnailsRef.current) return
    const scrollContainer = thumbnailsRef.current
    const scrollPosition =
      currentPhotoIndex * THUMBNAIL_WIDTH -
      scrollContainer.clientWidth / 2 +
      THUMBNAIL_WIDTH / 2

    requestAnimationFrame(() => {
      scrollContainer.scrollTo({ left: scrollPosition, behavior: "smooth" })
    })
  }, [currentPhotoIndex, lightboxOpen])

  const renderImage: RenderImage<AlbumJewelry> = useCallback(
    ({ alt, title, sizes, className, style, onError }, { photo, index }) => (
      <motion.div
        className={cn(className, "relative overflow-hidden rounded-2xl")}
        style={style}
        initial={{ opacity: 0, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Image
          src={photo.src}
          alt={alt || photo.alt || "Photo"}
          title={title}
          fill
          sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          className="object-cover"
          quality={85}
          onError={onError}
        />
      </motion.div>
    ),
    [],
  )

  const renderExtras: RenderExtras<AlbumJewelry> = useCallback(
    (_, { photo }) => <PhotoMetadataOverlay photo={photo} />,
    [],
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
    [handlePhotoError],
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
    <>
      <div className={cn("relative", className)}>
          <PhotoAlbum
            photos={albumPhotos}
            layout="masonry"
            columns={masonryColumns}
            spacing={(containerWidth) => (containerWidth < 768 ? 12 : 24)}
            onClick={({ index }) => openLightbox(index)}
            render={{ image: renderImage, extras: renderExtras }}
            componentsProps={componentsProps}
          />
        </div>

      {lightboxOpen && (
        <JewelryLightbox
          photos={albumPhotos}
          currentIndex={currentPhotoIndex}
          onClose={closeLightbox}
          onNext={goToNext}
          onPrevious={goToPrevious}
          onSelect={selectPhoto}
          onBackgroundClick={handleLightboxClick}
          onImageError={handlePhotoError}
          lightboxRef={lightboxRef}
          thumbnailsRef={thumbnailsRef}
        />
      )}
    </>
  )
}

export function JewelryGallery(props: JewelryGalleryProps) {
  return (
    <Suspense fallback={<div className="min-h-[50vh]" />}>
      <JewelryGalleryContent {...props} />
    </Suspense>
  )
}
