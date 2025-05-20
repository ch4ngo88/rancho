import React, { useEffect, useRef, useState, type ReactElement } from 'react'
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

  useEffect(() => {
    setShuffledImages(shuffleArray(images))
    setIndex(0)
  }, [images])

  // 🧠 Für Desktop/iPad: Auto-Vollbild via useEffect
  useEffect(() => {
    if (isPhone()) return

    const el = containerRef.current as FullscreenElement | null
    const request = el?.requestFullscreen ?? el?.webkitRequestFullscreen ?? el?.msRequestFullscreen
    request?.call(el).catch(() => undefined)
    setMode('playing')
  }, [])

  // 📤 Für alle: Handle FS-Wechsel (z.B. durch iOS "Fertig"-Button)
  useEffect(() => {
    const doc = document as FullscreenDocument
    const onFsChange = () => {
      const stillFullscreen =
        !!doc.fullscreenElement || !!doc.webkitFullscreenElement || !!doc.msFullscreenElement
      if (!stillFullscreen) {
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

  // 🔁 Diashow-Loop
  useEffect(() => {
    if (mode !== 'playing' || shuffledImages.length === 0) return
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % shuffledImages.length)
    }, 5000)
    return () => clearInterval(id)
  }, [mode, shuffledImages])

  useEffect(() => {
    if (mode === 'idle') return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [mode])

  // 👉 NEU: Klick auf Container = erste Interaktion auf Mobile
  const handleInitialClick = async () => {
    if (!isPhone()) return

    const el = containerRef.current as FullscreenElement | null
    const request = el?.requestFullscreen ?? el?.webkitRequestFullscreen ?? el?.msRequestFullscreen
    try {
      await request?.call(el)
      setMode('fullscreen')
    } catch {
      // Safari könnte blockieren – einfach ignorieren
    }
  }

  const handlePlayClick = () => {
    if (mode === 'fullscreen') {
      setMode('playing')
    } else if (mode === 'playing') {
      const doc = document as FullscreenDocument
      const exit = doc.exitFullscreen ?? doc.webkitExitFullscreen ?? doc.msExitFullscreen
      exit?.call(doc)
      setMode('idle')
      requestAnimationFrame(onClose)
    }
  }

  return (
    <div
      ref={containerRef}
      role="presentation"
      className="fixed inset-0 z-[9999] flex h-svh w-svw items-center justify-center bg-black"
      onClick={isPhone() ? handleInitialClick : handlePlayClick}
    >
      {/* Play Button nur im fullscreen-Modus, nicht playing */}
      {isPhone() && mode === 'fullscreen' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <button
            onClick={handlePlayClick}
            className="rounded-full bg-white/20 p-4 backdrop-blur-sm"
          >
            <Play className="h-8 w-8 text-white" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Das aktuelle Bild */}
      {mode === 'playing' && (
        <img
          src={asset(shuffledImages[index] ?? '')}
          alt=""
          className="max-h-full max-w-full select-none object-contain transition-opacity duration-500"
          draggable={false}
        />
      )}
    </div>
  )
}

export default FullscreenSlideshow
