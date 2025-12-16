"use client"

import { Button } from "@/components/ui/button"
import { logout } from "@/lib/actions/auth"
import { cn } from "@/lib/utils"
import { BookOpen, Diamond, FolderOpen, LayoutDashboard, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Jewelry",
    href: "/admin/jewelry",
    icon: Diamond,
  },
  {
    title: "Collections",
    href: "/admin/collections",
    icon: FolderOpen,
  },
  {
    title: "Journal",
    href: "/admin/blog",
    icon: BookOpen,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="bg-muted/40 flex h-full flex-col border-r">
      <div className="flex h-16 items-center border-b px-6">
        <Image
          src="/images/logo-salimsilver.webp"
          alt="Salim Silver"
          width={140}
          height={30}
          className="h-8 w-auto object-contain invert dark:invert-0"
          priority
        />
      </div>
      <div className="flex-1 space-y-1 px-4 py-6">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </div>
      <div className="border-t p-4">
        <form action={logout}>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 w-full justify-start gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </form>
      </div>
    </div>
  )
}
