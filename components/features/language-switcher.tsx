"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { Check } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },
]

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Determine current locale from pathname
  const currentLocale = pathname?.startsWith("/id") ? "id" : "en"

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const switchLanguage = (locale: string) => {
    let newPath = pathname

    // Set cookie to update preference immediately for middleware
    // eslint-disable-next-line
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`

    if (locale === "id") {
      // Switch to Indonesian: ensure /id prefix
      if (!pathname?.startsWith("/id")) {
        newPath = `/id${pathname === "/" ? "" : pathname}`
      }
    } else {
      // Switch to English: remove /id prefix
      if (pathname?.startsWith("/id")) {
        newPath = pathname.replace(/^\/id/, "") || "/"
      }
    }

    setIsOpen(false)
    router.push(newPath)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors",
          isOpen && "ring-primary ring-2 ring-offset-2"
        )}
        aria-label="Change Language"
      >
        <span className="font-sans text-xs font-semibold">{currentLocale.toUpperCase()}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="border-border bg-popover text-popover-foreground absolute top-12 right-0 z-50 w-48 min-w-[200px] overflow-hidden rounded-xl border p-1 shadow-md"
          >
            <div className="flex flex-col gap-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => switchLanguage(lang.code)}
                  className={cn(
                    "hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                    currentLocale === lang.code && "bg-accent/50 font-medium"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{lang.flag}</span>
                    {lang.label}
                  </span>
                  {currentLocale === lang.code && <Check className="text-primary h-4 w-4" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
