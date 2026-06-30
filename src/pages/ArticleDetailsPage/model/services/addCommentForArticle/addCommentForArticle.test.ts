import { addCommentForArticle } from './addCommentForArticle'
import { ArticleType } from '@/entities/article'
import AvatarImg from '@/shared/assets/tests/avatar.jpg'
import { TestAsyncThunk } from '@/shared/lib/tests/async.thunk.tests'
import type { Article } from '@/entities/article'
import type { Comment } from '@/entities/comment'

const article: Article = {
  id: '1',
  title: 'Test',
  subtitle: 'sub',
  img: 'img',
  views: 1,
  createdAt: '01.01.2026',
  type: [ArticleType.IT],
  blocks: [],
  user: {
    id: '1',
    username: 'John',
    avatar: AvatarImg,
  },
}

const user = { id: '42', username: 'admin' }

const baseState = {
  user: { authData: user, _inited: true },
  articleDetails: {
    data: article,
    isLoading: false,
  },
}

const newComment: Comment = {
  id: '7',
  text: 'hello',
  user,
}

describe('addCommentForArticle.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk<Comment, string, string>(
      addCommentForArticle,
      baseState,
    )
    thunk.api.post.mockReturnValue(Promise.resolve({ data: newComment }))

    const result = await thunk.callThunk('hello')

    expect(thunk.api.post).toHaveBeenCalledWith('/comments', {
      articleId: '1',
      userId: '42',
      text: 'hello',
    })
    expect(thunk.dispatch).toHaveBeenCalledWith(expect.any(Function))
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(newComment)
  })

  test('reject when no userData', async () => {
    const thunk = new TestAsyncThunk<Comment, string, string>(
      addCommentForArticle,
      {
        user: { _inited: true },
        articleDetails: { data: article, isLoading: false },
      },
    )

    const result = await thunk.callThunk('hello')

    expect(thunk.api.post).not.toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('no data')
  })

  test('reject when text is empty', async () => {
    const thunk = new TestAsyncThunk<Comment, string, string>(
      addCommentForArticle,
      baseState,
    )

    const result = await thunk.callThunk('')

    expect(thunk.api.post).not.toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('no data')
  })

  test('reject when no article', async () => {
    const thunk = new TestAsyncThunk<Comment, string, string>(
      addCommentForArticle,
      {
        user: { authData: user, _inited: true },
        articleDetails: { isLoading: false },
      },
    )

    const result = await thunk.callThunk('hello')

    expect(thunk.api.post).not.toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('no data')
  })

  test('reject on api error', async () => {
    const thunk = new TestAsyncThunk<Comment, string, string>(
      addCommentForArticle,
      baseState,
    )
    thunk.api.post.mockReturnValue(Promise.reject(new Error('boom')))

    const result = await thunk.callThunk('hello')

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })
})
