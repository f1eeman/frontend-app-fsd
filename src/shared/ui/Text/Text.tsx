import { memo } from 'react'
import { TextTheme, TextAlign } from './consts'
import cls from './Text.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { Mods } from '@/shared/lib/classNames/classNames'

interface TextProps {
  className?: string
  title?: string
  text?: string
  theme?: TextTheme
  align?: TextAlign
}

export const Text = memo<TextProps>((props) => {
  const {
    className = '',
    text,
    title,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
  } = props

  const mods: Mods = {
    [cls[theme]]: true,
    [cls[align]]: true,
  }

  return (
    <div className={classNames(cls.text, mods, [className])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  )
})

Text.displayName = 'Text'
