import { useEffect, useRef, useState } from 'react'
import { asset } from '@/lib/asset'

type FullscreenDocument = Document & {
  webkitExitFullscreen?: () => Promise<void>
  msExitFullscreen?: () => Promise<void>
  webkitFullscreenElement?: Element | null
  msFullscreenElement?: Element | null
}

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void>
  msRequestFullscreen?: () => Promise<void>
}

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
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as FullscreenDocument

      const isNowFullscreen =
        !!doc.fullscreenElement || !!doc.webkitFullscreenElement || !!doc.msFullscreenElement

      if (!isNowFullscreen) {
        setTimeout(() => {
          const stillFullscreen =
            !!doc.fullscreenElement || !!doc.webkitFullscreenElement || !!doc.msFullscreenElement

          if (stillFullscreen) {
            const exitFullscreen =
              doc.exitFullscreen || doc.webkitExitFullscreen || doc.msExitFullscreen

            exitFullscreen?.call(doc)
          }
        }, 300)
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('msfullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('msfullscreenchange', handleFullscreenChange)
    }
  }, [])

  useEffect(() => {
    if (!isMobile) {
      const el = containerRef.current as FullscreenElement | null
      if (!el) return

      const requestFullscreen =
        el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen

      requestFullscreen?.call(el)
    }
  }, [isMobile])

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
        const doc = document as FullscreenDocument

        const exitFullscreen =
          doc.exitFullscreen || doc.webkitExitFullscreen || doc.msExitFullscreen

        exitFullscreen?.call(doc)
        onClose()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleClick = () => {
    const el = containerRef.current as FullscreenElement | null
    if (!el) return

    const doc = document as FullscreenDocument

    const fullscreenElement =
      doc.fullscreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement

    if (!fullscreenElement) {
      const requestFullscreen =
        el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen

      requestFullscreen?.call(el)
      return
    }

    handleClose()
  }

  const handleClose = () => {
    const doc = document as FullscreenDocument

    const exitFullscreen = doc.exitFullscreen || doc.webkitExitFullscreen || doc.msExitFullscreen

    exitFullscreen?.call(doc)

    // Sicherheitspuffer – falls fullscreen nicht zuverlässig verlassen wurde
    setTimeout(() => {
      const stillFullscreen =
        !!doc.fullscreenElement || !!doc.webkitFullscreenElement || !!doc.msFullscreenElement

      if (stillFullscreen) {
        exitFullscreen?.call(doc)
      }
    }, 200)

    onClose()
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-black"
      onClick={isMobile ? handleClick : handleClose}
      onTouchStart={isMobile ? handleClick : undefined}
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
