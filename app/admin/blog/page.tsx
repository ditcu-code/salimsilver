import { Button } from "@/components/ui/button"
import { getAllPosts } from "@/lib/blog"
import { createClient } from "@/lib/supabase/server"
import { formatDate } from "@/lib/utils"
import { Edit, Plus } from "lucide-react"
import Link from "next/link"

export default async function AdminBlogPage() {
  const supabase = await createClient()
  const posts = await getAllPosts(true) // Include drafts

  // Fetch author names
  const userIds = [...new Set(posts.map((p) => p.author_id).filter(Boolean))]
  let usersMap: Record<string, string> = {}

  if (userIds.length > 0) {
    const { data: users } = await supabase
      .from("users")
      .select("id, full_name")
      .in("id", userIds as string[])

    if (users) {
      users.forEach((user) => {
        usersMap[user.id] = user.full_name
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold">Journal Posts</h1>
        <Link href="/admin/blog/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      <div className="bg-card rounded-md border">
        <div className="text-muted-foreground bg-muted/50 grid grid-cols-[3fr_1.5fr_1fr_1fr_auto] gap-4 border-b p-4 font-medium">
          <div>Title</div>
          <div>Author</div>
          <div>Status</div>
          <div>Date</div>
          <div className="w-10"></div>
        </div>

        {posts.length === 0 ? (
          <div className="text-muted-foreground p-8 text-center">
            No posts found. Create your first story.
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="hover:bg-muted/30 grid grid-cols-[3fr_1.5fr_1fr_1fr_auto] items-center gap-4 border-b p-4 transition-colors last:border-0"
            >
              <div>
                <div className="font-medium">{post.title}</div>
                <div className="text-muted-foreground max-w-[300px] truncate text-sm">
                  {post.slug}
                </div>
              </div>
              <div className="text-sm">
                {post.author_id ? usersMap[post.author_id] || "Unknown" : "-"}
              </div>
              <div>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    post.published
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>
              <div className="text-sm">
                {post.published_at ? formatDate(post.published_at) : "Unpublished"}
              </div>
              <div className="flex justify-end">
                <Link href={`/admin/blog/${post.id}`}>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
