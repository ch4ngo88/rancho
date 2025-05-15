import React from 'react'

export const lazyImport = <
  I extends { [K2 in K]: React.ComponentType<Props> },
  K extends keyof I,
  Props = unknown,
>(
  factory: () => Promise<I>,
  name: K,
): React.LazyExoticComponent<React.ComponentType<Props>> => {
  return React.lazy(() =>
    factory()
      .then((module) => ({ default: module[name] }))
      .catch((error) => {
        console.error(`Error loading module: ${String(name)}`, error)
        throw error
      }),
  )
}

export const loadScriptWhenNeeded = (src: string, id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.id = id
    script.src = src
    script.async = true

    const cleanup = () => {
      script.onerror = null
      script.onload = null
    }

    script.onload = () => {
      cleanup()
      resolve()
    }

    script.onerror = () => {
      cleanup()
      reject(new Error(`Failed to load script: ${src}`))
    }

    document.body.appendChild(script)
  })
}
