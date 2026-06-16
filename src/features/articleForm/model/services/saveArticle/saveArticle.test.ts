import { saveArticle } from './saveArticle'
import { ArticleType } from '@/entities/article'
import { TestAsyncThunk } from '@/shared/lib/tests/async.thunk.tests'
import type { ArticleFormData } from '../../types/articleFormSchema'
import type { Article } from '@/entities/article'

type SaveArg = { id?: string; onSuccess?: (id: string) => void }

const validFormData: ArticleFormData = {
  title: 'My Article',
  subtitle: 'Subtitle',
  img: 'img.jpg',
  type: [ArticleType.IT],
  blocks: [],
}

const savedArticle: Article = {
  id: '10',
  title: 'My Article',
  subtitle: 'Subtitle',
  img: 'img.jpg',
  views: 0,
  createdAt: '',
  type: [ArticleType.IT],
  blocks: [],
  user: { id: '1', username: 'admin' },
}

const stateWith = (formData: ArticleFormData) => ({
  user: { authData: { id: '1', username: 'admin' }, _inited: true },
  articleForm: { formData, isLoading: false },
})

describe('saveArticle', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('create: posts form data enriched with author and resolves', async () => {
    const thunk = new TestAsyncThunk<Article, SaveArg, string>(
      saveArticle,
      stateWith(validFormData),
    )
    thunk.api.post.mockReturnValue(Promise.resolve({ data: savedArticle }))
    const onSuccess = jest.fn()

    const result = await thunk.callThunk({ onSuccess })

    expect(thunk.api.post).toHaveBeenCalledWith(
      '/articles',
      expect.objectContaining({
        ...validFormData,
        userId: '1',
        views: 0,
        createdAt: expect.any(String),
      }),
    )
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(savedArticle)
    expect(onSuccess).toHaveBeenCalledWith('10')
  })

  test('edit: patches form data to /articles/:id and keeps the id', async () => {
    const thunk = new TestAsyncThunk<Article, SaveArg, string>(
      saveArticle,
      stateWith(validFormData),
    )
    thunk.api.patch.mockReturnValue(Promise.resolve({ data: savedArticle }))
    const onSuccess = jest.fn()

    const result = await thunk.callThunk({ id: '10', onSuccess })

    expect(thunk.api.patch).toHaveBeenCalledWith('/articles/10', validFormData)
    expect(thunk.api.post).not.toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(savedArticle)
    expect(onSuccess).toHaveBeenCalledWith('10')
  })

  test('rejects with VALIDATION prefix when title is empty', async () => {
    const thunk = new TestAsyncThunk<Article, SaveArg, string>(
      saveArticle,
      stateWith({ ...validFormData, title: '' }),
    )

    const result = await thunk.callThunk({})

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('VALIDATION:Заголовок обязателен')
    expect(thunk.api.post).not.toHaveBeenCalled()
    expect(thunk.api.patch).not.toHaveBeenCalled()
  })

  test('create rejects with error when there is no authorized user', async () => {
    const thunk = new TestAsyncThunk<Article, SaveArg, string>(saveArticle, {
      articleForm: { formData: validFormData, isLoading: false },
    })

    const result = await thunk.callThunk({})

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
    expect(thunk.api.post).not.toHaveBeenCalled()
  })

  test('rejects with error on api failure', async () => {
    const thunk = new TestAsyncThunk<Article, SaveArg, string>(
      saveArticle,
      stateWith(validFormData),
    )
    thunk.api.post.mockReturnValue(Promise.reject(new Error('network')))

    const result = await thunk.callThunk({})

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })

  test('rejects with error when there is no form data in state', async () => {
    const thunk = new TestAsyncThunk<Article, SaveArg, string>(saveArticle, {})

    const result = await thunk.callThunk({})

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
    expect(thunk.api.post).not.toHaveBeenCalled()
  })
})
