"use client"
import { SUPABASE_CATALOG_URL } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Image from "next/image"
import React, { useState } from "react"

type Card = {
  id: number
  content: React.ReactNode
  className: string
  thumbnail: string
  alt: string
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-display font-bold md:text-4xl text-xl text-white">Handcrafted Rings</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Discover our collection of intricate silver rings, each piece telling a story of Javanese
        tradition.
      </p>
    </div>
  )
}

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-display font-bold md:text-4xl text-xl text-white">Artisan Necklaces</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Elegant silver necklaces featuring bold pendants and delicate chains, perfect for any
        occasion.
      </p>
    </div>
  )
}

const SkeletonThree = () => {
  return (
    <div>
      <p className="font-display font-bold md:text-4xl text-xl text-white">Silver Bracelets</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Hand-woven and solid silver bracelets that combine modern style with timeless craftsmanship.
      </p>
    </div>
  )
}

const SkeletonFour = () => {
  return (
    <div>
      <p className="font-display font-bold md:text-4xl text-xl text-white">Statement Earrings</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        From subtle studs to dramatic drops, our earrings are designed to captivate and inspire.
      </p>
    </div>
  )
}

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail: `${SUPABASE_CATALOG_URL}/hand-carved-silver-rings-couple-salimsilver.webp`,
    alt: "Handcrafted Silver Rings",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail: `${SUPABASE_CATALOG_URL}/silver-hibiscus-locket-purple-stone-pendant-necklace-salimsilver.webp`,
    alt: "Artisan Necklaces",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail: `${SUPABASE_CATALOG_URL}/silver-filigree-ruby-cuff-bracelet-salimsilver.webp`,
    alt: "Silver Bracelets",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail: `${SUPABASE_CATALOG_URL}/baroque-pearl-citrine-silver-brooch.webp`,
    alt: "Statement Earrings",
  },
]

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null)
  const [lastSelected, setLastSelected] = useState<Card | null>(null)

  const handleClick = (card: Card) => {
    setLastSelected(selected)
    setSelected(card)
  }

  const handleOutsideClick = () => {
    setLastSelected(selected)
    setSelected(null)
  }

  return (
    <div className="w-full h-full p-8 grid grid-cols-1 md:grid-cols-3 max-w-8xl mx-auto gap-4 relative">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "cursor-pointer")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden group",
              selected?.id === card.id
                ? "rounded-3xl cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                : lastSelected?.id === card.id
                ? "z-40 bg-white rounded-3xl h-full w-full"
                : "bg-white rounded-3xl h-full w-full",
            )}
            layoutId={`card-${card.id}`}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <ImageComponent card={card} />
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0  opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none",
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  )
}

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <motion.div
      layoutId={`image-${card.id}-image`}
      className={cn(
        "absolute inset-0 h-full w-full transition-transform duration-200 group-hover:scale-110",
      )}
    >
      <Image
        src={card.thumbnail}
        alt={card.alt}
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </motion.div>
  )
}

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-3xl shadow-2xl relative z-60">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative px-8 pb-4 z-70"
      >
        {selected?.content}
      </motion.div>
    </div>
  )
}

export function LayoutGridDemo() {
  return (
    <div className="h-screen py-20 w-full">
      <LayoutGrid cards={cards} />
    </div>
  )
}
