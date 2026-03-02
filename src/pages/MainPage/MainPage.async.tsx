import { lazy } from 'react'
import type { FC } from 'react'

export const MainPageAsync = lazy<FC>(
  () =>
    new Promise((resolve) => {
      setTimeout(
        () => resolve(import(/* webpackChunkName: "MainPage" */ './MainPage')),
        3500,
      )
    }),
)
