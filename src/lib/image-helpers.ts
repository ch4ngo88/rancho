// src/lib/image-helpers.ts

// Liste von Bildern, die als "kritisch" für den First View gelten
const aboveFoldImages = ['images/home/gruppe.webp', 'images/logo.png']
const eagerLoadImages = ['images/home/gruppe.webp', 'images/logo.png']

// Image sizes for responsive loading
export const imageSizes = {
  thumbnail: { width: 200, height: 150 },
  small: { width: 400, height: 300 },
  medium: { width: 800, height: 600 },
  large: { width: 1200, height: 900 },
}

// Liefert einen vollständigen Pfad unter Beachtung von Vite + Base-URL
const withBaseUrl = (href: string) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '') // kein trailing slash
  const cleanHref = href.replace(/^\/+/, '') // kein leading slash

  if (href.startsWith('http') || href.startsWith(base)) {
    return href // schon absolut oder mit base
  }

  return `${base}/${cleanHref}`
}

// Entscheidet, ob ein Bild vorab preloadet werden soll
export const shouldPreload = (src: string): boolean => {
  return !!src && aboveFoldImages.some((img) => src.includes(img))
}

// Entscheidet, ob ein Bild eager geladen werden soll
export const shouldEagerLoad = (src: string): boolean => {
  return !!src && eagerLoadImages.some((img) => src.includes(img))
}

// Generiert srcset für WebP-Versionen (oder JPEG/PNG fallback)
export const generateSrcSet = (imagePath: string): string => {
  return `${withBaseUrl(imagePath)} 1x`
}

// Empfohlene sizes-Angabe für responsive Layouts
export const generateSizes = (): string => {
  return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}

// Bildtyp für <link preload> oder <source type="...">
export const getImageType = (src: string): string | undefined => {
  if (src.endsWith('.jpg') || src.endsWith('.jpeg')) return 'image/jpeg'
  if (src.endsWith('.png')) return 'image/png'
  if (src.endsWith('.webp')) return 'image/webp'
  if (src.endsWith('.gif')) return 'image/gif'
  if (src.endsWith('.svg')) return 'image/svg+xml'
  return undefined
}

// Fügt <link rel="preload"> für kritische Bilder in den Head ein
export const preloadCriticalImage = (src: string): HTMLLinkElement | null => {
  if (!src) return null

  const fullSrc = withBaseUrl(src)
  const existing = document.querySelector(`link[rel="preload"][href="${fullSrc}"]`)
  if (existing) return existing as HTMLLinkElement

  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = fullSrc
  link.as = 'image'
  link.setAttribute('fetchpriority', 'high')

  const imageType = getImageType(fullSrc)
  if (imageType) link.type = imageType

  document.head.appendChild(link)
  return link
}
