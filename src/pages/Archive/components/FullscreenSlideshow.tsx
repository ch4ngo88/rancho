import { useEffect, useRef, useState } from 'react'
import { asset } from '@/lib/asset'

interface FullscreenSlideshowProps {
  images: string[]
  onClose: () => void
}

const shuffleArray = (array: string[]): string[] => {
  const copy: string[] = Array.from(array) // garantiert korrekt typisiert

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp: string = copy[i]!
    copy[i] = copy[j]!
    copy[j] = temp
  }

  return copy
}

const FullscreenSlideshow = ({ images, onClose }: FullscreenSlideshowProps) => {
  const [shuffledImages, setShuffledImages] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Shuffle einmalig beim Mount
    const shuffled = shuffleArray(images)
    setShuffledImages(shuffled)
    setIndex(0)

    // Fullscreen starten – inkl. Fallbacks
    const container = containerRef.current
    if (container) {
      const requestFS =
        container.requestFullscreen ??
        (
          container as HTMLElement & {
            webkitRequestFullscreen?: () => Promise<void>
            msRequestFullscreen?: () => Promise<void>
          }
        ).webkitRequestFullscreen ??
        (
          container as HTMLElement & {
            msRequestFullscreen?: () => Promise<void>
          }
        ).msRequestFullscreen

      requestFS?.call(container)
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % shuffled.length)
    }, 5000)

    window.addEventListener('keydown', handleKey)

    return () => {
      clearInterval(interval)
      window.removeEventListener('keydown', handleKey)

      const exitFS =
        document.exitFullscreen ??
        (
          document as Document & {
            webkitExitFullscreen?: () => Promise<void>
            msExitFullscreen?: () => Promise<void>
          }
        ).webkitExitFullscreen ??
        (
          document as Document & {
            msExitFullscreen?: () => Promise<void>
          }
        ).msExitFullscreen

      if (
        document.fullscreenElement ||
        (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement
      ) {
        exitFS?.call(document)
      }
    }
  }, [images, onClose])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      onClick={onClose}
      onTouchStart={onClose}
    >
      <img
        src={asset(shuffledImages[index] ?? '')}
        alt=""
        className="max-h-full max-w-full object-contain transition-opacity duration-500"
      />
    </div>
  )
}

export default FullscreenSlideshow
