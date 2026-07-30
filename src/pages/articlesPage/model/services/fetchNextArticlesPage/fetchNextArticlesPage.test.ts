import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'
import { fetchNextArticlesPage } from './fetchNextArticlesPage'
import { ArticleSortField, ArticleType, ArticleView } from '@/entities/article'
import { TestAsyncThunk } from '@/shared/lib/tests/async.thunk.tests'

jest.mock('../fetchArticlesList/fetchArticlesList')

describe('fetchNextArticlesPage.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
        view: ArticleView.SMALL,
        order: 'asc',
        sort: ArticleSortField.CREATED,
        search: '',
        type: ArticleType.ALL,
        _inited: true,
      },
    })

    await thunk.callThunk()

    expect(thunk.dispatch).toHaveBeenCalledTimes(4)
    expect(fetchArticlesList).toHaveBeenCalledWith({})
  })
  test('fetchAritcleList not called', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false,
        view: ArticleView.SMALL,
        order: 'asc',
        sort: ArticleSortField.CREATED,
        search: '',
        type: ArticleType.ALL,
        _inited: true,
      },
    })

    await thunk.callThunk()

    expect(thunk.dispatch).toHaveBeenCalledTimes(2)
    expect(fetchArticlesList).not.toHaveBeenCalled()
  })
})
