import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function MetalPriceLoadingSkeleton() {
  return (
    <div className="w-full space-y-6">
      {/* Header/Toggle area placeholder */}
      <div className="flex flex-col items-center justify-center gap-6 mb-8 h-[24px]"></div>

      <div className="grid grid-cols-1 gap-8 items-start lg:grid-cols-3">
        {/* Left Column: Chart (Takes 2/3 width) */}
        <div className="order-3 lg:order-1 lg:col-span-2">
          <Card className="border-border/50 bg-card shadow-sm h-full max-h-[500px]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-6 w-32" />
              <div className="flex items-center p-1 bg-muted/50 rounded-lg gap-1">
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-7 w-20" />
              </div>
            </CardHeader>
            <CardContent className="pl-0 pb-4 px-6">
              <div className="h-[350px] w-full sm:h-[400px]">
                <Skeleton className="w-full h-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Sticky Sidebar (Takes 1/3 width) */}
        <div className="order-1 lg:order-2 lg:col-span-1 space-y-6 lg:sticky lg:top-24">
          {/* Price Card Skeleton */}
          <Card className="bg-card border-border/50 relative overflow-hidden rounded-xl border shadow-lg">
            <CardHeader className="pt-8 pb-2 text-center" />
            <CardContent className="space-y-8 px-8 pb-8">
              <div className="space-y-4 text-center">
                <div className="flex flex-col items-center gap-1">
                  <Skeleton className="h-12 w-56 sm:h-16 sm:w-72" />
                </div>
                <div className="flex justify-center max-md:pt-1.5">
                  <Skeleton className="h-8 w-32 rounded-full" />
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="border-border/60 w-full border-t" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div className="space-y-1 text-center">
                  <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Harga Kemarin
                  </p>
                  <div className="flex justify-center pt-1">
                    <Skeleton className="h-6 w-32" />
                  </div>
                </div>
                <div className="space-y-1 text-center">
                  <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Update Terakhir
                  </p>
                  <div className="flex justify-center pt-1">
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex justify-center pt-1">
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* History Skeleton */}
          <Card className="border-border/30 bg-card shadow-sm">
            <CardContent className="space-y-2 p-0 px-6 py-3">
              <div className="divide-muted divide-y">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2"
                  >
                    <Skeleton className="h-3 w-28" /> {/* Label */}
                    <div className="flex items-center space-x-6">
                      <Skeleton className="h-4 w-24" /> {/* Price */}
                      <Skeleton className="h-4 w-[85px]" /> {/* Trend Pill */}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Button placeholder */}
      <div className="flex justify-center pt-4">
        <Skeleton className="h-10 w-48 rounded-full" />
      </div>
    </div>
  )
}
