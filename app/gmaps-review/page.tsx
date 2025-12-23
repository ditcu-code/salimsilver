import { BASE_URL } from "@/lib/constants"
import { Metadata } from "next"
import ReviewRedirect from "./components/review-redirect"

export const metadata: Metadata = {
  title: "Review Salim Silver on Google Maps",
  description:
    "Share your experience with Salim Silver. Your feedback helps us continue crafting heritage jewelry with passion.",
  alternates: {
    canonical: `${BASE_URL}/gmaps-review`,
  },
  openGraph: {
    type: "website",
    title: "Review Salim Silver on Google Maps",
    description:
      "Share your experience with Salim Silver. Your feedback helps us continue crafting heritage jewelry with passion.",
    url: `${BASE_URL}/gmaps-review`,
    siteName: "Salim Silver",
  },
  twitter: {
    card: "summary_large_image",
    title: "Review Salim Silver on Google Maps",
    description:
      "Share your experience with Salim Silver. Your feedback helps us continue crafting heritage jewelry with passion.",
  },
}

export default function ReviewRedirectPage() {
  return <ReviewRedirect />
}
