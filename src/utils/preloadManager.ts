// 🧼 Behalte nur das hier in preloadManager.ts:

export type ResourceType = 'image' | 'script' | 'style' | 'font' | 'document' | 'fetch'

export const isValidResourceType = (type: unknown): type is ResourceType => {
  return ['script', 'style', 'font', 'image', 'document', 'fetch'].includes(type as string)
}

const withBaseUrl = (href: string) =>
  href.startsWith('http') ? href : `${import.meta.env.BASE_URL}${href.replace(/^\/+/, '')}`

export const preloadResource = (
  href: string,
  options: {
    as: ResourceType
    type?: string
    crossOrigin?: string
    media?: string
    fetchPriority?: 'high' | 'low' | 'auto'
  },
): HTMLLinkElement => {
  const fullHref = withBaseUrl(href)

  const existing = document.querySelector(`link[rel="preload"][href="${fullHref}"]`)
  if (existing) return existing as HTMLLinkElement

  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = fullHref
  link.as = options.as

  if (options.type) link.type = options.type
  if (options.crossOrigin) link.crossOrigin = options.crossOrigin
  if (options.media) link.media = options.media
  if (options.fetchPriority) link.setAttribute('fetchpriority', options.fetchPriority)

  document.head.appendChild(link)
  return link
}

export const prefetchResource = (href: string, options: { as: ResourceType; type?: string }) => {
  const fullHref = withBaseUrl(href)
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = fullHref
  link.as = options.as
  if (options.type) link.setAttribute('type', options.type)
  document.head.appendChild(link)
  return link
}
