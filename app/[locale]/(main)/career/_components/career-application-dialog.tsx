"use client"

import { submitCareerApplication } from "@/app/actions"
import { TurnstileWidget } from "@/components/features/turnstile-widget"
import {
  CareerApplicationErrorCode,
  initialCareerApplicationState,
  MAX_CV_SIZE_BYTES
} from "@/lib/career-application"
import { AnimatePresence, motion } from "framer-motion"
import {
  CheckCircle2,
  FileCheck,
  FileUp,
  Loader2,
  Sparkles,
  X
} from "lucide-react"
import { useTranslations } from "next-intl"
import { useActionState, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

interface CareerApplicationDialogProps {
  isOpen: boolean
  onClose: () => void
  defaultPosition?: string
}

export default function CareerApplicationDialog({
  isOpen,
  onClose,
  defaultPosition = "talentPool"
}: CareerApplicationDialogProps) {
  const t = useTranslations("CareerPage.ApplicationForm")
  const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)

  const [startedAt, setStartedAt] = useState("")
  const [turnstileToken, setTurnstileToken] = useState("")
  const [turnstileResetKey, setTurnstileResetKey] = useState(0)
  const [selectedPosition, setSelectedPosition] = useState(defaultPosition)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<CareerApplicationErrorCode | null>(
    null
  )

  const [state, formAction, isPending] = useActionState(
    submitCareerApplication,
    initialCareerApplicationState
  )
  const formRef = useRef<HTMLFormElement>(null)
  const submitDisabled = isPending || (turnstileEnabled && !turnstileToken)

  const translateError = (errorCode?: CareerApplicationErrorCode) =>
    errorCode ? t(`errors.${errorCode}`) : ""

  useEffect(() => {
    if (isOpen) {
      setStartedAt(Date.now().toString())
      setSelectedPosition(defaultPosition)
      setSelectedFile(null)
      setFileError(null)
    }
  }, [isOpen, defaultPosition])

  useEffect(() => {
    if (state?.success) {
      toast.success(t("successTitle"))
      sendGAEventSafely("event", "form_submit", {
        form_name: "career_application_form"
      })
      formRef.current?.reset()
      setSelectedFile(null)
      setTurnstileToken("")
      setTurnstileResetKey((current) => current + 1)
    } else if (state?.messageCode && !state.success) {
      toast.error(
        t(`messages.${state.messageCode}`, {
          minutes: state.retryAfterMinutes ?? 1
        })
      )
      if (state.resetTurnstile) {
        setTurnstileToken("")
        setTurnstileResetKey((current) => current + 1)
      }
    }
  }, [state, t])

  const sendGAEventSafely = async (
    action: string,
    event: string,
    params: any
  ) => {
    try {
      const { sendGAEvent } = await import("@next/third-parties/google")
      sendGAEvent(action, event, params)
    } catch {
      // Ignore if GA is not configured
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFileError(null)

    if (!file) {
      setSelectedFile(null)
      return
    }

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf")

    if (!isPdf) {
      setFileError("invalidFileType")
      setSelectedFile(null)
      e.target.value = ""
      return
    }

    if (file.size > MAX_CV_SIZE_BYTES) {
      setFileError("fileTooLarge")
      setSelectedFile(null)
      e.target.value = ""
      return
    }

    setSelectedFile(file)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 w-full max-w-2xl rounded-3xl border border-border bg-card p-6 md:p-8 shadow-2xl my-auto max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 cursor-pointer rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label={t("closeButton")}
            >
              <X className="h-5 w-5" />
            </button>

            {state?.success ? (
              <div className="py-12 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="font-display text-3xl">{t("successTitle")}</h3>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                  {t("successMessage")}
                </p>
                <div className="pt-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 shadow-md"
                  >
                    {t("closeButton")}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6 space-y-1">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{t("eyebrow")}</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl pt-2">
                    {t("title")}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {t("description")}
                  </p>
                </div>

                <form ref={formRef} action={formAction} className="space-y-5">
                  {/* Honeypot field */}
                  <div
                    style={{ position: "absolute", left: "-9999px" }}
                    aria-hidden="true"
                  >
                    <label htmlFor="_gotcha">{t("honeypotLabel")}</label>
                    <input
                      type="text"
                      id="_gotcha"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <input type="hidden" name="_startedAt" value={startedAt} />
                  <input
                    type="hidden"
                    name="cf-turnstile-response"
                    value={turnstileToken}
                  />

                  {/* Posisi yang Dilamar */}
                  <div>
                    <label
                      htmlFor="position"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      {t("position")} *
                    </label>
                    <select
                      id="position"
                      name="position"
                      value={selectedPosition}
                      onChange={(e) => setSelectedPosition(e.target.value)}
                      required
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="studioAssistant">
                        {t("positions.studioAssistant")}
                      </option>
                      <option value="socialMediaIntern">
                        {t("positions.socialMediaIntern")}
                      </option>
                      <option value="contentCreative">
                        {t("positions.contentCreative")}
                      </option>
                      <option value="studentInternship">
                        {t("positions.studentInternship")}
                      </option>
                      <option value="talentPool">
                        {t("positions.talentPool")}
                      </option>
                    </select>
                    {state?.errors?.position && (
                      <p className="mt-1 text-xs text-red-500">
                        {translateError(state.errors.position[0])}
                      </p>
                    )}
                  </div>

                  {/* Nama Lengkap & Email */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        {t("fullName")} *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        placeholder={t("fullNamePlaceholder")}
                        defaultValue={state?.fields?.fullName}
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      {state?.errors?.fullName && (
                        <p className="mt-1 text-xs text-red-500">
                          {translateError(state.errors.fullName[0])}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        {t("email")} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder={t("emailPlaceholder")}
                        defaultValue={state?.fields?.email}
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      {state?.errors?.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {translateError(state.errors.email[0])}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* WhatsApp & Domisili */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="whatsapp"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        {t("whatsapp")} *
                      </label>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        required
                        placeholder={t("whatsappPlaceholder")}
                        defaultValue={state?.fields?.whatsapp}
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      {state?.errors?.whatsapp && (
                        <p className="mt-1 text-xs text-red-500">
                          {translateError(state.errors.whatsapp[0])}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        {t("location")} *
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        required
                        placeholder={t("locationPlaceholder")}
                        defaultValue={state?.fields?.location}
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      {state?.errors?.location && (
                        <p className="mt-1 text-xs text-red-500">
                          {translateError(state.errors.location[0])}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Upload File CV (PDF) */}
                  <div>
                    <label
                      htmlFor="cvFile"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      {t("cvUploadLabel")} *
                    </label>

                    <div className="relative">
                      <input
                        type="file"
                        id="cvFile"
                        name="cvFile"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="sr-only"
                        required
                      />
                      <label
                        htmlFor="cvFile"
                        className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-border bg-muted/20 px-4 py-3 transition-colors hover:border-primary/50 hover:bg-muted/40"
                      >
                        {selectedFile ? (
                          <div className="flex items-center gap-3 overflow-hidden">
                            <FileCheck className="h-5 w-5 shrink-0 text-primary" />
                            <div className="truncate">
                              <p className="truncate text-sm font-medium text-foreground">
                                {selectedFile.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {(selectedFile.size / (1024 * 1024)).toFixed(2)}{" "}
                                MB
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <FileUp className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {t("cvUploadLabel")}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {t("cvUploadHint")}
                              </p>
                            </div>
                          </div>
                        )}
                        <span className="rounded-lg bg-background px-3 py-1 text-xs font-semibold text-foreground shadow-xs border border-border">
                          {selectedFile ? t("replaceFile") : t("selectPdf")}
                        </span>
                      </label>
                    </div>

                    {(fileError || state?.errors?.cvFile) && (
                      <p className="mt-1 text-xs text-red-500">
                        {translateError(
                          fileError ?? state?.errors?.cvFile?.[0]
                        )}
                      </p>
                    )}
                  </div>

                  {/* Tautan Portofolio / Drive */}
                  <div>
                    <label
                      htmlFor="portfolioUrl"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      {t("portfolioUrl")}
                    </label>
                    <input
                      type="url"
                      id="portfolioUrl"
                      name="portfolioUrl"
                      placeholder={t("portfolioUrlPlaceholder")}
                      defaultValue={state?.fields?.portfolioUrl}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    {state?.errors?.portfolioUrl && (
                      <p className="mt-1 text-xs text-red-500">
                        {translateError(state.errors.portfolioUrl[0])}
                      </p>
                    )}
                  </div>

                  {/* Cover Letter / Pesan */}
                  <div>
                    <label
                      htmlFor="coverLetter"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      {t("coverLetter")}
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      rows={3}
                      placeholder={t("coverLetterPlaceholder")}
                      defaultValue={state?.fields?.coverLetter}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    {state?.errors?.coverLetter && (
                      <p className="mt-1 text-xs text-red-500">
                        {translateError(state.errors.coverLetter[0])}
                      </p>
                    )}
                  </div>

                  {turnstileEnabled && (
                    <div className="space-y-2 pt-1">
                      <TurnstileWidget
                        onTokenChange={setTurnstileToken}
                        resetKey={turnstileResetKey}
                      />
                      {!turnstileToken && (
                        <p className="text-xs text-muted-foreground">
                          {t("turnstilePrompt")}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitDisabled}
                      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>{t("submitting")}</span>
                        </>
                      ) : (
                        <span>{t("submitButton")}</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
