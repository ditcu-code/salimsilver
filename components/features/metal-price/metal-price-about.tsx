import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface MetalPriceAboutProps {
  title: string
  children: ReactNode
  className?: string
}

export function MetalPriceAbout({
  title,
  children,
  className,
}: MetalPriceAboutProps) {
  return (
    <section className={cn(className)}>
      <Card className="border-muted bg-muted/30 text-center shadow-none">
        <CardHeader className="items-center pb-3">
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-sm leading-relaxed text-balance">
            {children}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
