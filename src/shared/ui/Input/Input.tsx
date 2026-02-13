import { memo, useEffect, useRef, useState } from 'react'
import cls from './Input.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { ChangeEventHandler, InputHTMLAttributes } from 'react'

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string
  onChange?: (value: string) => void
  autofocus?: boolean
}

export const Input = memo<InputProps>((props) => {
  const {
    className = '',
    value,
    onChange,
    type = 'text',
    placeholder,
    autofocus,
    ...otherProps
  } = props
  const ref = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(autofocus)
  const [caretPosition, setCaretPosition] = useState(0)

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(e.target.value)
    setCaretPosition(e.target.value.length)
  }

  const onBlur: VoidFunction = () => {
    setIsFocused(false)
  }

  const onFocus: VoidFunction = () => {
    setIsFocused(true)
  }

  const onSelect: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCaretPosition(e.target.selectionStart ?? 0)
  }

  useEffect(() => {
    if (autofocus) {
      ref.current?.focus()
    }
  }, [autofocus])

  return (
    <div className={classNames(cls.InputWrapper, {}, [className])}>
      {placeholder && (
        <div className={cls.placeholder}>{`${placeholder}>`}</div>
      )}
      <div className={cls.caretWrapper}>
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChangeHandler}
          className={cls.input}
          onFocus={onFocus}
          onBlur={onBlur}
          onSelect={onSelect}
          {...otherProps}
        />
        {isFocused && (
          <span
            className={cls.caret}
            style={{ left: `${caretPosition * 9}px` }}
          />
        )}
      </div>
    </div>
  )
})

Input.displayName = 'Input'
