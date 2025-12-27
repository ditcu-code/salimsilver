"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { type ReactNode } from "react"
import { ObfuscatedEmail } from "../features/obfuscated-email"
import { Facebook } from "../icons/facebook"
import { Instagram } from "../icons/instagram"

import useProtectImages from "@/hooks/useProtectImages"
import { ThemeToggle } from "../features/theme-toggle"
import { WhatsApp } from "../icons/whatsapp"

const motionSettings = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
}

const quickLinks = [
  { href: "/catalog", label: "Catalog" },
  { href: "/collections", label: "Collections" },
  { href: "/workshop", label: "Workshop" },
  { href: "/store-location", label: "Store Location" },
  { href: "/silver-price", label: "Silver Price" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Journal" },
]

const contactLinks = [
  { label: "Email", href: "mailto:hello@salimsilver.com", display: "hello@salimsilver.com" },
]

const socialLinks = [
  {
    href: "https://web.facebook.com/SalimSilverArt",
    label: "Facebook",
    Icon: Facebook,
  },
  {
    href: "https://www.instagram.com/salimsilverofficial/",
    label: "Instagram",
    Icon: Instagram,
  },
  {
    href: "/api/whatsapp",
    label: "WhatsApp",
    Icon: WhatsApp,
  },
]

type AnimatedSectionProps = {
  children: ReactNode
  className?: string
}

function AnimatedSection({ children, className }: AnimatedSectionProps) {
  return (
    <motion.div className={className} {...motionSettings}>
      {children}
    </motion.div>
  )
}

export default function Footer() {
  useProtectImages()

  return (
    <motion.footer
      className="bg-background border-border border-t px-4 py-12 md:px-8"
      {...motionSettings}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-4">
        <AnimatedSection className="md:col-span-2">
          <div className="mb-6 flex w-fit flex-col">
            <Link href="/" className="font-display text-foreground text-3xl font-semibold">
              <Image
                src="/images/logo-salimsilver.webp"
                alt="Salim Silver"
                width={200}
                height={40}
                className="h-12 object-contain invert dark:invert-0"
                style={{ width: "auto" }}
                loading="eager"
              />
            </Link>
            <span className="text-muted-foreground -mt-2 mr-2 self-end text-[0.7rem]">
              Heritage Forged by Hand
            </span>
          </div>
          <p className="text-muted-foreground mb-6 max-w-md text-sm">
            Gg. Platina - Kebohan KG 3/547, Purbayan <br /> Kotagede, Yogyakarta City, Indonesia
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <h3 className="section-title mb-2 text-2xl">Quick Links</h3>
          <ul className="grid grid-cols-1 gap-1 md:grid-cols-2">
            {quickLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-muted-foreground hover:text-primary text-sm whitespace-nowrap transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </AnimatedSection>

        <AnimatedSection>
          <h3 className="section-title mb-2 text-2xl">Contact</h3>
          <ul className="text-muted-foreground space-y-2">
            {contactLinks.map(({ label, href, display }) => (
              <li key={label}>
                <h4 className="text-primary">{label}</h4>
                {label === "Email" ? (
                  <div className="text-muted-foreground text-sm">
                    <ObfuscatedEmail user="hello" domain="salimsilver.com" />
                  </div>
                ) : (
                  <a href={href} className="text-muted-foreground text-sm">
                    <p>{display}</p>
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <h4 className="text-primary mb-2">Follow Us</h4>
            <div className="flex items-center space-x-4">
              {socialLinks.map(({ href, label, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                  aria-label={label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                  <span className="sr-only">{label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      <div className="border-border mx-auto mt-12 flex max-w-7xl flex-row items-center justify-between gap-4 border-t pt-8">
        <motion.p className="text-muted-foreground text-sm" {...motionSettings}>
          © {new Date().getFullYear()} Salim Silver. <br className="md:hidden" /> All rights
          reserved.
        </motion.p>
        <ThemeToggle />
      </div>
    </motion.footer>
  )
}
