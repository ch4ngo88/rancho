import { useEffect, useRef, useState } from 'react'
import { asset } from '@/lib/asset'
import { Play } from 'lucide-react'

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
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = copy[i]!
    copy[i] = copy[j]!
    copy[j] = temp
  }
  return copy
}

const isMobileDevice = (): boolean => {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent.toLowerCase()
  return /android|iphone|ipad|ipod|windows phone|mobile/i.test(ua)
}

const FullscreenSlideshow = ({ images, onClose }: FullscreenSlideshowProps) => {
  const [shuffledImages, setShuffledImages] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [mode, setMode] = useState<'idle' | 'fullscreen' | 'playing'>('idle')
  const containerRef = useRef<HTMLDivElement>(null)

  const isMobile = isMobileDevice()

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
      setMode('playing')
    }
  }, [isMobile])

  useEffect(() => {
    const shuffled = shuffleArray(images)
    setShuffledImages(shuffled)
    setIndex(0)
  }, [images])

  useEffect(() => {
    if (mode !== 'playing' || shuffledImages.length === 0) return

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % shuffledImages.length)
    }, 5000)
    return () => clearInterval(id)
  }, [mode, shuffledImages])

  useEffect(() => {
    if (isMobile) return

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
  }, [onClose, isMobile])

  useEffect(() => {
    if (mode !== 'idle') {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [mode])

  const handleClick = () => {
    if (isMobile) {
      if (mode === 'idle') {
        setMode('fullscreen')
        setTimeout(() => window.scrollTo(0, 1), 50)
      } else if (mode === 'fullscreen') {
        setMode('playing')
      } else if (mode === 'playing') {
        handleClose()
      }
    } else {
      handleClose()
    }
  }

  const handleClose = () => {
    const doc = document as FullscreenDocument
    const exitFullscreen = doc.exitFullscreen || doc.webkitExitFullscreen || doc.msExitFullscreen
    exitFullscreen?.call(doc)

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
      onClick={handleClick}
      onTouchStart={isMobile ? handleClick : undefined}
    >
      {isMobile && mode === 'fullscreen' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="rounded-full bg-white/20 p-4 backdrop-blur">
            <Play className="h-8 w-8 text-white" />
          </div>
        </div>
      )}

      <img
        src={asset(shuffledImages[index] ?? '')}
        alt=""
        className="max-h-full max-w-full object-contain transition-opacity duration-500"
      />
    </div>
  )
}

export default FullscreenSlideshow
