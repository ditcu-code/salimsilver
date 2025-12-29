"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useMemo } from "react"

import type { Collection } from "@/lib/types"

import { JewelryGallery } from "@/components/blocks/jewelry-gallery"
import CategoryFilters from "./components/CategoryFilters"

interface CatalogPageClientProps {
  collections: Collection[]
}

export default function CatalogPageClient({ collections }: CatalogPageClientProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const allJewelry = useMemo(
    () => collections.flatMap((collection) => collection.jewelryList || []),
    [collections]
  )

  const activeCategory = searchParams.get("category") || "all"

  const categories = useMemo(
    () => [
      { id: "all", label: "All Jewelry" },
      ...collections.map((c) => ({ id: c.slug, label: c.title })),
    ],
    [collections]
  )

  const filteredJewelry = useMemo(() => {
    if (activeCategory === "all") return allJewelry
    const collection = collections.find((collection) => collection.slug === activeCategory)
    return collection ? collection.jewelryList || [] : []
  }, [activeCategory, allJewelry, collections])

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (categoryId === "all") {
      params.delete("category")
    } else {
      params.set("category", categoryId)
    }
    const queryString = params.toString()
    const url = queryString ? `${pathname}?${queryString}` : pathname
    router.replace(url, { scroll: false })
  }

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="sr-only">Jewelry Catalog</h1>
      <CategoryFilters
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      <JewelryGallery jewelryList={filteredJewelry} />
    </div>
  )
}
