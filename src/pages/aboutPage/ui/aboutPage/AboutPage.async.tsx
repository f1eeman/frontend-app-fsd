import { lazy } from 'react'
import type { FC } from 'react'

export const AboutPageAsync = lazy<FC>(
  async () => import(/* webpackChunkName: "AboutPage" */ './AboutPage'),
)
