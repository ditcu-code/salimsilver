"use client"

import { WhatsApp } from "@/components/icons/whatsapp"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { sendGAEvent } from "@next/third-parties/google"
import { format } from "date-fns"
import { enUS, id } from "date-fns/locale"
import { CalendarIcon, Loader2, User, Users } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import * as React from "react"
import { useForm, useWatch } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { toast } from "sonner"

// Custom Input for DatePicker
const DatePickerCustomInput = React.forwardRef<
  HTMLButtonElement,
  { value?: string; onClick?: () => void; className?: string; placeholder?: string }
>(({ value, onClick, className, placeholder }, ref) => (
  <Button
    variant="outline"
    className={cn(
      "w-full justify-start text-left font-normal",
      !value && "text-muted-foreground",
      className
    )}
    onClick={(e) => {
      e.preventDefault()
      onClick?.()
    }}
    ref={ref}
  >
    {value || <span>{placeholder || "Pick a date"}</span>}
    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
  </Button>
))
DatePickerCustomInput.displayName = "DatePickerCustomInput"

export function RegistrationForm() {
  const t = useTranslations("WorkshopPage.Registration")
  const locale = useLocale()
  const [isPending, startTransition] = React.useTransition()

  // Schema with localization
  const formSchema = z.object({
    name: z.string().min(2, {
      message: t("Validation.nameLength"),
    }),
    date: z.date(),
    session: z.enum(["morning", "afternoon"]),
    participantType: z.enum(["single", "group"]),
    participantCount: z.number().min(1),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      participantType: "single",
      participantCount: 1,
    },
  })

  // Watch values for price calculation
  const participantType = useWatch({ control: form.control, name: "participantType" })
  const participantCount = useWatch({ control: form.control, name: "participantCount" })

  // Calculate price
  const totalPrice = React.useMemo(() => {
    if (participantType === "single") return 550000
    // Group: 500k per person, min 2 people
    const count = Math.max(2, participantCount)
    return count * 500000
  }, [participantType, participantCount])

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      // Construct WhatsApp Message
      const dateLocale = locale === "id" ? id : enUS
      const dateStr = format(values.date, "EEEE, d MMMM yyyy", { locale: dateLocale })

      const sessionLabel =
        values.session === "morning" ? t("fields.session.morning") : t("fields.session.afternoon")

      // Strip the time part from the session label if needed, or keep it.
      // The label in dictionary is "Morning (08:30-11:30)", might be too long.
      // Let's use a cleaner format for WA: "Morning / Pagi" or just use the translated label.
      // The user's original code used specifically "Morning (08:30)" vs "Pagi (08:30-11:30)"
      // Let's stick to using the dictionary label for simplicity as it's clear enough.

      const count = values.participantType === "single" ? 1 : Math.max(2, values.participantCount)

      const message = `${t("WhatsApp.greeting")}

${t("WhatsApp.name")}: ${values.name}

${t("WhatsApp.intro")}
- ${t("WhatsApp.date")}: ${dateStr}
- ${t("WhatsApp.session")}: ${sessionLabel}
- ${t("WhatsApp.participants")}: ${count} ${t("WhatsApp.people")}

${t("WhatsApp.closing")}`

      const encodedMessage = encodeURIComponent(message)
      const waUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`

      sendGAEvent("event", "generate_lead", {
        value: totalPrice,
        currency: "IDR",
        lead_type: "workshop_booking",
      })

      // Redirect
      window.open(waUrl, "_blank")
      toast.success(t("toast"))
      form.reset()
    })
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <div className="space-y-2 text-center">
        <h3 className="text-2xl font-semibold">{t("title")}</h3>
        <p className="text-muted-foreground text-sm">{t("subtitle")}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.name.label")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("fields.name.placeholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.date.label")}</FormLabel>
                  <FormControl>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date | null) => field.onChange(date)}
                      dateFormat="MMM d, yyyy"
                      minDate={new Date()}
                      filterDate={(date: Date) => date.getDay() !== 0}
                      customInput={
                        <DatePickerCustomInput placeholder={t("fields.date.placeholder")} />
                      }
                      wrapperClassName="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="session"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.session.label")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("fields.session.placeholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="morning">{t("fields.session.morning")}</SelectItem>
                      <SelectItem value="afternoon">{t("fields.session.afternoon")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-3">
            <FormLabel>{t("fields.participants.label")}</FormLabel>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={cn(
                  "cursor-pointer rounded-xl border-2 p-4 transition-all hover:border-neutral-900 dark:hover:border-neutral-50",
                  participantType === "single"
                    ? "border-neutral-900 bg-neutral-50 dark:border-neutral-50 dark:bg-neutral-900"
                    : "border-neutral-200 bg-transparent dark:border-neutral-800"
                )}
                onClick={() => {
                  form.setValue("participantType", "single")
                  form.setValue("participantCount", 1)
                }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <User className="h-5 w-5" />
                  {participantType === "single" && (
                    <div className="h-2 w-2 rounded-full bg-neutral-900 dark:bg-neutral-50" />
                  )}
                </div>
                <div className="font-semibold">{t("fields.participants.single.title")}</div>
                <div className="text-muted-foreground text-xs">
                  {t("fields.participants.single.price")}
                </div>
              </div>

              <div
                className={cn(
                  "cursor-pointer rounded-xl border-2 p-4 transition-all hover:border-neutral-900 dark:hover:border-neutral-50",
                  participantType === "group"
                    ? "border-neutral-900 bg-neutral-50 dark:border-neutral-50 dark:bg-neutral-900"
                    : "border-neutral-200 bg-transparent dark:border-neutral-800"
                )}
                onClick={() => {
                  form.setValue("participantType", "group")
                  if (form.getValues("participantCount") < 2) {
                    form.setValue("participantCount", 2)
                  }
                }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <Users className="h-5 w-5" />
                  {participantType === "group" && (
                    <div className="h-2 w-2 rounded-full bg-neutral-900 dark:bg-neutral-50" />
                  )}
                </div>
                <div className="font-semibold">{t("fields.participants.group.title")}</div>
                <div className="text-muted-foreground text-xs">
                  {t("fields.participants.group.price")}
                </div>
              </div>
            </div>

            {participantType === "group" && (
              <FormField
                control={form.control}
                name="participantCount"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <FormLabel className="pb-0 whitespace-nowrap">
                        {t("fields.participants.totalLabel")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={2}
                          className="w-20"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <div className="my-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t("totalEstimate")}</span>
              <span className="text-lg font-bold">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(totalPrice)}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#25D366] text-white hover:bg-[#128C7E]"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <WhatsApp className="mr-2 h-4 w-4" />
            )}
            {t("submit")}
          </Button>
        </form>
      </Form>
    </div>
  )
}
