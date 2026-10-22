import { memo } from 'react'
import cls from './Card.module.scss'
import { CardTheme } from './consts'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
  theme?: CardTheme
  fullWidth?: boolean
}

export const Card = memo((props: CardProps) => {
  const {
    className = '',
    children,
    theme = CardTheme.NORMAL,
    fullWidth = false,
    ...otherProps
  } = props

  return (
    <div
      className={classNames(cls.Card, { [cls.fullWidth]: fullWidth }, [
        className,
        cls[theme],
      ])}
      {...otherProps}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card Component'
