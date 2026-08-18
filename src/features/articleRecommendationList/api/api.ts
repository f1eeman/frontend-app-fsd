import { baseRtkApi } from '@/shared/api/rtkApi'
import type { Article } from '@/entities/article'

const recommendationApi = baseRtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleList: build.query<Article[], number>({
      query: (limit) => ({
        url: '/articles',
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
})

export const useArticleRecommendationList =
  recommendationApi.useGetArticleListQuery
