import { useEffect, useRef } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { CallToActionButtons } from '@/components/CallToActionButtons'
import { asset } from '@/lib/asset'

const AboutUsSection = () => {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100')
            entry.target.classList.remove('opacity-0', 'translate-y-4')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(el)

    return () => {
      observer.unobserve(el)
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      className="container mx-auto translate-y-4 px-4 py-12 opacity-0 transition-all duration-500"
    >
      <div className="glass-card mx-auto max-w-4xl p-8">
        <h2 className="section-title mb-8 font-lusitana">{t('aboutUs')}</h2>

        <article className="prose max-w-none space-y-6 text-justify font-lusitana text-gray-700">
          <p className="text-lg font-bold">{t('welcome')}</p>
          <p>{t('intro')}</p>
          <p className="italic text-gray-600">{t('storyIntro')}</p>

          <div className="mx-auto my-8 max-h-[400px] max-w-2xl overflow-hidden rounded-lg shadow-lg">
            <video
              src={asset('images/home/offen.mp4')}
              controls
              poster={asset('images/home/offen.webp')}
              className="max-h-[400px] w-full rounded-md object-cover"
              preload="metadata"
            >
              Your browser cannot play this video
            </video>
          </div>

          <div className="my-8 rounded-xl border-l-4 border-seagreen bg-cream p-6 shadow-md">
            <h3 className="mb-3 font-lusitana text-xl font-bold text-seagreen">
              {t('generations')}
            </h3>
            <p>{t('generationsText')}</p>
          </div>

          <div className="my-8 rounded-xl border-l-4 border-portuguesered bg-cream p-6 shadow-md">
            <h3 className="mb-3 font-lusitana text-xl font-bold text-portuguesered">
              {t('variety')}
            </h3>
            <p>{t('varietyText')}</p>
          </div>

          <div className="my-8 rounded-xl border-l-4 border-seagreen bg-cream p-6 shadow-md">
            <h3 className="mb-3 font-lusitana text-xl font-bold text-seagreen">
              {t('timeTravel')}
            </h3>
            <p>{t('timeTravelText')}</p>
          </div>

          <div className="bg-lightgold/20 rounded-xl p-6 shadow-md">
            <h3 className="mb-3 font-lusitana text-xl font-bold text-portuguesered">
              {t('joinUs')}
            </h3>
            <p className="mb-6">{t('joinUsText')}</p>

            <CallToActionButtons />

            <p className="mt-6 text-center font-bold">{t('finalMessage')}</p>
          </div>
        </article>
      </div>
    </div>
  )
}

export default AboutUsSection
