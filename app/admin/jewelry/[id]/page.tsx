import { JewelryForm } from "@/components/admin/jewelry-form"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function JewelryEditorPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const id = params.id
  const isNew = id === "new"
  const supabase = await createClient()

  // Fetch collections for dropdown
  const { data: collections } = await supabase
    .from("collections")
    .select("id, title")
    .order("title")

  let jewelry = null
  let images: any[] = []

  if (!isNew) {
    const { data, error } = await supabase.from("jewelry").select("*").eq("id", id).single()

    if (error || !data) {
      notFound()
    }
    jewelry = data

    // Fetch images
    const { data: imgData } = await supabase
      .from("jewelry_images")
      .select("*")
      .eq("jewelry_id", id)
      .order("display_order")

    if (imgData) {
      jewelry = { ...jewelry, jewelry_images: imgData }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/jewelry">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="font-serif text-2xl font-bold">
          {isNew ? "New Jewelry" : `Edit: ${jewelry?.title}`}
        </h1>
      </div>

      <JewelryForm initialData={jewelry} collections={collections || []} />
    </div>
  )
}
