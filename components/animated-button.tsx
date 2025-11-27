"use client"

import Link from "next/link"
import type { ReactNode } from "react"
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
  const baseStyles = "btn inline-flex items-center gap-2 rounded-full transition-colors"
  const { playShutterSound } = useShutterSound()

  const variantStyles = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-secondary px-6 py-3",
    secondary:
      "bg-white text-black hover:bg-white/90 dark:bg-gray-800 dark:text-white dark:hover:bg-gray/90 px-6 py-3",
    outline:
      "border border-black bg-transparent text-primary hover:bg-primary-secondary hover:text-primary-secondary px-6 py-3",
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

  const sharedClasses = `group ${baseStyles} ${variantStyles[variant]} ${className}`
  const content = (
    <>
      <span>{children}</span>
      {icon && <span className="btn-icon overflow-hidden">{icon}</span>}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={sharedClasses} onClick={handleClick} target={target} rel={rel}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} className={sharedClasses} onClick={handleClick}>
      {content}
    </button>
  )
}
