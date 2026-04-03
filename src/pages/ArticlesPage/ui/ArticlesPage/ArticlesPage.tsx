import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './ArticlesPage.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className = '' } = props
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      {t('ARTICLES PAGE')}
    </div>
  )
}

export default memo(ArticlesPage)
