import { useEffect } from "react"

const useProtectImages = () => {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault() // Prevents the default context menu
      }
    }

    const handleDragStart = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault() // Prevents dragging images
      }
    }

    // Add the event listeners to the document
    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("dragstart", handleDragStart)

    // Clean up the event listeners on component unmount
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("dragstart", handleDragStart)
    }
  }, [])
}

export default useProtectImages
