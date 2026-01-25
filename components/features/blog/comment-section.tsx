import { getComments } from "@/lib/actions/comment"
import { createClient } from "@/lib/supabase/server"
import { getTranslations } from "next-intl/server"
import { CommentForm } from "./comment-form"
import { CommentList } from "./comment-list"

interface CommentSectionProps {
  postId: string
}

export async function CommentSection({ postId }: CommentSectionProps) {
  const comments = await getComments(postId)
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const t = await getTranslations("Blog.Comments")

  // Serialize user to pass to client component
  const userJson = user ? JSON.stringify(user) : undefined

  return (
    <div className="mt-16 pt-8 border-t">
      <div className="flex flex-row justify-between mb-8">
        <h2 className="text-2xl font-serif font-medium">{t("title")}</h2>
        <h3 className="text-lg font-medium">
          {t("commentsCount", { count: comments ? comments.length : 0 })}
        </h3>
      </div>

      <div className="space-y-6 mb-16">
        <CommentList comments={comments || []} />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">{t("leaveComment")}</h3>
        <CommentForm postId={postId} userJson={userJson} />
      </div>
    </div>
  )
}
