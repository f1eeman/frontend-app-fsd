import { createAsyncThunk } from '@reduxjs/toolkit'
import { validateArticleForm } from '../validateArticleForm/validateArticleForm'
import { getUserAuthData } from '@/entities/user'
import type { ThunkConfig } from '@/app/store'
import type { Article } from '@/entities/article'

export const saveArticle = createAsyncThunk<
  Article,
  { id?: string; onSuccess?: (id: string) => void },
  ThunkConfig<string>
>('articleForm/saveArticle', async ({ id, onSuccess }, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi

  const formData = getState().articleForm?.formData
  if (!formData) {
    return rejectWithValue('error')
  }

  const validateError = validateArticleForm(formData)

  if (validateError) {
    return rejectWithValue(`VALIDATION:${validateError}`)
  }

  try {
    if (id) {
      // PATCH merges, preserving server-side fields (userId, views,
      // createdAt) that are not part of the editable form.
      const response = await extra.api.patch<Article>(
        `/articles/${id}`,
        formData,
      )
      if (!response.data) {
        throw new Error()
      }
      onSuccess?.(id)
      return response.data
    }

    const authData = getUserAuthData(getState())
    if (!authData) {
      return rejectWithValue('error')
    }

    const newArticle = {
      ...formData,
      userId: authData.id,
      views: 0,
      createdAt: new Date().toLocaleDateString('ru-RU'),
    }
    const response = await extra.api.post<Article>('/articles', newArticle)
    if (!response.data) {
      throw new Error()
    }
    onSuccess?.(response.data.id)
    return response.data
  } catch {
    return rejectWithValue('error')
  }
})
