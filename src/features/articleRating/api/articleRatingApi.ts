import { baseRtkApi } from '@/shared/api/rtkApi'
import type { Rating } from '@/entities/rating'

interface GetArticleRatingArg {
  userId: string
  articleId: string
}

interface RateArticleArg {
  userId: string
  articleId: string
  rate: number
  feedback?: string
}

const ARTICLE_RATING_TAG = 'ArticleRating'

const articleRatingApi = baseRtkApi
  .enhanceEndpoints({ addTagTypes: [ARTICLE_RATING_TAG] })
  .injectEndpoints({
    endpoints: (build) => ({
      getArticleRating: build.query<Rating[], GetArticleRatingArg>({
        query: ({ articleId, userId }) => ({
          url: '/article-ratings',
          params: {
            userId,
            articleId,
          },
        }),
        providesTags: (_result, _error, { articleId }) => [
          { type: ARTICLE_RATING_TAG, id: articleId },
        ],
      }),
      rateArticle: build.mutation<void, RateArticleArg>({
        query: (arg) => ({
          url: '/article-ratings',
          method: 'POST',
          body: arg,
        }),
        invalidatesTags: (_result, _error, { articleId }) => [
          { type: ARTICLE_RATING_TAG, id: articleId },
        ],
      }),
    }),
  })

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery
export const useRateArticle = articleRatingApi.useRateArticleMutation
