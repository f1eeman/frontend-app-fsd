import { lazy } from 'react'
import type { FC } from 'react'

export const ArticleCreatePageAsync = lazy<FC>(
  async () =>
    import(
      /* webpackChunkName: "ArticleDetailsPage" */ '././ArticleCreatePage'
    ),
)
