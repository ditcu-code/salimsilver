"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import useDisableRightClick from './useDisableRightClick'; // Adjust the import path as necessary

export default function Footer() {
  useDisableRightClick(); // Apply the hook to disable right-click on images

  return (
    <motion.footer
      className="bg-background border-t border-border py-12 px-4 md:px-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            {/* <Logo /> */}
            <Link href="/" className="font-cormorantGaramond text-2xl font-bold inline-block text-foreground">
              Salim Silver
            </Link>
          </div>
          <p className="text-muted-foreground max-w-md mb-6">
            Handcrafted silver jewelry that tells a story of elegance and tradition. Timeless pieces for the modern soul.
          </p>
          <div className="flex space-x-4 items-center">
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </motion.a>
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </motion.a>
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </motion.a>
            <ThemeToggle />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="section-title text-2xl mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/catalog" className="text-muted-foreground hover:text-primary transition-colors">
                Catalog
              </Link>
            </li>
            <li>
              <Link href="/collections" className="text-muted-foreground hover:text-primary transition-colors">
                Collections
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="section-title text-2xl mb-4">Contact</h3>
          <ul className="space-y-2 text-muted-foreground">
            <h4 className="text-primary">Email</h4>
            <a href="mailto:hello@salimsilver.com"><li>hello@salimsilver.com</li></a> 
            <h4 className="text-primary">Location</h4>
            <li>Bali, Indonesia</li>
          </ul>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border">
        <motion.p
          className="text-center text-muted-foreground text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} Salim Silver. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  )
}
