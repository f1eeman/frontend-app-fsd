import {
  createEntityAdapter,
  createSlice,
  type WithSlice,
} from '@reduxjs/toolkit'
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations'
import { rootReducer, type RootState } from '@/app/store'
import type { ArticleDetailsRecommendationsSchema } from '../types/ArticleDetailsRecommendationsSchema'
import type { Article } from '@/entities/article'

const recommendationsAdapter = createEntityAdapter<Article, Article['id']>({
  selectId: (article) => article.id,
})

const articleDetailsPageRecommendationsSlice = createSlice({
  name: 'articleDetailsPageRecommendations',
  initialState:
    recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>(
      {
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
      },
    ),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
        state.isLoading = false
        recommendationsAdapter.setAll(state, action.payload)
      })
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
  },
})

export const { reducer: articleDetailsPageRecommendationsReducer } =
  articleDetailsPageRecommendationsSlice
export const withArticleDetailsPageRecommendations =
  articleDetailsPageRecommendationsSlice.injectInto(rootReducer)

const initialRecommendationsState = recommendationsAdapter.getInitialState()

export const getArticleRecommendations = recommendationsAdapter.getSelectors(
  (state: RootState) =>
    state.articleDetailsPageRecommendations ?? initialRecommendationsState,
)

export const { selectIsLoading, selectError } =
  withArticleDetailsPageRecommendations.selectors

declare module '@/app/store' {
  export interface LazyLoadedSlices
    extends WithSlice<typeof articleDetailsPageRecommendationsSlice> {}
}
