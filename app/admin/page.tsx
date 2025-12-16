import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { Gem, Layers } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const { count: jewelryCount } = await supabase
    .from("jewelry")
    .select("*", { count: "exact", head: true })

  const { count: collectionCount } = await supabase
    .from("collections")
    .select("*", { count: "exact", head: true })

  return (
    <div className="space-y-6">
      <h1 className="text-primary font-serif text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jewelry</CardTitle>
            <Gem className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jewelryCount || 0}</div>
            <p className="text-muted-foreground text-xs">Items in catalog</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collections</CardTitle>
            <Layers className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{collectionCount || 0}</div>
            <p className="text-muted-foreground text-xs">Active collections</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
