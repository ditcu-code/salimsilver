"use client"

import { Post } from "@/lib/types"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function BlogHero({ post }: { post: Post }) {
  return (
    <section className="relative w-full mb-16 md:mb-24">
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="grid md:grid-cols-12 gap-6 items-center">
          {/* Image Side */}
          <div className="md:col-span-7 lg:col-span-8 relative aspect-4/3 md:aspect-video overflow-hidden rounded-lg">
            {post.cover_image_url ? (
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="font-serif text-6xl text-muted-foreground/20">S</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
          </div>

          {/* Text Side */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-center space-y-4 md:pl-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 text-sm text-primary font-medium tracking-wide uppercase">
                <span className="w-8 h-px bg-primary"></span>
                Featured Story
              </div>
            </motion.div>

            <motion.h2 
              className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-foreground transition-colors group-hover:text-primary"
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
              <div className="flex items-center gap-2 text-sm font-medium text-foreground group-hover:translate-x-2 transition-transform duration-300">
                Read Full Story <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>
          </div>
        </div>
      </Link>
    </section>
  )
}
