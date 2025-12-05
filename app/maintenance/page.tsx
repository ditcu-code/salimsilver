import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function MaintenancePage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/maintenance-hero.webp"
          alt="Silversmith workbench"
          fill
          className="object-cover opacity-30"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/90 via-background/80 to-background/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-2xl animate-in fade-in zoom-in duration-700">
        <div className="mb-8 space-y-2">
          <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight text-foreground">
            Salim Silver
          </h1>
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
            Handcrafted Javanese Jewelry
          </p>
        </div>

        <div className="space-y-6 p-8 rounded-2xl bg-background/40 backdrop-blur-md border border-primary/10 shadow-2xl">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            We Are Polishing Our Silver
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed font-medium">
            Our digital storefront is currently undergoing a transformation to bring you an even more exquisite experience. 
            We will be back shortly with our latest collections.
          </p>

          <div className="pt-4">
             <Button asChild variant="outline" className="border-primary/20 hover:bg-primary/5 text-primary">
              <Link href="mailto:contact@salimsilver.com">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-12 text-xs text-muted-foreground/60 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Salim Silver. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}
