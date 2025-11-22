import Footer from "@/components/footer"
import Header from "@/components/header"
import SafariThemeColor from "@/components/safari-theme-color"
import SoundEffects from "@/components/sound-effects"
import { ThemeProvider } from "@/components/theme-provider"
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
  title: "Salim Silver | Handcrafted Javanese Jewelry",
  description: "Discover the elegance of handcrafted silver jewelry from Kotagede, Yogyakarta. Rings, necklaces, and bracelets made with tradition and passion.",
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
