import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Triangle } from "lucide-react"

interface PriceCardProps {
  currentPrice: number
  previousPrice: number
  lastUpdated: string
}

export function PriceCard({ currentPrice, previousPrice, lastUpdated }: PriceCardProps) {
  const priceChange = currentPrice - previousPrice
  const isUp = priceChange >= 0
  const isSame = priceChange === 0

  // Format prices
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(val)

  const formattedPrice = formatCurrency(currentPrice)
  const formattedYesterdayPrice = formatCurrency(previousPrice)
  const formattedPriceChange = formatCurrency(Math.abs(priceChange))

  const trendColor = isSame
    ? "bg-muted text-muted-foreground"
    : isUp
      ? "bg-green-500/10 text-green-600 dark:text-green-400"
      : "bg-red-500/10 text-red-600 dark:text-red-400"

  const TrendIcon = Triangle

  const gradientClass = isSame ? "via-primary/60" : isUp ? "via-green-500/60" : "via-red-500/60"

  return (
    <Card className="border-border/50 bg-card/50 overflow-hidden shadow-2xl backdrop-blur-md">
      {/* Subtle gradient accent at the top */}
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent to-transparent opacity-50 ${gradientClass}`}
      />

      <CardHeader className="pt-8 pb-2 text-center" />

      <CardContent className="space-y-8 px-8 pb-10">
        {/* Main Price Display */}
        <div className="space-y-4 text-center">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-foreground font-sans text-5xl font-bold tracking-tight sm:text-6xl">
              {formattedPrice}
            </span>
            <span className="text-muted-foreground text-lg font-medium sm:text-xl">/ gram</span>
          </div>

          {/* Trend Pill */}
          <div className="flex justify-center">
            <div
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${trendColor}`}
            >
              {!isSame && <TrendIcon className={`h-3 w-3 fill-current ${!isUp && "rotate-180"}`} />}
              <span className="font-sans font-bold">
                {isSame ? "Harga Stabil" : `${isUp ? "Naik" : "Turun"} ${formattedPriceChange}`}
              </span>
            </div>
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
            <p className="text-xl font-semibold tracking-tight tabular-nums">
              {formattedYesterdayPrice}
            </p>
          </div>
          <div className="space-y-1 text-center">
            <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
              Update Terakhir
            </p>
            <div className="text-foreground text-sm font-medium">
              {new Date(lastUpdated).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
                timeZone: "Asia/Jakarta",
              })}
            </div>
            <div className="text-muted-foreground text-xs">
              {new Date(lastUpdated).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Jakarta",
              })}{" "}
              WIB
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function PriceFallbackCard() {
  return (
    <Card className="border-border/50 bg-card/50 shadow-xl backdrop-blur-md">
      <CardHeader className="text-center">
        <CardTitle className="font-display text-2xl">Harga Perak</CardTitle>
        <CardDescription className="text-base">
          Kami saat ini tidak dapat mengambil harga perak terbaru. Silakan periksa kembali nanti.
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
