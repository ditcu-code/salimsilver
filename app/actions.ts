"use server"

import {
  consumeContactFormAttempt,
  extractClientIp,
  getMessageSpamError,
  getMessageSpamReason,
  getRateLimitMessage,
  getSubmissionTimingState,
  getTurnstileErrorMessage,
  validateTurnstileToken
} from "@/lib/contact-form-security"
import {
  CareerApplicationErrorCode,
  CareerApplicationField,
  CareerApplicationFields,
  CareerApplicationMessageCode,
  CareerApplicationState,
  MAX_CV_SIZE_BYTES
} from "@/lib/career-application"
import { headers } from "next/headers"
import { Resend } from "resend"
import { z } from "zod"

const resend = new Resend(process.env.RESEND_API_KEY)

const contactFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(100, "Name is too long"),
    email: z
      .string()
      .trim()
      .max(320, "Email is too long")
      .refine((value) => value === "" || z.email().safeParse(value).success, {
        message: "Invalid email address"
      }),
    whatsapp: z
      .string()
      .trim()
      .max(30, "WhatsApp number is too long")
      .refine((value) => value === "" || /^\+?[0-9()\-\s]{8,20}$/.test(value), {
        message: "Invalid WhatsApp number"
      }),
    message: z
      .string()
      .trim()
      .min(1, "Message is required")
      .max(2000, "Message is too long")
  })
  .superRefine(({ email, whatsapp }, ctx) => {
    if (email || whatsapp) {
      return
    }

    const message = "Please provide an email address or WhatsApp number."

    ctx.addIssue({
      code: "custom",
      message,
      path: ["email"]
    })
    ctx.addIssue({
      code: "custom",
      message,
      path: ["whatsapp"]
    })
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
    return {
      message: "This form has expired. Please refresh the page and try again."
    }
  }

  const validatedFields = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    whatsapp: formData.get("whatsapp"),
    message: formData.get("message")
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
        whatsapp: formData.get("whatsapp") as string,
        message: formData.get("message") as string
      }
    }
  }

  const { name, email, whatsapp, message } = validatedFields.data
  const messageSpamError = getMessageSpamError(message)

  if (messageSpamError) {
    return {
      errors: {
        message: [messageSpamError]
      },
      message: "Please check the form for errors.",
      fields: {
        name,
        email,
        whatsapp,
        message
      }
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
        whatsapp,
        message
      }
    }
  }

  const turnstileResult = await validateTurnstileToken(
    formData.get("cf-turnstile-response"),
    clientIp
  )

  if (!turnstileResult.success) {
    return {
      message: getTurnstileErrorMessage(turnstileResult.errorCodes),
      fields: {
        name,
        email,
        whatsapp,
        message
      },
      resetTurnstile: true
    }
  }

  try {
    const textLines = [
      `Name: ${name}`,
      `Email: ${email || "-"}`,
      `WhatsApp: ${whatsapp || "-"}`,
      `Message: ${message}`
    ]

    const data = await resend.emails.send({
      from: "Salim Silver Contact Form <contact_form@salimsilver.com>", // Use default until user configures domain
      to: process.env.CONTACT_EMAIL_TO || "design@salimsilver.com",
      subject: `New Contact Form Submission from ${name}`,
      text: textLines.join("\n"),
      ...(email ? { replyTo: email } : {})
    })

    if (data.error) {
      console.error("Resend error:", data.error)
      return { message: "Failed to send message. Please try again." }
    }

    return {
      success: true,
      message: "Message sent successfully!",
      resetTurnstile: true
    }
  } catch (error) {
    console.error("Server error:", error)
    return {
      message: "Failed to send message. Please try again.",
      resetTurnstile: true
    }
  }
}

const CAREER_POSITIONS = [
  "silversmith",
  "studioAssistant",
  "contentCreative",
  "studentInternship",
  "talentPool"
]
const PDF_SIGNATURE = Buffer.from("%PDF-")

const careerFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "fullNameRequired")
    .max(100, "fullNameTooLong"),
  email: z
    .string()
    .trim()
    .min(1, "emailRequired")
    .max(320, "emailTooLong")
    .email("invalidEmail"),
  whatsapp: z
    .string()
    .trim()
    .min(1, "whatsappRequired")
    .max(30, "whatsappTooLong")
    .refine((value) => /^\+?[0-9()\-\s]{8,20}$/.test(value), {
      message: "invalidWhatsapp"
    }),
  location: z
    .string()
    .trim()
    .min(1, "locationRequired")
    .max(100, "locationTooLong"),
  position: z
    .string()
    .trim()
    .min(1, "positionRequired")
    .refine((value) => CAREER_POSITIONS.includes(value), {
      message: "invalidPosition"
    }),
  portfolioUrl: z.string().trim().max(500, "portfolioUrlTooLong").optional(),
  coverLetter: z.string().trim().max(3000, "coverLetterTooLong").optional()
})

function getFormString(formData: FormData, name: string) {
  const value = formData.get(name)
  return typeof value === "string" ? value : ""
}

function getCareerApplicationFields(
  formData: FormData
): CareerApplicationFields {
  return {
    fullName: getFormString(formData, "fullName"),
    email: getFormString(formData, "email"),
    whatsapp: getFormString(formData, "whatsapp"),
    location: getFormString(formData, "location"),
    position: getFormString(formData, "position"),
    portfolioUrl: getFormString(formData, "portfolioUrl"),
    coverLetter: getFormString(formData, "coverLetter")
  }
}

