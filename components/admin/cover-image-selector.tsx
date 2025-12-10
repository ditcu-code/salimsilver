"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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

export function CoverImageSelector({ collectionId, collectionTitle, currentCoverId, currentCoverSrc }: CoverImageSelectorProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [images, setImages] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        if (isOpen && !mounted) {
            searchImages()
            setMounted(true)
        }
        if (!isOpen) {
            setMounted(false)
        }
    }, [isOpen])

    async function searchImages() {
        setLoading(true)
        
        let query = supabase
            .from('jewelry')
            .select('id, title, jewelry_images(id, src)')
            
        if (search) {
            query = query.ilike('title', `%${search}%`).limit(10)
        } else {
            // Default to latest 5 modified
            query = query.order('updated_at', { ascending: false }).limit(5)
        }

        const { data: jewelry } = await query
        
        const flatImages = jewelry?.flatMap((j: any) => j.jewelry_images.map((img: any) => ({
            ...img,
            jewelryTitle: j.title
        }))) || []
        
        setImages(flatImages)
        setLoading(false)
    }

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
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Cover Image</label>
            <div className="flex items-start gap-4">
                <div className="relative h-32 w-32 bg-muted rounded-md overflow-hidden border">
                    {currentCoverSrc ? (
                        <Image 
                            src={currentCoverSrc} 
                            alt={collectionTitle ? `Cover image for ${collectionTitle}` : "Collection cover image"} 
                            fill 
                            className="object-cover" 
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">No Image</div>
                    )}
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Change Cover Image</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
                        <DialogHeader>
                            <DialogTitle>Select Cover Image</DialogTitle>
                        </DialogHeader>
                        <div className="flex gap-2 mb-4">
                            <Input 
                                placeholder="Search jewelry..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && searchImages()}
                            />
                            <Button onClick={searchImages} disabled={loading}>
                                <Search className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-4 gap-4 overflow-y-auto p-1">
                            {images.map(img => (
                                <div 
                                    key={img.id} 
                                    className={cn(
                                        "cursor-pointer border rounded-md overflow-hidden aspect-square relative group",
                                        currentCoverId === img.id ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-primary/50"
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
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] p-1 truncate">
                                        {img.jewelryTitle}
                                    </div>
                                </div>
                            ))}
                            {!loading && images.length === 0 && (
                                <div className="col-span-4 text-center py-8 text-muted-foreground">
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
