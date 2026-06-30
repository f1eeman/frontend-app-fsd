import type { EntityState } from '@reduxjs/toolkit'
import type { Article, ArticleSortField, ArticleType , ArticleView } from '@/entities/article'
import type { SortOrder } from '@/shared/types'

export interface ArticlesPageSchema
  extends EntityState<Article, Article['id']> {
  isLoading?: boolean
  error?: string

  page: number
  limit?: number
  hasMore: boolean
  // filters
  view: ArticleView
  order: SortOrder
  sort: ArticleSortField
  search: string
  type: ArticleType

  _inited: boolean
}
