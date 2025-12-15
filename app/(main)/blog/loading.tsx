import { Skeleton } from "@/components/ui/skeleton"

export default function BlogLoading() {
  return (
    <div>
      {/* Featured Hero Loading */}
      <div className="relative w-full mb-16 md:mb-24">
        <div className="grid md:grid-cols-12 gap-6 items-center">
          {/* Image Side */}
          <div className="md:col-span-7 lg:col-span-8 relative aspect-4/3 md:aspect-video overflow-hidden rounded-lg">
            <Skeleton className="w-full h-full" />
          </div>

          {/* Text Side */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-center space-y-4 md:pl-6">
            <Skeleton className="w-24 h-4" /> {/* Tag */}
            <Skeleton className="w-3/4 h-12" /> {/* Title */}
            <Skeleton className="w-full h-24" /> {/* Excerpt */}
            <Skeleton className="w-32 h-6" /> {/* Read More */}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border/40 my-16" />

      {/* Grid Loading */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <div className="aspect-4/3 relative overflow-hidden rounded-md mb-4">
              <Skeleton className="w-full h-full" />
            </div>
            <Skeleton className="w-20 h-3" /> {/* Date */}
            <Skeleton className="w-full h-8" /> {/* Title */}
            <Skeleton className="w-full h-16" /> {/* Excerpt */}
          </div>
        ))}
      </div>
    </div>
  )
}
