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

export default function CategoryFilters({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFiltersProps) {
  return (
    <motion.div
      className="no-scrollbar -mx-4 mb-6 flex gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:mb-12 md:flex-wrap md:justify-center md:px-0 md:pb-0"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "shrink-0 cursor-pointer rounded-full px-6 py-2 text-sm transition-all duration-300",
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
