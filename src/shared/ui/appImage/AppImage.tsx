import { memo, useEffect, useState } from 'react'
import type { ImgHTMLAttributes, ReactElement } from 'react'

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: ReactElement
  errorFallback?: ReactElement
}

interface LoadResult {
  src: string
  status: 'loaded' | 'error'
}

export const AppImage = memo((props: AppImageProps) => {
  const { src, alt, fallback, errorFallback, ...otherProps } = props
  const [result, setResult] = useState<LoadResult | null>(null)

  useEffect(() => {
    if (!src) {
      return
    }

    const img = new Image()
    img.onload = () => {
      setResult({ src, status: 'loaded' })
    }
    img.onerror = () => {
      setResult({ src, status: 'error' })
    }
    img.src = src

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])

  const status = !src
    ? 'error'
    : result?.src === src
      ? result.status
      : 'loading'

  if (status === 'loading' && fallback) {
    return fallback
  }

  if (status === 'error' && errorFallback) {
    return errorFallback
  }

  return <img src={src} alt={alt} {...otherProps} />
})

AppImage.displayName = 'AppImage'
