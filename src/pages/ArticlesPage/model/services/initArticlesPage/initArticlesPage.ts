import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  articlesPageActions,
  getArticlesPageInited,
} from '../../slices/articlesPageSlice'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'
import type { ThunkConfig } from '@/app/store'

export const initArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>('articlesPage/initArticlesPage', async (_, thunkApi) => {
  const { getState, dispatch } = thunkApi
  const inited = getArticlesPageInited(getState())

  if (!inited) {
    dispatch(articlesPageActions.initState())
    dispatch(
      fetchArticlesList({
        page: 1,
      }),
    )
  }
})
