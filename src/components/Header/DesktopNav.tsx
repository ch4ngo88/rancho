import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '@/hooks/useLanguage'

const DesktopNav = () => {
  const { t, language } = useLanguage()
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className="relative mb-2 hidden rounded-md bg-seagreen py-0.5 text-white transition-all duration-300 md:block">
      <div className="flex items-center justify-between px-4 md:px-6">
        <ul className="flex w-full flex-col text-center md:flex-row md:items-center md:justify-center md:gap-8">
          {[
            { path: '/', label: t('home') },
            { path: '/activities', label: t('activities') },
            { path: '/archive', label: t('archive') },
            {
              path: '/membros',
              label: language === 'de' ? 'Mitglieder' : 'Membros',
            },
            { path: '/contact', label: t('contact') },
          ].map((item) => (
            <li key={item.path} className="py-4 md:py-1.5">
              <Link
                to={item.path}
                onClick={handleClick}
                className={`group relative block rounded-sm transition-all duration-300 hover:text-[#ea384c] focus:text-[#ea384c] focus:outline-none focus:ring-2 focus:ring-[#ea384c]/50 md:inline-block`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#ea384c] transition-all duration-300 ${
                    isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default DesktopNav
