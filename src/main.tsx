import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'

// ───────────────────────────────────────────────────────────
// 1) Lazy‑geladene Root‑App
// ───────────────────────────────────────────────────────────
const App = lazy(() => import('./App'))

// 2) Fallback‑Spinner
const LoadingFallback = () => (
  <div className="app-loading flex min-h-screen items-center justify-center bg-[#f9f9f9]">
    <div className="loader h-16 w-16 animate-spin rounded-full border-4 border-seagreen border-t-transparent" />
  </div>
)

// 3) Mount React
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Suspense fallback={<LoadingFallback />}>
        <App />
      </Suspense>
    </HelmetProvider>
  </React.StrictMode>,
)

// ───────────────────────────────────────────────────────────
// 4) 📦 Code‑Chunks im Leerlauf vorladen
//    (keine 404 mehr, funktioniert bei GitHub‑Pages & Vite dev)
// ───────────────────────────────────────────────────────────
const prefetchChunks = [
  () => import('./pages/Activities'),
  () => import('./pages/Archive'),
  () => import('./pages/Contact'),
  () => import('./pages/Membros'),
]

const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1))
idle(() => {
  prefetchChunks.forEach((fn) => fn())
})
