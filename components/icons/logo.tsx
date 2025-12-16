import { Camera } from "lucide-react"

export default function Logo({ size = 24 }: { size?: number }) {
  return (
    <div className="bg-primary/10 dark:bg-primary/20 relative flex h-10 w-10 items-center justify-center rounded-full">
      <Camera size={size} className="text-primary" />
    </div>
  )
}
