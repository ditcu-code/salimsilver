"use client"

import { useEffect, useState, useRef } from "react"

const soundFiles = [
  "/sounds/metal-plate-hit-1.mp3",
  "/sounds/metal-plate-hit-4.mp3",
  "/sounds/metal-plate-hit-5.mp3",
  "/sounds/metal-plate-hit-6.mp3",
]

// Helper function to detect mobile devices
function isMobileDevice() {
  if (typeof window === 'undefined') return false
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || (window.innerWidth <= 768)
}

// Singleton for audio elements to prevent multiple instances
let globalAudioElements: HTMLAudioElement[] = []
let globalAudioContainer: HTMLDivElement | null = null
let setupComplete = false

function getRandomAudioElement(
  audioElements: HTMLAudioElement[] | null,
): HTMLAudioElement | null {
  if (!audioElements?.length) return null

  const randomIndex = Math.floor(Math.random() * audioElements.length)
  return audioElements[randomIndex]
}

// Create a singleton set of audio elements that can be reused across the app
function getOrCreateAudioElements(): HTMLAudioElement[] | null {
  // Early return if we're in a mobile environment
  if (typeof window !== 'undefined' && isMobileDevice()) {
    return null
  }

  // Return existing instance if already created
  if (globalAudioElements.length) {
    return globalAudioElements
  }

  try {
    // First time setup - create container and audio elements
    if (!globalAudioContainer) {
      globalAudioContainer = document.createElement('div')
      globalAudioContainer.style.display = 'none'
      document.body.appendChild(globalAudioContainer)
    }

    if (!globalAudioContainer) return null
    const container = globalAudioContainer

    globalAudioElements = soundFiles.map((source) => {
      const audioElement = document.createElement('audio')
      audioElement.src = source
      audioElement.preload = "auto"
      audioElement.style.display = "none"
      audioElement.setAttribute('playsinline', 'true')
      audioElement.setAttribute('webkit-playsinline', 'true')
      audioElement.volume = 0.4

      container.appendChild(audioElement)
      return audioElement
    })

    setupComplete = true
    
    return globalAudioElements
  } catch (error) {
    console.warn("Error creating audio singleton:", error)
    return null
  }
}

// SoundEffects component that adds click listeners to the document
export default function SoundEffects() {
  // Track if sound is enabled
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const audioRef = useRef<HTMLAudioElement[] | null>(null)

  useEffect(() => {
    // Check if device is mobile on mount
    const mobile = isMobileDevice()
    setIsMobile(mobile)
    
    if (!mobile && !audioRef.current) {
      // Use the singleton audio elements
      audioRef.current = getOrCreateAudioElements()
    }

    // Also listen for resize events in case of orientation changes
    const handleResize = () => {
      setIsMobile(isMobileDevice())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Skip setting up listeners if on mobile
    if (isMobile) return

    // Click handler for links
    const handleLinkClick = (e: MouseEvent) => {
      if (!soundEnabled || !audioRef.current) return

      const target = e.target as HTMLElement
      const link = target.closest("a")

      // Only play sound for links
      if (link && !link.classList.contains("no-sound")) {
        const audio = getRandomAudioElement(audioRef.current)
        if (!audio) return

        try {
          // Reset and play
          audio.currentTime = 0
          audio.play().catch((err) => {
            console.warn("Could not play sound, disabling sound effects:", err)
            setSoundEnabled(false)
          })
        } catch (error) {
          console.warn("Error with audio, disabling sound effects:", error)
          setSoundEnabled(false)
        }
      }
    }

    // Add event listener
    document.addEventListener("click", handleLinkClick)

    // Cleanup
    return () => {
      document.removeEventListener("click", handleLinkClick)
    }
  }, [soundEnabled, isMobile])

  // Don't render anything - we're using the singleton audio elements
  // that were created in the useEffect
  return null
}

// Cleanup function to be called on app unmount (rarely needed)
export function cleanupAudioSingleton() {
  if (globalAudioContainer && globalAudioContainer.parentNode) {
    try {
      globalAudioContainer.parentNode.removeChild(globalAudioContainer)
      globalAudioElements = []
      globalAudioContainer = null
      setupComplete = false
    } catch (e) {
      console.warn("Error cleaning up audio:", e)
    }
  }
}

// Export the hook for direct use in components
export function useShutterSound() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    // Check if device is mobile on mount
    const mobile = isMobileDevice()
    setIsMobile(mobile)
    
    // Initialize the audio elements if not mobile and not already setup
    if (!mobile && !setupComplete) {
      getOrCreateAudioElements()
    }
  }, [])

  // Simple function to play sound with error handling
  const playShutterSound = () => {
    // Don't play sounds on mobile
    if (isMobile) return
    
    // Get one of the singleton audio elements
    const audioElements = globalAudioElements.length
      ? globalAudioElements
      : getOrCreateAudioElements()
    const audio = getRandomAudioElement(audioElements)
    if (!audio) return

    try {
      audio.currentTime = 0
      audio.play().catch((err) => {
        console.warn("Could not play sound:", err)
      })
    } catch (error) {
      console.warn("Error playing audio:", error)
    }
  }

  return { playShutterSound }
}
