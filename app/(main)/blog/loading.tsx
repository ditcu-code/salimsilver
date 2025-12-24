import { BlogHeaderSection } from "@/components/blocks/blog-header-section"
import { Skeleton } from "@/components/ui/skeleton"

export default function BlogLoading() {
  return (
    <div className="min-h-screen pt-24 pb-20 md:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <BlogHeaderSection />

        {/* Featured Hero Loading */}
        <div className="relative mb-16 w-full md:mb-24">
          <div className="grid items-center gap-6 md:grid-cols-12">
            {/* Image Side */}
            <div className="relative aspect-4/3 overflow-hidden rounded-lg md:col-span-7 md:aspect-video lg:col-span-8">
              <Skeleton className="h-full w-full" />
            </div>

            {/* Text Side */}
            <div className="flex flex-col justify-center space-y-4 md:col-span-5 md:pl-6 lg:col-span-4">
              <Skeleton className="h-4 w-24" /> {/* Tag */}
              <Skeleton className="h-12 w-3/4" /> {/* Title */}
              <Skeleton className="h-24 w-full" /> {/* Excerpt */}
              <Skeleton className="h-6 w-32" /> {/* Read More */}
            </div>
          </div>
        </div>

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
