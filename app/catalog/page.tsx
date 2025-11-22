"use client"

import { PhotoGallery } from "@/components/photo-gallery"
import { getAllCollections } from "@/lib/collections"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useMemo, useState } from "react"

export default function CatalogPage() {
  const collections = getAllCollections()
  const allPhotos = useMemo(() => collections.flatMap(c => c.photos), [collections])
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", label: "All Jewelry" },
    ...collections.map(c => ({ id: c.slug, label: c.title }))
  ]

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "all") return allPhotos
    const collection = collections.find(c => c.slug === activeCategory)
    return collection ? collection.photos : []
  }, [activeCategory, allPhotos, collections])

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-cormorantGaramond mb-4">Jewelry Catalog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our complete collection of handcrafted silver jewelry.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-6 py-2 rounded-full text-sm transition-all duration-300",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <PhotoGallery photos={filteredPhotos} />
        </motion.div>
      </div>
    </div>
  )
}
