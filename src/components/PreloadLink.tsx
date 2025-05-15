import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { prefetchResource } from '../utils/preloadManager'

// Zentrale Typdefinition für gültige resource types
export type ResourceType = 'script' | 'style' | 'font' | 'image' | 'document'

function isValidResourceType(type: unknown): type is ResourceType {
  return ['script', 'style', 'font', 'image', 'document'].includes(type as string)
}

interface PreloadLinkProps {
  to: string
  children: React.ReactNode
  className?: string
  preloadResources?: Array<{
    href: string
    as: ResourceType
    type?: ResourceType
  }>
  prefetchDelay?: number
  onlyPrefetchOnHover?: boolean
}

const PreloadLink: React.FC<PreloadLinkProps> = ({
  to,
  children,
  className,
  preloadResources = [],
  prefetchDelay = 100,
  onlyPrefetchOnHover = true,
}) => {
  const [hasPrefetched, setHasPrefetched] = useState(false)
  const linkRef = useRef<HTMLAnchorElement>(null)
  const location = useLocation()

  const shouldPrefetch = to !== location.pathname && !hasPrefetched

  const prefetchLinkedResources = useCallback(() => {
    if (!shouldPrefetch) return

    prefetchResource(to, { as: 'document' })

    preloadResources.forEach((resource) => {
      prefetchResource(resource.href, {
        as: resource.as,
        ...(isValidResourceType(resource.type) ? { type: resource.type } : {}),
      })
    })

    setHasPrefetched(true)
  }, [shouldPrefetch, to, preloadResources])

  const handleMouseEnter = () => {
    if (onlyPrefetchOnHover) {
      prefetchLinkedResources()
    }
  }

  useEffect(() => {
    if (onlyPrefetchOnHover || !shouldPrefetch) return

    const timer = setTimeout(() => {
      prefetchLinkedResources()
    }, prefetchDelay)

    return () => clearTimeout(timer)
  }, [onlyPrefetchOnHover, shouldPrefetch, prefetchDelay, prefetchLinkedResources])

  return (
    <Link ref={linkRef} to={to} className={className} onMouseEnter={handleMouseEnter}>
      {children}
    </Link>
  )
}

export default PreloadLink
