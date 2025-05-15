import { useLanguage } from '@/hooks/useLanguage'

interface NavigationTabsProps {
  activeTab: 'photos' | 'audio' | 'videos'
  setActiveTab: (tab: 'photos' | 'audio' | 'videos') => void
}

const NavigationTabs = ({ activeTab, setActiveTab }: NavigationTabsProps) => {
  const { t } = useLanguage()

  return (
    <div className="inline-flex rounded-md bg-gray-100 p-1">
      <button
        onClick={() => setActiveTab('photos')}
        className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${
          activeTab === 'photos'
            ? 'bg-white text-seagreen shadow-sm'
            : 'text-gray-600 hover:text-seagreen'
        }`}
      >
        {t('photos')}
      </button>
      <button
        onClick={() => setActiveTab('audio')}
        className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${
          activeTab === 'audio'
            ? 'bg-white text-seagreen shadow-sm'
            : 'text-gray-600 hover:text-seagreen'
        }`}
      >
        {t('audio')}
      </button>
      <button
        onClick={() => setActiveTab('videos')}
        className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${
          activeTab === 'videos'
            ? 'bg-white text-seagreen shadow-sm'
            : 'text-gray-600 hover:text-seagreen'
        }`}
      >
        {t('videos')}
      </button>
    </div>
  )
}

export default NavigationTabs
