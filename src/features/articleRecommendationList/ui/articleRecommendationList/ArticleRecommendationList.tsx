import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useArticleRecommendationList } from '../../api/api'
import { ArticleList } from '@/entities/article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/stack'
import { TextSize } from '@/shared/ui/text/consts'
import { Text } from '@/shared/ui/text/Text'

interface ArticleRecommendationListProps {
  className?: string
}

export const ArticleRecommendationList = memo(
  ({ className = '' }: ArticleRecommendationListProps) => {
    const { t } = useTranslation()
    const {
      data: list = [],
      isLoading,
      error,
    } = useArticleRecommendationList(3)

    if (error) return null
    return (
      <VStack gap={'8'} className={classNames('', {}, [className])}>
        {isLoading ? (
          t('Загрузка...')
        ) : (
          <>
            <Text size={TextSize.L} title={t('Рекомендуем')} />
            <ArticleList articles={list} target={'_blank'} />
          </>
        )}
      </VStack>
    )
  },
)

ArticleRecommendationList.displayName = 'ArticleRecommendationList'