function hasPdfSignature(buffer: Buffer) {
  return (
    buffer.length >= PDF_SIGNATURE.length &&
    buffer.subarray(0, PDF_SIGNATURE.length).equals(PDF_SIGNATURE)
  )
}

function getCareerTurnstileMessageCode(
  errorCodes: string[]
): CareerApplicationMessageCode {
  if (
    errorCodes.includes("missing-input-response") ||
    errorCodes.includes("invalid-input-response")
  ) {
    return "turnstileRequired"
  }

  if (errorCodes.includes("timeout-or-duplicate")) {
    return "turnstileExpired"
  }

  if (errorCodes.includes("turnstile-not-configured")) {
    return "turnstileUnavailable"
  }

  return "turnstileFailed"
}

export async function submitCareerApplication(
  _prevState: CareerApplicationState,
  formData: FormData
): Promise<CareerApplicationState> {
  // Honeypot check
  const honeyPot = formData.get("_gotcha")
  if (honeyPot && honeyPot !== "") {
    return { success: true }
  }

  const timingState = getSubmissionTimingState(formData.get("_startedAt"))
  if (timingState === "too_fast" || timingState === "invalid") {
    return { success: true }
  }

  if (timingState === "expired") {
    return {
      success: false,
      messageCode: "formExpired"
    }
  }

  const fields = getCareerApplicationFields(formData)
  const validatedFields = careerFormSchema.safeParse({
    ...fields,
    portfolioUrl: fields.portfolioUrl || undefined,
    coverLetter: fields.coverLetter || undefined
  })

  const errors: Partial<
    Record<CareerApplicationField, CareerApplicationErrorCode[]>
  > = {}

  if (!validatedFields.success) {
    validatedFields.error.issues.forEach((issue) => {
      const field = issue.path[0] as CareerApplicationField
      if (!errors[field]) {
        errors[field] = []
      }
      errors[field]?.push(issue.message as CareerApplicationErrorCode)
    })
  }

  const cvFile = formData.get("cvFile")
  let cvBuffer: Buffer | null = null
  let cvFileName = "CV.pdf"

  if (!cvFile || !(cvFile instanceof File) || cvFile.size === 0) {
    errors.cvFile = ["cvFileRequired"]
  } else if (cvFile.size > MAX_CV_SIZE_BYTES) {
    errors.cvFile = ["fileTooLarge"]
  } else {
    try {
      const arrayBuffer = await cvFile.arrayBuffer()
      const candidateBuffer = Buffer.from(arrayBuffer)

      if (!hasPdfSignature(candidateBuffer)) {
        errors.cvFile = ["invalidPdfContent"]
      } else {
        cvBuffer = candidateBuffer
        cvFileName = cvFile.name.toLowerCase().endsWith(".pdf")
          ? cvFile.name
          : "CV.pdf"
      }
    } catch (err) {
      console.error("Failed to read CV file arrayBuffer:", err)
      errors.cvFile = ["cvReadFailed"]
    }
  }

  if (!validatedFields.success || !cvBuffer || Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      messageCode: "validationFailed",
      fields
    }
  }

  const {
    fullName,
    email,
    whatsapp,
    location,
    position,
    portfolioUrl,
    coverLetter
  } = validatedFields.data

  const coverLetterSpamReason = coverLetter
    ? getMessageSpamReason(coverLetter)
    : null
  if (coverLetterSpamReason) {
    return {
      success: false,
      errors: {
        coverLetter: [
          coverLetterSpamReason === "html"
            ? "coverLetterHtmlNotAllowed"
            : "coverLetterTooManyLinks"
        ]
      },
      messageCode: "validationFailed",
      fields
    }
  }

  const headerList = await headers()
  const clientIp = extractClientIp(headerList)
  const rateLimitResult = consumeContactFormAttempt(clientIp)

  if (!rateLimitResult.allowed) {
    return {
      success: false,
      messageCode: "rateLimited",
      retryAfterMinutes: Math.max(
        1,
        Math.ceil(rateLimitResult.retryAfterMs / 60_000)
      ),
      fields
    }
  }

  const turnstileResult = await validateTurnstileToken(
    formData.get("cf-turnstile-response"),
    clientIp
  )

  if (!turnstileResult.success) {
    return {
      success: false,
      messageCode: getCareerTurnstileMessageCode(turnstileResult.errorCodes),
      fields,
      resetTurnstile: true
    }
  }

  try {
    const textLines = [
      `Name: ${fullName}`,
      `Email: ${email}`,
      `WhatsApp: ${whatsapp}`,
      `Location: ${location}`,
      `Position Applied: ${position}`,
      `Portfolio / Drive URL: ${portfolioUrl || "-"}`,
      `Cover Letter / Note:\n${coverLetter || "-"}`
    ]

    const data = await resend.emails.send({
      from: "Salim Silver Career Form <contact_form@salimsilver.com>",
      to: process.env.CONTACT_EMAIL_TO || "design@salimsilver.com",
      subject: `[Salim Silver Karir] Lamaran: ${position} - ${fullName}`,
      text: textLines.join("\n"),
      attachments: [
        {
          filename: cvFileName,
          content: cvBuffer
        }
      ],
      replyTo: email
    })

    if (data.error) {
      console.error("Resend error:", data.error)
      return {
        success: false,
        messageCode: "sendFailed",
        fields,
        resetTurnstile: true
      }
    }

    return {
      success: true,
      resetTurnstile: true
    }
  } catch (error) {
    console.error("Server error:", error)
    return {
      success: false,
      messageCode: "sendFailed",
      fields,
      resetTurnstile: true
    }
  }
}
