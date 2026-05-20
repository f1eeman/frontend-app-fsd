import { createAsyncThunk } from '@reduxjs/toolkit'
import { getArticlesPageLimit } from '../../slices/articlesPageSlice'
import type { ThunkConfig } from '@/app/store'
import type { Article } from '@/entities/article'

interface FetchArticlesListProps {
  page?: number
}
export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (props, thunkApi) => {
  const { extra, rejectWithValue, getState, signal } = thunkApi
  const { page = 1 } = props
  const limit = getArticlesPageLimit(getState())
  try {
    const response = await extra.api.get<Article[]>('/articles', {
      params: {
        _expand: 'user',
        _limit: limit,
        _page: page,
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
