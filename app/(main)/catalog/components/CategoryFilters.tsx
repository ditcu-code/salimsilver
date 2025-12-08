"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface Category {
  id: string
  label: string
}

interface CategoryFiltersProps {
  categories: Category[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

export default function CategoryFilters({ categories, activeCategory, onCategoryChange }: CategoryFiltersProps) {
  return (
    <motion.div
      className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap md:justify-center gap-4 mb-6 md:mb-12 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "px-6 py-2 rounded-full text-sm transition-all duration-300 cursor-pointer shrink-0",
            activeCategory === category.id
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {category.label}
        </button>
      ))}
    </motion.div>
  )
}
