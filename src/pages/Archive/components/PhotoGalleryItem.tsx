import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { asset } from '@/lib/asset'

interface PhotoGalleryItemProps {
  image: string
  index: number
}

/**
 * Liefert ein menschenlesbares alt-Attribut aus dem Dateinamen.
 * - Fügt hier nach Bedarf einfach neue Zuordnungen ein.
 */
const getDescriptiveAlt = (imagePath: string) => {
  const fileName = imagePath.split('/').pop()?.split('.')[0]
  if (!fileName) return 'Archivbild von Rancho Folclórico Tradições Portuguesas'

  const imageDescriptions: Record<string, string> = {
    '1': 'Historische Aufnahme der Tanzgruppe bei einer traditionellen Aufführung',
    '2': 'Gruppenfoto der Mitglieder in traditionellen Trachten',
    // …
  }

  return (
    imageDescriptions[fileName] ??
    'Historisches Archivbild der portugiesischen Tanzgruppe in Hamburg'
  )
}

const PhotoGalleryItem = ({ image, index }: PhotoGalleryItemProps) => {
  const fullSrc = asset(image) // erzeugt korrekten Pfad für Vite + GitHub Pages
  const altText = getDescriptiveAlt(image)

  return (
    <Dialog>
      {/* ---------- Thumbnail (Trigger) ---------- */}
      <DialogTrigger asChild>
        <div className="photo-grid-item aspect-square h-full cursor-pointer">
          <img
            src={fullSrc}
            alt={altText}
            className="gallery-photo h-full w-full rounded-md object-cover"
            loading="lazy"
            width={300}
            height={300}
          />
        </div>
      </DialogTrigger>

      {/* ---------- Modal ---------- */}
      <DialogContent className="max-w-3xl overflow-hidden p-0">
        {/* Für Screen‑Reader nötig, visuell ausgeblendet via sr-only */}
        <DialogTitle asChild>
          <h3 className="sr-only">
            {typeof index === 'number' && !isNaN(index) ? `Archivfoto ${index + 1}` : 'Archivfoto'}
          </h3>
        </DialogTitle>
        <DialogDescription asChild>
          <p className="sr-only">{altText || 'Archivbild der portugiesischen Tanzgruppe'}</p>
        </DialogDescription>

        {/* Volles Bild */}
        <img src={fullSrc} alt={altText} className="h-auto max-h-[80vh] w-full object-contain" />
      </DialogContent>
    </Dialog>
  )
}

export default PhotoGalleryItem
