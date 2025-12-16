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
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
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
            className="group bg-background/50 flex h-full flex-col overflow-hidden rounded-lg transition-all hover:-translate-y-1"
          >
            <div className="bg-muted relative mb-4 aspect-4/3 overflow-hidden rounded-md">
              {post.cover_image_url ? (
                <Image
                  src={post.cover_image_url}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="text-muted-foreground/30 flex h-full w-full items-center justify-center">
                  <span className="font-serif text-4xl">S</span>
                </div>
              )}
              <div className="absolute inset-0 rounded-md ring-1 ring-black/5 ring-inset" />
            </div>

            <div className="flex flex-1 flex-col space-y-3">
              <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                {post.published_at ? formatDate(post.published_at) : "Recently"}
              </div>
              <h3 className="group-hover:text-primary line-clamp-2 font-serif text-2xl leading-tight font-medium transition-colors">
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
