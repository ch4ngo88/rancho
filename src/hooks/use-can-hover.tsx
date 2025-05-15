import { useEffect, useState } from 'react'

export function useCanHover() {
  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    const checkHover = window.matchMedia('(hover: hover)').matches
    setCanHover(checkHover)
  }, [])

  return canHover
}
