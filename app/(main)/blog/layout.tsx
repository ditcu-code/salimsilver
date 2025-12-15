export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen pt-24 pb-20 md:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto space-y-4">
           <h1 className="mt-8 md:mt-4 font-display text-4xl lg:text-5xl text-foreground tracking-tight">
             The Journal
           </h1>
           <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light">
             From the heart of Kotagede to your hands. Explore the history, techniques, and stories behind our handcrafted silver legacy.
           </p>
        </div>
        
        {children}
      </div>
    </div>
  )
}
