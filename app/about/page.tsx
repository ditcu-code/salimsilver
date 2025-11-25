"use client"

import BioSection from "./components/BioSection"
import HeroSection from "./components/HeroSection"
import TimelineSection from "./components/TimelineSection"
import ValuesSection from "./components/ValuesSection"
import VisitCTA from "./components/VisitCTA"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BioSection />
      <TimelineSection />
      <ValuesSection />
      <VisitCTA />
    </div>
  )
}
