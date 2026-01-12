import { AnalyticsWrapper } from "@/components/features/analytics-wrapper"
import { AppProviders } from "@/components/features/app-providers"
import SafariThemeColor from "@/components/features/safari-theme-color"
import { ThemeProvider } from "@/components/features/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { BASE_URL } from "@/lib/constants"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Lato } from "next/font/google"
import { headers } from "next/headers"
import "./globals.css"

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Salim Silver | Handcrafted Javanese Jewelry",
    template: "%s | Salim Silver",
  },
  description:
    "Discover the elegance of handcrafted silver jewelry from Kotagede, Yogyakarta. Rings, necklaces, and bracelets made with tradition and passion.",
  openGraph: {
    title: "Salim Silver | Handcrafted Javanese Jewelry",
    description:
      "Discover the elegance of handcrafted silver jewelry from Kotagede, Yogyakarta. Rings, necklaces, and bracelets made with tradition and passion.",
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Salim Silver",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Salim Silver | Handcrafted Javanese Jewelry",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salim Silver | Handcrafted Javanese Jewelry",
    description:
      "Discover the elegance of handcrafted silver jewelry from Kotagede, Yogyakarta. Rings, necklaces, and bracelets made with tradition and passion.",
    images: ["/opengraph-image"],
  },
  other: {
    "og:logo": `${BASE_URL}/images/logo-salimsilver.webp`,
  },
  keywords: [
    "Javanese Jewelry",
    "Silver Jewelry",
    "Handcrafted Jewelry",
    "Yogyakarta Silver",
    "Kotagede Silver",
    "Salim Silver",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icons/icon-white.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
  authors: [{ name: "Salim Silver", url: BASE_URL }],
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FDFBF7" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A1A" },
  ],
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers()
  const locale = headerList.get("X-Locale") || "en"

  return (
    <html
      lang={locale}
      className={`${lato.variable} ${cormorantGaramond.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SafariThemeColor />
          <AppProviders>{children}</AppProviders>
          <Toaster />
        </ThemeProvider>
        <AnalyticsWrapper />
      </body>
    </html>
  )
}
