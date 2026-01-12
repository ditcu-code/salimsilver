"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createJewelry, updateJewelry } from "@/lib/actions/admin"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { SubmitButton } from "../features/submit-button"
import { ImageUpload } from "./image-upload"

interface JewelryFormProps {
  initialData?: any
  collections: any[]
}

export function JewelryForm({ initialData, collections }: JewelryFormProps) {
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const isEditing = !!initialData

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaving(true)

    const formData = new FormData(event.currentTarget)

    try {
      if (isEditing) {
        await updateJewelry(initialData.id, formData)
        toast.success("Jewelry updated")
        setIsSaving(false)
      } else {
        const result = await createJewelry(formData)
        if (result?.success && result.id) {
          toast.success("Jewelry created")
          router.push(`/admin/jewelry/${result.id}`)
        }
      }
    } catch (error: any) {
      toast.error("Error: " + error.message)
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-8">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              defaultValue={initialData?.title}
              required
              onChange={(e) => {
                // Auto-generate slug if new
                if (!isEditing) {
                  const slugInput = document.getElementById("slug") as HTMLInputElement
                  if (slugInput)
                    slugInput.value = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                }
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">
              Slug <span className="text-red-500">*</span>
            </Label>
            <Input id="slug" name="slug" defaultValue={initialData?.slug} required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={initialData?.description}
            rows={4}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="collection_id">
              Collection <span className="text-red-500">*</span>
            </Label>
            <Select name="collection_id" defaultValue={initialData?.collection_id || ""}>
              <SelectTrigger>
                <SelectValue placeholder="Select collection" />
              </SelectTrigger>
              <SelectContent>
                {collections.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue={initialData?.status || "available"}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
                <SelectItem value="hidden">Hidden</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="material">Material</Label>
            <Select name="material" defaultValue={initialData?.material || "silver"}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="copper">Copper</SelectItem>
                <SelectItem value="brass">Brass</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="material_purity">Purity</Label>
            <Input
              id="material_purity"
              name="material_purity"
              defaultValue={initialData?.material_purity}
              placeholder="e.g. 925"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight_grams">Weight (g)</Label>
            <Input
              id="weight_grams"
              name="weight_grams"
              type="number"
              step="0.1"
              defaultValue={initialData?.weight_grams}
            />
          </div>
        </div>

        <SubmitButton
          isLoading={isSaving}
          text={isEditing ? "Save Changes" : "Create Jewelry"}
          loadingText={isEditing ? "Saving..." : "Creating..."}
        />
      </form>

      {isEditing && (
        <div className="space-y-4 border-t pt-8">
          <h3 className="text-lg font-medium">Images</h3>
          <ImageUpload jewelryId={initialData.id} images={initialData.jewelry_images || []} />
        </div>
      )}
    </div>
  )
}
