import { createAsyncThunk } from '@reduxjs/toolkit'
import { selectFormData } from '../../slices/articleFormSlice'
import { validateArticleForm } from '../validateArticleForm/validateArticleForm'
import type { ThunkConfig } from '@/app/store'
import type { Article } from '@/entities/article'

export const saveArticle = createAsyncThunk<
  Article,
  { id?: string; onSuccess?: (id: string) => void },
  ThunkConfig<string>
>('articleForm/saveArticle', async ({ id, onSuccess }, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi

  const formData = selectFormData(getState())
  const validateError = validateArticleForm(formData)

  if (validateError) {
    return rejectWithValue(`VALIDATION:${validateError}`)
  }

  try {
    const response = id
      ? await extra.api.put<Article>(`/articles/${id}`, formData)
      : await extra.api.post<Article>('/articles', formData)

    if (!response.data) throw new Error()

    onSuccess?.(response.data.id)
    return response.data
  } catch {
    return rejectWithValue('error')
  }
})
