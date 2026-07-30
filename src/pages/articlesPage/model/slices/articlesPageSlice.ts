import {
  createEntityAdapter,
  createSlice,
  type PayloadAction,
  type WithSlice,
} from '@reduxjs/toolkit'
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList'
import { rootReducer } from '@/app/store'
import { ArticleSortField, ArticleType, ArticleView } from '@/entities/article'
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage'
import type { ArticlesPageSchema } from '../types/articlesPageSchema'
import type { RootState } from '@/app/store'
import type { Article } from '@/entities/article'
import type { SortOrder } from '@/shared/types'

const articlesAdapter = createEntityAdapter<Article, Article['id']>({
  selectId: (article) => article.id,
})

const articlesPageSlice = createSlice({
  name: 'articlesPage',
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    isLoading: false,
    error: undefined,
    page: 1,
    hasMore: true,
    ids: [],
    entities: {},
    view: ArticleView.SMALL,
    _inited: false,
    sort: ArticleSortField.CREATED,
    search: '',
    order: 'asc',
    type: ArticleType.ALL,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload)
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    initState: (state) => {
      const view = localStorage.getItem(
        ARTICLES_VIEW_LOCALSTORAGE_KEY,
      ) as ArticleView
      state.view = view
      state.limit = view === ArticleView.BIG ? 4 : 9
      state._inited = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state, action) => {
        state.error = undefined
        state.isLoading = true
        if (action.meta.arg.replace) {
          articlesAdapter.removeAll(state)
        }
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        state.isLoading = false
        state.hasMore = action.payload.length >= (state.limit ?? 9)

        if (action.meta.arg.replace) {
          articlesAdapter.setAll(state, action.payload)
        } else {
          articlesAdapter.addMany(state, action.payload)
        }
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
  selectors: {
    getArticlesPageNum: (state) => state?.page || 1,
    getArticlesPageLimit: (state) => state?.limit || 9,
    getArticlesPageHasMore: (state) => state?.hasMore,
    getArticlesPageIsLoading: (state) => state.isLoading ?? false,
    getArticlesPageError: (state) => state.error,
    getArticlesPageView: (state) => state.view ?? ArticleView.SMALL,
    getArticlesPageInited: (state) => state._inited ?? false,
    getArticlesPageOrder: (state) => state.order ?? 'asc',
    getArticlesPageSort: (state) => state.sort ?? ArticleSortField.CREATED,
    getArticlesPageSearch: (state) => state.search ?? '',
    getArticlesPageType: (state) => state.type ?? ArticleType.ALL,
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
  getArticlesPageNum,
  getArticlesPageLimit,
  getArticlesPageHasMore,
  getArticlesPageInited,
  getArticlesPageOrder,
  getArticlesPageSort,
  getArticlesPageSearch,
  getArticlesPageType,
} = withArticlesPageSlice.selectors

declare module '@/app/store' {
  export interface LazyLoadedSlices
    extends WithSlice<typeof articlesPageSlice> {}
}
