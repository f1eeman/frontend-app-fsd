import { type FC, lazy } from 'react'

export const ArticleEditPageAsync = lazy<FC>(
  async () =>
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          import(
            /* webpackChunkName: "ArticleDetailsPage" */ './ArticleEditPage'
          ),
        )
      }, 3500)
    }),
)
