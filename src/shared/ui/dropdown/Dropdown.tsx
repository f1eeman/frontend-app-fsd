import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { Fragment } from 'react'
import cls from './Dropdown.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink } from '@/shared/ui'
import type { ReactNode } from 'react'

export interface DropdownItem {
  disabled?: boolean
  content?: ReactNode
  onClick?: () => void
  href?: string
}

export type DropdownDirection =
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'

interface DropdownProps {
  className?: string
  items: DropdownItem[]
  direction?: DropdownDirection
  trigger: ReactNode
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cls.optionsBottomLeft,
  'bottom right': cls.optionsBottomRight,
  'top right': cls.optionsTopRight,
  'top left': cls.optionsTopLeft,
}

export const Dropdown = (props: DropdownProps) => {
  const { className = '', trigger, items, direction = 'bottom right' } = props

  const menuClasses = [mapDirectionClass[direction]]

  return (
    <Menu as='div' className={classNames(cls.Dropdown, {}, [className])}>
      <MenuButton className={cls.btn}>{trigger}</MenuButton>
      <MenuItems className={classNames(cls.menu, {}, menuClasses)}>
        {items.map((item, index) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              type='button'
              disabled={item.disabled}
              onClick={item.onClick}
              className={classNames(cls.item, { [cls.active]: active })}
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
