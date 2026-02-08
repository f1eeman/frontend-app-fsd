import { lazy } from 'react'

export const MainPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-expect-error  // ОБМАНКА
      setTimeout(() => resolve(import('./MainPage')), 1500)
    }),
)
