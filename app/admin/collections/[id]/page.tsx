import { CollectionForm } from "@/components/admin/collection-form"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function CollectionEditorPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const id = params.id
  const isNew = id === "new"
  const supabase = await createClient()

  let collection = null

  if (!isNew) {
    const { data, error } = await supabase.from("collections").select("*").eq("id", id).single()

    if (error || !data) {
      notFound()
    }
    collection = data

    // Fetch cover image src if exists
    if (collection.cover_image_id) {
      const { data: img } = await supabase
        .from("jewelry_images")
        .select("src")
        .eq("id", collection.cover_image_id)
        .single()
      if (img) {
        collection = { ...collection, coverImageSrc: img.src }
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/collections">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="font-serif text-2xl font-bold">
          {isNew ? "New Collection" : `Edit: ${collection?.title}`}
        </h1>
      </div>

      <CollectionForm initialData={collection} />
    </div>
  )
}
