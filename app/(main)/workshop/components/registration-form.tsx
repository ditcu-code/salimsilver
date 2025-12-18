"use client"

import { WhatsApp } from "@/components/icons/whatsapp"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, Loader2, User, Users } from "lucide-react"
import * as React from "react"
import { useForm } from "react-hook-form"
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
  { value?: string; onClick?: () => void; className?: string }
>(({ value, onClick, className }, ref) => (
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
    {value || <span>Pick a date</span>}
    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
  </Button>
))
DatePickerCustomInput.displayName = "DatePickerCustomInput"

// Schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  date: z.date(),
  session: z.enum(["morning", "afternoon"]),
  participantType: z.enum(["single", "group"]),
  participantCount: z.number().min(1),
})

export function RegistrationForm() {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      participantType: "single",
      participantCount: 1,
    },
  })

  // Watch values for price calculation
  const participantType = form.watch("participantType")
  const participantCount = form.watch("participantCount")

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
      const dateStr = format(values.date, "EEEE, d MMMM yyyy")
      const sessionStr = values.session === "morning" ? "Morning (08:30)" : "Afternoon (12:30)"
      const count = values.participantType === "single" ? 1 : Math.max(2, values.participantCount)
      const priceStr = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(totalPrice)

      const message = `Hello Salim Silver,

Name: ${values.name}

I would like to book a silversmith workshop:
- Date: ${dateStr}
- Session: ${sessionStr}
- Participants: ${count} people

Please let me know about the availability.`

      const encodedMessage = encodeURIComponent(message)
      const waUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`

      // Redirect
      window.open(waUrl, "_blank")
      toast.success("Redirecting to WhatsApp...")
      form.reset()
    })
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <div className="space-y-2 text-center">
        <h3 className="text-2xl font-semibold">Book Your Session</h3>
        <p className="text-muted-foreground text-sm">
          Fill details to check availability via WhatsApp.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
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
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date | null) => field.onChange(date)}
                      dateFormat="MMM d, yyyy"
                      minDate={new Date()}
                      filterDate={(date: Date) => date.getDay() !== 0}
                      customInput={<DatePickerCustomInput />}
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
                  <FormLabel>Session</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="morning">Morning (08:30-11:30)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12:30-15:30)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-3">
            <FormLabel>Number of Participants</FormLabel>
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
                <div className="font-semibold">1 Person</div>
                <div className="text-muted-foreground text-xs">Rp 550.000</div>
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
                <div className="font-semibold">2+ People</div>
                <div className="text-muted-foreground text-xs">Rp 500k/pax</div>
              </div>
            </div>

            {participantType === "group" && (
              <FormField
                control={form.control}
                name="participantCount"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <FormLabel className="pb-0 whitespace-nowrap">Total People:</FormLabel>
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
              <span className="text-muted-foreground">Estimated Total:</span>
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
            Continue to WhatsApp
          </Button>
        </form>
      </Form>
    </div>
  )
}
