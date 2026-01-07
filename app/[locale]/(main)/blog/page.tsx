import { BlogGrid } from "@/components/blocks/blog-grid"
import { BlogHeaderSection } from "@/components/blocks/blog-header-section"
import { BlogHero } from "@/components/blocks/blog-hero"
import { getAllPosts } from "@/lib/blog"
import { BASE_URL } from "@/lib/constants"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Journal | Salim Silver",
  description:
    "Read about our craftsmanship, materials, and the stories behind Javanese silver jewelry.",
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    type: "website",
    title: "Journal | Salim Silver",
    description:
      "Read about our craftsmanship, materials, and the stories behind Javanese silver jewelry.",
    url: `${BASE_URL}/blog`,
    siteName: "Salim Silver",
  },
  twitter: {
    card: "summary_large_image",
    title: "Journal | Salim Silver",
    description:
      "Read about our craftsmanship, materials, and the stories behind Javanese silver jewelry.",
  },
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
    <div className="min-h-screen pt-24 pb-20 md:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <BlogHeaderSection />

        {/* Featured Hero Section */}
        {featuredPost && <BlogHero post={featuredPost} />}

        {/* Divider */}
        {remainingPosts.length > 0 && <div className="border-border/40 my-16 border-t" />}

        {/* Grid for other posts */}
        <BlogGrid posts={remainingPosts} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Salim Silver Journal",
            description:
              "Read about our craftsmanship, materials, and the stories behind Javanese silver jewelry.",
            url: `${BASE_URL}/blog`,
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              url: `${BASE_URL}/blog/${post.slug}`,
              datePublished: post.published_at,
              image: post.cover_image_url,
            })),
          }),
        }}
      />
    </div>
  )
}
