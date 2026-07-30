import {
  createEntityAdapter,
  createSlice,
  type WithSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { rootReducer } from '@/app/store'
import type { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema'
import type { RootState } from '@/app/store'
import type { Comment } from '@/entities/comment'

const commentsAdapter = createEntityAdapter<Comment, Comment['id']>({
  selectId: (comment) => comment.id,
})

const articleDetailsCommentsSlice = createSlice({
  name: 'articleDetailsComments',
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByArticleId.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(
        fetchCommentsByArticleId.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.isLoading = false
          commentsAdapter.setAll(state, action.payload)
        },
      )
      .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
  },
})

export const { actions: articleDetailsCommentsActions } =
  articleDetailsCommentsSlice
export const { reducer: articleDetailsCommentsReducer } =
  articleDetailsCommentsSlice
export const withArticleDetailsCommentsSlice =
  articleDetailsCommentsSlice.injectInto(rootReducer)

const initialCommentsState = commentsAdapter.getInitialState()

export const getArticleComments = commentsAdapter.getSelectors(
  (state: RootState) => state.articleDetailsComments ?? initialCommentsState,
)

export const { selectIsLoading, selectError } =
  withArticleDetailsCommentsSlice.selectors

declare module '@/app/store' {
  export interface LazyLoadedSlices
    extends WithSlice<typeof articleDetailsCommentsSlice> {}
}
