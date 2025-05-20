import { useState, useEffect } from 'react'
import { Grid2X2, Images, Play } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Switch } from '@/components/ui/switch'
import PhotoGalleryItem from './PhotoGalleryItem'
import FullscreenSlideshow from './FullscreenSlideshow'

interface ArchivePhotosProps {
  images: string[]
  imagesLoaded: boolean
}

const ArchivePhotos: React.FC<ArchivePhotosProps> = ({ images, imagesLoaded }) => {
  /* ------------------------------------------------------------------
   *  State
   * ------------------------------------------------------------------ */
  const [isGridView, setIsGridView] = useState(false)
  const [showSlideshow, setShowSlideshow] = useState(false)

  const { language } = useLanguage()

  /* ------------------------------------------------------------------
   *  URL-Parameter (?slideshow=true)  ➜ Diashow gleich öffnen
   * ------------------------------------------------------------------ */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('slideshow') === 'true') {
      setShowSlideshow(true)
    }
  }, [])

  /* ------------------------------------------------------------------
   *  Render
   * ------------------------------------------------------------------ */
  return (
    <div className="mx-auto mb-12 w-full max-w-5xl animate-fade-in">
      {/* ---------- Kopfzeile --------------------------------------- */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-portuguesered">
          {language === 'pt' ? 'Galeria de Fotos' : 'Fotogalerie'}
        </h2>

        {/* Ansicht-Switcher + Diashow-Button ------------------------ */}
        <div className="flex items-center gap-3 rounded-full bg-white/90 px-3 py-1.5 shadow-sm">
          <div className="flex items-center text-gray-700">
            <Images size={18} aria-hidden="true" />
            <span className="sr-only">Karussell-Ansicht</span>
          </div>

          <Switch
            id="view-switch"
            checked={isGridView}
            onCheckedChange={setIsGridView}
            aria-label={
              isGridView ? 'Zur Karussell-Ansicht wechseln' : 'Zur Rasteransicht wechseln'
            }
            className="focus-visible:ring-2 focus-visible:ring-seagreen data-[state=checked]:border-seagreen data-[state=checked]:bg-seagreen"
          />

          <div className="flex items-center text-gray-700">
            <Grid2X2 size={18} aria-hidden="true" />
            <span className="sr-only">Rasteransicht</span>
          </div>

          {/* Diashow-Start ---------------------------------------- */}
          <button
            title="Diashow starten"
            onClick={() => setShowSlideshow(true)}
            className="ml-2 rounded-full bg-seagreen p-2 text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-seagreen/80 hover:shadow-lg"
          >
            <Play size={20} />
            <span className="sr-only">Diashow starten</span>
          </button>
        </div>
      </div>

      {/* ---------- Galerie / Karussell --------------------------- */}
      <div className="rounded-xl bg-white/70 p-6 shadow-lg backdrop-blur-sm">
        {isGridView ? (
          /* --- Rasteransicht ------------------------------------ */
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {imagesLoaded &&
              images.map((img, idx) => <PhotoGalleryItem key={idx} image={img} index={idx} />)}
          </div>
        ) : (
          /* --- Karussell-Ansicht -------------------------------- */
          <Carousel className="w-full">
            {imagesLoaded ? (
              <CarouselContent>
                {images.map((img, idx) => (
                  <CarouselItem key={idx} className="p-1 md:basis-1/2 lg:basis-1/3">
                    <PhotoGalleryItem image={img} index={idx} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            ) : (
              /* Spinner, bis Bilder da sind ---------------------- */
              <div className="flex h-64 w-full items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-seagreen border-t-transparent" />
              </div>
            )}

            {/* Pfeile des Carousels -------------------------------- */}
            <CarouselPrevious className="left-2 bg-black/40 backdrop-blur-sm hover:bg-black/60 focus:ring-2 focus:ring-white/50" />
            <CarouselNext className="right-2 bg-black/40 backdrop-blur-sm hover:bg-black/60 focus:ring-2 focus:ring-white/50" />
          </Carousel>
        )}

        {/* ---------- Diashow-Overlay ----------------------------- */}
        {showSlideshow && (
          <FullscreenSlideshow images={images} onClose={() => setShowSlideshow(false)} />
        )}
      </div>
    </div>
  )
}

export default ArchivePhotos
