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
        <p className="text-muted-foreground max-w-2xl mx-auto">
          From a humble family workshop to a guardian of Kotagede silver heritage.
        </p>
      </motion.div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-primary/30 -translate-x-1/2 md:translate-x-0" />

        <div className="space-y-12 md:space-y-24">
          {[
            {
              year: "1930",
              title: "The Beginning",
              description:
                "Karto Oetomo, the grandfather of Priyo Salim, starts a silver business named 'KD'. This history is recorded in 'Yogya Silver: Renewal of a Javanese Handicraft' (2005) by Pienke W.H. Kal. The workshop focused on creating fine household silverware.",
            },
            {
              year: "1952",
              title: "A New Legacy",
              description:
                "Salim Widardjo, the son of Karto Oetomo, establishes 'Salim' Silver. He introduces intricate silver miniatures including becak, andong, and traditional statues, setting a new standard for craftsmanship.",
            },
            {
              year: "1985",
              title: "The Third Generation",
              description:
                "Priyo Salim joins the family business while studying Cartography at Universitas Gadjah Mada, bringing a new perspective to the traditional craft.",
            },
            {
              year: "1987",
              title: "The Pivot",
              description:
                "Constrained by limited capital but inspired by the 'Power and Gold' book, Priyo Salim shifts his focus to producing Javanese silver jewelry.",
            },
            {
              year: "1988",
              title: "The First Gallery",
              description:
                "After generations of fulfilling orders for others at the Purbayan workshop, Priyo Salim opens his first shop on Jalan Kemasan to reach international tourists. At the time, it was one of Indonesia's largest silver craft centers.",
            },
            {
              year: "1990",
              title: "Global Reach",
              description:
                "Salim Silver expands into the international market, exporting handcrafted Javanese jewelry to the United States and Europe.",
            },
            {
              year: "2017",
              title: "Modernization",
              description:
                "The 4th generation begins modernizing the business, preserving traditional techniques while adapting to the digital era.",
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
