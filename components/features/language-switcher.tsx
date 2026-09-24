"use client"

import { routing, usePathname, useRouter } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { sendGAEvent } from "@next/third-parties/google"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { useLocale } from "next-intl"
import {
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState
} from "react"

const LANGUAGES = [
  { code: "id", label: "Indonesia", flag: "🇮🇩" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" }
] as const

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const currentLocale = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const switchLanguage = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    locale: (typeof LANGUAGES)[number]["code"]
  ) => {
    sendGAEvent("event", "change_language", {
      from_language: currentLocale,
      to_language: locale
    })
    setIsOpen(false)

    if (
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    ) {
      event.preventDefault()
      router.replace(pathname, { locale })
    }
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
        <span className="font-sans text-xs font-semibold">
          {currentLocale.toUpperCase()}
        </span>
      </motion.button>

      <div
        role="menu"
        aria-label="Language options"
        aria-hidden={!isOpen}
        className={cn(
          "border-border bg-popover text-popover-foreground absolute top-12 right-0 z-50 w-48 min-w-[200px] overflow-hidden rounded-xl border p-1 shadow-md transition-all duration-200",
          isOpen
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible pointer-events-none translate-y-2 scale-95 opacity-0"
        )}
      >
        <div className="flex flex-col gap-1">
          {LANGUAGES.map((lang) => (
            <a
              key={lang.code}
              href={
                lang.code === routing.defaultLocale
                  ? pathname
                  : `/${lang.code}${pathname === "/" ? "" : pathname}`
              }
              role="menuitem"
              tabIndex={isOpen ? undefined : -1}
              onClick={(event) => switchLanguage(event, lang.code)}
              className={cn(
                "hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                currentLocale === lang.code && "bg-accent/50 font-medium"
              )}
            >
              <span className="flex items-center gap-2">
                <span className="text-base">{lang.flag}</span>
                {lang.label}
              </span>
              {currentLocale === lang.code && (
                <Check className="text-primary h-4 w-4" />
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
