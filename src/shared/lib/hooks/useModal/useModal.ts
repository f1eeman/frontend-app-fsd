import { useCallback, useEffect, useRef, useState } from 'react'
import { useEscapeKey } from '../useEscapeKey/useEscapeKey'

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

  useEscapeKey(isOpen, close)

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
