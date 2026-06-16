import type { ArticleBlock, ArticleType } from '@/entities/article'

export interface ArticleFormData {
  title: string
  subtitle: string
  img: string
  type: ArticleType[]
  blocks: ArticleBlock[]
}

export interface ArticleFormSchema {
  formData: ArticleFormData
  isLoading: boolean
  error?: string
  validateError?: string
}
