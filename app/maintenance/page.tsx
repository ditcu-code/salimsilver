import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function MaintenancePage() {
  return (
    <div className="bg-background text-foreground relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/silversmith-workbench.webp"
          alt="Silversmith workbench"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          priority
          quality={90}
        />
        <div className="from-background/90 via-background/80 to-background/95 absolute inset-0 bg-linear-to-b" />
      </div>

      {/* Content */}
      <div className="animate-in fade-in zoom-in relative z-10 container mx-auto max-w-2xl px-4 text-center duration-700">
        <div className="mb-8 space-y-2">
          <h1 className="text-foreground font-serif text-5xl font-medium tracking-tight md:text-7xl">
            Salim Silver
          </h1>
          <p className="text-muted-foreground text-sm font-medium tracking-[0.3em] uppercase">
            Handcrafted Javanese Jewelry
          </p>
        </div>

        <div className="bg-background/40 border-primary/10 space-y-6 rounded-2xl border p-8 shadow-2xl backdrop-blur-md">
          <h2 className="text-foreground font-serif text-3xl md:text-4xl">
            We Are Polishing Our Silver
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed font-medium">
            Our digital storefront is currently undergoing a transformation to bring you an even
            more exquisite experience. We will be back shortly with our latest collections.
          </p>

          <div className="pt-4">
            <Button
              asChild
              variant="outline"
              className="border-primary/20 hover:bg-primary/5 text-primary"
            >
              <Link href="mailto:contact@salimsilver.com">Contact Us</Link>
            </Button>
          </div>
        </div>

        <div className="text-muted-foreground/60 mt-12 text-xs tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Salim Silver. All Rights Reserved.
        </div>
      </div>
    </div>
  )
}
