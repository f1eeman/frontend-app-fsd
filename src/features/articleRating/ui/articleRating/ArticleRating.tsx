import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi'
import { ARTICLE_RATING_HEIGHT } from './consts'
import { RatingCard } from '@/entities/rating'
import { getUserAuthData } from '@/entities/user'
import { Skeleton } from '@/shared/ui/skeleton/Skeleton'

export interface ArticleRatingProps {
  className?: string
  articleId: string
}

const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className, articleId } = props
  const { t } = useTranslation()
  const userData = useSelector(getUserAuthData)
  const userId = userData?.id ?? ''

  const { data, isLoading } = useGetArticleRating(
    { articleId, userId },
    { skip: !userData },
  )
  const [rateArticle] = useRateArticle()

  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      void rateArticle({ userId, articleId, rate: starsCount, feedback })
    },
    [articleId, rateArticle, userId],
  )

  if (!userData) {
    return null
  }

  if (isLoading) {
    return <Skeleton width='100%' height={ARTICLE_RATING_HEIGHT} />
  }

  return (
    <RatingCard
      onAccept={onAccept}
      rate={data?.[0]?.rate}
      className={className}
      title={t('Оцените статью')}
      feedbackTitle={t(
        'Оставьте свой отзыв о статье, это поможет улучшить качество',
      )}
      hasFeedback
    />
  )
})

ArticleRating.displayName = 'ArticleRating Component'

export default ArticleRating
