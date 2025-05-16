import { useEffect, useRef, useState } from 'react'
import { asset } from '@/lib/asset'

interface FullscreenSlideshowProps {
  images: string[]
  onClose: () => void
}

const shuffleArray = (array: string[]): string[] => {
  const copy: string[] = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = copy[i]!
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
    const shuffled = shuffleArray(images)
    setShuffledImages(shuffled)
    setIndex(0)
  }, [images])

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % shuffledImages.length)
    }, 5000)
    return () => clearInterval(id)
  }, [shuffledImages])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const exitFullscreen =
          document.exitFullscreen ||
          (
            document as Document & {
              webkitExitFullscreen?: () => Promise<void>
              msExitFullscreen?: () => Promise<void>
            }
          ).webkitExitFullscreen ||
          (
            document as Document & {
              msExitFullscreen?: () => Promise<void>
            }
          ).msExitFullscreen

        exitFullscreen?.call(document)
        onClose()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleClick = () => {
    const el = containerRef.current
    if (!el) return

    const requestFullscreen =
      el.requestFullscreen ||
      (
        el as HTMLElement & {
          webkitRequestFullscreen?: () => Promise<void>
          msRequestFullscreen?: () => Promise<void>
        }
      ).webkitRequestFullscreen ||
      (
        el as HTMLElement & {
          msRequestFullscreen?: () => Promise<void>
        }
      ).msRequestFullscreen

    requestFullscreen?.call(el)
  }

  const handleClose = () => {
    const exitFullscreen =
      document.exitFullscreen ||
      (
        document as Document & {
          webkitExitFullscreen?: () => Promise<void>
          msExitFullscreen?: () => Promise<void>
        }
      ).webkitExitFullscreen ||
      (
        document as Document & {
          msExitFullscreen?: () => Promise<void>
        }
      ).msExitFullscreen

    exitFullscreen?.call(document)
    onClose()
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-black"
      onClick={handleClose}
      onTouchStart={handleClose}
      onLoadCapture={handleClick} // nur beim Mount direkt fullscreen – optional!
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
