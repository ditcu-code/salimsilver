import { AdminSidebar } from "@/components/admin/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <aside className="hidden w-64 md:block shrink-0">
        <AdminSidebar />
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 pb-20">
            {children}
        </div>
      </main>
    </div>
  )
}
