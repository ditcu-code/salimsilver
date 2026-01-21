import BlogReadMore from "@/components/blocks/blog-read-more"
import { ViewCounter } from "@/components/features/blog/view-counter"
import { ShareButton } from "@/components/features/share-button"
import BackButton from "@/components/ui/back-button"
import { getPostBySlug } from "@/lib/blog"
import { BASE_URL } from "@/lib/constants"
import {
  constructCanonicalUrl,
  getAlternates,
  getOpenGraphLocale,
} from "@/lib/seo"
import { formatDate } from "@/lib/utils"
import { Eye } from "lucide-react"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import Image from "next/image"
import { notFound } from "next/navigation"

function isSameMonth(
  date1?: string | Date | null,
  date2?: string | Date | null,
) {
  if (!date1 || !date2) return false
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  return (
    d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()
  )
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string
    locale: string
  }>
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params
  const t = await getTranslations("JournalDetailPage.Metadata")
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: t("notFound"),
    }
  }

  const title = post.meta_title || post.title
  const description = post.meta_description || post.excerpt
  const url = `${BASE_URL}/blog/${slug}`

  return {
    title,
    description,
    alternates: {
      canonical: constructCanonicalUrl(locale, `/blog/${slug}`),
      languages: getAlternates(`/blog/${slug}`),
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.published_at,
      images: post.cover_image_url
        ? [post.cover_image_url]
        : ["/opengraph-image"],
      locale: getOpenGraphLocale(locale),
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
      <ViewCounter postId={post.id} />
      {/* Hero Section */}
      <div className="absolute top-0 flex h-56 w-screen md:h-96">
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
            <span className="text-muted-foreground/20 font-serif text-6xl">
              {t("journal")}
            </span>
          </div>
        )}
        <div className="from-background via-background/60 pointer-events-none absolute inset-0 bg-linear-to-t to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto max-w-4xl px-4 pt-24 pb-12 md:pt-50">
        <BackButton href="/blog">{t("backToJournal")}</BackButton>
        <h1 className="mb-4 font-serif text-3xl leading-tight font-medium md:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
          <span>
            {post.published_at
              ? formatDate(post.published_at)
              : t("recentlyPublished")}
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
          {post.updated_at &&
            post.updated_at !== post.published_at &&
            !isSameMonth(post.published_at, post.updated_at) && (
              <>
                <span>•</span>
                <span>
                  {t("updated", { date: formatDate(post.updated_at) })}
                </span>
              </>
            )}
          <span>•</span>
          <div
            className="flex items-center gap-1.5"
            title={`${post.views || 0} views`}
          >
            <Eye className="h-4 w-4" />
            <span>{post.views || 0}</span>
          </div>
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

      {/* Content */}
      <div className="container mx-auto mt-8 max-w-3xl px-4">
        <div
          className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:font-medium prose-img:rounded-lg prose-a:text-primary hover:prose-a:underline max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />

        <div className="mt-8 flex items-center justify-end space-x-4">
          <div className="text-muted-foreground text-sm font-medium">
            {t("share")}
          </div>
          <ShareButton title={post.title} />
        </div>

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
