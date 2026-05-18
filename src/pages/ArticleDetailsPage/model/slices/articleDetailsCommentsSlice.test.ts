import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice'
import type { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema'
import type { Comment } from '@/entities/comment'
import type { DeepPartial } from '@/shared/types'

const comments: Comment[] = [
  {
    id: '1',
    text: 'first',
    user: { id: '1', username: 'admin' },
  },
  {
    id: '2',
    text: 'second',
    user: { id: '2', username: 'anton' },
  },
]

describe('articleDetailsCommentsSlice.test', () => {
  test('fetchCommentsByArticleId.pending sets isLoading=true and clears error', () => {
    const state: DeepPartial<ArticleDetailsCommentsSchema> = {
      ids: [],
      entities: {},
      isLoading: false,
      error: 'previous error',
    }

    const result = articleDetailsCommentsReducer(
      state as ArticleDetailsCommentsSchema,
      fetchCommentsByArticleId.pending('', '1'),
    )

    expect(result.isLoading).toBe(true)
    expect(result.error).toBeUndefined()
  })

  test('fetchCommentsByArticleId.fulfilled sets comments via adapter', () => {
    const state: DeepPartial<ArticleDetailsCommentsSchema> = {
      ids: [],
      entities: {},
      isLoading: true,
      error: undefined,
    }

    const result = articleDetailsCommentsReducer(
      state as ArticleDetailsCommentsSchema,
      fetchCommentsByArticleId.fulfilled(comments, '', '1'),
    )

    expect(result.isLoading).toBe(false)
    expect(result.ids).toEqual(['1', '2'])
    expect(result.entities['1']).toEqual(comments[0])
    expect(result.entities['2']).toEqual(comments[1])
  })

  test('fetchCommentsByArticleId.rejected sets isLoading=false and error', () => {
    const state: DeepPartial<ArticleDetailsCommentsSchema> = {
      ids: [],
      entities: {},
      isLoading: true,
      error: undefined,
    }

    const result = articleDetailsCommentsReducer(
      state as ArticleDetailsCommentsSchema,
      fetchCommentsByArticleId.rejected(null, '', '1', 'error'),
    )

    expect(result.isLoading).toBe(false)
    expect(result.error).toBe('error')
  })
})
