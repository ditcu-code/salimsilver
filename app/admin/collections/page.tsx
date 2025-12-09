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
import { deleteCollection } from "@/lib/actions/admin"
import { createClient } from "@/lib/supabase/server"
import { Pencil, Plus, Star, StarOff } from "lucide-react"
import Link from "next/link"

export default async function CollectionListPage() {
  const supabase = await createClient()
  
  const { data: collections, error } = await supabase
    .from("collections")
    .select("*")
    .order("title")

  if (error) {
      return <div>Error loading collections</div>
  }

  // Fetch cover images
  const coverImageIds = collections.map(c => c.cover_image_id).filter(Boolean)
  let coverImagesMap: Record<string, string> = {}
  
  if (coverImageIds.length > 0) {
      const { data: images } = await supabase
        .from("jewelry_images")
        .select("id, src")
        .in("id", coverImageIds)
      
      if (images) {
         images.forEach((img: any) => {
             coverImagesMap[img.id] = img.src
         })
      }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif font-bold text-primary">Collections</h1>
        <Link href="/admin/collections/new">
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
              <TableHead>Cover</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collections.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.cover_image_id && coverImagesMap[item.cover_image_id] && (
                    <div className="relative h-12 w-12 rounded-md overflow-hidden bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={coverImagesMap[item.cover_image_id]} 
                        alt={item.title}
                        className="object-cover h-full w-full"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.slug}</TableCell>
                <TableCell>
                    {item.featured ? <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> : <StarOff className="h-4 w-4 text-muted-foreground" />}
                </TableCell>
                <TableCell className="text-right space-x-2">
                    <Link href={`/admin/collections/${item.id}`}>
                        <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </Link>
                    <DeleteButton 
                        itemName={item.title}
                        onDelete={deleteCollection.bind(null, item.id)}
                    />
                </TableCell>
              </TableRow>
            ))}
            {collections.length === 0 && (
                <TableRow>
                    <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                        No collections found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
