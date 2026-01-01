"use client"

import { submitContactForm } from "@/app/actions"
import { cn } from "@/lib/utils"
import { sendGAEvent } from "@next/third-parties/google"
import { useActionState, useEffect, useRef } from "react"
import { toast } from "sonner"

interface ContactFormProps {
  className?: string
}

const initialState = {
  message: "",
  errors: undefined,
  fields: undefined,
  success: false,
}

export function ContactForm({ className }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success) {
      toast.success("Message sent successfully!")
      sendGAEvent("event", "form_submit", { form_name: "contact_form" })
      formRef.current?.reset()
    } else if (state?.message && !state.success) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form ref={formRef} action={formAction} className={cn("space-y-6", className)}>
      <div>
        <label htmlFor="name" className="text-primary block text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={state?.fields?.name}
          className="border-border focus:border-primary focus:ring-primary bg-card mt-1 block w-full rounded-xl border px-3 py-2 focus:border focus:ring-1 focus:outline-none"
        />
        {state?.errors?.name && <p className="mt-1 text-sm text-red-500">{state.errors.name[0]}</p>}
      </div>
      <div>
        <label htmlFor="email" className="text-primary block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          defaultValue={state?.fields?.email}
          className="border-border focus:border-primary focus:ring-primary bg-card mt-1 block w-full rounded-xl border px-3 py-2 focus:ring-1 focus:outline-none"
        />
        {state?.errors?.email && (
          <p className="mt-1 text-sm text-red-500">{state.errors.email[0]}</p>
        )}
      </div>

      {/* Honeypot field - invisible to users, filled by bots */}
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label htmlFor="_gotcha">Do not fill this field</label>
        <input type="text" id="_gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="message" className="text-primary block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          defaultValue={state?.fields?.message}
          className="border-border focus:border-primary focus:ring-primary bg-card mt-1 block w-full rounded-xl border px-3 py-2 focus:border focus:ring-1 focus:outline-none"
        />
        {state?.errors?.message && (
          <p className="mt-1 text-sm text-red-500">{state.errors.message[0]}</p>
        )}
      </div>
      <div>
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            "bg-primary dark:text-primary-foreground hover:bg-primary/90 focus:ring-primary w-full cursor-pointer rounded-xl px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none",
            isPending && "cursor-not-allowed opacity-50"
          )}
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  )
}
