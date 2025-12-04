"use client"

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import type { MouseEvent, RefObject } from "react"
import type { AlbumJewelry } from "./jewelry-gallery"

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

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95">
      <button
        className="absolute right-4 top-4 z-30 rounded-full bg-black/20 p-2 text-white transition-colors hover:bg-black/40"
        onClick={onClose}
      >
        <X size={24} />
        <span className="sr-only">Close</span>
      </button>

      <div
        ref={lightboxRef}
        className="relative flex h-[calc(100%-120px)] w-full cursor-pointer items-center justify-center rounded-3xl p-4"
        onClick={onBackgroundClick}
      >
        <div className="relative z-10 max-h-full max-w-[90vw] overflow-hidden rounded-3xl">
          <Image
            src={currentPhoto.src || "/placeholder.svg"}
            alt={currentPhoto.alt || "Photo"}
            width={currentPhoto.width}
            height={currentPhoto.height}
            className="max-h-[calc(100vh-180px)] max-w-[90vw] object-contain"
            quality={90}
            onError={onImageError}
          />
          <div className="absolute inset-x-0 bottom-0 bg-black/60 p-4 text-white">
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm text-white/70">
                {currentIndex + 1} of {photos.length}
              </p>
              <div className="flex flex-col items-end text-right">
                {currentPhoto.title && (
                  <p className="font-serif text-lg text-white">{currentPhoto.title}</p>
                )}
                {currentPhoto.material && (
                  <p className="text-sm text-white/70">{currentPhoto.material}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex h-[100px] w-full items-center justify-center bg-black/50">
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
                  ? "z-10 scale-110 border-2 border-white"
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
                  className="rounded object-cover"
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
