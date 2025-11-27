"use client"

import { motion } from "framer-motion"

export default function TimelineSection() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl mb-4 font-display">Our Journey</h2>
        <p className="text-primary/80 max-w-2xl mx-auto">
          From a humble family workshop to a guardian of Kotagede silver heritage.
        </p>
      </motion.div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-primary/30 -translate-x-1/2 md:translate-x-0" />

        <div className="space-y-12 md:space-y-24">
          {[
            {
              year: "1987",
              title: "The Inheritance",
              description:
                "Priyo Jatmiko Salim inherits the family silver handicraft business, beginning a new chapter in a lineage of artisans.",
            },
            {
              year: "1990",
              title: "Official Establishment",
              description:
                "Salim Silver is formally established, marking the transition from a traditional home industry to a modern enterprise while keeping the soul of craftsmanship alive.",
            },
            {
              year: "1998",
              title: "Resilience & Expansion",
              description:
                "Navigating the Asian Financial Crisis by focusing on high-quality exports. Our commitment to excellence opened doors to international markets in Europe and America.",
            },
            {
              year: "Present",
              title: "A Living Museum",
              description:
                "Today, we stand as a bastion of heritage in Kotagede. Our workshop is open to the world, creating 'art for the future' that honors the past.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.year}
              className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Timeline Node */}
              <div className="absolute left-[15px] md:left-1/2 top-0 md:top-1/2 w-8 h-8 -translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center bg-background z-10">
                <div className="w-3 h-3 rotate-45 bg-primary" />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 pl-12 md:px-16">
                <div className={`relative w-full flex flex-col ${index % 2 === 0 ? "md:items-start md:text-left" : "md:items-end md:text-right"}`}>
                  <span className={`text-6xl md:text-8xl font-display text-primary/10 absolute -z-10 select-none transform -translate-y-8 md:-translate-y-12 max-md:right-0 ${
                    index % 2 === 0 ? "md:right-0" : "md:left-0"
                  }`}>
                    {item.year}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display mb-3 text-primary">{item.title}</h3>
                  <p className="text-primary/80 leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Empty Side for Desktop Balance */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
