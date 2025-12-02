"use client"

import { motion } from "framer-motion"

export default function FAQSection() {
  return (
    <section className="min-w-[90%] justify-self-center mr-4 ml-4 py-20 my-20 px-4 md:px-8 rounded-3xl border border-border bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl text-center mb-12 font-display"
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
              <h3 className="font-medium text-xl mb-2">{item.question}</h3>
              <p className="text-primary/60">{item.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
