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
    <div className="flex flex-col h-full bg-muted/40 border-r">
      <div className="h-16 flex items-center px-6 border-b">
        <Image
          src="/images/logo-salimsilver.webp"
          alt="Salim Silver"
          width={140}
          height={30}
          className="h-8 w-auto object-contain invert dark:invert-0"
          priority
        />
      </div>
      <div className="flex-1 py-6 px-4 space-y-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </div>
      <div className="p-4 border-t">
        <form action={logout}>
            <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4" />
            Sign Out
            </Button>
        </form>
      </div>
    </div>
  )
}
