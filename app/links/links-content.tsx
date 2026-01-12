"use client"

import { Facebook } from "@/components/icons/facebook"
import { Instagram } from "@/components/icons/instagram"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Globe, Hammer, Mail, MapPin, MessageCircle, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function LinksContent() {
  const links = [
    {
      label: "Visit Our Website",
      href: "/",
      icon: Globe,
      variant: "default" as const,
    },
    {
      label: "See Our Collections",
      href: "/collections",
      icon: ShoppingBag,
      variant: "outline" as const,
    },
    {
      label: "Book a Workshop",
      href: "/workshop",
      icon: Hammer,
      variant: "outline" as const,
    },
    {
      label: "Chat with Us",
      href: "https://wa.me/6289671977699",
      icon: MessageCircle,
      variant: "outline" as const,
    },
    {
      label: "Find Us on Google Maps",
      href: "https://maps.google.com/maps/dir//Salim+Silver+Kebohan+KG+3%2F547+Purbayan+Kotagede,+Yogyakarta+City,+Special+Region+of+Yogyakarta+55173/@-7.8272881,110.4018794,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x2e7a571440134b63:0x5c7989d8a5177cca",
      icon: MapPin,
      variant: "outline" as const,
    },
  ]

  const socials = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/salimsilverofficial/",
      icon: Instagram,
    },
    {
      label: "Facebook",
      href: "https://web.facebook.com/SalimSilverArt",
      icon: Facebook,
    },
    {
      label: "Email",
      href: "mailto:salim@salimsilver.com",
      icon: Mail,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  }

  return (
    <div className="bg-background text-foreground relative flex min-h-screen flex-col items-center overflow-hidden px-4 py-12">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute top-0 left-0 -z-10 h-full w-full overflow-hidden opacity-20">
        <div className="bg-primary/20 absolute -top-[10%] -left-[10%] h-[50%] w-[50%] rounded-full blur-[100px]" />
        <div className="bg-accent/20 absolute right-[10%] bottom-[10%] h-[40%] w-[40%] rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="z-10 flex w-full max-w-sm flex-col gap-8"
      >
        {/* Profile Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-2 text-center"
        >
          <div className="border-border relative h-20 w-20 overflow-hidden rounded-full border-2 shadow-md">
            <Image
              src="/images/icon-salimsilver.webp"
              alt="Salim Silver Icon Logo"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 33vw, 80px"
              quality={85}
            />
          </div>
          <div className="space-y-2">
            <h1 className="font-display text-2xl font-bold">Salim Silver</h1>
            <p className="text-muted-foreground max-w-[250px] text-sm">
              Handcrafted Javanese Silver Jewelry from Kotagede, Yogyakarta.
            </p>
          </div>
        </motion.div>

        {/* Links Section */}
        <div className="flex flex-col gap-4">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <motion.div key={link.label} variants={itemVariants}>
                <Button
                  variant={link.variant}
                  size="lg"
                  className="group h-14 w-full justify-between rounded-xl shadow-sm transition-transform duration-200 hover:scale-[1.02]"
                  asChild
                >
                  <Link
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                  >
                    <span className="flex items-center gap-3">
                      <Icon
                        className={`h-5 w-5 transition-colors ${
                          link.variant === "default" ? "text-primary-foreground" : "text-primary"
                        }`}
                      />
                      <span className="text-base font-medium">{link.label}</span>
                    </span>
                    {/* Arrow or visual indicator */}
                  </Link>
                </Button>
              </motion.div>
            )
          })}
        </div>

        {/* Socials Section */}
        <motion.div variants={itemVariants} className="flex justify-center gap-4 pt-4">
          {socials.map((social) => {
            const Icon = social.icon
            return (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                className="bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground rounded-full p-3 transition-all duration-300 hover:scale-110"
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{social.label}</span>
              </Link>
            )
          })}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-muted-foreground mt-4 text-center text-xs"
        >
          <p>© {new Date().getFullYear()} Salim Silver. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
