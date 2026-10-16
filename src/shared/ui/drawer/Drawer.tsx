import { memo } from 'react'
import cls from './Drawer.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Overlay } from '@/shared/ui/overlay/Overlay'
import { Portal } from '@/shared/ui/portal/Portal'
import type { ReactNode } from 'react'
import type { Mods } from '@/shared/lib/classNames/classNames'

interface DrawerProps {
  className?: string
  children: ReactNode
  isOpen?: boolean
  onClose?: () => void
}

export const Drawer = memo((props: DrawerProps) => {
  const { className = '', children, onClose, isOpen = false } = props

  const mods: Mods = {
    [cls.opened]: isOpen,
  }

  return (
    <Portal>
      <div className={classNames(cls.Drawer, mods, [className])}>
        <Overlay onClick={onClose} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  )
})

Drawer.displayName = 'Drawer Component'
