"use client"

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { type MouseEvent, type ReactNode, useState } from "react"
import { useShutterSound } from "./features/sound-effects"

interface AnimatedButtonProps {
  href?: string
  children: ReactNode
  icon?: ReactNode
  variant?: "primary" | "secondary" | "outline"
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  target?: string
  rel?: string
}

export default function AnimatedButton({
  href,
  children,
  icon,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  target,
  rel,
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [hoverOrigin, setHoverOrigin] = useState<{ x: number; y: number } | null>(null)
  const baseStyles =
    "btn inline-flex items-center gap-2 rounded-full transition-colors relative overflow-hidden"
  const { playShutterSound } = useShutterSound()

  const variantStyles = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-secondary px-6 py-3",
    secondary:
      "bg-white text-black hover:bg-white/90 hover:text-black dark:bg-gray-800 dark:text-white dark:hover:bg-gray/90 px-6 py-3",
    outline:
      "border border-black bg-transparent text-primary hover:text-primary-foreground hover:border-primary px-6 py-3",
  }

  const handleClick = () => {
    try {
      // Play sound manually for buttons
      playShutterSound()
    } catch (error) {
      console.warn("Error playing sound on button click:", error)
    }

    // Call the original onClick if provided
    if (onClick) onClick()
  }

  const handleMouseEnter = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setHoverOrigin({ x, y })
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const sharedClasses = `group ${baseStyles} ${variantStyles[variant]} ${className}`
  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon && <span className="btn-icon overflow-hidden relative z-10">{icon}</span>}
      <AnimatePresence>
        {isHovered && hoverOrigin && variant === "outline" && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 5, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: hoverOrigin.x,
              top: hoverOrigin.y,
              width: 100,
              height: 100,
              marginLeft: -50,
              marginTop: -50,
              borderRadius: "50%",
              backgroundColor: "var(--color-primary)", // Use CSS variable for primary color
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        )}
      </AnimatePresence>
    </>
  )

  const props = {
    className: sharedClasses,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  }

  if (href) {
    return (
      <Link href={href} {...props} target={target} rel={rel}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} {...props}>
      {content}
    </button>
  )
}
