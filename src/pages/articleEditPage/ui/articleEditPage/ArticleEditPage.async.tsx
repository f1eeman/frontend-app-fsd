import { lazy } from 'react'
import type { FC } from 'react'

export const ArticleEditPageAsync = lazy<FC>(
  async () =>
    import(/* webpackChunkName: "ArticleDetailsPage" */ './ArticleEditPage'),
)
