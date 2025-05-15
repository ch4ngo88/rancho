import { useLanguage } from '@/hooks/useLanguage'
import { useMetaSEO } from '@/hooks/useMetaSEO'
import NewsSection from './components/NewsSection'
import EventsSection from './components/EventsSection'
import EnsaiosSection from './components/EnsaiosSection'
import { useNewsItems, useUpcomingEvents, useEnsaios } from './data/activitiesData'
import AnimatedDivider from './components/AnimatedDivider'

const Activities = () => {
  useMetaSEO('activities')
  const { language } = useLanguage()
  const newsItems = useNewsItems()
  const upcomingEvents = useUpcomingEvents()
  const ensaios = useEnsaios()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="section-title text-center">
        {language === 'pt' ? 'Atividades' : 'Aktivitäten'}
      </h1>

      {/* News Section */}
      <NewsSection newsItems={newsItems} />
      <div className="mx-auto w-[80%]">
        <AnimatedDivider />
      </div>
      {/* Events Calendar Section */}
      <EventsSection events={upcomingEvents} />
      <div className="mx-auto w-[80%]">
        <AnimatedDivider />
      </div>
      {/* Ensaios Section */}
      <EnsaiosSection ensaios={ensaios} />
    </div>
  )
}

export default Activities
