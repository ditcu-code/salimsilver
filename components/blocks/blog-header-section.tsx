import { cn } from "@/lib/utils"
import { ComponentPropsWithoutRef } from "react"

export function BlogHeaderSection({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("mx-auto mb-16 max-w-3xl space-y-4 text-center md:mb-24", className)}
      {...props}
    >
      <h1 className="font-display text-foreground mt-8 text-4xl tracking-tight md:mt-4 lg:text-5xl">
        The Journal
      </h1>
      <p className="text-muted-foreground text-sm leading-relaxed font-light md:text-base">
        From the heart of Kotagede to your hands. Explore the history, techniques, and stories
        behind our handcrafted silver legacy.
      </p>
    </div>
  )
}
