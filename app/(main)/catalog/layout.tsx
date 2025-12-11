import CatalogHeader from "./components/CatalogHeader"

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8">
      <CatalogHeader />
      {children}
    </div>
  )
}
