"use client"

import { Post } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function BlogGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null

  return (
    <motion.div 
      className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {posts.map((post) => (
        <motion.div key={post.id} variants={item} className="h-full">
          <Link 
            href={`/blog/${post.slug}`}
            className="group flex flex-col h-full bg-background/50 rounded-lg overflow-hidden transition-all hover:-translate-y-1"
          >
            <div className="aspect-4/3 relative overflow-hidden bg-muted rounded-md mb-4">
              {post.cover_image_url ? (
                <Image
                  src={post.cover_image_url}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                  <span className="font-serif text-4xl">S</span>
                </div>
              )}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-md" />
            </div>
            
            <div className="flex flex-col flex-1 space-y-3">
              <div className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
                {post.published_at ? formatDate(post.published_at) : "Recently"}
              </div>
              <h3 className="font-serif text-2xl font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
