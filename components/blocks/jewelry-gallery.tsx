"use client"

import { motion } from "framer-motion"
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
import PhotoAlbum from "react-photo-album"
import type { ComponentsProps, RenderExtras, RenderImage } from "react-photo-album"
import "react-photo-album/masonry.css"

import type { Jewelry } from "@/lib/types"
import { cn } from "@/lib/utils"
import { JewelryLightbox } from "./jewelry-lightbox"

// export type GalleryJewelry = Jewelry & { blurDataUrl?: string }

interface JewelryGalleryProps {
  jewelryList: Jewelry[]
  className?: string
}

export type AlbumJewelry = Jewelry & { key: string; blurDataUrl?: string }

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
        if (!jewelry.src) {
          console.warn("Invalid jewelry:", jewelry)
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
        key: photo.id || `photo-${index}-${photo.src}`,
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
    if (!jewelrySlug || lightboxOpen || !albumPhotos.length) return

    const index = albumPhotos.findIndex((photo) => photo.slug === jewelrySlug)
    if (index !== -1) {
      selectPhoto(index)
      setLightboxOpen(true)
    }
  }, [albumPhotos, lightboxOpen, searchParamsString, selectPhoto])

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
    ({ alt, title, sizes, className, style, onError }, { photo }) => (
      <div className={cn(className, "relative overflow-hidden rounded-2xl")} style={style}>
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
      </div>
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={cn("relative", className)}>
          <PhotoAlbum
            photos={albumPhotos}
            layout="masonry"
            columns={masonryColumns}
            spacing={24}
            onClick={({ index }) => openLightbox(index)}
            render={{ image: renderImage, extras: renderExtras }}
            componentsProps={componentsProps}
          />
        </div>
      </motion.div>

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
