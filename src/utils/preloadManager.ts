import React from 'react'

export type ResourceType = 'image' | 'script' | 'style' | 'font' | 'document' | 'fetch'

interface PreloadOptions {
  as: ResourceType
  type?: string
  crossOrigin?: string
  media?: string
  fetchPriority?: 'high' | 'low' | 'auto'
}

const withBaseUrl = (href: string) =>
  href.startsWith('http') ? href : `${import.meta.env.BASE_URL}${href.replace(/^\/+/, '')}`

export const preloadResource = (href: string, options: PreloadOptions): HTMLLinkElement => {
  const fullHref = withBaseUrl(href)

  const existingPreload = document.querySelector(`link[rel="preload"][href="${fullHref}"]`)
  if (existingPreload) return existingPreload as HTMLLinkElement

  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = fullHref
  link.as = options.as

  if (options.type) link.setAttribute('type', options.type)
  if (options.crossOrigin) link.setAttribute('crossorigin', options.crossOrigin)
  if (options.media) link.setAttribute('media', options.media)
  if (options.fetchPriority) link.setAttribute('fetchpriority', options.fetchPriority)

  document.head.appendChild(link)
  return link
}

export const prefetchResource = (href: string, options: PreloadOptions): HTMLLinkElement => {
  const fullHref = withBaseUrl(href)

  const existingPrefetch = document.querySelector(`link[rel="prefetch"][href="${fullHref}"]`)
  if (existingPrefetch) return existingPrefetch as HTMLLinkElement

  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = fullHref
  link.as = options.as

  if (options.type) link.setAttribute('type', options.type)
  if (options.crossOrigin) link.setAttribute('crossorigin', options.crossOrigin)

  document.head.appendChild(link)
  return link
}

export const prefetchImage = (src: string): void => {
  prefetchResource(src, { as: 'image' })
}

export const preloadImage = (src: string, priority: 'high' | 'auto' = 'auto'): void => {
  const imageType =
    src.endsWith('.jpg') || src.endsWith('.jpeg')
      ? 'image/jpeg'
      : src.endsWith('.png')
        ? 'image/png'
        : src.endsWith('.webp')
          ? 'image/webp'
          : undefined

  const preloadOptions: PreloadOptions = {
    as: 'image',
    fetchPriority: priority,
  }

  if (imageType) preloadOptions.type = imageType

  preloadResource(src, preloadOptions)
}

export const usePagePreload = (resources: Array<{ href: string; options: PreloadOptions }>) => {
  React.useEffect(() => {
    const links: HTMLLinkElement[] = []

    resources.forEach((resource) => {
      const link = preloadResource(resource.href, resource.options)
      links.push(link)
    })

    return () => {
      links.forEach((link) => {
        if (link?.parentNode) link.parentNode.removeChild(link)
      })
    }
  }, [resources])
}

export const preloadRoute = (route: string) => {
  prefetchResource(route, { as: 'document' })
}
export const isValidResourceType = (type: unknown): type is ResourceType => {
  return ['script', 'style', 'font', 'image', 'document', 'fetch'].includes(type as string)
}
