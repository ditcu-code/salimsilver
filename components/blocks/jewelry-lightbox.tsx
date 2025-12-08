"use client"

import { ChevronLeft, ChevronRight, Share2, X } from "lucide-react"
import Image from "next/image"
import { type MouseEvent, type RefObject } from "react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import type { AlbumJewelry } from "./jewelry-gallery"

function buildSharePayload(photo: AlbumJewelry) {
  const url = new URL(window.location.origin + window.location.pathname)
  url.searchParams.set("jewelry", photo.slug)

  return {
    shareUrl: url.toString(),
    shareTitle: photo.title || "Salim Silver Jewelry",
    shareText: photo.description || "Check out this beautiful jewelry from Salim Silver.",
  }
}

export interface JewelryLightboxProps {
  photos: AlbumJewelry[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
  onSelect: (index: number) => void
  onBackgroundClick: (event: MouseEvent) => void
  onImageError: () => void
  lightboxRef: RefObject<HTMLDivElement | null>
  thumbnailsRef: RefObject<HTMLDivElement | null>
}

export function JewelryLightbox({
  photos,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
  onSelect,
  onBackgroundClick,
  onImageError,
  lightboxRef,
  thumbnailsRef,
}: JewelryLightboxProps) {
  const currentPhoto = photos[currentIndex]

  if (!currentPhoto) return null

  const totalPhotos = photos.length
  const displayIndex = currentIndex + 1
  const { shareUrl, shareTitle, shareText } = buildSharePayload(currentPhoto)

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        })
        return
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl)
        toast.success("Link copied to clipboard")
        return
      }

      toast.error("Sharing is not supported in this browser.")
    } catch (error) {
      console.error("Error sharing:", error)
      toast.error("Unable to share right now.")
    }
  }

  const infoContent = (
    <div className="flex flex-col items-end text-right">
      {currentPhoto.title && <p className="font-serif text-md text-white">{currentPhoto.title}</p>}
      {currentPhoto.description && (
        <p className="text-xs text-white/70 md:w-2/3">{currentPhoto.description}</p>
      )}
    </div>
  )

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label="Jewelry photo viewer"
    >
      <button
        className="absolute cursor-pointer left-4 top-4 z-30 rounded-full bg-black/20 p-2.5 text-white transition-transform hover:bg-black/40 hover:scale-110"
        onClick={handleShare}
        title="Share"
      >
        <Share2 size={20} />
        <span className="sr-only">Share</span>
      </button>
      <button
        className="absolute cursor-pointer right-4 top-4 z-30 rounded-full bg-black/20 p-2 text-white transition-transform hover:bg-black/40 hover:scale-110"
        onClick={onClose}
      >
        <X size={24} />
        <span className="sr-only">Close</span>
      </button>

      {/* Mobile Counter (Top Center) */}
      <div className="absolute top-6 left-1/2 z-30 -translate-x-1/2 rounded-full bg-black/20 px-3 py-1 text-sm text-white md:hidden">
        {displayIndex} of {totalPhotos}
      </div>

      <div
        ref={lightboxRef}
        className="relative flex flex-1 min-h-0 w-full cursor-pointer items-center justify-center p-4 hover:bg-black/5"
        onClick={onBackgroundClick}
      >
        <div className="relative z-10 h-full w-full flex items-center justify-center overflow-hidden">
          <Image
            src={currentPhoto.src || "/placeholder.svg"}
            alt={currentPhoto.alt || "Photo"}
            width={currentPhoto.width || 800}
            height={currentPhoto.height || 800}
            className="h-full w-full object-contain"
            quality={90}
            onError={onImageError}
          />
          {/* Desktop Info Overlay */}
          <div className="absolute inset-x-0 bottom-0 hidden md:block bg-black/60 p-4 text-white">
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm text-white/70">
                {displayIndex} of {totalPhotos}
              </p>
              {infoContent}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Info Section (Above Thumbnails) */}
      <div className="w-full shrink-0 bg-black/80 px-6 py-2 text-white md:hidden">
        <div className="flex items-center justify-end">{infoContent}</div>
      </div>

      <div className="relative shrink-0 flex h-[100px] w-full items-center justify-center bg-black/50">
        <button
          className="absolute left-2 z-10 rounded-full bg-black/20 p-2 text-white transition-colors hover:bg-black/40"
          onClick={onPrevious}
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          ref={thumbnailsRef}
          className="hide-scrollbar flex max-w-full overflow-x-auto px-12 py-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {photos.map((photo, index) => (
            <button
              key={`thumb-${photo.key}`}
              className={cn(
                "relative mx-1 shrink-0 cursor-pointer transition-all duration-200",
                index === currentIndex
                  ? "z-10 scale-110 border-2 border-white rounded-lg"
                  : "border border-transparent opacity-60 hover:opacity-100",
              )}
              onClick={() => onSelect(index)}
              aria-label={`Go to photo ${index + 1}`}
            >
              <div className="relative h-[70px] w-[70px]">
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt || `Thumbnail ${index + 1}`}
                  fill
                  className="rounded-md object-cover"
                  sizes="70px"
                  quality={50}
                />
              </div>
              {index === currentIndex && (
                <div className="pointer-events-none absolute inset-0 rounded bg-white/20" />
              )}
            </button>
          ))}
        </div>

        <button
          className="absolute right-2 z-10 rounded-full bg-black/20 p-2 text-white transition-colors hover:bg-black/40"
          onClick={onNext}
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
