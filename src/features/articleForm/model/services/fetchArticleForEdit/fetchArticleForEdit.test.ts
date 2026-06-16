import { fetchArticleForEdit } from './fetchArticleForEdit'
import { ArticleType } from '@/entities/article'
import { TestAsyncThunk } from '@/shared/lib/tests/async.thunk.tests'
import type { Article } from '@/entities/article'

const mockArticle: Article = {
  id: '1',
  title: 'Test Article',
  subtitle: '',
  img: '',
  views: 0,
  createdAt: '',
  type: [ArticleType.IT],
  blocks: [],
  user: { id: '1', username: 'admin' },
}

describe('fetchArticleForEdit', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk<Article, string, string>(
      fetchArticleForEdit,
    )
    thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticle }))

    const result = await thunk.callThunk('1')

    expect(thunk.api.get).toHaveBeenCalledWith('/articles/1', {
      params: { _expand: 'user' },
    })
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(mockArticle)
  })

  test('reject when response has no data', async () => {
    const thunk = new TestAsyncThunk<Article, string, string>(
      fetchArticleForEdit,
    )
    thunk.api.get.mockReturnValue(Promise.resolve({ data: undefined }))

    const result = await thunk.callThunk('1')

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })

  test('reject on api error', async () => {
    const thunk = new TestAsyncThunk<Article, string, string>(
      fetchArticleForEdit,
    )
    thunk.api.get.mockReturnValue(Promise.reject(new Error('network')))

    const result = await thunk.callThunk('1')

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })
})
