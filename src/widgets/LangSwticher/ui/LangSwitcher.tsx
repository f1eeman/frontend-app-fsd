import { useTranslation } from 'react-i18next'
import * as cls from './LangSwitcher.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/Button/Button'
import type { FC } from 'react'

interface LangSwitcherProps {
  className?: string
  short?: boolean
}

export const LangSwitcher: FC<LangSwitcherProps> = ({
  className = '',
  short,
}) => {
  const { t, i18n } = useTranslation()

  const toggle = (): void => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }

  return (
    <Button
      className={classNames(cls.switcher, {}, [className])}
      theme={'clear-inverted'}
      onClick={toggle}
    >
      {t(`${short ? 'Язык короткая версия' : 'Язык'}`)}
    </Button>
  )
}
