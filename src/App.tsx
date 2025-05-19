import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from '@/hooks/useLanguage'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import Header from '@/components/Header'
import { Footer } from '@/components/Footer'
import Home from './pages/Home'
import Activities from './pages/Activities'
import Archive from './pages/Archive'
import Membros from './pages/Membros'
import Contact from './pages/Contact'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'
import Agb from './pages/Agb'
import NotFound from './pages/NotFound'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import SeoMeta from '@/utils/seoMeta'

const queryClient = new QueryClient()

const ScrollToTopWrapper = ({ children }: { children: React.ReactNode }) => {
  useScrollToTop()
  return <>{children}</>
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <SeoMeta />
        <Toaster />
        <Sonner />
        <Router>
          <ScrollToTopWrapper>
            <div className="scrollbar-stable flex min-h-screen flex-col overflow-y-auto">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/activities" element={<Activities />} />
                  <Route path="/archive" element={<Archive />} />
                  <Route path="/membros" element={<Membros />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/impressum" element={<Impressum />} />
                  <Route path="/datenschutz" element={<Datenschutz />} />
                  <Route path="/agb" element={<Agb />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ScrollToTopWrapper>
        </Router>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
)

export default App
