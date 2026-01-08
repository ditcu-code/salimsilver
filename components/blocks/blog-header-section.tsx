import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { ComponentPropsWithoutRef } from "react"

export function BlogHeaderSection({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  const t = useTranslations("JournalPage.Header")

  return (
    <div
      className={cn("mx-auto mb-16 max-w-3xl space-y-4 text-center md:mb-24", className)}
      {...props}
    >
      <h1 className="font-display text-foreground mt-8 text-4xl tracking-tight md:mt-4 lg:text-5xl">
        {t("title")}
      </h1>
      <p className="text-muted-foreground text-sm leading-relaxed font-light md:text-base">
        {t("description")}
      </p>
    </div>
  )
}
