import { lazy, Suspense } from 'react'
import { ARTICLE_RATING_HEIGHT } from './consts'
import { Skeleton } from '@/shared/ui/skeleton/Skeleton'
import type { ArticleRatingProps } from './ArticleRating'

const ArticleRatingLazy = lazy(() => import('./ArticleRating'))

export const ArticleRatingAsync = (props: ArticleRatingProps) => (
  <Suspense fallback={<Skeleton width='100%' height={ARTICLE_RATING_HEIGHT} />}>
    <ArticleRatingLazy {...props} />
  </Suspense>
)
