import { Skeleton } from "@/components/ui/skeleton"

export default function CollectionsLoading() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-full">
            <div className="relative h-80 w-full overflow-hidden rounded-3xl">
              <Skeleton className="h-full w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
