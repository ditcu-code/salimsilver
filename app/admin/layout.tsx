import { AdminSidebar } from "@/components/admin/sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background flex h-screen w-full overflow-hidden">
      <aside className="hidden w-64 shrink-0 md:block">
        <AdminSidebar />
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 pb-20">{children}</div>
      </main>
    </div>
  )
}
