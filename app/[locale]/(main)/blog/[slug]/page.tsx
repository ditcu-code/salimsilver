import BlogReadMore from "@/components/blocks/blog-read-more"
import { ShareButton } from "@/components/features/share-button"
import BackButton from "@/components/ui/back-button"
import { getPostBySlug } from "@/lib/blog"
import { BASE_URL } from "@/lib/constants"
import { formatDate } from "@/lib/utils"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import Image from "next/image"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const t = await getTranslations("JournalDetailPage.Metadata")
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: t("notFound"),
    }
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    alternates: {
      canonical: `${BASE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      url: `${BASE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: post.published_at,
      images: post.cover_image_url ? [post.cover_image_url] : ["/opengraph-image"],
    },
    keywords: post.tags,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const t = await getTranslations("JournalDetailPage.UI")
  const tb = await getTranslations("JournalDetailPage.Breadcrumbs")
  const post = await getPostBySlug(slug)

  if (!post || !post.published) {
    notFound()
  }

  return (
    <article className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] flex min-h-[max(50vh,400px)] w-screen flex-col justify-end md:min-h-[60vh]">
        {post.cover_image_url ? (
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="bg-muted absolute inset-0 flex h-full w-full items-center justify-center">
            <span className="text-muted-foreground/20 font-serif text-6xl">{t("journal")}</span>
          </div>
        )}
        <div className="from-background via-background/60 pointer-events-none absolute inset-0 bg-linear-to-t to-transparent" />

        <div className="relative z-10 container mx-auto max-w-4xl px-4 pt-40 pb-12 md:pt-56">
          <BackButton href="/blog">{t("backToJournal")}</BackButton>
          <h1 className="mb-4 font-serif text-4xl leading-tight font-medium md:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
            <span>
              {post.published_at ? formatDate(post.published_at) : t("recentlyPublished")}
            </span>
            {/* Author */}
            {post.author && (
              <>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <div className="relative h-6 w-6 overflow-hidden rounded-full">
                    {post.author.avatar_url ? (
                      <Image
                        src={post.author.avatar_url}
                        alt={post.author.full_name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="bg-primary/10 flex h-full w-full items-center justify-center text-[10px] font-bold">
                        {post.author.full_name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span>{post.author.full_name}</span>
                </div>
              </>
            )}
            {post.updated_at && post.updated_at !== post.published_at && (
              <>
                <span>•</span>
                <span>{t("updated", { date: formatDate(post.updated_at) })}</span>
              </>
            )}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 mt-4 flex flex-wrap gap-2 duration-700">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-foreground/5 text-foreground/80 border-foreground/10 rounded-full border px-3 py-1 text-xs font-medium tracking-wide backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto mt-12 max-w-3xl px-4">
        <div className="mb-8 flex items-center justify-between border-b pb-8">
          <div className="text-muted-foreground text-sm font-medium">{t("share")}</div>
          <ShareButton title={post.title} />
        </div>

        <div
          className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:font-medium prose-img:rounded-lg prose-a:text-primary hover:prose-a:underline max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />

        <BlogReadMore />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.meta_description || post.excerpt,
            image: post.cover_image_url ? [post.cover_image_url] : [],
            datePublished: post.published_at,
            dateModified: post.updated_at || post.published_at,
            author: {
              "@type": "Person",
              name: "Salim Silver",
            },
            publisher: {
              "@type": "Organization",
              name: "Salim Silver",
              logo: {
                "@type": "ImageObject",
                url: "https://salimsilver.com/images/logo-salimsilver.webp",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://salimsilver.com/blog/${post.slug}`,
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: tb("journal"),
                item: `${BASE_URL}/blog`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: post.title,
                item: `${BASE_URL}/blog/${post.slug}`,
              },
            ],
          }),
        }}
      />
    </article>
  )
}
