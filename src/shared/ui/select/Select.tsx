import { useMemo } from 'react'
import cls from './Select.module.scss'
import { HStack } from '@/shared/ui/stack'
import type { ChangeEvent } from 'react'

export interface SelectOption<T extends string> {
  value: T
  content: string
}

interface SelectProps<T extends string> {
  className?: string
  label?: string
  options?: SelectOption<T>[]
  value?: T
  onChange?: (value: T) => void
  readonly?: boolean
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  const { className = '', label, options, onChange, value, readonly } = props

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const option = options?.find((opt) => opt.value === e.target.value)
    if (option) {
      onChange?.(option.value)
    }
  }

  const optionsList = useMemo(
    () =>
      options?.map((opt) => (
        <option className={cls.option} value={opt.value} key={opt.value}>
          {opt.content}
        </option>
      )),
    [options],
  )

  return (
    <HStack align='stretch' className={className}>
      {label && <span className={cls.label}>{`${label}>`}</span>}
      <select
        disabled={readonly}
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
      >
        {optionsList}
      </select>
    </HStack>
  )
}
