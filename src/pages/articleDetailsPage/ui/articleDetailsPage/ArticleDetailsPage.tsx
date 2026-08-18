import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import ArticleDetailsComments from '../articleDetailsComments/ArticleDetailsComments'
import { ArticleDetailsPageHeader } from '../articleDetailsPageHeader/ArticleDetailsPageHeader'
import cls from './ArticleDetailsPage.module.scss'
import { ArticleDetails } from '@/entities/article'
import { ArticleRecommendationList } from '@/features/articleRecommendationList'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/stack'
import { Page } from '@/widgets/page'

interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className = '' } = props
  const { t } = useTranslation('article-details')
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </Page>
    )
  }

  return (
    <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      <VStack gap={'16'} max>
        <ArticleDetailsPageHeader />
        <ArticleDetails id={id} />
        <ArticleRecommendationList />
        <ArticleDetailsComments id={id} />
      </VStack>
    </Page>
  )
}

export default memo(ArticleDetailsPage)
