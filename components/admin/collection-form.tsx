"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { createCollection, updateCollection } from "@/lib/actions/admin"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { CoverImageSelector } from "./cover-image-selector"

interface CollectionFormProps {
  initialData?: any
}

export function CollectionForm({ initialData }: CollectionFormProps) {
  const [isSaving, setIsSaving] = useState(false)
  const isEditing = !!initialData

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaving(true)

    const formData = new FormData(event.currentTarget)
    
    try {
      if (isEditing) {
        await updateCollection(initialData.id, formData)
        toast.success("Collection updated")
      } else {
        await createCollection(formData)
        // Redirect handled in action
      }
    } catch (error: any) {
      toast.error("Error: " + error.message)
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
                id="title" 
                name="title" 
                defaultValue={initialData?.title} 
                required 
                onChange={(e) => {
                    if (!isEditing) {
                        const slugInput = document.getElementById('slug') as HTMLInputElement
                        if (slugInput) slugInput.value = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                    }
                }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" defaultValue={initialData?.slug} required />
          </div>
        </div>

        <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" defaultValue={initialData?.description} rows={4} />
        </div>

        <div className="flex items-center space-x-2">
            <Switch id="featured" name="featured" defaultChecked={initialData?.featured} />
            <Label htmlFor="featured">Featured Collection</Label>
        </div>

        <Button type="submit" disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? "Save Changes" : "Create Collection"}
        </Button>
      </form>

      {isEditing && (
          <div className="pt-8 border-t">
              <CoverImageSelector 
                  collectionId={initialData.id}
                  collectionTitle={initialData.title}
                  currentCoverId={initialData.cover_image_id}
                  currentCoverSrc={initialData.coverImageSrc} 
              />
          </div>
      )}
    </div>
  )
}
