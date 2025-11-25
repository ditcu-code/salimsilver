"use client"

import AnimatedButton from "@/components/animated-button"
import FeaturedCollections from "@/components/featured-collections"
import { HeroGallery } from "@/components/hero-gallery"
import { LayoutGridDemo } from "@/components/layout-image-grid"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Slider */}
      <HeroGallery />

      {/* Hero Section with Slider 
      <HeroSlider />*/}

      {/* Introduction */}
      <section id="introduction" className="mt-32 mb-20 sm:py-0 py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-6 font-cormorantGaramond">The Art of Silver Craftsmanship</h2>
            <p className="text-primary-secondary mb-6">
              At Salim Silver, we believe that jewelry is more than just an accessory; it is an expression of art and tradition.
              Our pieces are handcrafted by skilled artisans in Kotagede, Yogyakarta, preserving a legacy of renewal and design.
            </p>
            <p className="text-primary-secondary mb-8">
              From intricate filigree rings to bold statement necklaces, every item in our collection tells a unique story.
            </p>
            <AnimatedButton href="/about" variant="outline" icon={<ArrowRight size={16} />}>
              Discover Our Heritage
            </AnimatedButton>
          </motion.div>
          <motion.div
            className="relative h-[500px] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/hero-background.png"
              alt="Artisan at work"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Dynamic Frame Section 
      <DynamicFrame />*/}

      {/* Layout Grid Section */}
      <LayoutGridDemo />

       {/* Call to Action */}
      <section className="z-10 min-w-[90%] justify-self-center mr-4 ml-4 py-20 lg:my-20 sm:mt-0 sm:mb-20 md:px-8 px-2 rounded-3xl border border-border bg-secondary/30">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-primary text-3xl md:text-4xl mb-6 font-cormorantGaramond">Custom Designs & Wholesale</h2>
          <p className="text-primary max-w-2xl mx-auto mb-8">
            Looking for a unique piece or interested in stocking our jewelry? We offer custom design services and wholesale partnerships.
          </p>
          <AnimatedButton href="/contact" variant="primary" icon={<ArrowRight size={18} />}>
            Inquire Now
          </AnimatedButton>
        </motion.div>
      </section>

      <FeaturedCollections
        title="Featured Collections"
        description="Explore our curated selection of handcrafted silver jewelry"
        ctaLabel="View All Collections"
        ctaHref="/catalog"
        sectionClassName="lg:mt-32 mb-32 z-10 mt-20"
      />
    </div>
  )
}
