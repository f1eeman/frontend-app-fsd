import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

export interface UseInfiniteScrollOptions {
  callback?: () => void
  triggerRef: RefObject<HTMLElement | null>
  wrapperRef: RefObject<HTMLElement | null>
  isLoading?: boolean
}

export function useInfiniteScroll({
  callback,
  wrapperRef,
  triggerRef,
  isLoading,
}: UseInfiniteScrollOptions) {
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const wrapperElement = wrapperRef.current
    const triggerElement = triggerRef.current

    if (callback && triggerElement) {
      const options = {
        root: wrapperElement,
        rootMargin: '0px',
        threshold: 1.0,
      }

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback()
        }
      }, options)

      observer.current.observe(triggerElement)
    }

    return () => {
      if (observer.current && triggerElement) {
        observer.current.unobserve(triggerElement)
      }
    }
  }, [callback, triggerRef, wrapperRef])

  // After loading completes, re-observe to check if trigger is still visible
  useEffect(() => {
    if (isLoading === false) {
      const triggerElement = triggerRef.current
      if (observer.current && triggerElement) {
        observer.current.unobserve(triggerElement)
        observer.current.observe(triggerElement)
      }
    }
  }, [isLoading, triggerRef])
}
