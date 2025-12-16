"use client"

import { Post } from "@/lib/types"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function BlogHero({ post }: { post: Post }) {
  return (
    <section className="relative mb-16 w-full md:mb-24">
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="grid items-center gap-6 md:grid-cols-12">
          {/* Image Side */}
          <div className="relative aspect-4/3 overflow-hidden rounded-lg md:col-span-7 md:aspect-video lg:col-span-8">
            {post.cover_image_url ? (
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            ) : (
              <div className="bg-muted flex h-full w-full items-center justify-center">
                <span className="text-muted-foreground/20 font-serif text-6xl">S</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0" />
          </div>

          {/* Text Side */}
          <div className="flex flex-col justify-center space-y-4 md:col-span-5 md:pl-6 lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-primary flex items-center gap-3 text-sm font-medium tracking-wide uppercase">
                <span className="bg-primary h-px w-8"></span>
                Featured Story
              </div>
            </motion.div>

            <motion.h2
              className="text-foreground group-hover:text-primary font-serif text-3xl leading-tight transition-colors md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {post.title}
            </motion.h2>

            <motion.p
              className="text-muted-foreground line-clamp-3 text-base md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {post.excerpt}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-4"
            >
              <div className="text-foreground flex items-center gap-2 text-sm font-medium transition-transform duration-300 group-hover:translate-x-2">
                Read Full Story <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </motion.div>
          </div>
        </div>
      </Link>
    </section>
  )
}
