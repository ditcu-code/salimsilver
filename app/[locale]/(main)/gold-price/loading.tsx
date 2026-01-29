import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function GoldPriceLoading() {
  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-border/50 relative overflow-hidden rounded-xl border shadow-2xl backdrop-blur-md">
        <CardHeader className="pt-8 pb-2 text-center" />
        <CardContent className="space-y-8 px-8 pb-8">
          {/* Main Price Display */}
          <div className="space-y-4 text-center">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-baseline justify-center gap-1">
                <Skeleton className="h-12 w-56 sm:h-16 sm:w-72" />
              </div>
            </div>

            {/* Trend Pill Skeleton */}
            <div className="flex justify-center max-md:pt-1.5">
              <Skeleton className="h-8 w-32 rounded-full" />
            </div>
          </div>

          {/* Separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="border-border/60 w-full border-t" />
            </div>
          </div>

          {/* Details Grid */}
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
              <div className="flex justify-center">
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
