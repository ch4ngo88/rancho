import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { asset } from '@/lib/asset'

export type NewsItemType = {
  type: 'image' | 'video'
  thumbnail?: string
  source: string
  title: string
}

interface NewsItemProps {
  item: NewsItemType
  index: number
}

const NewsItem = ({ item }: NewsItemProps) => {
  /* ---------- Pfade angleichen ---------- */
  const src = asset(item.source)
  const thumbnailSrc = asset(item.thumbnail || item.source)

  /* ---------- Alt- & Aria-Texte ---------- */
  const altThumb = item.type === 'video' ? `Video-Vorschau: ${item.title}` : `Bild: ${item.title}`

  const altFull = item.type === 'video' ? `Video: ${item.title}` : item.title

  return (
    <Dialog>
      {/* ---------- Thumbnail / Trigger ---------- */}
      <DialogTrigger asChild>
        <div className="card-hover relative h-24 cursor-pointer overflow-hidden rounded-lg bg-white/90 shadow-md">
          <div className="relative aspect-auto h-full">
            <img
              src={thumbnailSrc}
              alt={altThumb}
              className="h-full w-full object-cover"
              loading="lazy"
            />

            {/* Play‑Icon-Overlay für Videos */}
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-black/50 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogTrigger>

      {/* ---------- Modal ---------- */}
      <DialogContent className="overflow-hidden p-0 sm:max-w-lg">
        <DialogTitle asChild>
          <h3 className="sr-only">{item.title || 'Medieninhalt'}</h3>
        </DialogTitle>
        <DialogDescription asChild>
          <p className="sr-only">
            {(item.type === 'video' ? 'Video' : 'Bild') +
              ' – ' +
              (item.title || 'Medienbeschreibung')}
          </p>
        </DialogDescription>

        {item.type === 'video' ? (
          <video controls autoPlay className="max-h-[70vh] w-full">
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={src} alt={altFull} className="max-h-[70vh] w-full object-contain" />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default NewsItem
