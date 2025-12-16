"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/actions/auth"
import { createClient } from "@/lib/supabase/client"
import { User } from "@/lib/types"
import { cn } from "@/lib/utils"
import { BookOpen, Diamond, FolderOpen, LayoutDashboard, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

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
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function getUser() {
      const supabase = createClient()
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (authUser) {
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("id", authUser.id)
          .single()

        if (profile) {
          setUser({
            id: profile.id,
            fullName: profile.full_name,
            email: profile.email,
            avatarUrl: profile.avatar_url,
            role: profile.role,
            createdAt: profile.created_at,
            updatedAt: profile.updated_at,
          })
        }
      }
    }
    getUser()
  }, [])

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

      <div className="space-y-4 border-t p-4">
        {user && (
          <div className="flex items-center gap-3 px-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatarUrl} alt={user.fullName} />
              <AvatarFallback>{user.fullName?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user.fullName}</p>
              <p className="text-muted-foreground truncate text-xs">{user.email}</p>
            </div>
          </div>
        )}
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
