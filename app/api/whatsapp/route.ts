import { redirect } from "next/navigation"

const MESSAGES: Record<string, string> = {
  socialMedia: "Hi, Salim Silver",
  googleMaps: "Halo, Salim Silver",
  default: "Hai, Salim Silver",
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const source = searchParams.get("source")
  const textParam = searchParams.get("text")
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER

  if (!phoneNumber) {
    return new Response("WhatsApp number not configured", { status: 500 })
  }

  const message =
    textParam ||
    (source && MESSAGES[source] ? MESSAGES[source] : MESSAGES.default)

  redirect(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`)
}
