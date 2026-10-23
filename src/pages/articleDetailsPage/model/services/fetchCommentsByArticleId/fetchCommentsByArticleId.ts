import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Comment } from '@/entities/comment'
import type { ThunkConfig } from '@/shared/lib/store'

export const fetchCommentsByArticleId = createAsyncThunk<
  Comment[],
  string | undefined,
  ThunkConfig<string>
>('articleDetails/fetchCommentsByArticleId', async (articleId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi

  if (!articleId) {
    return rejectWithValue('error')
  }

  try {
    const response = await extra.api.get<Comment[]>('/comments', {
      params: {
        articleId,
        _expand: 'user',
      },
    })

    if (!response.data) {
      throw new Error()
    }

    return response.data
  } catch (_e: unknown) {
    return rejectWithValue('error')
  }
})
