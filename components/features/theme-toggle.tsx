"use client"

import { useHammerSound } from "@/hooks/use-hammer-sound"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

type Theme = "light" | "system" | "dark"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { playHammerSound } = useHammerSound()

  // Ensure component is mounted before rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Helper function to update Safari theme color meta tag directly
  const updateSafariThemeColor = (newTheme: string) => {
    // Only run on the client side
    if (typeof window === "undefined") return

    // Check if it's a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (!isMobile) return

    // Determine effective theme
    let effectiveTheme = newTheme
    if (newTheme === "system") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }

    // Find or create the theme-color meta tag for Safari
    let metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta")
      metaThemeColor.setAttribute("name", "theme-color")
      document.head.appendChild(metaThemeColor)
    }

    // Update color based on theme
    metaThemeColor.setAttribute("content", effectiveTheme === "dark" ? "#000000" : "#ffffff")
  }

  const handleThemeChange = (newTheme: Theme) => {
    playHammerSound()
    setTheme(newTheme)
    updateSafariThemeColor(newTheme)
  }

  if (!mounted) {
    return <div className="h-9 w-[104px]" /> // Exact placeholder size
  }

  const options: { value: Theme; icon: typeof Sun; label: string }[] = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "system", icon: Monitor, label: "System" },
    { value: "dark", icon: Moon, label: "Dark" },
  ]

  return (
    <div className="bg-secondary/50 border-border/50 flex w-fit items-center rounded-full border p-1 backdrop-blur-sm">
      {options.map((option) => {
        const isActive = theme === option.value
        return (
          <button
            key={option.value}
            onClick={() => handleThemeChange(option.value)}
            className={cn(
              "text-muted-foreground hover:text-foreground relative flex h-7 w-8 cursor-pointer items-center justify-center rounded-full transition-colors",
              isActive && "text-foreground"
            )}
            aria-label={`Switch to ${option.label} theme`}
          >
            {isActive && (
              <motion.div
                layoutId="theme-toggle-active"
                className="bg-background border-border/50 absolute inset-0 rounded-full border shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              <option.icon size={14} />
            </span>
          </button>
        )
      })}
    </div>
  )
}
