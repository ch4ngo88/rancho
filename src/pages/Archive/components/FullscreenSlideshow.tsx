import React, { useCallback, useEffect, useRef, useState, type ReactElement } from 'react'
import { Play } from 'lucide-react'
import { asset } from '@/lib/asset'

/* ------------------------------------------------------------------ */
/* Typen für vendor-spezifische Full-Screen-APIs                      */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* Hilfsfunktionen                                                    */
/* ------------------------------------------------------------------ */

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

const isPhone = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches &&
  navigator.maxTouchPoints > 1

/* ------------------------------------------------------------------ */
/* Komponente                                                         */
/* ------------------------------------------------------------------ */

const FullscreenSlideshow: React.FC<FullscreenSlideshowProps> = ({
  images,
  onClose,
}): ReactElement => {
  const [shuffledImages, setShuffledImages] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [mode, setMode] = useState<'idle' | 'fullscreen' | 'playing'>('idle')
  const containerRef = useRef<HTMLDivElement>(null)

  /* -------------------- Callbacks / Handler ------------------ */

  const exitNativeFullscreen = (): void => {
    const doc = document as FullscreenDocument
    const exit = doc.exitFullscreen ?? doc.webkitExitFullscreen ?? doc.msExitFullscreen
    exit?.call(doc).catch(() => undefined)
  }

  const handleClose = useCallback((): void => {
    exitNativeFullscreen()
    setMode('idle')
    requestAnimationFrame(onClose)
  }, [onClose])

  const nextStep = useCallback((): void => {
    if (!isPhone()) return handleClose()

    setMode((prev) => {
      switch (prev) {
        case 'idle':
          requestAnimationFrame(() => window.scrollTo(0, 1))
          return 'fullscreen'
        case 'fullscreen':
          return 'playing'
        case 'playing':
          handleClose()
          return prev
        default:
          return prev
      }
    })
  }, [handleClose])

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    e.preventDefault()
    nextStep()
  }

  /* --------------------- Seiteneffekte ----------------------- */

  useEffect(() => {
    setShuffledImages(shuffleArray(images))
    setIndex(0)
  }, [images])

  useEffect(() => {
    if (isPhone()) return

    const el = containerRef.current as FullscreenElement | null
    if (!el) return

    const request = el.requestFullscreen ?? el.webkitRequestFullscreen ?? el.msRequestFullscreen
    request?.call(el).catch(() => undefined)
    setMode('playing')
  }, [])

  useEffect(() => {
    const doc = document as FullscreenDocument

    const handleChange = (): void => {
      const stillFs =
        Boolean(doc.fullscreenElement) ||
        Boolean(doc.webkitFullscreenElement) ||
        Boolean(doc.msFullscreenElement)

      if (!stillFs) handleClose()
    }

    document.addEventListener('fullscreenchange', handleChange)
    document.addEventListener('webkitfullscreenchange', handleChange)
    document.addEventListener('msfullscreenchange', handleChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleChange)
      document.removeEventListener('webkitfullscreenchange', handleChange)
      document.removeEventListener('msfullscreenchange', handleChange)
    }
  }, [handleClose])

  useEffect(() => {
    if (mode !== 'playing' || shuffledImages.length === 0) return undefined

    const id = window.setInterval(
      () => setIndex((prev) => (prev + 1) % shuffledImages.length),
      5000,
    )
    return () => window.clearInterval(id)
  }, [mode, shuffledImages])

  useEffect(() => {
    if (mode === 'idle') return undefined

    const { body } = document
    const original = body.style.overflow
    body.style.overflow = 'hidden'

    return () => {
      body.style.overflow = original
    }
  }, [mode])

  /* --------------------------- Render ------------------------ */

  return (
    <div
      ref={containerRef}
      role="presentation"
      className="fixed inset-0 z-[9999] flex h-svh w-svw items-center justify-center bg-black"
      onClick={!isPhone() ? nextStep : undefined}
      onTouchStart={isPhone() ? handleTouchStart : undefined}
    >
      {isPhone() && mode === 'fullscreen' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
            <Play className="h-8 w-8 text-white" aria-hidden="true" />
          </div>
        </div>
      )}

      <img
        src={asset(shuffledImages[index] ?? '')}
        alt=""
        className="max-h-full max-w-full select-none object-contain transition-opacity duration-500"
        draggable={false}
      />
    </div>
  )
}

export default FullscreenSlideshow
