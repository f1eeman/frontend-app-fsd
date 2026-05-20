import {
  createEntityAdapter,
  createSlice,
  type WithSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList'
import { rootReducer } from '@/app/store'
import { ArticleView } from '@/entities/article/model/types/article'
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage'
import type { ArticlesPageSchema } from '../types/articlesPageSchema'
import type { RootState } from '@/app/store'
import type { Article } from '@/entities/article'

const articlesAdapter = createEntityAdapter<Article, Article['id']>({
  selectId: (article) => article.id,
})

const articlesPageSlice = createSlice({
  name: 'articlesPage',
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
    view: ArticleView.SMALL,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload)
    },
    initState: (state) => {
      state.view = localStorage.getItem(
        ARTICLES_VIEW_LOCALSTORAGE_KEY,
      ) as ArticleView
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(
        fetchArticlesList.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.isLoading = false
          articlesAdapter.setAll(state, action.payload)
        },
      )
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
  selectors: {
    getArticlesPageIsLoading: (state) => state.isLoading ?? false,
    getArticlesPageError: (state) => state.error,
    getArticlesPageView: (state) => state.view ?? ArticleView.SMALL,
  },
})

export const { actions: articlesPageActions } = articlesPageSlice
export const { reducer: articlesPageReducer } = articlesPageSlice
export const withArticlesPageSlice = articlesPageSlice.injectInto(rootReducer)

const initialArticlesState = articlesAdapter.getInitialState()

export const getArticles = articlesAdapter.getSelectors(
  (state: RootState) => state.articlesPage ?? initialArticlesState,
)

export const {
  getArticlesPageIsLoading,
  getArticlesPageError,
  getArticlesPageView,
} = withArticlesPageSlice.selectors

declare module '@/app/store' {
  export interface LazyLoadedSlices
    extends WithSlice<typeof articlesPageSlice> {}
}
