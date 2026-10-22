import { useCallback, useEffect, useState } from 'react'
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
  const [wasOpen, setWasOpen] = useState(isOpen)

  if (isOpen && !isMounted) {
    setIsMounted(true)
  }

  if (isOpen !== wasOpen) {
    setWasOpen(isOpen)
    setIsClosing(!isOpen)
  }

  useEffect(() => {
    if (!isClosing) {
      return undefined
    }

    const timer = setTimeout(() => {
      setIsClosing(false)
    }, animationDelay)

    return () => {
      clearTimeout(timer)
    }
  }, [isClosing, animationDelay])

  const close = useCallback(() => {
    if (isOpen) {
      onClose?.()
    }
  }, [isOpen, onClose])

  useEscapeKey(isOpen, close)

  return { isClosing, isMounted, close }
}
