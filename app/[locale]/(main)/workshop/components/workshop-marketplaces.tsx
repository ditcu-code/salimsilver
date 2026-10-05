import Image from "next/image"

import { GetYourGuide } from "@/components/icons/get-your-guide"

const marketplaces = [
  {
    name: "Airbnb",
    href: "https://airbnb.com/x/craft-in-kotagede",
    logo: "airbnb"
  },
  {
    name: "GetYourGuide",
    href: "https://www.getyourguide.com/yogyakarta-l349/yogyakarta-javanese-authentic-silver-jewelry-making-class-t1494967/",
    logo: "get-your-guide"
  }
]

export function WorkshopMarketplaces({ title }: { title: string }) {
  return (
    <section className="container mx-auto px-4 py-12 text-center md:py-16">
      <h2 className="font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-50">
        {title}
      </h2>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
        {marketplaces.map((marketplace) => (
          <a
            key={marketplace.name}
            href={marketplace.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={marketplace.name}
            className="flex h-28 w-full max-w-60 items-center justify-center rounded-2xl border border-stone-200 bg-white px-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-900 dark:border-stone-800 dark:bg-stone-900 dark:focus-visible:outline-stone-100"
          >
            {marketplace.logo === "airbnb" ? (
              <Image
                src="/images/logos/airbnb-belo.svg"
                alt=""
                width={320}
                height={100}
                className="h-auto w-full max-w-40"
                unoptimized
              />
            ) : (
              <GetYourGuide aria-hidden="true" className="h-16 w-auto" />
            )}
          </a>
        ))}
      </div>
    </section>
  )
}
