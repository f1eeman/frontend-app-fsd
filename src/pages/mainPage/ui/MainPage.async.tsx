import { lazy } from 'react'
import type { FC } from 'react'

export const MainPageAsync = lazy<FC>(
  () => import(/* webpackChunkName: "MainPage" */ './MainPage'),
)
