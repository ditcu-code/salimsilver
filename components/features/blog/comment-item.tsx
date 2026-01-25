import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BlogComment } from "@/lib/types"
import { formatDate } from "@/lib/utils"

interface CommentItemProps {
  comment: BlogComment
}

export function CommentItem({ comment }: CommentItemProps) {
  const authorName =
    comment.user?.full_name || comment.guest_name || "Anonymous"
  const authorInitial = authorName.charAt(0).toUpperCase()
  const avatarUrl = comment.user?.avatar_url

  return (
    <div className="flex gap-4 p-4 border rounded-lg bg-card text-card-foreground">
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatarUrl || ""} alt={authorName} />
        <AvatarFallback>{authorInitial}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium leading-none">{authorName}</p>
          <p className="text-xs text-muted-foreground">
            {formatDate(comment.created_at)}
          </p>
        </div>
        <p className="text-sm text-foreground/80">{comment.content}</p>
      </div>
    </div>
  )
}
