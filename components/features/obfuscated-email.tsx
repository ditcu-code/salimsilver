"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface ObfuscatedEmailProps {
  user: string
  domain: string
  className?: string
  showIcon?: boolean
}

export function ObfuscatedEmail({ 
  user, 
  domain, 
  className,
  showIcon = false 
}: ObfuscatedEmailProps) {
  const [email, setEmail] = useState<string>("")

  useEffect(() => {
    // Reconstruct email on client side
    // Using a timeout to ensure it runs after hydration and potentially confusing immediate scrapers
    const timer = setTimeout(() => {
      setEmail(`${user}@${domain}`)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [user, domain])

  // Initial render (server/bot): renders a span with no email data
  if (!email) {
    return (
      <span className={cn("inline-block", className)} aria-label="Email loading">
        Loading...
      </span>
    )
  }

  // Hydrated render (user): renders the clickable link
  return (
    <a 
      href={`mailto:${email}`} 
      className={cn("transition-colors hover:text-primary", className)}
    >
      {email}
    </a>
  )
}
