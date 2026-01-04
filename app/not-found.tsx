import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import AnimatedButton from "@/components/ui/animated-button"
import { ArrowRight } from "lucide-react"

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="bg-background text-foreground flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-primary/10 font-sans! text-9xl font-medium select-none">404</h1>
        <div className="relative z-10 mx-auto -mt-12 max-w-lg space-y-6">
          <h2 className="font-display text-primary text-4xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            The jewel you are looking for seems to be hidden or no longer exists. Let us guide you
            back to our collection.
          </p>
          <div className="flex flex-col justify-center gap-6 pt-4 sm:flex-row">
            <AnimatedButton href="/" icon={<ArrowRight size={16} />}>
              Return Home
            </AnimatedButton>
            <AnimatedButton href="/catalog" variant="secondary">
              View Catalog
            </AnimatedButton>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
