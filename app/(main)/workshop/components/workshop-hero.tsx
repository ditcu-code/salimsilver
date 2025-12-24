import Image from "next/image"

export function WorkshopHero() {
  return (
    <section className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] flex min-h-[50vh] w-screen flex-col justify-center bg-neutral-900 py-24 text-center text-neutral-50">
      <div className="absolute inset-0 z-0 overflow-hidden opacity-40">
        <Image
          src="/images/tatah-cincin.webp"
          alt="Menatah Cincin diatas Jabung"
          title="Let's Create"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="relative z-10 container mx-auto px-4">
        <h1 className="mb-6 font-serif text-5xl font-bold tracking-tight md:text-6xl">
          Silversmith Workshop
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-neutral-300 md:text-xl">
          Experience the art of Javanese silversmithing. Create your own masterpiece in the heart of
          Kotagede directly solely with the master.
        </p>
      </div>
    </section>
  )
}
