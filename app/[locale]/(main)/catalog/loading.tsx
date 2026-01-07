import { Skeleton } from "@/components/ui/skeleton"

export default function CatalogLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-12">
      {/* Category Filters Skeleton */}
      <div className="mb-12 flex justify-center gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-full" />
        ))}
      </div>

      {/* Gallery Grid Skeleton */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-2xl" />
          </div>
        ))}
      </div>
    </div>
  )
}
