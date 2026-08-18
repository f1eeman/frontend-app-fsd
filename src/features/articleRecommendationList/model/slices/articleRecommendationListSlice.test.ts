import {
  articleRecommendationListActions,
  articleRecommendationListReducer,
} from './articleRecommendationListSlice'
import type { ArticleRecommendationListSchema } from '../types/articleRecommendationListSchema'
import type { DeepPartial } from '@/shared/types'

describe('articleRecommendationListSlice.test', () => {
  test('setIsLoading updates isLoading', () => {
    const state: DeepPartial<ArticleRecommendationListSchema> = {
      isLoading: false,
    }

    expect(
      articleRecommendationListReducer(
        state as ArticleRecommendationListSchema,
        articleRecommendationListActions.setIsLoading(true),
      ),
    ).toEqual({ isLoading: true })
  })
})
