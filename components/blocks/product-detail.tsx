"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { useState } from "react"

import { JewelryLightbox } from "@/components/blocks/jewelry-lightbox"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import type { Jewelry } from "@/lib/types"

import { ArrowRight } from "lucide-react"
import AnimatedButton from "../ui/animated-button"
import type { AlbumJewelry } from "./jewelry-gallery"

interface ProductDetailProps {
  product: Jewelry
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const t = useTranslations("ProductPage.Detail")
  const tb = useTranslations("ProductPage.Breadcrumbs")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  // Memoize photos for the album/lightbox
  const photos: AlbumJewelry[] = (product.images || []).map((img, index) => ({
    ...product,
    id: img.id,
    src: img.src,
    width: 800, // Aspect ratio proxy
    height: 800,
    alt: product.title,
    key: img.id || `img-${index}`,
  }))

  return (
    <div className="container mx-auto min-h-screen px-4 py-32 md:px-8">
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: tb("collections"), href: "/collections" },
            ...(product.collectionSlug
              ? [
                  {
                    label: product.collectionSlug
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(" "),
                    href: `/collections/${product.collectionSlug}`,
                  },
                ]
              : []),
            { label: product.title },
          ]}
        />
      </div>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left Column: Gallery */}
        <div className="space-y-4">
          {photos.length > 0 ? (
            <div className="space-y-4">
              <div
                className="bg-secondary/30 relative aspect-square w-full cursor-pointer overflow-hidden rounded-xl"
                onClick={() => {
                  setCurrentPhotoIndex(0)
                  setLightboxOpen(true)
                }}
              >
                <Image
                  src={photos[0].src}
                  alt={photos[0].alt || ""}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {photos.length > 1 && (
                <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
                  {photos.slice(1).map((photo, index) => (
                    <div
                      key={photo.key}
                      className="bg-secondary/30 relative aspect-square w-24 shrink-0 cursor-pointer overflow-hidden rounded-lg"
                      onClick={() => {
                        setCurrentPhotoIndex(index + 1)
                        setLightboxOpen(true)
                      }}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt || ""}
                        fill
                        className="object-cover transition-opacity hover:opacity-80"
                        sizes="96px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-secondary/30 relative aspect-square w-full overflow-hidden rounded-xl">
              {product.coverImage && (
                <Image
                  src={product.coverImage}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
          )}

          {/* Lightbox for detailed viewing */}
          {lightboxOpen && (
            <JewelryLightbox
              photos={photos}
              currentIndex={currentPhotoIndex}
              onClose={() => setLightboxOpen(false)}
              onNext={() =>
                setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
              }
              onPrevious={() =>
                setCurrentPhotoIndex(
                  (prev) => (prev - 1 + photos.length) % photos.length,
                )
              }
              onSelect={setCurrentPhotoIndex}
              onBackgroundClick={(e) => {
                if (e.target === e.currentTarget) setLightboxOpen(false)
              }}
              onImageError={() => {}}
              lightboxRef={{ current: null }}
              thumbnailsRef={{ current: null }}
            />
          )}
        </div>

        {/* Right Column: Product Info */}
        <div className="flex flex-col">
          <h1 className="font-display mb-4 text-3xl md:text-4xl lg:text-5xl">
            {product.title}
          </h1>

          <div className="bg-secondary/20 mt-8 mb-8 h-px w-full" />

          <div className="prose prose-stone dark:prose-invert max-w-none">
            <p className="text-muted-foreground text-lg leading-relaxed">
              {product.description || t("fallbackDescription")}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8">
            <InfoItem label={t("labels.material")} value={product.material} />
            <InfoItem
              label={t("labels.purity")}
              value={product.materialPurity}
            />
            <InfoItem
              label={t("labels.weight")}
              value={
                product.weightGrams
                  ? `${product.weightGrams}${t("suffixes.grams")}`
                  : undefined
              }
            />
            <InfoItem
              label={t("labels.craftingTime")}
              value={
                product.craftingTimeHours
                  ? `${product.craftingTimeHours} ${t("suffixes.hours")}`
                  : undefined
              }
            />
          </div>

          <div className="mt-12">
            <AnimatedButton
              href="/contact"
              variant="outline"
              icon={<ArrowRight size={16} />}
            >
              {t("inquireButton")}
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoItem({
  label,
  value,
}: {
  label: string
  value?: string | number
}) {
  if (!value) return null
  return (
    <div>
      <h3 className="font-sans! text-muted-foreground mb-1 text-sm tracking-wider uppercase">
        {label}
      </h3>
      <p className="text-xl">{value}</p>
    </div>
  )
}
