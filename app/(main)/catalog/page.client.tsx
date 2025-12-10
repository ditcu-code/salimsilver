"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useMemo } from "react"

import type { Collection } from "@/lib/types"

import CatalogGallery from "./components/CatalogGallery"
import CatalogHeader from "./components/CatalogHeader"
import CategoryFilters from "./components/CategoryFilters"

interface CatalogPageClientProps {
  collections: Collection[]
}

export default function CatalogPageClient({ collections }: CatalogPageClientProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const allJewelry = useMemo(() => collections.flatMap((collection) => collection.jewelryList || []), [collections])
  
  const activeCategory = searchParams.get("category") || "all"

  const categories = useMemo(
    () => [
      { id: "all", label: "All Jewelry" },
      ...collections.map(c => ({ id: c.slug, label: c.title }))
    ],
    [collections]
  )

  const filteredJewelry = useMemo(() => {
    if (activeCategory === "all") return allJewelry
    const collection = collections.find((collection) => collection.slug === activeCategory)
    return collection ? (collection.jewelryList || []) : []
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
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <CatalogHeader />
        <CategoryFilters 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        <CatalogGallery jewelryList={filteredJewelry} />
      </div>
    </div>
  )
}
