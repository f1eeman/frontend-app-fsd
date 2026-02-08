import { lazy } from 'react'

export const AboutPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-expect-error  // ОБМАНКА
      setTimeout(() => resolve(import('./AboutPage')), 1500)
    }),
)
