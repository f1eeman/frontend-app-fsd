import { lazy } from 'react'
import type { FC } from 'react'

export const ArticleDetailsPageAsync = lazy<FC>(
  async () =>
    import(/* webpackChunkName: "ArticleDetailsPage" */ './ArticleDetailsPage'),
)
