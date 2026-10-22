import cls from './Button.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { ButtonHTMLAttributes, FC } from 'react'
import type { ButtonSize, ButtonTheme } from './consts'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ButtonTheme
  size?: ButtonSize
  square?: boolean
  fullWidth?: boolean
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    disabled = false,
    className = '',
    children,
    theme = 'clear',
    square = false,
    fullWidth = false,
    size = 'size-m',
    ...otherProps
  } = props

  return (
    <button
      type={'button'}
      disabled={disabled}
      className={classNames(
        cls.button,
        {
          [cls[theme]]: true,
          [cls[size]]: true,
          [cls.square]: square,
          [cls.fullWidth]: fullWidth,
        },
        [className],
      )}
      {...otherProps}
    >
      {children}
    </button>
  )
}
