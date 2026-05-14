import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import cls from './ArticleDetailsPage.module.scss'
import { ArticleDetails } from '@/entities/article'
import { classNames } from '@/shared/lib/classNames/classNames'

interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className = '' } = props
  const { t } = useTranslation('article-details')
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    )
  }

  return (
    <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      <ArticleDetails id={id} />
    </div>
  )
}

export default memo(ArticleDetailsPage)
