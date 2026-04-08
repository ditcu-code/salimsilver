const MIN_FORM_FILL_DURATION_MS = 4_000
const MAX_FORM_AGE_MS = 1000 * 60 * 60 * 24
const RATE_LIMIT_WINDOW_MS = 1000 * 60 * 10
const RATE_LIMIT_MAX_SUBMISSIONS = 5
const MAX_LINKS_PER_MESSAGE = 2
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify"

type SubmissionTimestamps = number[]

declare global {
  var __contactFormRateLimitStore: Map<string, SubmissionTimestamps> | undefined
}

const rateLimitStore =
  globalThis.__contactFormRateLimitStore ??
  new Map<string, SubmissionTimestamps>()

if (!globalThis.__contactFormRateLimitStore) {
  globalThis.__contactFormRateLimitStore = rateLimitStore
}

export function extractClientIp(headerList: Headers) {
  const possibleHeaders = [
    "cf-connecting-ip",
    "x-real-ip",
    "x-forwarded-for",
    "x-vercel-forwarded-for",
  ]

  for (const headerName of possibleHeaders) {
    const value = headerList.get(headerName)

    if (!value) {
      continue
    }

    const ip = value.split(",")[0]?.trim()

    if (ip) {
      return ip
    }
  }

  return "unknown"
}

export function getSubmissionTimingState(startedAtValue: FormDataEntryValue | null) {
  const startedAt = Number(startedAtValue)

  if (!Number.isFinite(startedAt)) {
    return "invalid"
  }

  const elapsedMs = Date.now() - startedAt

  if (elapsedMs < MIN_FORM_FILL_DURATION_MS) {
    return "too_fast"
  }

  if (elapsedMs > MAX_FORM_AGE_MS) {
    return "expired"
  }

  return "ok"
}

export function consumeContactFormAttempt(ip: string) {
  const now = Date.now()
  const recentAttempts = (rateLimitStore.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  )

  if (recentAttempts.length >= RATE_LIMIT_MAX_SUBMISSIONS) {
    rateLimitStore.set(ip, recentAttempts)

    return {
      allowed: false,
      retryAfterMs: RATE_LIMIT_WINDOW_MS - (now - recentAttempts[0]),
    }
  }

  recentAttempts.push(now)
  rateLimitStore.set(ip, recentAttempts)

  return {
    allowed: true,
    retryAfterMs: 0,
  }
}

export function getMessageSpamError(message: string) {
  if (/<\/?[a-z][\s\S]*>/i.test(message)) {
    return "Please remove HTML tags from the message."
  }

  const links = message.match(/\b(?:https?:\/\/|www\.)\S+/gi) ?? []

  if (links.length > MAX_LINKS_PER_MESSAGE) {
    return "Please remove most links from the message and try again."
  }

  return null
}

export function getRateLimitMessage(retryAfterMs: number) {
  const retryAfterMinutes = Math.max(1, Math.ceil(retryAfterMs / 60_000))

  return `Too many messages from this connection. Please wait about ${retryAfterMinutes} minute${retryAfterMinutes === 1 ? "" : "s"} and try again.`
}

interface TurnstileValidationResult {
  success: boolean
  errorCodes: string[]
}

export async function validateTurnstileToken(
  tokenValue: FormDataEntryValue | null,
  clientIp: string,
): Promise<TurnstileValidationResult> {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  if (!siteKey && !secretKey) {
    return { success: true, errorCodes: [] }
  }

  if (!siteKey || !secretKey) {
    return { success: false, errorCodes: ["turnstile-not-configured"] }
  }

  const token = typeof tokenValue === "string" ? tokenValue : ""

  if (!token) {
    return { success: false, errorCodes: ["missing-input-response"] }
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10_000)

  try {
    const body = new URLSearchParams({
      secret: secretKey,
      response: token,
      remoteip: clientIp,
    })

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
      signal: controller.signal,
    })

    const result = (await response.json()) as {
      success?: boolean
      "error-codes"?: string[]
    }

    return {
      success: Boolean(response.ok && result.success),
      errorCodes: result["error-codes"] ?? [],
    }
  } catch (error) {
    console.error("Turnstile validation error:", error)

    return {
      success: false,
      errorCodes: ["internal-error"],
    }
  } finally {
    clearTimeout(timeoutId)
  }
}

export function getTurnstileErrorMessage(errorCodes: string[]) {
  if (
    errorCodes.includes("missing-input-response") ||
    errorCodes.includes("invalid-input-response")
  ) {
    return "Please complete the verification challenge and try again."
  }

  if (errorCodes.includes("timeout-or-duplicate")) {
    return "Verification expired. Please try again."
  }

  if (errorCodes.includes("turnstile-not-configured")) {
    return "Verification is temporarily unavailable. Please try again later."
  }

  return "Verification failed. Please try again."
}
