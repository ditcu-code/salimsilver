import { AppProviders } from "@/components/features/app-providers"
import SafariThemeColor from "@/components/features/safari-theme-color"
import { ThemeProvider } from "@/components/features/theme-provider"
import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata, Viewport } from "next"
import { GFS_Didot, Lato } from "next/font/google"
import "./globals.css"

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
})

// Display/heading font. Swap here for future updates.
const gfsDidot = GFS_Didot({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
})

import { BASE_URL } from "@/lib/constants"

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Salim Silver | Handcrafted Javanese Jewelry",
    description:
      "Discover the elegance of handcrafted silver jewelry from Kotagede, Yogyakarta. Rings, necklaces, and bracelets made with tradition and passion.",
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
    <html lang="en" className={`${lato.variable} ${gfsDidot.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SafariThemeColor />
          <AppProviders>
            <Header />
            <main>{children}</main>
            <Footer />
          </AppProviders>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
