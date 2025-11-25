"use client"

import CTASection from "@/components/cta-section"

import BioSection from "./components/BioSection"
import HeroSection from "./components/HeroSection"
import TimelineSection from "./components/TimelineSection"
import ValuesSection from "./components/ValuesSection"

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
