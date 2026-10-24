"use client"

import { useTranslations } from "next-intl"
import { POICategory } from "@/lib/data/kotagede-guide"

interface CategoryFilterProps {
  selectedCategory: POICategory | "all"
  onSelectCategory: (cat: POICategory | "all") => void
}

export function CategoryFilter({
  selectedCategory,
  onSelectCategory
}: CategoryFilterProps) {
  const t = useTranslations("KotagedeGuidePage.MapControls")

  const categories: Array<{ id: POICategory | "all"; label: string }> = [
    { id: "all", label: t("all") },
    { id: "heritage", label: t("heritage") },
    { id: "architecture", label: t("architecture") },
    { id: "culinary", label: t("culinary") },
    { id: "craft", label: t("craft") }
  ]

  return (
    <div className="hide-scrollbar flex w-full min-w-0 snap-x snap-mandatory items-center gap-2 overflow-x-auto pb-1 overscroll-x-contain">
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.id
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex min-h-11 shrink-0 snap-start cursor-pointer items-center whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none ${
              isActive
                ? "bg-primary text-primary-foreground shadow-xs"
                : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}
