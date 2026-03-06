import { lazy } from 'react'
import type { FC } from 'react'

export const ProfilePageAsync = lazy<FC>(
  () =>
    new Promise((resolve) => {
      setTimeout(
        () =>
          resolve(
            import(/* webpackChunkName: "ProfilePage" */ './ProfilePage'),
          ),
        3500,
      )
    }),
)
