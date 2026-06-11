import { memo } from 'react'
import cls from './Card.module.scss'
import { CardTheme } from './consts'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
  theme?: CardTheme
}

export const Card = memo((props: CardProps) => {
  const {
    className = '',
    children,
    theme = CardTheme.NORMAL,
    ...otherProps
  } = props

  return (
    <div
      className={classNames(cls.Card, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card Component'
