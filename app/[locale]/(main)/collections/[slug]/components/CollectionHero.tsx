"use client"

import Image from "next/image"

interface CollectionHeroProps {
  title: string
  description?: string
  coverImage: string
}

export default function CollectionHero({
  title,
  description,
  coverImage,
}: CollectionHeroProps) {
  return (
    <section className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] h-[50vh] w-screen">
      <Image
        src={coverImage || "/images/gebyok.webp"}
        alt={title}
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
        <h1 className="mb-4 text-4xl text-white md:text-5xl">{title}</h1>
        {description && (
          <p className="max-w-2xl text-lg text-white/90">{description}</p>
        )}
      </div>
    </section>
  )
}
