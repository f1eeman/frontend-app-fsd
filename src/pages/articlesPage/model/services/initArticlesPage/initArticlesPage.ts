import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  articlesPageActions,
  getArticlesPageInited,
} from '../../slices/articlesPageSlice'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'
import { ArticleSortField, ArticleType } from '@/entities/article'
import { isOneOf } from '@/shared/lib/isOneOf/isOneOf'
import type { ThunkConfig } from '@/app/store'
import type { SortOrder } from '@/shared/types'

const sortOrders: readonly SortOrder[] = ['asc', 'desc']
const sortFields = Object.values(ArticleSortField)
const articleTypes = Object.values(ArticleType)

export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>('articlesPage/initArticlesPage', async (searchParams, thunkApi) => {
  const { getState, dispatch } = thunkApi
  const inited = getArticlesPageInited(getState())

  if (!inited) {
    const orderFromUrl = searchParams.get('order')
    const sortFromUrl = searchParams.get('sort')
    const searchFromUrl = searchParams.get('search')
    const typeFromUrl = searchParams.get('type')
    if (isOneOf(sortOrders, orderFromUrl)) {
      dispatch(articlesPageActions.setOrder(orderFromUrl))
    }
    if (isOneOf(sortFields, sortFromUrl)) {
      dispatch(articlesPageActions.setSort(sortFromUrl))
    }
    if (searchFromUrl) {
      dispatch(articlesPageActions.setSearch(searchFromUrl))
    }
    if (isOneOf(articleTypes, typeFromUrl)) {
      dispatch(articlesPageActions.setType(typeFromUrl))
    }
    dispatch(articlesPageActions.initState())
    dispatch(fetchArticlesList({ replace: true }))
  }
})
