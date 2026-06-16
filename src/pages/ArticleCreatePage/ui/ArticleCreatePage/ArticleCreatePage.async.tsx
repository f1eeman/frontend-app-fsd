import { type FC, lazy } from 'react'

export const ArticleCreatePageAsync = lazy<FC>(
  async () =>
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          import(
            /* webpackChunkName: "ArticleDetailsPage" */ '././ArticleCreatePage'
          ),
        )
      }, 3500)
    }),
)
