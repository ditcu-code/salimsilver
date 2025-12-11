import { Skeleton } from "@/components/ui/skeleton"

export default function CatalogLoading() {
  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Category Filters Skeleton */}
      <div className="flex justify-center gap-4 mb-12">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-full" />
        ))}
      </div>

      {/* Gallery Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton
              className="w-full rounded-2xl aspect-square"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
