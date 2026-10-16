import { useState, useRef, useEffect, useCallback } from 'react'
import cls from './Modal.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Overlay } from '@/shared/ui/overlay/Overlay'
import { Portal, type PortalProps } from '@/shared/ui/portal/Portal'
import type { FC, ReactNode, MouseEvent } from 'react'

interface ModalProps extends Pick<PortalProps, 'elementId' | 'element'> {
  className?: string
  children: ReactNode
  isOpen: boolean
  onClose: VoidFunction
  lazy?: boolean
}

const ANIMATION_DURATION = 300

export const Modal: FC<ModalProps> = (props) => {
  const {
    children,
    className = '',
    isOpen,
    onClose,
    element,
    elementId,
    lazy = false,
  } = props

  const [isClosing, setIsClosing] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(isOpen)
  const timerID = useRef<ReturnType<typeof setTimeout> | null>(null)

  if (isOpen && !isMounted) {
    setIsMounted(true)
  }

  const handleClose = useCallback(
    (e?: MouseEvent<HTMLDivElement>): void => {
      if (timerID.current) {
        clearTimeout(timerID.current)
      }
      e?.stopPropagation()
      setIsClosing(true)
      timerID.current = setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, ANIMATION_DURATION)
    },
    [onClose],
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        handleClose()
      }
    },
    [handleClose],
  )

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }
    return () => {
      if (timerID.current) {
        clearTimeout(timerID.current)
      }
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

  if (lazy && !isMounted) {
    return null
  }

  return (
    <Portal element={element} elementId={elementId}>
      <div
        className={classNames(
          cls.modal,
          {
            [cls.opened]: isOpen,
            [cls.closed]: isClosing,
          },
          [className],
        )}
      >
        <Overlay onClick={handleClose} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  )
}
