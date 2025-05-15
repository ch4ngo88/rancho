import { Calendar } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import EventCard, { EventType } from './EventCard'

interface EventsSectionProps {
  events: EventType[]
}

const EventsSection = ({ events }: EventsSectionProps) => {
  const { t } = useLanguage()

  return (
    <section className="mb-12">
      <div className="mb-8 flex items-center gap-2">
        <Calendar className="text-seagreen" />
        <h3 className="text-xl font-bold text-seagreen">{t('upcomingActivities')}</h3>
      </div>

      <div className="space-y-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}

export default EventsSection
