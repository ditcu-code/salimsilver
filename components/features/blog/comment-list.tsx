import { BlogComment } from "@/lib/types"
import { getTranslations } from "next-intl/server"
import { CommentItem } from "./comment-item"

interface CommentListProps {
  comments: BlogComment[]
}

export async function CommentList({ comments }: CommentListProps) {
  const t = await getTranslations("Blog.Comments")

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {t("noComments")}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  )
}
