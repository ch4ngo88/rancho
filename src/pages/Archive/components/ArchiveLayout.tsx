import React from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import NavigationTabs from './NavigationTabs'

interface ArchiveLayoutProps {
  children: React.ReactNode
  activeTab: 'photos' | 'audio' | 'videos'
  setActiveTab: (tab: 'photos' | 'audio' | 'videos') => void
}

const ArchiveLayout = ({ children, activeTab, setActiveTab }: ArchiveLayoutProps) => {
  const { language } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="section-title text-2xl font-bold">
          {language === 'pt' ? 'Arquivo' : 'Archiv'}
        </h1>
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="mt-6">{children}</div>
    </div>
  )
}

export default ArchiveLayout
