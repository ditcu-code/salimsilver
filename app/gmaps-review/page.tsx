import { BASE_URL } from "@/lib/constants"
import type { Metadata } from "next"
import ReviewRedirect from "./components/review-redirect"

const title = "Salim would love your feedback!"
const description =
  "Share your experience with Salim Silver. Your feedback helps us continue crafting heritage jewelry with passion."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${BASE_URL}/gmaps-review`
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${BASE_URL}/gmaps-review`,
    siteName: "Salim Silver"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description
  }
}

export default function ReviewRedirectPage() {
  return <ReviewRedirect />
}
