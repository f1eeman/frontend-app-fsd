import type { EntityState } from '@reduxjs/toolkit'
import type { Article } from '@/entities/article'
import type { ArticleView } from '@/entities/article/model/types/article'

export interface ArticlesPageSchema
  extends EntityState<Article, Article['id']> {
  isLoading?: boolean
  error?: string

  view: ArticleView
  page: number
  limit?: number
  hasMore: boolean

  _inited: boolean
}
