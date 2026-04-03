import { lazy } from 'react'
import type { FC } from 'react'

export const ArticlesPageAsync = lazy<FC>(
  async () =>
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(import(/* webpackChunkName: "ArticlesPage" */ './ArticlesPage'))
      }, 3500)
    }),
)
