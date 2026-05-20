import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList'
import {
  articlesPageActions,
  articlesPageReducer,
  getArticles,
  withArticlesPageSlice,
} from './articlesPageSlice'
import {
  ArticleType,
  ArticleView,
} from '@/entities/article/model/types/article'
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage'
import type { ArticlesPageSchema } from '../types/articlesPageSchema'
import type { RootState } from '@/app/store'
import type { Article } from '@/entities/article'

const mockArticle: Article = {
  id: '1',
  title: 'Test Article',
  subtitle: 'subtitle',
  img: '',
  views: 0,
  createdAt: '',
  type: [ArticleType.IT],
  blocks: [],
  user: { id: '1', username: 'admin' },
}

describe('articlesPageSlice.test', () => {
  describe('reducer', () => {
    test('fetchArticlesList pending sets isLoading=true and clears error', () => {
      const state: Partial<ArticlesPageSchema> = {
        isLoading: false,
        error: 'old error',
      }
      expect(
        articlesPageReducer(state as ArticlesPageSchema, {
          type: fetchArticlesList.pending.type,
        }),
      ).toMatchObject({ isLoading: true, error: undefined })
    })

    test('fetchArticlesList fulfilled sets articles and isLoading=false', () => {
      const state: Partial<ArticlesPageSchema> = {
        isLoading: true,
        ids: [],
        entities: {},
      }
      const result = articlesPageReducer(state as ArticlesPageSchema, {
        type: fetchArticlesList.fulfilled.type,
        payload: [mockArticle],
      })
      expect(result.isLoading).toBe(false)
      expect(result.ids).toEqual(['1'])
      expect(result.entities['1']).toEqual(mockArticle)
    })

    test('fetchArticlesList rejected sets error and isLoading=false', () => {
      const state: Partial<ArticlesPageSchema> = { isLoading: true }
      expect(
        articlesPageReducer(state as ArticlesPageSchema, {
          type: fetchArticlesList.rejected.type,
          payload: 'error',
        }),
      ).toMatchObject({ isLoading: false, error: 'error' })
    })

    test('setView updates view and persists to localStorage', () => {
      const state: Partial<ArticlesPageSchema> = { view: ArticleView.SMALL }
      articlesPageReducer(
        state as ArticlesPageSchema,
        articlesPageActions.setView(ArticleView.BIG),
      )
      expect(localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY)).toBe(
        ArticleView.BIG,
      )
    })

    test('initState sets BIG view and limit=4 from localStorage', () => {
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, ArticleView.BIG)
      const state: Partial<ArticlesPageSchema> = { view: ArticleView.SMALL }
      const result = articlesPageReducer(
        state as ArticlesPageSchema,
        articlesPageActions.initState(),
      )
      expect(result.view).toBe(ArticleView.BIG)
      expect(result.limit).toBe(4)
    })

    test('initState sets SMALL view and limit=9 from localStorage', () => {
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, ArticleView.SMALL)
      const state: Partial<ArticlesPageSchema> = { view: ArticleView.BIG }
      const result = articlesPageReducer(
        state as ArticlesPageSchema,
        articlesPageActions.initState(),
      )
      expect(result.view).toBe(ArticleView.SMALL)
      expect(result.limit).toBe(9)
    })
  })

  describe('selectors', () => {
    const mockSelectors = withArticlesPageSlice.selectors

    test('getArticlesPageIsLoading returns isLoading', () => {
      const state = {
        articlesPage: {
          isLoading: true,
          ids: [],
          entities: {},
          view: ArticleView.SMALL,
          page: 1,
          hasMore: true,
        },
      }
      expect(mockSelectors.getArticlesPageIsLoading(state)).toBe(true)
    })

    test('getArticlesPageIsLoading returns false as default', () => {
      const state = {
        articlesPage: {
          isLoading: undefined,
          ids: [],
          entities: {},
          view: ArticleView.SMALL,
          page: 1,
          hasMore: true,
        },
      }
      expect(mockSelectors.getArticlesPageIsLoading(state)).toBe(false)
    })

    test('getArticlesPageError returns error', () => {
      const state = {
        articlesPage: {
          error: 'some error',
          ids: [],
          entities: {},
          view: ArticleView.SMALL,
          page: 1,
          hasMore: true,
        },
      }
      expect(mockSelectors.getArticlesPageError(state)).toBe('some error')
    })

    test('getArticlesPageView returns view', () => {
      const state = {
        articlesPage: {
          view: ArticleView.BIG,
          ids: [],
          entities: {},
          page: 1,
          hasMore: true,
        },
      }
      expect(mockSelectors.getArticlesPageView(state)).toBe(ArticleView.BIG)
    })

    test('getArticlesPageView returns SMALL as default', () => {
      const state = {
        articlesPage: {
          view: undefined as unknown as ArticleView,
          ids: [],
          entities: {},
          page: 1,
          hasMore: true,
        },
      }
      expect(mockSelectors.getArticlesPageView(state)).toBe(ArticleView.SMALL)
    })
  })

  describe('getArticles entity selectors', () => {
    test('selectAll returns all articles', () => {
      const state = {
        articlesPage: {
          ids: ['1'],
          entities: { '1': mockArticle },
          isLoading: false,
          view: ArticleView.SMALL,
        },
      } as unknown as RootState

      expect(getArticles.selectAll(state)).toEqual([mockArticle])
    })

    test('selectById returns article by id', () => {
      const state = {
        articlesPage: {
          ids: ['1'],
          entities: { '1': mockArticle },
          isLoading: false,
          view: ArticleView.SMALL,
        },
      } as unknown as RootState

      expect(getArticles.selectById(state, '1')).toEqual(mockArticle)
    })

    test('selectAll returns empty array when articlesPage is undefined', () => {
      const state = {} as unknown as RootState
      expect(getArticles.selectAll(state)).toEqual([])
    })
  })
})
