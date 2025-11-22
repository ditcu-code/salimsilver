"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ThemeToggle } from "./theme-toggle"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Catalog", href: "/catalog" },
  { name: "Collections", href: "/collections" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 10)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-5 left-2 right-2 z-50 transition-all duration-300 header-height ${
        isScrolled ? "bg-background backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center gap-3">
            {/* <Logo /> */}
            <Link
              href="/"
              className={`font-cormorantGaramond p-3 text-2xl duration-300 h-10 flex items-center justify-center rounded-full bg-background/90 text-primary transition-colors ${
                isScrolled || pathname !== "/" ? "text-primary" : "text-primary"
              }`}
            >
              Salim Silver
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="absolute left-1/2 hidden h-10 -translate-x-1/2 transform items-center justify-center space-x-8 rounded-full bg-background/90 px-6 text-2xl text-primary transition-colors duration-300 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  pathname === item.href ? "text-primary font-semibold border-b-[1px] border-border" : "hover:text-primary/80"
                } ${
                  isScrolled || pathname !== "/" ? "text-foreground" : "text-primary"
                } px-1 py-2 text-sm transition-colors`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle at the end of the header */}
          <div className="flex-shrink-0 md:block toggle-container">
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex h-10 items-center justify-center rounded-full bg-background text-primary transition-colors duration-300 md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              className={`${isScrolled || pathname !== "/" ? "text-primary" : "text-primary"} p-2`}
              onClick={() => setIsMenuOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[100] bg-primary-foreground backdrop-blur-lg flex flex-col min-h-screen rounded-3xl border-border border-[1px] "
          >
            <div className="p-4 flex justify-end">
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                className="text-foreground p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </motion.button>
            </div>
            <nav className="flex-1 flex flex-col items-center pt-32">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 text-3xl font-cormorantGaramond ${
                    pathname === item.href ? "text-primary font-medium" : "text-foreground hover:text-primary/80"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-4">
                <ThemeToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
