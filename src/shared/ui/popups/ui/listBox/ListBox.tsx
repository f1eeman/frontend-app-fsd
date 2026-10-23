import {
  Label as HListBoxLabel,
  Listbox as HListBox,
  ListboxButton as HListBoxButton,
  ListboxOption as HListBoxOption,
  ListboxOptions as HListBoxOptions,
} from '@headlessui/react'
import { type ReactNode, Fragment } from 'react'
import { mapDirectionClass } from '../../styles/consts'
import popupCls from '../../styles/popup.module.scss'
import cls from './ListBox.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/button/Button'
import { HStack } from '@/shared/ui/stack'

export interface ListBoxItem<T extends string> {
  value: T
  content: ReactNode
  disabled?: boolean
}

type DropdownDirection =
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'

interface ListBoxProps<T extends string> {
  items?: ListBoxItem<T>[]
  className?: string
  value?: T
  defaultValue?: string
  onChange?: (value: T) => void
  readonly?: boolean
  direction?: DropdownDirection
  label?: string
}

export const ListBox = <T extends string>(props: ListBoxProps<T>) => {
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
      className={classNames('', {}, [className, popupCls.popup])}
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
                      [popupCls.focused]: focus,
                      [popupCls.disabled]: item.disabled ?? false,
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
