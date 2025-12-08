"use client"

import { useEffect, useMemo, useState } from "react"

import type { Collection } from "@/lib/types"

import CatalogGallery from "./components/CatalogGallery"
import CatalogHeader from "./components/CatalogHeader"
import CategoryFilters from "./components/CategoryFilters"

interface CatalogPageClientProps {
  collections: Collection[]
}

export default function CatalogPageClient({ collections }: CatalogPageClientProps) {
  const allJewelry = useMemo(() => collections.flatMap((collection) => collection.jewelryList || []), [collections])
  const [activeCategory, setActiveCategory] = useState("all")

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

  useEffect(() => {
    const applyHashCategory = () => {
      const hashCategory = window.location.hash.replace("#", "")
      if (!hashCategory) {
        setActiveCategory("all")
        return
      }

      if (categories.some(category => category.id === hashCategory)) {
        setActiveCategory(hashCategory)
      }
    }

    applyHashCategory()
    window.addEventListener("hashchange", applyHashCategory)

    return () => window.removeEventListener("hashchange", applyHashCategory)
  }, [categories])

  useEffect(() => {
    const newHash = activeCategory === "all" ? "" : `#${activeCategory}`
    const newUrl = `${window.location.pathname}${window.location.search}${newHash}`
    window.history.replaceState(null, "", newUrl)
  }, [activeCategory])

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <CatalogHeader />
        <CategoryFilters 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <CatalogGallery jewelryList={filteredJewelry} />
      </div>
    </div>
  )
}
