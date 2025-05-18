import { useLanguage } from '@/hooks/useLanguage'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { asset } from '@/lib/asset'

export type EventType = {
  id: number
  title: string
  date: string
  image?: string
  video?: string
  description: string
  location: string
}

interface EventCardProps {
  event: EventType
}

const EventCard = ({ event }: EventCardProps) => {
  const { language } = useLanguage()

  /* ---------- Hilfswerte ---------- */
  const dateLong = new Date(event.date).toLocaleDateString(language === 'pt' ? 'pt-PT' : 'de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const dateShort = new Date(event.date).toLocaleDateString(language === 'pt' ? 'pt-PT' : 'de-DE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  const altText = `${event.title} - ${
    language === 'pt' ? 'Evento em' : 'Veranstaltung in'
  } ${event.location} ${language === 'pt' ? 'no dia' : 'am'} ${dateLong}`

  /* ---------- Pfade angleichen ---------- */
  const imgSrc = event.image ? asset(event.image) : undefined
  const videoSrc = event.video ? asset(event.video) : undefined

  return (
    <div className="card-hover flex h-full flex-col overflow-hidden rounded-xl bg-white/90 shadow-md md:flex-row">
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="relative h-[250px] cursor-pointer md:w-1/3"
            role="button"
            aria-label={
              videoSrc ? `${event.title} - Video öffnen` : `${event.title} - Bild anzeigen`
            }
          >
            {imgSrc && (
              <>
                <img
                  src={imgSrc}
                  alt={altText}
                  className="aspect-video h-full w-full object-cover"
                  loading="lazy"
                />

                {videoSrc && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-pulse rounded-full bg-black/50 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Datum‑Badge */}
            <div className="absolute left-0 top-0 rounded-br-lg bg-seagreen px-4 py-2 font-medium text-white">
              {dateShort}
            </div>
          </div>
        </DialogTrigger>

        {/* ---------- Modal ---------- */}
        <DialogContent className="max-w-2xl p-0">
          <DialogTitle asChild>
            <h3 className="sr-only">{event.title || 'Veranstaltungstitel'}</h3>
          </DialogTitle>

          <DialogDescription asChild>
            <p className="sr-only">
              {event.location && dateLong
                ? language === 'pt'
                  ? `Evento em ${event.location} no dia ${dateLong}`
                  : `Veranstaltung in ${event.location} am ${dateLong}`
                : 'Eventbeschreibung'}
            </p>
          </DialogDescription>

          <div className="w-full">
            {videoSrc ? (
              <video controls autoPlay className="h-full max-h-[70vh] w-full">
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              imgSrc && <img src={imgSrc} alt={altText} className="h-full w-full object-contain" />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* ---------- Textbereich ---------- */}
      <div className="flex h-full flex-col justify-between p-6 md:w-2/3">
        <div>
          <h3 className="mb-2 text-xl font-bold text-portuguesered">{event.title}</h3>

          <div className="mb-4 flex items-center gap-1 text-sm text-gray-500">
            {/* Location‑Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{event.location}</span>
          </div>

          <p className="text-gray-700">{event.description}</p>
        </div>

        {event.id === 1 && (
          <a
            href="https://diadeportugal.ticket.io/eg0vus7w/"
            target="_blank"
            rel="noopener noreferrer"
            className="button-secondary mt-4 min-w-[200px] self-start text-center"
          >
            {language === 'pt' ? 'Comprar Bilhetes' : 'Tickets kaufen'}
          </a>
        )}
      </div>
    </div>
  )
}

export default EventCard
