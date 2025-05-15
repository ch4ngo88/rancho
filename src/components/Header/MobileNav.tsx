import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '@/hooks/useLanguage'
import { Home, LayoutGrid, Archive, Users, Mail, X } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { LanguageSwitcher } from '../LanguageSwitcher'

const MobileNav = () => {
  const { t, language } = useLanguage()
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  // Updated handleClick function to scroll to the very top of the page
  const handleClick = () => {
    // Using scrollTo with top: 0 and behavior: 'instant' to ensure immediate scrolling to the top
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const getNavIcon = (path: string) => {
    switch (path) {
      case '/':
        return <Home size={18} className="mr-3" />
      case '/activities':
        return <LayoutGrid size={18} className="mr-3" />
      case '/archive':
        return <Archive size={18} className="mr-3" />
      case '/membros':
        return <Users size={18} className="mr-3" />
      case '/contact':
        return <Mail size={18} className="mr-3" />
      default:
        return null
    }
  }

  return (
    <div className="z-30 md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-seagreen/30 p-2 text-seagreen transition-colors hover:bg-seagreen/10 focus:ring-2 focus:ring-seagreen focus:ring-offset-2"
            aria-label="Öffne Hauptmenü"
          >
            <Menu size={22} />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64 rounded-l-2xl bg-seagreen p-0 text-white">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-white/20 p-4">
              <span className="font-lusitana font-bold">Menu</span>
              <SheetClose className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full p-2 transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50">
                <X size={20} className="text-white" aria-hidden="true" />
                <span className="sr-only">Menü schließen</span>
              </SheetClose>
            </div>
            <ul className="flex w-full flex-col pt-4 text-center">
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
                <li key={item.path} className="relative py-3">
                  <SheetClose asChild>
                    <Link
                      to={item.path}
                      onClick={handleClick}
                      className={`flex items-center rounded-lg px-6 py-2 transition-all ${
                        isActive(item.path)
                          ? 'bg-white/10 font-bold text-white'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      {getNavIcon(item.path)}
                      {item.label}
                      {isActive(item.path) && (
                        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 transform rounded-r-md bg-[#ea384c] shadow-md"></span>
                      )}
                    </Link>
                  </SheetClose>
                </li>
              ))}
              <li className="mt-auto flex justify-center border-t border-white/20 px-6 py-6">
                <LanguageSwitcher />
              </li>
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNav
