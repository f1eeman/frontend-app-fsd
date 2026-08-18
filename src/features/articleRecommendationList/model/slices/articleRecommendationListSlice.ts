import {
  createSlice,
  type PayloadAction,
  type WithSlice,
} from '@reduxjs/toolkit'
import { rootReducer } from '@/app/store'
import type { ArticleRecommendationListSchema } from '../types/articleRecommendationListSchema'

const initialState: ArticleRecommendationListSchema = {
  isLoading: false,
}

const articleRecommendationListSlice = createSlice({
  name: 'articleRecommendationList',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
  },
})

export const withArticleRecommendationListSlice =
  articleRecommendationListSlice.injectInto(rootReducer)
export const { actions: articleRecommendationListActions } =
  articleRecommendationListSlice
export const { reducer: articleRecommendationListReducer } =
  articleRecommendationListSlice
export const { selectIsLoading, selectError } =
  withArticleRecommendationListSlice.selectors

declare module '@/app/store' {
  export interface LazyLoadedSlices
    extends WithSlice<typeof articleRecommendationListSlice> {}
}
