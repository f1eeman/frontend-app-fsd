import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Article } from '@/entities/article'
import type { ThunkConfig } from '@/shared/lib/store'

export const fetchArticleForEdit = createAsyncThunk<
  Article,
  string,
  ThunkConfig<string>
>('articleForm/fetchArticleForEdit', async (id, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi

  try {
    const response = await extra.api.get<Article>(`/articles/${id}`, {
      params: { _expand: 'user' },
    })
    if (!response.data) throw new Error()
    return response.data
  } catch {
    return rejectWithValue('error')
  }
})
