import { type FC, lazy } from 'react'

export const ArticleCreatePageAsync = lazy<FC>(
  async () =>
    import(
      /* webpackChunkName: "ArticleDetailsPage" */ '././ArticleCreatePage'
    ),
)
