import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { Fragment } from 'react'
import { mapDirectionClass } from '../../styles/consts'
import popupCls from '../../styles/popup.module.scss'
import cls from './Dropdown.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink } from '@/shared/ui'
import type { ReactNode } from 'react'
import type { DropdownDirection } from '../../styles/types'

export interface DropdownItem {
  disabled?: boolean
  content?: ReactNode
  onClick?: () => void
  href?: string
}

interface DropdownProps {
  className?: string
  items: DropdownItem[]
  direction?: DropdownDirection
  trigger: ReactNode
}

export const Dropdown = (props: DropdownProps) => {
  const { className = '', trigger, items, direction = 'bottom right' } = props

  const menuClasses = [mapDirectionClass[direction]]

  return (
    <Menu as='div' className={classNames('', {}, [className, popupCls.popup])}>
      <MenuButton className={popupCls.trigger}>{trigger}</MenuButton>
      <MenuItems className={classNames(cls.menu, {}, menuClasses)}>
        {items.map((item, index) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              type='button'
              disabled={item.disabled}
              onClick={item.onClick}
              className={classNames(cls.item, { [popupCls.active]: active })}
            >
              {item.content}
            </button>
          )

          if (item.href) {
            return (
              <MenuItem
                as={AppLink}
                to={item.href}
                disabled={item.disabled}
                key={item.href}
              >
                {content}
              </MenuItem>
            )
          }

          return (
            <MenuItem as={Fragment} disabled={item.disabled} key={index}>
              {content}
            </MenuItem>
          )
        })}
      </MenuItems>
    </Menu>
  )
}
