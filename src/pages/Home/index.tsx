import { useState, useEffect } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { useMetaSEO } from '@/hooks/useMetaSEO'
import HeroSection from './components/HeroSection'
import AboutUsSection from './components/AboutUsSection'

const Home = () => {
  useMetaSEO('home')
  const { language } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Preconnect and preload critical resources
    const preconnectGoogle = document.createElement('link')
    preconnectGoogle.rel = 'preconnect'
    preconnectGoogle.href = 'https://fonts.googleapis.com'
    document.head.appendChild(preconnectGoogle)

    // Add a short timeout to ensure smooth transition
    const timer = setTimeout(() => setIsLoading(false), 200)

    // Lazy load non-critical resources
    const lazyLoad = () => {
      const lazyImages = document.querySelectorAll('img[loading="lazy"]')
      lazyImages.forEach((img) => {
        ;(img as HTMLImageElement).loading = 'lazy'
      })
    }

    if (document.readyState === 'complete') {
      lazyLoad()
    } else {
      window.addEventListener('load', lazyLoad)
    }

    return () => {
      clearTimeout(timer)
      window.removeEventListener('load', lazyLoad)
    }
  }, [])

  return (
    <div className="flex flex-col">
      <HeroSection language={language} />

      {isLoading ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-seagreen border-t-transparent"></div>
        </div>
      ) : (
        <AboutUsSection />
      )}
    </div>
  )
}

export default Home
