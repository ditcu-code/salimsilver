import { Button } from "@/components/ui/button"
import { getAllPosts } from "@/lib/blog"
import { formatDate } from "@/lib/utils"
import { Edit, Plus } from "lucide-react"
import Link from "next/link"

export default async function AdminBlogPage() {
  const posts = await getAllPosts(true) // Include drafts

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-serif">Journal Posts</h1>
        <Link href="/admin/blog/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      <div className="border rounded-md bg-card">
        <div className="grid grid-cols-[3fr_1fr_1fr_auto] gap-4 p-4 border-b font-medium text-muted-foreground bg-muted/50">
          <div>Title</div>
          <div>Status</div>
          <div>Date</div>
          <div className="w-10"></div>
        </div>
        
        {posts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No posts found. Create your first story.
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="grid grid-cols-[3fr_1fr_1fr_auto] gap-4 p-4 border-b last:border-0 items-center hover:bg-muted/30 transition-colors">
              <div>
                <div className="font-medium">{post.title}</div>
                <div className="text-sm text-muted-foreground truncate max-w-[300px]">{post.slug}</div>
              </div>
              <div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  post.published 
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                }`}>
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
