"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion, type Transition } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { LanguageSwitcher } from "../features/language-switcher"
import { StoreLocationButton } from "../features/store-location-button"

type NavItem = {
  name: string
  href: string
  mobileOnly?: boolean
}

const navigation: NavItem[] = [
  { name: "Catalog", href: "/catalog" },
  { name: "Collections", href: "/collections" },
  { name: "Workshop", href: "/workshop" },
  { name: "About", href: "/about" },
  // { name: "Contact", href: "/contact" },
  { name: "Journal", href: "/blog" },
  { name: "Visit Us", href: "/store-location", mobileOnly: true },
]

const mobileMenuTransition: Transition = {
  type: "spring",
  damping: 25,
  stiffness: 300,
}

function getLocalizedPath(path: string, currentPathname: string) {
  const isId = currentPathname.startsWith("/id")
  if (isId) {
    return `/id${path === "/" ? "" : path}`
  }
  return path
}

export default function Header() {
  const pathname = usePathname() ?? "/"
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isMenuOpen])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const isHome = pathname === "/" || pathname === "/id"

  return (
    <header
      className={cn(
        "header-height fixed top-5 right-4 left-4 z-50 transition-all duration-500 ease-in-out md:right-8 md:left-8",
        isScrolled
          ? "bg-background border-border border"
          : "border border-transparent bg-transparent",
      )}
    >
      <div className="max-w-8xl mx-auto h-full px-4 sm:px-6">
        <div className="relative flex h-full items-center gap-4">
          <div className="mr-auto">
            <Brand isScrolled={isScrolled} pathname={pathname} />
          </div>

          <DesktopNavigation
            isHome={isHome}
            isScrolled={isScrolled}
            pathname={pathname}
          />

          <div className="flex items-center gap-2">
            <div className="toggle-container flex shrink-0 gap-2 md:block">
              <div className="flex gap-2">
                <StoreLocationButton />
                <LanguageSwitcher />
              </div>
            </div>

            <MobileMenuButton
              isOpen={isMenuOpen}
              isScrolled={isScrolled}
              onOpen={() => setIsMenuOpen(true)}
            />
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        pathname={pathname}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  )
}

function Brand({
  isScrolled,
  pathname,
}: {
  isScrolled: boolean
  pathname: string
}) {
  const pathWithoutLocale = pathname.replace(/^\/id(?=\/|$)/, "") || "/"
  const isDarkHeroPage =
    ["/contact", "/about", "/store-location", "/workshop"].includes(
      pathWithoutLocale,
    ) ||
    pathWithoutLocale.startsWith("/collections/") ||
    pathWithoutLocale.startsWith("/blog/")
  const shouldInvert = isScrolled || !isDarkHeroPage

  return (
    <div className="flex shrink-0 items-center gap-3">
      <Link
        href={getLocalizedPath("/", pathname)}
        className={cn(
          "flex items-center justify-center transition-all duration-300",
          isScrolled ? "scale-90" : "scale-100",
        )}
      >
        <Image
          src="/images/logo-salimsilver.webp"
          alt="Salim Silver"
          width={180}
          height={36}
          className={cn(
            "h-10 object-contain transition-all duration-300 dark:invert-0",
            shouldInvert ? "invert" : "invert-0",
          )}
          style={{ width: "auto", maxWidth: "180px" }}
          priority
        />
      </Link>
    </div>
  )
}

function DesktopNavigation({
  isHome,
  isScrolled,
  pathname,
}: {
  isHome: boolean
  isScrolled: boolean
  pathname: string
}) {
  const baseTone = isScrolled || !isHome ? "text-foreground" : "text-primary"

  return (
    <nav
      className={cn(
        "hidden h-10 items-center justify-center space-x-8 rounded-3xl px-6 transition-all duration-300 md:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2",
        isScrolled ? "bg-transparent" : "bg-background",
      )}
    >
      {navigation
        .filter((item) => !item.mobileOnly)
        .map((item) => {
          const localizedHref = getLocalizedPath(item.href, pathname)
          const isActive = pathname === localizedHref

          return (
            <Link
              key={item.name}
              href={localizedHref}
              className={cn(
                "border-b border-transparent px-1 py-2 text-sm transition-colors",
                baseTone,
                isActive
                  ? "text-primary border-primary/50 font-semibold"
                  : "hover:text-primary/80 hover:scale-102",
              )}
            >
              {item.name}
            </Link>
          )
        })}
    </nav>
  )
}

function MobileMenuButton({
  isOpen,
  isScrolled,
  onOpen,
}: {
  isOpen: boolean
  isScrolled: boolean
  onOpen: () => void
}) {
  return (
    <div
      className={cn(
        "text-primary flex h-10 items-center justify-center rounded-3xl transition-all duration-300 md:hidden",
        isScrolled ? "bg-transparent" : "bg-background",
      )}
    >
      <motion.button
        whileTap={{ scale: 0.95 }}
        type="button"
        className="text-primary p-2"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={onOpen}
      >
        <span className="sr-only">Open menu</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </motion.button>
    </div>
  )
}

function MobileMenu({
  isOpen,
  pathname,
  onClose,
}: {
  isOpen: boolean
  pathname: string
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={mobileMenuTransition}
          className="bg-background/80 fixed inset-0 z-100 flex min-h-screen flex-col overflow-y-auto backdrop-blur-2xl"
          id="mobile-navigation"
        >
          <div className="flex items-center justify-end gap-4 p-4">
            <LanguageSwitcher />
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              className="text-foreground bg-background/50 rounded-3xl border border-white/10 p-2 backdrop-blur-md"
              onClick={onClose}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </motion.button>
          </div>
          <nav className="flex flex-col items-center space-y-6 py-10">
            {navigation.map((item) => {
              const localizedHref = getLocalizedPath(item.href, pathname)
              const isActive = pathname === localizedHref

              return (
                <Link
                  key={item.name}
                  href={localizedHref}
                  className={cn(
                    "font-display block px-8 py-3 text-4xl transition-all duration-300",
                    isActive
                      ? "text-primary border-border scale-110 border-b-2 font-medium"
                      : "text-foreground/80 hover:text-primary hover:scale-105",
                  )}
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
