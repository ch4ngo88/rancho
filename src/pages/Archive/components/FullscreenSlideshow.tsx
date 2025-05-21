import React, { useEffect, useRef, useState, type ReactElement } from 'react'
import { createPortal } from 'react-dom'
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

/* ------------------------------------------------------------------ */
/* Props                                                              */
/* ------------------------------------------------------------------ */
interface FullscreenSlideshowProps {
  images: string[]
  onClose: () => void
}

/* ------------------------------------------------------------------ */
/* Helper                                                             */
/* ------------------------------------------------------------------ */
const shuffleArray = (array: string[]): string[] => {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j]!, copy[i]!]
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

  /* -------------------------------------------------------------- */
  /* Bilder vorbereiten                                              */
  /* -------------------------------------------------------------- */
  useEffect(() => {
    setShuffledImages(shuffleArray(images))
    setIndex(0)
  }, [images])

  /* -------------------------------------------------------------- */
  /* Desktop/iPad: direkt echtes Fullscreen + Auto-Play              */
  /* -------------------------------------------------------------- */
  useEffect(() => {
    if (isPhone()) return
    const el = containerRef.current as FullscreenElement | null
    const request = el?.requestFullscreen ?? el?.webkitRequestFullscreen ?? el?.msRequestFullscreen
    request?.call(el).catch(() => undefined)
    setMode('playing')
  }, [])

  /* -------------------------------------------------------------- */
  /* Fullscreen-Änderungen (z. B. „Fertig“-Button)                   */
  /* -------------------------------------------------------------- */
  useEffect(() => {
    const doc = document as FullscreenDocument
    const onFsChange = () => {
      const stillFs =
        !!doc.fullscreenElement || !!doc.webkitFullscreenElement || !!doc.msFullscreenElement
      if (!stillFs) {
        setMode('idle')
        requestAnimationFrame(onClose)
      }
    }
    document.addEventListener('fullscreenchange', onFsChange)
    document.addEventListener('webkitfullscreenchange', onFsChange)
    document.addEventListener('msfullscreenchange', onFsChange)
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange)
      document.removeEventListener('webkitfullscreenchange', onFsChange)
      document.removeEventListener('msfullscreenchange', onFsChange)
    }
  }, [onClose])

  /* -------------------------------------------------------------- */
  /* Diashow-Loop                                                    */
  /* -------------------------------------------------------------- */
  useEffect(() => {
    if (mode !== 'playing' || shuffledImages.length === 0) return
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % shuffledImages.length)
    }, 5000)
    return () => clearInterval(id)
  }, [mode, shuffledImages])

  /* -------------------------------------------------------------- */
  /* Body-Overflow während Fullscreen                                */
  /* -------------------------------------------------------------- */
  useEffect(() => {
    if (mode === 'idle') return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [mode])

  /* -------------------------------------------------------------- */
  /* Mobile-Workflow:                                                */
  /* 1. Tap   -> echtes Fullscreen-API (mode = fullscreen)           */
  /* 2. Button-> Start Slideshow     (mode = playing)                */
  /* 3. Tap   -> Exit & Close                                       */
  /* -------------------------------------------------------------- */
  const enterFullscreenMobile = async () => {
    const el = containerRef.current as FullscreenElement | null
    const request = el?.requestFullscreen ?? el?.webkitRequestFullscreen ?? el?.msRequestFullscreen
    try {
      await request?.call(el)

      // Sicherstellen, dass der Play-Button nach dem Vollbild auch erscheint
      requestAnimationFrame(() => {
        setMode('fullscreen')
      })
    } catch {
      // Safari könnte blocken – ignorieren
    }
  }

  const handleContainerClick = () => {
    if (!isPhone()) {
      // Desktop/iPad -> Klick beendet
      handleClose()
      return
    }

    if (mode === 'idle') {
      void enterFullscreenMobile()
    } else if (mode === 'playing') {
      handleClose()
    }
    // Wenn mode === 'fullscreen' -> tue nichts, Button übernimmt
  }

  const handlePlayButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation() // verhindert Bubble zum Container
    if (mode === 'fullscreen') {
      setMode('playing')
    }
  }

  const handleClose = () => {
    const doc = document as FullscreenDocument
    const exitFs = doc.exitFullscreen ?? doc.webkitExitFullscreen ?? doc.msExitFullscreen
    exitFs?.call(doc)
    setMode('idle')
    requestAnimationFrame(onClose)
  }

  /* -------------------------------------------------------------- */
  /* Render                                                         */
  /* -------------------------------------------------------------- */
  return createPortal(
    <div
      ref={containerRef}
      role="presentation"
      className="fixed inset-0 z-[9999] flex h-svh w-svw items-center justify-center bg-black"
      onClick={handleContainerClick}
      onTouchStart={isPhone() ? handleContainerClick : undefined}
    >
      {/* Play-Button (nur im fullscreen-Modus auf Phone) */}
      {isPhone() && mode === 'fullscreen' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <button
            onClick={handlePlayButtonClick}
            className="rounded-full bg-white/20 p-4 backdrop-blur-sm"
          >
            <Play className="h-8 w-8 text-white" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Aktuelles Bild – nur während playing */}
      {mode === 'playing' && (
        <img
          src={asset(shuffledImages[index] ?? '')}
          alt=""
          className="max-h-full max-w-full select-none object-contain transition-opacity duration-500"
          draggable={false}
        />
      )}
    </div>,
    document.body,
  )
}

export default FullscreenSlideshow
