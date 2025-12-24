"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { setCollectionCoverImage } from "@/lib/actions/admin"
import { supabase } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface CoverImageSelectorProps {
  collectionId: string
  collectionTitle?: string
  currentCoverId: string | null
  currentCoverSrc: string | null
}

export function CoverImageSelector({
  collectionId,
  collectionTitle,
  currentCoverId,
  currentCoverSrc,
}: CoverImageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const [mounted, setMounted] = useState(false)

  async function searchImages() {
    setLoading(true)

    let query = supabase.from("jewelry").select("id, title, jewelry_images(id, src)")

    if (search) {
      query = query.ilike("title", `%${search}%`).limit(10)
    } else {
      // Default to latest 5 modified
      query = query.order("updated_at", { ascending: false }).limit(5)
    }

    const { data: jewelry } = await query

    const flatImages =
      jewelry?.flatMap((j: any) =>
        j.jewelry_images.map((img: any) => ({
          ...img,
          jewelryTitle: j.title,
        }))
      ) || []

    setImages(flatImages)
    setLoading(false)
  }

  useEffect(() => {
    if (isOpen && !mounted) {
      searchImages()
      setMounted(true)
    }
    if (!isOpen) {
      setMounted(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  async function handleSelect(imageId: string) {
    try {
      await setCollectionCoverImage(collectionId, imageId)
      toast.success("Cover image updated")
      setIsOpen(false)
    } catch (error) {
      toast.error("Failed to update cover image")
    }
  }

  return (
    <div className="space-y-4">
      <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Cover Image
      </label>
      <div className="flex items-start gap-4">
        <div className="bg-muted relative h-32 w-32 overflow-hidden rounded-md border">
          {currentCoverSrc ? (
            <Image
              src={currentCoverSrc}
              alt={
                collectionTitle ? `Cover image for ${collectionTitle}` : "Collection cover image"
              }
              fill
              className="object-cover"
            />
          ) : (
            <div className="text-muted-foreground flex h-full w-full items-center justify-center text-xs">
              No Image
            </div>
          )}
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Change Cover Image</Button>
          </DialogTrigger>
          <DialogContent className="flex h-[80vh] max-w-3xl flex-col">
            <DialogHeader>
              <DialogTitle>Select Cover Image</DialogTitle>
            </DialogHeader>
            <div className="mb-4 flex gap-2">
              <Input
                placeholder="Search jewelry..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchImages()}
              />
              <Button onClick={searchImages} disabled={loading}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-4 overflow-y-auto p-1">
              {images.map((img) => (
                <div
                  key={img.id}
                  className={cn(
                    "group relative aspect-square cursor-pointer overflow-hidden rounded-md border",
                    currentCoverId === img.id
                      ? "ring-primary ring-2"
                      : "hover:ring-primary/50 hover:ring-1"
                  )}
                  onClick={() => handleSelect(img.id)}
                >
                  <Image
                    src={img.src}
                    alt={img.jewelryTitle}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 20vw"
                    unoptimized
                  />
                  <div className="absolute right-0 bottom-0 left-0 truncate bg-black/60 p-1 text-[10px] text-white">
                    {img.jewelryTitle}
                  </div>
                </div>
              ))}
              {!loading && images.length === 0 && (
                <div className="text-muted-foreground col-span-4 py-8 text-center">
                  Search for jewelry to see available images.
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
