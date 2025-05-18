import { Helmet } from 'react-helmet-async'
import { useLanguage } from '@/hooks/useLanguage'

const SeoMeta = () => {
  const { language } = useLanguage()
  const langCode = language === 'de' ? 'de' : 'pt'
  const href = 'https://tradicoesportuguesas.com/'

  return (
    <Helmet>
      <link rel="alternate" href={href} hrefLang={langCode} />
    </Helmet>
  )
}

export default SeoMeta
