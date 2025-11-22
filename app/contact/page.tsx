"use client"

import AnimatedButton from "@/components/animated-button"
import { ContactForm } from "@/components/contact-form"
import FeaturedCollections from "@/components/featured-collections"
import { motion } from "framer-motion"
import { ArrowRight, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react"
import Image from "next/image"


export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Spacer for header
      <div className="header-height"></div> */}

       {/* Hero Section */}
      <section className="relative h-[50vh] w-full">
        <Image
          src="/images/hero-background.png"
          alt="Contact Salim Silver"
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
          <h1 className="text-4xl md:text-5xl text-white mb-4 font-cormorantGaramond">Contact Us</h1>
          <p className="text-white/90 text-lg max-w-2xl">We'd love to hear from you</p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-16 mt-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl mb-6 font-cormorantGaramond">Get in Touch</h1>
            <p className="text-primary/60 mb-8 max-w-md">
              Whether you have a question about a piece, want to discuss a custom design, or just want to say hello, we're here to help.
            </p>

            <motion.div
              className="space-y-6 mb-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3,
                  },
                },
              }}
            >
              {[
                {
                  icon: <Mail className="text-primary mt-1" size={20} />,
                  title: "Email",
                  content: "hello@salimsilver.com",
                },
                {
                  icon: <MapPin className="text-primary mt-1" size={20} />,
                  title: "Workshop",
                  content: "Kotagede, Yogyakarta, Indonesia",
                },
                {
                  icon: <Phone className="text-primary mt-1" size={20} />,
                  title: "Phone",
                  content: "+62 812 3456 7890",
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-4"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {item.icon}
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-primary/60">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-xl mb-4 font-cormorantGaramond">Follow Us</h3>
              <div className="flex flex-wrap gap-1">
                {[
                  { icon: <Instagram size={26} />, label: "Instagram", href: "#" },
                  { icon: <Twitter size={26} />, label: "Twitter", href: "#" },
                  { icon: <Facebook size={26} />, label: "Facebook", href: "#" },
                ].map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-primary-secondary rounded-full transition-colors hover:bg-primary hover:text-primary-foreground"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="bg-primary dark:bg-primary-foreground p-8 rounded-2xl shadow-sm border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl mb-6 font-cormorantGaramond">Send a Message</h2>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="min-w-[90%] justify-self-center mr-4 ml-4 py-20 my-20 px-4 md:px-8 rounded-3xl border border-border bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl text-center mb-12 font-cormorantGaramond"
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

        {/* Featured Collections */}
      <section className="mt-20 mb-20 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-primary text-3xl md:text-4xl mb-4 font-cormorantGaramond">Featured Collections</h2>
            <p className="text-primary max-w-2xl mx-auto">
              Explore our latest creations
            </p>
          </motion.div>
          <FeaturedCollections />
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <AnimatedButton href="/catalog" variant="primary" icon={<ArrowRight size={18} />}>
              View All Collections
            </AnimatedButton>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
