import { fetchArticlesList } from './fetchArticlesList'
import {
  ArticleSortField,
  ArticleType,
  ArticleView,
} from '@/entities/article/model/types/article'
import { TestAsyncThunk } from '@/shared/lib/tests/async.thunk.tests'
import type { Article } from '@/entities/article'

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Article 1',
    subtitle: '',
    img: '',
    views: 0,
    createdAt: '',
    type: [ArticleType.IT],
    blocks: [],
    user: { id: '1', username: 'admin' },
  },
]

type Arg = { replace?: boolean }

const defaultState = {
  articlesPage: {
    limit: 9,
    sort: ArticleSortField.CREATED,
    order: 'asc' as const,
    search: '',
    page: 1,
    type: ArticleType.ALL,
    view: ArticleView.SMALL,
    ids: [],
    entities: {},
    hasMore: true,
    _inited: true,
  },
}

describe('fetchArticlesList.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk<Article[], Arg, string>(
      fetchArticlesList,
      defaultState,
    )
    thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticles }))

    const result = await thunk.callThunk({ replace: true })

    expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
      params: {
        _expand: 'user',
        _limit: 9,
        _page: 1,
        _sort: ArticleSortField.CREATED,
        _order: 'asc',
        q: '',
        type: undefined,
      },
      signal: expect.any(AbortSignal),
    })
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(mockArticles)
  })

  test('passes sort, order, search and type filters from state', async () => {
    const thunk = new TestAsyncThunk<Article[], Arg, string>(
      fetchArticlesList,
      {
        articlesPage: {
          ...defaultState.articlesPage,
          sort: ArticleSortField.TITLE,
          order: 'desc',
          search: 'react',
          type: ArticleType.IT,
          page: 2,
        },
      },
    )
    thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticles }))

    await thunk.callThunk({})

    expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
      params: {
        _expand: 'user',
        _limit: 9,
        _page: 2,
        _sort: ArticleSortField.TITLE,
        _order: 'desc',
        q: 'react',
        type: ArticleType.IT,
      },
      signal: expect.any(AbortSignal),
    })
  })

  test('reject when response has no data', async () => {
    const thunk = new TestAsyncThunk<Article[], Arg, string>(
      fetchArticlesList,
      defaultState,
    )
    thunk.api.get.mockReturnValue(Promise.resolve({ data: undefined }))

    const result = await thunk.callThunk({})

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })

  test('reject on api error', async () => {
    const thunk = new TestAsyncThunk<Article[], Arg, string>(
      fetchArticlesList,
      defaultState,
    )
    thunk.api.get.mockReturnValue(Promise.reject(new Error('network')))

    const result = await thunk.callThunk({})

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })
})
