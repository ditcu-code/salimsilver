import { Metadata } from "next"
import { LinksContent } from "./links-content"

export const metadata: Metadata = {
  title: "Quick Links",
  description: "Connect with Salim Silver - Handcrafted Javanese Jewelry",
}

export default function LinksPage() {
  return <LinksContent />
}
