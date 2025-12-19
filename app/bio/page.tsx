import { Metadata } from "next"
import { BioContent } from "./bio-content"

export const metadata: Metadata = {
  title: "Link in Bio",
  description: "Connect with Salim Silver - Handcrafted Javanese Jewelry",
}

export default function BioPage() {
  return <BioContent />
}
