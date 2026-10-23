import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCommentsByArticleId } from '../../services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { getArticleDetailsData } from '@/entities/article'
import { getUserAuthData } from '@/entities/user'
import type { Comment } from '@/entities/comment'
import type { ThunkConfig } from '@/shared/lib/store'

export const addCommentForArticle = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>
>('articleDetails/addCommentForArticle', async (text, thunkApi) => {
  const { extra, dispatch, rejectWithValue, getState } = thunkApi

  const userData = getUserAuthData(getState())
  const article = getArticleDetailsData(getState())

  if (!userData || !text || !article) {
    return rejectWithValue('no data')
  }

  try {
    const response = await extra.api.post<Comment>('/comments', {
      articleId: article.id,
      userId: userData.id,
      text,
    })

    if (!response.data) {
      throw new Error()
    }

    dispatch(fetchCommentsByArticleId(article.id))

    return response.data
  } catch (_e) {
    return rejectWithValue('error')
  }
})
