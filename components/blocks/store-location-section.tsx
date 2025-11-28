"use client"

import AnimatedButton from "@/components/animated-button"
import { motion } from "framer-motion"
import { ArrowRight, MapPin } from "lucide-react"

export default function StoreLocationSection() {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Address Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display mb-6">Location Details</h2>
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            We are located in the heart of Kotagede, the historic silver district of Yogyakarta.
          </p>

          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Salim Silver</h3>
              <p className="text-muted-foreground text-lg">
                Kebohan KG 3/547, Purbayan, Kotagede
                <br />
                Yogyakarta City, Indonesia
              </p>
            </div>
          </div>

          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <AnimatedButton
              href="https://maps.google.com/maps/dir//Salim+Silver+Kebohan+KG+3%2F547+Purbayan+Kotagede,+Yogyakarta+City,+Special+Region+of+Yogyakarta+55173/@-7.8272881,110.4018794,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x2e7a571440134b63:0x5c7989d8a5177cca"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              icon={<ArrowRight size={18} />}
            >
              Get Directions
            </AnimatedButton>
          </motion.div>
        </motion.div>

        {/* Right Side: Google Map */}
        <motion.div
          className="w-full h-[400px] rounded-3xl overflow-hidden shadow-lg border border-border"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.645272036199!2d110.40199319999999!3d-7.827317099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a571440134b63%3A0x5c7989d8a5177cca!2sSalim%20Silver!5e0!3m2!1sen!2sid!4v1764164759087!5m2!1sen!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Salim Silver Location"
          ></iframe>
        </motion.div>
      </div>
    </section>
  )
}
