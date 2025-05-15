import { Link } from 'react-router-dom'
import { useLanguage } from '@/hooks/useLanguage'
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone, Clock } from 'lucide-react'
import { asset } from '@/lib/asset'

export const Footer = () => {
  const { language } = useLanguage()

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialMediaLinks = [
    {
      href: 'https://www.youtube.com/@tradicoesportuguesasdeharb1754',
      icon: <Youtube size={24} />,
      label: 'YouTube',
    },
    {
      href: 'https://www.facebook.com/portugiesischerverein.harburg?locale=de_DE',
      icon: <Facebook size={24} />,
      label: 'Facebook',
    },
    {
      href: 'https://www.instagram.com/tradicoes_portuguesas/',
      icon: <Instagram size={24} />,
      label: 'Instagram',
    },
    {
      href: 'https://www.tiktok.com/@tradies.portugues',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.321 5.562a5.124 5.124 0 01-.443-0.258 6.228 6.228 0 01-1.137-0.992 6.244 6.244 0 01-1.473-2.894h0.003l-0.003-0.01h-3.608v13.798c0 0.169-0.002 0.336-0.007 0.503 0 0.035-0.002 0.068-0.003 0.103l0.003-0.014c0 0.006-0 0.012-0 0.018 0 1.894-1.536 3.429-3.429 3.429s-3.429-1.536-3.429-3.429c0-1.894 1.536-3.429 3.429-3.429 0.290 0 0.572 0.036 0.841 0.104l0.001-10.372h-0.001v-0.034h3.607c0.025 0.407 0.094 0.805 0.203 1.191 0.155 0.552 0.372 1.067 0.644 1.537 0.307 0.525 0.679 0.995 1.101 1.399 0.331 0.316 0.699 0.593 1.1 0.825 0.179 0.103 0.363 0.199 0.552 0.285l0.033 0.014v3.65c-0.339-0.103-0.684-0.225-1.022-0.376-0.948-0.412-1.784-0.986-2.529-1.701-0.046-0.044-0.092-0.089-0.137-0.134v5.002c-0.001 0.183-0.001 0.183-0.004 0.223-0.008 0.144-0.023 0.288-0.043 0.431-0.052 0.369-0.135 0.733-0.248 1.088-0.169 0.533-0.405 1.039-0.703 1.506-0.362 0.568-0.807 1.070-1.321 1.483-0.527 0.423-1.118 0.755-1.75 0.976-0.650 0.229-1.34 0.346-2.048 0.346-0.789 0-1.551-0.146-2.264-0.426-0.762-0.301-1.457-0.759-2.059-1.356-0.603-0.597-1.065-1.297-1.371-2.063-0.277-0.705-0.424-1.467-0.424-2.259 0-0.676 0.102-1.332 0.298-1.952 0.196-0.618 0.489-1.200 0.868-1.709s0.846-0.961 1.4-1.333c0.639-0.429 1.357-0.750 2.125-0.949 0.254-0.066 0.512-0.118 0.773-0.156 0.019-0.003 0.038-0.005 0.057-0.008 0.647-0.091 1.308-0.079 1.966 0.024v-0.007h0.068v3.573c-0.285-0.129-0.594-0.201-0.915-0.209-0.039-0.001-0.077-0.001-0.116-0.001-0.622 0-1.178 0.188-1.654 0.490-0.511 0.324-0.909 0.813-1.121 1.378-0.117 0.312-0.178 0.650-0.178 0.998 0 0.458 0.102 0.888 0.284 1.277 0.259 0.550 0.686 0.996 1.221 1.273 0.386 0.200 0.825 0.313 1.293 0.313 0.375 0 0.736-0.075 1.067-0.213 0.570-0.238 1.059-0.683 1.361-1.250 0.143-0.267 0.240-0.564 0.279-0.876 0.027-0.212 0.033-0.783 0.033-0.988v-11.888c0-0.285 0-0.571 0.002-0.855 0.001-0.088 0.002-0.176 0.004-0.264h3.609c0.089 1.954 1.100 3.653 2.633 4.599v3.339c-0.001-0.001-0.002-0.002-0.004-0.002z"></path>
        </svg>
      ),
      label: 'TikTok',
    },
  ]

  return (
    <footer className="w-full bg-seagreen text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-5xl md:grid md:grid-cols-[2.5fr_0.9fr_0.9fr] md:gap-4">
          <div className="flex flex-col items-center md:items-center">
            <div className="mb-3 inline-block w-full rounded-md bg-white p-4 md:max-w-sm">
              <div className="flex items-center justify-center gap-3 md:justify-start">
                <img
                  src={asset('images/logo.png')}
                  alt="Rancho logo"
                  className="h-10 w-10 rounded-sm object-cover"
                  width={40}
                  height={40}
                  loading="lazy"
                />
                <div>
                  <h3 className="font-lusitana text-base font-bold text-seagreen">
                    Tradições Portuguesas
                  </h3>
                  <p className="text-xs italic text-gray-600">
                    {language === 'pt' ? (
                      <>
                        Preservando a cultura portuguesa em Hamburgo <br /> desde 1979
                      </>
                    ) : (
                      <>
                        Bewahrung der portugiesischen Kultur in Hamburg <br /> seit 1979
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden w-full justify-center gap-3 md:flex">
              {socialMediaLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 text-white transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:text-white/60 hover:shadow-md"
                  aria-label={item.label}
                >
                  {item.icon}
                  <span className="sr-only">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center md:hidden">
            <div className="flex justify-center gap-4">
              {[
                {
                  href: 'https://www.youtube.com/@tradicoesportuguesasdeharb1754',
                  icon: <Youtube size={24} />,
                  label: 'YouTube',
                },
                {
                  href: 'https://www.facebook.com/portugiesischerverein.harburg?locale=de_DE',
                  icon: <Facebook size={24} />,
                  label: 'Facebook',
                },
                {
                  href: 'https://www.instagram.com/tradicoes_portuguesas/',
                  icon: <Instagram size={24} />,
                  label: 'Instagram',
                },
                {
                  href: 'https://www.tiktok.com/@tradies.portugues',
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.321 5.562a5.124 5.124 0 01-.443-0.258 6.228 6.228 0 01-1.137-0.992 6.244 6.244 0 01-1.473-2.894h0.003l-0.003-0.01h-3.608v13.798c0 0.169-0.002 0.336-0.007 0.503 0 0.035-0.002 0.068-0.003 0.103l0.003-0.014c0 0.006-0 0.012-0 0.018 0 1.894-1.536 3.429-3.429 3.429s-3.429-1.536-3.429-3.429c0-1.894 1.536-3.429 3.429-3.429 0.290 0 0.572 0.036 0.841 0.104l0.001-10.372h-0.001v-0.034h3.607c0.025 0.407 0.094 0.805 0.203 1.191 0.155 0.552 0.372 1.067 0.644 1.537 0.307 0.525 0.679 0.995 1.101 1.399 0.331 0.316 0.699 0.593 1.1 0.825 0.179 0.103 0.363 0.199 0.552 0.285l0.033 0.014v3.65c-0.339-0.103-0.684-0.225-1.022-0.376-0.948-0.412-1.784-0.986-2.529-1.701-0.046-0.044-0.092-0.089-0.137-0.134v5.002c-0.001 0.183-0.001 0.183-0.004 0.223-0.008 0.144-0.023 0.288-0.043 0.431-0.052 0.369-0.135 0.733-0.248 1.088-0.169 0.533-0.405 1.039-0.703 1.506-0.362 0.568-0.807 1.070-1.321 1.483-0.527 0.423-1.118 0.755-1.75 0.976-0.650 0.229-1.34 0.346-2.048 0.346-0.789 0-1.551-0.146-2.264-0.426-0.762-0.301-1.457-0.759-2.059-1.356-0.603-0.597-1.065-1.297-1.371-2.063-0.277-0.705-0.424-1.467-0.424-2.259 0-0.676 0.102-1.332 0.298-1.952 0.196-0.618 0.489-1.200 0.868-1.709s0.846-0.961 1.4-1.333c0.639-0.429 1.357-0.750 2.125-0.949 0.254-0.066 0.512-0.118 0.773-0.156 0.019-0.003 0.038-0.005 0.057-0.008 0.647-0.091 1.308-0.079 1.966 0.024v-0.007h0.068v3.573c-0.285-0.129-0.594-0.201-0.915-0.209-0.039-0.001-0.077-0.001-0.116-0.001-0.622 0-1.178 0.188-1.654 0.490-0.511 0.324-0.909 0.813-1.121 1.378-0.117 0.312-0.178 0.650-0.178 0.998 0 0.458 0.102 0.888 0.284 1.277 0.259 0.550 0.686 0.996 1.221 1.273 0.386 0.200 0.825 0.313 1.293 0.313 0.375 0 0.736-0.075 1.067-0.213 0.570-0.238 1.059-0.683 1.361-1.250 0.143-0.267 0.240-0.564 0.279-0.876 0.027-0.212 0.033-0.783 0.033-0.988v-11.888c0-0.285 0-0.571 0.002-0.855 0.001-0.088 0.002-0.176 0.004-0.264h3.609c0.089 1.954 1.100 3.653 2.633 4.599v3.339c-0.001-0.001-0.002-0.002-0.004-0.002z"></path>
                    </svg>
                  ),
                  label: 'TikTok',
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 text-white transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:text-white/60 hover:shadow-md"
                  aria-label={item.label}
                >
                  {item.icon}
                  <span className="sr-only">{item.label}</span>
                </a>
              ))}
            </div>
            <div className="my-4 w-full px-4">
              <div className="h-0.5 rounded-full bg-white/20"></div>
            </div>
          </div>
          <div className="flex flex-col rounded-md bg-seagreen/20 p-1 backdrop-blur-sm md:items-start">
            <div className="w-full space-y-2 text-center text-sm md:text-left">
              <div className="flex items-start justify-center gap-2 md:items-center md:justify-start">
                <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-white/80" />
                <span>
                  Hastedtstraße 30
                  <br />
                  21073 Hamburg
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Mail className="h-4 w-4 flex-shrink-0 text-white/80" />
                <a
                  href="mailto:g.c.r.f.p@hotmail.com"
                  className="transition-colors hover:text-white/60"
                >
                  g.c.r.f.p@hotmail.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Phone className="h-4 w-4 flex-shrink-0 text-white/80" />
                <a href="tel:+4915731625061" className="transition-colors hover:text-white/60">
                  +49 (0) 157 316 250 61
                </a>
              </div>
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Clock className="h-4 w-4 flex-shrink-0 text-white/80" />
                <span>So. von 11 - 14:00 Uhr</span>
              </div>
            </div>
            <div className="mt-4 w-full px-4 md:hidden">
              <div className="h-0.5 rounded-full bg-white/20"></div>
            </div>
          </div>
          <div className="flex flex-col rounded-md bg-seagreen/20 p-1 backdrop-blur-sm md:items-start">
            <ul className="flex w-full flex-col items-center space-y-1 md:items-start">
              <li>
                <Link
                  to="/impressum"
                  onClick={handleClick}
                  className="text-sm text-white transition-colors hover:text-white/60"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  to="/datenschutz"
                  onClick={handleClick}
                  className="text-sm text-white transition-colors hover:text-white/60"
                >
                  Datenschutzerklärung
                </Link>
              </li>
              <li>
                <Link
                  to="/agb"
                  onClick={handleClick}
                  className="text-sm text-white transition-colors hover:text-white/60"
                >
                  AGB
                </Link>
              </li>
            </ul>
            <div className="mt-3 hidden w-full text-center text-xs text-white/70 md:block md:text-left">
              <span className="mr-1 align-text-top text-xs">©</span> 2025. Alle Rechte vorbehalten.
            </div>
            <div className="mb-4 w-full text-center text-xs text-white/70 md:hidden">
              <span className="mr-1 align-text-top text-xs">©</span> 2025. Alle Rechte vorbehalten.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
