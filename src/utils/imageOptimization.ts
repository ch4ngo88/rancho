// Image sizes for responsive loading
export const imageSizes = {
  thumbnail: { width: 200, height: 150 },
  small: { width: 400, height: 300 },
  medium: { width: 800, height: 600 },
  large: { width: 1200, height: 900 },
}

const withBaseUrl = (href: string) =>
  href.startsWith('http') ? href : `${import.meta.env.BASE_URL}${href.replace(/^\/+/, '')}`

// Generate the srcset attribute for responsive images with WebP support
export const generateSrcSet = (imagePath: string, useWebP: boolean = true): string => {
  const extension = imagePath.split('.').pop()
  const basePath = imagePath.substring(0, imagePath.lastIndexOf('.'))

  if (useWebP) {
    return `
      ${withBaseUrl(`${basePath}-400w.webp`)} 400w,
      ${withBaseUrl(`${basePath}-800w.webp`)} 800w,
      ${withBaseUrl(`${basePath}-1200w.webp`)} 1200w
    `.trim()
  }

  return `
    ${withBaseUrl(`${basePath}-400w.${extension}`)} 400w,
    ${withBaseUrl(`${basePath}-800w.${extension}`)} 800w,
    ${withBaseUrl(`${basePath}-1200w.${extension}`)} 1200w
  `.trim()
}

// Generate sizes attribute for responsive images
export const generateSizes = (): string => {
  return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}

export type PictureElementProps = {
  src: string
  alt: string
  className?: string
  width?: string
  height?: string
  loading?: 'lazy' | 'eager'
}

export const shouldEagerLoad = (imagePath: string): boolean => {
  const criticalImages = ['images/home/gruppe.webp', 'images/logo.png', 'images/logo.webp']
  return criticalImages.some((img) => imagePath.includes(img))
}

export const shouldPreload = (imagePath: string): boolean => {
  const preloadImages = ['home/gruppe.webp']
  return preloadImages.some((img) => imagePath.includes(img))
}

export const getImageType = (src: string): string | undefined => {
  if (src.endsWith('.jpg') || src.endsWith('.jpeg')) return 'image/jpeg'
  if (src.endsWith('.png')) return 'image/png'
  if (src.endsWith('.webp')) return 'image/webp'
  if (src.endsWith('.gif')) return 'image/gif'
  if (src.endsWith('.svg')) return 'image/svg+xml'
  return undefined
}

export const preloadCriticalImage = (src: string): HTMLLinkElement | null => {
  if (!src || !shouldPreload(src)) return null

  const fullSrc = withBaseUrl(src)

  const existingPreload = document.querySelector(`link[rel="preload"][href="${fullSrc}"]`)
  if (existingPreload) return existingPreload as HTMLLinkElement

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
