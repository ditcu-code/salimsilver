"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { deleteJewelryImage, saveJewelryImage } from "@/lib/actions/admin"
import { supabase } from "@/lib/supabase/client"
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

  async function convertImageToWebP(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img")
      img.onload = () => {
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")
        if (!ctx) {
          reject(new Error("Failed to get canvas context"))
          return
        }
        ctx.drawImage(img, 0, 0)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error("Failed to convert image to WebP"))
            }
          },
          "image/webp",
          0.9 // 90% compression quality
        )
      }
      img.onerror = () => reject(new Error("Failed to load image for conversion"))
      img.src = URL.createObjectURL(file)
    })
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      // Convert to WebP
      const webpBlob = await convertImageToWebP(file)

      const fileName = `${jewelryId}/${Date.now()}.webp`

      const { error: uploadError } = await supabase.storage
        .from("catalog")
        .upload(fileName, webpBlob, {
          contentType: "image/webp",
          cacheControl: "3600",
          upsert: false,
        })

      if (uploadError) throw uploadError

      // Save to DB
      await saveJewelryImage(jewelryId, fileName)
      toast.success("Image uploaded (converted to WebP)")
    } catch (error: any) {
      toast.error("Upload failed: " + error.message)
    } finally {
      setIsUploading(false)
      // Reset input
      event.target.value = ""
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
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Upload className="mr-2 h-4 w-4" />
          )}
          Upload Image
          <Input
            type="file"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={handleFileChange}
            accept="image/*"
            disabled={isUploading}
          />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="group bg-muted relative aspect-square overflow-hidden rounded-md border"
          >
            <Image
              src={img.src}
              alt="Jewelry image"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <Button variant="destructive" size="icon" onClick={() => handleDelete(img.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
