import { redirect } from "next/navigation"

export async function GET() {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER

  if (!phoneNumber) {
    return new Response("WhatsApp number not configured", { status: 500 })
  }

  redirect(`https://wa.me/${phoneNumber}`)
}
