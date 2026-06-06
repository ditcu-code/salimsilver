import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { headers } from "next/headers"
import LocalizedNotFound from "./[locale]/not-found"

export default async function NotFound() {
  const headerList = await headers()
  const locale = headerList.get("X-Locale") || "en"
  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <main>
        <LocalizedNotFound />
      </main>
    </NextIntlClientProvider>
  )
}
