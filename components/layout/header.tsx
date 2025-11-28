"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion, type Transition } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ThemeToggle } from "../features/theme-toggle"

type NavItem = {
  name: string
  href: string
}

const navigation: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Catalog", href: "/catalog" },
  { name: "Collections", href: "/collections" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

const mobileMenuTransition: Transition = { type: "spring", damping: 25, stiffness: 300 }

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

  const isHome = pathname === "/"

  return (
    <header
      className={cn(
        "fixed top-5 left-4 right-4 md:left-8 md:right-8 z-50 transition-all duration-500 ease-in-out header-height",
        isScrolled ? "bg-background border border-border" : "bg-transparent border border-transparent"
      )}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 h-full">
        <div className="flex items-center h-full relative gap-4">
          <div className="mr-auto">
            <Brand isScrolled={isScrolled} />
          </div>

          <DesktopNavigation isHome={isHome} isScrolled={isScrolled} pathname={pathname} />

          <div className="flex items-center gap-2">
            <div className="shrink-0 md:block toggle-container">
              <ThemeToggle />
            </div>

            <MobileMenuButton isOpen={isMenuOpen} isScrolled={isScrolled} onOpen={() => setIsMenuOpen(true)} />
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} pathname={pathname} onClose={() => setIsMenuOpen(false)} />
    </header>
  )
}

function Brand({ isScrolled }: { isScrolled: boolean }) {
  return (
    <div className="shrink-0 flex items-center gap-3">
      <Link
        href="/"
        className={cn(
          "p-3 text-2xl font-display duration-300 h-10 flex items-center justify-center rounded-full transition-all",
          isScrolled ? "bg-transparent" : "bg-background"
        )}
      >
        Salim Silver
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
        "hidden h-10 items-center justify-center space-x-8 rounded-full px-6 transition-all duration-300 md:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2",
        isScrolled ? "bg-transparent" : "bg-background"
      )}
    >
      {navigation.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "px-1 py-2 text-sm transition-colors border-b border-transparent",
              baseTone,
              isActive ? "text-primary font-semibold border-primary/50" : "hover:text-primary/80"
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
        "flex h-10 items-center justify-center rounded-full text-primary transition-all duration-300 md:hidden",
        isScrolled ? "bg-transparent" : "bg-background"
      )}
    >
      <motion.button
        whileTap={{ scale: 0.95 }}
        type="button"
        className="p-2 text-primary"
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
          className="fixed inset-0 z-100 bg-background/80 backdrop-blur-2xl flex flex-col min-h-screen"
          id="mobile-navigation"
        >
          <div className="p-4 flex justify-end">
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              className="text-foreground p-2 rounded-full bg-background/50 backdrop-blur-md border border-white/10"
              onClick={onClose}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </motion.button>
          </div>
          <nav className="flex-1 flex flex-col items-center pt-32 space-y-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block px-8 py-3 text-4xl font-display transition-all duration-300",
                    isActive
                      ? "text-primary font-medium scale-110"
                      : "text-foreground/80 hover:text-primary hover:scale-105"
                  )}
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              )
            })}
            <div className="mt-8">
              <ThemeToggle />
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
