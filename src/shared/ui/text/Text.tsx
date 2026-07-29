import { memo } from 'react'
import { TextTheme, TextAlign, TextSize, mapSizeToHtag } from './consts'
import cls from './Text.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { Mods } from '@/shared/lib/classNames/classNames'

interface TextProps {
  className?: string
  title?: string
  text?: string
  theme?: TextTheme
  align?: TextAlign
  size?: TextSize
}

export const Text = memo<TextProps>((props) => {
  const {
    className = '',
    text,
    title,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
    size = TextSize.M,
  } = props

  const mods: Mods = {
    [cls[theme]]: true,
    [cls[align]]: true,
    [cls[size]]: true,
  }

  const HTag = mapSizeToHtag[size]

  return (
    <div className={classNames(cls.text, mods, [className])}>
      {title && <HTag className={cls.title}>{title}</HTag>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  )
})

Text.displayName = 'Text'
