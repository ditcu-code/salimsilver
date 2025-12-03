import { AppProviders } from "@/components/features/app-providers"
import SafariThemeColor from "@/components/features/safari-theme-color"
import { ThemeProvider } from "@/components/features/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

import { BASE_URL } from "@/lib/constants"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Lato } from "next/font/google"

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
})

// Display/heading font. Swap here for future updates.
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
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
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FDFBF7" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A1A" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${cormorantGaramond.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SafariThemeColor />
          <AppProviders>
            {children}
          </AppProviders>
          <Toaster />
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
