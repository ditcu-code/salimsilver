import { DeleteButton } from "@/components/admin/delete-button"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { deleteJewelry } from "@/lib/actions/admin"
import { createClient } from "@/lib/supabase/server"
import { Pencil, Plus } from "lucide-react"
import Link from "next/link"

export default async function JewelryListPage() {
  const supabase = await createClient()
  
  const { data: jewelry, error } = await supabase
    .from("jewelry")
    .select("*, collections(title), jewelry_images(src)")
    .order("created_at", { ascending: false })

  if (error) {
      return <div>Error loading jewelry</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif font-bold text-primary">Jewelry</h1>
        <Link href="/admin/jewelry/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add New
          </Button>
        </Link>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Collection</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Material</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jewelry.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.jewelry_images?.[0]?.src && (
                    <div className="relative h-12 w-12 rounded-md overflow-hidden bg-muted">
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={item.jewelry_images[0].src} 
                        alt={item.title}
                        className="object-cover h-full w-full"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.collections?.title || "-"}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.material}</TableCell>
                <TableCell className="text-right space-x-2">
                    <Link href={`/admin/jewelry/${item.id}`}>
                        <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </Link>
                    <DeleteButton 
                        itemName={item.title}
                        onDelete={deleteJewelry.bind(null, item.id)}
                    />
                </TableCell>
              </TableRow>
            ))}
            {jewelry.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                        No jewelry items found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
