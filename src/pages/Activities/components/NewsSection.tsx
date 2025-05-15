import { Info } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import NewsItem, { NewsItemType } from './NewsItem'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { FaYoutube, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'
import { useRef } from 'react'
import type { Swiper as SwiperType } from 'swiper'

interface NewsSectionProps {
  newsItems: NewsItemType[]
}

const NewsSection = ({ newsItems }: NewsSectionProps) => {
  const { t, language } = useLanguage()
  const swiperRef = useRef<SwiperType | null>(null)

  return (
    <>
      <section className="mb-12 mt-8">
        <div className="mb-6 flex items-center gap-2">
          <Info className="text-portuguesered" />
          <h3 className="text-xl font-bold text-portuguesered">{t('news')}</h3>
        </div>

        <div className="mx-auto grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {newsItems.map((item, index) => (
            <NewsItem key={index} item={item} index={index} />
          ))}
        </div>
      </section>

      {/* Social Media Slider */}

      <div className="mt-4 flex flex-col items-center">
        <p className="mb-2 text-center text-xl font-bold text-[rgb(6,56,33)]">
          {language === 'pt'
            ? 'Segue-nos nas redes sociais para mais novidades!'
            : 'Folge uns auf Social Media für mehr Einblicke'}
        </p>

        <div className="flex w-20 justify-center overflow-visible">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            loop
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {[
              {
                href: 'https://www.youtube.com/@tradicoesportuguesasdeharb1754',
                icon: <FaYoutube size={64} color="#FF0000" />,
                label: 'YouTube',
              },
              {
                href: 'https://www.facebook.com/portugiesischerverein.harburg?locale=de_DE',
                icon: <FaFacebook size={64} color="#1877F2" />,
                label: 'Facebook',
              },
              {
                href: 'https://www.instagram.com/tradicoes_portuguesas/',
                icon: <FaInstagram size={64} color="#E1306C" />,
                label: 'Instagram',
              },
              {
                href: 'https://www.tiktok.com/@tradies.portugues',
                icon: <FaTiktok size={64} color="#000000" />,
                label: 'TikTok',
              },
            ].map((item) => (
              <SwiperSlide key={item.label} className="flex items-center justify-center">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  title={item.label}
                  onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
                  onMouseLeave={() => swiperRef.current?.autoplay?.start()}
                  className="flex p-2 transition-transform duration-300 hover:-translate-y-1"
                >
                  {item.icon}
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  )
}

export default NewsSection
