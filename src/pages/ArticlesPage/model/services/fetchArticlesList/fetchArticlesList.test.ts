import { fetchArticlesList } from './fetchArticlesList'
import {
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

const stateWithLimit = {
  articlesPage: {
    limit: 9,
    view: ArticleView.SMALL,
    ids: [],
    entities: {},
    page: 1,
    hasMore: true,
  },
}

describe('fetchArticlesList.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk<Article[], { page?: number }, string>(
      fetchArticlesList,
      stateWithLimit,
    )
    thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticles }))

    const result = await thunk.callThunk({ page: 1 })

    expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
      params: { _expand: 'user', _limit: 9, _page: 1 },
    })
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(mockArticles)
  })

  test('reject when response has no data', async () => {
    const thunk = new TestAsyncThunk<Article[], { page?: number }, string>(
      fetchArticlesList,
      stateWithLimit,
    )
    thunk.api.get.mockReturnValue(Promise.resolve({ data: undefined }))

    const result = await thunk.callThunk({ page: 1 })

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })

  test('reject on api error', async () => {
    const thunk = new TestAsyncThunk<Article[], { page?: number }, string>(
      fetchArticlesList,
      stateWithLimit,
    )
    thunk.api.get.mockReturnValue(Promise.reject(new Error('network')))

    const result = await thunk.callThunk({ page: 1 })

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })
})
