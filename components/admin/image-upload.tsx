"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { deleteJewelryImage, saveJewelryImage } from "@/lib/actions/admin"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Trash2, Upload } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

interface ImageUploadProps {
  jewelryId: string
  images: {
    id: string
    src: string
    display_order: number | null
  }[]
}

export function ImageUpload({ jewelryId, images }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const supabase = createClient()

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${jewelryId}/${Date.now()}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('catalog')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      // Save to DB
      await saveJewelryImage(jewelryId, fileName)
      toast.success("Image uploaded")
    } catch (error: any) {
      toast.error("Upload failed: " + error.message)
    } finally {
      setIsUploading(false)
      // Reset input
      event.target.value = ''
    }
  }

  async function handleDelete(imageId: string) {
      try {
          await deleteJewelryImage(imageId)
          toast.success("Image deleted")
      } catch (error: any) {
          toast.error("Delete failed")
      }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" disabled={isUploading} className="relative">
            {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
                <Upload className="h-4 w-4 mr-2" />
            )}
            Upload Image
            <Input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={handleFileChange}
                accept="image/*"
                disabled={isUploading}
            />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative group aspect-square border rounded-md overflow-hidden bg-muted">
            <Image
              src={img.src}
              alt="Jewelry image"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button 
                variant="destructive" 
                size="icon"
                onClick={() => handleDelete(img.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
