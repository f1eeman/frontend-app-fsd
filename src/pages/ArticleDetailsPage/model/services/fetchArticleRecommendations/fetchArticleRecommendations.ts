import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from '@/app/store'
import type { Article } from '@/entities/article'

export const fetchArticleRecommendations = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>
>('articleDetailsPage/fetchArticleRecommendations', async (props, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi

  try {
    const response = await extra.api.get<Article[]>('/articles', {
      params: {
        _limit: 4,
      },
    })

    if (!response.data) {
      throw new Error()
    }

    return response.data
  } catch (_e) {
    return rejectWithValue('error')
  }
})
