import { memo } from 'react'
import cls from './Drawer.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { Overlay } from '@/shared/ui/overlay/Overlay'
import { Portal } from '@/shared/ui/portal/Portal'
import type { ReactNode } from 'react'
import type { Mods } from '@/shared/lib/classNames/classNames'

interface DrawerProps {
  className?: string
  children: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}

const ANIMATION_DURATION = 300

export const Drawer = memo((props: DrawerProps) => {
  const {
    className = '',
    children,
    onClose,
    isOpen = false,
    lazy = false,
  } = props

  const { isClosing, isMounted, close } = useModal({
    isOpen,
    onClose,
    animationDelay: ANIMATION_DURATION,
  })

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.closed]: isClosing,
  }

  if (lazy && !isMounted) {
    return null
  }

  return (
    <Portal>
      <div className={classNames(cls.Drawer, mods, [className])}>
        <Overlay onClick={close} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  )
})

Drawer.displayName = 'Drawer Component'
