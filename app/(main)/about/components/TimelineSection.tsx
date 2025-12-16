"use client"

import { motion } from "framer-motion"

export default function TimelineSection() {
  return (
    <section className="mx-auto max-w-7xl overflow-hidden px-4 py-24 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="font-display mb-4 text-4xl md:text-5xl">Our Journey</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          From a humble family workshop to a guardian of Kotagede silver heritage.
        </p>
      </motion.div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="bg-primary/30 absolute top-0 bottom-0 left-[15px] w-px -translate-x-1/2 md:left-1/2 md:translate-x-0" />

        <div className="space-y-12 md:space-y-24">
          {[
            {
              year: "1930",
              title: "The Beginning",
              description:
                "Karto Oetomo, the grandfather of Priyo Salim, lays the foundation by starting 'KD', a silver business focused on fine household silverware. This early history is documented in Pienke W.H. Kal's 'Yogya Silver: Renewal of a Javanese Handicraft' (2005).",
            },
            {
              year: "1952",
              title: "A New Legacy",
              description:
                "Building on his father's work, Salim Widardjo establishes 'Salim' Silver. He expands the craft by introducing intricate silver miniatures—including becak, andong, and traditional statues—setting a new benchmark for detail.",
            },
            {
              year: "1985",
              title: "The Third Generation",
              description:
                "The legacy continues as Priyo Salim joins the family business. While studying Cartography at Universitas Gadjah Mada, he brings a fresh perspective to the traditional workshop.",
            },
            {
              year: "1987",
              title: "The Pivot",
              description:
                "A defining moment arrives. Inspired by the book 'Power and Gold', Priyo Salim steers the workshop toward a new direction: handcrafted Javanese silver jewelry, blending tradition with wearable art.",
            },
            // {
            //   year: "1988",
            //   title: "The First Gallery",
            //   description:
            //     "Moving beyond the Purbayan workshop, Priyo opens his first gallery on Jalan Kemasan. Positioned in the heart of Kotagede's silver district, this step opens Salim Silver to the world of international tourism.",
            // },
            {
              year: "1990",
              title: "Global Reach",
              description:
                "The commitment to quality pays off as Salim Silver enters the global market, exporting its handcrafted jewelry to clients across the United States and Europe.",
            },
            {
              year: "2017",
              title: "Modernization",
              description:
                "The 4th generation steps forward to carry the torch. They begin modernizing the business operations, ensuring that the ancient techniques thrive in the digital era.",
            },
            {
              year: "Present",
              title: "A Living Museum",
              description:
                "Today, Salim Silver stands as a guardian of heritage. Our workshop remains a living museum, open to all who wish to witness the creation of 'art for the future' that honors the past.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.year}
              className={`relative flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-0 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Timeline Node */}
              <div className="bg-background absolute top-0 left-[15px] z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center md:top-1/2 md:left-1/2 md:-translate-y-1/2">
                <div className="bg-primary h-3 w-3 rotate-45" />
              </div>

              {/* Content Side */}
              <div className="w-full pl-12 md:w-1/2 md:px-16">
                <div
                  className={`relative flex w-full flex-col ${index % 2 === 0 ? "md:items-start md:text-left" : "md:items-end md:text-right"}`}
                >
                  <span
                    className={`font-display text-primary/20 absolute -z-10 -translate-y-8 transform text-6xl select-none max-md:right-0 md:-translate-y-12 md:text-8xl ${
                      index % 2 === 0 ? "md:right-0" : "md:left-0"
                    }`}
                  >
                    {item.year}
                  </span>
                  <h3 className="font-display text-primary mb-3 text-2xl md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="text-primary/80 max-w-md leading-relaxed">{item.description}</p>
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
