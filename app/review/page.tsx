import { BASE_URL } from "@/lib/constants"
import type { Metadata } from "next"
import {
  ReviewSelection,
  type ReviewPlatform
} from "./components/review-selection"

const title = "Salim would love your feedback!"
const description =
  "Share your experience with Salim Silver. Your feedback helps us continue crafting heritage jewelry with passion."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${BASE_URL}/review`
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${BASE_URL}/review`,
    siteName: "Salim Silver"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description
  }
}

interface ReviewPageProps {
  searchParams: Promise<{
    platform?: string | string[]
  }>
}

export default async function ReviewPage({ searchParams }: ReviewPageProps) {
  const { platform } = await searchParams
  const initialPlatform: ReviewPlatform | null =
    platform === "google" || platform === "tripadvisor" ? platform : null

  return <ReviewSelection initialPlatform={initialPlatform} />
}
