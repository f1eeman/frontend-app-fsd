import { useCallback, useEffect, useRef, useState } from 'react'

interface UseModalProps {
  isOpen?: boolean
  onClose?: () => void
  animationDelay: number
}

export const useModal = (props: UseModalProps) => {
  const { isOpen = false, onClose, animationDelay } = props
  const [isClosing, setIsClosing] = useState(false)
  const [isMounted, setIsMounted] = useState(isOpen)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  if (isOpen && !isMounted) {
    setIsMounted(true)
  }

  const close = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    setIsClosing(true)
    timerRef.current = setTimeout(() => {
      onClose?.()
      setIsClosing(false)
    }, animationDelay)
  }, [animationDelay, onClose])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, close])

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    },
    [],
  )

  return { isClosing, isMounted, close }
}
