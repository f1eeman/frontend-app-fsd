import {
  Label as HListBoxLabel,
  Listbox as HListBox,
  ListboxButton as HListBoxButton,
  ListboxOption as HListBoxOption,
  ListboxOptions as HListBoxOptions,
} from '@headlessui/react'
import { type FC, type ReactNode, Fragment } from 'react'
import cls from './ListBox.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/button/Button'
import { HStack } from '@/shared/ui/stack'

export interface ListBoxItem {
  value: string
  content: ReactNode
  disabled?: boolean
}

type DropdownDirection =
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'

interface ListBoxProps {
  items?: ListBoxItem[]
  className?: string
  value?: string
  defaultValue?: string
  onChange: (value: string) => void
  readonly?: boolean
  direction?: DropdownDirection
  label?: string
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cls.optionsBottomLeft,
  'bottom right': cls.optionsBottomRight,
  'top right': cls.optionsTopRight,
  'top left': cls.optionsTopLeft,
}

export const ListBox: FC<ListBoxProps> = (props) => {
  const {
    className = '',
    items,
    value,
    defaultValue,
    onChange,
    readonly = false,
    direction = 'bottom right',
    label,
  } = props

  const optionsClasses = [mapDirectionClass[direction]]

  return (
    <HListBox
      disabled={readonly}
      as='div'
      className={classNames(cls.ListBox, {}, [className])}
      value={value}
      onChange={onChange}
    >
      <HStack gap='4'>
        {label && (
          <HListBoxLabel className={cls.label}>{`${label}>`}</HListBoxLabel>
        )}
        <div className={cls.dropdown}>
          <HListBoxButton as={Button} disabled={readonly}>
            {value ?? defaultValue}
          </HListBoxButton>
          <HListBoxOptions
            as='ul'
            transition
            className={classNames(cls.options, {}, optionsClasses)}
          >
            {items?.map((item) => (
              <HListBoxOption
                key={item.value}
                value={item.value}
                disabled={item.disabled}
                as={Fragment}
              >
                {({ focus }) => (
                  <li
                    className={classNames(cls.item, {
                      [cls.focused]: focus,
                      [cls.disabled]: item.disabled ?? false,
                    })}
                  >
                    {item.content}
                  </li>
                )}
              </HListBoxOption>
            ))}
          </HListBoxOptions>
        </div>
      </HStack>
    </HListBox>
  )
}
