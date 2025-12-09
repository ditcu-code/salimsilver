"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { createPost, deletePost, updatePost } from "@/lib/actions/blog"
import { createClient } from "@/lib/supabase/client"
import { Post } from "@/lib/types"
import { cn } from "@/lib/utils"
import ImageExtension from "@tiptap/extension-image"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Bold, Image as ImageIcon, Italic, List, ListOrdered, Loader2, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface PostFormProps {
  post?: Post
  isEditing?: boolean
}

export function PostForm({ post, isEditing = false }: PostFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  // Form State
  const [title, setTitle] = useState(post?.title || "")
  const [slug, setSlug] = useState(post?.slug || "")
  const [excerpt, setExcerpt] = useState(post?.excerpt || "")
  const [coverImage, setCoverImage] = useState(post?.cover_image_url || "")
  const [metaTitle, setMetaTitle] = useState(post?.meta_title || "")
  const [metaDescription, setMetaDescription] = useState(post?.meta_description || "")
  const [published, setPublished] = useState(post?.published || false)
  const [featured, setFeatured] = useState(post?.featured || false)
  const [tagsInput, setTagsInput] = useState(post?.tags?.join(", ") || "")

  // Auto-generate slug from title if creating
  useEffect(() => {
    if (!isEditing && title) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""))
    }
  }, [title, isEditing])

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: post?.content || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4 border rounded-md",
      },
    },
  })

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const supabase = createClient()
    
    try {
      const fileName = `blog/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "")}`
      const { data, error } = await supabase.storage
        .from("blog") 
        .upload(fileName, file)

      if (error) {
         throw error
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from("blog")
        .getPublicUrl(fileName)
        
      setCoverImage(publicUrl)
      toast.success("Image uploaded")
    } catch (error: any) {
      console.error(error)
      toast.error("Upload failed. Ensure 'images' bucket exists or use accessible bucket.")
    } finally {
      setIsUploading(false)
    }
  }

  async function handleContentImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !editor) return

    setIsUploading(true)
    const supabase = createClient()
    
    try {
      const fileName = `blog/content/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "")}`
      const { data, error } = await supabase.storage
        .from("blog") 
        .upload(fileName, file)

      if (error) {
         throw error
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from("blog")
        .getPublicUrl(fileName)
        
      editor.chain().focus().setImage({ src: publicUrl }).run()
      toast.success("Image inserted")
    } catch (error: any) {
      console.error(error)
      toast.error("Image upload failed")
    } finally {
      setIsUploading(false)
      // Reset input
      e.target.value = ""
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!editor) return

    setIsSubmitting(true)
    
    // Process tags
    const tagsArray = tagsInput.split(",").map(t => t.trim()).filter(Boolean)
    
    const formData = new FormData()
    formData.append("title", title)
    formData.append("slug", slug)
    formData.append("excerpt", excerpt)
    formData.append("content", editor.getHTML())
    formData.append("cover_image_url", coverImage)
    formData.append("meta_title", metaTitle)
    formData.append("meta_description", metaDescription)
    formData.append("published", String(published))
    formData.append("featured", String(featured))
    formData.append("tags", JSON.stringify(tagsArray))

    try {
      if (isEditing && post) {
        await updatePost(post.id, formData)
        toast.success("Post updated")
      } else {
        await createPost(formData)
        toast.success("Post created")
      }
      router.push("/admin/blog")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!post || !confirm("Are you sure you want to delete this post?")) return
    setIsSubmitting(true)
    try {
      await deletePost(post.id)
      toast.success("Post deleted")
      router.push("/admin/blog")
    } catch (error) {
      toast.error("Failed to delete")
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{isEditing ? "Edit Post" : "New Post"}</h1>
        <div className="flex items-center gap-4">
           {isEditing && (
             <Button type="button" variant="destructive" size="icon" onClick={handleDelete} disabled={isSubmitting}>
               <Trash2 className="h-4 w-4" />
             </Button>
           )}
           <div className="flex items-center gap-2 border px-4 py-2 rounded-md bg-card">
              <Switch checked={published} onCheckedChange={setPublished} id="published" />
              <Label htmlFor="published" className="cursor-pointer">
                {published ? "Published" : "Draft"}
              </Label>
           </div>
           <Button type="submit" disabled={isSubmitting}>
             {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
             {isEditing ? "Save Changes" : "Create Post"}
           </Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Enter post title" />
          </div>
          
          <div className="space-y-2">
             <Label>Content</Label>
             <div className="border rounded-md">
                <div className="flex items-center gap-1 p-2 border-b bg-muted/50">
                   <Button 
                     type="button" variant="ghost" size="sm" 
                     onClick={() => editor?.chain().focus().toggleBold().run()}
                     className={cn(editor?.isActive('bold') && 'bg-slate-200')}
                   >
                     <Bold className="h-4 w-4" />
                   </Button>
                   <Button 
                     type="button" variant="ghost" size="sm" 
                     onClick={() => editor?.chain().focus().toggleItalic().run()}
                     className={cn(editor?.isActive('italic') && 'bg-slate-200')}
                   >
                     <Italic className="h-4 w-4" />
                   </Button>
                   <Button 
                     type="button" variant="ghost" size="sm" 
                     onClick={() => editor?.chain().focus().toggleBulletList().run()}
                     className={cn(editor?.isActive('bulletList') && 'bg-slate-200')}
                   >
                     <List className="h-4 w-4" />
                   </Button>
                   <Button 
                     type="button" variant="ghost" size="sm" 
                     onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                     className={cn(editor?.isActive('orderedList') && 'bg-slate-200')}
                   >
                     <ListOrdered className="h-4 w-4" />
                   </Button>
                  <Button 
                     type="button" variant="ghost" size="sm" 
                     onClick={() => document.getElementById('content-image-upload')?.click()}
                     className={cn(editor?.isActive('image') && 'bg-slate-200')}
                     disabled={isUploading}
                   >
                     <ImageIcon className="h-4 w-4" />
                   </Button>
                   <Input
                     id="content-image-upload"
                     type="file"
                     className="hidden"
                     accept="image/*"
                     onChange={handleContentImageUpload}
                     disabled={isUploading}
                   />
                </div>
                <EditorContent editor={editor} />
             </div>
          </div>

          <div className="space-y-2">
            <Label>SEO Meta Title</Label>
            <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="Optimal title for search engines" />
            <p className="text-xs text-muted-foreground">Defaults to post title if empty.</p>
          </div>
        </div>

        <div className="space-y-6">
           <div className="p-4 border rounded-md bg-muted/10 space-y-4">
              <h3 className="font-semibold text-sm">Settings</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="featured" className="cursor-pointer">Featured Post</Label>
                <Switch checked={featured} onCheckedChange={setFeatured} id="featured" />
              </div>
           </div>

          <div className="space-y-2">
            <Label>Slug</Label>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} required />
            <p className="text-xs text-muted-foreground">URL friendly name.</p>
          </div>
          
          <div className="space-y-2">
             <Label>Tags</Label>
             <Input 
                value={tagsInput} 
                onChange={(e) => setTagsInput(e.target.value)} 
                placeholder="Silver, Craftsmanship, History" 
             />
             <p className="text-xs text-muted-foreground">Comma separated tags.</p>
          </div>

          <div className="space-y-2">
             <Label>Cover Image</Label>
             <div className="border rounded-md p-4 bg-muted/20 text-center">
                {coverImage ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-md mb-4 bg-muted">
                    <Image src={coverImage} alt="Cover" fill className="object-cover" />
                    <Button 
                      type="button" variant="destructive" size="icon" 
                      className="absolute top-2 right-2"
                      onClick={() => setCoverImage("")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="py-8 flex flex-col items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-10 w-10 mb-2 opacity-50" />
                    <span className="text-sm">No cover image</span>
                  </div>
                )}
                <div className="relative">
                   <Button type="button" variant="outline" disabled={isUploading} className="w-full">
                     {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                     Upload Image
                   </Button>
                   <Input 
                     type="file" 
                     className="absolute inset-0 opacity-0 cursor-pointer" 
                     onChange={handleImageUpload}
                     accept="image/*"
                     disabled={isUploading}
                   />
                </div>
             </div>
          </div>

          <div className="space-y-2">
             <Label>Excerpt</Label>
             <Textarea 
               value={excerpt} 
               onChange={(e) => setExcerpt(e.target.value)} 
               placeholder="Short summary for previews..." 
               rows={4}
             />
          </div>

          <div className="space-y-2">
            <Label>SEO Meta Description</Label>
            <Textarea 
              value={metaDescription} 
              onChange={(e) => setMetaDescription(e.target.value)} 
              placeholder="Description for search results..." 
              rows={3}
            />
          </div>
        </div>
      </div>
    </form>
  )
}
