"use client"

import { submitContactForm } from "@/app/actions"
import { TurnstileWidget } from "@/components/features/turnstile-widget"
import { cn } from "@/lib/utils"
import { sendGAEvent } from "@next/third-parties/google"
import { useSearchParams } from "next/navigation"
import { useActionState, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
interface ContactFormProps {
  className?: string
}

const initialState = {
  message: "",
  errors: undefined,
  fields: undefined,
  resetTurnstile: false,
  success: false,
}

export function ContactForm({ className }: ContactFormProps) {
  const searchParams = useSearchParams()
  const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)
  const [startedAt, setStartedAt] = useState("")
  const [turnstileToken, setTurnstileToken] = useState("")
  const [turnstileResetKey, setTurnstileResetKey] = useState(0)
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  )
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    setStartedAt(Date.now().toString())
  }, [])

  useEffect(() => {
    if (state?.success) {
      toast.success("Message sent successfully!")
      sendGAEvent("event", "form_submit", { form_name: "contact_form" })
      formRef.current?.reset()
      setStartedAt(Date.now().toString())
      setTurnstileToken("")
      setTurnstileResetKey((current) => current + 1)
    } else if (state?.message && !state.success) {
      toast.error(state.message)

      if (state.resetTurnstile) {
        setTurnstileToken("")
        setTurnstileResetKey((current) => current + 1)
      }
    }
  }, [state])

  return (
    <form
      ref={formRef}
      action={formAction}
      className={cn("space-y-6", className)}
    >
      <div>
        <label
          htmlFor="name"
          className="text-primary block text-sm font-medium"
        >
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
        {state?.errors?.name && (
          <p className="mt-1 text-sm text-red-500">{state.errors.name[0]}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="email"
          className="text-primary block text-sm font-medium"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={state?.fields?.email}
          className="border-border focus:border-primary focus:ring-primary bg-card mt-1 block w-full rounded-xl border px-3 py-2 focus:ring-1 focus:outline-none"
        />
        {state?.errors?.email && (
          <p className="mt-1 text-sm text-red-500">{state.errors.email[0]}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="whatsapp"
          className="text-primary block text-sm font-medium"
        >
          WhatsApp Number
        </label>
        <input
          type="tel"
          id="whatsapp"
          name="whatsapp"
          inputMode="tel"
          defaultValue={state?.fields?.whatsapp}
          className="border-border focus:border-primary focus:ring-primary bg-card mt-1 block w-full rounded-xl border px-3 py-2 focus:ring-1 focus:outline-none"
        />
        {state?.errors?.whatsapp && (
          <p className="mt-1 text-sm text-red-500">{state.errors.whatsapp[0]}</p>
        )}
      </div>

      {/* Honeypot field - invisible to users, filled by bots */}
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label htmlFor="_gotcha">Do not fill this field</label>
        <input
          type="text"
          id="_gotcha"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input type="hidden" name="_startedAt" value={startedAt} />
      <input type="hidden" name="cf-turnstile-response" value={turnstileToken} />
      <div>
        <label
          htmlFor="message"
          className="text-primary block text-sm font-medium"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          defaultValue={
            state?.fields?.message ?? searchParams.get("message") ?? ""
          }
          className="border-border focus:border-primary focus:ring-primary bg-card mt-1 block w-full rounded-xl border px-3 py-2 focus:border focus:ring-1 focus:outline-none"
        />
        {state?.errors?.message && (
          <p className="mt-1 text-sm text-red-500">{state.errors.message[0]}</p>
        )}
      </div>
      {turnstileEnabled && (
        <div className="space-y-2">
          <TurnstileWidget
            onTokenChange={setTurnstileToken}
            resetKey={turnstileResetKey}
          />
          {!turnstileToken && (
            <p className="text-muted-foreground text-xs">
              Complete the verification challenge before sending your message.
            </p>
          )}
        </div>
      )}
      <div>
        <button
          type="submit"
          disabled={isPending || (turnstileEnabled && !turnstileToken)}
          className={cn(
            "bg-primary dark:text-primary-foreground hover:bg-primary/90 focus:ring-primary w-full cursor-pointer rounded-xl px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none",
            (isPending || (turnstileEnabled && !turnstileToken)) &&
              "cursor-not-allowed opacity-50",
          )}
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  )
}
