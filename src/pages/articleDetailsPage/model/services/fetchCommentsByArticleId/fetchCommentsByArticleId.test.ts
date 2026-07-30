import { fetchCommentsByArticleId } from './fetchCommentsByArticleId'
import { TestAsyncThunk } from '@/shared/lib/tests/async.thunk.tests'
import type { Comment } from '@/entities/comment'

const comments: Comment[] = [
  {
    id: '1',
    text: 'comment 1',
    user: { id: '1', username: 'admin' },
  },
]

describe('fetchCommentsByArticleId.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk<Comment[], string | undefined, string>(
      fetchCommentsByArticleId,
    )
    thunk.api.get.mockReturnValue(Promise.resolve({ data: comments }))

    const result = await thunk.callThunk('1')

    expect(thunk.api.get).toHaveBeenCalledWith('/comments', {
      params: { articleId: '1', _expand: 'user' },
    })
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(comments)
  })

  test('reject when articleId is missing', async () => {
    const thunk = new TestAsyncThunk<Comment[], string | undefined, string>(
      fetchCommentsByArticleId,
    )

    const result = await thunk.callThunk(undefined as unknown as string)

    expect(thunk.api.get).not.toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })

  test('reject on api error', async () => {
    const thunk = new TestAsyncThunk<Comment[], string | undefined, string>(
      fetchCommentsByArticleId,
    )
    thunk.api.get.mockReturnValue(Promise.reject(new Error('network')))

    const result = await thunk.callThunk('1')

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })
})
