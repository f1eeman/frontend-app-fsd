import { articlesPageActions } from '../../slices/articlesPageSlice'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'
import { initArticlesPage } from './initArticlesPage'
import {
  ArticleSortField,
  ArticleType,
  ArticleView,
} from '@/entities/article/model/types/article'
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
        order: 'asc',
        sort: ArticleSortField.CREATED,
        search: '',
        type: ArticleType.ALL,
        _inited: false,
      },
    })

    await thunk.callThunk(new URLSearchParams())

    expect(thunk.dispatch).toHaveBeenCalledTimes(4)
    expect(fetchArticlesList).toHaveBeenCalledWith({ replace: true })
  })

  test('restores filters from URL search params', async () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        page: 1,
        ids: [],
        entities: {},
        isLoading: false,
        hasMore: true,
        view: ArticleView.SMALL,
        order: 'asc',
        sort: ArticleSortField.CREATED,
        search: '',
        type: ArticleType.ALL,
        _inited: false,
      },
    })

    const searchParams = new URLSearchParams({
      order: 'desc',
      sort: ArticleSortField.VIEWS,
      search: 'react',
      type: ArticleType.ECONOMICS,
    })

    await thunk.callThunk(searchParams)

    expect(thunk.dispatch).toHaveBeenCalledWith(
      articlesPageActions.setOrder('desc'),
    )
    expect(thunk.dispatch).toHaveBeenCalledWith(
      articlesPageActions.setSort(ArticleSortField.VIEWS),
    )
    expect(thunk.dispatch).toHaveBeenCalledWith(
      articlesPageActions.setSearch('react'),
    )
    expect(thunk.dispatch).toHaveBeenCalledWith(
      articlesPageActions.setType(ArticleType.ECONOMICS),
    )
    expect(fetchArticlesList).toHaveBeenCalledWith({ replace: true })
  })

  test('does not restore filters absent from URL', async () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        page: 1,
        ids: [],
        entities: {},
        isLoading: false,
        hasMore: true,
        view: ArticleView.SMALL,
        order: 'asc',
        sort: ArticleSortField.CREATED,
        search: '',
        type: ArticleType.ALL,
        _inited: false,
      },
    })

    await thunk.callThunk(new URLSearchParams({ type: ArticleType.IT }))

    expect(thunk.dispatch).toHaveBeenCalledWith(
      articlesPageActions.setType(ArticleType.IT),
    )
    expect(thunk.dispatch).not.toHaveBeenCalledWith(
      articlesPageActions.setOrder(expect.anything()),
    )
    expect(thunk.dispatch).not.toHaveBeenCalledWith(
      articlesPageActions.setSort(expect.anything()),
    )
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
        order: 'asc',
        sort: ArticleSortField.CREATED,
        search: '',
        type: ArticleType.ALL,
        _inited: true,
      },
    })

    await thunk.callThunk(new URLSearchParams())

    expect(thunk.dispatch).toHaveBeenCalledTimes(2)
    expect(fetchArticlesList).not.toHaveBeenCalled()
  })
})
