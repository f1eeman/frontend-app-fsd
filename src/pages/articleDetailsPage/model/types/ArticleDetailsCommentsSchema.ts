import type { EntityState } from '@reduxjs/toolkit'
import type { Comment } from '@/entities/comment'

export interface ArticleDetailsCommentsSchema
  extends EntityState<Comment, Comment['id']> {
  isLoading?: boolean
  error?: string
}
