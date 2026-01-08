"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import PhotoAlbum, { type RenderImage } from "react-photo-album"
import "react-photo-album/rows.css"

import { JewelryLightbox } from "@/components/blocks/jewelry-lightbox"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import type { Jewelry } from "@/lib/types"
import { cn } from "@/lib/utils"

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

  const renderImage: RenderImage<AlbumJewelry> = (
    { alt, title, sizes, className, style, onClick },
    { photo, index }
  ) => {
    return (
      <div
        style={style}
        className={cn(
          className,
          "bg-secondary/30 relative cursor-pointer overflow-hidden rounded-xl"
        )}
        onClick={onClick}
      >
        <Image
          src={photo.src}
          alt={alt || ""}
          title={title}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    )
  }

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
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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
            <PhotoAlbum
              layout="rows"
              photos={photos}
              targetRowHeight={500}
              render={{ image: renderImage }}
              onClick={({ index }) => {
                setCurrentPhotoIndex(index)
                setLightboxOpen(true)
              }}
            />
          ) : (
            <div className="bg-secondary/30 relative aspect-square w-full overflow-hidden rounded-xl">
              {product.coverImage && (
                <Image src={product.coverImage} alt={product.title} fill className="object-cover" />
              )}
            </div>
          )}

          {/* Lightbox for detailed viewing */}
          {lightboxOpen && (
            <JewelryLightbox
              photos={photos}
              currentIndex={currentPhotoIndex}
              onClose={() => setLightboxOpen(false)}
              onNext={() => setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)}
              onPrevious={() =>
                setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
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
          <h1 className="font-display mb-4 text-4xl md:text-5xl lg:text-6xl">{product.title}</h1>

          <div className="bg-secondary/20 mt-8 mb-8 h-px w-full" />

          <div className="prose prose-stone dark:prose-invert max-w-none">
            <p className="text-muted-foreground text-lg leading-relaxed">
              {product.description || t("fallbackDescription")}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8">
            <InfoItem label={t("labels.material")} value={product.material} />
            <InfoItem label={t("labels.purity")} value={product.materialPurity} />
            <InfoItem
              label={t("labels.weight")}
              value={
                product.weightGrams ? `${product.weightGrams}${t("suffixes.grams")}` : undefined
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
            <Link
              href="/contact"
              className="bg-foreground text-background inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-medium transition-colors hover:bg-black/80 dark:hover:bg-white/80"
            >
              {t("inquireButton")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoItem({ label, value }: { label: string; value?: string | number }) {
  if (!value) return null
  return (
    <div>
      <h3 className="text-muted-foreground mb-1 text-sm tracking-wider uppercase">{label}</h3>
      <p className="text-xl">{value}</p>
    </div>
  )
}
