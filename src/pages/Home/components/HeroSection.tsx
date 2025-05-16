import { useRef, useEffect } from 'react'
import { asset } from '@/lib/asset'

import { ArrowRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import OptimizedImage from '@/components/OptimizedImage'
import PreloadLink from '@/components/PreloadLink'

interface HeroSectionProps {
  language: string
}

const HeroSection = ({ language }: HeroSectionProps) => {
  const heroRef = useRef<HTMLDivElement>(null)

  // Fixierter Bildpfad via asset()
  const heroImageSrc = asset('images/home/gruppe.webp')

  /* ---------- Intersection & Parallax ---------- */
  useEffect(() => {
    const heroElement = heroRef.current
    if (!heroElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-screen')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    heroElement.querySelectorAll('.animate-on-load').forEach((el) => observer.observe(el))

    const handleScroll = () => {
      const y = window.pageYOffset
      heroElement.style.transform = `translateY(${y * 0.2}px)`
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={heroRef}
      className="relative flex h-[70vh] w-full items-center justify-center overflow-hidden sm:h-[80vh]"
    >
      {/* Overlay */}
      <div className="hero-overlay absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-seagreen/40 to-portuguesered/40 opacity-90 mix-blend-multiply" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-8 px-4 md:flex-row">
        {/* ---------- Gruppenfoto ---------- */}
        <div className="animate-on-load flex w-full justify-center md:w-2/5 md:justify-end">
          <div className="hero-stagger-1 relative">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="relative cursor-pointer"
                  aria-label={
                    language === 'pt' ? 'Ampliar imagem do grupo' : 'Gruppenbild vergrößern'
                  }
                >
                  {/* Zier‑Rahmen */}
                  <div className="absolute -left-3 -top-3 h-full w-full rounded-lg border-2 border-white/30" />
                  <OptimizedImage
                    src={heroImageSrc}
                    alt={language === 'pt' ? 'Foto do grupo' : 'Gruppenfoto'}
                    className="h-48 w-64 rounded-lg border border-white/40 object-cover shadow-xl transition-all duration-300 hover:shadow-lg hover:brightness-110"
                    loading="eager"
                    preload
                  />
                  <div className="absolute -bottom-3 -right-3 h-full w-full rounded-lg border-2 border-white/30" />
                </button>
              </DialogTrigger>

              {/* ---------- Modal ---------- */}
              <DialogContent className="max-w-4xl border-none p-0">
                <DialogTitle asChild>
                  <h3 className="sr-only">{language === 'pt' ? 'Foto do grupo' : 'Gruppenfoto'}</h3>
                </DialogTitle>
                <DialogDescription asChild>
                  <p className="sr-only">
                    {language === 'pt' ? 'Imagem ampliada do grupo' : 'Vergrößertes Gruppenbild'}
                  </p>
                </DialogDescription>

                <OptimizedImage
                  src={heroImageSrc}
                  alt={language === 'pt' ? 'Foto do grupo' : 'Gruppenfoto'}
                  className="h-full w-full rounded-lg object-contain"
                  loading="lazy"
                  preload={false}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* ---------- Headline & CTA ---------- */}
        <div className="space-y-4 text-center text-white md:w-3/5 md:text-left">
          <h2 className="hero-stagger-1 font-lusitana text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {language === 'pt' ? 'Tradições Portuguesas' : 'Tradições Portuguesas'}
          </h2>
          <p className="hero-stagger-2 max-w-xl font-lusitana text-lg italic opacity-90 md:text-2xl">
            {language === 'pt' ? (
              <>
                Preservando a cultura portuguesa em Hamburgo
                <br />
                desde 1979
              </>
            ) : (
              <>
                Bewahrung der portugiesischen Kultur in Hamburg
                <br />
                seit 1979
              </>
            )}
          </p>

          <div className="hero-stagger-3 pt-4">
            <PreloadLink
              to="/activities"
              className="group inline-flex items-center gap-2 rounded-lg bg-seagreen px-6 py-3 font-lusitana text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              preloadResources={[
                {
                  href: asset('images/activity/ensaios/ensaioadultos.webp'),
                  as: 'image',
                },
                {
                  href: asset('images/activity/ensaios/ensaiocriancas.webp'),
                  as: 'image',
                },
              ]}
              onlyPrefetchOnHover
            >
              {language === 'pt' ? 'Descobrir Mais' : 'Mehr Entdecken'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </PreloadLink>
          </div>
        </div>
      </div>

      {/* Weißer Fade unten */}
      <div className="absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-[#f9f9f9] to-transparent" />
    </div>
  )
}

export default HeroSection
