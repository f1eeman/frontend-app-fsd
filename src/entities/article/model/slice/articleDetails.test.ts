import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById'
import { type Article, ArticleType } from '../types/article'
import {
  articleDetailsReducer,
  articleDetailsSlice,
} from './articleDetailsSlice'
import type { ArticleDetailsSchema } from '../types/articleDetailsSchema'

const mockArticle: Article = {
  id: '1',
  title: 'subtitle',
  subtitle: '',
  img: '',
  views: 0,
  createdAt: '',
  type: [ArticleType.IT],
  blocks: [],
}

describe('articleDetails.test', () => {
  test('test fetchArticleById pending', () => {
    const state: Partial<ArticleDetailsSchema> = {
      isLoading: false,
      error: 'error',
    }
    expect(
      articleDetailsReducer(state as ArticleDetailsSchema, {
        type: fetchArticleById.pending.type,
      }),
    ).toEqual({ isLoading: true, error: undefined })
  })

  test('test fetchArticleById fulfilled', () => {
    const state: Partial<ArticleDetailsSchema> = { isLoading: true }
    expect(
      articleDetailsReducer(state as ArticleDetailsSchema, {
        type: fetchArticleById.fulfilled.type,
        payload: mockArticle,
      }),
    ).toEqual({ isLoading: false, data: mockArticle })
  })

  test('test fetchArticleById rejected', () => {
    const state: Partial<ArticleDetailsSchema> = { isLoading: true }
    expect(
      articleDetailsReducer(state as ArticleDetailsSchema, {
        type: fetchArticleById.rejected.type,
        payload: 'error',
      }),
    ).toEqual({ isLoading: false, error: 'error' })
  })

  describe('selectors', () => {
    const mockSelectors = articleDetailsSlice.selectors

    test('getArticleDetailsData should return data', () => {
      const state = {
        articleDetails: {
          isLoading: false,
          error: undefined,
          data: mockArticle,
        },
      }
      expect(mockSelectors.getArticleDetailsData(state)).toEqual(mockArticle)
    })

    test('selectError should return error', () => {
      const state = {
        articleDetails: {
          isLoading: false,
          error: 'error',
          data: undefined,
        },
      }
      expect(mockSelectors.selectError(state)).toBe('error')
    })

    test('selectIsLoading should return loading state', () => {
      const state = {
        articleDetails: {
          isLoading: true,
          error: undefined,
          data: undefined,
        },
      }
      expect(mockSelectors.selectIsLoading(state)).toBe(true)
    })

    test('selectors should work with initial state', () => {
      const state = {
        articleDetails: {
          isLoading: false,
          error: undefined,
          data: undefined,
        },
      }
      expect(mockSelectors.getArticleDetailsData(state)).toBe(undefined)
      expect(mockSelectors.selectError(state)).toBe(undefined)
      expect(mockSelectors.selectIsLoading(state)).toBe(false)
    })
  })
})
