import { lazy } from 'react'
import type { FC } from 'react'

export const ArticleDetailsPageAsync = lazy<FC>(
  async () =>
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          import(
            /* webpackChunkName: "ArticleDetailsPage" */ './ArticleDetailsPage'
          ),
        )
      }, 3500)
    }),
)
