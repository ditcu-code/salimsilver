import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

interface BackButtonProps extends ComponentProps<typeof Link> {
  label?: string
  className?: string
}

export default function BackButton({
  label = "Back",
  className,
  children,
  ...props
}: BackButtonProps) {
  return (
    <Link
      {...props}
      className={cn(
        "group text-primary hover:text-foreground mb-6 flex w-fit items-center gap-2 text-sm font-medium transition-colors",
        className
      )}
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      {children || label}
    </Link>
  )
}
