import type { EntityState } from '@reduxjs/toolkit'
import type { Article } from '@/entities/article'

export interface ArticleDetailsRecommendationsSchema
  extends EntityState<Article, Article['id']> {
  isLoading?: boolean
  error?: string
}
