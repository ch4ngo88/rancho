import { useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { AlertTriangle, Home } from 'lucide-react'
import { useMetaSEO } from '@/hooks/useMetaSEO'

const NotFound = () => {
  const location = useLocation()
  const { t } = useLanguage()

  useMetaSEO('home') // Fallback to home metadata for 404 page

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname)
  }, [location.pathname])

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gray-50">
      <div className="glass-card mx-auto max-w-md px-4 py-10 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle className="h-10 w-10 text-portuguesered" />
        </div>
        <h1 className="mb-4 text-5xl font-bold text-portuguesered">404</h1>
        <p className="mb-8 text-xl text-gray-600">{t('notFoundTitle')}</p>
        <Link to="/" className="button-primary inline-flex items-center gap-2">
          <Home className="h-4 w-4" />
          {t('backToHome')}
        </Link>
      </div>
    </div>
  )
}

export default NotFound
