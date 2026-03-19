import { lazy } from 'react'
import type { FC } from 'react'

export const AboutPageAsync = lazy<FC>(
  async () =>
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(import(/* webpackChunkName: "AboutPage" */ './AboutPage'))
      }, 3500)
    }),
)
