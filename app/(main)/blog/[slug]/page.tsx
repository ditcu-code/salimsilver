import { ShareButton } from "@/components/features/share-button"
import { getPostBySlug } from "@/lib/blog"
import { formatDate } from "@/lib/utils"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      type: "article",
      publishedTime: post.published_at,
      images: post.cover_image_url ? [post.cover_image_url] : [],
    },
    keywords: post.tags,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post || !post.published) {
    notFound()
  }

  return (
    <article className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh]">
        {post.cover_image_url ? (
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
             <span className="font-serif text-6xl text-muted-foreground/20">Journal</span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent flex items-end">
         <div className="container mx-auto px-4 pb-12 max-w-4xl">
           <Link href="/blog" className="text-sm font-medium mb-6 inline-block hover:text-primary/80 transition-colors">
             &larr; Back to Journal
           </Link>
           <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-4">
             {post.title}
           </h1>
           <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
             <span>{post.published_at ? formatDate(post.published_at) : "Recently published"}</span>
             {post.updated_at && post.updated_at !== post.published_at && (
                <>
                <span>•</span>
                <span>Updated {formatDate(post.updated_at)}</span>
                </>
             )}
           </div>
           {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
                {post.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-foreground/5 backdrop-blur-md rounded-full text-xs font-medium tracking-wide text-foreground/80 border border-foreground/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
           )}
         </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-3xl mt-12">
        <div className="flex justify-between items-center mb-8 pb-8 border-b">
           <div className="text-sm font-medium text-muted-foreground">
             Share this story
           </div>
           <ShareButton title={post.title} />
        </div>

        <div 
          className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:font-medium prose-img:rounded-lg prose-a:text-primary hover:prose-a:underline max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
        
        <div className="mt-16 pt-8 border-t flex justify-center">
          <Link href="/blog">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors">
              Read More Stories
            </button>
          </Link>
        </div>
      </div>
    </article>
  )
}
