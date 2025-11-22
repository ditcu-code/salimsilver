"use client"

import AnimatedButton from "@/components/animated-button"
import { motion } from "framer-motion"
import { ArrowRight, Award, Globe, Users } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full">
        <Image
          src="/images/hero-background.png"
          alt="About Salim Silver"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          className="absolute inset-0 flex flex-col justify-center items-center text-center p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl text-white mb-4 font-cormorantGaramond">Our Story</h1>
          <p className="text-white/90 text-lg max-w-2xl">Crafting timeless elegance since 1990</p>
        </motion.div>
      </section>
      <div className="header-height"></div>

      {/* Bio Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative h-[600px] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/rings-cover.png"
              alt="Jewelry craftsmanship"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-6 font-cormorantGaramond">The Heritage</h2>
            <p className="text-primary mb-4">
              Salim Silver is a guardian of heritage in Kotagede, the historic capital of the Mataram Sultanate. 
              Our workshop is a "living museum" where the ancient art of Javanese silver crafting is preserved and renewed.
            </p>
            <p className="text-primary mb-4">
              Our founder, Priyo Jatmiko Salim, is a UGM alumnus who inherited the family business in 1987. 
              He has dedicated his life to mastering and revitalizing the intricate techniques of Repoussé (embossing) and Filigree.
            </p>
            <p className="text-primary mb-6">
              Today, we continue to create pieces that are not just jewelry, but wearable art that honors our heritage 
              while embracing the future of design.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Award size={20} className="text-primary" />
                <span className="text-primary">Master Craftsmanship</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={20} className="text-primary" />
                <span className="text-primary">Ethically Sourced</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} className="text-primary" />
                <span className="text-primary">Artisan Collective</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl mb-8 text-center font-cormorantGaramond"
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
                className="text-primary dark:text-primary-secondary bg-primary-secondary dark:bg-primary p-8 rounded-2xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className="text-primary-secondary dark:text-primary-foreground text-xl mb-4">{item.title}</h3>
                <p className="text-primary-secondary dark:text-primary-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl mb-12 text-center font-cormorantGaramond"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Our Journey
        </motion.h2>
        <div className="space-y-12">
          {[
            {
              year: "1987",
              title: "The Inheritance",
              description:
                "Priyo Jatmiko Salim inherits the family silver handicraft business, beginning a new chapter.",
            },
            {
              year: "1990",
              title: "Official Establishment",
              description:
                "Salim Silver is formally established, marking the transition to a modern enterprise.",
            },
            {
              year: "1998",
              title: "Resilience",
              description:
                "Navigating the Asian Financial Crisis by focusing on high-quality exports to international markets.",
            },
            {
              year: "Present",
              title: "Living Museum",
              description:
                "Continuing as a bastion of heritage, creating 'art for the future' in the heart of Kotagede.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.year}
              className="flex flex-col md:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="md:w-1/4">
                <h3 className="text-xl">{item.year}</h3>
              </div>
              <div className="md:w-3/4">
                <h4 className="font-medium text-2xl mb-2">{item.title}</h4>
                <p className="text-primary">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="min-w-[90%] justify-self-center mr-4 ml-4 py-20 my-20 px-4 md:px-8 rounded-3xl border border-border bg-secondary/30">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-primary text-3xl md:text-4xl mb-6 font-cormorantGaramond">Visit Our Workshop</h2>
          <p className="text-primary max-w-2xl mx-auto mb-8">
            Experience the magic of silver crafting firsthand. Book a tour or a jewelry-making class.
          </p>
          <AnimatedButton href="/contact" variant="primary" icon={<ArrowRight size={18} />}>
            Book a Visit
          </AnimatedButton>
        </motion.div>
      </section>
    </div>
  )
}
