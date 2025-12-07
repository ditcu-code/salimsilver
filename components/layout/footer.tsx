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
  { href: "/store-location", label: "Store Location" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
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
      className="bg-background border-t border-border py-12 px-4 md:px-8"
      {...motionSettings}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 md:grid-cols-4">
        <AnimatedSection className="md:col-span-2">
          <div className="mb-6 flex flex-col w-fit">
            <Link href="/" className="font-display text-3xl font-semibold text-foreground">
              <Image
                src="/images/logo-salimsilver.webp"
                alt="Salim Silver"
                width={150}
                height={40}
                className="h-12 w-auto object-contain dark:invert-0 invert"
              />
            </Link>
            <span className="text-[0.7rem] text-muted-foreground self-end -mt-2 mr-2">
              Heritage Forged by Hand
            </span>
          </div>
          <p className="mb-6 max-w-md text-md text-muted-foreground">
            Kebohan KG 3/547, Purbayan <br /> Kotagede, Yogyakarta City, Indonesia
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <h3 className="section-title mb-2 text-2xl">Quick Links</h3>
          <ul className="space-y-1">
            {quickLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </AnimatedSection>

        <AnimatedSection>
          <h3 className="section-title mb-2 text-2xl">Contact</h3>
          <ul className="space-y-2 text-muted-foreground">
            {contactLinks.map(({ label, href, display }) => (
              <li key={label}>
                <h4 className="text-primary">{label}</h4>
                {label === "Email" ? (
                  <div className="text-sm text-muted-foreground">
                    <ObfuscatedEmail user="hello" domain="salimsilver.com" />
                  </div>
                ) : (
                  <a href={href} className="text-sm text-muted-foreground">
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
                  className="text-foreground transition-colors hover:text-primary"
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

      <div className="mx-auto mt-12 max-w-7xl border-t border-border pt-8 flex flex-row items-center justify-between gap-4">
        <motion.p className="text-sm text-muted-foreground" {...motionSettings}>
          © {new Date().getFullYear()} Salim Silver. <br className="md:hidden" /> All rights
          reserved.
        </motion.p>
        <ThemeToggle />
      </div>
    </motion.footer>
  )
}
