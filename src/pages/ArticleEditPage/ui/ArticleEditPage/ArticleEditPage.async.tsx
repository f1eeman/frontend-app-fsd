import { type FC, lazy } from 'react'

export const ArticleEditPageAsync = lazy<FC>(
  async () =>
    import(/* webpackChunkName: "ArticleDetailsPage" */ './ArticleEditPage'),
)
