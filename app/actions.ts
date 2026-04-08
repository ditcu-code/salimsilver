"use server"

import {
  consumeContactFormAttempt,
  extractClientIp,
  getMessageSpamError,
  getRateLimitMessage,
  getSubmissionTimingState,
} from "@/lib/contact-form-security"
import { headers } from "next/headers"
import { Resend } from "resend"
import { z } from "zod"

const resend = new Resend(process.env.RESEND_API_KEY)

const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(320, "Email is too long"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(2000, "Message is too long"),
})

export async function submitContactForm(prevState: any, formData: FormData) {
  // Honeypot check
  const honeyPot = formData.get("_gotcha")
  if (honeyPot && honeyPot !== "") {
    // Silent success for bots
    return { success: true, message: "Message sent successfully!" }
  }

  const timingState = getSubmissionTimingState(formData.get("_startedAt"))
  if (timingState === "too_fast" || timingState === "invalid") {
    return { success: true, message: "Message sent successfully!" }
  }

  if (timingState === "expired") {
    return { message: "This form has expired. Please refresh the page and try again." }
  }

  const validatedFields = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  })

  if (!validatedFields.success) {
    const errors: Record<string, string[]> = {}
    validatedFields.error.issues.forEach((issue) => {
      const path = issue.path[0] as string
      if (!errors[path]) {
        errors[path] = []
      }
      errors[path].push(issue.message)
    })

    return {
      errors,
      message: "Please check the form for errors.",
      fields: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
      },
    }
  }

  const { name, email, message } = validatedFields.data
  const messageSpamError = getMessageSpamError(message)

  if (messageSpamError) {
    return {
      errors: {
        message: [messageSpamError],
      },
      message: "Please check the form for errors.",
      fields: {
        name,
        email,
        message,
      },
    }
  }

  const headerList = await headers()
  const clientIp = extractClientIp(headerList)
  const rateLimitResult = consumeContactFormAttempt(clientIp)

  if (!rateLimitResult.allowed) {
    return {
      message: getRateLimitMessage(rateLimitResult.retryAfterMs),
      fields: {
        name,
        email,
        message,
      },
    }
  }

  try {
    const data = await resend.emails.send({
      from: "Salim Silver Contact Form <contact_form@salimsilver.com>", // Use default until user configures domain
      to: process.env.CONTACT_EMAIL_TO || "design@salimsilver.com",
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      replyTo: email,
    })

    if (data.error) {
      console.error("Resend error:", data.error)
      return { message: "Failed to send message. Please try again." }
    }

    return { success: true, message: "Message sent successfully!" }
  } catch (error) {
    console.error("Server error:", error)
    return { message: "Failed to send message. Please try again." }
  }
}
