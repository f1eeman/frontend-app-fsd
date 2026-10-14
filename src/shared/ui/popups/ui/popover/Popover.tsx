import {
  Popover as HPopover,
  PopoverButton as HPopoverButton,
  PopoverPanel as HPopoverPanel,
} from '@headlessui/react'
import { mapDirectionClass } from '../../styles/consts'
import popupCls from '../../styles/popup.module.scss'
import cls from './Popover.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { ReactNode } from 'react'
import type { DropdownDirection } from '../../styles/types'

interface PopoverProps {
  className?: string
  direction?: DropdownDirection
  trigger: ReactNode
  children: ReactNode
}

export function Popover(props: PopoverProps) {
  const {
    className = '',
    trigger,
    direction = 'bottom right',
    children,
  } = props

  const menuClasses = [mapDirectionClass[direction]]

  return (
    <HPopover
      className={classNames(cls.Popover, {}, [className, popupCls.popup])}
    >
      <HPopoverButton className={popupCls.trigger}>{trigger}</HPopoverButton>

      <HPopoverPanel className={classNames(cls.panel, {}, menuClasses)}>
        {children}
      </HPopoverPanel>
    </HPopover>
  )
}
