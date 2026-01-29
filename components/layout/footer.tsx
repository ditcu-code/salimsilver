"use client"

import { sendGAEvent } from "@next/third-parties/google"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
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

const quickLinksConfig = [
  { href: "/catalog", key: "catalog" },
  { href: "/collections", key: "collections" },
  { href: "/workshop", key: "workshop" },
  { href: "/store-location", key: "storeLocation" },
  { href: "/silver-price", key: "silverPrice" },
  { href: "/gold-price", key: "goldPrice" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
  { href: "/blog", key: "journal" },
]

const contactLinksConfig = [
  {
    key: "email",
    href: "mailto:hello@salimsilver.com",
    display: "hello@salimsilver.com",
  },
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
  const t = useTranslations("Footer")
  useProtectImages()

  return (
    <motion.footer
      className="bg-background border-border border-t px-4 py-12 md:px-8"
      {...motionSettings}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-4">
        <AnimatedSection className="md:col-span-2">
          <div className="mb-6 flex w-fit flex-col">
            <Link
              href="/"
              className="font-display text-foreground text-3xl font-semibold"
            >
              <Image
                src="/images/logo-salimsilver.webp"
                alt="Salim Silver"
                width={260}
                height={40}
                className="h-12 object-contain invert dark:invert-0"
                style={{ width: "auto", maxWidth: "260px" }}
                loading="eager"
              />
            </Link>
            <span className="text-muted-foreground -mt-2 mr-1.5 self-end text-[0.7rem]">
              {t("brandDescription")}
            </span>
          </div>
          <p className="text-muted-foreground mb-6 max-w-md text-sm">
            Gg. Platina KG 3/547 - Kebohan, Purbayan <br /> Kotagede, Yogyakarta
            City, Indonesia
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <h3 className="section-title mb-2 text-2xl">{t("quickLinks")}</h3>
          <ul className="grid grid-cols-1 gap-1 md:grid-cols-2">
            {quickLinksConfig.map(({ href, key }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-muted-foreground hover:text-primary text-sm whitespace-nowrap transition-colors"
                >
                  {t(`links.${key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </AnimatedSection>

        <AnimatedSection>
          <h3 className="section-title mb-2 text-2xl">{t("contact")}</h3>
          <ul className="text-muted-foreground space-y-2">
            {contactLinksConfig.map(({ key, href, display }) => (
              <li key={key}>
                <h4 className="text-primary">{t(key)}</h4>
                {key === "email" ? (
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
            <h4 className="text-primary mb-2">{t("followUs")}</h4>
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
                  onClick={() =>
                    sendGAEvent("event", "social_click", {
                      network: label,
                      url: href,
                    })
                  }
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
          © {new Date().getFullYear()} Salim Silver.{" "}
          <br className="md:hidden" /> {t("rights")}
        </motion.p>
        <ThemeToggle />
      </div>
    </motion.footer>
  )
}
