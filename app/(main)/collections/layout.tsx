import CollectionsHeader from "./components/CollectionsHeader"

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen px-4 pt-24 pb-12 md:px-8">
      <CollectionsHeader />
      {children}
    </div>
  )
}
