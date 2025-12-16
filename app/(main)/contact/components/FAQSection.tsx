"use client"

import { motion } from "framer-motion"

export default function FAQSection() {
  return (
    <section className="border-border bg-secondary/30 my-20 mr-4 ml-4 min-w-[90%] justify-self-center rounded-3xl border px-4 py-20 md:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="font-display mb-12 text-center text-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-8">
          {[
            {
              question: "Do you offer custom designs?",
              answer:
                "Yes, we specialize in custom jewelry design. Please contact us with your ideas, and we can work together to create a unique piece.",
            },
            {
              question: "Do you ship internationally?",
              answer:
                "Yes, we ship worldwide. Shipping times and costs vary depending on the destination.",
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
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-2 text-xl font-medium">{item.question}</h3>
              <p className="text-primary/60">{item.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
