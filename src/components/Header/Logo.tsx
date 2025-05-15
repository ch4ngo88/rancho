import { useLanguage } from '@/hooks/useLanguage'
import { useIsMobile } from '@/hooks/use-mobile'

interface LogoProps {
  scrollToTop: () => void
}

const Logo = ({ scrollToTop }: LogoProps) => {
  const { language } = useLanguage()
  const isMobile = useIsMobile()

  return (
    <div className="flex cursor-pointer items-center md:gap-3" onClick={scrollToTop}>
      <img
        src={`${import.meta.env.BASE_URL}images/logo.png`}
        alt="Rancho Folclórico Tradições Portuguesas - Offizielles Logo der portugiesischen Tanzgruppe in Hamburg"
        className="h-12 w-12 object-cover"
        width={48}
        height={48}
      />
      <div className={`${isMobile ? 'flex-1 text-center' : 'text-left'}`}>
        <span className="block text-sm font-medium text-portuguesered">Rancho Folclórico</span>
        <h1 className="font-lusitana text-lg font-bold leading-tight text-seagreen">
          Tradições Portuguesas
        </h1>
        <span className="block text-xs italic text-gray-600">
          {language === 'pt'
            ? 'Preservando a cultura portuguesa em Hamburgo desde 1979'
            : 'Bewahrung der portugiesischen Kultur in Hamburg seit 1979'}
        </span>
      </div>
    </div>
  )
}

export default Logo
