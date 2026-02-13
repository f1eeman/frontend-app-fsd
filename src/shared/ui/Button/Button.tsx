import cls from './Button.module.scss'
import type { ButtonHTMLAttributes, FC } from 'react'
import type { ButtonSize, ButtonTheme } from './consts'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ButtonTheme
  size?: ButtonSize
  square?: boolean
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    disabled = false,
    className = '',
    children,
    theme = 'clear',
    square = false,
    size = 'size-m',
    ...otherProps
  } = props

  return (
    <button
      type={'button'}
      disabled={disabled}
      className={`${cls.button} ${cls[theme]} ${cls[size]} ${square ? cls.square : ''} ${className}`}
      {...otherProps}
    >
      {children}
    </button>
  )
}
