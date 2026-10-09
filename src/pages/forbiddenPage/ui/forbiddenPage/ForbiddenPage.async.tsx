import { lazy } from 'react'
import type { FC } from 'react'
import type { ForbiddenPageProps } from './ForbiddenPage'

export const ForbiddenPageAsync = lazy<FC<ForbiddenPageProps>>(
  async () => import(/* webpackChunkName: "ForbiddenPage" */ './ForbiddenPage'),
)
