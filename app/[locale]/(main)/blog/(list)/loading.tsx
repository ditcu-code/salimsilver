import { BlogHeaderSection } from "@/components/blocks/blog-header-section"
import { Skeleton } from "@/components/ui/skeleton"

export default function BlogLoading() {
  return (
    <div className="min-h-screen pt-24 pb-20 md:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <BlogHeaderSection />

        {/* Divider */}
        <div className="border-border/40 my-16 border-t" />

        {/* Grid Loading */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <div className="relative mb-4 aspect-4/3 overflow-hidden rounded-md">
                <Skeleton className="h-full w-full" />
              </div>
              <Skeleton className="h-3 w-20" /> {/* Date */}
              <Skeleton className="h-8 w-full" /> {/* Title */}
              <Skeleton className="h-16 w-full" /> {/* Excerpt */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
