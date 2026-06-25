import { lazy } from 'react'
import type { FC } from 'react'

export const ArticlesPageAsync = lazy<FC>(
  async () => import(/* webpackChunkName: "ArticlesPage" */ './ArticlesPage'),
)
