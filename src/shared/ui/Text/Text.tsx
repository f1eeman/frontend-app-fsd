import { memo } from 'react'
import { TextTheme } from './consts'
import cls from './Text.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

interface TextProps {
  className?: string
  title?: string
  text?: string
  theme?: TextTheme
}

export const Text = memo<TextProps>((props) => {
  const { className = '', text, title, theme = TextTheme.PRIMARY } = props

  return (
    <div className={classNames(cls.text, { [cls[theme]]: true }, [className])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  )
})

Text.displayName = 'Text'
