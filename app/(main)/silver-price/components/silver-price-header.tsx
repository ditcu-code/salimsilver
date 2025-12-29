import { cn } from "@/lib/utils"

interface SilverPriceHeaderProps {
  className?: string
}

export function SilverPriceHeader({ className }: SilverPriceHeaderProps) {
  return (
    <div className={cn("space-y-2 text-center", className)}>
      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Harga Perak</h1>
      <p className="text-muted-foreground text-lg">
        Update harga perak murni terkini dalam Rupiah.
      </p>
    </div>
  )
}
