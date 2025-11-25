import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import SafariThemeColor from "@/components/features/safari-theme-color"
import SoundEffects from "@/components/features/sound-effects"
import { ThemeProvider } from "@/components/features/theme-provider"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Lato } from "next/font/google"
import "./globals.css"

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.salimsilver.com"),
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
    { media: '(prefers-color-scheme: light)', color: '#FDFBF7' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1A1A' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lato.variable} ${cormorantGaramond.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SafariThemeColor />
          <SoundEffects />
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
