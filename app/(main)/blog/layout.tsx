export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-24 pb-20 md:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center md:mb-24">
          <h1 className="font-display text-foreground mt-8 text-4xl tracking-tight md:mt-4 lg:text-5xl">
            The Journal
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed font-light md:text-base">
            From the heart of Kotagede to your hands. Explore the history, techniques, and stories
            behind our handcrafted silver legacy.
          </p>
        </div>

        {children}
      </div>
    </div>
  )
}
