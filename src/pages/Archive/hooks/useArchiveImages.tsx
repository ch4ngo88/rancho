import { useState, useEffect } from 'react'
import { archiveImageNames } from '../data/archiveImages'
import { asset } from '@/lib/asset'

const useArchiveImages = () => {
  const [images, setImages] = useState<string[]>([])
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    const firstBatch = archiveImageNames
      .slice(0, 4)
      .map((file) => asset(`images/archive/images/${file}`))

    setImages(firstBatch)
    setImagesLoaded(true)

    const timer = setTimeout(() => {
      const rest = archiveImageNames.slice(4).map((file) => asset(`images/archive/images/${file}`))
      setImages((prev) => [...prev, ...rest])
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return { images, imagesLoaded }
}

export default useArchiveImages
