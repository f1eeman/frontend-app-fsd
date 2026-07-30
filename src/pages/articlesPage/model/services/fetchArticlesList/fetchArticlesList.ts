import { createAsyncThunk } from '@reduxjs/toolkit'
import { ArticleSortField, ArticleType } from '@/entities/article'
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams'
import type { ThunkConfig } from '@/app/store'
import type { Article } from '@/entities/article'

type Props = {
  replace?: boolean
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  Props,
  ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (_props, thunkApi) => {
  const { extra, rejectWithValue, getState, signal } = thunkApi
  const articlesPage = getState().articlesPage
  const limit = articlesPage?.limit ?? 9
  const sort = articlesPage?.sort ?? ArticleSortField.CREATED
  const order = articlesPage?.order ?? 'asc'
  const search = articlesPage?.search ?? ''
  const page = articlesPage?.page ?? 1
  const type = articlesPage?.type ?? ArticleType.ALL

  try {
    addQueryParams({
      sort,
      order,
      search,
      type,
    })
    const response = await extra.api.get<Article[]>('/articles', {
      params: {
        _expand: 'user',
        _limit: limit,
        _page: page,
        _sort: sort,
        _order: order,
        q: search,
        type: type === ArticleType.ALL ? undefined : type,
      },
      signal,
    })

    if (!response.data) {
      throw new Error()
    }

    return response.data
  } catch (_e) {
    return rejectWithValue('error')
  }
})
