"use client"

import { Button, type ButtonProps } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"

interface SubmitButtonProps extends ButtonProps {
  text?: string
  loadingText?: string
  isLoading?: boolean
}

export function SubmitButton({
  text = "Submit",
  loadingText = "Submitting...",
  isLoading,
  className,
  children,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus()
  const isPending = isLoading ?? pending

  return (
    <Button type="submit" disabled={isPending} className={className} {...props}>
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children || text
      )}
    </Button>
  )
}
