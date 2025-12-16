import { BlogGrid } from "@/components/blocks/blog-grid"
import { BlogHero } from "@/components/blocks/blog-hero"
import { getAllPosts } from "@/lib/blog"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Journal | Salim Silver",
  description:
    "Read about our craftsmanship, materials, and the stories behind Javanese silver jewelry.",
}

export default async function BlogPage() {
  const posts = await getAllPosts(false)
  const featuredPost = posts.find((p) => p.featured)
  const remainingPosts = featuredPost ? posts.filter((p) => p.id !== featuredPost.id) : posts

  if (posts.length === 0) {
    return (
      <div className="text-muted-foreground border-border/50 border-y py-20 text-center">
        <p className="text-lg">No stories published yet. We are crafting something special.</p>
      </div>
    )
  }

  return (
    <>
      {/* Featured Hero Section */}
      {featuredPost && <BlogHero post={featuredPost} />}

      {/* Divider */}
      {remainingPosts.length > 0 && <div className="border-border/40 my-16 border-t" />}

      {/* Grid for other posts */}
      <BlogGrid posts={remainingPosts} />
    </>
  )
}
