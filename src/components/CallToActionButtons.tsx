import { Link } from 'react-router-dom'
import { useLanguage } from '@/hooks/useLanguage'
import { Calendar, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const CallToActionButtons = () => {
  const { t } = useLanguage()

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col justify-center gap-4 sm:flex-row">
      <Button
        variant="default"
        className="flex min-w-[200px] items-center justify-center gap-2 bg-seagreen text-white transition-all duration-300 hover:scale-[1.02] hover:bg-seagreen/90 hover:shadow-lg"
        asChild
        onClick={handleClick}
      >
        <Link to="/activities">
          <Calendar size={18} />
          {t('seeActivities')}
        </Link>
      </Button>

      <Button
        variant="default"
        className="flex min-w-[200px] items-center justify-center gap-2 bg-portuguesered text-white transition-all duration-300 hover:scale-[1.02] hover:bg-portuguesered/90 hover:shadow-lg"
        asChild
        onClick={handleClick}
      >
        <Link to="/contact">
          <Mail size={18} />
          {t('contactBtn')}
        </Link>
      </Button>
    </div>
  )
}
