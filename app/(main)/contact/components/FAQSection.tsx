"use client"

import { FaqSection } from "@/components/features/faq-section"

const FAQ_ITEMS = [
  {
    question: "Do you offer custom designs?",
    answer:
      "Yes, we specialize in custom jewelry design. Please contact us with your ideas, and we can work together to create a unique piece.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship worldwide. Shipping times and costs vary depending on the destination.",
  },
  {
    question: "How do I care for my silver jewelry?",
    answer:
      "We recommend storing your silver in a cool, dry place. Regular cleaning with a soft cloth will help maintain its shine.",
  },
  {
    question: "Do you offer wholesale?",
    answer:
      "Yes, we welcome wholesale inquiries. Please contact us for more information about our wholesale program.",
  },
]

export default function FAQSection() {
  return (
    <section className="mx-auto mt-20 mb-20 max-w-7xl px-4 md:px-8">
      <FaqSection items={FAQ_ITEMS} title="Frequently Asked Questions" />
    </section>
  )
}
