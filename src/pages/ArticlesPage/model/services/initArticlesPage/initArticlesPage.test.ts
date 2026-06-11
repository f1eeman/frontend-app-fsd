import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'
import { initArticlesPage } from './initArticlesPage'
import { ArticleView } from '@/entities/article/model/types/article'
import { TestAsyncThunk } from '@/shared/lib/tests/async.thunk.tests'

jest.mock('../fetchArticlesList/fetchArticlesList')

describe('initArticlesPage.test', () => {
  test('not inited', async () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        page: 1,
        ids: [],
        entities: {},
        isLoading: false,
        hasMore: true,
        view: ArticleView.SMALL,
        _inited: false,
      },
    })

    await thunk.callThunk()

    expect(thunk.dispatch).toHaveBeenCalledTimes(4)
    expect(fetchArticlesList).toHaveBeenCalledWith({ page: 1 })
  })

  test('inited', async () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        page: 1,
        ids: [],
        entities: {},
        isLoading: false,
        hasMore: true,
        view: ArticleView.SMALL,
        _inited: true,
      },
    })

    await thunk.callThunk()

    expect(thunk.dispatch).toHaveBeenCalledTimes(2)
    expect(fetchArticlesList).not.toHaveBeenCalled()
  })
})
