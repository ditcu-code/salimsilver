"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { addComment, CommentFormState } from "@/lib/actions/comment"
import { useTranslations } from "next-intl"
import { useActionState, useEffect, useRef } from "react"
import { toast } from "sonner"

interface CommentFormProps {
  postId: string
  userJson?: string // Passed as JSON string to avoid server component serialization issues if any
}

const initialState: CommentFormState = {
  message: "",
  errors: {},
}

export function CommentForm({ postId, userJson }: CommentFormProps) {
  const t = useTranslations("Blog.Comments")
  const [state, formAction, isPending] = useActionState(
    addComment,
    initialState,
  )
  const formRef = useRef<HTMLFormElement>(null)

  // Safe user parsing
  const user = userJson ? JSON.parse(userJson) : null

  useEffect(() => {
    if (state.success) {
      toast.success(state.message)
      formRef.current?.reset()
    } else if (state.message) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <input type="hidden" name="postId" value={postId} />

      {!user && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input
              name="guestName"
              placeholder={t("namePlaceholder")}
              aria-label={t("nameLabel")}
              required
            />
            {state.errors?.guestName && (
              <p className="text-xs text-destructive">
                {state.errors.guestName[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Input
              name="guestEmail"
              type="email"
              placeholder={t("emailPlaceholder")}
              aria-label={t("emailLabel")}
            />
            {state.errors?.guestEmail && (
              <p className="text-xs text-destructive">
                {state.errors.guestEmail[0]}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Textarea
          name="content"
          placeholder={t("commentPlaceholder")}
          aria-label={t("commentLabel")}
          rows={4}
          required
        />
        {state.errors?.content && (
          <p className="text-xs text-destructive">{state.errors.content[0]}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? t("submitting") : t("submit")}
        </Button>
      </div>
    </form>
  )
}
