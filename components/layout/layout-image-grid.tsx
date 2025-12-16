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
      <p className="font-display text-xl font-bold text-white md:text-4xl">Handcrafted Rings</p>
      <p className="my-4 max-w-lg text-base font-normal text-neutral-200">
        Discover our collection of intricate silver rings, each piece telling a story of Javanese
        tradition.
      </p>
    </div>
  )
}

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-display text-xl font-bold text-white md:text-4xl">Artisan Necklaces</p>
      <p className="my-4 max-w-lg text-base font-normal text-neutral-200">
        Elegant silver necklaces featuring bold pendants and delicate chains, perfect for any
        occasion.
      </p>
    </div>
  )
}

const SkeletonThree = () => {
  return (
    <div>
      <p className="font-display text-xl font-bold text-white md:text-4xl">Silver Bracelets</p>
      <p className="my-4 max-w-lg text-base font-normal text-neutral-200">
        Hand-woven and solid silver bracelets that combine modern style with timeless craftsmanship.
      </p>
    </div>
  )
}

const SkeletonFour = () => {
  return (
    <div>
      <p className="font-display text-xl font-bold text-white md:text-4xl">Statement Earrings</p>
      <p className="my-4 max-w-lg text-base font-normal text-neutral-200">
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
    <div className="max-w-8xl relative mx-auto grid h-full w-full grid-cols-1 gap-4 p-8 md:grid-cols-3">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "cursor-pointer")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "group relative overflow-hidden",
              selected?.id === card.id
                ? "absolute inset-0 z-50 m-auto flex h-1/2 w-full cursor-pointer flex-col flex-wrap items-center justify-center rounded-3xl md:w-1/2"
                : lastSelected?.id === card.id
                  ? "z-40 h-full w-full rounded-3xl bg-white"
                  : "h-full w-full rounded-3xl bg-white"
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
          "absolute top-0 left-0 z-10 h-full w-full opacity-0",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
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
        "absolute inset-0 h-full w-full transition-transform duration-200 group-hover:scale-110"
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
    <div className="relative z-60 flex h-full w-full flex-col justify-end rounded-3xl bg-transparent shadow-2xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="absolute inset-0 z-10 h-full w-full bg-black opacity-60"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative z-70 px-8 pb-4"
      >
        {selected?.content}
      </motion.div>
    </div>
  )
}

export function LayoutGridDemo() {
  return (
    <div className="h-screen w-full py-20">
      <LayoutGrid cards={cards} />
    </div>
  )
}
