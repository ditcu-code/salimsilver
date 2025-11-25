import type { Metadata } from "next"

import CTASection from "@/components/cta-section"

import BioSection from "./components/BioSection"
import HeroSection from "./components/HeroSection"
import TimelineSection from "./components/TimelineSection"
import ValuesSection from "./components/ValuesSection"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.salimsilver.com"

export const metadata: Metadata = {
  title: "About Salim Silver",
  description:
    "Meet Salim Silver: artisans crafting Javanese-inspired silver jewelry in Kotagede. Discover our heritage, values, and craftsmanship.",
  alternates: {
    canonical: `${baseUrl}/about`,
  },
  openGraph: {
    title: "About Salim Silver",
    description:
      "Meet Salim Silver: artisans crafting Javanese-inspired silver jewelry in Kotagede. Discover our heritage, values, and craftsmanship.",
    url: `${baseUrl}/about`,
  },
  twitter: {
    card: "summary_large_image",
    title: "About Salim Silver",
    description:
      "Meet Salim Silver: artisans crafting Javanese-inspired silver jewelry in Kotagede. Discover our heritage, values, and craftsmanship.",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BioSection />
      <TimelineSection />
      <ValuesSection />
      <CTASection
        title="Visit Our Workshop"
        description="Experience the magic of silver crafting firsthand. Book a tour or a jewelry-making class."
        ctaLabel="Book a Visit"
        ctaHref="/contact"
      />
    </div>
  )
}
