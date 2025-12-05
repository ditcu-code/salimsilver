"use client"

import { motion } from "framer-motion"

export default function ValuesSection() {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl mb-8 text-center font-display"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Our Values
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Tradition",
              description:
                "We are dedicated to the renewal of Kotagede's silver traditions, ensuring these skills are not just preserved but evolved for the future.",
            },
            {
              title: "Quality",
              description:
                "We use only the finest 925 sterling silver and ethically sourced gemstones. Every piece is inspected to ensure it meets our high standards.",
            },
            {
              title: "Sustainability",
              description:
                "We are committed to sustainable practices, from responsible sourcing of materials to minimizing waste in our workshop.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="text-primary dark:text-primary-secondary bg-primary-secondary dark:bg-primary p-8 rounded-3xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <h3 className="text-primary-secondary dark:text-primary-foreground text-2xl mb-4">
                {item.title}
              </h3>
              <p className="text-primary-secondary dark:text-primary-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
