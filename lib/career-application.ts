export const MAX_CV_SIZE_BYTES = 10 * 1024 * 1024

export type CareerApplicationField =
  | "fullName"
  | "email"
  | "whatsapp"
  | "location"
  | "position"
  | "cvFile"
  | "portfolioUrl"
  | "coverLetter"

export type CareerApplicationErrorCode =
  | "fullNameRequired"
  | "fullNameTooLong"
  | "emailRequired"
  | "emailTooLong"
  | "invalidEmail"
  | "whatsappRequired"
  | "whatsappTooLong"
  | "invalidWhatsapp"
  | "locationRequired"
  | "locationTooLong"
  | "positionRequired"
  | "invalidPosition"
  | "portfolioUrlTooLong"
  | "coverLetterTooLong"
  | "coverLetterHtmlNotAllowed"
  | "coverLetterTooManyLinks"
  | "cvFileRequired"
  | "invalidFileType"
  | "fileTooLarge"
  | "invalidPdfContent"
  | "cvReadFailed"

export type CareerApplicationMessageCode =
  | "formExpired"
  | "validationFailed"
  | "rateLimited"
  | "turnstileRequired"
  | "turnstileExpired"
  | "turnstileUnavailable"
  | "turnstileFailed"
  | "sendFailed"

export interface CareerApplicationFields {
  fullName: string
  email: string
  whatsapp: string
  location: string
  position: string
  portfolioUrl: string
  coverLetter: string
}

export interface CareerApplicationState {
  success: boolean
  messageCode?: CareerApplicationMessageCode
  errors?: Partial<Record<CareerApplicationField, CareerApplicationErrorCode[]>>
  fields?: Partial<CareerApplicationFields>
  retryAfterMinutes?: number
  resetTurnstile?: boolean
}

export const initialCareerApplicationState: CareerApplicationState = {
  success: false
}
