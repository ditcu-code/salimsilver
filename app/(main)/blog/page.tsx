import { BlogGrid } from "@/components/blocks/blog-grid"
import { BlogHero } from "@/components/blocks/blog-hero"
import { getAllPosts } from "@/lib/blog"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Journal | Salim Silver",
  description: "Read about our craftsmanship, materials, and the stories behind Javanese silver jewelry.",
}

export default async function BlogPage() {
  const posts = await getAllPosts(false)
  const featuredPost = posts.find((p) => p.featured)
  const remainingPosts = featuredPost 
    ? posts.filter((p) => p.id !== featuredPost.id) 
    : posts

  return (
    <div className="min-h-screen pt-24 pb-20 md:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto space-y-4">
           <h1 className="mt-8 md:mt-4 font-display text-4xl lg:text-5xl text-foreground tracking-tight">
             The Journal
           </h1>
           <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light">
             From the heart of Kotagede to your hands. Explore the history, techniques, and stories behind our handcrafted silver legacy.
           </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground border-y border-border/50">
            <p className="text-lg">No stories published yet. We are crafting something special.</p>
          </div>
        ) : (
          <>
            {/* Featured Hero Section */}
            {featuredPost && <BlogHero post={featuredPost} />}

            {/* Divider */}
            {remainingPosts.length > 0 && <div className="border-t border-border/40 my-16" />}

            {/* Grid for other posts */}
            <BlogGrid posts={remainingPosts} />
          </>
        )}
      </div>
    </div>
  )
}
